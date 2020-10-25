const express = require('express');
const jobRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../../passport');
const Joi = require('joi');
const Job = require('../../models/Job');

// Create a job
jobRouter.post('/create-job', passport.authenticate('jwt', {session: false}), (req, res) => {
    // Extract the job data from the body request
    const { jobTitle, jobDescription, jobDepartment, createdBy, ...rest } = req.body;

    const newJob = new Job({jobTitle, jobDescription, jobDepartment, createdBy, ...rest});

    newJob.save((error, job) => {
        if(error) {
            res.status(500).json({
                message: {
                    msgBody: 'Error has occured.',
                    msgError: true,
                }
            })
        } else {
            res.status(200).json(job)
        }
    })
})

// Get all the Jobs
jobRouter.get('/all-jobs', (res, req) => {
    Job.find().populate('createdBy').exec((error, jobs) => {
        if (error) {
            req.status(500).json({
                error
            })
        } else {
            req.status(200).json({
                jobs
            })
        }
    })
})

// Get all the jobs for a company
jobRouter.post('/company-jobs', passport.authenticate('jwt', {session: false}), (res, req) => {
    const { _id } = res.user;
    Job.find({createdBy: _id}).sort({createdAt: 'desc'}).populate('candidates').exec((error, jobs) => {
        if (error) {
            return req.status(500).json({
                error
            })
        } else {
            return req.status(200).json(
                jobs
            )
        }
    })
})

// Get a single job
jobRouter.get('/fetch-job/:id', passport.authenticate('jwt', {session: false}), (res, req) => {
    Job.findById(res.params.id, null, (error, job) => {
        if (error) {
            req.status(500).json({
                message: {
                    msgBody: 'Error has occured.',
                    msgError: true,
                }
            })
        }
        else {
            req.json(job)
        }
    })
})

// Update a job
jobRouter.post('/update-job/:id', passport.authenticate('jwt', {session: false}), (res, req) => {

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
        status
     } = res.body

    Job.findById(res.params.id, null, (error, job) => {
        if (error) {
            req.status(500).json({
                message: {
                    msgBody: 'Error has occured.',
                    msgError: true,
                }
            })
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
            job.createdAt = Date.now()

            job.save().then(job => {
                req.status(200).json(job)
            }).catch(error => {
                res.status(400).send("Update not possible");
            })
        }
    })
})

// Delete job
jobRouter.delete('/delete-job/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Job.deleteOne({_id: req.params.id}, (error, job) => {
        if (error) {
            res.status(500).json({
                message: {
                    msgBody: 'Error has occured.',
                    msgError: true,
                }
            })
        }
        else {
            res.json(job)
        }
    })
})

// Publish Job
jobRouter.post('/publish-job/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Job.updateOne({_id: req.params.id}, {status: 'published', createdAt: Date.now()}).exec((error, job) => {
        if (error) {
            res.status(500).json({
                message: {
                    msgBody: 'Error has occured.',
                    msgError: true,
                }
            })
        }
        else {
            res.json(job)
        }
    })
})

// Archive Job
jobRouter.post('/archive-job/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Job.updateOne({_id: req.params.id}, {status: 'archived', createdAt: Date.now()}).exec((error, job) => {
        if (error) {
            res.status(500).json({
                message: {
                    msgBody: 'Error has occured.',
                    msgError: true,
                }
            })
        }
        else {
            res.json(job)
        }
    })
})

module.exports = jobRouter;