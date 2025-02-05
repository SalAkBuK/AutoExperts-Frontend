import CarHeader from "../components/CarHeader";
import Reviews_2 from "../components/Reviews_2"
import React, { useRef } from 'react';
import FooterOne from "../components/FooterOne"
import OurServices from "../components/OurServices";
import ReadyToSignUp from "../components/ReadyToSignUp";
import AboutUs from '../components/AboutUs';
import CarAuction from "../components/CarAuction";

import MemberLayout from "../layout/MemberLayout";
function landingPage() {


  const servicesSectionRef = useRef(null);

  const scrollToServices = () => {
    const targetPosition = servicesSectionRef.current?.getBoundingClientRect().top + window.scrollY;
    
    if (targetPosition !== undefined) {
      // Customize the scroll endpoint by adding an offset
      const offset = 10;  // Adjust this value to control where the scroll should stop
      const scrollToPosition = targetPosition - offset;  // Adjusted scroll position with offset
      
      // Perform the smooth scroll
      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth',
      });
    }
  };
  
  

  return (
    <>
      <CarHeader />
      <CarAuction/>
      <OurServices ref={servicesSectionRef} />
      <ReadyToSignUp scrollToServices={scrollToServices} />
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
