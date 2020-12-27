const controller = require('../controllers/inci.controller');
const { validateInjuryInput } = require('../middleware/validateEventInput');

module.exports = (app) => {
  app.get('/api/event/incidents', controller.findAllIncidentsDecrypted);

  app.post(
    '/api/event/incident',
    validateInjuryInput,
    controller.addIncidentEntry
  );
};
