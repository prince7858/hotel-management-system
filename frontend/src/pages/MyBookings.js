// src/pages/MyBookings.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const { authToken } = useAuth();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/bookings/my-bookings', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setBookings(data);
                } else {
                    console.error('Failed to fetch bookings');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchBookings();
    }, [authToken]);

    return (
        <div>
            <h2>My Bookings</h2>
            <div className="booking-list">
                {bookings.map((booking) => (
                    <div key={booking._id} className="booking">
                        <p>Room ID: {booking.roomId}</p>
                        <p>Start Date: {booking.startDate}</p>
                        <p>End Date: {booking.endDate}</p>
                        <p>Status: {booking.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookings;
