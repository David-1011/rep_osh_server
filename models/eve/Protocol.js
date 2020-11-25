const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../config/db');

const InjuryEvent = db.define(
  'eve_protocol',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    eventId: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: true,
    },
    eventType: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
    eventDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    eventTime: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    eventDescription: {
      type: DataTypes.STRING(2047),
      allowNull: false,
    },
    oshCategorieId: {
      type: DataTypes.STRING(8),
      allowNull: true,
    },
    oshCategorieText: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reportingActive: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    notification: {
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

module.exports = InjuryEvent;
