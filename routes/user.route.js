require('express-async-errors');
const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/admin');

const router = Router();

router.post('/v1/auth/create-user', auth, isAdmin, UserController.createUserAccount);
router.post('/v1/auth/signin', UserController.loginUser);

module.exports = router;
