import React from 'react';
import './FooterOne.css';
import car from '../assets/Footer/Icon.png';
import Facebook from '../assets/Footer/Facebook.svg';
import LinkedIn from '../assets/Footer/LinkedIn.svg';
import Twitter from '../assets/Footer/Twitter.svg';
import Instagram from '../assets/Footer/Instagram.svg';
import PlayStore from '../assets/Footer/PlayStore.svg';

function FooterOne() {
  return (
    <footer className="footer bg-[#0C0C1D] py-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          {/* Logo Section */}
          <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
            <img src={car} alt="Logo" className="footer-logo h-24 w-auto" />
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 w-full md:w-auto mb-6 md:mb-0">
            {/* Column 1 */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-3">Our Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:underline">Home</a></li>
                <li><a href="#" className="hover:underline">About</a></li>
               
              </ul>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-3">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:underline">Auctions</a></li>
                <li><a href="#" className="hover:underline">Get Started</a></li>
               
              </ul>
            </div>

            {/* Social Icons Section */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#"><img src={Facebook} alt="Facebook" className="h-8 w-8" /></a>
                <a href="#"><img src={LinkedIn} alt="LinkedIn" className="h-8 w-8" /></a>
                <a href="#"><img src={Twitter} alt="Twitter" className="h-8 w-8" /></a>
                <a href="#"><img src={Instagram} alt="Instagram" className="h-8 w-8" /></a>
                <a href="#"><img src={PlayStore} alt="PlayStore" className="h-8 w-8" /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Border Separator */}
        <div className="border-t border-gray-700 mt-10"></div>

        {/* Footer Bottom Text */}
        <div className="text-center text-gray-400 mt-4">
          <p>&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default FooterOne;
