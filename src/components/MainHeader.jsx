import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DownArrow from '../assets/MainHeader/DownArrow.svg';
import logo from '../assets/AdminLogin/Icon.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="dark:bg-[#0C0C1D] text-white rounded-b-7xl h-40 md:h-44 lg:h-48" 
      style={{ borderBottomLeftRadius: '50px', borderBottomRightRadius: '50px' }}>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/">
            <img 
              src={logo} 
              alt="AUTO EXPERTS" 
              className="h-14 w-auto sm:h-20 md:h-24 lg:h-32 transition-all duration-300" 
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {['For Buyers', 'For Sellers', 'Services', 'Company'].map((item, index) => (
              <div key={index} className="relative group">
                <Link to="#" className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md text-sm font-medium">
                  {item}
                  <img src={DownArrow} alt="DownArrow" className="ml-2 h-4 w-4" />
                </Link>
                <div className="absolute hidden group-hover:block bg-gray-800 text-gray-300 mt-1 py-2 rounded-md">
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-700 hover:text-white">Option 1</Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-700 hover:text-white">Option 2</Link>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 py-3">
          {['For Buyers', 'For Sellers', 'Services', 'Company'].map((item, index) => (
            <Link key={index} to="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white text-sm">
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
