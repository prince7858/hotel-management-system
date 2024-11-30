// managerRoutes.js
const express = require('express');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Example route: Manager Dashboard
router.get('/manager-dashboard', verifyToken, verifyRole(['manager']), (req, res) => {
    res.status(200).json({ message: 'Welcome to the Manager Dashboard!' });
});

module.exports = router;
