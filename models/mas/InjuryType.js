const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../config/db');

const InjuryType = db.define(
  'masInjuryType',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    injuryTypeId: {
      type: DataTypes.STRING(8),
      allowNull: false,
    },
    injuryTypeText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    ranking: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    textEn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    textFr: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    textRo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    textEs: {
      type: DataTypes.STRING,
      allowNull: true,
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

module.exports = InjuryType;
