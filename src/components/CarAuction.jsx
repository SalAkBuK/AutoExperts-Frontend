// src/CarAuction.js
import React, { useState, useEffect } from 'react';

const cars = [
  {
    id: 1,
    image: 'https://via.placeholder.com/300x200', // Replace with actual image URLs
    views: 377,
    bids: 53,
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/300x200', // Replace with actual image URLs
    views: 412,
    bids: 75,
  },
  // Add more car objects as needed
];

const CarAuction = () => {
  const [currentCar, setCurrentCar] = useState(0);
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          setCurrentCar((prevCar) => (prevCar + 1) % cars.length);
          return 5;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    
    <div className="bg-[#0A0D1C] text-white py-12 flex flex-col items-center">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-2 pr-80 text-orange-500">
        THE LEADING ONLINE
      </h1>
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 pr-80 text-orange-500">
        CAR AUCTION
      </h1>
      
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 pr-80 text-orange-500">
        PLATFORM IN <span className="text-green-500">PAKISTAN</span>
      </h1>
      
      <div className="bg-white text-black rounded-lg p-6 shadow-md w-200 mt-0 ml- p-4">
        <div className="flex justify-between mb-10 text-sm">
          <span>{cars[currentCar].bids} Bids</span>
          <span>{cars[currentCar].views} Views</span>
        </div>
        <img src={cars[currentCar].image} alt="Car" className="w-full h-40 object-cover mb-2" />
        <div className="flex justify-between items-center">
          {timer === 0 ? (
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold">Sold</button>
          ) : (
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold">Bid</button>
          )}
          <span className="text-xl font-bold">{timer}</span>
        </div>
      </div>
    </div>


    

    

    
  );
};

export default CarAuction;
