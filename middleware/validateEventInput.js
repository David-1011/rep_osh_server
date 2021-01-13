const moment = require('moment');

const validate = (content) => {
  if (content.length === 0) {
    return -1;
  } else {
    return 1;
  }
};

const validateInjuryInput = (req, res, next) => {
  try {
    const val = {
      injuredValid1: 0,
      injuredValid2: 0,
      witnessValid1: 0,
      datetimeValid1: 0,
      mainAreaValid: 0,
      subAreaValid: 0,
      descriptionValid: 0,
      spotsValid: 0,
      typesValid: 0,
    };

    const { personalData, incidentData, injuryData } = req.body;
    const inciData = incidentData;

    // Injured firstName
    val.injuredValid1 = validate(personalData.people[0].firstName);

    val.injuredValid2 = validate(personalData.people[0].lastName);

    // Witness
    if (
      (personalData.people[1].firstName.length === 0 ||
        personalData.people[1].lastName.length === 0) &&
      !personalData.noWitness
    ) {
      val.witnessValid1 = -1;
    } else {
      val.witnessValid1 = 1;
    }

    // DateTime
    const dt = moment(`${inciData.incidentDate} ${inciData.incidentTime}`);
    if (dt.isAfter(moment())) {
      val.datetimeValid1 = -1;
    } else {
      val.datetimeValid1 = 1;
    }

    // MainArea
    val.mainAreaValid = validate(inciData.mainArea);

    // Subarea
    val.subAreaValid = validate(inciData.subArea);

    // Description
    val.descriptionValid = validate(inciData.incidentDescription);

    // Spots
    val.spotsValid = validate(injuryData.injurySpots);

    // Types
    val.typesValid = validate(injuryData.injuryTypes);

    const errors = Object.values(val).indexOf(-1);

    if (errors === -1) {
      next();
    } else {
      res.status(422).send(val);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Fehler');
  }
};

module.exports = {
  validateInjuryInput,
};
