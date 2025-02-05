import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AutomaticIcon from "../assets/ProductList/Automatic.svg";
import BookmarkIcon from "../assets/ProductList/Bookmark.svg";
import MileageIcon from "../assets/ProductList/Mileage.svg";
import PetrolIcon from "../assets/ProductList/Petrol.svg";
import ArrowIcon from "../assets/ProductList/Arrow.svg";
import CarHeader from '../components/CarHeader';
import FooterOne from '../components/FooterOne';
import { motion } from 'framer-motion';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000); // Default max price
  const [maxMileage, setMaxMileage] = useState(2000000); // Default max mileage
  const [selectedModels, setSelectedModels] = useState([]);
  const [models, setModels] = useState([]); // To store unique car models
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Added dropdown state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://167.99.228.40:5000/api/products");
        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
          setFilteredProducts(response.data.products);
          console.log("Fetched products:", response.data.products);

          // Extract unique models for checkboxes
          const uniqueModels = [
            ...new Set(response.data.products.map((product) => product.model)),
          ];
          setModels(uniqueModels);
        } else {
          console.error(
            "API response does not contain a products array:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
      const matchesMileage = Number(product.mileage) <= maxMileage;
      const matchesModel = selectedModels.length === 0 || selectedModels.includes(product.model);
  
      console.log(`Filtering: ${product.title} | Price: ${matchesPrice} | Mileage: ${matchesMileage} | Model: ${matchesModel}`);
  
      return matchesPrice && matchesMileage && matchesModel;
    });
  
    setFilteredProducts(filtered);
  }, [minPrice, maxPrice, maxMileage, selectedModels, products]);
  
  // Handle model checkbox change
  const handleModelChange = (model) => {
    setSelectedModels((prevSelectedModels) => {
      if (prevSelectedModels.includes(model)) {
        return prevSelectedModels.filter(
          (selectedModel) => selectedModel !== model
        ); // Remove model if already selected
      } else {
        return [...prevSelectedModels, model]; // Add model to the selected list
      }
    });
  };
  const resetFilters = () => {
    setMinPrice(0);
    setMaxPrice(100000000);
    setMaxMileage(20000000);
    setSelectedModels([]);
    setIsDropdownOpen(false); // Optionally close the dropdown if it's open
  };


  
  
  return (
    
      <div className="flex flex-col min-h-screen">
        <CarHeader />
        <main className="flex-grow">
          <div className="relative -mt-20 bg-white rounded-tl-7xl rounded-tr-7xl rounded-br-7xl rounded-bl-7xl py-12 px-4 sm:px-6 lg:px-8 shadow-lg -mb-5">
            <div className="max-w-7xl mx-auto">
              <h2
                className="text-3xl font-extrabold text-gray-900 mb-10"
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '40px',
                  fontWeight: 700,
                }}
              >
                Used Cars Listing
              </h2>

             {/* Toggle Filter Button */}
             <button
  onClick={() => setIsFilterOpen(!isFilterOpen)}
  className="mb-4 text-blue-600 font-semibold px-8 py-2 rounded-md border border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 ease-in-out"
