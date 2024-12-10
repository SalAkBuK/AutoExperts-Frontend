import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import Arrow from '../assets/SlotBooking/Arrow.svg';
import  MainHeader from '../components/MainHeader';
import FooterOne from '../components/FooterOne';

const UserForm = () => {
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [token, setToken] = useState(""); // Add state to store token

  const timeOptions = Array.from({ length: 96 }, (_, index) => {
    const hours = String(Math.floor(index / 4)).padStart(2, '0');
    const minutes = String((index % 4) * 15).padStart(2, '0');
    return { value: `${hours}:${minutes}`, label: `${hours}:${minutes}` };
  });

  const currentDate = new Date().toISOString().split('T')[0];
  const currentTime = new Date().toTimeString().split(' ')[0];

  const formik = useFormik({
    initialValues: {
      name: "",
      contactNumber: "",
      email: "",
      address: "",
      date: "",
      time: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[a-zA-Z\s]*$/, "Name cannot contain digits or special characters")
        .required("Required"),
      contactNumber: Yup.string().required("Required"),
      email: Yup.string()
        .email("Invalid email address")
        .test("one-at-sign", "Email can only have one '@'", (value) => {
          return value && value.split("@").length - 1 === 1;
        })
        .required("Required"),
      address: Yup.string().required("Required"),
      date: Yup.date().required("Required"),
      time: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      if (otpVerified) {
        try {
          const response = await axios.post("http://localhost:5000/api/bookings/submit-form", values);
          if (response.data.success) {
            alert("Form submitted successfully");
            formik.resetForm();
          } else if (!response.data.success) {
            if (response.data.message && response.data.message.includes('Booking already exists for this date and time')) {
              alert("Booking already exists for this date and time");
            } else {
              alert("Failed to submit form: " + (response.data.message ? response.data.message : "Unknown error"));
            }
            formik.resetForm();
          } else {
            alert("You are having problem...");
          }
        } catch (error) {
          alert("Error submitting form");
          formik.resetForm();
        }
      } else {
        alert("Please verify OTP first");
      }
    },
  });

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!formik.values.contactNumber) {
      alert("Please enter a contact number first");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/bookings/send-otp",
        { contactNumber: formik.values.contactNumber },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        setOtpSent(true);
        setToken(response.data.token); // Save the token
      } else {
        alert("Failed to send OTP");
      }
    } catch (error) {
      alert("Error sending OTP");
      console.error(error);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/bookings/verify-otp", {
        contactNumber: formik.values.contactNumber,
        otp,
        token
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        setOtpVerified(true);
        alert("OTP verified successfully!");
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Error verifying OTP");
    }
  };

  return (
<>
    <MainHeader/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100  pt-20  ">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
      <h1 className="text-3xl font-bold text-center pb-10 ">INSPECTION BOOKING</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4 ">
        {/* Row 1 */}
        
        <h2 className="text-xl font-bold text-left mb-6">Book you Slot Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700">Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              style={{ background: '#F6F9FF' }}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
            ) : null}
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="contactNumber" className="text-gray-700">Contact Number:</label>
            <div className="flex">
              <input
                id="contactNumber"
                type="tel"
                name="contactNumber"
                value={formik.values.contactNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                style={{ background: '#F6F9FF' }}
              />
              <button
                onClick={handleSendOtp}
                disabled={otpSent || !formik.values.contactNumber}
                type="button"
                className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Verify
              </button>
            </div>
            {formik.touched.contactNumber && formik.errors.contactNumber ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.contactNumber}</div>
            ) : null}
          </div>
        </div>
  
        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otpSent && !otpVerified && (
            <div className="flex flex-col">
              <label htmlFor="otp" className="text-gray-700">OTP:</label>
              <div className="flex">
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={handleOtpChange}
                  required
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  style={{ background: '#F6F9FF' }}
                />
                <button
                  onClick={handleVerifyOtp}
                  type="button"
                  className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                
                >
                  Send
                </button>
              </div>
            </div>
          )}
  
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              style={{ background: '#F6F9FF' }}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            ) : null}
          </div>
        </div>
  
        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="address" className="text-gray-700">Address:</label>
            <input
              id="address"
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              style={{ background: '#F6F9FF' }}
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.address}</div>
            ) : null}
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="date" className="text-gray-700">Date:</label>
            <input
              id="date"
              type="date"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              min={currentDate}
              required
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              style={{ background: '#F6F9FF' }}
            />
            {formik.touched.date && formik.errors.date ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.date}</div>
            ) : null}
          </div>
        </div>
  
        {/* Row 4 */}
        <div className="flex flex-col">
          <label htmlFor="time" className="text-gray-700">Time:</label>
          <Select
            id="time"
            name="time"
            options={timeOptions}
            value={timeOptions.find(option => option.value === formik.values.time)}
            onChange={option => formik.setFieldValue('time', option.value)}
            onBlur={formik.handleBlur}
            className="border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
            style={{ background: '#F6F9FF' }}
          />
          {formik.touched.time && formik.errors.time ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.time}</div>
          ) : null}
        </div>
  
        {/* Submit Button */}
        <div className="flex justify-end">
        {otpVerified && (
          <button
            type="submit"
            disabled={!otpVerified}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-3 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            
            Book Now
            <img src={Arrow} alt="Arrow Icon" className="w-5 h-5 mr-1" />
            
          </button>
        )}
        </div>
      </form>
  
    </div>       
  
  </div>
  <FooterOne/>
  
  
  </>
  );
};

export default UserForm;
