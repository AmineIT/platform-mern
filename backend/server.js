const express = require('express')
const cors = require('cors')
const passport = require('passport')
const morgan = require('morgan')
const connectDB = require('./config/db')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

require('dotenv').config();

const userRouter = require('./routes/api/User')
const jobRouter = require('./routes/api/Jobs')
const assessmentRouter = require('./routes/api/Assessments')

// Setup the express 
const app = express()
app.use(express.json())
app.use(cors())
app.use(passport.initialize())
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
    res.send('Hello World')
})

// Setup the MongoDB connection
connectDB()

// Setup the routes
app.use('/users', userRouter)
app.use('/jobs', jobRouter)
app.use('/assessments', assessmentRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => { console.log(`listening on port ${PORT}`) })

app.use(notFound)
app.use(errorHandler)