import React, { useState } from 'react';
import Modal from '../components/Modal';

const CandidateProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className='flex justify-center h-[100vh] items-center bg-gray-100 '>
      <div className='w-full sm:w-[640px] h-full bg-white shadow-lg overflow-y-scroll scrollbar-hide'>
        <div className='relative'>
          {/* Banner Image */}
          <img
            src='/emma1.jpg'
            alt='Banner'
            className='w-full h-full object-cover'
          />
          {/* Profile Picture */}
          <div className='w-24 h-24 rounded-full overflow-hidden absolute -bottom-12 left-1/2 transform -translate-x-1/2'>
            <img
              src='/emma.jpg'
              alt='Profile'
              className='shadow-lg object-cover w-full h-full'
            />
          </div>
        </div>

        {/* Content */}
        <div className='px-6 pt-16 pb-6'>
          <h2 className='text-2xl font-bold text-center text-gray-800'>
            Emma Watson
          </h2>
          <p className='text-center text-gray-600 text-sm mt-1'>
            Little progress is better than no progress.
          </p>
          <button
            onClick={openModal}
            className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
          >
            Vote me
          </button>
          <Modal isOpen={isModalOpen} onClose={closeModal} />
          <p className='text-center text-gray-500 mt-4'>
            A highly motivated candidate with a strong passion for technology
            and innovation. Adept at solving complex problems and delivering
            impactful solutions.
          </p>

          {/* Stats */}
          <div className='flex flex-wrap mt-6  text-center flex-col'>
            <div className='flex'>
              <span className='text-gray-500 font-bold'>Age - </span>
              <span className='text-gray-500'>19</span>
            </div>
            <div className='flex'>
              <span className='text-gray-500 font-bold'>Hobby - </span>
              <span className='text-gray-500'>tennis</span>
            </div>
            <div className='flex'>
              <span className='text-gray-500 font-bold'>
                favourite color -{' '}
              </span>
              <span className='text-gray-500'>blue</span>
            </div>
          </div>

          <hr class='border-t-2 border-gray-300 my-4 rounded-full' />

          {/* Social Media Links */}
          <div className='mt-6 flex justify-center space-x-4'>
            <a href='#' className='text-blue-600 hover:text-blue-800'>
              <img src='/facebook.png' className='h-8 w-8' alt='' />
            </a>
            <a href='#' className='text-blue-400 hover:text-blue-600'>
              <img src='/instagram.png' className='h-8 w-8' alt='' />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
