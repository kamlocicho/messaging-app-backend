const express = require('express')
require('dotenv').config()
const passport = require('passport')
const { connectDB } = require('./config/db')
const morgan = require('morgan')
const jwtStrategy = require('./config/strategy')

const app = express()
const PORT = process.env.PORT || 5000

app.use(morgan('dev'))
app.use(express.json())

passport.use(jwtStrategy)
app.use(passport.initialize())

app.get('/', (req, res) => {
    res.send("Hello world!")
})

app.use('/auth', require('./controllers/auth'))
app.use('/rooms', require('./controllers/room'))

app.listen(PORT, () => {
    connectDB()
    console.log("Server is running on port " + PORT)
})