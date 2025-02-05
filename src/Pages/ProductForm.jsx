import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/Admin Comp/Sidebar.jsx';

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
      
      await axios.post('http://167.99.228.40:5000/api/products', formDataObj, {
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
   <section className="w-[10%] sm:w-[15%]">
    <SideBar />
    
     </section>
     <section className="flex flex-col w-[90%] sm:w-[85%] overflow-auto">

    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center py-8">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">Add Product</h2>
    <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
          Price:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="price"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">
          Model:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="model"
          type="text"
          name="model"
          value={formData.model}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mileage">
          Mileage:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="mileage"
          type="text"
          name="mileage"
          value={formData.mileage}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
          Images:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pdf">
          PDF:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="pdf"
          type="file"
          accept=".pdf"
          onChange={handlePDFChange}
          required
        />
      </div>

      <div className="flex items-center justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Product
        </button>
      </div>
    </form>
  </div>
  </section>
  </div>
);  
};

export default Form;
