const membercontroller = require('../controllers/membercontroller')
const express = require('express')
const memrouter = express.Router();


memrouter.get('', membercontroller.member_index);
  
memrouter.post('', membercontroller.member_create_post);

memrouter.get('/add', membercontroller.member_create_get);

memrouter.get('/update/:id', membercontroller.member_update_get);

memrouter.post('/update/:id', membercontroller.member_update_patch);

memrouter.get('/:id', membercontroller.member_details);

memrouter.delete('/:id', membercontroller.member_delete);

module.exports = memrouter;