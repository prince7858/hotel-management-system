import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/bookings')
      .then((response) => {
        console.log(response.data); // Log the response to see if data is returned
        setBookings(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the bookings!', error);
      });
  }, []);
  

  return (
    <div>
      <h2>Hotel Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            <p>Name: {booking.name}</p>
            <p>Room: {booking.room}</p>
            <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingList;
