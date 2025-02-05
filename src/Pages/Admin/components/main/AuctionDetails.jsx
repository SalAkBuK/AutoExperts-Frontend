import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import cars from '../../assets/img/Auto Experts/car6.jpg';
import car1 from '../../assets/img/Auto Experts/car1.jpg';
import car2 from '../../assets/img/Auto Experts/cars.jpg';
import Main from './Main';



function AuctionDetails() {
  // Example dummy data
  const dummyCars = [
    {
      id: 1,
      title: 'Toyota Supra 2021',
      Overview: 'A classic reborn with powerful performance and cutting-edge technology.',
      Description: 'The 2021 Toyota Supra combines heritage styling with modern performance...',
      SelectedFeatures: 'Sport-tuned suspension, Adaptive cruise control, Premium sound system',
      Body: 'Coupe',
      FuelType: 'Gasoline',
      Condition: 'Used',
      EngineSize: '3.0L Turbocharged Inline-6',
      Door: 2,
      model: 'GR Supra 3.0 Premium',
      mileage: '5,000 miles',
      initialBid: 30000,
      highestBid: 50000,
      price: 55000,
      auctionEndTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      images: [
        cars,
       car1,
       car2,
      ],
      pdfUrl: 'https://example.com/pdfs/toyota-supra-details.pdf'
    }
  ];

  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCar = () => {
      // Attempt to parse carId; fall back to the first car if undefined
      const selectedCar = dummyCars.find((c) => c.id === parseInt(carId)) || dummyCars[0];
      setCar(selectedCar);
    };
    fetchCar();
  }, [carId]);

  if (!car) return <div>Loading...</div>;

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? car.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === car.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const openImageModal = () => setIsModalOpen(true);
  const closeImageModal = () => setIsModalOpen(false);

  return (

    <div>
      <Main/>
    
    <div className="w-full max-w-5xl bg-[#0b213e] p-10 gap-10 rounded-xl shadow-lg text-white ml-2 mt-2 mb-10">
      <h2 className="text-2xl font-semibold mb-6">{car.title}</h2>

      {/* Image Carousel */}
      <div className="relative">
        <img
          src={car.images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          className="w-full h-auto rounded-lg cursor-pointer"
          onClick={openImageModal}
        />
        <button onClick={handlePreviousImage} className="absolute top-1/2 left-2 transform -translate-y-1/2 text-2xl text-white bg-[#4b4cfe] rounded-full p-2 hover:bg-[#3738ff]">
          <FaArrowLeft />
        </button>
        <button onClick={handleNextImage} className="absolute top-1/2 right-2 transform -translate-y-1/2 text-2xl text-white bg-[#4b4cfe] rounded-full p-2 hover:bg-[#3738ff]">
          <FaArrowRight />
        </button>
      </div>

      {/* Modal for full-size image */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center" onClick={closeImageModal}>
          <img src={car.images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} className="max-w-full max-h-full rounded-lg" />
        </div>
      )}

      {/* Car Details */}
      <div className="mt-6">
        <p><strong>Overview:</strong> {car.Overview}</p>
        <p><strong>Description:</strong> {car.Description}</p>
        <p><strong>Selected Features:</strong> {car.SelectedFeatures}</p>
        <p><strong>Body:</strong> {car.Body}</p>
        <p><strong>Fuel Type:</strong> {car.FuelType}</p>
        <p><strong>Condition:</strong> {car.Condition}</p>
        <p><strong>Engine Size:</strong> {car.EngineSize}</p>
        <p><strong>Door:</strong> {car.Door}</p>
        <p><strong>Model:</strong> {car.model}</p>
        <p><strong>Mileage:</strong> {car.mileage}</p>
        <p><strong>Initial Bid:</strong> ${car.initialBid}</p>
        <p><strong>Highest Bid:</strong> ${car.highestBid}</p>
        <p><strong>Price:</strong> ${car.price}</p>
        <p><strong>Auction End Time:</strong> {new Date(car.auctionEndTime).toLocaleString()}</p>

        {/* PDF Link */}
        <div className="mt-4">
          <a href={car.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-[#4b4cfe] rounded-full text-white font-semibold hover:bg-[#3738ff]">
            View Inspection Report
          </a>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AuctionDetails;
