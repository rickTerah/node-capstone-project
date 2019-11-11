require('express-async-errors');
const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = Router();

router.post('/create-user', auth, admin, UserController.createUserAccount);
router.post('/signin', UserController.loginUser);

module.exports = router;
