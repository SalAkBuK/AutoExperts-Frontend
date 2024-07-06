import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = () => {

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


  const [formData, setFormData] = useState({
    title: '',
    price: '',
    model: '',
    mileage: '',
    images: [],
    pdf: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handlePDFChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, pdf: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formData.images.forEach((image) => {
      formDataObj.append('images', image);
    });
    if (formData.pdf) {
      formDataObj.append('pdf', formData.pdf);
    }
    formDataObj.append('title', formData.title);
    formDataObj.append('price', formData.price);
    formDataObj.append('model', formData.model);
    formDataObj.append('mileage', formData.mileage);

    try {

      const token = localStorage.getItem('token'); // Retrieve the token from local storage

      if (!token) {
        alert('User not authenticated');
        return;
      }
      
      await axios.post('http://localhost:5000/api/products', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      setFormData({
        title: '',
        price: '',
        model: '',
        mileage: '',
        images: [],
        pdf: null,
      });

      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />

        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />

        <label>Model:</label>
        <input type="text" name="model" value={formData.model} onChange={handleInputChange} required />

        <label>Mileage:</label>
        <input type="text" name="mileage" value={formData.mileage} onChange={handleInputChange} required />

        <label>Images:</label>
        <input type="file" accept="image/*" multiple onChange={handleImageChange} required />

        <label>PDF:</label>
        <input type="file" accept=".pdf" onChange={handlePDFChange} required />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Form;
