// src/CarAuction.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WhiteCar from '../assets/LandingPage/WhiteCar.svg';
import BlueCar from '../assets/LandingPage/BlueCar.svg';
import BlackCar from '../assets/LandingPage/Blackcar.svg';
import './CarAuction.css';

const cars = [
  { id: 1, image: WhiteCar, views: 377, bids: 53 },
  { id: 2, image: BlueCar, views: 412, bids: 75 },
  { id: 3, image: BlackCar, views: 500, bids: 90 },
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
    <div className="bg-[#0A0D1C] text-white py-10 flex flex-col lg:flex-row items-center justify-center w-full px-4 sm:px-8 md:px-12 mb-16 -mt-20">
      <div className="flex flex-col items-center lg:items-center text-center lg:text-center mb-6 lg:mb-0 lg:mr-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-500">THE LEADING ONLINE</h1>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-500">CAR AUCTION</h1>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-500">PLATFORM <span className="text-white">IN PAKISTAN</span></h1>
      </div>

      <div className="bg-white text-black rounded-lg p-6 shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm 
    mx-auto lg:ml-60">

        <div className="flex justify-between mb-4 text-sm">
          <span>{cars[currentCar].bids} Bids</span>
          <span>{cars[currentCar].views} Views</span>
        </div>
        <img src={cars[currentCar].image} alt="Car" className="w-full h-[180px] object-cover mb-3 rounded-md" />
        <div className="flex justify-between items-center">
          {timer === 0 ? (
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold w-full">Sold</button>
          ) : (
            <Link to="/member">
              <button className="bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold">Bid</button>
            </Link>
          )}
          <span className="text-xl font-bold">{timer}</span>
        </div>
      </div>
    </div>
  );
};

export default CarAuction;
