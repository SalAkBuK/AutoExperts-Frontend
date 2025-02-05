import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/AdminLogin/Icon.png';
import DownArrow from '../assets/MainHeader/DownArrow.svg';

const Navbar = () => {
  const location = useLocation();
  const showAdminButton = location.pathname === '/';

  return (
    <nav className="pb-10 bg-white border-gray-200 dark:bg-[#0C0C1D]">
      <div className="pb-20 max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex lg:flex-1">
          <Link to="/" className="flex-shrink-0">
            
            <img src={logo} alt="Logo" className="h-16 sm:h-20 md:h-24 w-auto max-w-xs object-contain" />
          </Link>
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
                <Link to="#" className="block px-4 py-2 hover:bg-gray-700 hover:text-white " style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: 500 }}>Option 1</Link>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-700 hover:text-white " style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: 500 }}>Option 2</Link>
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

        {showAdminButton && (
          <div>
            <Link to="/admin" className="bg-orange-500 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-orange-600">
              Admin Portal
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
