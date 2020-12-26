const db = require('../models');

const InjuryType = db.injuryType;
const InjurySpot = db.injurySpot;
const MainArea = db.mainArea;
const SubArea = db.subArea;

exports.findAllInjuryTypes = (req, res) => {
  let attributes = ['id', 'typeText', 'textEn', 'textFr', 'textRo', 'textEs'];
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
    order: [
      ['ranking', 'DESC'],
      ['typeText', 'ASC'],
    ],
  })
    .then((injuryTypes) => {
      res.status(200).json(injuryTypes);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.findAllInjurySpots = (req, res) => {
  let attributes = ['id', 'spotText', 'textEn', 'textFr', 'textRo', 'textEs'];
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
      ['spotText', 'ASC'],
    ],
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

exports.findAllMainAreas = (req, res) => {
  let attributes = ['id', 'mainAreaText'];
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
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

exports.findAllSubAreas = (req, res) => {
  let attributes = ['id', 'subAreaText', 'masMainAreaId'];
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
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

exports.addInjuryType = (req, res) => {
  const { injuryTypeText, ranking, textEn, textFr, textRo, textEs } = req.body;
  InjuryType.create({
    typeText: injuryTypeText,
    ranking,
    textEn,
    textFr,
    textRo,
    textEs,
  })
    .then((dbe) => {
      res.status(200).send(dbe);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.addInjurySpot = (req, res) => {
  const { injurySpotText, ranking, textEn, textFr, textRo, textEs } = req.body;
  InjurySpot.create({
    spotText: injurySpotText,
    ranking,
    textEn,
    textFr,
    textRo,
    textEs,
  })
    .then((dbe) => {
      res.status(200).send(dbe);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.addMainArea = (req, res) => {
  const { mainAreaText } = req.body;

  MainArea.create({
    mainAreaText,
  })
    .then((dbe) => {
      res.status(200).send(dbe);
    })
    .catch((err) => {
      res.send(400).send(err);
    });
};

exports.addSubArea = (req, res) => {
  const { subAreaText, mainAreaId } = req.body;
  SubArea.create({
    subAreaText,
    masMainAreaId: mainAreaId,
  })
    .then((dbe) => {
      res.status(200).send(dbe);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
