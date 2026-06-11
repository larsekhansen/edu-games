'use strict';

require("dotenv").config();

const mongoose = require('mongoose');
const dbName = 'edu-fun';
const mongoUri = process.env.MONGODB_URI || `mongodb://localhost/${dbName}`

// connect to the database
mongoose.connect(mongoUri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.warn(`Connected to the database (${mongoUri})`);
});
