const express = require('express');
const CategoryController = require('../controllers/category.controller');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

router.get('/', auth, admin, CategoryController.getAllCategories);
router.get('/:id', auth, admin, CategoryController.getSingleCategory);
router.post('/', auth, admin, CategoryController.createSingleCategory);
router.patch('/:id', auth, admin, CategoryController.updateSingleCategory);
router.delete('/:id', auth, admin, CategoryController.deleteSingleCategory);

module.exports = router;
