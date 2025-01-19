import { useState, useEffect, useRef, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHistory, FaSignOutAlt, FaChartBar, FaVoteYea } from 'react-icons/fa';
import { logout } from '../services/auth';
import { useAppSelector } from '../store/store';

const Nav: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isShowNav, setIsShowNav] = useState(true);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { activeTab } = useAppSelector((state) => state.modal);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isShowNav) return null;

  return (
    <nav
      className={`${
        activeTab === 'girl'
          ? 'bg-pink-100'
          : activeTab === 'boy'
          ? 'bg-green-100'
          : activeTab === 'couple'
          ? 'bg-gradient-to-r from-green-100 to-pink-100'
          : 'bg-gray-100'
      } bg-opacity-50 backdrop-blur-md w-full max-w-[640px] mx-auto p-4 top-0 left-0 right-0 z-10`}
    >
      <div className='container mx-auto flex justify-between items-center'>
        <Link
          to='/'
          className='text-gray-800 text-lg font-semibold flex items-center'
        >
          {/* <FaVoteYea className='mr-2' /> */}
          <span className='italic'>UCS Pyay</span>
        </Link>

        <div className='relative' ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className='ml-4 text-gray-800 focus:outline-none'
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
            <div className='absolute right-0 mt-2 w-48 bg-white bg-opacity-90 backdrop-blur-md rounded-md shadow-lg z-20'>
              <Link
                to='/vote-history'
                className='flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100'
                onClick={() => setIsDropdownOpen(false)}
              >
                <FaHistory className='mr-2' />
                Vote History
              </Link>
              <hr />
              <Link
                to='/results'
                className='flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100'
                onClick={() => setIsDropdownOpen(false)}
              >
                <FaChartBar className='mr-2' />
                Results
              </Link>
              <hr />
              <button
                className='flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100'
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
