const controller = require('../controllers/inci.controller');

module.exports = (app) => {
  app.post('/api/event/incident', controller.addIncidentEntry);
};
