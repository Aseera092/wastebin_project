const User = require("../model/userModel");
const UserLogin = require('../model/userLogin');
const bcrypt = require('bcryptjs');
const SettingsModel = require("../model/settings");


const getSettings = async (req, res, next) => {
    try {
        // Fetch all Drivers from MongoDB
        const settings = await SettingsModel.find();
        if (!settings) {
            return res.status(404).json({
                status: false,
                message: 'Settings not found'
            });
        }
        res.status(200).json({
            status: true,
            data: settings[0]
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error fetching data',
            error: error.message
        });
    }
}


const updateSettings = async (req, res, next) => {
    try {
        // Fetch and update Driver by ID
        console.log(req.body);
        
        const settings = await SettingsModel.updateOne(
            {},
            { $set: req.body }
        );
        if (!settings) {
            return res.status(404).json({
                status: false,
                message: 'Settings not found'
            });
        }
        res.status(200).json({
            status: true,
            message: "Settings updated successfully",
            data: settings // Return the updated driver object
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error updating user data',
            error: error.message
        });
    }
};



module.exports = { getSettings, updateSettings };
