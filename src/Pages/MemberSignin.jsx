import React, { useState } from "react";
import { useFormik } from 'formik';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import * as Yup from 'yup';
import logo from '../assets/AdminLogin/Icon.png';

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
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
          "Password must contain at least one special character and one number"
        )
        .required("Required"),
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
        console.log("FORM DATA: ", values);
    
        // Send registration data to your server
        const res = await axios.post('http://167.99.228.40:5000/api/auth/register', values);
        const { token, sessionUrl } = res.data;
        console.log(res);
    
        // Decode the token to get the member ID
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const memberId = decodedToken.id;
    
        // Store the token in localStorage
        localStorage.setItem('token', token);
    
        // Step 1: Close the sign-up page (optional)
        window.close();  // Only works if the page was opened via JavaScript (e.g., window.open)
    
        // Step 2: Open the Stripe checkout page in a new tab
        window.open(sessionUrl, "_blank");
    
    } catch (err) {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
    
    }
  });

  return (
    <div className="flex dark:bg-[#0C0C1D]">
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

      <div className="flex w-full lg:w-1/3 justify-top items-top bg-white mx-10 lg:mx-20 mt-10 mb-10 lg:my-5 shadow-lg rounded-r-3xl">
        <div className="w-full max-w-md p-8 sm:p-10 md:py-10">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div className="form-group">
              <label className="block text-gray-700"><strong>Full Name</strong></label>
              <div className="flex items-center border-b-2 border-gray-300 py-2">
                <input
                  type="text"
                  name="name"
                  className="form-control w-full border-none focus:outline-none focus:ring-0"
                  placeholder="Full Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.name && formik.errors.name && <div className="text-red-600 text-md mt-1">{formik.errors.name}</div>}
            </div>

            <div className="form-group">
  <label className="block text-gray-700"><strong>Email Address</strong></label>
  <div className="flex items-center border-b-2 border-gray-300 py-2">
  <input
            type="email"
            name="email"
            className="form-control w-full border-none focus:outline-none focus:ring-0"
            placeholder="Enter Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={async (e) => {
              formik.handleBlur(e); // Trigger formik's built-in blur handling
             
            }}
          />
        </div>

        {/* Email Validation Error from Formik */}
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-600 text-md mt-1">{formik.errors.email}</div>
        )}

        {/* Custom Email Error for Invalid Email */}
        {error && <div className="text-red-600 text-md mt-1">{error}</div>}
</div>


            <div className="form-group">
              <label className="block text-gray-700"><strong>Password</strong></label>
              <div className="flex items-center border-b-2 border-gray-300 py-2">
                <input
                  type="password"
                  name="password"
                  className="form-control w-full border-none focus:outline-none focus:ring-0"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.password && formik.errors.password && <div className="text-red-600 text-md mt-1">{formik.errors.password}</div>}
            </div>

            <div className="form-group">
              <label className="block text-gray-700"><strong>Confirm Password</strong></label>
              <div className="flex items-center border-b-2 border-gray-300 py-2">
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control w-full border-none focus:outline-none focus:ring-0"
                  placeholder="Confirm Password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className="text-red-600 text-md mt-1">{formik.errors.confirmPassword}</div>}
            </div>

            <div className="form-group">
              <label className="block text-gray-700"><strong>City</strong></label>
              <div className="flex items-center border-b-2 border-gray-300 py-2">
                <input
                  type="text"
                  name="city"
                  className="form-control w-full border-none focus:outline-none focus:ring-0"
                  placeholder="City"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.city && formik.errors.city && <div className="text-red-600 text-md mt-1">{formik.errors.city}</div>}
            </div>

            <div className="form-group">
              <label className="block text-gray-700"><strong>Address</strong></label>
              <div className="flex items-center border-b-2 border-gray-300 py-2">
                <input
                  type="text"
                  name="address"
                  className="form-control w-full border-none focus:outline-none focus:ring-0"
                  placeholder="Address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.address && formik.errors.address && <div className="text-red-600 text-md mt-1">{formik.errors.address}</div>}
            </div>

            <div className="form-group">
              <label className="block text-gray-700"><strong>CNIC</strong></label>
              <div className="flex items-center border-b-2 border-gray-300 py-2">
                <input
                  type="text"
                  name="cnic"
                  className="form-control w-full border-none focus:outline-none focus:ring-0"
                  placeholder="CNIC"
                  value={formik.values.cnic}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.cnic && formik.errors.cnic && <div className="text-red-600 text-md mt-1">{formik.errors.cnic}</div>}
            </div>

            <div className="form-group">
              <label className="block text-gray-700"><strong>Phone Number</strong></label>
              <div className="flex items-center border-b-2 border-gray-300 py-2">
                <input
                  type="text"
                  name="number"
                  className="form-control w-full border-none focus:outline-none focus:ring-0"
                  placeholder="Phone Number"
                  value={formik.values.number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.number && formik.errors.number && <div className="text-red-600 text-md mt-1">{formik.errors.number}</div>}
            </div>

            <div className="form-group">
              <label className="block text-gray-700"><strong>Date of Birth</strong></label>
              <div className="flex items-center border-b-2 border-gray-300 py-2">
                <input
                  type="date"
                  name="dateOfBirth"
                  className="form-control w-full border-none focus:outline-none focus:ring-0"
                  value={formik.values.dateOfBirth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth && <div className="text-red-600 text-md mt-1">{formik.errors.dateOfBirth}</div>}
            </div>

            {error && <div className="text-red-600 text-md mt-1">{error}</div>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 mt-6 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account? <Link to="/member-login" className="text-blue-600">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberSignin;
