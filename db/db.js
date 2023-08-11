const { Pool } = require('pg')
 
const pool = new Pool({
    user: 'Crying-Soul',
    host: 'ep-twilight-grass-17587475.us-east-2.aws.neon.tech',
    database: 'neondb',
    password: 'kyD8Lp2rnjRW',
    port: 5432,
    ssl: {
      rejectUnauthorized: false
  }
  });
module.exports = pool;
