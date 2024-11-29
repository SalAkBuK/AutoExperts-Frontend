import React, { useState,useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CarHeader from '../components/CarHeader';
import FooterOne from '../components/FooterOne';
import { FaDoorOpen, FaHammer, FaCheckCircle, FaTimes, FaBook, FaCar, FaCogs, FaTachometerAlt, FaTag, FaDollarSign } from 'react-icons/fa';
import { FaFileAlt } from 'react-icons/fa';

// Dummy data
const dummyCar = {
  _id: '1',
  title: '2020 Toyota Camry',
  model: 'Camry',
  mileage: 20,
  FuelType: 'Petrol',
  images: ['https://via.placeholder.com/600', 'https://via.placeholder.com/400', 'https://via.placeholder.com/400'],
  carDetails: 'Reliable and efficient sedan',
  Body: 'Sedan',
  Condition: 'New',
  EngineSize: '3.5L',
  Door: 4,
  SelectedFeatures: 'Leather Seats, Sunroof',
  initialBid: 15000,
  auctionEndTime: new Date(Date.now() + 3600 * 1000).toISOString(),
  Overview: 'The Toyota Camry is one of the most reliable sedans.',
  Description: 'A great car for daily commutes with excellent fuel efficiency.',
  topBids: [{ bidAmount: 17000 }],
  pdfUrl: 'https://via.placeholder.com/150'
};


/*
useEffect(() => {
    if (!productId) {
      console.error('Product ID is not defined.');
      return;
    }

    console.log('Fetching car with ID:', carId);
    console.log('Member Id: ', memberId);


    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        console.log("RESPONSE: ", response)
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchProduct();

   
  }, [productId]);
*/
function UsedProducts() {
  const { productId } = useParams();
  const [car, setCar] = useState(); 
  const location = useLocation();

useEffect(() => {
    if (!productId) {
      console.error('Product ID is not defined.');
      return;
    }

    


    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        console.log("RESPONSE: ", response)
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchProduct();

   
  }, [productId]);

  return (
    <div>
      <CarHeader />

      <div className="relative -mt-20 bg-white rounded-tl-7xl rounded-tr-7xl py-12 px-4 sm:px-6 lg:px-8 shadow-lg mb-20">
        <div className="container mx-auto p-4 max-w-6xl bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-semibold text-left">{car?.title}</h1>
              <p className="text-gray-500">{car?.carDetails}</p>
            </div>
          </div>
          <div className="flex gap-2 mb-6">
            <span className="px-3 py-1 bg-blue-400 text-gray-700 rounded-full">{car?.model}</span>
            <span className="px-3 py-1 bg-blue-400 text-gray-700 rounded-full">{car?.mileage} miles</span>
            <span className="px-3 py-1 bg-blue-400 text-gray-700 rounded-full">Automatic</span>
            <span className="px-3 py-1 bg-blue-400 text-gray-700 rounded-full">{car?.FuelType}</span>
          </div>
          <div className="flex gap-4 mb-8">
            <div className="relative w-2/3">
              <img
                src={car?.images[0]}
                alt="Main car"
                className="w-full h-full object-cover rounded-lg cursor-pointer"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 w-1/2">
              {car?.images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt='Cr'
                  className="object-cover rounded-lg cursor-pointer"
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Car Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-gray-700">
              <p className="flex items-start">
                <FaCar className="text-gray-600 mr-2" size={20} />
                <span>
                  <span className="font-semibold">Body: </span>
                  {car?.Body}
                </span>
              </p>
              <p className="flex items-start">
                <FaCogs className="text-gray-600 mr-2" size={20} />
                <span>
                  <span className="font-semibold">Condition: </span>
                  {car?.Condition}
                </span>
              </p>
              <p className="flex items-start">
                <FaTachometerAlt className="text-gray-600 mr-2" size={20} />
                <span>
                  <span className="font-semibold">Engine Size: </span>
                  {car?.EngineSize}
                </span>
              </p>
              <p className="flex items-start">
                <FaDoorOpen className="text-gray-600 mr-2" size={20} />
                <span>
                  <span className="font-semibold">Doors: </span>
                  {car?.Door} Doors
                </span>
              </p>
              <p className="flex items-start">
                <FaCogs className="text-gray-600 mr-2" size={20} />
                <span>
                  <span className="font-semibold">Selected Features: </span>
                  {car?.SelectedFeatures}
                </span>
              </p>
            </div>

            <p className="flex items-start sm:col-span-2 mt-10">
              <span className="font-semibold mr-2">Overview:</span>
              {car?.Overview}
            </p>

            {/* Added Current Highest Bid and Initial Bid here */}
            
            
          </div>

          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-4">Description</h3>
            <p className="flex items-start">
              <FaBook className="text-gray-600 mr-2" size={20} />
              <span>{car?.Description}</span>
            </p>
          </div>

          <div className="mt-6">
            <a
              href={'/pdf'}
              download="inspection-report.pdf"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 rounded-lg bg-blue-50 text-blue-600 shadow-sm hover:bg-blue-100 transition-colors"
            >
              <FaFileAlt className="mr-2 text-blue-400" />
              Download Inspection Report
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsedProducts;