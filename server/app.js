require('dotenv').config()

const express = require('express')
const path = require('path')
const logger = require('morgan')
const cors = require('cors')
const passport = require('passport')
const { Strategy, ExtractJwt } = require("passport-jwt")
const config = require("./configs/index")
const User = require('./models/user')

const authRoutes = require('./routes/auth')
const gamesRoutes = require('./routes/games')
const favsRoutes = require('./routes/favs')
const userRoutes = require('./routes/user')
const resourceRoutes = require('./routes/resources')

require('./configs/database')
require('./configs/cloudinary')

const app = express()

app.use(cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Set the public folder to "~/client/build/"
// Example: http://localhost:3030/favicon.ico => Display "~/client/build/favicon.ico"
app.use(express.static(path.join(__dirname, '../client/build/')))


app.use(passport.initialize())
// Create the strategy for JWT
// payload is the object we encrypted at the route /api/token
// We get the user id, make sure the user exist by looking it up
const strategy = new Strategy(
  { secretOrKey: config.jwtSecret, jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() },
  (payload, done) => User.findById(payload.id).then(user =>
    user ? done(null, user) : done(new Error("User not found")) // make the user accessible in req.user
  )
)
// tell pasport to use it
passport.use(strategy)

// List all your API routes
app.use('/api', authRoutes)
app.use('/api/games', gamesRoutes)
app.use('/api/favs', favsRoutes)
app.use('/api/user', userRoutes)
app.use('/api/resources', resourceRoutes)

// For any routes that starts with "/api", catch 404 and forward to error handler
app.use('/api/*', (req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// For any other routes, redirect to the index.html file of React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

// Error handler
app.use((err, req, res) => {
  err.status = err.status || 500
  console.error("----- An error happened -----",err)
  if (process.env.NODE_ENV === 'production')
    res.json(err)
  else
    res.json(JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err))))
})

module.exports = app
