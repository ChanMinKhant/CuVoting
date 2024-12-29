import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cancel from '../components/cancel';

function VoteHistory() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [voted, setIsVoted] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // const handleCancel = () => {
  //   alert('Are you sure you want to cancle your vote?');
  // };
  const isLoggedIn = true;
  return (
    <div className='p-2 min-h-screen w-full items-center bg-gray-100'>
      <div>
        {isLoggedIn && voted ? (
          <div className='flex flex-col px-2 items-center h-[100vh] py-4 bg-white'>
            {/* history.map(......) etc*/}
            <div className='mt-2 bg-[#f1f5f8] justify-between flex p-2 w-full h-[65px] shadow-md'>
              <div className='flex flex-col'>
                <div className='font-bold text-[18px]'>Nandar</div>
                <div className='text-gray-500 font-sm'>Title - queen</div>
              </div>
              <div>
                <button
                  onClick={openModal}
                  class='bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'
                >
                  calcel vote
                </button>
                <Cancel isOpen={isModalOpen} onClose={closeModal} />
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center h-[100vh] bg-gradient-to-br from-gray-50 to-blue-100 text-gray-700'>
            {/* Image */}
            <img
              className='h-[150px] w-[150px] mb-6 drop-shadow-lg transform transition duration-300 hover:scale-110'
              src='/vote (1).png'
              alt='Vote'
            />

            {/* Text */}
            <div className='text-lg font-semibold bg-gray-100 px-4 py-2 rounded-md shadow-md border border-gray-300'>
              You have not voted yet.
            </div>

            {/* Button */}
            <Link
              to='/home'
              className='mt-6 px-6 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 hover:shadow-lg active:scale-95 transition-all'
            >
              Cast Your Vote
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default VoteHistory;
