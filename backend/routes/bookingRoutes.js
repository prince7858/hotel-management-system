const express = require('express');
const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new booking
router.post('/create', verifyToken, async (req, res) => {
    const { roomId, startDate, endDate } = req.body;
    try {
        const room = await Room.findById(roomId);
        if (!room) return res.status(404).json({ message: 'Room not found' });

        // Check for overlapping bookings
        const existingBooking = await Booking.findOne({
            roomId,
            startDate: { $lt: new Date(endDate) },
            endDate: { $gt: new Date(startDate) },
        });
        if (existingBooking) {
            return res.status(400).json({ message: 'Room is already booked for the selected dates' });
        }

        const totalPrice = room.price * ((new Date(endDate) - new Date(startDate)) / (1000 * 3600 * 24));

        const booking = new Booking({
            userId: req.user.id,
            roomId,
            startDate,
            endDate,
            totalPrice,
            status: 'pending',
        });

        await booking.save();
        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all bookings for the logged-in user
router.get('/my-bookings', verifyToken, async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user.id }).populate('roomId', 'roomNumber roomType price');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update booking status (for admins or managers)
router.put('/update-status/:id', verifyToken, verifyRole(['owner', 'manager']), async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json({ message: 'Booking status updated', updatedBooking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
