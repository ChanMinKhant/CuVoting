import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='bg-gray-800 p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='text-white text-lg font-semibold'>
          <span className='italic'>Voting</span>
        </Link>

        <div className=''>
          <button
            onClick={toggleMenu}
            className='focus:outline-none text-white'
          >
            {isMenuOpen ? (
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
                  d='M6 18L18 6M6 6l12 12'
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
                  d='M4 6h16M4 12h16m-7 6h7'
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
