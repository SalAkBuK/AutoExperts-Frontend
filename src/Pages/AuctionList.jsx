import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socket from '../utils/socket'; // Assuming you have socket setup for real-time updates

const AuctionList = () => {
  const [cars, setCars] = useState([]); // Initialize cars as an empty array

  // Fetch all cars with populated references (highestBid, highestBidder, and topBids)
  const fetchCars = async () => {
    try {
      const response = await axios.get('http://167.99.228.40:5000/cars');
      setCars(response.data); // Set fetched cars in state
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  useEffect(() => {
    fetchCars(); // Fetch cars when component mounts

    // Listen for real-time updates from socket
    socket.on('updateCar', (updatedCar) => {
      console.log('Updated Car:', updatedCar);
      setCars((prevCars) =>
        prevCars.map((car) =>
          car._id === updatedCar._id ? { ...car, ...updatedCar } : car
        )
      );
    });

    return () => {
      socket.off('updateCar'); // Clean up the socket listener
    };
  }, []);

  return (
    <div>
      <h2>Auction List</h2>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Car Details</th>
            <th className="border px-4 py-2">Initial Bid</th>
            <th className="border px-4 py-2">Highest Bid</th>
            <th className="border px-4 py-2">Highest Bidder</th>
            <th className="border px-4 py-2">Top 3 Bids</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id}>
              <td className="border px-4 py-2">{car.carDetails}</td>
              <td className="border px-4 py-2">${car.initialBid}</td>
              <td className="border px-4 py-2">
                {car.highestBid ? `$${car.highestBid.bidAmount}` : 'No bids yet'}
              </td>
              <td className="border px-4 py-2">
  {new Date() < new Date(car.auctionEndTime)
    ? 'In Progress'
    : car.highestBidder
    ? car.highestBidder.name
    : 'N/A'}
</td>

              <td className="border px-4 py-2">
                {car.topBids && car.topBids.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {car.topBids.slice(0, 3).map((bid, index) => (
                      <li key={index}>
                        ${bid.bidAmount} - Bidder: {bid.bidderId || 'Unknown'}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No top bids available</p>
                )}
              </td>
              <td className="border px-4 py-2">{car.status}</td> {/* Show status */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuctionList;
