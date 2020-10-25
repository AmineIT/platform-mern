const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
require('dotenv').config();

const userRouter = require('./routes/api/User');
const jobRouter = require('./routes/api/Jobs');

// Setup the express 
const app = express();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('Hello World');
})

// Setup the MongoDB connection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('MongoDB is Connected...'))
        .catch(error => console.log(error))

// Setup the routes
app.use('/users', userRouter);
app.use('/jobs', jobRouter);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => { console.log(`listening on port ${PORT}`) });