import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CheckBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h1>Booking Details</h1>
      <ul>
        {bookings.map(booking => (
          <li key={booking._id}>
            <strong>Name:</strong> {booking.name}<br />
            <strong>Contact Number:</strong> {booking.contactNumber}<br />
            <strong>Email:</strong> {booking.email}<br />
            <strong>Address:</strong> {booking.address}<br />
            <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}<br />
            <strong>Time:</strong> {booking.time}<br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckBooking;