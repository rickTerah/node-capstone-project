const express = require('express');
const ArticleController = require('../controllers/article.controller');

const router = express.Router();
const auth = require('../middlewares/auth');


router.post('/', auth, ArticleController.createSingleArticle);
router.patch('/:articleId', auth, ArticleController.updateSingleArticle);
router.delete('/:articleId', auth, ArticleController.deleteSingleArticle);

module.exports = router;
