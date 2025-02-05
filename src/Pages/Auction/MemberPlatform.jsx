import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TiThList, TiThLarge } from "react-icons/ti";
import { FaTag, FaGasPump, FaTachometerAlt, FaRegClock } from "react-icons/fa";
import axios from "axios";
import AuctionTimer from "../../components/AuctionTimer";
const ITEMS_PER_PAGE = 8; // Define items per page

function MemberPlatform() {
  const [cars, setCars] = useState([]); // Store API data
  const [viewType, setViewType] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state for API call
  const location = useLocation();
  const { memberId } = location.state || {}; // Retrieve memberId from state

  console.log("Received Member ID:", memberId);
  // Fetch car data from API on component mount
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("User not authenticated");
          return;
        }
        setLoading(true);
        const response = await axios.get("http://167.99.228.40:5000/api/cars", {
          Authorization: `Bearer ${token}`,
        });
        console.log("response:", response);
        const sortedCars = response.data.sort(
          (a, b) => new Date(b.auctionEndTime) - new Date(a.auctionEndTime)
        );

        setCars(sortedCars);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // Calculate pagination
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = cars.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(cars.length / ITEMS_PER_PAGE);

  // Pagination handlers
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <main className="flex-grow">
      <div className="bg-gray-50 p-8 space-y-8">
        <h1
          className="font-bold text-gray-900 mb-6 text-left sm:text-base md:text-3xl lg:text-4xl xl:text-5xl animate-fadeIn"
          style={{ fontFamily: "DM Sans", fontWeight: 700 }}
        >
          Cars Available for Auction
        </h1>

        {/* View Toggle */}
        <div className="flex justify-end mb-6">
          {/* Grid View Button */}
          <button
            onClick={() => setViewType("grid")}
            className={`mr-2 p-3 rounded-md ${
              viewType === "grid"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200"
            }`}
          >
            <TiThLarge size={24} />
          </button>
          {/* List View Button */}
          <button
            onClick={() => setViewType("list")}
            className={`p-3 rounded-md ${
              viewType === "list"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200"
            }`}
          >
            <TiThList size={24} />
          </button>
        </div>

        {/* Cars List/Grid */}
        <div
          className={`grid gap-6 ${
            viewType === "grid"
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              : "grid-cols-1"
          }`}
        >
          {/* Render car items */}
          {currentItems.map((car) => (
            <Link to={`/car/${car._id}`} state={{ memberId }} key={car._id}>
              <div
                className={`p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
                  viewType === "list"
                    ? "border-b flex items-center space-x-6"
                    : "bg-white"
                }`}
              >
                {/* Car Image */}
                <div
                  className={`${
                    viewType === "list"
                      ? "flex-shrink-0"
                      : "flex justify-center mb-1"
                  }`}
                >
                  <img
                    src={car.images[0]}
                    alt={car.carDetails}
                    className={`w-full ${
                      viewType === "list"
                        ? "h-48 object-cover rounded-lg"
                        : "h-[150px] object-cover rounded-lg"
                    }`}
                  />
                </div>
                <div className="border-t border-gray-00 mb-3"></div>

                {/* Car Details */}
                <div
                  className={`${
                    viewType === "list"
                      ? "flex flex-col space-y-2"
                      : "space-y-2 text-gray-700"
                  }`}
                >
                  <h2
                    className="text-lg font-semibold text-gray-800 truncate"
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "18px",
                      fontWeight: 500,
                    }}
                  >
                    {car.title}
                  </h2>
                  <p
                    className="text-sm text-gray-500 truncate"
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                  >
                    {car.Overview}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaGasPump className="mr-2" />
                    Fuel: {car.FuelType}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaTachometerAlt className="mr-2" />
                    Mileage: {car?.mileage?.toLocaleString()} miles
                  </div>
                  <div className="border-t border-gray-00 mb-3"></div>

                  {/* Auction Info */}
                  <div className="mt-4 text-gray-800 space-y-1">
                    <div
                      className="text-md font-semibold"
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      Auction Details
                    </div>
                    <div className="flex items-center text-sm">
                      <FaTag className="mr-2 text-gray-600" />
                      Starting Bid: {car?.initialBid?.toLocaleString() || "N/A"}
                    </div>
                    <div className="flex items-center text-sm">
                      <FaTag className="mr-2 text-gray-600" />
                      Highest Bid:{" "}
                      {car.highestBid
                        ? `${car.highestBid.bidAmount.toLocaleString()}`
                        : "No Bids Yet"}
                    </div>
                    <div className="flex items-center text-sm font-semibold text-red-600">
                      {new Date() < new Date(car.auctionEndTime) ? (
                        <AuctionTimer auctionEndTime={car.auctionEndTime} />
                      ) : (
                        "Auction Ended"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}

export default MemberPlatform;
