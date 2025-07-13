const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getUserForSidebar } = require('../controllers/user.controller');

// Get all users (protected route)
router.get('/', protect, getUserForSidebar);

// Get user by ID (protected route)
router.get('/:id', protect, getUserById);

module.exports = router;
