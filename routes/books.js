const express = require('express');
const { createBook, getBooks, deleteBook } = require('../controllers/booksController');

const router = express.Router();

router.post('/', createBook);
router.get('/', getBooks);
router.delete('/:id', deleteBook);

module.exports = router;

