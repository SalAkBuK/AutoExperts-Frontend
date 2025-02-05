import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CheckBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://167.99.228.40:5000/api/bookings', {
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
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Booking Details</h1>

    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border-collapse shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-left border-b-2 border-gray-300">
            <th className="py-2 px-4 font-bold">ID</th>
            <th className="py-2 px-4 font-bold">Name</th>
            <th className="py-2 px-4 font-bold">Contact Number</th>
            <th className="py-2 px-4 font-bold">Email</th>
            <th className="py-2 px-4 font-bold">Date</th>
            <th className="py-2 px-4 font-bold">Time</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} className="border-b border-gray-300">
              <td className="py-2 px-4">{booking._id}</td>
              <td className="py-2 px-4">{booking.name}</td>
              <td className="py-2 px-4">{booking.contactNumber}</td>
              <td className="py-2 px-4">{booking.email}</td>
              <td className="py-2 px-4">{new Date(booking.date).toLocaleDateString()}</td>
              <td className="py-2 px-4">{booking.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

);
  
};

export default CheckBooking;