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
  const [maxPrice, setMaxPrice] = useState(100000000); // Default max price
  const [maxMileage, setMaxMileage] = useState(2000000); // Default max mileage
  const [selectedModels, setSelectedModels] = useState([]);
  const [models, setModels] = useState([]); // To store unique car models
const [selectedCondition, setSelectedCondition] = useState([]);
const [selectedColors, setSelectedColors] = useState([]);
const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
const [selectedTransmissions, setSelectedTransmissions] = useState([]);
const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [isLoading, setIsLoading] = useState(true);
  const [titles, setTitles] = useState([]); // Store unique titles
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [location, setLocation] = useState(""); // Selected location
  const [locations, setLocations] = useState([]); 


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://167.99.228.40:5000/api/products");
        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
          setFilteredProducts(response.data.products);

          const uniqueTitles = [...new Set(response.data.products.map((product) => product.title))];
        setTitles(uniqueTitles);
          
          //console.log("Fetched products:", response.data.products);

          // Extract unique models for checkboxes
          const uniqueModels = [
            ...new Set(response.data.products.map((product) => product.model)),
          ];
          setModels(uniqueModels);
          // Extract unique locations correctly
const uniqueLocations = [...new Set(response.data.products.map((product) => product.carDetails))];
setLocations(uniqueLocations);

        } else {
          console.error(
            "API response does not contain a products array:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }finally {
        setIsLoading(false); // Stop loading regardless of success or error
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      return (
        product.price >= minPrice &&
        product.price <= maxPrice &&
        Number(product.mileage) <= maxMileage &&
        (selectedModels.length === 0 || selectedModels.includes(product.model)) &&
        (selectedCondition.length === 0 || selectedCondition.includes(product.Condition)) &&
        (selectedColors.length === 0 || selectedColors.includes(product.Color)) &&
        (selectedFuelTypes.length === 0 || selectedFuelTypes.includes(product.FuelType)) &&
        (selectedTransmissions.length === 0 || selectedTransmissions.includes(product.Transmission)) &&
        (selectedFeatures.length === 0 || selectedFeatures.some(feature => product.SelectedFeatures.includes(feature))) &&
        (selectedTitle === "" || product.title.toLowerCase().includes(selectedTitle.toLowerCase()))&&
        (location === "" || product.carDetails === location) 
      );
    });
  
    setFilteredProducts(filtered);
  }, [minPrice, maxPrice, maxMileage, selectedModels, selectedCondition, selectedColors, selectedFuelTypes, selectedTransmissions, selectedFeatures,selectedTitle,location, products]);
  
  
  const handleModelChange = (model) => {
  setSelectedModels((prevSelectedModels) => {
    return prevSelectedModels.includes(model)
      ? prevSelectedModels.filter((selectedModel) => selectedModel !== model)
      : [...prevSelectedModels, model];
  });
};

const resetFilters = () => {
  setMinPrice(0);
  setMaxPrice(100000000);
  setMaxMileage(20000000);
  setSelectedModels([]);
  setSelectedCondition([]);
  setSelectedColors([]);
  setSelectedFuelTypes([]);
  setSelectedTransmissions([]);
  setSelectedFeatures([]);
  setSelectedTitle("");  // ✅ Reset search input
  setLocation("");       // ✅ Reset location dropdown
  setIsDropdownOpen(false); // Optionally close the dropdown if it's open
  setFilteredProducts(products); // ✅ Reset to full product list
};


 
  

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          {/* Simple spinner using Tailwind CSS */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          <p className="mt-4 text-xl">Loading...</p>
        </div>
      </div>
    );
  }
  
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
  animate={{ opacity: isFilterOpen ? 1 : 0, maxHeight: isFilterOpen ? 600 : 0 }}
  transition={{ duration: 0.8, ease: "easeInOut" }}
  className="mb-8 p-6 border border-gray-300 rounded-lg bg-white shadow-lg overflow-hidden"
