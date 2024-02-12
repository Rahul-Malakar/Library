const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('../.env')

const requireAuth = (req,res, next)=>{
    const token = req.cookies.jwt;
    //check if token exist and is verified
    if(token){
        jwt.verify(token, SECRET, (err, decodedToken)=>{
            if(err){
                console.log(err.message)
                res.redirect('/login')
            }
            else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.redirect('/login?notLoggedIn=true')
    }
}

//check current user
const checkUser =  (req,res, next) =>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, SECRET, async (err, decodedToken)=>{
            if(err){
                console.log(err.message)
                res.locals.user = null;
                next();
            }
            else{
                console.log(decodedToken);
                const user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    }
    else{
        res.locals.user = null;
        next();
    }
} 

module.exports = {
    requireAuth,
    checkUser
}