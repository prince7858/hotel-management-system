// roomRoutes.js
const express = require('express');
const Room = require('../models/roomModel');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new room (for admins or managers)
router.post('/create', verifyToken, verifyRole(['owner', 'manager']), async (req, res) => {
    const { roomNumber, roomType, price, description, image } = req.body;
    try {
        const room = new Room({ roomNumber, roomType, price, description, image });
        await room.save();
        res.status(201).json({ message: 'Room created successfully', room });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all rooms (public route)
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get room by ID (public route)
router.get('/:id',verifyToken, async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update room details (for admins or managers)
router.put('/:id', verifyToken, verifyRole(['owner', 'manager']), async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRoom) return res.status(404).json({ message: 'Room not found' });
        res.status(200).json({ message: 'Room updated successfully', updatedRoom });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete room (for admins or managers)
router.delete('/:id', verifyToken, verifyRole(['owner', 'manager']), async (req, res) => {
    try {
        const deletedRoom = await Room.findByIdAndDelete(req.params.id);
        if (!deletedRoom) return res.status(404).json({ message: 'Room not found' });
        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
