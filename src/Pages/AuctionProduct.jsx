import React, { useState } from 'react';
import VehicleDetails from '../components/VehicleDetails';
import BidInformation from '../components/BidInformation';
import ImageGallery from '../components/ImageGallery';
import car from '../assets/AuctionPlatform/image.png';

function AuctionProduct() {
  // Define your data directly
  const [data] = useState({
    vehicle: {
      title: "2021 VOLKSWAGEN TIGUAN SE",
      images: [
        "https://via.placeholder.com/600x400",
        "https://via.placeholder.com/900x200",
        "https://via.placeholder.com/600x600"
      ],
      details: {
        lotNumber: "40183214",
        vin: "3VV2B7AX2MM******",
        titleCode: "CT - CERT OF TITLE-PARTS ONLY SALVA",
        odometer: "53,076 mi (ACTUAL)",
        primaryDamage: "FRONT END",
        cylinders: 4,
        color: "WHITE",
        engineType: "2.0L 4",
        transmission: "AUTOMATIC",
        drive: "All wheel drive",
        vehicleType: "AUTOMOBILE",
        fuel: "GAS",
        keys: "YES"
      }
    },
    bidInfo: {
      auctionStatus: "Live Auction In Progress",
      bidStatus: "YOU HAVEN'T BID",
      saleStatus: "Minimum Bid",
      currentBid: "$3,550.00 USD"
    },
   
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-left">{data.vehicle.title}</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Image Gallery */}
        <ImageGallery images={data.vehicle.images} />
        
        <div className="flex flex-col gap-4 grid-cols-2 grid gap-x-11 gap-y-10 grid-cols-2">
          {/* Vehicle Details */}
          <VehicleDetails details={data.vehicle.details} />
          
          {/* Bid Information */}
          <BidInformation bidInfo={data.bidInfo} />
          
        </div>
      </div>
    </div>
  );
}

export default AuctionProduct;
