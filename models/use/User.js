const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../config/db');

const User = db.define(
  'useUser',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    blocked: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    resetPassword: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdBy: {
      type: DataTypes.STRING(16),
      allowNull: true,
      defaultValue: 'SYSTEM',
    },
    updatedBy: {
      type: DataTypes.STRING(16),
      allowNull: true,
    },
  },
  {
    underscored: true,
  }
);

module.exports = User;
