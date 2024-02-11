const User = require('../models/user')
const statuscode = require('../statuscode')
const jwt = require('jsonwebtoken')

//handle errors
const handleErrors = (err)=>{
    console.log(err.message, err.code);
    let errors = {email: '', password: ''};

    //incorrect email
    if(err.message === 'incorrect email'){
        errors.email = 'email is not registered'
    }
    //incorrect password
    if(err.message === 'incorrect password'){
        errors.password = 'password is incorrect'
    }

    //duplicate
    if(err.code===11000){
        errors.email = 'already registered';
        return errors;
    }

    //validation errors
    // if(err.message.includes('User validation failed')){
    //     (Object.values(err.errors)).forEach(({properties}) =>{
    //         console.log(properties)
    //     })
    // }
    
    if(err.message.includes('User validation failed')){
        (Object.values(err.errors)).forEach(({properties}) =>{
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}


const maxAge = 3*24*60*60;
const createToken = (id) =>{
    return jwt.sign({id}, 'rahul secret', {
        expiresIn: maxAge
    })
}

const signupGet = (req,res)=>{
    res.render('signup', {title:'signup'})
}
const signupPost = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.create({email,password});
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
        res.status(success).json({user : user._id});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(failed).json({errors});
    }
}
const loginGet = (req,res)=>{
    const notLoggedIn = req.query.notLoggedIn === 'true';

  // Render your login page and pass notLoggedIn to the view
  res.render('login', {title: 'login', notLoggedIn });
}
const loginPost = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.login(email,password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
        res.status(success).json({user: user._id})
    }
    catch(err){
        const errors = handleErrors(err)
        res.status(failed).json({errors});
    }

}

const logoutget = (req,res)=>{
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/login')
}

module.exports = {
    signupGet,
    signupPost,
    loginGet,
    loginPost,
    logoutget
}