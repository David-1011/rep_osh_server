const express = require('express');

const router = express.Router();

// User model
const MainArea = require('../models/mas/MainArea');
const SubArea = require('../models/mas/SubArea');
const InjuryType = require('../models/mas/InjuryType');
const InjurySpot = require('../models/mas/InjurySpot');

function newId(prefix, id) {
  let injuryTypeId = '00001';
  if (id !== undefined && id !== null) {
    const highestId = parseInt(id.dataValues.id.substring(2, 7), 10);
    injuryTypeId = highestId + 1;
    injuryTypeId = `0000${injuryTypeId}`.slice(-5);
  }
  return `${prefix}${injuryTypeId}`;
}

// GET ROUTES
router.get('/injuryTypes', (req, res) => {
  let attributes = [
    'injuryTypeId',
    'injuryTypeText',
    'textEn',
    'textFr',
    'textRo',
    'textEs',
  ];
  let active = 1;
  if (req.body.attributes !== undefined) {
    attributes = req.body.attributes;
  }
  if (req.body.active !== undefined) {
    active = req.body.active;
  }
  InjuryType.findAll({
    attributes,
    where: {
      active: active,
    },
    order: [['ranking', 'DESC']],
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

router.get('/injurySpots', (req, res) => {
  let attributes = [
    'injurySpotId',
    'injurySpotText',
    'textEn',
    'textFr',
    'textRo',
    'textEs',
  ];
  let active = 1;
  if (req.body.attributes !== undefined) {
    attributes = req.body.attributes;
  }
  if (req.body.active !== undefined) {
    active = req.body.active;
  }
  InjurySpot.findAll({
    attributes,
    where: {
      active: active,
    },
    order: [
      ['ranking', 'DESC'],
      ['injurySpotId', 'ASC'],
    ],
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

router.get('/MainAreas', (req, res) => {
  let attributes = ['mainAreaId', 'mainAreaText'];
  let active = 1;
  if (req.body.attributes !== undefined) {
    attributes = req.body.attributes;
  }
  if (req.body.active !== undefined) {
    active = req.body.active;
  }
  MainArea.findAll({
    attributes,
    where: {
      active: active,
    },
    order: ['mainAreaText'],
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

router.get('/subAreas', (req, res) => {
  let attributes = ['subAreaId', 'subAreaText', 'mainAreaParentId'];
  let active = 1;
  if (req.body.attributes !== undefined) {
    attributes = req.body.attributes;
  }
  if (req.body.active !== undefined) {
    active = req.body.active;
  }
  SubArea.findAll({
    attributes,
    where: {
      active: active,
    },
    order: ['subAreaText'],
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

/// @POST ROUTES
router.post('/injuryTypes', (req, res) => {
  const { injuryTypeText, ranking, textEn, textFr, textRo, textEs } = req.body;
  InjuryType.findOne({
    attributes: [['injury_type_id', 'id']],
    order: [['injuryTypeId', 'DESC']],
  })
    .then((oldestDbe) => {
      const newUniqueId = newId('IT', oldestDbe);
      if (injuryTypeText !== undefined && injuryTypeText !== '') {
        const newDbe = new InjuryType({
          injuryTypeId: newUniqueId,
          injuryTypeText,
          ranking,
          textEn,
          textFr,
          textRo,
          textEs,
        });
        newDbe
          .save()
          .then((dbe) => {
            res.status(200).send(dbe);
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      } else {
        res.status(200).send('Grundtext nicht definiert');
      }
    })
    .catch((err) => res.status(500).send(err));
});

router.post('/injurySpots', (req, res) => {
  const { injurySpotText, ranking, textEn, textFr, textRo, textEs } = req.body;
  InjurySpot.findOne({
    attributes: [['injury_spot_id', 'id']],
    order: [['injurySpotId', 'DESC']],
  })
    .then((oldestDbe) => {
      const newUniqueId = newId('IS', oldestDbe);
      if (injurySpotText !== undefined && injurySpotText !== '') {
        const newDbe = new InjurySpot({
          injurySpotId: newUniqueId,
          injurySpotText,
          ranking,
          textEn,
          textFr,
          textRo,
          textEs,
        });
        newDbe
          .save()
          .then((dbe) => {
            res.status(200).send(dbe);
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      } else {
        res.status(200).send('Grundtext nicht definiert');
      }
    })
    .catch((err) => res.status(500).send(err));
});

router.post('/mainAreas', (req, res) => {
  const { mainAreaText } = req.body;
  MainArea.findOne({
    attributes: [['main_area_id', 'id']],
    order: [['mainAreaId', 'DESC']],
  })
    .then((oldestDbe) => {
      const newUniqueId = newId('MA', oldestDbe);
      if (mainAreaText !== undefined && mainAreaText !== '') {
        const newDbe = new MainArea({
          mainAreaId: newUniqueId,
          mainAreaText,
        });
        newDbe
          .save()
          .then((dbe) => {
            res.status(200).send(dbe);
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      } else {
        res.status(200).send('Grundtext nicht definiert');
      }
    })
    .catch((err) => res.status(500).send(err));
});

router.post('/subAreas', (req, res) => {
  const { subAreaText, mainAreaParentId } = req.body;
  SubArea.findOne({
    attributes: [['sub_area_id', 'id']],
    order: [['subAreaId', 'DESC']],
  })
    .then((oldestDbe) => {
      const newUniqueId = newId('SA', oldestDbe);
      if (
        subAreaText !== undefined &&
        subAreaText !== '' &&
        mainAreaParentId !== undefined &&
        mainAreaParentId !== ''
      ) {
        const newDbe = new SubArea({
          subAreaId: newUniqueId,
          subAreaText,
          mainAreaParentId,
        });
        newDbe
          .save()
          .then((dbe) => {
            res.status(200).send(dbe);
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      } else {
        res.status(200).send('Grundtext nicht definiert');
      }
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
