import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios for making HTTP requests
import * as Yup from 'yup';


// npm install formik yup axios 

function Login() {

  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(`http://localhost:5000/admin/login`, {
        Adminid: values.Adminid,
        email: values.email,
        password: values.password,
      });

      console.log("Login successful");
      console.log("Response:", response.data);

      // Store the token in local storage
    localStorage.setItem('token', response.data.token);

      // Redirect to the admin page if login is successful
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.response.data);
      // Handle login error (show error message to user, etc.)
    }
  };

  return (
    <Formik
      initialValues={{
        Adminid: "",
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        Adminid: Yup.string().required("Required"),
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
      <Form>
        <div className="form-group">
          <label>Admin Id</label>
          <Field
            type="text"
            name="Adminid"
            className="form-control"
            placeholder="Enter Admin ID"
          />
          <ErrorMessage name="Adminid" component="div" className="error" />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <Field
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter Email"
          />
          <ErrorMessage name="email" component="div" className="error" />
        </div>

        <div className="form-group">
          <label>Password</label>
          <Field
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
          />
          <ErrorMessage name="password" component="div" className="error" />
        </div>

        <button type="submit">Log In</button>
      </Form>
    </Formik>
  );
}

export default Login;
