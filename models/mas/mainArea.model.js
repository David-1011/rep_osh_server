module.exports = (sequelize, Sequelize) => {
  const MainArea = sequelize.define(
    'masMainArea',
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      mainAreaText: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      active: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      underscored: true,
    }
  );
  return MainArea;
};
