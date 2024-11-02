const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the driver schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: Number,
        required: true
    },
    alternateMobileNo: {
        type: Number,
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    houseNo: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'online',
        required: true
    }
}, { timestamps: true });


// Create the driver model
const User = mongoose.model('users', userSchema);

module.exports = User;
