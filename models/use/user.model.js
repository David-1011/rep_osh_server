module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'useUser',
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      confirmed: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      blocked: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      resetPassword: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      underscored: true,
    }
  );
  return User;
};
