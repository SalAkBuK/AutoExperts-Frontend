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
        setFilteredProducts(sortedCars);

        const uniqueModels = [...new Set(sortedCars.map((car) => car.model))];
        setModels(uniqueModels);
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
      console.log('Applying filters with:', { minPrice, maxPrice, maxMileage, selectedModels });
      console.log('All cars:', cars);
  
      // Default behavior: Show all cars if no filters are applied
      if (!minPrice && !maxPrice && !maxMileage && selectedModels.length === 0) {
        setFilteredProducts(cars);
      } else {
        const filtered = cars.filter((car) => {
          // Check conditions with proper defaults
          const matchesPrice =
            (minPrice == null || car.initialBid >= minPrice || car.highestBid >= minPrice) &&
            (maxPrice == null || maxPrice === 0 || car.initialBid <= maxPrice || car.highestBid <= maxPrice);
  
          const matchesMileage = !maxMileage || car.mileage <= maxMileage;
          const matchesModel = selectedModels.length === 0 || selectedModels.includes(car.model);
  
          console.log(`Car model: ${car.model}, Matches Model: ${matchesModel}`);
          console.log(`Car ${car.title}: Price ${matchesPrice}, Mileage ${matchesMileage}, Model ${matchesModel}`);
  
          // Allow cars that match ALL active conditions
          return matchesPrice && matchesMileage && matchesModel;
        });
  
        // Update the filtered products state
        setFilteredProducts(filtered);
      }
    };
  
    console.log("Applying Filters...");
    console.log("Min Price:", minPrice, "Max Price:", maxPrice);
    console.log("All Cars Before Filtering:", cars);
    cars.forEach(car => console.log(`Car ${car.title} - Price: ${car.price} (Type: ${typeof car.price})`));
  
    applyFilters();
  }, [minPrice, maxPrice, maxMileage, selectedModels, cars]);
  

  const handleModelChange = (model) => {
    setSelectedModels((prev) =>
      prev.includes(model)
        ? prev.filter((m) => m !== model)
        : [...prev, model]
    );
  };

  const resetFilters = () => {
    setMinPrice(0);
    setMaxPrice(10000000);
    setMaxMileage(2000000);
    setSelectedModels([]);
    setIsDropdownOpen(false); // Optionally close the dropdown if it's open
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (loading) return <div className="text-center">Loading...</div>;
  console.log(filteredProducts);

  return (
    <MemberLayout>
      
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
      initial={{ opacity: 1, maxHeight: 50 }}
      animate={{
        opacity: isFilterOpen ? 1 : 0,
        maxHeight: isFilterOpen ? 500 : 0,
      }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="mb-8 p-6 border border-gray-300 rounded-lg bg-white shadow-lg overflow-hidden"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Price Range */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Price Range</label>
          <input
            type="range"
            min="0"
            max="10000000"
            step="1000"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-full bg-blue-100 rounded-md"
          />
          <input
            type="range"
            min="0"
            max="10000000"
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
            max="200000"
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
    </MemberLayout>
  );
}

export default AuctionPlatform;
