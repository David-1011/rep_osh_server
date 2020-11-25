const path = require('path');
const express = require('express');
const compression = require('compression');
const dotenv = require('dotenv');
const morgan = require('morgan');

const app = express();

app.use(compression());

// Load config
dotenv.config({ path: './config/config.env' });

// Database
const db = require('./config/db');

try {
  db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// Master-data Routes
app.use('/api/masterdata/', require('./routes/master-data'));

// Other Routes
app.use('/api/incidents/', require('./routes/incidents'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
