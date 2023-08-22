const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/keys');
const mongoose = require('mongoose');
const user = mongoose.model("User");
module.exports = (req,res,next)=>{
    const {authorization} = req.headers;
    //authorization looks like 'Bearer token_name'
    if (!authorization){
        return res.status(401).json({error:"You must be logged in"})
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token, JWT_SECRET, (err, payload)=>{
        if (err){
            return res.status(401).json({error:"You must be logged in"})
        }

        const {_id} = payload;
        user.findById(_id).then(userdata =>{
            req.user = userdata;
            next();
        })
    })
}