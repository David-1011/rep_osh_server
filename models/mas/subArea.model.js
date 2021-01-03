module.exports = (sequelize, Sequelize) => {
  const SubArea = sequelize.define(
    'masSubArea',
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      subAreaText: {
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
  return SubArea;
};
