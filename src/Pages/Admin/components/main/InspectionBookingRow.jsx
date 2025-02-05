import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function InspectionBookingsRow({ user, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-7 gap-3  mt-4 py-2 items-center text-white rounded-lg bg-zinc-600 mb-2 px-1">
      <span className="text-center flex-1">{user.id}</span>
      <span className="text-center flex-1">{user.name}</span>
      <span className="text-center">{user.contactNumber}</span>
      <span className="text-center">{user.email}</span>
      <span className="text-center pl-5">{user.date}</span>
      <span className="text-center pl-5">{user.time}</span>
      <div className="flex gap-4 justify-center pl-5">
        <FaEdit onClick={onEdit} className="cursor-pointer text-[#4b4cfe] hover:text-[#3738ff]" />
        <FaTrash onClick={onDelete} className="cursor-pointer text-[#dc3545] hover:text-[#b52a38]" />
      </div>
    </div>
  );
}

export default InspectionBookingsRow;
