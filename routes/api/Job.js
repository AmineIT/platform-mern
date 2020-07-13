const express = require('express');
const jobRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../../passport');
const Joi = require('joi');
const Job = require('../../models/Job');

// Create a job
jobRouter.post('/create-job', (req, res) => {
    // Extract the job data from the body request
    const { jobTitle, jobDescription, jobDepartment, createdBy } = req.body;

    const newJob = new Job({jobTitle, jobDescription, jobDepartment, createdBy});

    newJob.save((error, job) => {
        if(error) {
            res.status(500).json({
                message: {
                    msgBody: 'Error has occured.',
                    msgError: true,
                }
            })
        } else {
            res.status(200).json({
                message: {
                    msgBody: 'job has been created.',
                    msgError: false,
                },
                job: {
                    jobID: job._id,
                    jobTitle,
                    createdBy
                }
            })
        }
    })
})

// Get Jobs
jobRouter.get('/', (res, req) => {
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

module.exports = jobRouter;