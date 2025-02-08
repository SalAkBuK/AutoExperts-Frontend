import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';
import InspectionForm from './Pages/InspectionForm';
import CheckBooking from './Pages/CheckBooking';
import ProductForm from './Pages/ProductForm';
import ProductList from './Pages/ProductList';
import Predictor from './Pages/Predictor';
import Member from './Pages/Member'
import MemberLogin from './Pages/MemberLogin';
import MemberSignin from './Pages/MemberSignin';
import ScrollToTop from './components/ScrollToTop';
import UsedProducts from './Pages/UsedProducts'
import Logout from './components/Logout';
import AuctionProduct from './Pages/AuctionProduct';
import AuctionPlatform from './Pages/AuctionPlatform';
import AddCarForm from './Pages/AddCarForm';
import AuctionList from './Pages/AuctionList';
import CarDetail from './Pages/CarDetail';

import MemberLayout from './layout/Memberlayout';
import MemberPlatform from './Pages/Auction/MemberPlatform';
import SuccessForm from './Pages/Forms/success';
import FailureForm from './Pages/Forms/fail';
import ChatBot from './components/ChatBot';


function App() {


  return (
    <>
       <BrowserRouter>
       <div className="flex flex-col min-h-screen">
       <ScrollToTop />
      <Routes>
        <Route path="/" element={ <LandingPage />} />
        <Route path="/admin" element={ <AdminLogin />} />
        <Route path= "/dashboard" element = {<AdminDashboard/>} />
        <Route path= "/booking-form" element = {<InspectionForm/>} />
        <Route path= "/booking-details" element = {<CheckBooking/>} />
        <Route path="/product-form" element={<ProductForm />} />
        <Route path="/add-car-form" element={<AddCarForm />} />
        <Route path="/auction-car-list" element={<AuctionList />} />
        <Route path="/collection" element={<ProductList />} />
        <Route path="/product/:productId" element={<UsedProducts/>} />
        <Route path="/predictor" element={<Predictor />} />
        <Route path="/member" element={<Member />} />
        <Route path="/member-login" element={<MemberLogin />} />
        <Route path="/member-signin" element={<MemberSignin />} />
        <Route path='/ai-assistant' element={<ChatBot/>}/>
        <Route path="/forms/failure" element={<FailureForm />} />
        <Route path="/forms/success" element={<SuccessForm />} />

        <Route path = "/auction-platform" element={<AuctionPlatform />}/>
        <Route path = "/member-platform"  element={
          <MemberLayout>
            <MemberPlatform />
          </MemberLayout>
        }/>

        <Route path="/car/:carId" element={<AuctionProduct/>} />
        <Route path="/car-details" element={<CarDetail/>} />
        <Route path = "/logout" element={<Logout />}/>
        {/* Add a catch-all route to handle unauthorized access */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>

      </div>
    </BrowserRouter>
    </>
  )
}

export default App