>
  <h3 className="text-xl font-semibold mb-4 text-gray-800">Filters</h3>

  {/* Scrollable Wrapper for Small Screens */}
  <div className="max-h-[400px] overflow-auto md:max-h-full">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

      {/* Title Search Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Search Title</label>
        <div className="relative">
          <input
            type="text"
            value={selectedTitle || searchTitle}
            onChange={(e) => {
              setSearchTitle(e.target.value);
              setSelectedTitle(""); // Clear selected title when user types
            }}
            placeholder="Type to search..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700"
          />
          {selectedTitle && (
            <button
              onClick={() => setSelectedTitle("")}
              className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
            >
              ❌
            </button>
          )}
        </div>

        {/* Filtered Titles List */}
        {searchTitle && (
          <ul className="border border-gray-300 rounded-md bg-white max-h-40 overflow-y-auto mt-1 shadow-md">
            {titles
              .filter(title => title.toLowerCase().includes(searchTitle.toLowerCase()))
              .map(filteredTitle => (
                <li
                  key={filteredTitle}
                  onClick={() => {
                    setSelectedTitle(filteredTitle);
                    setSearchTitle(""); // Clear search input after selection
                  }}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {filteredTitle}
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* Select Location */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Select Location</label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white"
        >
          <option value="">Choose a location</option>
          {locations.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Select Models */}
      <div className="relative space-y-2">
        <label className="block text-sm font-medium text-gray-700">Select Models</label>
        <button
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="w-full px-4 py-2 border rounded-md bg-white text-gray-700 flex justify-between items-center"
        >
          <span>{selectedModels.length > 0 ? `${selectedModels.length} selected` : "Choose models"}</span>
          <span>{isDropdownOpen ? "▲" : "▼"}</span>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg max-h-[250px] overflow-y-auto">
            <div className="p-4 grid grid-cols-2 gap-4">
              {models.length > 0 ? (
                models.map((model) => (
                  <div key={model} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={model}
                      checked={selectedModels.includes(model)}
                      onChange={() => handleModelChange(model)}
                      className="h-4 w-4 border-gray-300 text-blue-600 cursor-pointer"
                    />
                    <label htmlFor={model} className="text-sm text-gray-700 cursor-pointer">
                      {model}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center">No models available</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Price Range</label>
        <input type="range" min="0" max="1000000" step="1000" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} className="w-full bg-blue-100 rounded-md" />
        <input type="range" min="0" max="100000000" step="1000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full bg-blue-100 rounded-md" />
        <div className="flex justify-between text-sm">
          <span>Min: PKR{minPrice}</span>
          <span>Max: PKR{maxPrice}</span>
        </div>
      </div>

      {/* Maximum Mileage */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Maximum Mileage</label>
        <input type="range" min="0" max="20000000" step="1000" value={maxMileage} onChange={(e) => setMaxMileage(Number(e.target.value))} className="w-full bg-green-100 rounded-md" />
        <div className="text-sm text-right">{maxMileage} miles</div>
      </div>

      {/* Dynamic Filters */}
      {[
        { label: "Condition", state: selectedCondition, setState: setSelectedCondition, options: ["New", "Used"] },
        { label: "Color", state: selectedColors, setState: setSelectedColors, options: ["Red", "Blue", "Black", "White"] },
        { label: "Fuel Type", state: selectedFuelTypes, setState: setSelectedFuelTypes, options: ["Petrol", "Diesel", "Electric", "Hybrid"] },
        { label: "Transmission", state: selectedTransmissions, setState: setSelectedTransmissions, options: ["Automatic", "Manual"] },
        { label: "Features", state: selectedFeatures, setState: setSelectedFeatures, options: ["Sunroof", "Traction Control", "AWD", "Cruise Control"] },
      ].map(({ label, state, setState, options }) => (
        <div key={label} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">{label}</label>
          <div className="grid grid-cols-2 gap-2">
            {options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <input type="checkbox" id={option} checked={state.includes(option)} onChange={() => setState((prev) => (prev.includes(option) ? prev.filter((i) => i !== option) : [...prev, option]))} className="h-4 w-4 border-gray-300 text-blue-600" />
                <label htmlFor={option} className="text-sm text-gray-700">{option}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
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
