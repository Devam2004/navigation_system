// models/Buildings.js
const mongoose = require('mongoose');

const BuildingSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  coords: Object,
  features: [String],
  floors: [String],
  capacity: Number,
  hasAC: Boolean,
  accessible: Boolean,
  openingHours: Object
});

// Explicitly tell it to use 'locations' collection
module.exports = mongoose.model('Building', BuildingSchema, 'locations');
