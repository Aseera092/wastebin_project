const User = require("../model/userModel");
const UserLogin = require('../model/userLogin');
const bcrypt = require('bcryptjs');

const AddUser = async (req, res, next) => {
    try {

        // Check if a driver with the same name already exists
        const existingMobileUser = await User.findOne({ mobileNo: req.body.mobileNo });
        if (existingMobileUser) {
            return res.status(400).json({
                status: false,
                message: "Mobile Number already exists"
            });
        }

        // Check if a driver with the same name already exists
        const existingEmailUser = await User.findOne({ emailId: req.body.emailId });
        if (existingEmailUser) {
            return res.status(400).json({
                status: false,
                message: "Email already exists"
            });
        }

        // Create a new driver instance
        const {password, ...requetsData} = req.body;
        const user = new User(requetsData);
        await user.save(); // Wait for the save to complete
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const userLogins = new UserLogin({
            username: user.emailId,
            password: hashedPassword,
            isAdmin : false
        })
        await userLogins.save()

        res.status(201).json({
            status: true,
            message: "registered successfully",
            data: user 
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error adding User',
            error: error.message
        });
    }
}

const getUser = async (req, res, next) => {
    try {
        // Fetch all Drivers from MongoDB
        const user = await User.find();

        res.status(200).json({
            status: true,
            data: user // Return the list of drivers
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error fetching data',
            error: error.message
        });
    }
};

const updateUser = async (req, res, next) => {
    try {
        // Fetch and update Driver by ID
        const user = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: true,
            message: "User updated successfully",
            data: driver // Return the updated driver object
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error updating user data',
            error: error.message
        });
    }
};

const deleteUser = async (req, res, next) => {
    try {
        // Find and delete the driver by ID
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: true,
            message: "User deleted successfully",
            data: user // Return the deleted driver object
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error deleting user',
            error: error.message
        });
    }
};

module.exports = { AddUser, getUser, updateUser, deleteUser };
