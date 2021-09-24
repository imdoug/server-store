const express = require('express')
const Nike = require('../models/nike.js')
const nike = express.Router()

const isAuthenticated = (req,res, next)=>{
    // if there is a user logged in let him create fruits 
    if(req.session.currentUser){
      return next()
    } else{
      //otherwise tell him to log in ou sign up 
      res.redirect('/sessions/login')
    }
  }
///NEW ROUTE
nike.get('/new', isAuthenticated, (req,res)=>{
    res.render('new.ejs', {currentUser: req.session.currentUser})
})

//EDIT ROUTE
nike.get('/:id/edit', (req, res)=>{
    Nike.findById(req.params.id, (err, foundSneaker)=>{
        res.render('edit.ejs', {
            sneakers: foundSneaker,
            id: req.params.id
            , currentUser: req.session.currentUser

        });
    });
});

//DELETE
nike.delete('/:id', (req,res)=>{
    Nike.findOneAndRemove(req.params.id, (err,foundSneaker)=>{
        console.log('removing ...',foundSneaker)
        if(err){
            console.log(err)
        }else{
            res.redirect('/nike')
        }
    })
})
// SEED Route
nike.get('/startData', (req, res)=>{
    Nike.create(
        [
            {
                name: 'Air Max Genome',
                description: "Inspired by the early 2000s look, the Air Max Genome adds a fresh face to the Air Max house. Its techy upper features a mixture of materials including sleek no-sew skins, airy mesh and durable plastic details. The low-profile, full-length Air unit adds comfort to match its sleek design that's sure to become your new favorite Air Max. This product is made with at least 20% recycled materials by weight.",
                img: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/51ed7057-0d6e-4fe1-a24a-a12502142830/air-max-genome-mens-shoes-f4SHr3.png',
                price: 115,
                quantity: 30,
            },
            {
                name: 'Air Force 1 Shadow',
                description: 'The Nike Air Force 1 Shadow SE puts a playful twist on a classic b-ball design. Using a layered approach, doubling the branding and exaggerating the midsole, it highlights AF1 DNA with a bold look. The pixelated Swoosh designs add fresh expressions to the branding while the holographic details level-up your look.',
                img: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/3673b76f-0cab-4d1c-bfde-a5d85d72efb2/zoomx-vaporfly-next-x-gyakusou-running-shoes-c0TglG.png',
                price: 90,
                quantity: 50,
            },
            {
                name: 'ZoomX Vaporfly',
                description: "Maverick spirit. Jun Takahashi and his GIRA (Gyakusou International Running Association) return with another running staple. The Nike ZoomX Vaporfly Next% x Gyakusou clears your path to record-breaking speed with a light and fast feel. It's designed with more cushioning underfoot and reduced weight for energy return and comfort.",
                img: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/1d2f4712-94e3-4a7b-afcf-45b2cade8b37/waffle-one-mens-shoe-nBt8QX.png',
                price: 300,
                quantity: 10,
            }
        ], 
        (err, data)=>{
            res.redirect('/nike');
        }
    )
});

//SHOW ROUTE
nike.get('/:id', (req,res)=>{
    Nike.findById(req.params.id, (err, foundSneaker)=>{
        res.render('show.ejs', 
        {
            sneakers: foundSneaker,
            id: req.params.id
            , currentUser: req.session.currentUser
        })
    })
})
//UPDATE STOCK 
nike.put('/:id/:qtt', (req,res) =>{
    Nike.findByIdAndUpdate(req.params.id,{$set: {quantity: req.params.qtt - 1}}
        ,{new:true}, (err, foundSneaker)=>{
            if(err){
                console.log(err)
            }else{
                res.redirect(`/nike/${req.params.id}`)  
            }
    })
    
})

//UPDATE 
nike.put('/:id', (req,res) =>{
    Nike.findByIdAndUpdate(req.params.id, req.body
        ,{new:true}, (err, foundSneaker)=>{
            if(err){
                console.log(err)
            }else{
                res.redirect('/nike')
            }
    })
    
})
 
//CREATE ROUTE
nike.post('/', (req,res)=>{
    Nike.create(req.body, (err, createdSneaker)=>{
        if(err){
            res.send(err)
        }else{
            res.redirect('/nike')
        }
    })
})

//INDEX ROUTE
nike.get('/', (req,res)=>{
    Nike.find({}, (err, allNikes)=>{
        res.render('index.ejs', 
        {
        sneakers: allNikes,
        currentUser: req.session.currentUser
        })
    })  
})


module.exports = nike