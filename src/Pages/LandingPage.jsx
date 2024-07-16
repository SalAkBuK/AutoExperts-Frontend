import CarHeader from "../components/CarHeader";
import Reviews_2 from "../components/Reviews_2"
import React from "react";
import FooterOne from "../components/FooterOne"
import OurServices from "../components/OurServices";
import ReadyToSignUp from "../components/ReadyToSignUp";
import AboutUs from '../components/AboutUs';
import CarAuction from "../components/CarAuction";

function landingPage() {
  return (
    <>
      <CarHeader />
      <CarAuction/>
      <OurServices/>
      <ReadyToSignUp/>
      <AboutUs/>
      
      <Reviews_2/>
      <FooterOne/>
    </>
  );
}

export default landingPage;

/*import { Link } from 'react-router-dom';

// Inside a component
function Header() {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </header>
  );
} */
