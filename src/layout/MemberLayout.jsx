import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TiHome, TiChartBar, TiUser } from 'react-icons/ti';
import AuctionHeader from '../components/AuctionHeader';
import FooterOne from '../components/FooterOne';

const MemberLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-50 transition-transform transform bg-gray-800 text-gray-100 w-64 min-h-screen ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-center py-4 bg-gray-900">
          <h1 className="text-xl font-bold">Member Panel</h1>
        </div>
        <nav className="mt-4">
          <Link
            to="/dashboard"
            className="flex items-center px-6 py-3 hover:bg-gray-700 transition"
          >
            <TiHome className="mr-3 text-xl" />
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="flex items-center px-6 py-3 hover:bg-gray-700 transition"
          >
            <TiUser className="mr-3 text-xl" />
            Profile
          </Link>
          <Link
            to="/stats"
            className="flex items-center px-6 py-3 hover:bg-gray-700 transition"
          >
            <TiChartBar className="mr-3 text-xl" />
            Stats
          </Link>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow lg:ml-64">
        {/* Header */}
        <AuctionHeader />

        {/* Content */}
        <div className="flex-grow bg-white py-12 px-0 sm:px-0 lg:px-0">
          <button
            onClick={toggleSidebar}
            className="lg:hidden absolute top-4 left-4 bg-gray-800 text-white p-2 rounded-md focus:outline-none"
          >
            <span className="sr-only">Open Sidebar</span>
            <TiHome size={24} />
          </button>
          <main className="flex-grow">{children}</main>
        </div>

        {/* Footer */}
        <FooterOne />
      </div>
    </div>
  );
};

export default MemberLayout;
