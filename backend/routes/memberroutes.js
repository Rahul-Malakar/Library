const membercontroller = require('../controllers/membercontroller')
const express = require('express')
const memrouter = express.Router();


memrouter.get('/members', membercontroller.member_index);
  
memrouter.post('/members', membercontroller.member_create_post);

memrouter.get('/members/add', membercontroller.member_create_get);

memrouter.get('/members/update/:id', membercontroller.member_update_get);

memrouter.post('/members/update/:id', membercontroller.member_update_patch);

memrouter.get('/members/:id', membercontroller.member_details);

memrouter.delete('/members/:id', membercontroller.member_delete);

module.exports = memrouter;