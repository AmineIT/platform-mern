const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;

const User = require('./models/User');

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookie) {
        token = req.cookie["access_token"];
    }
    return token;
}

// Setup the JWT using the passport middleware for the authorization
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: 'Selfstarter_Will_Succeed'
}, (payload, done) => {
    User.findById({_id : payload.sub}, (error, user) => {
        if (error) { return done(error, null) }
        if (user) { return done(null, user) }
        else { return done(null, false) }
    })
}))

// Setup the passport authentification middleware
passport.use(new LocalStrategy((email, password, done) => {
    User.findOne({email}, (error, user) => {
        // Check if there's an error while we're sending this request
        if (error) {return done(error)}
        // Check if there's no user exists
        if (!user) {return done(null, false)}
        // Compare the user password
        user.comparePassword(password, done)
    })
}))