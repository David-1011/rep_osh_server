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
      subAreaId: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
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
      mainAreaParentId: {
        type: Sequelize.STRING(8),
        allowNull: false,
        references: {
          model: 'mas_main_areas',
          key: 'main_area_id',
        },
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
  return SubArea;
};
