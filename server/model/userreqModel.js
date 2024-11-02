const mongoose = require('mongoose');

const wasteCollectionRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  wasteType: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  MobileNo: {
    type: Number,
    required: true,
  },
  // Add other fields as needed (e.g., status, date, etc.)
});

module.exports = mongoose.model('WasteCollectionRequest', wasteCollectionRequest)