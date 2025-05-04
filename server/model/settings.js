const mongoose = require('mongoose');

// Define the driver schema
const settingsSchema = new mongoose.Schema({
    notifi_number: {
        type: String,
        required: true,
    },
});


// Create the driver model
const SettingsModel = mongoose.model('settings', settingsSchema);

module.exports = SettingsModel;
