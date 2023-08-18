require('dotenv').config();
const { Pool } = require('pg')

 
const pool = new Pool({
    user: process.env.POSTGRESS_USER,
    host: process.env.POSTGRESS_HOST,
    database: process.env.POSTGRESS_DBNAME,
    password: process.env.POSRGRESS_PASSWORD,
    port: process.env.POSTGRESS_PORT,
    ssl: {
      rejectUnauthorized: false
  }
  });
module.exports = pool;
