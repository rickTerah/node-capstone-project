const express = require('express');
const CategoryController = require('../controllers/category.controller');

const router = express.Router();

router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getSingleCategory);
router.post('/', CategoryController.createSingleCategory);
router.patch('/:id', CategoryController.updateSingleCategory);
router.delete('/:id', CategoryController.deleteSingleCategory);

module.exports = router;
