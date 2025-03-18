const express = require('express');
const {  getTransactions } = require('../controllers/transactionsController');

const router = express.Router();

// router.post('/', createTransaction);
router.get('/', getTransactions);

module.exports = router;
