require('dotenv').config();

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
} = process.env;

const config = {
  debug: true,
  client: 'mysql2',
  connection: {
    database: DB_NAME,
    port: '3306',
    user: DB_USER,
    host: 'host.docker.internal',
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
