const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

// Mongoose schema for storing driver details including file path
const driverSchema = new mongoose.Schema({

  UploadIdproof: {
    type: String,  // Storing the file path as a string
    required: true
  }
});

const Driver = mongoose.model('Driver', driverSchema);

// Multer configuration for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');  // Folder where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Initialize Express app
const app = express();
app.use(express.json());  // Parse JSON requests

// Route to handle file upload
app.post('/fileUpload', upload.single('fileUpload'), async (req, res) => {
  try {
    const newDriver = new Driver({
      UploadIdproof: req.file.path  // Store the file path in MongoDB
    });

    await newDriver.save();  // Save driver details and file path in the database

    res.status(200).json({
      success: true,
      data: newDriver
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
