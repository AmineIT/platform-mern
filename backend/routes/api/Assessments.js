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

// @desc    Update an assessment
// @route   PUT /assessments/update-assessment/:id
// @access  Private
router.put('/update-assessment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { assessmentTitle, questions, candidates, createdBy, status } = req.body;
    Assessment.findById(req.params.id, null, (error, assessment) => {
        if (error) {
            throw new Error(error)
        }
        else {
            assessment.assessmentTitle = assessmentTitle
            assessment.questions = questions
            assessment.candidates = candidates
            assessment.createdBy = createdBy
            assessment.status = status
            assessment.createdAt = Date.now()

            assessment.save().then(assessment => {
                res.status(200).json(assessment)
            }).catch(error => {
                res.status(400)
                throw new Error(error)
            })
        }
    })
})

// @desc    Delete am assessment
// @route   DELETE /assessment/delete-assessment/:id
// @access  Private
router.delete('/delete-assessment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Assessment.deleteOne({ _id: req.params.id }, (error, assessment) => {
        if (error) {
            throw new Error('Error has occured!')
        }
        else {
            res.json(assessment)
        }
    })
})

// @desc    Publish an assessment
// @route   PUT /assessments/pubish-assessment/:id
// @access  Private
router.put('/publish-assessment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Assessment.updateOne({ _id: req.params.id }, { status: 'published', createdAt: Date.now() }).exec((error, assessment) => {
        if (error) {
            throw new Error('Error has occured!')
        }
        else {
            res.json(assessment)
        }
    })
})

module.exports = router