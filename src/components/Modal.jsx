import React, { useState } from 'react';
import './Modal.css';

function Modal({ onClose, onBidSubmit }) {
  const [bidAmount, setBidAmount] = useState('');

  const handleInputChange = (e) => {
    setBidAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bidAmount) {
      onBidSubmit(bidAmount);
      setBidAmount('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg transition-transform transform scale-100 opacity-100 animate-fadeIn">
        <h3 className="font-bold text-lg">Place Your Bid</h3>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="number"
            min="1"
            step="0.01"
            value={bidAmount}
            onChange={handleInputChange}
            placeholder="Enter bid amount"
            className="border p-2 rounded w-full"
            required
          />
          <div className="flex justify-end mt-4 space-x-20">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-400 text-black py-1 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded"
            >
              Submit Bid
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
