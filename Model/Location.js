// Import Mongoose
import mongoose from 'mongoose'

// Define the schema
const LocationSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  currentLatitude: {
    type: Number,
    required: true,
  },
  currentLongitude: {
    type: Number,
    required: true,
  },
  destinationLatitude: {
    type: Number,
    required: true,
  },
  destinationLongitude: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

// Create the model
const Location = mongoose.models.Location || mongoose.model('Location', LocationSchema);


module.exports = Location;
