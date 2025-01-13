import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHistory, FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../services/auth';

const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isShowNav, setIsShowNav] = useState(false);
  const location = useLocation(); // useLocation hook to get the current path

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      const userConfirmed = window.confirm('Are you sure you want to log out?');
      if (!userConfirmed) {
        return;
      }

      setIsDropdownOpen(false);
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    // Only show the nav bar on the /home route
    if (location.pathname !== '/home') {
      setIsShowNav(false);
    } else {
      setIsShowNav(true);
    }
  }, [location.pathname]); // Re-run the effect when location changes

  if (!isShowNav) return null;

  return (
    <nav className='bg-gray-800 w-full max-w-[640px] mx-auto p-4'>
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
            {isDropdownOpen ? (
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
              <button
                className='flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100'
                onClick={handleLogout}
              >
                <FaSignOutAlt className='mr-2' />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
