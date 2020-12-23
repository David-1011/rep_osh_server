const moment = require('moment');
const db = require('../models');

const Protocol = db.protocol;
const InjurySpot = db.injurySpot;
const InjuryType = db.injuryType;

const { Op } = db.Sequelize;
const newId = (prefix, id) => {
  let injuryTypeId = '0000001';
  if (id !== undefined && id !== null) {
    const highestId = parseInt(id.dataValues.id.substring(1, 8), 10);
    injuryTypeId = highestId + 1;
    injuryTypeId = `000000${injuryTypeId}`.slice(-7);
  }
  return `${prefix}${injuryTypeId}`;
};

exports.addIncidentEntry = (req, res) => {
  Protocol.findOne({
    attributes: [['event_id', 'id']],
    order: [['eventId', 'DESC']],
  }).then((newestDbe) => {
    const newUniqueId = newId('P', newestDbe);
    const { incidentData } = req.body;
    const time = moment(
      `${incidentData.incidentDate} ${incidentData.incidentTime}`,
      'YYYY-MM-DD hh:mm:ss'
    );

    Protocol.create({
      eventId: newUniqueId,
      eventType: 'I',
      eventDate: incidentData.incidentDate,
      eventTime: time.hour() * 3600 + time.minute() * 60 + time.second(),
      eventDescription: incidentData.incidentDescription,
      eventMainAreaId: incidentData.mainArea,
      eventSubAreaId: incidentData.subArea,
      additionalLocationInfo: incidentData.additionalLocationInfo,
    }).then((protocol) => {
      if (req.body.injuryData.spots) {
        InjurySpot.findAll({
          where: {
            injurySpotId: {
              [Op.or]: req.body.injuryData.spots,
            },
          },
        }).then((spots) => {
          protocol.setMasInjurySpots(spots);
        });
      }
      if (req.body.injuryData.types) {
        InjuryType.findAll({
          where: {
            injuryTypeId: {
              [Op.or]: req.body.injuryData.types,
            },
          },
        }).then((types) => {
          protocol.setMasInjuryTypes(types);
        });
      }

      db.query(
        'EXEC InsertPersonalData @EventId=:eventId, @EventType=:eventType, @PersonType=:personType, @FirstName=:firstName, @lastName=:lastName',
        {
          replacements: {
            eventId: protocol.eventId,
            eventType: 'I',
            personType: 'Injured',
            firstName: req.body.personalData.injured.firstName,
            lastName: req.body.personalData.injured.lastName,
          },
        }
      ).catch((err) => {
        console.log(err);
      });

      if (!req.body.personalData.witness.noWitness) {
        db.query(
          'EXEC InsertPersonalData @EventId=:eventId, @EventType=:eventType, @PersonType=:personType, @FirstName=:firstName, @lastName=:lastName',
          {
            replacements: {
              eventId: protocol.eventId,
              eventType: 'I',
              personType: 'Witness',
              firstName: req.body.personalData.witness.firstName,
              lastName: req.body.personalData.witness.lastName,
            },
          }
        );
      }
    });
    res.status(200).send({ message: 'Entry added' });
  });
};
