const express = require('express');
const { createBook, getBooks, deleteBook ,updateBook} = require('../controllers/booksController');
const checkIsbn = require('../middlewares/checkIsbn');

const router = express.Router();
const booksController = require('../controllers/booksController');


router.post('/', checkIsbn, createBook);
router.get('/', getBooks);
router.delete('/:id', deleteBook);
router.put('/:id', updateBook);




module.exports = router;

