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
//import cookie-parser
const cookieparser = require('cookie-parser')
//auth middleware
const { requireAuth, checkUser } = require('./middleware/authmiddleware');

//express app
const app = express();

//frontend reference
const path = require('path');
const cookieParser = require('cookie-parser');
app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, '..', 'frontend', 'views'),path.join(__dirname, '..', 'frontend', 'views','books'),path.join(__dirname, '..', 'frontend', 'views', 'members'),path.join(__dirname, '..', 'frontend', 'views','auth')]);
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

//base url
app.get('*', checkUser)
app.get('/', (req, res) => {
  res.redirect('/books');
});

//cookies
// app.get('/set-cookies', (req,res)=>{
//   // res.setHeader('Set-Cookie', 'newUser=true');
//   res.cookie('newUser', false);
//   res.cookie('isEmployee', true, {maxAge: 1000*60*60*24});
//   res.send('you got some cookies')
// })

// app.get('/read-cookies', (req,res)=>{
//   const cookies = req.cookies;
//   console.log(cookies);
//   res.json(cookies);
// })


//use routes

app.use(bookroutes);
app.use('/members',requireAuth,memberroutes);
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