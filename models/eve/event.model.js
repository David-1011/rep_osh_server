module.exports = (sequelize, Sequelize) => {
  const InjuryEvent = sequelize.define(
    'eveEvent',
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      time: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(2047),
        allowNull: false,
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
