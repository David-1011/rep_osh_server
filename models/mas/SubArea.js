const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../config/db');

const SubArea = db.define(
  'masSubArea',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    subAreaId: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: true,
    },
    subAreaText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    mainAreaParentId: {
      type: DataTypes.STRING(8),
      allowNull: false,
      references: {
        model: 'mas_main_areas',
        key: 'main_area_id',
      },
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

module.exports = SubArea;
