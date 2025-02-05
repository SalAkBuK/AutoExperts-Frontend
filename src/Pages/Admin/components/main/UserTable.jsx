import React, { useEffect, useState } from 'react';
import UserTableRow from './UserTableRow';
import EditModal from './EditModal';
import Main from './Main';

const dummyUsers = [
  { id: 1, name: 'Ramon Ridwan', email: 'ramonridwan@protonmail.com' },
  { id: 2, name: 'Ramon Ridwan', email: 'ramonridwan@protonmail.com' },
  { id: 3, name: 'Ramon Ridwan', email: 'ramonridwan@protonmail.com' },
  { id: 4, name: 'Ramon Ridwan', email: 'ramonridwan@protonmail.com' },
  { id: 5, name: 'Ramon Ridwan', email: 'ramonridwan@protonmail.com' },
  { id: 6, name: 'Ramon Ridwan', email: 'ramonridwan@protonmail.com' },
  { id: 7, name: 'Ramon Ridwan', email: 'ramonridwan@protonmail.com' },
  { id: 8, name: 'Ramon Ridwan', email: 'ramonridwan@protonmail.com' },
  { id: 9, name: 'Ramon Ridwan', email: 'ramonridwan@protonmail.com' },
  { id: 10, name: 'Ramon Ridwan', email: 'ramonridwan@protonmail.com' },
];

function UserTable() {
  const [users, setUsers] = useState([]);
  const [displayCount, setDisplayCount] = useState(5);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const handleViewMore = () => {
    setDisplayCount((prevCount) => prevCount + 5);
  };

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

  return (
    <div>
      <Main />

      <div className="w-full max-w-4xl bg-[#0b213e] p-10 rounded-xl shadow-lg text-white ml-2 mt-2">
        <h2 className="text-lg font-semibold mb-10">Total Users</h2>
        <div className="grid grid-cols-3 gap-10 font-semibold text-[#bfcde0] pl-8 flex-1 pb-3 border-b border-[#394a6d] flex items-center">
          <span>User Name</span>
          <span className="pl-20">Email</span>
          <span className="pl-10">Action</span>
        </div>
        {users.slice(0, displayCount).map((user) => (
          <UserTableRow
            key={user.id}
            user={user}
            onEdit={() => handleEdit(user)}
            onDelete={() => handleDelete(user.id)}
          />
        ))}
        {displayCount < users.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleViewMore}
              className="px-6 py-2 bg-[#4b4cfe] rounded-full text-white font-semibold hover:bg-[#3738ff]"
            >
              View More
            </button>
          </div>
        )}
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

export default UserTable;
