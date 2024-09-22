const knex = require('knex');

require('dotenv').config();

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    ssl: { rejectUnauthorized: false },
  },
  migrations: {
    directory: '../server/migrations',
  },
});

module.exports = db;
