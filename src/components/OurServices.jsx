import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import SlotBookingSVG from "../assets/Assets/SlotBooking.svg";
import UsedCarsSVG from "../assets/Assets/UsedCars.svg";
import AuctionPlatfromSVG from "../assets/Assets/AuctionPlatform.svg";
import CarPrice from "../assets/Assets/CarPricePredictor.svg";
import AiAssisstant from "../assets/icon-ai.png";

const services = [
  {
    title: "Inspection Booking",
    description: "Book your car inspection slot at the nearest branch for a seamless selling experience.",
    image: SlotBookingSVG,
    button: "Become a Seller",
    path: "/booking-form",
  },
  {
    title: "Used Cars",
    description: "Access inspected cars that are available for viewing and buying.",
    image: UsedCarsSVG,
    button: "Used Cars",
    path: "/collection",
  },
  {
    title: "Auction Platform",
    description: "Access inspected cars with full transparency and connect with dealers to maximize profit and reduce turn time.",
    image: AuctionPlatfromSVG,
    button: "Auction Platform",
    path: "/member",
  },
  {
    title: "Car Price Predictor",
    description: "Get the most up-to-date wholesale pricing in the market, backed by real-time data to help you put your best price forward.",
    image: CarPrice,
    button: "Car Price Predictor",
    path: "/predictor",
  },
  {
    title: "AI Car Assistant",
    description: "Ask anything about cars or compare different models using our AI-powered assistant.",
    image: AiAssisstant,
    button: "Try AI Assistant",
    path: "/ai-assistant",
  },
];

const OurServices = forwardRef((props, ref) => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <section ref={ref} className="bg-[#0C0C1D] py-16 px-6 md:px-20 rounded-t-7xl text-white relative">
      <h2 className="text-5xl font-extrabold text-center mb-12 text-white">
        <span className="text-orange-500">/</span> OUR SERVICES
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-[#1A1B2F] p-6 rounded-3xl shadow-lg hover:scale-105 transition-transform text-center"
          >
            <img src={service.image} alt={service.title} className="w-40 h-40 mx-auto mb-6 object-contain" />
            <h3 className="text-2xl font-bold text-orange-400 mb-3">{service.title}</h3>
            <p className="text-gray-300 mb-6 leading-relaxed font-bold">{service.description}</p>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full transition-all shadow-md"
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

OurServices.displayName = "OurServices";

export default OurServices;
