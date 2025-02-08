import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Navigate, useNavigate, Link } from "react-router-dom";
import axios from 'axios'; // Import axios for making HTTP requests
import * as Yup from 'yup';
import logo from '../assets/AdminLogin/Icon.png';
import profileIcon from '../assets/AdminLogin/Profile.svg';
import Email from '../assets/AdminLogin/email.svg';
import lockIcon from '../assets/AdminLogin/Lock.svg';
import { motion } from "framer-motion";


// npm install formik yup axios 

function MemberLogin() {
 
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const res = await axios.post('http://167.99.228.40:5000/api/auth/login', {
        email: values.email,
        password: values.password,
      });

      console.log("Login successful", res);
      
      const { token } = res.data;
     

      // Decode the token to get the member ID
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const memberId = decodedToken.id;
        console.log("Memberid:", memberId )
      // Store the token
      localStorage.setItem('token', token);

      // Redirect to DisplayAllCars with the memberId
      navigate('/auction-platform', { state: { memberId } });
      //navigate('/member-platform', { state: { memberId } });
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      // Handle login error (show error message to user, etc.)
    }
  };

  return (
    <div className="flex h-screen dark:bg-[#0C0C1D]">
  {/* Left Section: Logo & Links */}
  <div className="hidden lg:flex w-1/2 dark:bg-[#0C0C1D] items-center justify-center">
    <div className="text-center">
      <img src={logo} alt="AutoExperts Auctions" className="w-3/3 h-auto mb-20" />
      <div className="flex justify-between mt-8 text-white text-lg">
        <Link to="/" className="mx-4 hover:underline">Terms of Use</Link>
        <Link to="/" className="mx-4 hover:underline">Privacy</Link>
        <Link to="/" className="mx-4 hover:underline">Help</Link>
        <Link to="/" className="mx-4 hover:underline">Cookie Preference</Link>
      </div>
    </div>
  </div>

  {/* Right Section: Login Form */}
  <div className="flex w-full lg:w-1/3 justify-center items-center bg-white mx-10 lg:mx-20 mt-10 mb-10 lg:my-20 shadow-lg rounded-r-3xl">
    <div className="w-full max-w-md p-8 sm:p-10 md:py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Member Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid email address").required("Required"),
          password: Yup.string()
            .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/, 
              "Password must contain at least one special character and one number")
            .required("Required"),
        })}
        onSubmit={handleLogin}
      >
        <Form className="space-y-6">
          {/* Email Input */}
          <motion.div key="email" className="relative group" whileHover={{ scale: 1.05 }}>
            <label 
              htmlFor="email" 
              className="absolute -top-2 left-3 bg-gray-200 px-2 text-xs font-semibold text-black"
            >
              Email:
            </label>
            <Field
              id="email"
              type="email"
              name="email"
              className={`w-full px-4 py-3 rounded-lg text-black bg-transparent border border-gray-500 
                focus:border-orange-400 focus:ring-2 focus:ring-orange-400 outline-none shadow-lg 
                transition-all duration-300`}
              placeholder="Enter Email"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </motion.div>

          {/* Password Input */}
          <motion.div key="password" className="relative group" whileHover={{ scale: 1.05 }}>
            <label 
              htmlFor="password" 
              className="absolute -top-2 left-3 bg-gray-200 px-2 text-xs font-semibold text-black"
            >
              Password:
            </label>
            <Field
              id="password"
              type="password"
              name="password"
              className={`w-full px-4 py-3 rounded-lg text-black bg-transparent border border-gray-500 
                focus:border-orange-400 focus:ring-2 focus:ring-orange-400 outline-none shadow-lg 
                transition-all duration-300`}
              placeholder="Enter Password"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
          </motion.div>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.05 }}>
  <button 
    type="submit" 
    className="w-full bg-blue-600 text-white py-3 mt-6 rounded-lg font-semibold transition-all duration-300 shadow-md 
              hover:bg-blue-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    Log In
  </button>
</motion.div>


        </Form>
      </Formik>

      {/* Forgot Password Link */}
      <div className="text-center mt-4">
        <Link to="/forgot-password" className="text-orange-500 hover:underline">
          Forgot Password?
        </Link>
      </div>
    </div>
  </div>
</div>


  
  );
}

export default MemberLogin;