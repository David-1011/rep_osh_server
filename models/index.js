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

db.injurySpot = require('./mas/injurySpot.model')(sequelize, Sequelize);
db.injuryType = require('./mas/injuryType.model')(sequelize, Sequelize);
db.mainArea = require('./mas/mainArea.model')(sequelize, Sequelize);
db.subArea = require('./mas/subArea.model')(sequelize, Sequelize);
db.event = require('./eve/event.model')(sequelize, Sequelize);
db.person = require('./eve/person.model')(sequelize, Sequelize);

// Jede Main Area kann mehrere Subareas haben
db.mainArea.hasMany(db.subArea, { as: 'subAreas' });

// Jede SubArea besitzt eine Main Area
db.subArea.belongsTo(db.mainArea, {
  foreignKey: 'masMainAreaId',
  as: 'mainArea',
});

// Jede Main Area kann mehreren Events zugeordnet werden
db.mainArea.hasMany(db.event, { as: 'events' });

// Jedem Event Eintrag wird eine Main Area zugeordnet
db.event.belongsTo(db.mainArea, {
  foreignKey: 'masMainAreaId',
  as: 'mainArea',
});

// Jede Sub Area kann mehreren Events zugeordnet werden
db.subArea.hasMany(db.event, { as: 'events' });

// Jedem Event Eintrag wird eine Sub Area zugeordnet
db.event.belongsTo(db.subArea, {
  foreignKey: 'masSubAreaId',
  as: 'subArea',
});

// Jedem Event können mehrere Verletzungsstellen zugeordnet werden
db.event.belongsToMany(db.injurySpot, {
  through: 'eve_event_spots',
  foreignKey: 'eveEventId',
  otherKey: 'masInjurySpotId',
  as: 'injurySpots',
});

// Jede Verletztungsstelle kann mehreren Events zugeordnet werden
db.injurySpot.belongsToMany(db.event, {
  through: 'eve_event_spots',
  foreignKey: 'masInjurySpotId',
  otherKey: 'eveEventId',
});

// Jedem Event können mehrere Verletzungsarten zugeordnet werden
db.event.belongsToMany(db.injuryType, {
  through: 'eve_event_types',
  foreignKey: 'eveEventId',
  otherKey: 'masInjuryTypeId',
  as: 'injuryTypes',
});

// Jede Verletzungsart kann mehreren Events zugeordnet werden
db.injuryType.belongsToMany(db.event, {
  through: 'eve_event_types',
  foreignKey: 'masInjuryTypeId',
  otherKey: 'eveEventId',
});

// Jedem Event können mehrere personenbezogene Daten zugewiesen werden
db.event.hasMany(db.person, { as: 'people' });

// Personenbezogene Daten können nur einem Event zugeordnet werden
db.person.belongsTo(db.event, {
  foreignKey: 'eveEventId',
  as: 'event',
});

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
