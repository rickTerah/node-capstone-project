require('express-async-errors');
const { Router } = require('express');
const UserController = require('../controllers/user.controller');

const router = Router();

router.post('/', UserController.createUserAccount);

module.exports = router;
