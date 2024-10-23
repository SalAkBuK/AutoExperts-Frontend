// src/CarAuction.js
import React, { useState, useEffect } from 'react';
import WhiteCar from '../assets/LandingPage/WhiteCar.svg';
import BlueCar from '../assets/LandingPage/BlueCar.svg';
import BlackCar from '../assets/LandingPage/Blackcar.svg';
import './CarAuction.css'
const cars = [
  {
    id: 1,
    image: WhiteCar, // Use the imported image reference
    views: 377,
    bids: 53,
  },
  {
    id: 2,
    image: BlueCar, // Use the imported image reference
    views: 412,
    bids: 75,
  },
  {
    id: 3,
    image: BlackCar, // Use the imported image reference
    views: 500,
    bids: 90,
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
    

    return () => {
      clearInterval(countdown);
     
    };
  }, []);

  return (
    <div className="bg-[#0A0D1C] text-white pb-4 flex flex-row items-start justify-between w-full settings">
      <div className="flex flex-col items-start text-settings">
        <h1 className="lg:text-5xl md:text-4xl sm:2xl font-bold mb-2 text-orange-500">
          THE LEADING ONLINE
        </h1>
        <h1 className="lg:text-5xl md:text-4xl sm:2xl font-bold mb-2 text-orange-500">
          CAR AUCTION
        </h1>
        <h1 className="lg:text-5xl md:text-4xl sm:2xl font-bold mb-2 text-orange-500">
          PLATFORM  <span className="text-white">IN PAKISTAN</span>
        </h1>
      </div>

      <div className="bg-white text-black rounded-lg p-4  shadow-md w-[300px] auction ">
        <div className="flex justify-between mb-4 text-sm">
          <span>{cars[currentCar].bids} Bids</span>
          <span>{cars[currentCar].views} Views</span>
        </div>
        <img src={cars[currentCar].image} alt="Car" className="w-full h-[150px] object-cover mb-2" />
        <div className="flex justify-between items-center">
          {timer === 0 ? (
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold">Sold</button>
          ) : (
            <button className="bg-orange-500 text-white px-5 py-1 rounded-lg font-semibold">Bid</button>
          )}
          <span className="text-xl font-bold">{timer}</span>
        </div>
      </div>
    </div>
  );
};

export default CarAuction;
