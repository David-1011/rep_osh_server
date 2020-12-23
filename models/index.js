const Sequelize = require('sequelize');
const config = require('../config/db.config.js');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    idle: config.pool.idle,
  },
  define: {
    schema: 'dbo',
  },
  options: {
    encrypt: true,
  },
  dialectOptions: {
    options: {
      enableArithAbort: true,
    },
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.mainArea = require('./mas/mainArea.model')(sequelize, Sequelize);
db.subArea = require('./mas/subArea.model')(sequelize, Sequelize);
db.injurySpot = require('./mas/injurySpot.model')(sequelize, Sequelize);
db.injuryType = require('./mas/injuryType.model')(sequelize, Sequelize);

db.protocol = require('./eve/protocol.model')(sequelize, Sequelize);

db.protocol.belongsToMany(db.injurySpot, {
  through: 'eve_protocol_spots',
  foreignKey: 'eveEventId',
  otherKey: 'masInjurySpotId',
});

db.injurySpot.belongsToMany(db.protocol, {
  through: 'eve_protocol_spots',
  foreignKey: 'masInjurySpotId',
  otherKey: 'eveEventId',
});

db.protocol.belongsToMany(db.injuryType, {
  through: 'eve_protocol_types',
  foreignKey: 'eveEventId',
  otherKey: 'masInjuryTypeId',
});

db.injuryType.belongsToMany(db.protocol, {
  through: 'eve_protocol_types',
  foreignKey: 'masInjuryTypeId',
  otherKey: 'eveEventId',
});

db.protocolPersonalData = require('./eve/protocolPersonalData.model')(
  sequelize,
  Sequelize
);

db.user = require('./use/user.model.js')(sequelize, Sequelize);
db.role = require('./use/role.model.js')(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: 'use_user_roles',
  foreignKey: 'useRoleId',
  otherKey: 'useUserId',
});
db.user.belongsToMany(db.role, {
  through: 'use_user_roles',
  foreignKey: 'useUserId',
  otherKey: 'useRoleId',
});

db.ROLES = ['user', 'admin', 'moderator'];

module.exports = db;
