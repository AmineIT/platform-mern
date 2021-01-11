const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../../config/passport');
const Joi = require('joi');
const sgMail = require('@sendgrid/mail');
const Job = require('../../models/Job');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// @desc    Create new job
// @route   POST /jobs/create-job/
// @access  Private
router.post('/create-job', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Extract the job data from the body request
    const { jobTitle, jobDescription, jobDepartment, createdBy, ...rest } = req.body;

    const newJob = new Job({ jobTitle, jobDescription, jobDepartment, createdBy, ...rest });

    newJob.save((error, job) => {
        if (error) {
            throw new Error('Error has occured!')
        } else {
            res.status(200).json(job)
        }
    })
})

// @desc    Fetch all the jobs
// @route   GET /jobs/all-jobs/
// @access  Public
router.get('/fetch-jobs', (res, req) => {
    Job.find().populate('createdBy').exec((error, jobs) => {
        if (error) {
            throw new Error('Error has occured!')
        } else {
            req.status(200).json(jobs)
        }
    })
})

// @desc    Fetch all the jobs for a single company
// @route   POST /jobs/create-job/
// @access  Private
router.post('/fetch-company-jobs', passport.authenticate('jwt', { session: false }), (res, req) => {
    const { _id } = res.user;
    Job.find({ createdBy: _id }).sort({ createdAt: 'desc' }).populate('candidates').exec((error, jobs) => {
        if (error) {
            throw new Error('Error has occured!')
        } else {
            return req.status(200).json(
                jobs
            )
        }
    })
})

// @desc    Fetch single job
// @route   GET /jobs/fetch-job/:id
// @access  Private
router.get('/fetch-job/:id', passport.authenticate('jwt', { session: false }), (res, req) => {
    Job.findById(res.params.id).populate('candidates.user').populate('assessment').exec((error, job) => {
        if (error) {
            throw new Error(error)
        }
        else {
            req.json(job)
        }
    })
})

// @desc    Update a job
// @route   PUT /jobs/update-job/:id
// @access  Private
router.put('/update-job/:id', passport.authenticate('jwt', { session: false }), (res, req) => {

    const {
        jobTitle,
        jobDescription,
        jobDepartment,
        jobRequirement,
        minRequirement,
        salary,
        salaryCurrency,
        showSalary,
        employmentType,
        country,
        city,
        expiredAt,
        createdBy,
        status,
        candidates,
        assessment
    } = res.body

    Job.findById(res.params.id, null, (error, job) => {
        if (error) {
            throw new Error(error)
        }
        else {
            job.jobTitle = jobTitle
            job.jobDescription = jobDescription
            job.jobDepartment = jobDepartment
            job.jobRequirement = jobRequirement
            job.salary = salary
            job.salaryCurrency = salaryCurrency
            job.showSalary = showSalary
            job.employmentType = employmentType
            job.minRequirement = minRequirement
            job.country = country
            job.city = city
            job.expiredAt = expiredAt
            job.createdBy = createdBy
            job.status = status
            job.candidates = candidates
            job.assessment = assessment
            job.createdAt = Date.now()

            job.save().then(job => {
                req.status(200).json(job)
            }).catch(error => {
                req.status(400)
                throw new Error(error)
            })
        }
    })
})

// @desc    Delete a job
// @route   DELETE /jobs/delete-job/:id
// @access  Private
router.delete('/delete-job/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Job.deleteOne({ _id: req.params.id }, (error, job) => {
        if (error) {
            throw new Error('Error has occured!')
        }
        else {
            res.json(job)
        }
    })
})

// @desc    Publish a job
// @route   POST /jobs/pubish-job/:id
// @access  Private
router.post('/publish-job/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Job.updateOne({ _id: req.params.id }, { status: 'published', createdAt: Date.now() }).exec((error, job) => {
        if (error) {
            throw new Error('Error has occured!')
        }
        else {
            res.json(job)
        }
    })
})

