import React, { useEffect, useState } from 'react';
import { Link,useLocation  } from 'react-router-dom';
import { TiThList, TiThLarge } from 'react-icons/ti';
import axios from 'axios';

const ITEMS_PER_PAGE = 3; // Define items per page

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
    <div className="bg-gray-100 min-h-screen p-8">
    <div className="text-2xl font-semibold mb-4">Cars Available for Auction</div>

    <div className="flex justify-end mb-4">
        <button
          onClick={() => setViewType('grid')}
          className={`mr-4 p-2 ${viewType === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          <TiThLarge size={24} />
        </button>
        <button
          onClick={() => setViewType('list')}
          className={`p-2 ${viewType === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          <TiThList size={24} />
        </button>
      </div>

    {/* Column Header */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2 bg-gray-800 text-white p-2 rounded-md mb-5">
      <div>Image</div>
      <div>Lot Info</div>
      <div>Vehicle Info</div>
      <div>Condition</div>
      <div>Sale Info</div>
      <div>Highest Bid</div>
      <div>Time Left</div>
    </div>

    {/* Auction Items */}
    <div
      className={`grid gap-6 ${
        viewType === 'grid' ? 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'
      }`}
    >
      {currentItems.map((car) => (
        <Link 
        to={`/car/${car._id}`}
        state={{ memberId }}  // Pass memberId to CarDisplay component
      >
        <div
          key={car._id}
          className={`${
            viewType === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-4' : 'p-4 bg-white rounded-md shadow-md'
          } ${viewType === 'list' ? 'border-b' : 'bg-white rounded-md shadow-md'}`}
        >
          <div className="flex justify-center mb-4">
          <img src={car.images[0]}
           alt={car.title}
           className="w-64 h-48 object-contain rounded-md"
          />
          </div>

          <div className="flex flex-col space-y-2">
            <div className="font-semibold text-lg">{car.title}</div>
            <div className="text-sm text-gray-500">Lot Number: {car.itemNumber}</div>
            <div className="text-sm text-gray-500">Location: {car.location}</div>
            <div className="text-sm text-gray-500">Condition: {car.condition}</div>
            <div className="text-sm text-gray-500">Damage: {car.damage}</div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="font-semibold">Vehicle Info</div>
            <div>Model: {car.model}</div>
            <div>Mileage: {car.mileage} miles</div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="font-semibold">Sale Info</div>
            <div>Starting Bid: ${car?.initialBid ? car.initialBid.toLocaleString() : 'N/A'}</div>
            <div>Highest Bid: {car.highestBid ? `$${car.highestBid.bidAmount}` : 'No Bids Yet'}</div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="font-semibold">Time Left</div>
            <div>{car?.auctionEndTime ? new Date(car.auctionEndTime).toLocaleString() : 'Auction Ended'}</div>
          </div>
        </div>
        </Link>
      ))}
    </div>

    {/* Pagination */}
    <div className="flex justify-center mt-4 space-x-4">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
  );
}

export default AuctionPlatform;
