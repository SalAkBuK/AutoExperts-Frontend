import React, { useState } from 'react';
import Modal from './Modal';

function BidInformation({ bidInfo }) {
  // Parse currentBid as a number initially
  const initialBid = parseFloat(bidInfo.currentBid.replace(/[^0-9.]/g, '')) || 0;
  const [currentBid, setCurrentBid] = useState(initialBid);
  const [userBid, setUserBid] = useState(0); // Start with 0 for user's cumulative bid
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBidNowClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBidSubmit = (bidAmount) => {
    const parsedBidAmount = parseFloat(bidAmount);
    if (!isNaN(parsedBidAmount)) {
      // Accumulate the user's bid
      setUserBid(prevUserBid => prevUserBid + parsedBidAmount); 
      // Update total current bid
      setCurrentBid(prevCurrentBid => prevCurrentBid + parsedBidAmount);
    }
    handleCloseModal();
  };

  return (
    <div className="border p-4 rounded shadow-sm">
      <h2 className="font-bold text-lg">Bid Information</h2>
      <div className="bg-green-100 p-2 rounded mt-2 text-green-700">
        <strong>{bidInfo.auctionStatus}</strong>
        <button
          onClick={handleBidNowClick}
          className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded ml-4"
        >
          Bid Now
        </button>
      </div>
      <ul className="mt-2 space-y-1 text-sm">
        <li>
          <strong>Bid Status:</strong> {userBid > 0 ? `$${userBid.toFixed(2)}` : bidInfo.bidStatus}
        </li>
        <li><strong>Sale Status:</strong> {bidInfo.saleStatus}</li>
        <li><strong>Current Bid:</strong> ${currentBid.toFixed(2)}</li>
      </ul>

      {isModalOpen && (
        <Modal onClose={handleCloseModal} onBidSubmit={handleBidSubmit} />
      )}
    </div>
  );
}

export default BidInformation;
