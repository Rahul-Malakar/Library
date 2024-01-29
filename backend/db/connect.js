require('../.env')

const mongoose = require('mongoose');

mongoose.connect(DBURIlocal)
  .then((result)=>{
    console.log('connected to database')
  })
  .catch((err)=>{
    console.log(err);
  })
