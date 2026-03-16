const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/getaway';

// Base options (supported by all MongoDB driver versions)
const options = {
  serverSelectionTimeoutMS: 10000,
};

// Only add autoSelectFamily for Atlas (Heroku). Older drivers don't support it locally.
if (uri.includes('mongodb.net')) {
  options.autoSelectFamily = false;
}

mongoose.connect(uri, options);

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err.message);
});

db.once('open', () => {
  console.log('MongoDB connected successfully');
});

module.exports = db;
