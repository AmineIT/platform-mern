const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../../config/passport');
const JWT = require('jsonwebtoken');
const User = require('../../models/User');
const Job = require('../../models/Job');
const multer = require('multer');
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');
require('dotenv').config();


sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/usersFiles/');
    },
    filename: function (req, file, cb) {
        cb(null, `${new Date().getTime().toString()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.png' || ext !== '.jpg' || ext !== '.jpeg') {
            cb(null, false)
        } else {
            cb(null, true)
        }
    }
})

const upload = multer({ storage, limits: { fileSize: 5242880 } }).single('profileImage')

// Setup the upload files route
router.post('/uploads/userImage', (req, res) => {
    upload(req, res, err => {
        if (err) return res.json({ success: false, err })
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })
})

// @desc    Register new user
// @route   POST /users/register
// @access  Public
router.post('/register', (req, res) => {

    // Extract the user data from the request body
    const { fullName, email, password, role, ...data } = req.body;
    // Check if this email is already exist in the database

    User.findOne({ email }, (error, user) => {
        // Check if there's an error while we're sending this request
        if (error) {
            throw new Error('Error has occured!')
        }
        // If there's an email in our data return an error
        if (user) {
            res.status(400).json({
                message: {
                    msgBody: 'This email is already used.',
                    msgError: true,
                }
            })
        }
        // If there's no such an email then add it to the database
        else {
            const newUser = new User({
                fullName,
                email,
                password,
                role,
                emailToken: crypto.randomBytes(64).toString('hex'),
                ...data
            });

            newUser.save((error, user) => {
                // Check if there's an error while we're sending this request
                if (error) {
                    throw new Error(error)
                }
                else {
                    // When the user is successfully created
                    res.status(201).json({
                        msgBody: 'Account successfully created.',
                        user: user
                    })

                    const msg = {
                        to: user.email,
                        from: 'support@selfstarter.app',
                        subject: 'Confirmation Email From Selfstarter',
                        template_id: process.env.SENDGRID_REGISTER_TEMPLATE_ID,
                        dynamic_template_data: {
                            name: user.fullName,
                            link: `http://${req.headers.host}/users/verify-email?token=${user.emailToken}`
                        }
                    };

                    sgMail.send(msg)
                }
            })
        }
    })
});

// @desc    Verify user email
// @route   GET /users/verify-email/
// @access  Public
router.get('/verify-email', (req, res) => {

    const token = req.query.token;

    User.findOne({ emailToken: token }, (error, user) => {
        // Check if there's an error while we're sending this request
        if (error) {
            throw new Error('Error has occured!')
        }

        // Check if there's no user with the given token
        if (!user) {
            res.status(400).json({
                message: {
                    msgBody: 'Token is invalid. Please contact us for assistance.',
                    isValid: false,
                }
            })
            return
        }

        else {
            User.updateOne({ emailToken: token }, { emailToken: null, isVerified: true }, (error) => {
                if (error) {
                    throw new Error('Error has occured!')
                } else {
                    res.redirect(`http://localhost:3000/verify-email?token=${token}`)
                }
            })
        }

    })
})

// Setup the login route using passport local middleware
// JWT Payload
const payload = (userID) => {
    return {
        iss: 'Selfstarter',
        sub: userID
    }
}

// Create the JWT with the Payload, Secret Key and expiration date as an option
const signToken = userID => {
    return JWT.sign(payload(userID), process.env.JWT_SECRET_KEY);
}

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    // isAuthenticated it's a function from passport middleware that returs true or false if the user is logged in
    if (req.isAuthenticated()) {
        const user = req.user._doc
        user.password = null

        // Create the JWT token
        const token = signToken(user._id);

        // Add the JWT token to the cookie
        // res.cookie('access_token', token, { httpOnly: true, sameSite: true });

        res.status(200).json({
            token,
            isAuthenticated: true,
            user
        })
    }
});

// @desc    Logout a user
// @route   GET /users/logout/
// @access  Public
router.get('/logout', (req, res) => {
    req.logout();
    res.json({ user: null });
});

// @desc    Get user profile
// @route   GET /users/authenticated
// @access  Private
router.get('/authenticated', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({
        ...req.user._doc,
        password: null
    });
});

