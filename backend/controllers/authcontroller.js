const User = require('../models/user')

//handle errors
const handleErrors = (err)=>{
    console.log(err.message, err.code);
    let error = {email: '', password: ''};

    //validation errors
    if(err.message.includes('User validation failed')){
        console.log(err)
    }
}

const signupGet = (req,res)=>{
    res.render('signup', {title:'signup'})
}
const signupPost = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.create({email,password});
        res.status(201).json(user);
    }
    catch(err){
        handleErrors(err);
        res.status(400).send('error, user not created');
    }
}
const loginGet = (req,res)=>{
    res.render('login', {title:'login'})
}
const loginPost = async (req,res)=>{
    try{

    }
    catch(err){

    }
}

module.exports = {
    signupGet,
    signupPost,
    loginGet,
    loginPost
}