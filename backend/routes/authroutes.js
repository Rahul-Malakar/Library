const authcontroller = require('../controllers/authcontroller');

const express = require('express');
const router = express.Router();

router.get('/signup', authcontroller.signupGet);
router.post('/signup', authcontroller.signupPost);

router.get('/login', authcontroller.loginGet);
router.post('/login', authcontroller.loginPost);

router.get('/logout', authcontroller.logoutget);

module.exports = router;
