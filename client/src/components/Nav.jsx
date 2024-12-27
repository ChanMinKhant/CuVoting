import { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className='flex justify-between items-center px-4 py-2 bg-[#444444] text-white z-[50] fixed top-0 w-[100vw]'>
        {/* Website Name */}
        <div className='text-2xl font-bold'>UCSP voting</div>

        {/* Hamburger Icon (visible on small screens) */}
        <div className='lg:hidden'>
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
        <div className='hidden lg:flex flex-grow justify-end bg-[#444444]'>
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
                to='/vote'
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
        className={`lg:hidden fixed top-[50px] left-0 w-[150px] z-50 h-full text-white bg-[#999999] p-4 transition-transform transform ${
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
            <Link
              to='/vote'
              className='text-lg hover:bg-blue-600 px-2 rounded py-1'
              onClick={toggleMenu}
            >
              vote
            </Link>
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
