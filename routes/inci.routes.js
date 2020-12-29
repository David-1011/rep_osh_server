const controller = require('../controllers/inci.controller');
const { validateInjuryInput } = require('../middleware/validateEventInput');
const { authJwt } = require('../middleware');

module.exports = (app) => {
  app.get(
    '/api/event/incidents',
    [authJwt.verifyToken, authJwt.isModerator],
    controller.findAllIncidentsDecrypted
  );

  app.patch(
    '/api/event/person',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updatePerson
  );

  app.post(
    '/api/event/incident',
    validateInjuryInput,
    controller.addIncidentEntry
  );
};
