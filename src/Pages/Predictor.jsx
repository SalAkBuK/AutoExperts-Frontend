import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, MenuItem, Select, InputLabel, FormControl, Button, Card, CardContent, Typography, Snackbar } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuctionHeader from '../components/AuctionHeader';
import FooterOne from '../components/FooterOne';

function Predictor() {
  const [carData, setCarData] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [formData, setFormData] = useState({
    model: "",
    engineCapacity: "",
    mileage: "",
    year: "",
  });
  const [isEngineCapacityAutofilled, setIsEngineCapacityAutofilled] = useState(false); // Track if the field is autofilled

  const [predictionResult, setPredictionResult] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetch("http://167.99.228.40:8000/get_name_names")
      .then((res) => res.json())
      .then((data) => {
        setCarData(data.name);
        const uniqueBrands = [...new Set(data.name.map((item) => item.split(" ")[0]))];
        setBrands(uniqueBrands);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    setModels(carData.filter((item) => item.startsWith(brand)));
    setFormData({ model: "", engineCapacity: "", mileage: "", year: "" });
    setIsEngineCapacityAutofilled(false); // Reset autofilled flag when brand changes
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    if (name === "model") {
      const match = value.match(/\d+\.\d+/); // Check for decimal values
      if (match) {
        updatedFormData.engineCapacity = (parseFloat(match[0]) * 1000).toString();
        setIsEngineCapacityAutofilled(true); // Mark as autofilled
      } else {
        updatedFormData.engineCapacity = ""; // Reset engine capacity if no match
        setIsEngineCapacityAutofilled(false); // Reset autofilled flag
      }
    }

    setFormData(updatedFormData);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.model || !formData.engineCapacity || !formData.mileage || !formData.year) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const { data } = await axios.post("http://167.99.228.40:8000/predict_car_price", 
        new URLSearchParams({
          name: formData.model,
          engine_capacity: formData.engineCapacity,
          mileage: formData.mileage,
          year: formData.year,
        }), 
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );
      setPredictionResult(data);
      setSnackbarMessage(`Estimated Price: ${data.estimated_price}`);
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage("Error submitting form. Please try again.");
      setOpenSnackbar(true);
    }
  };


  return (
    <div>
      <AuctionHeader/>
    
      <div className="p-4 max-w-md mx-auto bg-[#f7f7f7] shadow-lg rounded-lg m-10"> 
      <h2 className="text-xl font-bold mb-4 text-[#2c3e50]">Select Your Car</h2> 
      
      <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
  <InputLabel>Brand</InputLabel>
  <Select value={selectedBrand} onChange={handleBrandChange} label="Brand">
    <MenuItem value="">Select a brand</MenuItem>
    {brands.map((brand, index) => {
      const displayBrand = brand.toUpperCase(); // Display in uppercase
      return (
        <MenuItem key={index} value={brand}>{displayBrand}</MenuItem> // Send original value
      );
    })}
  </Select>
</FormControl>

<FormControl fullWidth margin="normal">
  <InputLabel>Model</InputLabel>
  <Select
    name="model"
    value={formData.model}
    onChange={handleChange}
    label="Model"
    disabled={!selectedBrand}
  >
    <MenuItem value="">Select a model</MenuItem>
    {models.map((model, index) => {
      // Remove the brand part of the model name (everything before the first space)
      const displayModel = model.split(" ").slice(1).join(" ");
      
      // Capitalize all letters in the model name
      return (
        <MenuItem key={index} value={model}>
          {displayModel.toUpperCase()}
        </MenuItem>
      );
    })}
  </Select>
</FormControl>


      <TextField
        label="Engine Capacity"
        name="engineCapacity"
        value={formData.engineCapacity}
        onChange={handleChange}
        fullWidth
        margin="normal"
        placeholder="e.g., 1300"
        InputProps={{
          readOnly: isEngineCapacityAutofilled, // Disable editing only if autofilled
        }}
      />

      <TextField
        label="Mileage (km)"
        name="mileage"
        value={formData.mileage}
        onChange={handleChange}
        fullWidth
        margin="normal"
        placeholder="e.g., 50000"
        type="number"
      />

      <TextField
        label="Year"
        name="year"
        value={formData.year}
        onChange={handleChange}
        fullWidth
        margin="normal"
        placeholder="e.g., 2020"
        type="number"
      />

<Button
  type="submit"
  variant="contained"
  color="primary"
  fullWidth
  sx={{
    marginTop: 2,
    backgroundColor: '#00796b', // Teal color for the button
    '&:hover': {
      backgroundColor: '#004d40', // Darker shade of teal
    },
  }}
>
  Submit
</Button>
      </form>

      {predictionResult && (
        <Card sx={{
  marginTop: 4,
  backgroundColor: '#ffffff', // White card background
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
  borderRadius: '8px',  // Smooth corners
}}>
  <CardContent>
    <Typography variant="h6" component="div" color="#2c3e50">Prediction Result</Typography> {/* Dark text */}
    <Typography variant="body2" color="textSecondary">Estimated Price: {predictionResult.estimated_price}</Typography>
  </CardContent>
</Card>
      )}

      <Snackbar
  open={openSnackbar}
  autoHideDuration={6000}
  onClose={() => setOpenSnackbar(false)}
  message={snackbarMessage}
  sx={{
    '& .MuiSnackbarContent-root': {
      backgroundColor: '#388e3c', // Green for success messages
      color: '#ffffff',
    },
  }}
/>
      
      <ToastContainer />
    </div>
    <FooterOne/>
    </div>
  );
}

export default Predictor;
