const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

sessions.get('/login', (req,res)=>{
    res.render('sessions/login.ejs'
    ,{currentUser: req.session.currentUser})
})
sessions.post('/',(req,res)=>{
    User.findOne({username: req.body.username}, (err, foundUser)=>{
        if(err){
            console.log(err)
            res.send('oops the db had a problem!')
        }else if(!foundUser){
            res.sendStatus(status)
        }else{
            if(bcrypt.compareSync(req.body.password, foundUser.password)){
                req.session.currentUser = foundUser
                res.redirect('/')
            }else{
                res.send("<a href="/">Password does not match</a>")
            }
        }
    })
})
sessions.delete('/',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
})

module.exports = sessions