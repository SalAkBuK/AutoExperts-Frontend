import Header from "../components/Header";
import Options from "../components/Options";
import Review from "../components/Review"
import React from "react";
import Footer from "../components/Footer"

function landingPage() {
  return (
    <>
      <Header />
      <Options />
      <Review/>
      <Footer/>
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
