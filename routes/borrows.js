const express = require('express');
const { borrowBook, returnBook  } = require('../controllers/borrowsController');

const router = express.Router();

router.post('/', borrowBook);
router.put('/return/:id', returnBook);

module.exports = router;
