import React, { useState, useEffect } from 'react';
import VehicleDetails from '../components/VehicleDetails';
import BidInformation from '../components/BidInformation';
import ImageGallery from '../components/ImageGallery';

import axios from 'axios';
import io from 'socket.io-client';
import { useParams, useLocation } from 'react-router-dom';
import CarHeader from '../components/CarHeader';
import FooterOne from '../components/FooterOne';
import { FaDoorOpen, FaHammer,FaDollarSign, FaCheckCircle, FaTimes, FaBook, FaCar,FaCogs, FaTachometerAlt,FaTag   } from 'react-icons/fa';
import { FaFileAlt } from 'react-icons/fa';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

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

    <div>
    <CarHeader />
    
    <div className="relative -mt-20 bg-white rounded-tl-7xl rounded-tr-7xl py-12 px-4 sm:px-6 lg:px-8 shadow-lg mb-20">
      <div className="container mx-auto p-4 max-w-6xl bg-white rounded-lg shadow-lg">
        
        {/* Car Title and Auction Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-left">{car.title}</h1>
            <p className="text-gray-500">{car.carDetails}</p>
          </div>
          
          <div className="text-left sm:text-right mt-4 sm:mt-0">
            <p className="text-xl font-semibold text-blue-600">{`Current Highest Bid: $${highestBidAmount}`}</p>
            <div className="flex items-center justify-start sm:col-span-2">
              <span className="px-4 py-2 rounded-full text-red-600 bg-red-200 bg-opacity-30 text-base font-semibold flex items-center">
                <FaTimes className="mr-2 text-red-500" size={20} />
                Auction Ends: {new Date(car.auctionEndTime).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 my-8"></div>

        <div className="flex flex-wrap gap-2 mb-6">
  <span className="px-3 py-1 bg-blue-400 text-gray-700 rounded-full text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">{car.model}</span>
  <span className="px-3 py-1 bg-blue-400 text-gray-700 rounded-full text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">{car.mileage}{' '}miles</span>
  <span className="px-3 py-1 bg-blue-400 text-gray-700 rounded-full text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">Automatic</span>
  <span className="px-3 py-1 bg-blue-400 text-gray-700 rounded-full text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">{car.FuelType}</span>
</div>

{/* Image Gallery */} <div className="flex gap-4 mb-8">
            <div className="relative w-2/3">
              <img
                src={car.images[0]}
                alt="Main car"
                className="w-full h-full object-cover rounded-lg cursor-pointer"
                onClick={() => openModal(car.images[0])}
              />
             
            </div>
            <div className="grid grid-cols-2 gap-2 w-1/2">
              {car.images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumb ${index + 1}`}
                  className="object-cover rounded-lg cursor-pointer"
                  onClick={() => openModal(image)}
                />
              ))}
            </div>
          </div>

        {/* Place Bid Section */}
        <div className="mt-6 mb-4 flex flex-col gap-3">
          <h2 className="font-semibold text-xl">Place a Bid</h2>
          {!auctionEnded ? (
            <>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Enter your bid"
                className="p-3 border border-gray-300 rounded-md text-lg"
              />
              <button
                onClick={handleBid}
                className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200 flex items-center justify-center text-lg"
              >
                <FaCheckCircle className="mr-2" />
                Place Bid
              </button>
            </>
          ) : (
            <h2 className="px-4 py-1 rounded-full text-red-600 bg-red-200 bg-opacity-30 font-semibold text-lg text-center">
              Auction Ended
            </h2>
          )}
        </div>
        <div className="border-t border-gray-300 my-8"></div>
        {/* Car Details */}
        <div>
          <h3 className="text-3xl font-semibold mb-6">Car Overview</h3>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 text-gray-800">
            <p className="flex items-start">
              <FaCar className="text-gray-600 mr-3" size={24} />
              <span className="text-lg">
                <span className="font-semibold">Body:</span> {car.Body}
              </span>
            </p>
            <p className="flex items-start">
              <FaCogs className="text-gray-600 mr-3" size={24} />
              <span className="text-lg">
                <span className="font-semibold">Condition:</span> {car.Condition}
              </span>
            </p>
            <p className="flex items-start">
              <FaTachometerAlt className="text-gray-600 mr-3" size={24} />
              <span className="text-lg">
                <span className="font-semibold">Engine Size:</span> {car.EngineSize}
              </span>
            </p>
            <p className="flex items-start">
              <FaDoorOpen className="text-gray-600 mr-3" size={24} />
              <span className="text-lg">
                <span className="font-semibold">Doors:</span> {car.Door} Doors
              </span>
            </p>
            <p className="flex items-start">
              <FaCogs className="text-gray-600 mr-3" size={70} />
              <span className="text-lg">
                <span className="font-semibold">Selected Features:</span> {car.SelectedFeatures}
              </span>
            </p>
            <p className="flex items-start">
              <FaTag className="text-gray-600 mr-3" size={24} />
              <span className="text-lg">
                <span className="font-semibold">Starting Bid:</span> 
                
                <span className="mx-2 bg-green-500 text-white text-sm px-2 py-1 rounded">{car.initialBid}</span>
              </span>
            </p>
  
           
  
            {/* Overview */}
            <p className="flex items-start sm:col-span-2">
              <span className="font-semibold text-lg mr-2">Overview:</span>
              <span className="text-lg">{car.Overview}</span>
            </p>
          </div>
  
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
              <div className="relative">
                <img src={selectedImage} alt="Full-size view" className="max-w-full max-h-screen rounded-lg" />
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-white text-2xl bg-gray-800 rounded-full p-2 focus:outline-none"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          )}
  
          {/* Gray Divider */}
          <div className="border-t border-gray-300 my-8"></div>
        </div>
  
        {/* Description */}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-4">Description</h3>
          <p className="text-lg text-gray-700">{car.Description}</p>
        </div>
  
        {/* Download Inspection Report */}
        <div className="mt-6 mb-4 flex">
          <a
            href={`${car.pdfUrl}`}
            download="inspection-report.pdf"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 rounded-lg bg-blue-50 text-blue-600 shadow-sm hover:bg-blue-100 transition-colors"
          >
            <FaFileAlt className="mr-2 text-blue-400 font-bold" />
            Download Inspection Report
          </a>
        </div>
      </div>
    </div>
    <FooterOne/>
  </div>
  
  
  
  

           
  );

 
}

export default AuctionProduct;






/*
 
 

*/