require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_DEV_HOST,
  port: process.env.DB_DEV_PORT,
  user: process.env.DB_DEV_USER,
  password: process.env.DB_DEV_PASSWORD,
  database: process.env.DB_DEV_DATABASE,
});

pool.connect()
  .then(() => console.log('Successfully connected to postgres'))
  .catch((err) => console.error('Could not connect to postgres', err));

module.exports = pool;
