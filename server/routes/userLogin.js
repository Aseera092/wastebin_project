const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/userLogin');
const Users = require('../model/userModel');


const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            username,
            password: hashedPassword,
            isAdmin: req.body.isAdmin ? req.body.isAdmin : false
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, "ASEERA123456", { expiresIn: '1h' });

        if (user.isAdmin) {
            res.status(200).json({ status: true, isAdmin: user.isAdmin, token, message: 'Login successful' });
        }else{
            const users = await Users.find({emailId:user.username})
            res.status(200).json({status:true,isAdmin:user.isAdmin,data:users[0], token, message: 'Login successful' });
        }

    } catch (err) {
        res.status(500).json({ status: true, error: 'Login failed' });
        console.log(err);

    }
});

module.exports = router;
