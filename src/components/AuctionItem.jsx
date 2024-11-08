import React from 'react';
import carImage from '../assets/AuctionPlatform/image.png';
import { Navigate, useNavigate, Link } from "react-router-dom";

function AuctionItem({ data }) {
  return (
    <div className="grid grid-cols-6 bg-white p-4 shadow rounded-lg items-center">
      <div>
        <img src={data.imageUrl} alt={data.title} className="w-24 h-24 object-cover rounded" />
      </div>
      <div>
        <h2 className="text-lg font-bold">{data.title}</h2>
        <p className="text-sm">Lot #: {data.itemNumber}</p>
      </div>
      <div>
        <p className="text-sm">Odometer: {data.odometer} (ACTUAL)</p>
      </div>
      <div>
        <p className="text-sm">Condition: {data.condition}</p>
        <p className="text-sm">Damage: {data.damage}</p>
      </div>
      <div>
        <p className="text-sm">{data.location}</p>
        <p className="text-red-500">Auction in {data.timeLeft}</p>
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold text-blue-600">{data.bid}</p>
        <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">Bid</button>
      </div>
    </div>
  );
}

export default AuctionItem;
