import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TiThList, TiThLarge } from 'react-icons/ti';
import { FaTag, FaGasPump, FaTachometerAlt } from 'react-icons/fa';
import axios from 'axios';
import AuctionTimer from '../components/AuctionTimer';
import FooterOne from '../components/FooterOne';
import AuctionHeader from '../components/AuctionHeader';
import MemberLayout from '../layout/MemberLayout';
import { motion } from 'framer-motion';
import Chatbot from '../components/ChatBot';
const ITEMS_PER_PAGE = 8; // Define items per page

function AuctionPlatform() {
  const [cars, setCars] = useState([]);
  const [viewType, setViewType] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { memberId } = location.state || {};
  const [filteredProducts, setFilteredProducts] = useState([]);


  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000000);
  const [maxMileage, setMaxMileage] = useState(200000000000);
  const [selectedModels, setSelectedModels] = useState([]);
  const [models, setModels] = useState([]);
  const [sortedCars, setSortedCars] = useState([]);
const [selectedCondition, setSelectedCondition] = useState([]);
const [selectedColors, setSelectedColors] = useState([]);
const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
const [selectedTransmissions, setSelectedTransmissions] = useState([]);
const [selectedFeatures, setSelectedFeatures] = useState([]);
 

  const [isLoading, setIsLoading] = useState(true);
  const [titles, setTitles] = useState([]); // Store unique titles
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(""); // Selected location
  const [locations, setLocations] = useState([]); 






  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  console.log('Received Member ID:', memberId);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('User not authenticated');
          return;
        }
        setLoading(true);
        const response = await axios.get('http://167.99.228.40:5000/api/cars', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('API Response:', response.data);
        const sortedCars = response.data.sort(
          (a, b) => new Date(b.auctionEndTime) - new Date(a.auctionEndTime)
        );

        setCars(sortedCars);
        setSortedCars(sortedCars);
        setFilteredProducts(sortedCars);

        const uniqueModels = [...new Set(sortedCars.map((car) => car.model))];
        setModels(uniqueModels);




        const uniqueTitles = [...new Set(sortedCars.map((car) => car.title))];
        setTitles(uniqueTitles);
          
          //console.log("Fetched products:", response.data.products);

         
          // Extract unique locations correctly
const uniqueLocations = [...new Set(sortedCars.map((car) => car.carDetails))];
setLocations(uniqueLocations);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      console.log('Applying filters with:', { minPrice, maxPrice, maxMileage, selectedModels, location });
  
      // Default behavior: Show all cars if no filters are applied
      if (
        minPrice === 0 && 
        maxPrice === 100000000 &&
        maxMileage === 20000000 &&
        selectedModels.length === 0 &&
        selectedCondition.length === 0 &&
        selectedColors.length === 0 &&
        selectedFuelTypes.length === 0 &&
        selectedTransmissions.length === 0 &&
        selectedFeatures.length === 0 &&
        selectedTitle === "" &&
        selectedLocation === ""
      ) {
        setFilteredProducts(cars);
        return;
      }
  
      const filtered = cars.filter((car) => {
        const matchesPrice =
          (minPrice === 0 || car.initialBid >= minPrice || car.highestBid >= minPrice) &&
          (maxPrice === 100000000 || car.initialBid <= maxPrice || car.highestBid <= maxPrice);
  
        const matchesMileage = maxMileage === 20000000 || car.mileage <= maxMileage;
        const matchesModel = selectedModels.length === 0 || selectedModels.includes(car.model);
        const matchesCondition = selectedCondition.length === 0 || selectedCondition.includes(car.Condition);
        const matchesColor = selectedColors.length === 0 || selectedColors.includes(car.Color);
        const matchesFuelType = selectedFuelTypes.length === 0 || selectedFuelTypes.includes(car.FuelType);
        const matchesTransmission = selectedTransmissions.length === 0 || selectedTransmissions.includes(car.Transmission);
        const matchesFeatures = selectedFeatures.length === 0 || selectedFeatures.some(feature => car.SelectedFeatures.includes(feature));
        const matchesTitle = selectedTitle === "" || car.title.toLowerCase().includes(selectedTitle.toLowerCase());
        const matchesLocation = selectedLocation === "" || car.carDetails === selectedLocation; // Ensure correct location filtering
  
        console.log(`Car ${car.title}: Price ${matchesPrice}, Mileage ${matchesMileage}, Model ${matchesModel}, Location ${matchesLocation}`);
  
        // Ensure ALL conditions match
        return (
          matchesPrice &&
          matchesMileage &&
          matchesModel &&
          matchesCondition &&
          matchesColor &&
          matchesFuelType &&
          matchesTransmission &&
          matchesFeatures &&
          matchesTitle &&
          matchesLocation
        );
      });
  
      setFilteredProducts(filtered);
    };
  
    applyFilters();
  }, [
    minPrice, maxPrice, maxMileage, 
    selectedModels, selectedCondition, 
    selectedColors, selectedFuelTypes, 
    selectedTransmissions, selectedFeatures, 
    selectedTitle, selectedLocation, cars
  ]);
  

  const handleModelChange = (model) => {
    setSelectedModels((prev) =>
      prev.includes(model)
        ? prev.filter((m) => m !== model) // Remove if already selected
        : [...prev, model] // Add if not selected
    );
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
    setSelectedLocation("");       // ✅ Reset location dropdown
    setIsDropdownOpen(false); // Optionally close the dropdown if it's open
    setFilteredProducts(sortedCars); // ✅ Reset to full product list
  };
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
  <div className="flex flex-col items-center">
    <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-blue-500"></div>
    <p className="mt-4 text-base sm:text-xl">Loading...</p>
  </div>
