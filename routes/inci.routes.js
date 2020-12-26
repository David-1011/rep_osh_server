const controller = require('../controllers/inci.controller');

module.exports = (app) => {
  app.get('/api/event/incidents', controller.findAllIncidentsDecrypted);

  app.post('/api/event/incident', controller.addIncidentEntry);
};
