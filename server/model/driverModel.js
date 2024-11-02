const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the driver schema
const driverSchema = new mongoose.Schema({
    driverName: {
        type: String,
        required:[true,'Driver name is required'],
    },
    address: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: Number,
        required: true,
        unique: true,
    },
    alternateMobileNo: {
        type: Number,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
    },
    idProof: {
        type: String,
        required: true,
    },
    uploadIdProof: {
        type: String,
        required: true,
    },
    vehicleNo: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline',
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum password length
    }
}, { timestamps: true });

// Pre-save middleware to hash the password
driverSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        // Hash the password
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Method to check if passwords match
driverSchema.methods.isPasswordMatch = function(plainPassword) {
    return bcrypt.compareSync(plainPassword, this.password);
};

// Create the driver model
const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
