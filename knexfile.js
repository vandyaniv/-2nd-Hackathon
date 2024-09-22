require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      port: 5432,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: './server/migrations',
    },
  },
};
