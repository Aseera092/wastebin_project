const mongoose = require('mongoose');

// Define the machine schema
const machineSchema = new mongoose.Schema({
  machineId: {
    type: String,
    required: true,
    unique: true
  },
  landmark: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  last_collect: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['online', 'offline', 'maintenance'], 
    default: 'online',
    required: true
  }
}, { timestamps: true }); // This will add createdAt and updatedAt timestamps

// Create the machine model
const Machine = mongoose.model('Machine', machineSchema);

module.exports = Machine;