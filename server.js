const express = require('express')
const methodOverride =  require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')
const userControllers = require('./controllers/user_controllers.js')
const sessionsController = require('./controllers/session_controllers.js')

//CONFIGURATION
const app = express()
const db = mongoose.connection
require('dotenv').config()
const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.MONGODB_URI;

//MIDDLEWARE

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use( express.static('public'))

app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.use( methodOverride('_method'))
app.use('/users', userControllers)
app.use('/sessions', sessionsController)

// DATABASE
mongoose.connect(
  MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    () => {
      console.log('the connection with mongod is established at', MONGODB_URI)
    }
  )

db.on('error', err => console.log(err.message + ' is mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))
app.use(express.static('public'));

  const nikeControllers = require('./controllers/nike_controllers.js')
  app.use('/nike', nikeControllers)
  
  app.get('/', (req, res) => {
    res.redirect('/nike')
  })
//connections 
app.listen(PORT, ()=>{
    console.log(PORT, 'is open!')
})