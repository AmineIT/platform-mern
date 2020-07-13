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
        type: String,
        require: true
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
    companyLogo: {
        type: String,
        require: true,
    },
    photoProfile: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    jobsCreated: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        }
    ]
});

// Define a pre hook for the document, in this case we are hashing the password before it gets sent to the db
UserSchema.pre('save', function(next) {
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
UserSchema.methods.comparePassword = function(password, callback) {

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