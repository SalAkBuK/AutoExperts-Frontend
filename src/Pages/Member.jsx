import React from 'react';
import { Navigate, useNavigate, Link } from "react-router-dom";
import logo from '../assets/AdminLogin/Icon.png';

function Member() {
  return (
    <div className="flex flex-col lg:flex-row h-screen dark:bg-[#0C0C1D] items-center justify-center px-6 lg:px-0">

    {/* Mobile - Centered at the top */}
<div className="fixed top-0 left-0 w-full flex flex-col items-center bg-[#0C0C1D] p-4 z-50 sm:hidden">
  <Link to="/" className="block">
    <img src={logo} alt="AutoExperts Auctions" className="w-2/3 sm:w-1/2 md:w-1/3 lg:w-full max-w-xs h-auto mx-auto mb-3" />
  </Link>
  <div className="flex flex-wrap justify-center gap-4 text-white text-sm sm:text-lg">
    <Link to="/" className="hover:underline">Terms of Use</Link>
    <Link to="/" className="hover:underline">Privacy</Link>
    <Link to="/" className="hover:underline">Help</Link>
    <Link to="/" className="hover:underline">Cookie Preference</Link>
  </div>
</div>
     {/* Left Side - Logo & Links (Hidden on Mobile) */}
<div className="hidden sm:flex flex-col items-center w-full">
  <Link to="/" className="block">
    <img src={logo} alt="AutoExperts Auctions" className="w-2/3 sm:w-1/2 md:w-1/3 lg:w-full max-w-xs h-auto mx-auto mb-5" />
  </Link>
  <div className="flex flex-wrap justify-center gap-4 mt-4 text-white text-sm sm:text-lg mb-10">
    <Link to="/" className="hover:underline">Terms of Use</Link>
    <Link to="/" className="hover:underline">Privacy</Link>
    <Link to="/" className="hover:underline">Help</Link>
    <Link to="/" className="hover:underline">Cookie Preference</Link>
  </div>
</div>



      {/* Right Side - Buttons */}
      <div className="flex flex-col justify-center items-center space-y-6 w-full lg:w-1/2">
        <button className="px-6 py-3 rounded-full relative flex items-center justify-center overflow-hidden bg-gray-800 text-white shadow-lg transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-orange-600 before:duration-500 before:ease-out hover:shadow-orange-600 hover:before:h-56 hover:before:w-80 w-full max-w-xs">
          <Link to="/member-login" className="relative z-10">Already A Member</Link>
        </button>

        <button className="px-6 py-3 rounded-full relative flex items-center justify-center overflow-hidden bg-gray-800 text-white shadow-lg transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-blue-600 before:duration-500 before:ease-out hover:shadow-red-400 hover:before:h-56 hover:before:w-80 w-full max-w-xs">
          <Link to="/member-signin" className="relative z-10">Become A Member</Link>
        </button>
      </div>
    </div>
  );
}

export default Member;