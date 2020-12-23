module.exports = (sequelize, Sequelize) => {
  const InjuryEvent = sequelize.define(
    'eve_protocol',
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      eventId: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },
      eventType: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
      eventDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      eventTime: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      eventDescription: {
        type: Sequelize.STRING(2047),
        allowNull: false,
      },
      eventMainAreaId: {
        type: Sequelize.STRING(8),
        allowNull: false,
        references: {
          model: 'mas_main_areas',
          key: 'main_area_id',
        },
      },
      eventSubAreaId: {
        type: Sequelize.STRING(8),
        allowNull: false,
        references: {
          model: 'mas_sub_areas',
          key: 'sub_area_id',
        },
      },
      additionalLocationInfo: {
        type: Sequelize.STRING(),
        allowNull: true,
      },
      oshCategorieId: {
        type: Sequelize.STRING(8),
        allowNull: true,
      },
      oshCategorieText: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      reportingActive: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      notification: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
  return InjuryEvent;
};
