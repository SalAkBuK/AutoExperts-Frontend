import React, { useState, useEffect } from 'react';
import { FaRegClock } from 'react-icons/fa';

const AuctionTimer = ({ auctionEndTime }) => {
  const [timeLeft, setTimeLeft] = useState(
    Math.floor((new Date(auctionEndTime) - new Date()) / 1000)
  );

  useEffect(() => {
    // Update the countdown every second
    const timerId = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Clear the interval when component unmounts or time reaches zero
    return () => clearInterval(timerId);
  }, [auctionEndTime]);

  // Calculate days, hours, minutes, and seconds
  const getTimeLeft = (seconds) => {
    const days = Math.floor(seconds / (60 * 60 * 24));
    const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = seconds % 60;

    return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="flex items-center text-sm font-semibold text-red-600 bg-opacity-20 bg-red-600 rounded-full px-2 py-1 w-auto max-w-xs whitespace-nowrap">
      <FaRegClock className="mr-2 text-gray-600" />
      {timeLeft > 0
        ? `Time Left: ${getTimeLeft(timeLeft)}`
        : 'Auction Ended'}
    </div>
  );
};

export default AuctionTimer;

