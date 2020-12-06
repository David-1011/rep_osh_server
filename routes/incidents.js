const express = require('express');
const moment = require('moment');
const { sequelize } = require('../models/eve/Protocol');

const authenticateJWT = require('../middlewares/authenticateJWT');

const router = express.Router();

function newId(prefix, id) {
  let injuryTypeId = '0000001';
  if (id !== undefined && id !== null) {
    const highestId = parseInt(id.dataValues.id.substring(1, 8), 10);
    injuryTypeId = highestId + 1;
    injuryTypeId = `000000${injuryTypeId}`.slice(-7);
  }
  return `${prefix}${injuryTypeId}`;
}

const Protocol = require('../models/eve/Protocol');
const ProtocolSpot = require('../models/eve/ProtocolSpot');
const ProtocolType = require('../models/eve/ProtocolType');
// POST ROUTES
router.post('/', (req, res) => {
  console.log(req.body);
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

    const newDbe = new Protocol({
      eventId: newUniqueId,
      eventType: 'I',
      eventDate: incidentData.incidentDate,
      eventTime: time.hour() * 3600 + time.minute() * 60 + time.second(),
      eventDescription: incidentData.incidentDescription,
      eventMainAreaId: incidentData.mainArea,
      eventSubAreaId: incidentData.subArea,
      additionalLocationInfo: incidentData.additionalLocationInfo,
    });
    newDbe
      .save()
      .then((protDbe) => {
        const { personalData, injuryData } = req.body;
        const protocolSpots = [];
        injuryData.spots.forEach((item) => {
          const entry = {
            eventId: protDbe.eventId,
            eventType: 'I',
            injurySpotId: item,
          };
          protocolSpots.push(entry);
        });
        ProtocolSpot.bulkCreate(protocolSpots).catch((err) => console.log(err));

        const protocolTypes = [];
        injuryData.types.forEach((item) => {
          const entry = {
            eventId: protDbe.eventId,
            eventType: 'I',
            injuryTypeId: item,
          };
          protocolTypes.push(entry);
        });
        ProtocolType.bulkCreate(protocolTypes).catch((err) => console.log(err));

        sequelize
          .query(
            'EXEC InsertPersonalData @EventId=:eventId, @EventType=:eventType, @PersonType=:personType, @FirstName=:firstName, @lastName=:lastName',
            {
              replacements: {
                eventId: protDbe.eventId,
                eventType: 'I',
                personType: 'Injured',
                firstName: personalData.injured.firstName,
                lastName: personalData.injured.lastName,
              },
            }
          )
          .catch((err) => {
            console.log(err);
          });

        if (!personalData.witness.noWitness) {
          sequelize.query(
            'EXEC InsertPersonalData @EventId=:eventId, @EventType=:eventType, @PersonType=:personType, @FirstName=:firstName, @lastName=:lastName',
            {
              replacements: {
                eventId: protDbe.eventId,
                eventType: 'I',
                personType: 'Witness',
                firstName: personalData.witness.firstName,
                lastName: personalData.witness.lastName,
              },
            }
          );
        }

        res.send(protDbe);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });
});

router.get('/', authenticateJWT, (req, res) => {
  res.send(req.user.role);
});

module.exports = router;
