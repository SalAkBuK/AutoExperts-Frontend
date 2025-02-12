import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserCircle, FaEnvelope, FaMapMarkerAlt, FaIdCard, FaBirthdayCake, FaPhone, FaUserTag, FaEdit } from "react-icons/fa";
import Navbar from "../components/AuctionHeader";
import FooterOne from "../components/FooterOne";
const Profile = () => {
  const navigate = useNavigate();
  const memberId = localStorage.getItem("memberId");

  // Dummy Data
  const dummyUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    number: "0312-3456789",
    city: "Karachi",
    address: "Street 123, DHA Phase 6",
    cnic: "42101-1234567-8",
    dateOfBirth: "1990-05-15",
    role: "Member",
    subscriptionStatus: "active"
  };

  const [user, setUser] = useState(dummyUser);

  useEffect(() => {
    if (!memberId) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://167.99.228.40:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile, using dummy data:", error);
      }
    };

    fetchProfile();
  }, [memberId, navigate]);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-[#0C0C1D] text-white p-6">
      <div className="w-full max-w-4xl bg-[#141432] p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <FaUserCircle size={80} className="text-gray-400 mb-4" />
          <h2 className="text-3xl font-semibold">{user.name}</h2>
          <p className="text-gray-400">{user.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <ProfileItem icon={<FaPhone />} label="Phone" value={user.number} />
          <ProfileItem icon={<FaMapMarkerAlt />} label="City" value={user.city} />
          <ProfileItem icon={<FaIdCard />} label="CNIC" value={user.cnic} />
          <ProfileItem icon={<FaBirthdayCake />} label="Date of Birth" value={new Date(user.dateOfBirth).toLocaleDateString()} />
          <ProfileItem icon={<FaUserTag />} label="Role" value={user.role} />
          <ProfileItem icon={<FaUserCircle />} label="Subscription Status" value={user.subscriptionStatus} />
        </div>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
  <button 
    onClick={() => navigate("/auction-platform")} 
    className="bg-orange-500 hover:bg-orange-600 px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-lg font-medium transition-all whitespace-nowrap">
    Dashboard
  </button>

  <button 
    onClick={() => navigate("/update-profile")} 
    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-lg font-medium transition-all whitespace-nowrap">
    <FaEdit />
    Edit Profile
  </button>
</div>

      </div>
    </div>

    <FooterOne/>
    </>
  );
};

const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 bg-[#1E1E3F] p-4 rounded-md shadow-md">
    <div className="text-orange-400">{icon}</div>
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);

export default Profile;