// @desc    Check if the user email exist in the DB
// @route   POST /users/email-check
// @access  Public
router.post('/email-check', (req, res) => {
    const email = req.body.email;

    User.findOne({ email }, (error, user) => {
        if (error) {
            throw new Error(error)
        }

        if (user) {
            return res.status(201).json({
                message: {
                    msgBody: 'This email is already taken.',
                    emailExist: true
                }
            })
        } else {
            return res.status(200).json({
                message: {
                    msgBody: 'This email does not exist.',
                    emailExist: false
                }
            })
        }
    })
});

// @desc    Reset Password
// @route   POST /users/reset-password
// @access  Public
router.post('/reset-password', (res, req) => {
    const token = crypto.randomBytes(64).toString('hex')
    const email = res.body.email;
    User.findOne({ email }, (error, user) => {
        if (error) {
            throw new Error(error)
        }
        if (!user) {
            return req.status(400).json({
                message: 'This email does not exist.'
            })
        }
        user.resetToken = token
        user.expireToken = Date.now() + 3600000 // the token will expire after an hour
        user.save().then(user => {
            const msg = {
                to: user.email,
                from: 'support@selfstarter.app',
                subject: 'Reset Password Instructions - Selfstarter',
                template_id: process.env.SENDGRID_REST_PASSWORD_TEMPLATE_ID,
                dynamic_template_data: {
                    name: user.fullName,
                    link: `http:/localhost:3000/update-password/${user.resetToken}`
                }
            }
            sgMail.send(msg).then(() => {
                req.status(200).json({ emailSent: true })
            }).catch((error) => {
                throw new Error(error)
            })
        }).catch(error => {
            req.status(400)
            throw new Error(error)
        })
    })
})


// @desc    Update Password
// @route   PUT /users/update-password
// @access  Public
router.put('/update-password', (res, req) => {

    const newPassword = res.body.password
    const sentToken = res.body.token

    User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } }, (error, user) => {
        if (error) {
            throw new Error(error)
        }
        if (!user) {
            return req.status(400).json({ errorMessage: "Your reset link has expired, try again." })
        }
        user.password = newPassword
        user.resetToken = null
        user.expireToken = null
        user.save().then(user => {
            const msg = {
                to: user.email,
                from: 'support@selfstarter.app',
                template_id: process.env.SENDGRID_REST_PASSWORD_CONFIRMATION_TEMPLATE_ID
            }

            sgMail.send(msg).then(() => {
                req.status(200).json({ emailSent: true })
            }).catch((error) => {
                throw new Error(error)
            })
        })
    })
})

// @desc    Update the dashboard steps
// @route   POST /users/update-steps
// @access  Private
router.post('/update-steps', passport.authenticate('jwt', { session: false }), (res, req) => {
    const { _id } = res.user
    User.updateOne({ _id: _id }, { steps: false }, (error) => {
        if (error) {
            throw new Error('Error has occured!')
        } else {
            return req.status(200).json({
                message: {
                    msgBody: 'The steps status has changed'
                }
            })
        }
    })
})

// @desc    Edit user profile
// @route   POST /users/edit-profile
// @access  Private
router.put('/edit-profile', passport.authenticate('jwt', { session: false }), (req, res) => {

    const {
        candidatesPipeline,
        assessmentsTaken,
        socialMediaAccounts,
        brandColor,
        aboutMe,
        appliedFor,
        candidateEducation,
        candidateWorkExperience,
        feedbackMessage,
        city,
        country,
        currentJobRole,
        companyWebsite,
        email,
        emailToken,
        fullName,
        isVerified,
        kanbanStatus,
        notifications,
        phoneNumber,
        profileImage,
        role,
        steps,
        password,
        notifyWhenCandidateApplies,
        notifyWhenCandidateCompleteAssessment } = req.body;

    User.findById(req.user._id, '-password', (error, user) => {
        if (error) {
            throw new Error(error)
        } else {
            candidatesPipeline ? user.candidatesPipeline = candidatesPipeline : user.candidatesPipeline
            assessmentsTaken ? user.assessmentsTaken = assessmentsTaken : user.assessmentsTaken
            socialMediaAccounts ? user.socialMediaAccounts = socialMediaAccounts : user.socialMediaAccounts
            appliedFor ? user.appliedFor = appliedFor : user.appliedFor
            candidateEducation ? user.candidateEducation = candidateEducation : user.candidateEducation
            candidateWorkExperience ? user.candidateWorkExperience = candidateWorkExperience : user.candidateWorkExperience
            notifications ? user.notifications = notifications : user.notifications
            feedbackMessage ? user.feedbackMessage = feedbackMessage : user.feedbackMessage
            password ? user.password = password : user.password

            user.brandColor = brandColor
            user.aboutMe = aboutMe
            user.city = city
            user.country = country
            user.currentJobRole = currentJobRole
            user.email = email
            user.emailToken = emailToken
            user.fullName = fullName
            user.isVerified = isVerified
            user.kanbanStatus = kanbanStatus
            user.phoneNumber = phoneNumber
            user.profileImage = profileImage
            user.role = role
            user.steps = steps
            user.companyWebsite = companyWebsite
            user.notifyWhenCandidateCompleteAssessment = notifyWhenCandidateCompleteAssessment
            user.notifyWhenCandidateApplies = notifyWhenCandidateApplies

            user.save().then(user => {
                res.status(200).json(user)
            }).catch(error => {
                res.status(400)
                throw new Error(error)
            })
        }
    })
})

