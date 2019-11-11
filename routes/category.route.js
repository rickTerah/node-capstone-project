const express = require('express');
const CategoryController = require('../controllers/category.controller');
const ArticleController = require('../controllers/article.controller');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

router.get('/v1', auth, admin, CategoryController.getAllCategories);
router.get('/v1/:id', auth, admin, CategoryController.getSingleCategory);
router.post('/v1', auth, admin, CategoryController.createSingleCategory);
router.patch('/v1/:id', auth, admin, CategoryController.updateSingleCategory);
router.delete('/v1/:id', auth, admin, CategoryController.deleteSingleCategory);

router.get('v1/:categoryId/articles', auth, ArticleController.getArticlesInCategory);

module.exports = router;
