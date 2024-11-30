// src/pages/BookRoom.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const BookRoom = () => {
    const [room, setRoom] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { authToken } = useAuth();
    const { roomId } = useParams(); // Get roomId from URL
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/rooms/${roomId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`, // Pass the token
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setRoom(data); // Set the room data
                } else {
                    console.error('Failed to fetch room');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchRoom();
    }, [roomId, authToken]);

    const handleBooking = async () => {
        if (!startDate || !endDate) {
            alert('Please select both start and end dates');
            return;
        }

        const bookingData = {
            roomId,
            startDate,
            endDate,
        };

        try {
            const response = await fetch('http://localhost:5000/api/bookings/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`, // Pass the token
                },
                body: JSON.stringify(bookingData),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Booking successful');
                navigate('/my-bookings'); // Redirect to user bookings
            } else {
                alert(data.message); // Show error message
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (!room) return <div>Loading...</div>;

    return (
        <div>
            <h2>Book Room</h2>
            <h3>{room.roomType}</h3>
            <p>{room.description}</p>
            <p>Price: ${room.price}</p>
            <div>
                <label>Start Date:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
                <label>End Date:</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <button onClick={handleBooking}>Book Room</button>
        </div>
    );
};

export default BookRoom;