// @desc    Fetch notifications array
// @route   GET /users/fetch-notifications
// @access  Private
router.get('/fetch-notifications', passport.authenticate('jwt', { session: false }), (res, req) => {
    const { _id } = res.user
    User.aggregate([
        { $match: { "_id": _id } },
        { $unwind: "$notifications" },
        { $sort: { "notifications.addedAt": -1 } },
        { $group: { _id: "$_id", 'notifications': { $push: '$notifications' } } },
        { $project: { "notifications": "$notifications" } }
    ]).exec((error, doc) => {
        if (error) {
            throw new Error(error)
        } else {
            req.status(200).json(doc.length > 0 ? doc[0].notifications : [])
        }
    })
})

// @desc    Clear notifications array
// @route   POST /users/fetch-notifications
// @access  Private
router.post('/clear-notifications', passport.authenticate('jwt', { session: false }), (res, req) => {
    const { _id } = res.user
    User.findById(_id, (error, user) => {
        if (error) {
            throw new Error(error)
        } else {
            user.notifications = []
            user.save()
            req.status(200).json(user)
        }
    })
})

// @desc    Apply for a job
// @route   PUT /users/apply-job/:id
// @access  Private
router.put('/apply-job/:id', passport.authenticate('jwt', { session: false }), (res, req) => {

    const { id } = res.params
    const currentUser = res.user._id
    const fullName = res.user.fullName
    const appliedFor = res.user.appliedFor

    Job.findById(id, null, (error, job) => {
        if (error) {
            throw new Error(error)
        } else {
            const hasApplied = job.candidates.includes(candidate => candidate.user === currentUser)
            if (!hasApplied) {
                const updatedUserApplied = {
                    status: 'Applied',
                    user: currentUser
                }
                job.candidates.push(updatedUserApplied)
                const { _id } = job.createdBy
                User.findById(_id, null, (error, user) => {
                    if (error) {
                        throw new Error(error)
                    } else {
                        if (user.notifyWhenCandidateApplies) {
                            user.notifications.push({ message: `${fullName} has applied to ${job.jobTitle} role.`, messageType: 'Job Application' })
                            user.save()
                        }
                    }
                })
            }

            const pipelineExist = job.createdBy.candidatesPipeline.includes(currentUser)
            if (!pipelineExist) {
                const { _id } = job.createdBy
                User.findById(_id, null, (error, user) => {
                    if (error) {
                        throw new Error(error)
                    } else {
                        const userExist = user.candidatesPipeline.includes(currentUser)
                        if (userExist) {
                            return req.json({
                                message: 'This candidate has already applied been added to your pipeline.',
                                pipelineExist: true
                            })
                        } else {
                            user.candidatesPipeline.push(currentUser)
                            user.save()
                        }
                    }
                })
            }

            const alreadyApplied = appliedFor.includes(job._id)
            if (!alreadyApplied) {
                User.findById(currentUser, null, (error, user) => {
                    if (error) {
                        throw new Error(error)
                    } else {
                        const jobExist = user.appliedFor.includes(job._id)
                        if (jobExist) {
                            return req.json({
                                message: 'You already applied for this job.',
                                alreadyApplied: true
                            })
                        } else {
                            user.appliedFor.push(job._id)
                            user.save()
                        }
                    }
                })
            }

            job.save()
            req.status(200).json(job)
        }
    }).populate('createdBy')
})

module.exports = router;