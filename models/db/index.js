require('dotenv').config();
const { Pool } = require('pg');

const database = process.env.NODE_ENV === 'test' ? process.env.DB_TEST_DATABASE : process.env.DB_DEV_DATABASE;
const pool = new Pool({
  host: process.env.DB_DEV_HOST,
  port: process.env.DB_DEV_PORT,
  user: process.env.DB_DEV_USER,
  password: process.env.DB_DEV_PASSWORD,
  database,
});

pool.connect()
  .then(() => console.log(`Successfully connected to ${database}`))
  .catch((err) => console.error('Could not connect to postgres', err));

module.exports = pool;
