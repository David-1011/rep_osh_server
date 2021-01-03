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
const { initDatabase } = require('./initDatabase');

initDatabase();
*/
