//import mongodb connection file
require('./db/connect')
//import express
const express = require('express');
//import morgan
const morgan = require('morgan');
//import models
const Book = require('./models/book')
const Member = require('./models/member')
//import routes
const bookroutes = require('./routes/bookroutes')
const memberroutes = require('./routes/memberroutes')
const authroutes = require('./routes/authroutes')

//express app
const app = express();

//frontend reference
const path = require('path')
app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, '..', 'frontend', 'views'),path.join(__dirname, '..', 'frontend', 'views','books'),path.join(__dirname, '..', 'frontend', 'views', 'members'),path.join(__dirname, '..', 'frontend', 'views','auth')]);
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//base url
app.get('/', (req, res) => {
  res.redirect('/books');
});

//use routes
app.use(bookroutes);
app.use(memberroutes);
app.use(authroutes)

//404 page
app.use((req, res) => {
  res.render('404', { title: '404' });
});

//listen to request
app.listen(3000, (req, res) => {
  try {
    console.log('listening...');
  } catch (err) {
    console.log(err);
  }
});