const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    jobRequirement: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        default: 'Not mentioned'
    },
    salaryCurrency: {
        type: String,
        default: 'Not mentioned'
    },
    showSalary: {
        type: Array,
        default: ['']
    },
    jobDepartment: {
        type: String,
        required: true
    },
    employmentType: {
        type: String,
        required: true
    },
    minRequirement: {
        type: String,
        required: false
    },
    candidates: [{
        status: {
            type: String,
            default: ''
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    assessment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assessment'
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'draft'
    },
    // applicationStatus: [{
    //     status: {
    //         type: String,
    //         default: ''
    //     },
    //     candidate: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User'
    //     }
    // }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiredAt: {
        type: Date,
        required: false
    }
});

module.exports = mongoose.model('Job', JobSchema); 