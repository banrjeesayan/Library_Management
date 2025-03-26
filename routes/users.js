const express = require('express');
const { createUser, getUsers, getUserById } = require('../controllers/usersController');
const checkEmailExists = require('../middlewares/checkEmailExists');


const router = express.Router();

router.post('/', checkEmailExists, createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);

module.exports = router;
