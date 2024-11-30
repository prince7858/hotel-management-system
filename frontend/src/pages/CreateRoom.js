// CreateRoom.js
import React, { useState } from "react";
import axios from "axios";

const CreateRoom = () => {
    const [roomData, setRoomData] = useState({
        roomNumber: "",
        roomType: "",
        price: "",
        description: "",
        image: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRoomData({
            ...roomData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/rooms/create', roomData);
            alert('Room created successfully');
        } catch (error) {
            console.error('Error creating room:', error);
            alert('Error creating room');
        }
    };

    return (
        <div>
            <h1>Create New Room</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="roomNumber"
                    value={roomData.roomNumber}
                    onChange={handleInputChange}
                    placeholder="Room Number"
                    required
                />
                <input
                    type="text"
                    name="roomType"
                    value={roomData.roomType}
                    onChange={handleInputChange}
                    placeholder="Room Type"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={roomData.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                    required
                />
                <textarea
                    name="description"
                    value={roomData.description}
                    onChange={handleInputChange}
                    placeholder="Room Description"
                    required
                ></textarea>
                <input
                    type="text"
                    name="image"
                    value={roomData.image}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                />
                <button type="submit">Create Room</button>
            </form>
        </div>
    );
};

export default CreateRoom;
