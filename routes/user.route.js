require('express-async-errors');
const { Router } = require('express');
const UserController = require('../controllers/user.controller');

const router = Router();

router.post('/v1/create-user', UserController.createUserAccount);
router.post('/v1/signin', UserController.loginUser);

module.exports = router;
