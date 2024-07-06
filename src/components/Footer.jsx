import React from 'react';
import "./footer.css"
import footer from "../assets/footer.svg";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p style={{ color: 'white'}}>GET IN TOUCH</p>
        <div className="footer-contact" style={{paddingLeft:'8rem'}}>
          <p style={{ color: 'white'}}>Handquarter</p>
          <h3 style = {{color:'red', fontSize: '24px'}}>xyz, Islamabad</h3>
          <p style={{ color: 'white'}}>Email</p>
          <h3 style = {{color:'red', fontSize: '24px'}}>autoexpert@gmail.com</h3>
        </div>
      </div>
      <img src={footer} alt="Contact information" style={{ width: '100%', maxWidth: '300px', height: 'auto', marginTop: '1rem' }} />

    </footer>
  );
};

export default Footer;