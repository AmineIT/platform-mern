const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const passportJWT = require('passport-jwt');
require('dotenv').config();

const User = require('../models/User');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// Setup the JWT using the passport middleware for the authorization
passport.use(new JwtStrategy({
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY
}, (payload, done) => {
    User.findById({ _id: payload.sub }).populate('candidatesPipeline').exec((error, user) => {
        if (error) {
            return done(error, null)
        }

        if (user) {
            return done(null, user)
        }

        else {
            return done(null, false, { message: 'Token is invalid' })
        }
    })
}))

// Setup the passport authentification middleware
passport.use(new LocalStrategy((email, password, done) => {
    User.findOne({ email }, (error, user) => {
        // Check if there's an error while we're sending this request
        if (error) { return done(error) }
        // Check if there's no user exists
        if (!user) { return done(null, false) }
        // Compare the user password
        user.comparePassword(password, done)
    })
}))