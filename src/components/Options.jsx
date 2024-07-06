import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Options.css";
import option1 from "../assets/option1.svg";
import option2 from "../assets/option2.svg";
import option3 from "../assets/option3.svg";
import option4 from "../assets/option4.svg";

function Options() {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };


  return (
    <>
    <h1 className="offer">AutoExpert Offerings</h1>
      <div className="options">
        <div className="cards-container">
          <div className="card" onClick={() => handleCardClick('/predictor')}>
            <img src={option1} alt="Card" className="card-image" />
            <div className="card-content">
              <h2 className="card-heading">Predictor</h2>
              <p className="card-subheading">
                Reserve your slot for car selling service
              </p>
            </div>
          </div>
          <div className="card" onClick={() => handleCardClick('/booking-form')}>
            <img src={option2} alt="Card" className="card-image"  />
            <div className="card-content">
              <h2 className="card-heading" style={{ paddingTop: "24px" }}>Slot Booking</h2>
              <p className="card-subheading">
                Reserve your slot for car selling service
              </p>
            </div>
          </div>
          <div className="card" onClick={() => handleCardClick('/collection')}>
            <img src={option3} alt="Card" className="card-image" />
            <div className="card-content">
              <h2 className="card-heading">Available Car</h2>
              <p className="card-subheading">
                Reserve your slot for car selling service
              </p>
            </div>
          </div>
          <div className="card" onClick={() => handleCardClick('/member')}>
            <img src={option4} alt="Card" className="card-image" />
            <div className="card-content">
              <h2 className="card-heading" style={{ paddingTop: "80px" }}>Become a member</h2>
              <p className="card-subheading">
                Reserve your slot for car selling service
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Options;
