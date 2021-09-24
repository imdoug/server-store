const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')

//login
users.get('/login', (req,res)=>{
    res.render('users/login.ejs', 
    {currentUser: req.session.currentUser})
})
users.post('/', (req,res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser)=>{
        if(err){
            console.log(err)
        }else{
        console.log('user is created', createdUser)
        res.redirect('/sessions/login')
        }
    })
})

module.exports = users