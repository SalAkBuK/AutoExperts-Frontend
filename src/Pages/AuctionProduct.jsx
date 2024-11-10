import React, { useState, useEffect } from 'react';
import VehicleDetails from '../components/VehicleDetails';
import BidInformation from '../components/BidInformation';
import ImageGallery from '../components/ImageGallery';
import { FaDollarSign, FaHammer, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import io from 'socket.io-client';
import { useParams, useLocation } from 'react-router-dom';
import CarHeader from '../components/CarHeader';
import FooterOne from '../components/FooterOne';

const socket = io('http://localhost:5000', {
  transports: ['websocket'],
  withCredentials: true
});

function AuctionProduct() {
  const { carId } = useParams();
  const [car, setCar] = useState(null); // Always set car state, even if it's null initially
  const [bidAmount, setBidAmount] = useState('');
  const location = useLocation();
  const { memberId } = location.state || {};  // Retrieve memberId from state

  useEffect(() => {
    if (!carId) {
      console.error('Car ID is not defined.');
      return;
    }

    console.log('Fetching car with ID:', carId);
    console.log('Member Id: ', memberId);


    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cars/${carId}`);
        console.log("RESPONSE: ", response)
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

  const handleBid = async () => {
    const parsedBidAmount = parseFloat(bidAmount);

    if (!bidAmount || isNaN(parsedBidAmount) || parsedBidAmount <= (car?.highestBid?.bidAmount || 0)) {
      alert('Bid amount must be higher than the current highest bid.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/bids', { carId, bidderId: memberId, bidAmount: parsedBidAmount });
      setBidAmount('');  // Clear bid input
    } catch (error) {
      console.error('Error placing bid:', error.response ? error.response.data : error.message);
    }
  };

  if (!car) return <div>Loading...</div>;

  const highestBid = car.topBids.reduce((maxBid, bid) => (bid.bidAmount > maxBid.bidAmount ? bid : maxBid), car.topBids[0]) || {};
  const highestBidAmount = highestBid.bidAmount || car.initialBid || 'No bids yet';

  const currentTime = new Date();
  console.log(currentTime)
  const auctionEndTime = new Date(car.auctionEndTime); 
  const auctionEnded = currentTime >= auctionEndTime;

  return (
    <div className="flex flex-col min-h-screen">
    <CarHeader />
    <mian className='flex-grow'>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-left">{car.title}</h1>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Bid Information Section */}
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <div className="space-y-4">
            <div className="flex items-center">
              <FaDollarSign className="mr-2 text-gray-600" />
              <p><strong>Current Highest Bid:</strong> ${highestBidAmount}</p>
            </div>
            <div className="flex items-center">
              <FaDollarSign className="mr-2 text-gray-600" />
              <p><strong>Initial Bid:</strong> ${car.initialBid}</p>
            </div>

            {/* Display AUCTION ENDED message if auction is closed */}
            {auctionEnded && (
              <div className="flex items-center text-red-500 font-bold">
                <FaHammer className="mr-2" />
                <p>AUCTION ENDED</p>
              </div>
            )}

            {/* Bid input and button */}
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
                  onClick={handleBid}
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
                  onClick={handleBid}
                  disabled
                  className="bg-gray-400 text-white p-2 rounded-md cursor-not-allowed"
                >
                  <FaCheckCircle className="mr-2" />
                  Place Bid
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Image Gallery */}
        <div className="w-full lg:w-1/2">
          <ImageGallery images={car.images} />
        </div>
      </div>

      {/* Vehicle Details Section */}
      <div className="mt-6">
        <VehicleDetails details={car} />
      </div>
    </div>
    </mian>
<FooterOne/>


  </div>
  );

 
}

export default AuctionProduct;
