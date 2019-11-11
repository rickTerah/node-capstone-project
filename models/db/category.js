const db = require('./index');

module.exports = () => {
  const createCategoriesTable = async () => {
    await db.query(`CREATE TABLE IF NOT EXISTS categories (
            categoryId serial PRIMARY KEY, 
            categoryName VARCHAR (50) UNIQUE NOT NULL)`);
  };

  createCategoriesTable();
};
