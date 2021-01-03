module.exports = (sequelize, Sequelize) => {
  const Person = sequelize.define(
    'eveEventPerson',
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      personType: {
        type: Sequelize.STRING(16),
        allowNull: false,
      },
      firstNameEncrypted: {
        type: Sequelize.STRING(2048),
        allowNull: false,
      },
      lastNameEncrypted: {
        type: Sequelize.STRING(2048),
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
  return Person;
};
