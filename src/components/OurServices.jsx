import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SlotBookingSVG from '../assets/Assets/SlotBooking.svg';
import UsedCarsSVG from '../assets/Assets/UsedCars.svg';
import AuctionPlatfromSVG from '../assets/Assets/AuctionPlatform.svg';
import CarPrice from '../assets/Assets/CarPricePredictor.svg';

const services = [
  {
    title: 'Slot Booking',
    description: 'Reserve your slot for car selling services at our nearest branch.',
    image: SlotBookingSVG,
    button: 'Become a Seller',
    path: '/booking-form',
  },
  {
    title: 'Used Cars',
    description: 'Access inspected cars that are available for viewing and buying.',
    image: UsedCarsSVG,
    button: 'Used Cars',
    path: '/collection',
  },
  {
    title: 'Auction Platform',
    description: 'Access dealers nationwide who are looking for exactly what you\'re selling with options to maximize profit and reduce turn time.',
    image: AuctionPlatfromSVG,
    button: 'Auction Platform',
    path: '/member',
  },
  {
    title: 'Car Price Predictor',
    description: 'Get the most up-to-date wholesale pricing in the market, backed by real-time data to help you put your best price forward.',
    image: CarPrice,
    button: 'Car Price Predictor',
    path: '/predictor',
  }
];

const OurServices = forwardRef((props, ref) => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <section ref={ref} className="bg-white -mt-20 py-10 px-9 md:px-20 rounded-t-7xl py-12 px-4 sm:px-6 lg:px-8 shadow-lg relative -mt-15">
      <h2 className="text-6xl font-bold text-center text-black mb-10">
        <span className="text-orange-500 mr-2 text-6xl">/</span>OUR SERVICES
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-orange-500 mb-6">{service.title}</h3>
            <p className="text-gray-600 mb-0 font-bold">{service.description}</p>
            <img src={service.image} alt={service.title} className="w-80 h-80 mb-" />
            <button
              className="bg-[#0A0D1C] text-white px-20 py-2 rounded-full"
              onClick={() => handleCardClick(service.path)}
            >
              {service.button}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
});

OurServices.displayName = 'OurServices';


export default OurServices;
