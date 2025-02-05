// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Main from './components/main/Main';
import UserTable from './components/main/UserTable';
import InspectionBookings from './components/main/InspectionBookings';
import AuctionList from './components/main/AuctionList';
import AuctionDetails from './components/main/AuctionDetails';
import UploadCarDetails from './components/main/UploadCarDetails';
import UploadAuctionCars from './components/main/UploadAuctionCars';
const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-white dark:bg-slate-100">
        <section className="w-[10%] sm:w-[15%]">
          <Sidebar />
        </section>
        <section className="flex flex-col w-[90%] sm:w-[85%] overflow-auto">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/users" element={<UserTable />} />
            <Route path="/inspection-bookings" element={<InspectionBookings />} />
            <Route path="/auction-list" element={<AuctionList/>}/>
            <Route path="/auction-details/:auctionId" element={<AuctionDetails />} />
            <Route path="/upload-car-details" element={<UploadCarDetails/>}/>
            <Route path="/upload-auction-cars" element={<UploadAuctionCars />} />
            </Routes>
        </section>
      </div>
    </Router>
  );
};

export default App;
