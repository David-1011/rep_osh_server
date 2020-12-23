module.exports = (sequelize, Sequelize) => {
  const ProtocolSpot = sequelize.define(
    'eve_protocol_spot',
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
      injurySpotId: {
        type: Sequelize.STRING(8),
        allowNull: false,
        references: {
          model: 'mas_injury_spots',
          key: 'injury_spot_id',
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
  return ProtocolSpot;
};
