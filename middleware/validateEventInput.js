const validateInjuryInput = (req, res, next) => {
  console.log(req.body);
  let errors = 0;
  const validation = {
    injuredValid1: 0,
    injuredValid2: 0,
    witnessValid1: 0,
    mainAreaValid: 0,
    subAreaValid: 0,
    descriptionValid: 0,
    spotsValid: 0,
    typesValid: 0,
  };

  const { personalData, incidentData, injuryData } = req.body;
  // Injured firstName
  if (personalData[0].firstName.length === 0) {
    errors++;
    validation.injuredValid1 = -1;
  } else {
    validation.injuredValid1 = 1;
  }

  if (personalData[0].lastName.length === 0) {
    errors++;
    validation.injuredValid2 = -1;
  } else {
    validation.injuredValid2 = 1;
  }

  // Witness
  if (
    (personalData[1].firstName.length === 0 ||
      personalData[1].lastName.length === 0) &&
    !personalData[1].noWitness
  ) {
    errors++;
    validation.witnessValid1 = -1;
  } else {
    validation.witnessValid1 = 1;
  }

  // MainArea
  if (incidentData.mainArea.length === 0) {
    errors++;
    validation.mainAreaValid = -1;
  } else {
    validation.mainAreaValid = 1;
  }

  // Subarea
  if (incidentData.subArea.length === 0) {
    errors++;
    validation.subAreaValid = -1;
  } else {
    validation.subAreaValid = 1;
  }

  // Description
  if (incidentData.incidentDescription.length === 0) {
    errors++;
    validation.descriptionValid = -1;
  } else {
    validation.descriptionValid = 1;
  }

  // Description
  if (incidentData.incidentDescription.length === 0) {
    errors++;
    validation.descriptionValid = -1;
  } else {
    validation.descriptionValid = 1;
  }

  // Spots
  if (injuryData.spots.length === 0) {
    errors++;
    validation.spotsValid = -1;
  } else {
    validation.spotsValid = 1;
  }

  // Types
  if (injuryData.types.length === 0) {
    errors++;
    validation.typesValid = -1;
  } else {
    validation.typesValid = 1;
  }

  if (errors === 0) {
    next();
  } else {
    res.status(400).send(validation);
  }
};

module.exports = {
  validateInjuryInput,
};
