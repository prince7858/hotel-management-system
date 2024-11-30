const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true, unique: true },
    roomType: { type: String, required: true },  // e.g., "Single", "Double", "Suite"
    price: { type: Number, required: true },  // Price per night
    isAvailable: { type: Boolean, default: true },  // Availability status
    description: { type: String },
    image: { type: String },  // URL for the room image
});

module.exports = mongoose.model('Room', roomSchema);
