require('../models/db/category')();
const db = require('../models/db/index');
const generateId = require('../starters/identity');
const { validate } = require('../models/validates/category.validate');

class CategoryContoller {
  static async getAllCategories(req, res) {
    const categories = await db.query('SELECT * FROM categories');
    res.status(200).json({
      status: 'Success',
      data: categories.rows,
    });
  }


  static async getSingleCategory(req, res) {
    const categoryId = req.params.id;
    const category = await db.query(`SELECT * FROM categories WHERE categoryId = ${categoryId}`);
    if (category.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        error: 'Category with the specified categoryId NOT found',
      });
    }
    return res.status(200).json({
      status: 'success',
      data: category.rows[0],
    });
  }

  static async createSingleCategory(req, res) {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        error: error.details[0].message,
      });
    }

    const { categoryName } = req.body;
    const categoryId = generateId(3532);
    await db.query(
      `INSERT INTO categories (categoryId, categoryName) 
            VALUES ($1, $2)`, [categoryId, categoryName],
    );
    return res.status(201).json({
      status: 'sucess',
      categoryId,
      message: 'Category Successfully created',
    });
  }

  static async updateSingleCategory(req, res) {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const categoryId = req.params.id;
    const { categoryName } = req.body;
    const category = await db.query(
      `UPDATE categories
            SET categoryName = $1
            WHERE categoryId = ${categoryId} `,
      [categoryName],
    );

    if (category.rowCount === 0) return res.status(404).json({ message: 'Category Not Found' });
    return res.status(201).json({
      status: 'success',
      message: 'Category succesfully updated',
    });
  }

  static async deleteSingleCategory(req, res) {
    const categoryId = req.params.id;
    const category = await db.query(`DELETE FROM categories WHERE categoryId = ${categoryId}`);
    if (category.rowCount === 0) return res.status(404).json({ message: 'Category Not Found' });
    return res.status(202).json({
      status: 'success',
      message: 'Category succesfully deleted',
    });
  }
}


module.exports = CategoryContoller;
