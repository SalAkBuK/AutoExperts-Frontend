import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Main from './Main';
import { FaFileImage, FaFilePdf } from 'react-icons/fa';

const UploadAuctionCars = () => {
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
    images: Yup.mixed().required('Images are required'),
    pdf: Yup.mixed().required('PDF is required')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    setMessage(null);

    try {
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

      console.log("FormData:", data); // For testing purposes
      setMessage('Car added successfully! (Simulated)');
      resetForm();
    } catch (error) {
      setMessage('Failed to add car');
      console.error(error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div><Main/>
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
          Door: '',
          images: null,
          pdf: null
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, values }) => (
          <Form className="bg-[#0b213e] rounded-lg p-6 shadow-lg w-full max-w-3xl mx-auto space-y-4 mt-10 mb-2">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">Upload Auction Cars</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                { label: 'Engine Size', name: 'EngineSize', type: 'text' },
                { label: 'Door', name: 'Door', type: 'number' },
              ].map((field) => (
                <div key={field.name} className="flex flex-col space-y-1">
                  <label className="text-gray-200 font-medium">{field.label}:</label>
                  <Field
                    as={field.type === 'textarea' ? 'textarea' : 'input'}
                    type={field.type}
                    name={field.name}
                    className="mt-1 p-3 border border-gray-600 bg-[#1a2a4b] text-gray-200 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-md transition-all"
                  />
                  <ErrorMessage name={field.name} component="div" className="text-red-400 text-sm mt-1" />
                </div>
              ))}

              {/* Custom Upload Images */}
              <div className="flex flex-col space-y-1">
                <label className="text-gray-200 font-medium flex items-center">
                  <FaFileImage className="mr-2 text-indigo-400" />
                  Upload Images (up to 5):
                </label>
                <div className="relative mt-1">
                  <input
                    type="file"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={(event) => setFieldValue('images', event.currentTarget.files)}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="cursor-pointer p-3 bg-indigo-600 text-white rounded-md shadow-md flex items-center justify-center transition hover:bg-indigo-700"
                  >
                    Choose Images
                  </label>
                  {values.images && values.images.length > 0 && (
                    <p className="text-gray-400 mt-2 text-sm">
                      Selected: {Array.from(values.images).map(file => file.name).join(', ')}
                    </p>
                  )}
                </div>
              </div>

              {/* Custom Upload PDF */}
              <div className="flex flex-col space-y-1">
                <label className="text-gray-200 font-medium flex items-center">
                  <FaFilePdf className="mr-2 text-indigo-400" />
                  Upload PDF:
                </label>
                <div className="relative mt-1">
                  <input
                    type="file"
                    name="pdf"
                    accept=".pdf"
                    onChange={(event) => setFieldValue('pdf', event.currentTarget.files[0])}
                    className="hidden"
                    id="pdfUpload"
                  />
                  <label
                    htmlFor="pdfUpload"
                    className="cursor-pointer p-3 bg-indigo-600 text-white rounded-md shadow-md flex items-center justify-center transition hover:bg-indigo-700"
                  >
                    Choose PDF
                  </label>
                  {values.pdf && (
                    <p className="text-gray-400 mt-2 text-sm">
                      Selected: {values.pdf.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-lg font-semibold transition duration-200 text-white
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg transform hover:scale-105 '}`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Add Car'}
            </button>

            {message && <p className="text-green-400 text-center mt-4">{message}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UploadAuctionCars;
