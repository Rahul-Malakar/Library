const bookcontroller = require('../controllers/bookcontroller');

const express = require('express');
const router = express.Router();

router.get('/books', bookcontroller.book_index);

router.get('/books/create', bookcontroller.book_create_get);

router.post('/books', bookcontroller.book_create_post);

router.get('/books/update/:id', bookcontroller.book_update_get);

router.post('/books/update/:id', bookcontroller.book_update_patch)

router.get('/books/:id', bookcontroller.book_details);

router.delete('/books/:id', bookcontroller.book_delete);

module.exports = router;
