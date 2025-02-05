import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Main from './Main'; // Assuming Main is a shared component for the page header/navigation
import car from '../../assets/img/Auto Experts/car6.jpg';
import car2 from '../../assets/img/Auto Experts/cars.jpg';

const dummyAuctions = [
  {
    id: 1,
    image: car, // Replace with actual image URL
    title: 'Toyota Camry 2022',
    initialBid: '$15,000',
    highestBid: '$18,000',
    endTime: '2023-12-01 15:00:00',
  },
  {
    id: 2,
    image: car2,
    title: 'Honda Civic 2020',
    initialBid: '$12,000',
    highestBid: '$14,500',
    endTime: '2023-12-10 12:00:00',
  },
  // Add more dummy auctions as needed
];

function AuctionList() {
  const [auctions, setAuctions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch('https://api.example.com/auctions'); // Replace with your API endpoint
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setAuctions(data);
      } catch (error) {
        console.error(error);
        setAuctions(dummyAuctions); // Fallback to dummy data
      }
    };
    fetchAuctions();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleViewDetails = (auctionId) => {
    // Redirect to details page
    window.location.href = `/auction-details/${auctionId}`;
  };

  const handleEdit = (auction) => {
    // Open edit modal or handle edit logic
    console.log('Edit auction:', auction);
  };

  const handleDelete = (auctionId) => {
    setAuctions((prevAuctions) => prevAuctions.filter((auction) => auction.id !== auctionId));
  };

  // Filter auctions based on search term
  const filteredAuctions = auctions.filter((auction) =>
    auction.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredAuctions.length / itemsPerPage);
  const paginatedAuctions = filteredAuctions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Main />

      <div className="w-full max-w-5xl bg-[#0b213e] p-10 gap-10 rounded-xl shadow-lg text-white ml-2 mt-2">
        <h2 className="text-lg font-semibold mb-4">Auction List</h2>

        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by title..."
            className="w-full px-4 py-2 bg-[#394a6d] text-white rounded-md focus:outline-none"
          />
        </div>

        {/* Items per page dropdown */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <label className="mr-2">Show:</label>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="bg-[#394a6d] text-white px-2 py-1 rounded"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-6 gap-4 font-semibold text-[#bfcde0] pl-1 pb-3 border-b border-[#394a6d] items-center">
          <span className="text-center">Image</span>
          <span className="text-center">Title</span>
          <span className="text-center">Initial Bid</span>
          <span className="text-center">Highest Bid</span>
          <span className="text-center">End Time</span>
          <span className="text-center">Action</span>
        </div>

        {/* Auction rows */}
        {paginatedAuctions.map((auction) => (
          <div
            key={auction.id}
            className="grid grid-cols-6 gap-4 mt-3 py-2 items-center text-white rounded-lg bg-zinc-600				

	 mb-2"
          >
            <div className="flex justify-center">
              <img src={auction.image} alt={auction.title} className="w-100 h-100 rounded-full

 pl-2" />
            </div>
            <span className="text-center">{auction.title}</span>
            <span className="text-center">{auction.initialBid}</span>
            <span className="text-center">{auction.highestBid}</span>
            <span className="text-center">{auction.endTime}</span>
            <div className="flex gap-4 justify-center">
              
            <FaEye
            onClick={() => handleViewDetails(auction.id)}
             className="cursor-pointer text-[#4b4cfe] hover:text-[#3738ff]"
                />
              <FaEdit
                onClick={() => handleEdit(auction)}
                className="cursor-pointer text-[#4b4cfe] hover:text-[#3738ff]"
              />
              <FaTrash
                onClick={() => handleDelete(auction.id)}
                className="cursor-pointer text-[#dc3545] hover:text-[#b52a38]"
              />
            </div>
          </div>
        ))}

        {/* Pagination controls */}
        <div className="flex justify-center mt-6">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === index + 1 ? 'bg-[#4b4cfe] text-white' : 'bg-[#394a6d] text-[#bfcde0]'
              } hover:bg-[#3738ff]`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AuctionList;
