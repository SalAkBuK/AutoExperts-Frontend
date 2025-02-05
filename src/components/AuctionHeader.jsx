import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/AdminLogin/Icon.png';
import DownArrow from '../assets/MainHeader/DownArrow.svg';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const showAdminButton = location.pathname === '/auction-platform';
  const [menuOpen, setMenuOpen] = useState(false);

  
  const handleLogout = () => {
    
    localStorage.removeItem('token');

    
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-[#0C0C1D] -mr-10 pb-10">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-40">
        
        {/* Logo */}
        <div className="flex">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Logo" className="h-16 sm:h-20 md:h-24 w-auto max-w-xs object-contain" />
          </Link>
        </div>

        {/* Hamburger Icon for Mobile View */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Desktop Navbar Links - Visible on large screens only */}
        <div className="hidden lg:flex items-center flex-grow">
          <div className="flex space-x-4">
            {/* Dropdown Links positioned to the right */}
            {['For Buyers', 'For Sellers', 'Services', 'Company'].map((item) => (
              <div key={item} className="relative group items-center">
                <Link to="#" className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: 500 }}>
                  {item}
                  <img src={DownArrow} alt="DownArrow" className="ml-2 h-4 w-4" />
                </Link>
                <div className="absolute hidden group-hover:flex flex-col bg-gray-800 text-gray-300 mt-0 ml-4 py-2 rounded-md">
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-700 hover:text-white">Option 1</Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-700 hover:text-white">Option 2</Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Button - visible on large screens only */}
        {showAdminButton && (
          <div className="hidden lg:block">
            <button
              onClick={handleLogout} // Logout on button click
              className="bg-orange-500 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-orange-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Links - Visible only on small screens when menu is open */}
      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0C0C1D] px-4 py-2 space-y-1">
          {['For Buyers', 'For Sellers', 'Services', 'Company'].map((item) => (
            <div key={item} className="relative group">
              <Link to="#" className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                {item}
                <img src={DownArrow} alt="DownArrow" className="ml-2 h-4 w-4" />
              </Link>
              <div className="absolute hidden group-hover:flex flex-col bg-gray-800 text-gray-300 mt-0 ml-4 py-2 rounded-md">
                <Link to="#" className="block px-4 py-2 hover:bg-gray-700 hover:text-white">Option 1</Link>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-700 hover:text-white">Option 2</Link>
              </div>
            </div>
          ))}
          {showAdminButton && (
            <div className="mt-2">
              <button
                onClick={handleLogout} // Logout on button click for mobile view
                className="block bg-orange-500 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-orange-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
