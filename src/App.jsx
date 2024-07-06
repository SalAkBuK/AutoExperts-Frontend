

/*
 Step  1: Aik bara container ho, position absolute kr do usmy, withing an image wrapper
 Step 2: "Up" and "Down" naam k 2 div hain. Dono ko col krain gy and left pr kr dengy. 
             Try krain of some way k Down ko kisi way say Downn ad left kr sakty ya nai.
Step 3: "Up" k content ko jusstify contet kr dein


<div className="content">
<div classsName = " UP">
 <img src = {logo} className = "logo"/>

 <div className= "name">Auto Expert </div>


</div>


<div classsName = " Down"></div>

</div>
*/
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {


  return (
    <>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={ <LandingPage />} />
        <Route path="/admin" element={ <AdminLogin />} />
        <Route path= "/dashboard" element = {<AdminDashboard/>} />
        <Route path= "/booking-form" element = {<InspectionForm/>} />
        <Route path= "/booking-details" element = {<CheckBooking/>} />
        <Route path="/product-form" element={<ProductForm />} />
        <Route path="/collection" element={<ProductList />} />
        <Route path="/predictor" element={<Predictor />} />
        <Route path="/member" element={<Member />} />
        <Route path="/member-login" element={<MemberLogin />} />
        <Route path="/member-signin" element={<MemberSignin />} />
        {/* Add a catch-all route to handle unauthorized access */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App