require('../models/db/articleComment')();
const db = require('../models/db/index');
const generateId = require('../starters/identity');
const { validate } = require('../models/validates/articleComment.validate');

const today = new Date();
const date = `${today.getFullYear()}-${(today.getMonth() + 1)}-${+today.getDate()}`;
const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
const dateTime = `${date} ${time}`;
class ArticleCommentController {
  static async writeComment(req, res) {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        error: error.details[0].message,
      });
    }

    const { comment } = req.body;
    const { articleId } = req.params;
    const createdOn = dateTime;
    const createdBy = req.user.email;
    const commentId = generateId(10000);

    const article = await db.query(`SELECT * FROM articles WHERE articleId = ${articleId}`);
    if (article.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        error: 'Article with the specified ID NOT found',
      });
    }
    await db.query(
      `INSERT INTO articles_comments (commentId, comment, createdOn, articleId, createdBy) 
        VALUES ($1, $2, $3, $4, $5)`,
      [commentId, comment, createdOn, articleId, createdBy],
    );
    return res.status(201).json({
      status: 'sucess',
      data: {
        message: 'Comment Successfully created',
        createdOn,
        articleTitle: article.rows[0].title,
        article: article.rows[0].article,
        comment,
      },
    });
  }
}


module.exports = ArticleCommentController;
