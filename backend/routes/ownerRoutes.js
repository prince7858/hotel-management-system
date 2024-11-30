const express = require('express');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Example: Owner-Only Route
router.get('/owner-dashboard', verifyToken, verifyRole(['owner']), (req, res) => {
    // Here, you can add actual logic for fetching owner-related data
    res.status(200).json({ message: 'Welcome to the Owner Dashboard!' });
});

module.exports = router;
