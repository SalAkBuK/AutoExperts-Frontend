import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import Arrow from '../assets/SlotBooking/Arrow.svg';
import  MainHeader from '../components/MainHeader';
import FooterOne from '../components/InspectionFooter';
import "flatpickr/dist/themes/dark.css"; // Theme that matches your form
import Flatpickr from "react-flatpickr";
import { CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

import React, { useEffect, useState } from 'react';


const generateTimeSlots = (selectedDate) => {
  const slots = [];
  let currentHour = 8; // Start from 8 AM
  let currentMinute = 0;

  const now = new Date();
  const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes(); // Current time in minutes for comparison

  const selectedDay = new Date(selectedDate);
  const isSameDay = selectedDay.toDateString() === now.toDateString(); // Check if the selected date is today

  // Loop through the time slots (from 8 AM to 11:30 PM)
  while (currentHour < 23 || (currentHour === 23 && currentMinute === 0)) {
    const slotValue = `${currentHour}:${String(currentMinute).padStart(2, "0")}`;
    const slotTimeInMinutes = currentHour * 60 + currentMinute; // Slot time in minutes for comparison

    // Format time to show in AM/PM
    const time = `${String(currentHour % 12 || 12).padStart(2, "0")}:${String(currentMinute).padStart(2, "0")} ${
      currentHour < 12 ? "AM" : "PM"
    }`;

    // Check if the selected date is today and the slot is in the past
    const isPast = isSameDay && slotTimeInMinutes < currentTimeInMinutes; // Disable past slots for today

    slots.push({
      value: slotValue,
      label: time,
      isDisabled: isPast, // Disable past slots only if the selected date is today
    });

    // Increment the time by 30 minutes
    currentMinute += 30;
    if (currentMinute === 60) {
      currentMinute = 0;
      currentHour++;
    }
  }

  return slots;
};






const UserForm = () => {
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [token, setToken] = useState(""); // Add state to store token
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const timeSlots = generateTimeSlots(); // Function to generate time slots
  const currentDate = new Date().toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'
  const [date, setDate] = useState(""); // Initialize date as an empty string or current date if needed
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false); // Loading state for email validation
  const [isBooked, setIsBooked] = useState(false); // State to manage booking status
  const [isChecking, setIsChecking] = useState(false);
  const [emailValid, setEmailValid] = useState(null); // Start with null for an "unset" state
  const [isFocused, setIsFocused] = useState(false);
  

 
 // Function to normalize date to "YYYY-MM-DD"
const normalizeDateFormat = (date) => {
  return new Date(date).toISOString().split('T')[0];  // "YYYY-MM-DD"
};

// Function to normalize time to "HH:mm"
const normalizeTimeFormat = (time) => {
  const [hour, minute] = time.split(':').map(Number);
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

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
    .required("Required"),
      address: Yup.string().required("Required"),
      date: Yup.date().required("Required"),
      time: Yup.string().required("Required"),
  }),
  onSubmit: async (values) => {
      if (otpVerified) {
          try {
              const payload = {
                  ...values,
                  date: normalizeDateFormat(values.date),  // Normalize the date
                  time: normalizeTimeFormat(values.time),   // Normalize the time
                  otp,
                  otpToken: token,
              };

              console.log("Submitting payload:", payload);

              const response = await axios.post("http://167.99.228.40:5000/api/bookings/submit-form", payload);
              
              if (response.data.success) {
                  alert("Form submitted successfully");
                  setIsBooked(true);  // Mark as booked

                  formik.resetForm();
              } else if (!response.data.success) {
                  if (response.data.message.includes('Booking already exists for this date and time')) {
                      alert("Booking already exists for this date and time");
                  } else {
                      alert("Failed to submit form: " + response.data.message);
                  }
                  formik.resetForm();
              } else {
                  alert("You are having a problem...");
              }
          } catch (error) {
              console.error("Error submitting form:", error);
              alert("Error submitting form");
              formik.resetForm();
          }
      } else {
          alert("Please verify OTP first");
      }
  }
});

  // Consolidated useEffect for fetching booked slots
  useEffect(() => {
    // Check if the selected date is valid
    if (formik.values.date) {
      const formattedDate = new Date(formik.values.date).toISOString().split('T')[0]; // Ensure format 'YYYY-MM-DD'
  
      axios
        .get("http://167.99.228.40:5000/api/bookings/booked-slots", { params: { date: formattedDate } })
        .then(response => {
          if (response.data.success) {
            setBookedSlots(response.data.unavailableTimes || []); // Ensure default to an empty array
          } else {
            console.error("Error in API response:", response.data.message);
          }
        })
        .catch(err => {
          console.error("Error fetching booked slots:", err);
        });
    }
  }, [formik.values.date]); // Dependency on formik.values.date
  
  // Log current booked slots whenever it changes
  useEffect(() => {
    console.log("Updated bookedSlots:", bookedSlots); // Log bookedSlots after state change
  }, [bookedSlots]); // This will run every time the bookedSlots state is updated
  
  const availableTimeOptions = timeSlots.map((slot) => {
    const normalizedValue = normalizeTimeFormat(slot.value);
    const normalizedBookedSlots = bookedSlots.map(normalizeTimeFormat); // Normalize booked slots too
    const isBooked = normalizedBookedSlots.includes(normalizedValue);
  
    // Get current date and time
    const now = new Date();
    const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
    const slotTimeInMinutes = parseInt(normalizedValue.split(":")[0]) * 60 + parseInt(normalizedValue.split(":")[1]);
  
    // Ensure selectedDate is properly initialized from user input (e.g., 'YYYY-MM-DD')
    const selectedDateObj = new Date(selectedDate); // Convert user input into Date object
    const isSameDay = selectedDateObj.toDateString() === now.toDateString();
    
    // Disable past slots only if the selected date is today
    const isPast = isSameDay && slotTimeInMinutes < currentTimeInMinutes;
  
    console.log(`Slot: ${slot.label}, Is Disabled: ${isBooked || isPast}, Selected Date: ${selectedDate}`);
  
    return {
      value: slot.value,
      label: slot.label,
      isBooked: isBooked,
      isDisabled: slot.isDisabled || isPast || isBooked // Disable if booked or past (only for today)
    };
  });
  
  const handleDateChange = async (selectedDate) => {
    const formattedDate = selectedDate.toLocaleDateString("en-CA"); // Localized date format (YYYY-MM-DD)
    console.log("Updated selectedDate:", formattedDate);
  
    setDate(formattedDate); // Update your state here (if you have a state to track it)
    setSelectedDate(formattedDate); // Set the selected date for your time slots
  
    // Fetch the booked slots for the selected date
    setLoadingSlots(true);
    try {
      const response = await axios.get("http://167.99.228.40:5000/api/bookings/booked-slots", {
        params: { date: formattedDate },
      });
      if (response.data.success) {
        setBookedSlots(response.data.unavailableTimes || []);
      }
    } catch (error) {
      console.error("Error fetching booked slots:", error);
    } finally {
      setLoadingSlots(false);
    }
  };
  
  // Check if a time slot is available
  const isSlotAvailable = (time) => {
    return !bookedSlots.includes(time); // Return true if the time is not in bookedSlots
  };
  
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  
  const formatPhoneNumber = (number) => {
    let cleanedNumber = number.replace(/\D/g, ""); // Remove non-numeric characters
  
    if (cleanedNumber.startsWith("0") && cleanedNumber.length === 11) {
      return `+92${cleanedNumber.slice(1)}`; // Convert '03131681095' to '+923131681095'
    }
  
    return cleanedNumber; // Return as is if it's already correct
  };
  
  const handleSendOtp = async (e) => {
    e.preventDefault();
    let rawNumber = formik.values.contactNumber.trim();
  
    if (!rawNumber) {
      alert("Please enter a contact number first");
      return;
    }
  
    const formattedNumber = formatPhoneNumber(rawNumber);
  
    if (formattedNumber.length !== 13) {
      alert("Please enter a valid 11-digit phone number starting with 0 (e.g., 03131681095)");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://167.99.228.40:5000/api/bookings/send-otp",
        { contactNumber: formattedNumber }, // Send formatted number
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        setOtpSent(true);
        setToken(response.data.token);
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
    let rawNumber = formik.values.contactNumber.trim();
  
    if (!rawNumber) {
      alert("Please enter a contact number first");
      return;
    }
  
    const formattedNumber = formatPhoneNumber(rawNumber);
  
    if (formattedNumber.length !== 13) {
      alert("Invalid phone number format");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://167.99.228.40:5000/api/bookings/verify-otp",
        {
          contactNumber: formattedNumber, // Verify formatted number
          otp,
          token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
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
    <MainHeader/>
    <div className="flex items-center justify-center min-h-screen bg-white  pt-20  ">
    <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-2xl mb-20 text-black -mt-20">

  <h1 className="text-3xl font-bold text-center pb-10">INSPECTION BOOKING</h1>

  <form onSubmit={formik.handleSubmit} className="space-y-6">
    <h2 className="text-xl font-bold text-left mb-4">Book Your Slot Now</h2>

    {/* Row 1 */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="flex flex-col">
    
  <motion.div 
    key="name" 
    className="relative group" 
    whileHover={{ scale: 1.05 }}
  >
  <label 
      htmlFor="name" 
      className="absolute -top-2 left-3 bg-gray-200 px-2 text-xs font-semibold text-black"
    >
      Name:
    </label>
    
    <input
      id="name"
      type="text"
      name="name"
      value={formik.values.name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className={`w-full px-4 py-3 rounded-lg text-black bg-transparent border border-gray-500 ${
        formik.touched.name && formik.errors.name 
          ? "border-red-500 focus:ring-red-600" 
          : "focus:ring-blue-500"
      } focus:border-sky-400 outline-none shadow-lg transition-all duration-300`}
    />
    {formik.touched.name && formik.errors.name && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
    )}
  </motion.div>
</div>


<div className="flex flex-col">
  <motion.div 
    key="contactNumber" 
    className="relative group" 
    whileHover={{ scale: 1.05 }}
  >
    <label 
      htmlFor="contactNumber" 
      className="absolute -top-2 left-3 bg-gray-200 px-2 text-xs font-semibold text-black"
    >
      Contact Number:
    </label>
    <div className="flex">
      <input
        id="contactNumber"
        type="tel"
        name="contactNumber"
        value={formik.values.contactNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`flex-1 px-4 py-3 rounded-lg text-black bg-transparent border border-gray-500 ${
          formik.touched.contactNumber && formik.errors.contactNumber 
            ? "border-red-500 focus:ring-red-600" 
            : "focus:ring-blue-500"
        } focus:border-sky-400 outline-none shadow-lg transition-all duration-300`}
      />
      <button
        onClick={handleSendOtp}
        disabled={otpSent || !formik.values.contactNumber}
        type="button"
        className="ml-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
      >
        Verify
      </button>
    </div>
    {formik.touched.contactNumber && formik.errors.contactNumber && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.contactNumber}</div>
    )}
  </motion.div>
</div>

    </div>

    {/* Row 2 */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {otpSent && !otpVerified && (
    <motion.div
      key="otp"
      className="relative group w-full"
      whileHover={{ scale: 1.05 }}
    >
      <label
        htmlFor="otp"
        className="absolute -top-2 left-3 bg-gray-200 px-2 text-xs font-semibold text-black"
      >
        OTP:
      </label>
      <div className="flex flex-col sm:flex-row w-full gap-3">
        <input
          id="otp"
          type="text"
          value={otp}
          onChange={handleOtpChange}
          required
          className={`flex-1 px-4 py-3 rounded-lg text-black bg-transparent border border-gray-500 ${
            otp && otp.length !== 6
              ? "border-red-500 focus:ring-red-600"
              : "focus:ring-blue-500"
          } focus:border-sky-400 outline-none shadow-lg transition-all duration-300 w-full sm:w-auto`}
        />
        <button
          onClick={handleVerifyOtp}
          type="button"
          disabled={otp.length !== 6}
          className="px-4 py-2 rounded-lg bg-blue-500 text-black hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 w-full sm:w-auto"
        >
          Send
        </button>
      </div>
    </motion.div>
  )}


      <div className="flex flex-col">
  <motion.div 
    key="email" 
    className="relative group" 
    whileHover={{ scale: 1.05 }}
  >
    <label 
      htmlFor="email" 
      className="absolute -top-2 left-3 bg-gray-200 px-2 text-xs font-semibold text-black"
    >
      Email:
    </label>
    <input
      id="email"
      type="email"
      name="email"
      value={formik.values.email}
      onChange={formik.handleChange}
      onBlur={() => {
        formik.handleBlur("email");
      }}
      className={`w-full px-4 py-3 rounded-lg text-black bg-transparent border border-gray-500 ${
        emailValid === false && !isChecking 
          ? "border-red-500 focus:ring-red-600" 
          : "focus:ring-blue-500"
      } focus:border-sky-400 outline-none shadow-lg transition-all duration-300`}
    />
    {formik.touched.email && formik.errors.email && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
    )}
  </motion.div>
</div>

    </div>

    {/* Row 3 */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="flex flex-col">
  <motion.div 
    key="address" 
    className="relative group" 
    whileHover={{ scale: 1.05 }}
  >
    <label 
      htmlFor="address" 
      className="absolute -top-2 left-3 bg-gray-200 px-2 text-xs font-semibold text-black"
    >
      Address:
    </label>
    <input
      id="address"
      type="text"
      name="address"
      value={formik.values.address}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className={`px-4 py-3 rounded-lg text-black border border-gray-500 ${
        formik.touched.address && formik.errors.address
          ? "border-red-500 focus:ring-red-600"
          : "focus:ring-blue-500"
      } focus:border-sky-400 outline-none shadow-lg transition-all duration-300 hover:border-blue-500`}
    />
    {formik.touched.address && formik.errors.address && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.address}</div>
    )}
  </motion.div>
</div>

    </div>

    {/* Row for Date & Time */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="flex flex-col md:w-full">
  <motion.div 
    key="date" 
    className="relative group" 
    whileHover={{ scale: 1.05 }}
  >
    <label 
      htmlFor="date" 
      className="absolute -top-2 left-3 bg-gray-200 px-2 text-xs font-semibold text-black"
    >
      Date:
    </label>
    <Flatpickr
      id="date"
      name="date"
      value={formik.values.date}
      options={{
        minDate: "today", // Disable past dates
        dateFormat: "Y-m-d", // Ensure format is YYYY-MM-DD
      }}
      onChange={(selectedDates) => {
        const selectedDate = selectedDates[0]; // Flatpickr returns an array of selected dates
        const formattedDate = selectedDate.toLocaleDateString("en-CA"); // Localized date format (YYYY-MM-DD)

        formik.setFieldValue("date", formattedDate); // Set Formik value
        handleDateChange(selectedDate); // Call the handler with the selected date
      }}
      className={`px-4 py-3 rounded-lg text-black bg-transparent border border-gray-500 ${
        formik.values.date ? "bg-white text-black" : "" // Conditionally change background to white when date is selected
      } ${
        formik.touched.date && formik.errors.date
          ? "border-red-500 focus:ring-red-600"
          : "focus:ring-blue-500"
      } focus:border-sky-400 outline-none shadow-lg transition-all duration-300`}
    />
  </motion.div>
</div>


  
  {/* Make Time selection span both columns */}
  <div className="flex flex-col md:col-span-2">
  <motion.div 
    key="time" 
    className="relative group" 
    whileHover={{ scale: 1.05 }}
  >
    <label 
      htmlFor="time" 
      className="absolute -top-2 left-3 bg-gray-200 px-2 text-xs font-semibold text-black"
    >
      Time:
    </label>
    <Select
      id="time"
      name="time"
      options={availableTimeOptions}
      value={availableTimeOptions.find((option) => option.value === formik.values.time) || null}
      onChange={(option) => formik.setFieldValue("time", option.value)}
      isOptionDisabled={(option) => option.isDisabled}
      placeholder="Select a time"
      classNamePrefix="time-slot"
      className="text-black w-full"
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: "transparent", 
          borderColor: "transparent",
          color: "white",
          padding: "0.5rem", // Added padding for consistency
        }),
        singleValue: (base) => ({
          ...base,
          color: "white", // Ensure selected text is visible
        }),
        menu: (base, state) => ({
          ...base,
          backgroundColor: state.selectProps.menuIsOpen
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "rgb(255, 255, 255)" // Dark mode: slate-950/80
              : "#ffffff" // Light mode: indigo-800
            : "transparent",
          borderRadius: "8px",
          padding: "4px",
          boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)", // Tailwind shadow-lg
        }),
        menuList: (base) => ({
          ...base,
          backgroundColor: window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "rgba(255, 255, 255, 0.64)" // Dark mode: slate-950/80
            : "#3730a3", // Light mode: indigo-800
          borderRadius: "8px",
          color: "white",
        }),
        option: (base, { isFocused, isSelected }) => ({
          ...base,
          backgroundColor: isSelected
            ? "rgba(34, 197, 94, 0.7)" // Green when selected
            : isFocused
            ? "rgba(0, 255, 255, 0.2)" // Cyan hover effect
            : "transparent",
          color: isSelected ? "black" : "white",
          borderRadius: "6px",
          padding: "10px",
          transition: "background-color 0.2s ease-in-out",
        }),
      }}
      getOptionLabel={(option) => (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          whileHover={{
            scale: !option.isBooked && !option.isDisabled ? 1 : 1,
            textShadow: !option.isBooked && !option.isDisabled
              ? "none"
              : "none",
            y: !option.isBooked && !option.isDisabled ? -1 : 0,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          style={{
            color: option.isBooked ? "red" : option.isDisabled ? "gray" : "green",
            fontWeight: option.isBooked || option.isDisabled ? "bold" : "italic",
            border: !option.isBooked && !option.isDisabled ? "2px solid green" : "none",
            borderRadius: "8px",
            padding: "0.5rem 0.5rem",
            cursor: !option.isBooked && !option.isDisabled ? "pointer" : "default",
          }}
        >
          {option.label}
        </motion.div>
      )}
    />
  </motion.div>
</div>





</div>


    {/* Submit Button */}
    <div className="flex justify-end">
      {otpVerified && !isBooked && (
        <button
          type="submit"
          disabled={!otpVerified}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Book Now
          <img src={Arrow} alt="Arrow Icon" className="w-5 h-5" />
        </button>
      )}
    </div>
  </form>
</div>
     
  
  </div>
  <FooterOne/>
  
  
  </div>
  );
};

export default UserForm;
