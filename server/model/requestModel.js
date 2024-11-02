const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
        required: true
    },
    wasteType: {
        type: String,
        required: true,
    },
    collectDate:{
        type: Date,
        required: true
    },
    latitude: {
        type: Number,
    },
    longitude:{
        type: Number,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved','Rejected','Collected'],
        default: 'Pending',
        required: true
    },
    rejectMessage:{
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('requests', requestSchema);
