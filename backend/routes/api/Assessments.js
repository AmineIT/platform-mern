const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../../config/passport');
const Joi = require('joi');
const Assessment = require('../../models/Assessment');

// @desc    Create new assessment
// @route   POST /assessments/create-assessment/
// @access  Private
router.post('/create-assessment', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { assessmentTitle, questions, candidates, createdBy, ...rest } = req.body;
    const newAssessment = new Assessment({ assessmentTitle, questions, candidates, createdBy, ...rest });

    newAssessment.save((error, assessment) => {
        if (error) {
            throw new Error(error)
        } else {
            res.status(200).json(assessment)
        }
    })
})

// @desc    Fetch assessments of a company
// @route   GET /assessments/fetch-company-assessments/
// @access  Private
router.get('/fetch-company-assessments', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { _id } = req.user
    Assessment.find({ createdBy: _id }).sort({ createdAt: 'desc' }).populate('candidates').exec((error, assessments) => {
        if (error) {
            throw new Error(error)
        } else {
            res.status(200).json(assessments)
        }
    })

})

// @desc    Fetch single assessment of a company
// @route   GET /assessments/fetch-company-assessment/
// @access  Private
router.get('/fetch-assessment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.params.id
    Assessment.findById(id).populate('createdBy', 'profileImage').exec((error, assessment) => {
        if (error) {
            throw new Error(error)
        } else {
            res.status(200).json(assessment)
        }
    })

})

module.exports = router