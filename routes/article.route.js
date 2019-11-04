const express = require('express');
const ArticleController = require('../controllers/article.controller');

const router = express.Router();
const auth = require('../middlewares/auth');


router.post('/', auth, ArticleController.createSingleArticle);

module.exports = router;
