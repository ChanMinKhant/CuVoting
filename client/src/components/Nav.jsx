import { useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isdrop, setisdrop] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setisdrop(false);
  };
  const handleDropdown = () => {
    setisdrop(!isdrop);
  };
  return (
    <div className='max-w-screen-sm sticky top-0 z-[50] w-[100vw]'>
      {/* Navbar */}
      <nav className='flex justify-between w-full items-center px-4 py-2 bg-[#444444] text-white'>
        {/* Website Name */}
        <div className='text-2xl font-bold'>UCSP voting</div>

        {/* Hamburger Icon (visible on small screens) */}
        <div className='sm:hidden'>
          <button onClick={toggleMenu} className='focus:outline-none'>
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
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
        </div>

        {/* Navbar Links (visible on larger screens) */}
        <div className='hidden sm:flex flex-grow justify-end bg-[#444444]'>
          <ul className='flex space-x-10'>
            <li>
              <Link
                to='/'
                className='text-lg hover:bg-blue-600 px-2 rounded py-1'
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/vote_categories'
                className='text-lg hover:bg-blue-600 px-2 rounded py-1'
              >
                vote
              </Link>
            </li>
            <li>
              <Link
                to='/about'
                className='text-lg hover:bg-blue-600 px-2 rounded py-1'
              >
                about
              </Link>
            </li>
            <li>
              <Link
                to='/contact'
                className='text-lg hover:bg-blue-600 px-2 rounded py-1'
              >
                contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Sidebar / Dropdown Menu (on mobile) */}
      <div
        className={`sm:hidden fixed top-[50px] left-0 w-[150px] z-50 h-full text-white bg-[#999999] p-4 transition-transform transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ul>
          <li className='mb-4 '>
            <Link
              to='/'
              className='text-lg hover:bg-blue-600 px-2 rounded py-1'
              onClick={toggleMenu}
            >
              Home
            </Link>
          </li>
          <li className='mb-4'>
            <div
              className='text-lg hover:bg-blue-600 px-2 rounded py-1'
              onClick={handleDropdown}
            >
              vote
            </div>
            <div
              className={`flex flex-col overflow-hidden drop ${
                isdrop ? 'drop-open' : ''
              }`}
            >
              <Link
                className='text-lg hover:bg-blue-600 px-2 rounded py-1 border-b-2 bg-[#777777]'
                to={'/vote/boys'}
                onClick={toggleMenu}
              >
                boys
              </Link>
              <Link
                className='text-lg hover:bg-blue-600 px-2 rounded py-1 border-b-2 bg-[#777777]'
                to={'/vote/girls'}
                onClick={toggleMenu}
              >
                girls
              </Link>
              <Link
                className='text-lg hover:bg-blue-600 px-2 rounded py-1 border-b-2 bg-[#777777]'
                to={'/vote/couples'}
                onClick={toggleMenu}
              >
                couples
              </Link>
            </div>
          </li>
          <li className='mb-4'>
            <Link
              to='/about'
              className='text-lg hover:bg-blue-600 px-2 rounded py-1'
              onClick={toggleMenu}
            >
              about
            </Link>
          </li>
          <li className='mb-4'>
            <Link
              to='/contact'
              className='text-lg hover:bg-blue-600 px-2 rounded py-1'
              onClick={toggleMenu}
            >
              contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
