import React from 'react';
import BookingList from '../components/BookingList'; // Import the BookingList component

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome to the Hotel Management System Dashboard!</p>
      <BookingList /> {/* Display the list of bookings */}
    </div>
  );
}

export default Dashboard;
