import React, { useState } from "react";
import { useFormik } from 'formik';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import * as Yup from 'yup';
import logo from '../assets/AdminLogin/Icon.png';
import { motion } from "framer-motion";

function MemberSignin() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
 
  // Verify Email Function
  
  // useFormik hook
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      number: "",
      cnic: "",
      city: "",
      address: "",
      dateOfBirth: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/])(?=.*[A-Z]).{8,}$/,
        "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character"
      )
    ,
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
        number: Yup.string()
        .matches(/^[0-9]{11}$/, 'Phone number must be 11 digits')
        .required('Phone number is required'),
      cnic: Yup.string()
        .matches(/^[0-9]{13}$/, 'CNIC must be 13 digits')
        .required('CNIC is required'),
      city: Yup.string().required("City is required"),
      address: Yup.string().required("Address is required"),
      dateOfBirth: Yup.date()
        .required("Date of Birth is required")
    }),
    onSubmit: async (values) => {
      console.log("Sign up function triggered");
      
      try {
        const res = await axios.post(
          'http://167.99.228.40:5000/api/auth/register',
          JSON.stringify(values),  // Ensure it's sent as raw JSON
          {
            headers: {
              'Content-Type': 'application/json',  // Explicitly tell server it's JSON
            }
          }
        );
      
        const { token, sessionUrl } = res.data;
        console.log("Response:", res);
      
        // Decode JWT token safely
        try {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          const memberId = decodedToken?.id || null;
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      
        localStorage.setItem('token', token);
      
        // Redirect to Stripe checkout
        window.location.href = sessionUrl;
      
      } catch (err) {
        console.error("Registration Error:", err.response?.data);
      
        // Extract and display error message
        const errorMessage = err.response?.data?.msg || 'Registration failed. Please try again.';
        setError(errorMessage);  // Assuming `setError` updates a state variable for displaying errors
      }
      
      
    
    }
  });

  return (
    <div className="flex dark:bg-[#0C0C1D] min-h-screen">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 dark:bg-[#0C0C1D] items-center justify-center">
        <div className="text-center">
          <Link to="/" className="block">
            <img src={logo} alt="AutoExperts Auctions" className="w-3/3 h-auto mb-20" />
          </Link>
          <div className="flex justify-between mt-8 text-white text-lg">
            <Link to="/" className="mx-4 hover:underline">Terms of Use</Link>
            <Link to="/" className="mx-4 hover:underline">Privacy</Link>
            <Link to="/" className="mx-4 hover:underline">Help</Link>
            <Link to="/" className="mx-4 hover:underline">Cookie Preference</Link>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full lg:w-1/3 bg-white mx-10 lg:mx-20 mt-10 mb-10 lg:my-5 shadow-lg rounded-r-3xl p-8 sm:p-10">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {[
              { name: "name", label: "Full Name", type: "text" },
              { name: "email", label: "Email Address", type: "email" },
              { name: "password", label: "Password", type: "password" },
              { name: "confirmPassword", label: "Confirm Password", type: "password" },
              { name: "city", label: "City", type: "text" },
              { name: "address", label: "Address", type: "text" },
              { name: "cnic", label: "CNIC", type: "text" },
              { name: "number", label: "Phone Number", type: "text" },
              { name: "dateOfBirth", label: "Date of Birth", type: "date" },
            ].map((field) => (
              <motion.div key={field.name} className="relative group" whileHover={{ scale: 1.05 }}>
                <label
                  htmlFor={field.name}
                  className="absolute -top-2 left-3 bg-gray-200 px-2 text-xs font-semibold text-gray-700"
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-3 rounded-lg text-black bg-transparent border border-gray-500 shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 ${
                    formik.touched[field.name] && formik.errors[field.name]
                      ? "border-red-500 focus:ring-red-600"
                      : "focus:ring-blue-500"
                  }`}
                />
                {formik.touched[field.name] && formik.errors[field.name] && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors[field.name]}</div>
                )}
              </motion.div>
            ))}

            {error && <div className="text-red-600 text-md mt-1">{error}</div>}

            <motion.div whileHover={{ scale: 1.05 }}>
  <button
    type="submit"
    className="w-full bg-[#2563eb] text-white py-3 mt-6 rounded-lg font-semibold transition-all duration-300 shadow-md hover:bg-[#1e40af] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
  >
    Sign Up
  </button>
</motion.div>

          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account? <Link to="/member-login" className="text-blue-600 hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberSignin;
