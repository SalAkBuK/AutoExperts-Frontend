import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { FaRegClock } from "react-icons/fa";

const AuctionTimer = ({ auctionEndTime }) => {
  if (!auctionEndTime) return null;

  // Convert auctionEndTime (UTC) to PKT correctly
  const auctionEndTimePKT = moment.utc(auctionEndTime).tz("Asia/Karachi");

  const calculateTimeLeft = () => {
    return Math.floor((auctionEndTimePKT.valueOf() - moment().valueOf()) / 1000);
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [auctionEndTime]);

  const formatTimeLeft = (seconds) => {
    const days = Math.floor(seconds / (60 * 60 * 24));
    const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = seconds % 60;

    return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  const auctionEnded = timeLeft <= 0;

  
  return (
    <div className="flex items-center text-xs sm:text-sm font-semibold text-red-600 bg-opacity-20 bg-red-600 rounded-full px-2 py-1 w-auto max-w-full whitespace-nowrap">
    <FaRegClock className="mr-1 sm:mr-2 text-gray-600" />
    {auctionEnded ? "Auction Ended" : `Time Left: ${formatTimeLeft(timeLeft)}`}
  </div>
  
  );
};

export default AuctionTimer;
