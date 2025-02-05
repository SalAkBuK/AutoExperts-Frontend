import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logout from '../components/Logout';
import SideBar from '../components/Admin Comp/Sidebar.jsx';
import Main from '../Pages/Admin/components/main/Main.jsx';
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
    <div className="flex h-screen bg-gray-100">
    {/* Sidebar */}
    <div className="w-[15%] fixed top-0 left-0 h-full">
      <SideBar />
    </div>

    {/* Main Content */}
    <div className="flex-1 ml-[15%]">
      {/* Navbar */}
      <Main />

      {/* Dashboard Content */}
      <div className="pt-[64px] flex flex-col justify-center items-center px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to the Admin Dashboard
        </h1>

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
            <Logout />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default AdminDashboard;
