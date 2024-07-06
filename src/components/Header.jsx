import React from "react";
import { Link } from 'react-router-dom';
import background from "../assets/background.jpg";
import Logo from "../assets/logo.svg";
import "./header.css";

function Header() {
  return (
    <>
      <div className="conatiner">
        <div className="image-wrapper">
          <img src={background} alt=" " className="image" />
          <div className="content">
            <div className="Up">
              <div className="Left">
                <a href="#" target="_blank">
                  <img src={Logo} className="logo" alt="Logo" />
                </a>
                <div className="Name">Auto Expert</div>
              </div>
              <div className="Right">
                <Link to="/admin">
                  <button className="Admin">Admin</button>
                </Link>
              </div>
            </div>

            <div className="Down motto">
              <div className="image-text white ">LET'S GET YOU</div>
              <div className="image-text red">ON THE ROAD</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
