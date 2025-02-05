// src/components/CarFilter.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CarFilter = ({ cars, onFilter }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000); // Default max price
  const [maxMileage, setMaxMileage] = useState(200000); // Default max mileage
  const [selectedModels, setSelectedModels] = useState([]);
  const [models, setModels] = useState([]); // To store unique car models
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state

  useEffect(() => {
    // Extract unique models for checkboxes
    const uniqueModels = [...new Set(cars.map((car) => car.model))];
    setModels(uniqueModels);
  }, [cars]);

  // Handle model checkbox change
  const handleModelChange = (model) => {
    setSelectedModels((prevSelectedModels) => {
      if (prevSelectedModels.includes(model)) {
        return prevSelectedModels.filter((selectedModel) => selectedModel !== model); // Remove model if already selected
      } else {
        return [...prevSelectedModels, model]; // Add model to the selected list
      }
    });
  };

  // Apply filter
  const applyFilter = () => {
    const filteredCars = cars.filter((car) => {
      const matchesPrice = car.price >= minPrice && car.price <= maxPrice;
      const matchesMileage = car.mileage <= maxMileage;
      const matchesModel = selectedModels.length === 0 || selectedModels.includes(car.model);
      return matchesPrice && matchesMileage && matchesModel;
    });
    onFilter(filteredCars);
  };

  return (
    <div>
      {/* Toggle Filter Button */}
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="mb-4 text-blue-600 font-semibold px-8 py-2 rounded-md border border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 ease-in-out"
      >
        {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
      </button>

      {/* Filter Section (Collapsible with smooth transition) */}
      <motion.div
        initial={{ opacity: 0, maxHeight: 0 }}
        animate={{
          opacity: isFilterOpen ? 1 : 0,
          maxHeight: isFilterOpen ? 500 : 0,
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="mb-8 p-6 border border-gray-300 rounded-lg bg-white shadow-lg overflow-visible"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Price Range */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Price Range</label>
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full bg-blue-100 rounded-md"
            />
            <input
              type="range"
              min="0"
              max="100000000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full bg-blue-100 rounded-md"
            />
            <div className="flex justify-between text-sm">
              <span>Min: PKR {minPrice}</span>
              <span>Max: PKR {maxPrice}</span>
            </div>
          </div>

          {/* Mileage */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Maximum Mileage</label>
            <input
              type="range"
 min="0"
              max="200000"
              step="1000"
              value={maxMileage}
              onChange={(e) => setMaxMileage(Number(e.target.value))}
              className="w-full bg-green-100 rounded-md"
            />
            <div className="text-sm text-right">{maxMileage} miles</div>
          </div>

          {/* Car Models Dropdown */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 text-left">
              Car Models
            </label>
            <div className="relative w-full">
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)} // Toggle dropdown visibility
                className="w-full px-4 py-2 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Select Models
                <span className="ml-2">{isDropdownOpen ? "▲" : "▼"}</span>
              </button>
              {isDropdownOpen && (
                <div
                  className="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg max-h-[300px] overflow-y-auto"
                  style={{
                    height: 'auto',  // Allow the dropdown to expand based on content
                  }}
                >
                  <div className="p-4 grid grid-cols-2 gap-4">
                    {models.map((model) => (
                      <div key={model} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={model}
                          checked={selectedModels.includes(model)}
                          onChange={() => handleModelChange(model)}
                          className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-0"
                        />
                        <label htmlFor={model} className="text-sm text-gray-700">
                          {model}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={applyFilter}
          className="mt-4 w-full bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-200 ease-in-out"
        >
          Apply Filter
        </button>
      </motion.div>
    </div>
  );
};

export default CarFilter;