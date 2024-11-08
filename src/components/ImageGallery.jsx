import React, { useState } from 'react';

function ImageGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0); // Track the active image index
  const [isEnlarged, setIsEnlarged] = useState(false); // Track whether the image is enlarged

  // Handle navigating to the previous image
  const handlePrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  // Handle navigating to the next image
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  // Toggle the enlarged state when clicking on the image
  const toggleEnlargement = () => {
    setIsEnlarged(!isEnlarged);
  };

  return (
    <div className="image-gallery flex flex-col items-center">
      {/* Main Image Display */}
      <div
        className={`relative ${isEnlarged ? 'w-full h-full' : 'w-3/4 h-64'} transition-all duration-300`}
        onClick={toggleEnlargement}
      >
        <img
          src={images[activeIndex]}
          alt={`Image ${activeIndex + 1}`}
          className={`object-cover w-full h-full ${isEnlarged ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
        />
        {!isEnlarged && (
          <div className="absolute top-0 left-0 flex justify-between items-center w-full h-full">
            {/* Navigation Buttons */}
            <button onClick={(e) => { e.stopPropagation(); handlePrevious(); }} className="bg-gray-700 text-white p-2 rounded-l-lg">
              ❮
            </button>
            <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="bg-gray-700 text-white p-2 rounded-r-lg">
              ❯
            </button>
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex mt-4 space-x-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`w-16 h-16 object-cover cursor-pointer border ${activeIndex === index ? 'border-blue-500' : 'border-gray-300'}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
