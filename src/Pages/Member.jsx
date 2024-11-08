import React from 'react'
import { Navigate, useNavigate, Link } from "react-router-dom";
import logo from '../assets/AdminLogin/Icon.png';

function Member() {
  return (
    <div className="flex h-screen dark:bg-[#0C0C1D]">
    <div className="hidden lg:flex w-1/2 dark:bg-[#0C0C1D] items-center justify-center">
      <div className="text-center">
      <img src={logo} alt="AutoExperts Auctions" className="w-3/3 h-auto mb-20" />
      <div className="flex justify-between mt-8 text-white text-lg">
      <Link to="/" className="mx-4 hover:underline">Terms of Use</Link>
    <Link to="/" className="mx-4 hover:underline">Privacy</Link>
    <Link to="/" className="mx-4 hover:underline">Help</Link>
    <Link to="/" className="mx-4 hover:underline">Cookie Preference</Link>
</div>
      </div>
    </div>

    
        {/* Right Side - Buttons */}
        <div className="flex flex-col justify-center items-end space-y-20 space-x-[350px]">
         
       



          <button class="px-8 py-3 rounded-full relative flex h-[50px] w-50 items-center justify-center overflow-hidden bg-gray-800 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-orange-600 before:duration-500 before:ease-out hover:shadow-orange-600 hover:before:h-56 hover:before:w-56">
      <Link  to="/member-login" class="relative z-10">Already A Member</Link>
    </button>

    <button class="px-8 py-3 rounded-full relative flex h-[50px] w-50 items-center justify-center overflow-hidden bg-gray-800 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-blue-600 before:duration-500 before:ease-out hover:shadow-red-400 hover:before:h-56 hover:before:w-56">
      <Link to="/member-signin" class="relative z-10">Become A Member</Link>
    </button>
        </div>
      </div>
      
  )
}

export default Member;