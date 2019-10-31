require('express-async-errors');
const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = Router();

router.post('/', auth, admin, UserController.createUserAccount);

// Admin token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzI1MzAwMDB9.bl-4moHzWXgnvRML4HhlY2ZyKN462G8TyMcbYBN3qpo

module.exports = router;
