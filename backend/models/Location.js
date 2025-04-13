import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  coords: {
    lat: Number,
    lng: Number
  },
  features: [String],
  floors: [
    {
      floor: Number,
      features: [String]
    }
  ],
  capacity: Number,
  hasAC: Boolean,
  accessible: Boolean,
  openingHours: {
    'mon-fri': String,
    sat: String,
    sun: String
  }
});

export default mongoose.model('Location', locationSchema, 'locations'); // Explicit collection name