// @desc    Archive a job
// @route   POST /jobs/archive-job/:id
// @access  Private
router.post('/archive-job/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Job.updateOne({ _id: req.params.id }, { status: 'archived', createdAt: Date.now() }).exec((error, job) => {
        if (error) {
            throw new Error('Error has occured!')
        }
        if (!job) {
            res.status(404)
            throw new Error('Job not found.')
        }
        else {
            res.json(job)
        }
    })
})

// @desc    Update Application Status
// @route   PUT /jobs/update-application-status/:id
// @access  Private
router.put('/update-application-status/:id', passport.authenticate('jwt', { session: false }), (res, req) => {

    const { id } = res.params
    const { applicationStatus, userID } = res.body

    Job.findOne({ _id: id }).exec((error, job) => {
        if (error) {
            throw new Error(error)
        }
        job.candidates.map(candidate => {
            if (`${candidate._id}` === userID) {
                candidate.status = applicationStatus
                job.save().then(job => {
                    req.status(200).json(job)
                }).catch(error => {
                    throw new Error(error)
                })
            }
        })
    })

})

// @desc    Send Feedback of an Application
// @route   post /jobs/send-feedback/:id
// @access  Private
router.post('/send-feedback', passport.authenticate('jwt', { session: false }), (req, res) => {

    Job.aggregate([
        { $match: { status: 'archived', feedbackSent: false } },
        {
            $project: {
                "feedbackSent": "$feedbackSent",
                "jobTitle": '$jobTitle',
                "createdBy": '$createdBy',
                "companyName": "$companyName",
                candidates: {
                    $filter: {
                        input: '$candidates',
                        as: 'data',
                        cond: { $eq: ['$$data.status', 'Applied'] }
                    }
                }
            },
        },
        { $unwind: "$candidates" },
        { $lookup: { from: 'users', localField: 'candidates.user', foreignField: '_id', as: 'talents' } },
        { $unwind: "$talents" },
        { $unwind: "$createdBy" },
        { $lookup: { from: 'users', localField: 'createdBy', foreignField: '_id', as: 'employer' } },
        { $unwind: "$employer" },
        {
            $group: {
                _id: '$_id',
                createdBy: { '$mergeObjects': '$employer' },
                feedbackSent: { '$first': '$feedbackSent' },
                jobTitle: { '$first': '$jobTitle' },
                candidates: { $push: '$talents' }
            }
        }
    ]).exec((error, job) => {
        if (error) {
            throw new Error(error)
        } else {
            if (job.length > 0) {
                job.map(data => {

                    const { _id, candidates, jobTitle, createdBy: { feedbackMessage: { subjectLine, messageBody }, companyName } } = data
                    let personalizations = []

                    for (let index in candidates) {
                        personalizations[index] = candidates[index]
                    }

                    for (let index in personalizations) {
                        personalizations[index] = {
                            to: personalizations[index].email,
                            from: 'support@selfstarter.app',
                            template_id: 'd-ea1ae551aa0b4e26be32cf1f2889b2a4',
                            dynamic_template_data: {
                                jobTitle,
                                subjectLine,
                                companyName,
                                candidateName: personalizations[index].fullName
                            }
                        }
                    }

                    // Send the feedback with the personalized msg object
                    personalizations.map(msg => {
                        sgMail.send(msg).then(() => {
                            console.log('Feedback was sent!!!!')
                        }).catch(error => {
                            console.log(error)
                        })
                    })

                    // Update the feedbackSent property in the jobs document
                    Job.find({ _id: { $in: _id } }).exec((error, jobs) => {
                        if (error) {
                            throw new Error(error)
                        } else {
                            jobs.map(job => {
                                job.feedbackSent = true
                                job.save().then(result => {
                                    res.json(result)
                                }).catch(error => {
                                    if (error) {
                                        throw new Error(error)
                                    }
                                })
                            })
                        }
                    })
                })
            } else {
                res.json([])
            }
        }
    })

})

module.exports = router;