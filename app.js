const path = require('path');
const express = require('express');
const compression = require('compression');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(compression());

// Load config
dotenv.config({ path: './config/config.env' });

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  app.use(cors());
}

// Bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// Master-data Routes
require('./routes/mast.routes')(app);

// Authentication Routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// Event Routes
require('./routes/inci.routes')(app);
// app.use('/api/incidents/', require('./routes/incidents'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
/*
const db = require('./models');

const Role = db.role;
const MainArea = db.mainArea;
const SubArea = db.subArea;
function initial() {
  Role.create({
    name: 'user',
  });

  Role.create({
    name: 'moderator',
  });

  Role.create({
    name: 'admin',
  });

  MainArea.create({
    mainAreaText: 'Aktive Systeme',
  }).then((dbe) => {
    SubArea.bulkCreate([
      { subAreaText: 'AS - Vorfertigung', masMainAreaId: dbe.id },
      { subAreaText: 'AS - Lackieranlage', masMainAreaId: dbe.id },
      { subAreaText: 'AS - Endmontage', masMainAreaId: dbe.id },
    ]);
  });
  MainArea.create({
    mainAreaText: 'Passive Systeme',
  }).then((dbe) => {
    SubArea.bulkCreate([
      { subAreaText: 'PS - 1 Rohr', masMainAreaId: dbe.id },
      { subAreaText: 'PS - 2 Rohr', masMainAreaId: dbe.id },
      { subAreaText: 'PS - Kell', masMainAreaId: dbe.id },
    ]);
  });
  MainArea.create({
    mainAreaText: 'Komponente',
  }).then((dbe) => {
    SubArea.bulkCreate([
      { subAreaText: 'KO - Rohrfertigung', masMainAreaId: dbe.id },
      { subAreaText: 'KO - Laserschweißen', masMainAreaId: dbe.id },
      { subAreaText: 'KO - Verschlusspakete', masMainAreaId: dbe.id },
    ]);
  });
}

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
  initial();
});
*/
