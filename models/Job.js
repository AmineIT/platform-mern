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
    minSalary: {
        type: String,
        default: 'Not mentioned'
    },
    maxSalary: {
        type: String,
        default: 'Not mentioned'
    },
    jobDepartment: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    expiredAt: {
        type: Date
    }
});

module.exports = mongoose.model('Job', JobSchema); 