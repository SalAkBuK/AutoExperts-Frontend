import React, { useEffect, useState } from 'react';
import EditModal from './EditModal';
import Main from './Main';
import InspectionBookingsRow from './InspectionBookingRow';

const dummyUsers = [
  { id: 1, name: 'Ramon Ridwan', contactNumber: '123-456-7890', email: 'ramon@example.com', date: '2023-01-01', time: '10:00 AM' },
  { id: 2, name: 'Alex Doe', contactNumber: '234-567-8901', email: 'alex@example.com', date: '2023-01-02', time: '11:00 AM' },
  { id: 3, name: 'Alex Doe', contactNumber: '234-567-8901', email: 'alex@example.com', date: '2023-01-02', time: '11:00 AM' },
  { id: 4, name: 'Alex Doe', contactNumber: '234-567-8901', email: 'alex@example.com', date: '2023-01-02', time: '11:00 AM' },
  { id: 5, name: 'Alex Doe', contactNumber: '234-567-8901', email: 'alex@example.com', date: '2023-01-02', time: '11:00 AM' },
  { id: 6, name: 'Alex Doe', contactNumber: '234-567-8901', email: 'alex@example.com', date: '2023-01-02', time: '11:00 AM' },
  { id: 7, name: 'Alex Doe', contactNumber: '234-567-8901', email: 'alex@example.com', date: '2023-01-02', time: '11:00 AM' },
  { id: 8, name: 'Alex Doe', contactNumber: '234-567-8901', email: 'alex@example.com', date: '2023-01-02', time: '11:00 AM' },
  { id: 9, name: 'Alex Doe', contactNumber: '234-567-8901', email: 'alex@example.com', date: '2023-01-02', time: '11:00 AM' },
  { id: 10, name: 'Alex Doe', contactNumber: '234-567-8901', email: 'alex@example.com', date: '2023-01-02', time: '11:00 AM' },
  { id: 11, name: 'Alex Doe', contactNumber: '234-567-8901', email: 'alex@example.com', date: '2023-01-02', time: '11:00 AM' },
  { id: 12, name: 'Alex Doe', contactNumber: '234-567-8901', email: 'alex@example.com', date: '2023-01-02', time: '11:00 AM' },
  { id: 13, name: 'Alex Doe', contactNumber: '234-567-8901', email: 'alex@example.com', date: '2023-01-02', time: '11:00 AM' },
  { id: 14, name: 'Alex Doe', contactNumber: '234-567-8901', email: 'alex@example.com', date: '2023-01-02', time: '11:00 AM' },
  { id: 15, name: 'Alex Doe', contactNumber: '234-567-8901', email: 'alex@example.com', date: '2023-01-02', time: '11:00 AM' },
  { id: 16, name: 'Alex Doe', contactNumber: '234-567-8901', email: 'alex@example.com', date: '2023-01-02', time: '11:00 AM' },
  
  // Add more dummy users as needed for testing...
];

function InspectionBookings() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api.example.com/users'); // Replace with your API endpoint
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
        setUsers(dummyUsers); // Fallback to dummy data
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleSave = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setSelectedUser(null);
  };

  const handleDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  // Pagination logic
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Main />

      <div className="w-full max-w-5xl bg-[#0b213e] p-10 gap-10 rounded-xl shadow-lg text-white ml-2 mt-2 mb-10">
        <h2 className="text-lg font-semibold mb-10">Total Bookings</h2>

        {/* Items per page dropdown */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <label className="mr-2">Show:</label>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="bg-[#394a6d] text-white px-2 py-1 rounded"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-7 gap-6 font-semibold text-[#bfcde0] pl-1 pb-3 border-b border-[#394a6d] items-center">
          <span className="text-center">Id</span>
          <span className="text-center">Name</span>
          <span className="text-center">Contact</span>
          <span className="text-center">Email</span>
          <span className="text-center">Date</span>
          <span className="text-center">Time</span>
          <span className="text-center">Action</span>
        </div>

        {/* User rows */}
        {paginatedUsers.map((user) => (
          <InspectionBookingsRow
            key={user.id}
            user={user}
            onEdit={() => handleEdit(user)}
            onDelete={() => handleDelete(user.id)}
          />
        ))}

        {/* Pagination controls */}
        <div className="flex justify-center mt-6">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? 'bg-[#4b4cfe] text-white' : 'bg-[#394a6d] text-[#bfcde0]'} hover:bg-[#3738ff]`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <EditModal
          user={selectedUser}
          isOpen={!!selectedUser}
          onSave={handleSave}
          onClose={() => setSelectedUser(null)}
        />
      </div>
    </div>
  );
}

export default InspectionBookings;
