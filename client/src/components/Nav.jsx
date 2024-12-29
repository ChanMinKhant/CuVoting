// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './nav.css';
// const Nav = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };
//   return (
//     <div className='max-w-screen-sm sticky top-0 z-[50] w-[100vw]'>
//       <nav className='flex justify-between w-full items-center px-4 py-2 bg-[#9ffcda] text-white'>
//         <div className='text-lg font-semibold text-[#8e44ad]'>
//           <span className='tracking-wider'>UCSP</span>{' '}
//           <span className='italic'>Voting</span>
//         </div>

//         <div className='sm:hidden'>
//           <button
//             onClick={toggleMenu}
//             className='focus:outline-none text-black'
//           >
//             <svg
//               xmlns='http://www.w3.org/2000/svg'
//               className='w-6 h-6'
//               fill='none'
//               stroke='currentColor'
//               viewBox='0 0 24 24'
//               strokeWidth='2'
//             >
//               <path
//                 strokeLinecap='round'
//                 strokeLinejoin='round'
//                 d='M4 6h16M4 12h16M4 18h16'
//               />
//             </svg>
//           </button>
//         </div>
//       </nav>
//       <div
//         className={`flex flex-col bg-[#bbedfc] bg-white fixed w-full px-2 top-[45px] overflow-hidden drop ${
//           isMenuOpen ? 'drop-open' : ''
//         }`}
//       >
//         <Link
//           className='text-lg hover:bg-blue-600 px-2 rounded py-1 border-b-2'
//           to={'/vote/boys'}
//           onClick={toggleMenu}
//         >
//           boys
//         </Link>
//         <Link
//           className='text-lg hover:bg-blue-600 px-2 rounded py-1 border-b-2'
//           to={'/vote/girls'}
//           onClick={toggleMenu}
//         >
//           girls
//         </Link>
//         <Link
//           className='text-lg hover:bg-blue-600 px-2 rounded py-1 border-b-2'
//           to={'/vote/couples'}
//           onClick={toggleMenu}
//         >
//           couples
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Nav;
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='max-w-screen-sm sticky top-0 z-[50] w-[100vw]'>
      <nav className='flex justify-between w-full items-center px-4 py-2 bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white shadow-md'>
        <Link to={'/'} className='text-lg font-semibold'>
          <span className='tracking-wider'>UCSP</span>{' '}
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
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <div
        className={`flex rounded-sm flex-col bg-white/20 backdrop-blur-sm hover:bg-white/40 max-w-[640px] fixed  px-2 top-[50px] overflow-hidden shadow-lg transition-transform transform ${
          isMenuOpen
            ? 'translate-y-0 opacity-100 w-full'
            : '-translate-y-full w-0 opacity-0'
        }`}
        style={{ transition: 'all 0.3s ease-in-out' }}
      >
        <Link
          className='text-md hover:bg-blue-300 px-3 rounded py-2 border-b border-gray-300'
          to={'/home'}
          onClick={toggleMenu}
        >
          <div>Home</div>
        </Link>
        <Link
          className='text-md hover:bg-blue-300 px-3 rounded py-2 border-b border-gray-300'
          to={'/vote_history'}
          onClick={toggleMenu}
        >
          <div>Vote History</div>
        </Link>
        <Link
          className='text-md hover:bg-blue-300 px-3 rounded py-2 border-b border-gray-300'
          to={'/voting_results'}
          onClick={toggleMenu}
        >
          <div>Voting Results</div>
        </Link>
        {/* <Link
          className='text-md hover:bg-blue-300 px-3 rounded py-2 border-b border-gray-300'
          to={'/voting_results'}
          onClick={toggleMenu}
        >
          <div>Contact Us</div>
        </Link> */}
      </div>
    </div>
  );
};

export default Nav;
