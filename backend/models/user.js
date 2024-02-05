const mongoose = require('mongoose')
const {isEmail} = require('validator')

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true, 'Please enter an email'],
        unique : true,
        lowercase: true,
        validate : [isEmail, 'Please enter a valid email address']
    },
    password : {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [6, 'Minimum password length can be 6 characters']
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;