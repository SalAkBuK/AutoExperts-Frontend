import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TiHome, TiChartBar, TiUser } from 'react-icons/ti';
import { FiMenu, FiChevronLeft } from 'react-icons/fi';
const MemberLayout = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(window.innerWidth > 768);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarExpanded(false);
      } else {
        setIsSidebarExpanded(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Run on mount to check initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goBackToPreviousPage = () => {
    if (location.pathname !== '/dashboard') {
      navigate(-1);
    }
  };

  return (
    <div className="flex bg-indigo-900 h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ${
          isSidebarExpanded ? 'w-64' : 'w-20'
        } flex flex-col`}
      >
        {/* Header */}
        <div className="py-4 px-6 bg-gray-900 flex items-center justify-between">
          {isSidebarExpanded && <h1 className="text-lg font-bold">Member Panel</h1>}
          <button
            className="text-white text-xl focus:outline-none"
            onClick={toggleSidebar}
          >
            {isSidebarExpanded ? <FiChevronLeft /> : <FiMenu />}
          </button>
        </div>
        {/* Navigation */}
        <nav className="flex-grow mt-6 overflow-y-auto">
          <ul className="space-y-1">
            <li>
              <button
                onClick={goBackToPreviousPage}
                className="flex items-center gap-4 px-6 py-3 hover:bg-gray-700 transition-colors w-full text-left"
                disabled={location.pathname === '/dashboard'}
              >
                <TiHome className="text-xl" />
                {isSidebarExpanded && <span>Dashboard</span>}
              </button>
            </li>
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-4 px-6 py-3 hover:bg-gray-700 transition-colors"
              >
                <TiUser className="text-xl" />
                {isSidebarExpanded && <span>Profile</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/stats"
                className="flex items-center gap-4 px-6 py-3 hover:bg-gray-700 transition-colors"
              >
                <TiChartBar className="text-xl" />
                {isSidebarExpanded && <span>Stats</span>}
              </Link>
            </li>
          </ul>
          
        </nav>
        {/* Footer */}
        <div className="py-4 px-6 bg-gray-900 text-sm text-center">
          {isSidebarExpanded ? '© 2024 Member Panel' : '© 2024'}
        </div>
      </aside>

      {/* Main Content Area */}
      <main
        className={`transition-all duration-300 ${
          isSidebarExpanded ? 'ml-64' : 'ml-20'
        } flex-grow bg-white overflow-y-auto h-full`}
      >
        <div className="min-h-screen">{children}</div>
      </main>
    </div>
  );
};

export default MemberLayout;
