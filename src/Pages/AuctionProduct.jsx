import React, { useState, useEffect } from 'react';
import VehicleDetails from '../components/VehicleDetails';
import BidInformation from '../components/BidInformation';
import ImageGallery from '../components/ImageGallery';
import axios from 'axios';
import io from 'socket.io-client';
import { useParams, useLocation } from 'react-router-dom';

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-left">{car.title}</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <ImageGallery images={car.images} />
        <div className="flex flex-col gap-4 grid-cols-2 grid gap-x-11 gap-y-10 grid-cols-2">
          <VehicleDetails details={car} />
          <p>Current Highest Bid: ${highestBidAmount}</p>
          <p>Initial Bid: ${car.initialBid}</p>

          {/* Display AUCTION ENDED message if auction is closed */}
          {auctionEnded && (
            <p className="text-red-500 font-bold">AUCTION ENDED</p>
          )}

          {/* Disable the bid input and button if auction has ended */}
          {!auctionEnded ? (
            <div>
              <h2>Place a Bid</h2>
              <input
                type="number"
                value={bidAmount}
                onChange={e => setBidAmount(e.target.value)}
                placeholder="Enter your bid"
              />
              <button onClick={handleBid}>Place Bid</button>
            </div>
          ) : (
            <div>
             
              <input
                type="number"
                value={bidAmount}
                onChange={e => setBidAmount(e.target.value)}
                placeholder="Enter your bid"
                disabled
              />
              <button onClick={handleBid} disabled>Place Bid</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuctionProduct;
