import React, { useEffect, useState } from 'react';
import { Link,useLocation  } from 'react-router-dom';
import CarHeader from '../components/CarHeader';
import { TiThList, TiThLarge } from 'react-icons/ti';
import { FaTag, FaGasPump, FaTachometerAlt, FaRegClock } from 'react-icons/fa';
import axios from 'axios';
import FooterOne from '../components/FooterOne';

const ITEMS_PER_PAGE = 8; // Define items per page

function AuctionPlatform() {
  const [cars, setCars] = useState([]); // Store API data
  const [viewType, setViewType] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state for API call
  const location = useLocation();
  const { memberId } = location.state || {};  // Retrieve memberId from state

  console.log('Received Member ID:', memberId); 
  // Fetch car data from API on component mount
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('User not authenticated');
          return;
        }
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/cars', {
          'Authorization': `Bearer ${token}`
        }); 
        console.log("response:", response)
        const sortedCars = response.data.sort((a, b) => new Date(b.auctionEndTime) - new Date(a.auctionEndTime));

        setCars(sortedCars);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // Calculate pagination
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = cars.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(cars.length / ITEMS_PER_PAGE);

  // Pagination handlers
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
    <CarHeader />
    <mian className='flex-grow'>
    <div className="bg-gray-50 min-h-screen p-8 space-y-8">
  <h1 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'DM Sans', fontSize: '40px', fontWeight: 700 }}>
    Cars Available for Auction
  </h1>

  {/* View Toggle */}
  <div className="flex justify-end mb-6">
    <button
      onClick={() => setViewType('grid')}
      className={`mr-2 p-3 rounded-md ${viewType === 'grid' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200'}`}
    >
      <TiThLarge size={24} />
    </button>
    <button
      onClick={() => setViewType('list')}
      className={`p-3 rounded-md ${viewType === 'list' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200'}`}
    >
      <TiThList size={24} />
    </button>
  </div>

  {/* Auction Items */}
  <div
    className={`grid gap-6 ${
      viewType === 'grid' ? 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'
    }`}
  >
    {currentItems.map((car) => (
      <Link to={`/car/${car._id}`} state={{ memberId }} key={car._id}>
        <div
          className={`p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
            viewType === 'list' ? 'border-b flex items-center space-x-6' : 'bg-white'
          }`}
        >
          {/* Car Image */}
          <div className={`${viewType === 'list' ? 'flex-shrink-0' : 'flex justify-center mb-4'}`}>
            <img
              src={car.images[0]}
              alt={car.title}
              className={`w-full ${viewType === 'list' ? 'h-48 object-contain rounded-md' : 'h-[200px] object-contain rounded-md'}`}
            />
          </div>

          {/* Car Details */}
          <div className={`${viewType === 'list' ? 'flex flex-col space-y-2' : 'space-y-2 text-gray-700'}`}>
            <h2
              className="text-lg font-semibold text-gray-800 truncate"
              style={{ fontFamily: 'DM Sans', fontSize: '18px', fontWeight: 500 }}
            >
              {car.carDetails}
            </h2>
            <p
              className="text-sm text-gray-500 truncate"
              style={{ fontFamily: 'DM Sans', fontSize: '14px', fontWeight: 400 }}
            >
              {car.Overview}
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <FaGasPump className="mr-2" />
              Fuel: {car.FuelType}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <FaTachometerAlt className="mr-2" />
              Mileage: {car?.mileage?.toLocaleString()} miles
            </div>

            {/* Auction Info */}
            <div className="mt-4 text-gray-800 space-y-1">
              <div
                className="text-md font-semibold"
                style={{ fontFamily: 'DM Sans', fontSize: '16px', fontWeight: 600 }}
              >
                Auction Details
              </div>
              <div className="flex items-center text-sm">
                <FaTag className="mr-2 text-gray-600" />
                Starting Bid: ${car?.initialBid?.toLocaleString() || 'N/A'}
              </div>
              <div className="flex items-center text-sm">
                <FaTag className="mr-2 text-gray-600" />
                Highest Bid: {car.highestBid ? `$${car.highestBid.bidAmount.toLocaleString()}` : 'No Bids Yet'}
              </div>
              <div className="flex items-center text-sm font-semibold text-red-600">
                <FaRegClock className="mr-2 text-gray-600" />
                Time Left: {car.auctionEndTime ? new Date(car.auctionEndTime).toLocaleString() : 'Auction Ended'}
              </div>
            </div>
          </div>
        </div>
      </Link>
    ))}
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
    </mian>
<FooterOne/>


  </div>
  );
}

export default AuctionPlatform;
