module.exports = (sequelize, Sequelize) => {
  const InjuryType = sequelize.define(
    'masInjuryType',
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      injuryTypeId: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },
      injuryTypeText: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      active: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      ranking: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      textEn: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      textFr: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      textRo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      textEs: {
        type: Sequelize.STRING,
        allowNull: true,
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
  return InjuryType;
};
