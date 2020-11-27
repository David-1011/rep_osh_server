const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../config/db');

const ProtocolType = db.define(
  'eve_protocol_type',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    eventId: {
      type: DataTypes.STRING(8),
      references: {
        model: 'eve_protocols',
        key: 'event_id',
      },
    },
    eventType: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
    injuryTypeId: {
      type: DataTypes.STRING(8),
      allowNull: false,
      references: {
        model: 'mas_injury_types',
        key: 'injury_type_id',
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

module.exports = ProtocolType;
