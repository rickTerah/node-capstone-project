require('../models/db/article')();
const db = require('../models/db/index');
const generateId = require('../starters/identity');
const { validatePost } = require('../models/validates/article.validate');

const today = new Date();
const date = `${today.getFullYear()}-${(today.getMonth() + 1)}-${+today.getDate()}`;
const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
const dateTime = `${date} ${time}`;
class ArticleController {
  static async createSingleArticle(req, res) {
    const { error } = validatePost(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        error: error.details[0].message,
      });
    }

    const { title, article, categoryId } = req.body;
    const createdOn = dateTime;
    const articleId = generateId(5484621);
    const category = await db.query(`SELECT * FROM categories WHERE categoryId = ${categoryId}`);
    if (category.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        error: 'Category with the specified categoryId NOT found',
      });
    }

    const createdBy = req.user.email;

    await db.query(
      `INSERT INTO articles (articleId, title, article, createdOn, categoryId, createdBy) 
        VALUES ($1, $2, $3, $4, $5, $6)`, [articleId, title, article, createdOn, categoryId, createdBy],
    );
    return res.status(201).json({
      status: 'sucess',
      data: {
        message: 'Article successfully posted',
        articleId,
        createdOn,
        title,
        createdBy,
      },
    });
  }
}


module.exports = ArticleController;
