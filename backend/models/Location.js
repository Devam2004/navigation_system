// models/Location.js

import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  floors: [String],
  capacity: Number,
  hasAC: Boolean,
  accessible: Boolean,
  features: [String],
  openingHours: {
    type: Map,
    of: String,
  },
  coordinates: {
    type: [Number], 
    index: '2dsphere',
  },
});

const Location = mongoose.model('Location', locationSchema);

export default Location;
