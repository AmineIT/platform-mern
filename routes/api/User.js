const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../../passport');
const Joi = require('joi');
const JWT = require('jsonwebtoken');
const User = require('../../models/User');

// Setup the registration route
userRouter.post('/registre', (req, res) => {
    // Extract the user data from the request body
    console.log(req.body)
    const {fullName, email, password, role, ...data} = req.body;
    // Check if this email is already exist if the database

    const schema = Joi.object().keys({
        fullName: Joi.string().trim().min(3).required().error(errors => {
            return errors.map(error => {
                switch (error.type) {
                  case "string.min":
                    return { message: "Full Name must be more than 3 characters." };
                  case "string.required":
                    return { message: "Full Name is required." };
                  case "any.empty":
                    return { message: "Full Name is required." };
                }
              }
            )
        }),
        password: Joi.string().trim().min(6).required().error(() => 'Password is required.'),
        email: Joi.string().trim().required().error(() => 'Email is required.')
    })

    const result = Joi.validate(req.body, schema, {allowUnknown: true});

    if (result.error) {
        return res.status(400).send({msgError: result.error.details[0].message});
    }

    User.findOne({email}, (error, user) => {
        // Check if there's an error while we're sending this request
        if (error) {
            res.status(500).json({
                message: {
                    msgBody: 'Error has occured.',
                    msgError: true,
                }
            })
        }
        // If there's an email in our data return an error
        if (user) {
            res.status(400).json({
                message: {
                    msgBody: 'This email is already used.',
                    msgError: true,
                }
            })
        }
        // If there's no such an email then add it to the database
        else {
            const newUser = new User({fullName, email, password, role, ...data});
            newUser.save(error => {
                // Check if there's an error while we're sending this request
                if (error) {
                    res.status(500).json({
                        message: {
                            msgBody: 'Error has occured.',
                            msgError: true,
                        }
                    })
                }
                else {
                    // When the user is successfully created
                    res.status(201).json({
                        message: {
                            msgBody: 'Account successfully created.',
                            msgError: false,
                        }
                    })
                }
            })
        }
    })
});

// Setup the login route using passport local middleware
// JWT Payload
const payload = (userID) => {
    return {
        iss: 'Selfstarter',
        sub: userID
    }
}

// Create the JWT with the Payload, Secret Key and expiration date as an option
const signToken = userID => {
    return JWT.sign(payload(userID), 'Selfstarter_Will_Succeed', {expiresIn: '1h'});
} 

userRouter.post('/login', passport.authenticate('local', {session: false}) ,(req, res) => {
    // isAuthenticated it's a function from passport middleware that returs true or false if the user is loged in
    if (req.isAuthenticated()) { // once the user is authenticated then the code below will run
        // Extract the ID, fullName and role from the req.user ofject
        const {_id, fullName, role} = req.user;
        console.log(req.user)
        // Create the JWT token
        const token = signToken(_id);
        // Add the JWT token to the cookie
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
        res.status(200).json({
            // Return this object back
            isAuthenticated: true,
            user: {
                fullName, role
            }
        })
    }
});

// Setup the logout route using passport middleware
userRouter.get('/logout' ,(req,res) => {
    req.logout();
    res.clearCookie('access_token');
    res.json({user:{username : "", role : ""},success : true});
});

userRouter.get('/authenticated', passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {username,role} = req.user;
    res.status(200).json({isAuthenticated : true, user : {username,role}});
});

// Check if the email exist
userRouter.post('/email-check', (req, res) => {
    const email = req.body.email;

    User.findOne({email}, (error, user) => {
        if (error) {
            return res.status(500).json({
                message: {
                    msgBody: 'Error has occured.',
                    msgError: true,
                }
            })
        }

        if (user) {
            return res.status(200).json({
                message: {
                    msgBody: 'This email is already taken.',
                    emailExist: true,
                    msgError: false,
                }
            })
        } else {
            return res.status(200).json({
                message: {
                    msgBody: 'This email does not exist.',
                    emailExist: false,
                    msgError: false,
                }
            })
        }
    })
})

module.exports = userRouter;