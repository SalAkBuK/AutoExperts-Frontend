import React from 'react';

function VehicleDetails({ details }) {
  return (
    <div className="border p-4 rounded shadow-sm">
      <h2 className="font-bold text-lg">Vehicle Details</h2>
      <ul className="mt-2 space-y-1 text-sm">
        <li><strong>Lot Number:</strong> {details.lotNumber}</li>
        <li><strong>VIN:</strong> {details.vin}</li>
        <li><strong>Title Code:</strong> {details.titleCode}</li>
        <li><strong>Odometer:</strong> {details.odometer}</li>
        <li><strong>Primary Damage:</strong> {details.primaryDamage}</li>
        <li><strong>Cylinders:</strong> {details.cylinders}</li>
        <li><strong>Color:</strong> {details.color}</li>
        <li><strong>Engine Type:</strong> {details.engineType}</li>
        <li><strong>Transmission:</strong> {details.transmission}</li>
        <li><strong>Drive:</strong> {details.drive}</li>
        <li><strong>Vehicle Type:</strong> {details.vehicleType}</li>
        <li><strong>Fuel:</strong> {details.fuel}</li>
        <li><strong>Keys:</strong> {details.keys}</li>
        <li><strong>Inspection Report:</strong></li>
      </ul>
    </div>
  );
}

export default VehicleDetails;
