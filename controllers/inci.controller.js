const moment = require('moment');
const db = require('../models');
const { encrypt, decrypt } = require('../middleware/dataEncryption');

const Event = db.event;
const InjurySpot = db.injurySpot;
const InjuryType = db.injuryType;
const Person = db.person;

const { Op } = db.Sequelize;

exports.addIncidentEntry = (req, res) => {
  const { incidentData, injuryData, personalData } = req.body;
  const time = moment(incidentData.incidentTime, 'hh:mm:ss');

  Event.create({
    type: 'I',
    date: incidentData.incidentDate,
    time: time.hour() * 3600 + time.minute() * 60 + time.second(),
    description: incidentData.incidentDescription,
    masMainAreaId: incidentData.mainArea,
    masSubAreaId: incidentData.subArea,
    additionalLocationInfo: incidentData.additionalLocationInfo,
  }).then((event) => {
    if (injuryData.spots) {
      InjurySpot.findAll({
        where: {
          id: {
            [Op.or]: injuryData.spots,
          },
        },
      }).then((spots) => {
        event.setInjurySpots(spots);
      });
    }
    if (injuryData.types) {
      InjuryType.findAll({
        where: {
          id: {
            [Op.or]: injuryData.types,
          },
        },
      }).then((types) => {
        event.setInjuryTypes(types);
      });
    }
    if (personalData) {
      for (let i = 0; i < personalData.length; i++) {
        const person = personalData[i];
        Person.create({
          personType: person.type,
          firstNameEncrypted: encrypt(person.firstName),
          lastNameEncrypted: encrypt(person.lastName),
          eveEventId: event.id,
        });
      }
    }
  });
  res.status(200).send({ message: 'Entry added' });
};

exports.findAllIncidentsDecrypted = (req, res) => {
  Event.findAll({
    // include: ['mainArea', 'subArea', 'people', 'injurySpots'],
    attributes: {
      exclude: ['masMainAreaId'],
    },
    include: [
      {
        model: db.mainArea,
        attributes: ['id', 'mainAreaText'],
      },
      {
        model: db.subArea,
        attributes: {
          exclude: ['updatedAt'],
        },
      },
      {
        model: db.person,
        attributes: {
          exclude: ['updatedAt'],
        },
      },
      {
        model: db.injurySpot,
        attributes: {
          exclude: ['updatedAt'],
        },
      },
    ],
    order: [[{ model: db.person }, 'personType', 'ASC']],
  })
    .then((events) => {
      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        for (let x = 0; x < event.eveEventPeople.length; x++) {
          const person = event.eveEventPeople[x];
          events[i].eveEventPeople[x].setDataValue(
            'firstName',
            decrypt(person.firstNameEncrypted)
          );
          events[i].eveEventPeople[x].setDataValue('firstNameEncrypted', '');
          events[i].eveEventPeople[x].setDataValue(
            'lastName',
            decrypt(person.lastNameEncrypted)
          );
          events[i].eveEventPeople[x].setDataValue('lastNameEncrypted', '');
        }
      }

      res.status(200).send(events);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

exports.updatePerson = (req, res) => {
  Person.update(
    {
      firstNameEncrypted: encrypt(req.body.firstName),
      lastNameEncrypted: encrypt(req.body.lastName),
    },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then(() => {
      res.status(200).send('OK');
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err.message);
    });
};
