const express = require('express');
const CategoryController = require('../controllers/category.controller');
const ArticleController = require('../controllers/article.controller');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

router.get('/v1/categories', auth, admin, CategoryController.getAllCategories);
router.get('/v1/categories/:id', auth, admin, CategoryController.getSingleCategory);
router.post('/v1/categories', auth, admin, CategoryController.createSingleCategory);
router.patch('/v1/categories/:id', auth, admin, CategoryController.updateSingleCategory);
router.delete('/v1/categories/:id', auth, admin, CategoryController.deleteSingleCategory);

router.get('/v1/categories/:categoryId/articles', auth, ArticleController.getArticlesInCategory);

module.exports = router;
