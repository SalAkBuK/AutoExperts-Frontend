import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, MenuItem, Select, InputLabel, FormControl, Button, Card, CardContent, Typography, Snackbar } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

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
      <h2 className="text-5xl font-bold font-inter text-gray-800 antialiased text-[#2c3e50] text-center mt-5">
  Car Price Predictor
</h2>

<div className="p-6 max-w-md mx-auto shadow-lg rounded-3xl bg-white mt-10">
  <form onSubmit={handleSubmit} className="space-y-4">
    
    {/* Brand Selection */}
    <motion.div key="brand" className="relative group" whileHover={{ scale: 1.05 }}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Brand</InputLabel>
        <Select value={selectedBrand} onChange={handleBrandChange} label="Brand">
          <MenuItem value="">Select a brand</MenuItem>
          {brands.map((brand, index) => (
            <MenuItem key={index} value={brand}>{brand.toUpperCase()}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </motion.div>

    {/* Model Selection */}
    <motion.div key="model" className="relative group" whileHover={{ scale: 1.05 }}>
      <FormControl fullWidth margin="normal">
      <InputLabel sx={{ color: "gray" }}>Model</InputLabel>  
      <Select
          name="model"
          value={formData.model}
          onChange={handleChange}
          label="Model"
          disabled={!selectedBrand}
        >
          <MenuItem value="">Select a model</MenuItem>
          {models.map((model, index) => {
            const displayModel = model.split(" ").slice(1).join(" ");
            return <MenuItem key={index} value={model}>{displayModel.toUpperCase()}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </motion.div>

    {/* Engine Capacity */}
    <motion.div key="engineCapacity" className="relative group" whileHover={{ scale: 1.05 }}>
    <label className="absolute -top-2 left-3 bg-gray-200 px-2 text-xs font-semibold text-black z-10 pointer-events-none">
  Engine Capacity:
</label>

      <TextField
        name="engineCapacity"
        value={formData.engineCapacity}
        onChange={handleChange}
        fullWidth
        placeholder="e.g., 1300"
        InputProps={{ readOnly: isEngineCapacityAutofilled }}
        className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:ring-blue-200 focus:border-blue-400 outline-none shadow-lg transition-all duration-300"
      />
    </motion.div>

    {/* Mileage */}
    <motion.div key="mileage" className="relative group" whileHover={{ scale: 1.05 }}>
    <label className="absolute -top-2 left-3 bg-gray-200 px-2 text-xs font-semibold text-black z-10 pointer-events-none">
  Mileage (km):
</label>

      <TextField
        name="mileage"
        value={formData.mileage}
        onChange={handleChange}
        fullWidth
        placeholder="e.g., 50000"
        type="number"
        className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-400 outline-none shadow-lg transition-all duration-300"
      />
    </motion.div>

    {/* Year */}
    <motion.div key="year" className="relative group" whileHover={{ scale: 1.05 }}>
    <label className="absolute -top-2 left-3 bg-gray-200 px-2 text-xs font-semibold text-black z-10 pointer-events-none">
  Year:
</label>

      <TextField
        name="year"
        value={formData.year}
        onChange={handleChange}
        fullWidth
        placeholder="e.g., 2020"
        type="number"
        className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-400 outline-none shadow-lg transition-all duration-300"
      />
    </motion.div>

    {/* Submit Button */}
    <motion.div whileHover={{ scale: 1.05 }}>
  <Button
    type="submit"
    variant="contained"
    fullWidth
    sx={{
      marginTop: 2,
      backgroundColor: "#2563eb", // Blue primary color (like signup button)
      "&:hover": { backgroundColor: "#1e40af" }, // Darker blue on hover
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
      borderRadius: "8px", // Rounded corners
      textTransform: "none", // Prevents uppercase text
    }}
    className="py-3 rounded-lg text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
  >
    Calculate
  </Button>
</motion.div>


  </form>

  {/* Prediction Result */}
  {predictionResult && (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card sx={{ marginTop: 4, backgroundColor: "#ffffff", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
        <CardContent>
          <Typography variant="h6" component="div" color="#2c3e50" textAlign="center">
            Prediction Result
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Estimated Price: {predictionResult.estimated_price} Lacs
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  )}

  {/* Snackbar for Success/Error Messages */}
  <Snackbar
    open={openSnackbar}
    autoHideDuration={6000}
    onClose={() => setOpenSnackbar(false)}
    message={snackbarMessage}
    sx={{
      "& .MuiSnackbarContent-root": {
        backgroundColor: "#388e3c",
        color: "#ffffff",
      },
    }}
  />
</div>
    <FooterOne/>
    </div>
  );
}

export default Predictor;
