const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],  // Added 'completed' as an example.
        default: 'pending' 
    },
},{ timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
