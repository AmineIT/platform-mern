const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../../config/passport');
const Joi = require('joi');
const Job = require('../../models/Job');

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
// @route   PUT /users/update-kanbanstatus/:id
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
            } else {
                req.status(400).json({ message: 'nothing found' })
            }
        })
    })

})

module.exports = router;