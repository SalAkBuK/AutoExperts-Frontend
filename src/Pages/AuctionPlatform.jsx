import React, { useState } from 'react';
import AuctionItem from '../components/AuctionItem';

const auctionData = [
  {
    id: 1,
    imageUrl: "image.png",
    title: "2021 VOLKSWAGEN",
    odometer: "53076",
    condition: "Non-Repairable",
    damage: "Front End Damage",
    keys: "Available",
    location: "CT - HARTFORD",
    itemNumber: "A/111",
    bid: "$3,550.00 USD",
    timeLeft: "0D 2H 23min",
  },
  {
    id: 2,
    imageUrl: "path/to/2022-honda.jpg",
    title: "2022 HONDA PILOT TOURING",
    odometer: "44181",
    condition: "Non-Repairable",
    damage: "Front End Damage",
    keys: "Available",
    location: "CT - HARTFORD",
    itemNumber: "A/23",
    bid: "$5,300.00 USD",
    timeLeft: "0D 2H 23min",
  },
  {
    id: 3,
    imageUrl: "path/to/2022-honda.jpg",
    title: "2022 HONDA PILOT TOURING",
    odometer: "44181",
    condition: "Non-Repairable",
    damage: "Front End Damage",
    keys: "Available",
    location: "CT - HARTFORD",
    itemNumber: "A/23",
    bid: "$5,300.00 USD",
    timeLeft: "0D 2H 23min",
  },
  {
    id: 4,
    imageUrl: "path/to/2022-honda.jpg",
    title: "2022 HONDA PILOT TOURING",
    odometer: "44181",
    condition: "Non-Repairable",
    damage: "Front End Damage",
    keys: "Available",
    location: "CT - HARTFORD",
    itemNumber: "A/23",
    bid: "$5,300.00 USD",
    timeLeft: "0D 2H 23min",
  },
];

const ITEMS_PER_PAGE = 3; // Define items per page

function AuctionPlatform() {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = auctionData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(auctionData.length / ITEMS_PER_PAGE);

  // Pagination handlers
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="text-2xl font-semibold mb-4">Lots on Sale</div>

      {/* Column Header */}
      <div className="grid grid-cols-6 gap-2 bg-gray-800 text-white p-2 rounded-md mb-5">
        <div>Image</div>
        <div>Lot Info</div>
        <div>Vehicle Info</div>
        <div>Condition</div>
        <div>Sale Info</div>
        <div>Bids</div>
      </div>

      {/* Auction Items */}
      <div className="grid gap-6">
        {currentItems.map(item => (
          <AuctionItem key={item.id} data={item} />
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
