import React from 'react';
import { FaCar, FaTag, FaCogs, FaBook, FaGasPump, FaTachometerAlt, FaArrowCircleDown } from 'react-icons/fa';
function VehicleDetails({ details }) {
 
  // Compute highestBidAmount

  return (
    <div className="border p-6 rounded-lg shadow-lg bg-white">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: 'DM Sans', fontSize: '40px', fontWeight: 700 }}>
        Car Details
      </h1>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'DM Sans', fontSize: '22px', fontWeight: 600 }}>
          {details.carDetails}
        </h2>
        <p className="text-gray-600 mt-2" style={{ fontFamily: 'DM Sans', fontSize: '16px', fontWeight: 400 }}>
          <strong>Auction ends at:</strong> {new Date(details.auctionEndTime).toLocaleString()}
        </p>
      </div>

      <h2 className="font-extrabold text-lg mt-6 text-gray-900" style={{ fontFamily: 'DM Sans', fontSize: '24px', fontWeight: 700 }}>
        Vehicle Details
      </h2>

      <ul className="mt-4 space-y-4 text-sm">
        <li className="flex items-center">
          <FaCar className="text-gray-600 mr-2" />
          <strong>Model:</strong> {details.model}
        </li>
        <li className="flex items-center">
          <FaTag className="text-gray-600 mr-2" />
          <strong>Title:</strong> {details.title}
        </li>
        <li className="flex items-center">
          <FaCogs className="text-gray-600 mr-2" />
          <strong>Condition:</strong> {details.Condition}
        </li>
        <li className="flex items-center">
          <FaBook className="text-gray-600 mr-2" />
          <strong>Description:</strong> {details.Description}
        </li>
        <li className="flex items-center">
          <FaCar className="text-gray-600 mr-2" />
          <strong>Body:</strong> {details.Body}
        </li>
        <li className="flex items-center">
          <FaTachometerAlt className="text-gray-600 mr-2" />
          <strong>Engine Size:</strong> {details.EngineSize}
        </li>
        <li className="flex items-center">
          <FaGasPump className="text-gray-600 mr-2" />
          <strong>Fuel Type:</strong> {details.FuelType}
        </li>
        <li className="flex items-center">
          <FaTachometerAlt className="text-gray-600 mr-2" />
          <strong>Mileage:</strong> {details.mileage} miles
        </li>
        <li className="flex items-center">
          <FaCar className="text-gray-600 mr-2" />
          <strong>Doors:</strong> {details.Door} Doors
        </li>
        <li className="flex items-center">
          <FaCogs className="text-gray-600 mr-2" />
          <strong>Selected Features:</strong> {details.SelectedFeatures}
        </li>
        <li className="flex items-center">
          <FaTag className="text-gray-600 mr-2" />
          <strong>Overview:</strong> {details.Overview}
        </li>
        <li className="flex items-center">
          <FaTag className="text-gray-600 mr-2" />
          <strong>Starting Bid:</strong> {details.initialBid}
        </li>
        <li className="flex items-center">
          <FaTag className="text-gray-600 mr-2" />
          <strong>Auction End Time:</strong> {new Date(details.auctionEndTime).toLocaleString()}
        </li>
        <li className="flex items-center">
          <FaArrowCircleDown className="text-gray-600 mr-2" />
          <strong>Inspection Report:</strong>
          <a
            href={`${details.pdfUrl}`} // Append .pdf to the URL
            download="inspection-report.pdf" // The filename for the download
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 ml-2"
          >
            Download Report
          </a>
        </li>
      </ul>
    </div>
  );
}

export default VehicleDetails;
