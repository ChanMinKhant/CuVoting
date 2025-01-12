import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHistory, FaSignOutAlt } from 'react-icons/fa';

const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className='bg-gray-800 p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='text-white text-lg font-semibold'>
          <span className='italic'>Voting</span>
        </Link>

        <div className='relative'>
          <button
            onClick={toggleMenu}
            className='focus:outline-none text-white'
          ></button>
          <button
            onClick={toggleDropdown}
            className='ml-4 text-white focus:outline-none'
          >
            {/* Dropdown Icon */}
            {isDropdownOpen ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 24 24'
                strokeWidth='2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M5 15l7-7 7 7'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                strokeWidth='2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            )}
          </button>
          {isDropdownOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20'>
              <Link
                to='/vote-history'
                className='flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100'
                onClick={() => setIsDropdownOpen(false)}
              >
                <FaHistory className='mr-2' />
                Vote History
              </Link>
              <Link
                to='/logout'
                className='flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100'
                onClick={() => setIsDropdownOpen(false)}
              >
                <FaSignOutAlt className='mr-2' />
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
