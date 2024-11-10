import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Navigate, useNavigate, Link } from "react-router-dom";
import axios from 'axios'; // Import axios for making HTTP requests
import * as Yup from 'yup';
import logo from '../assets/AdminLogin/Icon.png';
import profileIcon from '../assets/AdminLogin/Profile.svg';
import Email from '../assets/AdminLogin/email.svg';
import lockIcon from '../assets/AdminLogin/Lock.svg';


// npm install formik yup axios 

function MemberLogin() {

  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
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
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      // Handle login error (show error message to user, etc.)
    }
  };

  return (
    <div className="flex h-screen dark:bg-[#0C0C1D]">
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

    <div className="flex w-full lg:w-1/3 justify-center items-center bg-white mx-10 lg:mx-20 mt-10 mb-10 lg:my-20  shadow-lg rounded-r-3xl">
      <div className="w-full max-w-md p-8 sm:p-6 md:py-4">
        <h2 className="text-2xl font-bold text-center mb-6">Member Login</h2>
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Required"),
        password: Yup.string()
          .matches(
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
            "Password must contain at least one special character and one number"
          )
          .required("Required"),
      })}
      onSubmit={handleLogin}
    >
     <Form className="space-y-6 ">
             

              <div className="form-group">
                <label className="block text-gray-700">Email Address</label>
                <div className="flex items-center border-b-2 border-gray-300 py-2">
                  <img src={Email} alt="Profile Icon" className="w-6 h-6 mr-3" />
                  <Field
                    type="email"
                    name="email"
                    className="form-control w-full border-none focus:outline-none focus:ring-0"
                    placeholder="Enter Email"
                  />
                </div>
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="form-group">
                <label className="block text-gray-700">Password</label>
                <div className="flex items-center border-b-2 border-gray-300 py-2">
                  <img src={lockIcon} alt="Lock Icon" className="w-6 h-6 mr-3" />
                  <Field
                    type="password"
                    name="password"
                    className="form-control w-full border-none focus:outline-none focus:ring-0"
                    placeholder="Password"
                  />
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button type="submit" className="w-full bg-orange-400 text-white py-2 rounded-lg hover:bg-orange-600" >
                Log In
              </button>
            </Form>
          </Formik>
          <div className="text-center mt-4">
            <a href="/forgot-password" className="text-orange-500 hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberLogin;