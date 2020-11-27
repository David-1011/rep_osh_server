const { Sequelize } = require('sequelize');

const { DB_DATABASE, DB_PASSWORD, DB_USERNAME, DB_SERVER } = process.env;

module.exports = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_SERVER,
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 1000,
  },
  define: {
    schema: 'dbo',
  },
  options: {
    encrypt: true,
  },
  dialectOptions: {
    options: {
      enableArithAbort: true,
    },
  },
});
