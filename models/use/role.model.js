module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    'useRole',
    {
      name: {
        type: Sequelize.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  return Role;
};
