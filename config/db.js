/*
const sql = require('mssql');

const connectDB = async () => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    const conn = await sql.connect(process.env.AZURE_URI);
    console.log(`AzureDB connected`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
*/
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
});
