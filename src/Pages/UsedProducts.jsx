import React, { useState,useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CarHeader from '../components/CarHeader';
import FooterOne from '../components/FooterOne';
import { FaDoorOpen, FaHammer, FaCheckCircle, FaTimes, FaBook, FaCar, FaCogs, FaTachometerAlt, FaTag, FaDollarSign } from 'react-icons/fa';
import { FaFileAlt } from 'react-icons/fa';
import axios from 'axios'; // Add this import



function UsedProducts() {
  const { productId } = useParams();
  const [car, setCar] = useState(null); // Initialize with null
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const location = useLocation();

  useEffect(() => {
    if (!productId) {
      console.error("Product ID is not defined.");
      setError("Invalid product ID");
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://167.99.228.40:5000/api/products/${productId}`);
        console.log("RESPONSE: ", response);
        setCar(response.data.products); // ✅ Set to response.data.products
        setLoading(false);
      } catch (error) {
        console.error("Error fetching car details:", error);
        setError("Failed to fetch car details");
        setLoading(false);
      }
    };
    
    fetchProduct();

    return () => controller.abort(); // Cleanup to prevent memory leaks
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }



  return (
    
    <div>
      <CarHeader />
      <div>
      <h1>{car?.title || "No Title Available"}</h1>
      <p>{car?.carDetails || "No details available"}</p>
    </div>
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
          <div className="grid grid-cols-2 gap-2 w-1/2">
  {car?.images?.length > 1 ? (
    car.images.slice(1).map((image, index) => (
      <img
        key={index}
        src={image}
        alt="Car"
        className="object-cover rounded-lg cursor-pointer"
      />
    ))
  ) : (
    <p className="text-gray-500">No additional images available</p>
  )}
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