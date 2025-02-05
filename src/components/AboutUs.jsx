// src/AboutUs.js
import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className=" relative -mb-40 bg-white p-8 md:p-12 lg:p-16 text-center rounded-b-7xl  max-w-8xl mx-auto ">
      <h2 className="text-6xl font-bold mb-4 flex justify-center items-center mb-20">
        <span className="text-orange-500 text-6xl mr-2">/</span>
        About Us
      </h2>

      <div className="">

        <div className="flex flex-col">
          <p className="text-gray-700 text-lg leading-relaxed mb-10">
          
        AutoExperts is the premier online marketplace for automotive professionals. If you possess a dealer's license, you can join AutoExperts to source a wide range of high-quality vehicles, including SUVs, pickup trucks, sedans, hatchbacks, luxury cars, and more. Our platform is entirely online and operates 24/7, allowing you to find the perfect inventory from your phone or computer without the need to attend a physical auction.
      </p>
        </div>

      </div>
    
      <p className="text-gray-700 text-lg leading-relaxed mb-8">
        At AutoExperts, we employ a team of vehicle inspectors nationwide who meticulously examine wholesale, off-lease, and retail inventory directly on-site. These inspections are comprehensive, providing detailed interior and exterior photos, tire and engine conditions, odometer readings, high-definition engine sounds, OBDII scans, paint meter readings, undercarriage views, and more. This thorough inspection process ensures that you can bid with confidence and make informed purchasing decisions.
      </p>
      <p className="text-red-600 font-semibold text-lg mb-6">
        Register today to start bidding and winning used car auctions.
      </p>
      <Link
  to="/member-signin" // Set the desired link to the register page
  className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-300"
>
  Register Today
</Link>
      
    </div>
  );
}

export default AboutUs;
