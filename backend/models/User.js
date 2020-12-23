const mongoose = require('mongoose');
const bcrytp = require('bcrypt');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    role: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        default: null
    },
    companyWebsite: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: true
    },
    aboutMe: {
        type: String,
        default: null
    },
    currentJobRole: {
        type: String,
        default: null
    },
    profileImage: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    emailToken: {
        type: String
    },
    resetToken: {
        type: String
    },
    expireToken: {
        type: Date
    },
    steps: {
        type: Boolean,
        default: true
    },
    brandColor: {
        type: String,
        default: '#1C65E3'
    },
    notifyWhenCandidateApplies: {
        type: Boolean,
        default: true
    },
    notifyWhenCandidateCompleteAssessment: {
        type: Boolean,
        default: true
    },
    feedbackMessage: {
        subjectLine: {
            type: String,
            default: 'Feedback for your application'
        },
        messageBody: {
            type: String,
            default: 'Unfortunately, you were not selected for this position...'
        }
    },
    socialMediaAccounts: [{
        type: {
            type: String,
            default: ''
        },
        URL: {
            type: String,
            default: ''
        }
    }],
    appliedFor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }],
    notifications: [{
        message: {
            type: String,
            required: true
        },
        messageType: {
            type: String,
            required: true
        },
        addedAt: {
            type: Date,
            default: Date.now
        }
    }],
    candidatesPipeline: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    assessmentsTaken: [{
        assessment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Assessment'
        },
        score: {
            type: String,
            required: true,
            default: ''
        },
        status: {
            type: String,
            default: 'Saved'
        },
        completedAt: {
            type: Date,
            default: Date.now
        }
    }],
    candidateWorkExperience: [{
        jobTitle: {
            type: String
        },
        workedAt: {
            type: String
        },
        startDate: {
            month: {
                type: String
            },
            year: {
                type: String
            }
        },
        endDate: {
            month: {
                type: String
            },
            year: {
                type: String
            }
        },
        isPresent: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        },
        location: {
            type: String
        },
        employmentType: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    candidateEducation: [{
        degree: {
            type: String
        },
        fieldOfStudy: {
            type: String
        },
        schoolName: {
            type: String
        },
        location: {
            type: String
        },
        startDate: {
            month: {
                type: String
            },
            year: {
                type: String
            }
        },
        endDate: {
            month: {
                type: String
            },
            year: {
                type: String
            }
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
});

// Define a pre hook for the document, in this case we are hashing the password before it gets sent to the db
UserSchema.pre('save', function (next) {
    // Check if the password has been modified or not
    if (!this.isModified('password')) {
        return next();
    }

    // Hashing the password
    bcrytp.hash(this.password, 10, (error, hashedPassword) => {
        if (error) {
            return next();
        }
        this.password = hashedPassword;
        next();
    })
})

// Compare the plain text password with the hashed password that's store in our db
UserSchema.methods.comparePassword = function (password, callback) {

    bcrytp.compare(password, this.password, (error, isMatched) => {
        if (error) {
            return callback(error);
        } else if (!isMatched) { // if the password does not match we return an error
            return callback(null, isMatched);
        } else {
            return callback(null, this); // if the password matchs then we return the user
        }
    })

}

module.exports = mongoose.model('User', UserSchema);