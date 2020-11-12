const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../../config/passport');
const Joi = require('joi');
const Assessment = require('../../models/Assessment');
const moment = require('moment')

// @desc    Create new assessment
// @route   POST /assessment/create-assessment/
// @access  Private
router.post('/create-assessment', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { assessmentTitle, questions, candidates, createdBy, ...rest } = req.body;
    const newAssessment = new Assessment({ assessmentTitle, questions, candidates, createdBy, ...rest });

    newAssessment.save((error, assessment) => {
        if (error) {
            throw new Error('Error has occured!')
        } else {
            res.status(200).json(assessment)
        }
    })
})

module.exports = router