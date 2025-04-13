// models/Buildings.js
const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
  name: String,
  coords: {
    lat: Number,
    lng: Number,
  },
  floors: Number,
  departments: [String],
  facilities: [String],
});

module.exports = mongoose.model('Building', buildingSchema);
