const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    username : String,
    email : String,
    issued : String
},{timestamps: true});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;