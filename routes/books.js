const express = require('express');
const { createBook, getBooks, deleteBook ,updateBook} = require('../controllers/booksController');

const router = express.Router();
const booksController = require('../controllers/booksController');

router.post('/', createBook);
router.get('/', getBooks);
router.delete('/:id', deleteBook);
router.put('/:id', updateBook);




module.exports = router;

