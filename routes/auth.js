const express  = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');
const requireLogin = require('../middleware/requireLogin')

router.get('/',(req,res)=>{
    res.send('hi')
})

router.post('/signup', (req,res)=>{
    const {name,email,password,pic} = req.body;
    if (!email || !password || !name){
        return res.status(422).json({error:"Please enter all the fields"})
    }
    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"An account already exists with that email ID"})
        }
        bcrypt.hash(password,17).then(hashedpassword =>{
            const user = new User({
                email,
                password:hashedpassword,
                name,
                pic
            })
            user.save().then(user=>{
                res.json({message:"Created successfully!"})
            }).catch(err=>{
                console.log(err);
            })
        })
    }).catch(err=>{
        console.log(err);
    })
})

router.post('/signin', (req,res)=>{
    const {email,password} = req.body;
    if (!email || !password){
        return res.status(422).json({error:"Missing email or password"})
    }
    User.findOne({email:email}).then(savedUser =>{
        if (!savedUser){
            return res.status(422).json({error:"Invalid email address"})
        }
        bcrypt.compare(password,savedUser.password).then(doMatch =>{
            if(doMatch){
                //res.json({message:"Successfully signed in"})
                const token = jwt.sign({_id:savedUser._id}, JWT_SECRET);
                const {_id,name,email,followers,following,pic} = savedUser;
                res.json({token, user:{_id,name,email,followers,following,pic}}); 
            }
            else{
                return res.status(422).json({error:"Invalid password"})
            }
        }).catch(err =>{
            console.log(err);
        })
    })
})

module.exports = router;