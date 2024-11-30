// src/components/RoomList.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // To access user context
import { useNavigate } from 'react-router-dom'; // To handle navigation

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const { authToken } = useAuth(); // Get auth token from context
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all rooms from the backend
        const fetchRooms = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/rooms', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`, // Pass the token
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setRooms(data); // Set rooms state
                } else {
                    console.error('Failed to fetch rooms');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchRooms();
    }, [authToken]); // Fetch rooms when the component mounts or authToken changes

    return (
        <div>
            <h2>Available Rooms</h2>
            <div className="room-list">
                {rooms.map((room) => (
                    <div key={room._id} className="room">
                        <h3>{room.roomType}</h3>
                        <p>{room.description}</p>
                        <p>Price: ${room.price}</p>
                        <button onClick={() => navigate(`/book-room/${room._id}`)}>Book Room</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomList;
