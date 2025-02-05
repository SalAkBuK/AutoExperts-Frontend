import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddCarForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    carDetails: Yup.string().required('Car details are required'),
    auctionEndTime: Yup.string().required('Auction end time is required'),
    initialBid: Yup.number().min(0, 'Initial bid must be 0 or greater').required('Initial bid is required'),
    title: Yup.string().required('Title is required'),
    model: Yup.string().required('Model is required'),
    mileage: Yup.number().min(0, 'Mileage must be 0 or greater').required('Mileage is required'),
    Overview: Yup.string().required('Overview is required'),
    Description: Yup.string().required('Description is required'),
    SelectedFeatures: Yup.string().required('Selected features are required'),
    Body: Yup.string().required('Body is required'),
    FuelType: Yup.string().required('Fuel type is required'),
    Condition: Yup.string().required('Condition is required'),
    EngineSize: Yup.string().required('Engine size is required'),
    Door: Yup.number().min(1, 'Door must be at least 1').required('Number of doors is required'),
    Color: Yup.string().required('Color is required'),
    images: Yup.mixed().required('Images are required'),
    pdf: Yup.mixed().required('PDF is required')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("FormData:  ", FormData)
    const data = new FormData();
    for (const key in values) {
      if (key === 'images') {
        Array.from(values.images).forEach((image) => data.append('images', image));
      } else if (key === 'pdf') {
        data.append('pdf', values.pdf);
      } else {
        data.append(key, values[key]);
      }
    }

    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('User not authenticated');
        return;
      }
        console.log("DATA:", data)
      const response = await axios.post('http://167.99.228.40:5000/api/cars', data, {
        headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}` }
      });
      console.log("RESPONSE: ", response)
      setMessage('Car added successfully!');
      resetForm();
      console.log(response.data);
    } catch (error) {
      setMessage('Failed to add car');
      console.error(error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        carDetails: '',
        auctionEndTime: '',
        initialBid: '',
        title: '',
        model: '',
        mileage: '',
        Overview: '',
        Description: '',
        SelectedFeatures: '',
        Body: '',
        FuelType: '',
        Condition: '',
        EngineSize: '',
        Color: '',
        Door: '',
        OwnerEmail: '',
        images: null,
        pdf: null
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
               <Form className="bg-white rounded-lg p-6 shadow-lg w-full max-w-2xl mx-auto space-y-4">
               <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add a New Car</h2>
     
               {[
                 { label: 'Car Details', name: 'carDetails', type: 'text' },
                 { label: 'Auction End Time', name: 'auctionEndTime', type: 'datetime-local' },
                 { label: 'Initial Bid', name: 'initialBid', type: 'number' },
                 { label: 'Title', name: 'title', type: 'text' },
                 { label: 'Model', name: 'model', type: 'text' },
                 { label: 'Mileage', name: 'mileage', type: 'number' },
                 { label: 'Overview', name: 'Overview', type: 'textarea' },
                 { label: 'Description', name: 'Description', type: 'textarea' },
                 { label: 'Selected Features', name: 'SelectedFeatures', type: 'text' },
                 { label: 'Body', name: 'Body', type: 'text' },
                 { label: 'Fuel Type', name: 'FuelType', type: 'text' },
                 { label: 'Condition', name: 'Condition', type: 'text' },
                 {label: 'Color', name: 'Color', type: 'text'},
                 { label: 'Engine Size', name: 'EngineSize', type: 'text' },
                 { label: 'Door', name: 'Door', type: 'number' },
                 { label: 'Owner Email', name: 'OwnerEmail', type: 'text' },
               ].map((field) => (
                 <div key={field.name} className="flex flex-col">
                   <label className="text-gray-600 font-medium">{field.label}:</label>
                   <Field
                     as={field.type === 'textarea' ? 'textarea' : 'input'}
                     type={field.type}
                     name={field.name}
                     className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                   />
                   <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm mt-1" />
                 </div>
               ))}
     
               <div className="flex flex-col">
                 <label className="text-gray-600 font-medium">Upload Images (up to 5):</label>
                 <input
                   type="file"
                   name="images"
                   multiple
                   accept="image/*"
                   onChange={(event) => setFieldValue('images', event.currentTarget.files)}
                   className="mt-1"
                 />
                 <ErrorMessage name="images" component="div" className="text-red-500 text-sm mt-1" />
               </div>
     
               <div className="flex flex-col">
                 <label className="text-gray-600 font-medium">Upload PDF:</label>
                 <input
                   type="file"
                   name="pdf"
                   accept=".pdf"
                   onChange={(event) => setFieldValue('pdf', event.currentTarget.files[0])}
                   className="mt-1"
                 />
                 <ErrorMessage name="pdf" component="div" className="text-red-500 text-sm mt-1" />
               </div>
     
               <button
                 type="submit"
                 className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition duration-200 
                   ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                 disabled={loading}
               >
                 {loading ? 'Submitting...' : 'Add Car'}
               </button>
     
               {message && <p className="text-green-500 text-center mt-4">{message}</p>}
             </Form>
      )}
    </Formik>
  );
};

export default AddCarForm;
