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
  return MainArea;
};
