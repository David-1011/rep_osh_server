module.exports = (sequelize, Sequelize) => {
  const ProtocolType = sequelize.define(
    'eve_protocol_type',
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      eventId: {
        type: Sequelize.STRING(8),
        references: {
          model: 'eve_protocols',
          key: 'event_id',
        },
      },
      eventType: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
      injuryTypeId: {
        type: Sequelize.STRING(8),
        allowNull: false,
        references: {
          model: 'mas_injury_types',
          key: 'injury_type_id',
        },
      },

      createdBy: {
        type: Sequelize.STRING(16),
        allowNull: true,
        defaultValue: 'SYSTEM',
      },
      updatedBy: {
        type: Sequelize.STRING(16),
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  );
  return ProtocolType;
};
