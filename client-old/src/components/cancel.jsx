import { useState } from 'react';

const Cancel = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const handleCancel = () => {
    //fetch api for canceling
    onClose();
  };
  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-lg w-96 p-6'
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className='text-lg border-b-2 font-semibold mb-4'>
          Are you sure you want to cancel your vote?
        </h2>

        <div className='flex justify-end mt-4'>
          <button
            onClick={handleCancel}
            class='bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Confirm
          </button>
          <button
            className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
