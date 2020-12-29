const controller = require('../controllers/mast.controller');

const { authJwt } = require('../middleware');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/mast/injuryTypes', controller.findAllInjuryTypes);
  app.get('/api/mast/injurySpots', controller.findAllInjurySpots);
  app.get('/api/mast/MainAreas', controller.findAllMainAreas);
  app.get('/api/mast/SubAreas', controller.findAllSubAreas);

  app.post(
    '/api/mast/injuryType',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addInjuryType
  );
  app.post(
    '/api/mast/injurySpot',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addInjurySpot
  );
  app.post(
    '/api/mast/mainArea',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addMainArea
  );
  app.post(
    '/api/mast/subArea',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addSubArea
  );
};
//    [authJwt.verifyToken, authJwt.isAdmin],
