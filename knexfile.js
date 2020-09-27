require('dotenv').config();

const {
  NODE_ENV,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
} = process.env;

const config = {
  debug: NODE_ENV === 'development',
  client: 'mysql2',
  connection: {
    database: DB_NAME,
    host: '172.23.48.1',
    port: '3306',
    user: DB_USER,
    password: DB_PASSWORD,
    decimalNumbers: true,
  },
  migrations: {
    tableName: 'migrations',
    directory: './database/migrations',
  },
  seeds: {
    directory: './database/seeds',
  },
};

module.exports = {
  development: config,
  production: config,
};
