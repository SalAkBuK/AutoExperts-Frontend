import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logout from '../components/Logout';

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated (e.g., by checking if a token exists in local storage)
    const token = localStorage.getItem('token');
    if (!token) {
      // If not authenticated, redirect to the login page
      navigate('/admin');
    }
  }, [navigate]);

  const handleProductForm = () => {
    navigate('/product-form'); // Navigate to ProductForm page
  };

  const handleSlotForm = () => {
    navigate('/booking-details'); // Navigate to BookingDetails page
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Admin Dashboard</h1>

      <div className="space-y-4 flex flex-col">
        <Link
          to="/product-form"
          className="bg-blue-500 hover:bg-blue-600 text-center text-white py-3 px-6 rounded-lg shadow-md transition duration-300 inline-block"
        >
          Upload Cars on Used Cars Platform
        </Link>
        <Link
          to="/booking-details"
          className="bg-green-500 hover:bg-green-600 text-center text-white py-3 px-6 rounded-lg shadow-md transition duration-300 inline-block"
        >
          Inspection Booking Details
        </Link>
        <Link
          to="/add-car-form"
          className="bg-blue-500 hover:bg-blue-600 text-center text-white py-3 px-6 rounded-lg shadow-md transition duration-300 inline-block"
        >
          Add Cars for Auction
        </Link>
        <Link
          to="/auction-car-list"
          className="bg-blue-500 hover:bg-blue-600 text-center text-white py-3 px-6 rounded-lg shadow-md transition duration-300 inline-block"
        >
          Auction List
        </Link>
        <div
          className="bg-red-500 hover:bg-red-600 text-center text-white py-3 px-6 rounded-lg shadow-md transition duration-300 inline-block"
        >
          <Logout/ >
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
