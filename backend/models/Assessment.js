const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
    assessmentTitle: {
        type: String,
        required: true,
    },
    questions: [{
        type: Array,
        required: true
    }],
    candidates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'draft'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Assessment', AssessmentSchema); 