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
    <footer className="footer bg-[#0C0C1D] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row justify-between flex-grow md:space-x-20 text-center md:text-left footer-links">
            <div className="space-y-2">
              <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
                <img src={car} alt="Logo" className="footer-logo" style={{ height: '100px', width: '350px' }} />
              </div>
              <div className="grid grid-cols-6 gap-4 px-1 py-6 lg:py-8 md:grid-cols-5">
                <div className='col-start-3 col-end-2'>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    <li className="mb-2 mt-0"><a href="#" className="hover:underline">Auctions</a></li>
                    <li className="mb-2"><a href="#" className="hover:underline">Get Started</a></li>
                    <li className="mb-2"><a href="#" className="hover:underline">Contact</a></li>
                    <li className="mb-2"><a href="#" className="hover:underline">Pricing</a></li>
                    <li className="mb-2"><a href="#" className="hover:underline">Inventory Near You</a></li>
                  </ul>
                </div>
                <div className='col-start-7 col-end-4 col-span-1'>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    <li className="mb-2 mt-0"><a href="#" className="hover:underline">Company</a></li>
                    <li className="mb-2"><a href="#" className="hover:underline">Home</a></li>
                    <li className="mb-2"><a href="#" className="hover:underline">About</a></li>
                    <li className="mb-2"><a href="#" className="hover:underline">Careers</a></li>
                    <li className="mb-2"><a href="#" className="hover:underline">Investors</a></li>
                  </ul>
                </div>
                <div className="flex space-x-6 mt-1 md:mt-1 footer-icons col-start-7 col-end-auto mb-5">
                  <a href="#"><img src={Facebook} alt="Facebook" className="h-70 w-9" style={{ viewBox: "200 100 100 100" }} /></a>
                  <a href="#"><img src={LinkedIn} alt="LinkedIn" className="h-70 w-9" /></a>
                  <a href="#"><img src={Twitter} alt="Twitter" className="h-70 w-9" /></a>
                  <a href="#"><img src={Instagram} alt="Instagram" className="h-70 w-9" /></a>
                  <a href="#"><img src={PlayStore} alt="YouTube" className="h-70 w-9" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10"></div>
      </div>
    </footer>
  );
}

export default FooterOne;
