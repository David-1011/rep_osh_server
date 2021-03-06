module.exports = (sequelize, Sequelize) => {
  const InjurySpot = sequelize.define(
    'masInjurySpot',
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      spotText: {
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
    },
    {
      underscored: true,
    }
  );
  return InjurySpot;
};
