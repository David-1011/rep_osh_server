const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define(
  'user',
  {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.STRING,
    },
    updatedAt: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'mas_users',
    timestamps: false,
  }
);

module.exports = User;
