require('dotenv').config();

const {
  NODE_ENV,
  DB_NAME,
  DB_ROOT_PASSWORD,
} = process.env;

const config = {
  debug: NODE_ENV === 'development',
  client: 'mysql2',
  connection: {
    database: DB_NAME,
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: DB_ROOT_PASSWORD,
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
