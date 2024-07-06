import React from 'react'
import Logout from '../components/Logout';
import CheckBooking from './CheckBooking'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Here")
    // Check if the user is authenticated (e.g., by checking if a token exists in local storage)
    const token = localStorage.getItem('token');
    console.log("token:", token)
    if (!token) {
      console.log("No token:")
      // If not authenticated, redirect to the login page
      navigate('/admin');
    }
  }, []);

  const handleProductForm = () => {
    navigate('/product-form'); // Navigate to ProductForm page
  };

  return (
    <div>
      <h1>Welcome to the Admin Page</h1>

       <nav>
         
        </nav>
        <button onClick={handleProductForm}>Go to Product Form</button>
        
      <Logout />
      <CheckBooking/>
    </div>
  );
}

export default AdminDashboard