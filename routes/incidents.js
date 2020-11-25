const express = require('express');

const router = express.Router();

function newId(prefix, id) {
  let injuryTypeId = '0000001';
  if (id !== undefined && id !== null) {
    const highestId = parseInt(id.dataValues.id.substring(2, 7), 10);
    injuryTypeId = highestId + 1;
    injuryTypeId = `000000${injuryTypeId}`.slice(-7);
  }
  return `${prefix}${injuryTypeId}`;
}

const Protocol = require('../models/eve/Protocol');
// POST ROUTES
router.post('/', (req, res) => {
  console.log(req.body);
  Protocol.sync({ force: true })
    .then(() => {
      Protocol.findOne({
        attributes: [['event_id', 'id']],
        order: [['eventId', 'DESC']],
      }).then((newestDbe) => {
        const newUniqueId = newId('P', newestDbe);
        const newDbe = new Protocol({
          eventId: newUniqueId,
          eventType: 'I',
        });
        res.send(newDbe);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

router.get('/', (req, res) => {
  res.send('Here is the get request');
});

module.exports = router;
