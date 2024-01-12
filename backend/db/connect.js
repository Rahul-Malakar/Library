require('../.env')

const mongoose = require('mongoose');

mongoose.connect(DBURI)
  .then((result)=>{
    console.log('connected to database')
  })
  .catch((err)=>{
    console.log(err);
  })
