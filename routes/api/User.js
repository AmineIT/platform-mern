const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../../passport');
const Joi = require('joi');
const JWT = require('jsonwebtoken');
const User = require('../../models/User');
const multer = require('multer');
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');
require('dotenv').config();


sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/usersFiles/');
    },
    filename: function(req, file, cb) {
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

const upload = multer({ storage, limits: { fileSize: 5242880 }}).single('profileImage')

// Setup the upload files route
userRouter.post('/uploads/userImage', (req, res) => {
    upload(req, res, err => {
        if (err) return res.json({success: false, err})
        return res.json({success: true, image: res.req.file.path, fileName: res.req.file.filename})
    })
})

// Setup the registration route
userRouter.post('/register', (req, res) => {

    // Extract the user data from the request body
    const {fullName, email, password, role, ...data} = req.body;
    // Check if this email is already exist if the database

    const schema = Joi.object().keys({
        fullName: Joi.string().trim().min(3).required().error(errors => {
            return errors.map(error => {
                switch (error.type) {
                  case "string.min":
                    return { message: "Full Name must be more than 3 characters." };
                  case "string.required":
                    return { message: "Full Name is required." };
                  case "any.empty":
                    return { message: "Full Name is required." };
                }
              }
            )
        }),
        password: Joi.string().trim().min(6).required().error(() => 'Password is required.'),
        email: Joi.string().trim().required().error(() => 'Email is required.')
    })

    const result = Joi.validate(req.body, schema, {allowUnknown: true});

    if (result.error) {
        return res.status(400).send({msgError: result.error.details[0].message});
    }

    User.findOne({email}, (error, user) => {
        // Check if there's an error while we're sending this request
        if (error) {
            res.status(500).json({
                message: {
                    msgBody: 'Error has occured.',
                    msgError: true,
                }
            })
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
                ...data});
            
            newUser.save((error, user) => {
                // Check if there's an error while we're sending this request
                if (error) {
                    res.status(500).json({
                        message: {
                            msgBody: 'Error has occured while creating the user.',
                            msgError: true,
                        }
                    })
                }
                else {
                    // When the user is successfully created
                    res.status(201).json({
                        msgBody: 'Account successfully created.',
                        user: user
                    })

                    const msg = {
                        to: 'amine@selfstarter.app',
                        from: 'support@selfstarter.app',
                        subject: 'Confirmation Email From Selfstarter',
                        template_id: process.env.SENDGRID_TEMPLATE_ID,
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

// Setup the email verification route
userRouter.get('/verify-email', (req, res) => {

    const token = req.query.token;

    User.findOne({emailToken: token}, (error, user) => {
        // Check if there's an error while we're sending this request
        if (error) {
            res.status(500).json({
                message: {
                    msgBody: 'Error has occured.',
                    msgError: true,
                }
            })
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
            User.updateOne({emailToken: token}, {emailToken: null, isVerified: true}, (error) => {
                if (error) {
                    res.status(500).json({
                        message: {
                            msgBody: 'Error has occured.',
                            msgError: true,
                        }
                    })
                    return false
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

userRouter.post('/login', passport.authenticate('local', {session: false}) ,(req, res) => {
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

// Setup the logout route using passport middleware
userRouter.get('/logout' ,(req,res) => {
    req.logout();
    res.json({
        user: {
            username : "",
            role : ""
        }, 
        success : true
    });
});

userRouter.get('/authenticated', passport.authenticate('jwt',{session : false}), (req,res) => {
    res.status(200).json({
        ...req.user._doc, 
        password: null
    });
});

// Check if the email exist
userRouter.post('/email-check', (req, res) => {
    const email = req.body.email;

    User.findOne({email}, (error, user) => {
        if (error) {
            return res.status(500).json({
                message: {
                    msgBody: 'Error has occured.',
                    msgError: true,
                }
            })
        }

        if (user) {
            return res.status(201).json({
                message: {
                    msgBody: 'This email is already taken.',
                    emailExist: true,
                    msgError: false,
                }
            })
        } else {
            return res.status(200).json({
                message: {
                    msgBody: 'This email does not exist.',
                    emailExist: false,
                    msgError: false,
                }
            })
        }
    })
});

module.exports = userRouter;