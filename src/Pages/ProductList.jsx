import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AutomaticIcon from "../assets/ProductList/Automatic.svg";
import BookmarkIcon from "../assets/ProductList/Bookmark.svg";
import MileageIcon from "../assets/ProductList/Mileage.svg";
import PetrolIcon from "../assets/ProductList/Petrol.svg";
import ArrowIcon from "../assets/ProductList/Arrow.svg";
import  CarHeader from '../components/CarHeader';
import FooterOne from '../components/FooterOne';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        console.log('API response:', response.data); // Debug: log the API response

        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          console.error('API response does not contain a products array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
<>
    <CarHeader/>
    <div className="relative -mt-20 bg-white rounded-tl-7xl rounded-tr-7xl py-12 px-4 sm:px-6 lg:px-8 shadow-lg  mb-20">

<div className="max-w-7xl mx-auto">
  <h2 className="text-3xl font-extrabold text-gray-900 mb-10" style={{ fontFamily: 'DM Sans', fontSize: '40px', fontWeight: 700 }}>Used Cars Listing</h2>

  {/* Additional content can go here */
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 font-dm-sans">
    {products.map((product) => (
      <div key={product._id} className="max-w-sm rounded-lg shadow-md overflow-hidden bg-white border border-gray-200">
        <div className="relative">
          <img src={product.images[0]} alt={product.title} className="w-full h-[200px] object-cover rounded-t-lg" />
          <span className="absolute top-2 left-2 bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
            {product.badge}
          </span>
          <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
            <img src={BookmarkIcon} alt="Bookmark" className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-gray-900" style={{ fontFamily: 'DM Sans', fontSize: '18px', fontWeight: 500 }}>
            {product.title}
          </h3>
          <p className="text-gray-900 mb-4" style={{ fontFamily: 'DM Sans', fontSize: '14px', fontWeight: 400 }}>
            {product.description}N/A
          </p>
          <div className="border-t border-gray-00 mb-3"></div>
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex flex-col items-center space-y-1">
              <img src={MileageIcon} alt="Mileage" className="w-4 h-4" />
              <span className="text-gray-900" style={{ fontFamily: 'DM Sans', fontSize: '14px', fontWeight: 400 }}>
                {product.mileage} miles
              </span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <img src={PetrolIcon} alt="Petrol" className="w-4 h-4" />
              <span className="text-gray-900" style={{ fontFamily: 'DM Sans', fontSize: '14px', fontWeight: 400 }}>
                {product.fuel} Petrol
              </span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <img src={AutomaticIcon} alt="Automatic" className="w-4 h-4" />
              <span className="text-gray-900" style={{ fontFamily: 'DM Sans', fontSize: '14px', fontWeight: 400 }}>
                {product.transmission} Automatic
              </span>
            </div>
          </div>
          <div className="border-t border-gray-00 mb-3"></div>

          <div className="flex items-center justify-between group">
            <span className="text-gray-900" style={{ fontFamily: 'DM Sans', fontSize: '20px', fontWeight: 700 }}>
              {product.price}
            </span>
            <Link
              to={`/product/${product._id}`}
              className="text-blue-600 text-sm font-semibold flex items-center px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
            >
              View Details
              <img src={ArrowIcon} alt="Arrow" className="w-4 h-4 inline ml-1  group-hover:text-white group-hover:filter group-hover:brightness-0 group-hover:invert" />
            </Link>
          </div>
        </div>
      </div>
    ))
    
    }
  </div>
  
  }
</div>
</div>
   
<FooterOne/>
    </>
  );
}

export default ProductList;
