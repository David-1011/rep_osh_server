const { DB_DATABASE, DB_PASSWORD, DB_USERNAME, DB_SERVER } = process.env;
module.exports = {
  HOST: DB_SERVER,
  USER: DB_USERNAME,
  PASSWORD: DB_PASSWORD,
  DB: DB_DATABASE,
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
};
/*
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
*/
