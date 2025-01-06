const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = "MynamwisEndtoEndYouTubeChannel"; // Use environment variables in production for better security

// POST route to create a new user
router.post(
  "/createuser",
  [
    body("email").isEmail().withMessage("Enter a valid email address"),
    body("name").isLength({ min: 5 }).withMessage("Name must be at least 5 characters long"),
    body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { name, email, password, location } = req.body;

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "User already exists." });
      }

      // Create a new user instance
      const newUser = new User({ name, email, password: hashedPassword, location });

      // Save the user to MongoDB
      await newUser.save();

      res.status(201).json({ success: true, message: "User created successfully." });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
  }
);

// POST route for user login
router.post(
  "/loginuser",
  [
    body("email").isEmail().withMessage("Enter a valid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      // Check if the user exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: "Invalid email or password." });
      }

      // Compare the entered password with the hashed password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ success: false, message: "Invalid email or password." });
      }

      // Generate a JWT token
      const payload = { id: user.id }; // Payload should contain essential and non-sensitive data
      const authToken = jwt.sign(payload, jwtSecret, { expiresIn: "1h" }); // Add expiration for security

      // Login successful
      return res.status(200).json({ success: true, authToken });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ success: false, message: "Internal server error." });
    }
  }
);

module.exports = router;
