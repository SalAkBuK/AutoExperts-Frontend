import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";




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
          console.log(response.data)
          if (response.data.success) {
            alert("Form submitted successfully");
            // Clear form fields
      setFormData({
        name: '',
        contactNumber: '',
        email: '',
        address: '',
        date: '',
        time: '',
      });
          } else if(!response.data.success) {
            if (response.data.message && response.data.message.includes('Booking already exists for this date and time')) {
              alert("Booking already exists for this date and time");
            } else {
              alert("Failed to submit form: " + (response.data.message ? response.data.message : "Unknown error"));
            }
            setFormData({
              name: '',
              contactNumber: '',
              email: '',
              address: '',
              date: '',
              time: '',
            });
        } else{
          alert("You are having problem... ")
        } 
      }catch (error) {
          alert("Error submitting form");
          setFormData({
            name: '',
            contactNumber: '',
            email: '',
            address: '',
            date: '',
            time: '',
          });
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
      console.log('Verifying OTP...');
      console.log('Contact Number:', formik.values.contactNumber);
      console.log('OTP:', otp);

      const response = await axios.post("http://localhost:5000/api/bookings/verify-otp", {
        contactNumber: formik.values.contactNumber,
        otp,
        token
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log('Response from server:', response.data);

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
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <label>Contact Number:</label>
          <input
            type="tel"
            name="contactNumber"
            value={formik.values.contactNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.contactNumber && formik.errors.contactNumber ? (
            <div>{formik.errors.contactNumber}</div>
          ) : null}
          <button onClick={handleSendOtp} disabled={otpSent || !formik.values.contactNumber}>
            Send OTP
          </button>
        </div>
        {otpSent && !otpVerified && (
          <div>
            <label>OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              required
            />
            <button onClick={handleVerifyOtp}>Verify OTP</button>
          </div>
        )}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.address && formik.errors.address ? (
            <div>{formik.errors.address}</div>
          ) : null}
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            min={currentDate} required 
          />
          {formik.touched.date && formik.errors.date ? (
            <div>{formik.errors.date}</div>
          ) : null}
        </div>
        <div>
          <label>Time:</label>
          <Select
            name="time"
            options={timeOptions}
            value={timeOptions.find(option => option.value === formik.values.time)}
            onChange={(option) => formik.setFieldValue("time", option.value)}
            onBlur={formik.handleBlur}
            min={currentTime} required
          />
          {formik.touched.time && formik.errors.time ? (
            <div>{formik.errors.time}</div>
          ) : null}
        </div>
        <button type="submit" disabled={!otpVerified}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
