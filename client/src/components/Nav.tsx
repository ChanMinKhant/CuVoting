import { useState, useEffect, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHistory, FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../services/auth';

const Nav: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isShowNav, setIsShowNav] = useState(true);
  const location = useLocation();

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Handle logout
  const handleLogout = async () => {
    if (!window.confirm('Are you sure you want to log out?')) return;

    try {
      setIsDropdownOpen(false);
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Control nav visibility based on the current route
  useEffect(() => {
    setIsShowNav(location.pathname === '/home');
  }, [location.pathname]);

  if (!isShowNav) return null;

  return (
    <nav className='bg-gray-800 w-full max-w-[640px] mx-auto p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='text-white text-lg font-semibold'>
          <span className='italic'>Voting</span>
        </Link>

        <div className='relative'>
          <button
            onClick={toggleDropdown}
            className='ml-4 text-white focus:outline-none'
          >
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
                d={isDropdownOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
              />
            </svg>
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

export default memo(Nav);
