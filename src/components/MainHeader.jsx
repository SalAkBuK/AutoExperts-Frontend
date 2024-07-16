import React from 'react';
import { Link } from 'react-router-dom';
import DownArrow from '../assets/MainHeader/DownArrow.svg';
import logo from '../assets/AdminLogin/Icon.png';

const Navbar = () => {
  return (
    <nav className="dark:bg-[#0C0C1D] text-white" style={{ height: '170px', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px' }}>
      <div className="max-w-7xl  px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-full">
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <img src={logo} alt="AUTO EXPERTS" style={{  height: '150px', width: '250px' }} />
            </div>
          </div>
          <div className="flex justify-center flex-grow sm:flex sm:items-center sm:ml-6">
            <div className="hidden md:flex space-x-4">
              <div className="relative group">
                <Link to="#" className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: 500 }}>
                  For Buyers
                  <img src={DownArrow} alt="DownArrow" className="ml-2 h-4 w-4" />
                </Link>
                <div className="absolute hidden group-hover:block bg-gray-800 text-gray-300 mt-1 py-2 rounded-md">
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-700 hover:text-white" style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: 500 }}>Option 1</Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-700 hover:text-white" style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: 500 }}>Option 2</Link>
                </div>
              </div>
              <div className="relative group">
                <Link to="#" className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: 500 }}>
                  For Sellers
                  <img src={DownArrow} alt="DownArrow" className="ml-2 h-4 w-4" />
                </Link>
                <div className="absolute hidden group-hover:block bg-gray-800 text-gray-300 mt-1 py-2 rounded-md">
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-700 hover:text-white" style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: 500 }}>Option 1</Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-700 hover:text-white" style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: 500 }}>Option 2</Link>
                </div>
              </div>
              <div className="relative group">
                <Link to="#" className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: 500 }}>
                  Services
                  <img src={DownArrow} alt="DownArrow" className="ml-2 h-4 w-4" />
                </Link>
                <div className="absolute hidden group-hover:block bg-gray-800 text-gray-300 mt-1 py-2 rounded-md">
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-700 hover:text-white" style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: 500 }}>Option 1</Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-700 hover:text-white" style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: 500 }}>Option 2</Link>
                </div>
              </div>
              <div className="relative group">
                <Link to="#" className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: 500 }}>
                  Company
                  <img src={DownArrow} alt="DownArrow" className="ml-2 h-4 w-4" />
                </Link>
                <div className="absolute hidden group-hover:block bg-gray-800 text-gray-300 mt-1 py-2 rounded-md">
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-700 hover:text-white" style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: 500 }}>Option 1</Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-700 hover:text-white" style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: 500 }}>Option 2</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <svg className="hidden h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white" style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: 500 }}>
            For Buyers
          </Link>
          <Link to="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white" style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: 500 }}>
            For Sellers
          </Link>
          <Link to="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white" style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: 500 }}>
            Services
          </Link>
          <Link to="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white" style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: 500 }}>
            Company
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