>
  {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
</button>


{/* Filter Section (Collapsible with smooth transition) */}
{/* Filter Section (Collapsible with smooth transition) */}
<motion.div
  initial={{ opacity: 0, maxHeight: 0 }}
  animate={{
    opacity: isFilterOpen ? 1 : 0,
    maxHeight: isFilterOpen ? 500 : 0,
  }}
  transition={{ duration: 0.8, ease: 'easeInOut' }}
  className="mb-8 p-6 border border-gray-300 rounded-lg bg-white shadow-lg overflow-visible" // Change overflow to 'visible'
>
  <h3 className="text-xl font-semibold mb-4 text-gray-800">Filters</h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Price Range */}
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Price Range</label>
      <input
        type="range"
        min="0"
        max="1000000"
        step="1000"
        value={minPrice}
        onChange={(e) => setMinPrice(Number(e.target.value))}
        className="w-full bg-blue-100 rounded-md"
      />
      <input
        type="range"
        min="0"
        max="100000000"
        step="1000"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        className="w-full bg-blue-100 rounded-md"
      />
      <div className="flex justify-between text-sm">
        <span>Min: PKR{minPrice}</span>
        <span>Max: PKR{maxPrice}</span>
      </div>
    </div>

    {/* Mileage */}
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Maximum Mileage</label>
      <input
        type="range"
        min="0"
        max="20000000"
        step="1000"
        value={maxMileage}
        onChange={(e) => setMaxMileage(Number(e.target.value))}
        className="w-full bg-green-100 rounded-md"
      />
      <div className="text-sm text-right">{maxMileage} miles</div>
    </div>

    {/* Car Models Dropdown */}
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 text-left">
        Car Models
      </label>
      <div className="relative w-full">
        <button
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)} // Toggle dropdown visibility
          className="w-full px-4 py-2 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Select Models
          <span className="ml-2">{isDropdownOpen ? "▲" : "▼"}</span>
        </button>
        {isDropdownOpen && (
          <div
            className="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg max-h-[300px] overflow-y-auto"
            style={{
              height: 'auto',  // Allow the dropdown to expand based on content
            }}
          >
            <div className="p-4 grid grid-cols-2 gap-4">
              {models.map((model) => (
                <div key={model} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={model}
                    checked={selectedModels.includes(model)}
                    onChange={() => handleModelChange(model)}
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-0"
                  />
                  <label htmlFor={model} className="text-sm text-gray-700">
                    {model}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>

   {/* Reset Filters Button */}
   <div className="mt-3 flex justify-end">
        <button
          onClick={resetFilters}
          className="text-red-600 font-semibold px-4 py-2 border border-red-600 hover:bg-red-600 hover:text-white rounded-md"
        >
          Reset Filters
        </button>
      </div>
</motion.div>


              {/* Products Grid */}
<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 font-dm-sans">
  {/* Render either filtered products or all products depending on the filters applied */}
  {(minPrice || maxPrice || maxMileage || selectedModels.length) ? (
    filteredProducts.map((product) => (
      <div
        key={product._id}
        className="max-w-sm rounded-lg shadow-md overflow-hidden bg-white border border-gray-200"
      >
        {/* Product Content */}
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-[200px] object-contain rounded-t-lg"
          />
          <span className="absolute top-2 left-2 bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
            {product.badge}
          </span>
          <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
            <img
              src={BookmarkIcon}
              alt="Bookmark"
              className="w-5 h-5"
            />
          </button>
        </div>
        <div className="p-4">
          <h3
            className="mb-2 text-gray-900"
            style={{
              fontFamily: 'DM Sans',
              fontSize: '18px',
              fontWeight: 500,
            }}
          >
            {product.title}
          </h3>
          <p
            className="text-gray-900 mb-4"
            style={{
              fontFamily: 'DM Sans',
              fontSize: '14px',
              fontWeight: 400,
            }}
          >
            {product.model}
          </p>
          {/* More Product Details */}
          <div className="flex items-center justify-between group">
            <span
              className="text-gray-900"
              style={{
                fontFamily: 'DM Sans',
                fontSize: '20px',
                fontWeight: 700,
              }}
            >
             PKR {product.price}
            </span>
            <Link
              to={`/product/${product._id}`}
              className="text-blue-600 text-sm font-semibold flex items-center px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
            >
              View Details
              <img
                src={ArrowIcon}
                alt="Arrow"
                className="w-4 h-4 inline ml-1 group-hover:text-white group-hover:filter group-hover:brightness-0 group-hover:invert"
              />
            </Link>
          </div>
        </div>
      </div>
    ))
  ) : (
    products.map((product) => (
      <div
        key={product._id}
        className="max-w-sm rounded-lg shadow-md overflow-hidden bg-white border border-gray-200"
      >
        {/* Product Content */}
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-[200px] object-contain rounded-t-lg"
          />
          <span className="absolute top-2 left-2 bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
            {product.badge}
          </span>
          <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
            <img
              src={BookmarkIcon}
              alt="Bookmark"
              className="w-5 h-5"
            />
          </button>
        </div>
        <div className="p-4">
          <h3
            className="mb-2 text-gray-900"
            style={{
              fontFamily: 'DM Sans',
              fontSize: '18px',
              fontWeight: 500,
            }}
          >
            {product.title}
          </h3>
          <p
            className="text-gray-900 mb-4"
            style={{
              fontFamily: 'DM Sans',
              fontSize: '14px',
              fontWeight: 400,
            }}
          >
            {product.description} N/A
          </p>
          {/* More Product Details */}
          <div className="flex items-center justify-between group">
            <span
              className="text-gray-900"
              style={{
                fontFamily: 'DM Sans',
                fontSize: '20px',
                fontWeight: 700,
              }}
            >
              {product.price}
            </span>
            <Link
              to={`/product/${product._id}`}
              className="text-blue-600 text-sm font-semibold flex items-center px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
            >
              View Details
              <img
                src={ArrowIcon}
                alt="Arrow"
                className="w-4 h-4 inline ml-1 group-hover:text-white group-hover:filter group-hover:brightness-0 group-hover:invert"
              />
            </Link>
          </div>
        </div>
      </div>
    ))
  )}
</div>
            </div>
          </div>
        </main>
        <FooterOne />
      </div>
    
  );
}

export default ProductList;
