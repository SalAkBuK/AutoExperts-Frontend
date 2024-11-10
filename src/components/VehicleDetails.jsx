import React from 'react';

function VehicleDetails({ details }) {
 
  // Compute highestBidAmount

  return (
    <div className="border p-4 rounded shadow-sm">
      <h1 className="font-bold text-xl">Car Details</h1>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">{details.carDetails}</h2>
        <p><strong>Auction ends at:</strong> {new Date(details.auctionEndTime).toLocaleString()}</p>
      </div>

      <h2 className="font-bold text-lg mt-6">Vehicle Details</h2>
      <ul className="mt-2 space-y-1 text-sm">
        <li><strong>Model:</strong> {details.model}</li>
        <li><strong>Title:</strong> {details.title}</li>
        <li><strong>Condition:</strong> {details.condition}</li>
        <li><strong>Description:</strong> {details.description}</li>
        <li><strong>Body:</strong> {details.body}</li>
        <li><strong>Engine Size:</strong> {details.engineSize}</li>
        <li><strong>Fuel Type:</strong> {details.fuelType}</li>
        <li><strong>Mileage:</strong> {details.mileage} miles</li>
        <li><strong>Doors:</strong> {details.door} doors</li>
        <li><strong>Selected Features:</strong> {details.selectedFeatures}</li>
        <li><strong>Exterior Dimensions:</strong> {details.exteriorDimensions}</li>
        <li><strong>Fender and Bumper Damage:</strong> {details.fenderAndBumperDamage}</li>
        <li><strong>Towing Capacity:</strong> {details.towingCapacity}</li>
        <li>
  <strong>Inspection Report:</strong>
  <a 
    href={`${details.pdfUrl}.pdf`}  // Append .pdf to the URL
    download="inspection-report.pdf"  // The filename for the download
    rel="noopener noreferrer"
  >
    Download Report
  </a>
</li>




      </ul>
    </div>
  );
}

export default VehicleDetails;
