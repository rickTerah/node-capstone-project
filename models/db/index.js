require('dotenv').config();
const { Pool } = require('pg');

const database = process.env.NODE_ENV === 'test' ? process.env.DB_TEST_DATABASE : process.env.DB_DEV_DATABASE;
let pool;
if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
} else {
  pool = new Pool({
    host: process.env.DB_DEV_HOST,
    port: process.env.DB_DEV_PORT,
    user: process.env.DB_DEV_USER,
    password: process.env.DB_DEV_PASSWORD,
    database,
  });
}

pool.connect()
  .then(() => console.log('Successfully connected to Postgresql'))
  .catch((err) => console.error('Could not connect to postgres', err));

module.exports = pool;
