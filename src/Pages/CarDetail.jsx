import React, { useState, useEffect } from 'react';
import VehicleDetails from '../components/VehicleDetails';
import BidInformation from '../components/BidInformation';
import ImageGallery from '../components/ImageGallery';
import Modal from '../components/ConfirmBid';  // Adjust the path as needed

import axios from 'axios';
import io from 'socket.io-client';
import { useParams, useLocation } from 'react-router-dom';
import CarHeader from '../components/CarHeader';
import FooterOne from '../components/FooterOne';
import { FaCheckCircle } from 'react-icons/fa';

const socket = io('http://167.99.228.40:5000', {
  transports: ['websocket'],
  withCredentials: true
});

function AuctionProduct() {
  const { carId } = useParams();
  const [car, setCar] = useState(null); 
  const [bidAmount, setBidAmount] = useState('');
  const location = useLocation();
  const { memberId } = location.state || {};  
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Confirmation modal state
  const [selectedBidAmount, setSelectedBidAmount] = useState(null);  // Store the selected bid amount

  useEffect(() => {
    if (!carId) {
      console.error('Car ID is not defined.');
      return;
    }

    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://167.99.228.40:5000/api/cars/${carId}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCar();

    socket.on('updateCar', updatedCar => {
      if (updatedCar._id === carId) {
        setCar(updatedCar);
      }
    });

    return () => {
      socket.off('updateCar');
    };
  }, [carId]);

  const openConfirmModal = () => {
    setSelectedBidAmount(bidAmount);  // Store the selected bid amount for confirmation
    setIsConfirmModalOpen(true);  // Open confirmation modal
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false); // Close confirmation modal
  };

  const handleBid = async () => {
    const parsedBidAmount = parseFloat(selectedBidAmount);

    if (!selectedBidAmount || isNaN(parsedBidAmount) || parsedBidAmount <= (car?.highestBid?.bidAmount || 0)) {
      alert('Bid amount must be higher than the current highest bid.');
      return;
    }

    try {
      const response = await axios.post('http://167.99.228.40:5000/api/bids', { carId, bidderId: memberId, bidAmount: parsedBidAmount });
      setBidAmount('');  
      setIsConfirmModalOpen(false);  // Close the confirmation modal after confirming the bid
    } catch (error) {
      console.error('Error placing bid:', error.response ? error.response.data : error.message);
    }
  };

  if (!car) return <div>Loading...</div>;

  const highestBid = car.topBids.reduce((maxBid, bid) => (bid.bidAmount > maxBid.bidAmount ? bid : maxBid), car.topBids[0]) || {};
  const highestBidAmount = highestBid.bidAmount || car.initialBid || 'No bids yet';

  const currentTime = new Date();
  const auctionEndTime = new Date(car.auctionEndTime); 
  const auctionEnded = currentTime >= auctionEndTime;

  return (
    <div>
      <CarHeader />

      <div className="relative -mt-20 bg-white rounded-tl-7xl rounded-tr-7xl py-12 px-4 sm:px-6 lg:px-8 shadow-lg mb-20">
        <div className="container mx-auto p-4 max-w-6xl bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-semibold text-left">{car.title}</h1>
              <p className="text-gray-500">{car.carDetails}</p>
            </div>                 
          </div>
          <div className="flex gap-2 mb-6">
            <span className="px-3 py-1 bg-blue-400 text-gray-700 rounded-full">{car.model}</span>
            <span className="px-3 py-1 bg-blue-400 text-gray-700 rounded-full">{car.mileage}{' '}miles</span>
            <span className="px-3 py-1 bg-blue-400 text-gray-700 rounded-full">Automatic</span>
            <span className="px-3 py-1 bg-blue-400 text-gray-700 rounded-full">{car.FuelType}</span>
          </div>

          {/* Main content and car details... */}

          {/* Bid Section */}
          {!auctionEnded ? (
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-lg">Place a Bid</h2>
              <input
                type="number"
                value={bidAmount}
                onChange={e => setBidAmount(e.target.value)}
                placeholder="Enter your bid"
                className="p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={openConfirmModal}  // Show confirmation modal
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                <FaCheckCircle className="mr-2" />
                Place Bid
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-lg">Auction Ended</h2>
              <input
                type="number"
                value={bidAmount}
                onChange={e => setBidAmount(e.target.value)}
                placeholder="Enter your bid"
                disabled
                className="p-2 border border-gray-300 rounded-md bg-gray-100"
              />
              <button
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200 flex items-center justify-center"
              >
                <FaCheckCircle className="mr-2" />
                Place Bid
              </button>
            </div>
          )}

          {/* Confirmation Modal */}
          <Modal
            isOpen={isConfirmModalOpen}
            closeModal={closeConfirmModal}
            onConfirm={handleBid}
          />
        </div>
      </div>
    </div>
  );
}

export default AuctionProduct;
