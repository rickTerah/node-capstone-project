const db = require('./index');

module.exports = () => {
  const createGifsTable = async () => {
    try {
      await db.query(`CREATE TABLE IF NOT EXISTS gifs (
                    gifId serial PRIMARY KEY, 
                    title VARCHAR (50) NOT NULL,
                    imageUrl VARCHAR (1024) NOT NULL,
                    createdOn timestamp with time zone NOT NULL,
                    publicId VARCHAR (1024) NOT NULL
                )`);
    } catch (error) {
      console.log(error);
    }
  };
  createGifsTable();
};
