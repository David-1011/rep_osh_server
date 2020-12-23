module.exports = (sequelize, Sequelize) => {
  const ProtocolPersonalData = sequelize.define(
    'eve_protocol_personal_data',
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
      personType: {
        type: Sequelize.STRING(16),
        allowNull: false,
      },
      firstNameEncrypted: {
        type: Sequelize.STRING.BINARY,
        allowNull: false,
      },
      lastNameEncrypted: {
        type: Sequelize.STRING.BINARY,
        allowNull: false,
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
  return ProtocolPersonalData;
};
