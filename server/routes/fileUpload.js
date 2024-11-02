const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, driver, cb) => {
    cb(null, './uploads/'); // Folder where files will be stored
  },
  filename: (req, driver, cb) => {
    cb(null, driver.fieldname + "_" + Date.now() + path.extname(driver.originalname)); // File name with timestamp
  }
});

// File validation: allowing only specific file types
const driverFilter = (req, driver, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowedTypes.includes(driver.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.'), false);
  }
};

// Multer upload settings
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter: driverFilter
});

// File upload route
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded or invalid file type' });
  }
  console.log(req.driver);
  res.status(200).json({ message: 'File uploaded successfully', file: req.file });
});

module.exports = router;