</div>
    );
  }
  console.log(filteredProducts);

  return (
 <>
      
      <div className="relative -mt-20  -ml-8 bg-white  py-12 px-4 sm:px-6 lg:px-8 shadow-lg">
      <AuctionHeader />
        <main className="flex-grow " >
          <div className="bg-gray-100 p-10 space-y-5 -mr-10 rounded-tl-7xl rounded-tr-7xl rounded-bl-7xl rounded-br-7xl -mt-7 -mb-20">
            <h1
              className="font-bold text-gray-1000 mb-6 text-left sm:text-base md:text-3xl lg:text-4xl xl:text-5xl animate-fadeIn "
              style={{ fontFamily: 'DM Sans', fontWeight: 700 }}
            >
              Cars Available for Auction
            </h1>
            {/* Toggle Filter Button */}
    <button
      onClick={() => setIsFilterOpen(!isFilterOpen)}
      className="mb-4 text-blue-600 font-semibold px-8 py-2 rounded-md border border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 ease-in-out"
    >
      {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
    </button>

    {/* Filter Section */}
    <motion.div
  initial={{ opacity: 0, maxHeight: 0 }}
  animate={{ opacity: isFilterOpen ? 1 : 0, maxHeight: isFilterOpen ? 600 : 0 }}
  transition={{ duration: 0.8, ease: "easeInOut" }}
  className="mb-8 p-6 border border-gray-300 rounded-lg bg-white shadow-lg overflow-visible"
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
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
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


             {/* View Toggle */}
             <div className="flex justify-end mb-6">
        <button
          onClick={() => setViewType("grid")} // Directly set the state
          className={`mr-2 p-3 rounded-md ${
            viewType === "grid" ? "bg-blue-600 text-white shadow-md" : "bg-gray-200"
          }`}
          style={{ pointerEvents: "auto" }} // Ensure pointer events are allowed
        >
          <TiThLarge size={24} />
        </button>
        <button
          onClick={() => setViewType("list")} // Directly set the state
          className={`p-3 rounded-md ${
            viewType === "list" ? "bg-blue-600 text-white shadow-md" : "bg-gray-200"
          }`}
          style={{ pointerEvents: "auto" }} // Ensure pointer events are allowed
        >
          <TiThList size={24} />
        </button>
      </div>

      {/* Cars List/Grid */}
      <div
        className={`grid gap-6 ${
          viewType === "grid"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            : "grid-cols-1"
        }`}
      >
 {/* Check if any filter is applied */}
{(minPrice || maxPrice || maxMileage || selectedModels.length) ? (
  // Render filtered cars
  filteredProducts.length > 0 ? (
    filteredProducts.map((car) => (
      <Link to={`/car/${car._id}`} state={{ memberId }} key={car._id}>
        <div
          className={`p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
            viewType === 'list' ? 'border-b flex items-center space-x-6' : 'bg-white'
          }`}
        >
          <div
            className={`${viewType === 'list' ? 'flex-shrink-0' : 'flex justify-center mb-1'}`}
          >
            <img
              src={car.images?.[0] || 'placeholder.jpg'}
              alt={car.carDetails || 'Car Details'}
              className={`w-full ${
                viewType === 'list' ? 'h-48 object-cover rounded-lg' : 'h-[150px] object-cover rounded-lg'
              }`}
            />
          </div>
          <div className="border-t border-gray-00 mb-3"></div>
          <div className={`${viewType === 'list' ? 'flex flex-col space-y-2' : 'space-y-2 text-gray-700'}`}>
            <h2 className="text-lg font-semibold text-gray-800 truncate" style={{ fontFamily: 'DM Sans', fontSize: '18px', fontWeight: 500 }}>
              {car.title || 'Untitled Car'}
            </h2>
            <p className="text-sm text-gray-500 truncate" style={{ fontFamily: 'DM Sans', fontSize: '14px', fontWeight: 400 }}>
              {car.Overview || 'No overview available'}
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <FaGasPump className="mr-2" />
              Fuel: {car.FuelType || 'N/A'}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <FaTachometerAlt className="mr-2" />
              Mileage: {car?.mileage?.toLocaleString() || 'N/A'} miles
            </div>
            <div className="border-t border-gray-00 mb-3"></div>
            <div className="mt-4 text-gray-800 space-y-1">
              <div className="text-md font-semibold" style={{ fontFamily: 'DM Sans', fontSize: '16px', fontWeight: 600 }}>
                Auction Details
              </div>
              <div className="flex items-center text-sm">
                <FaTag className="mr-2 text-gray-600" />
                Starting Bid: {car?.initialBid?.toLocaleString() || 'N/A'}
              </div>
              <div className="flex items-center text-sm">
                <FaTag className="mr-2 text-gray-600" />
                Highest Bid: {car.highestBid?.bidAmount?.toLocaleString() || 'No Bids Yet'}
              </div>
              <div className="flex items-center text-sm font-semibold text-red-600">
                {new Date() < new Date(car.auctionEndTime) ? (
                  <AuctionTimer auctionEndTime={car.auctionEndTime} />
                ) : (
                  'Auction Ended'
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    ))
  ) : (
    <div>No filtered cars available</div>
  )
) : (
  // Render all cars when no filter is applied
  cars.length > 0 ? (
    cars.map((car) => (
      <Link to={`/car/${car._id}`} state={{ memberId }} key={car._id}>
        <div
          className={`p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
            viewType === 'list' ? 'border-b flex items-center space-x-6' : 'bg-white'
          }`}
        >
          <div
            className={`${viewType === 'list' ? 'flex-shrink-0' : 'flex justify-center mb-1'}`}
          >
            <img
              src={car.images?.[0] || 'placeholder.jpg'}
              alt={car.carDetails || 'Car Details'}
              className={`w-full ${
                viewType === 'list' ? 'h-48 object-cover rounded-lg' : 'h-[150px] object-cover rounded-lg'
              }`}
            />
          </div>
          <div className="border-t border-gray-00 mb-3"></div>
          <div className={`${viewType === 'list' ? 'flex flex-col space-y-2' : 'space-y-2 text-gray-700'}`}>
            <h2 className="text-lg font-semibold text-gray-800 truncate" style={{ fontFamily: 'DM Sans', fontSize: '18px', fontWeight: 500 }}>
              {car.title || 'Untitled Car'}
            </h2>
            <p className="text-sm text-gray-500 truncate" style={{ fontFamily: 'DM Sans', fontSize: '14px', fontWeight: 400 }}>
              {car.Overview || 'No overview available'}
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <FaGasPump className="mr-2" />
              Fuel: {car.FuelType || 'N/A'}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <FaTachometerAlt className="mr-2" />
              Mileage: {car?.mileage?.toLocaleString() || 'N/A'} miles
            </div>
            <div className="border-t border-gray-00 mb-3"></div>
            <div className="mt-4 text-gray-800 space-y-1">
              <div className="text-md font-semibold" style={{ fontFamily: 'DM Sans', fontSize: '16px', fontWeight: 600 }}>
                Auction Details
              </div>
              <div className="flex items-center text-sm">
                <FaTag className="mr-2 text-gray-600" />
                Starting Bid: {car?.initialBid?.toLocaleString() || 'N/A'}
              </div>
              <div className="flex items-center text-sm">
                <FaTag className="mr-2 text-gray-600" />
                Highest Bid: {car.highestBid?.bidAmount?.toLocaleString() || 'No Bids Yet'}
              </div>
              <div className="flex items-center text-sm font-semibold text-red-600">
                {new Date() < new Date(car.auctionEndTime) ? (
                  <AuctionTimer auctionEndTime={car.auctionEndTime} />
                ) : (
                  'Auction Ended'
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    ))
  ) : (
    <div>No cars available</div>
  )
)}
</div>


            {/* Pagination */}
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </main>
      
      </div>
      <FooterOne />
      </>
  );
}

export default AuctionPlatform;
