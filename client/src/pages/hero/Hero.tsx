import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/store';

function Front() {
  const { status: userStatus } = useAppSelector((state) => state.user);

  return (
    <div className='w-full h-[100vh] bg-gradient-to-br from-teal-100 to-blue-100 flex flex-col justify-center items-center text-gray-800 relative overflow-hidden'>
      {/* Overlay */}
      <div className='absolute inset-0 bg-gray-50 opacity-30'></div>

      {/* Content */}
      <div className='relative flex flex-col justify-center items-center z-10 text-center p-8 bg-white/70 backdrop-blur-md rounded-xl shadow-lg max-w-[90%] sm:max-w-[70%]'>
        <h1 className='text-5xl sm:text-6xl font-bold mb-6 tracking-tight text-gray-700 animate-pulse'>
          Welcome to UCSP Voting
        </h1>
        <p className='text-lg sm:text-xl text-gray-600 mb-6 leading-relaxed'>
          Be part of the decision-making process at UCSP. Cast your vote and let
          your voice be heard!
        </p>
        <div className='flex flex-col sm:flex-row justify-center gap-4'>
          <Link
            to='/home'
            className='px-6 py-3 text-lg bg-teal-300 hover:bg-teal-400 text-gray-800 font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300'
          >
            Vote Now
          </Link>
          <Link
            to='/signup'
            className={`px-6 py-3 text-lg bg-blue-300 hover:bg-blue-400 text-gray-800 font-semibold rounded-full shadow-md transition-all duration-300 ${
              userStatus === 'succeeded'
                ? 'cursor-not-allowed opacity-50'
                : 'hover:scale-105 hover:shadow-lg'
            }`}
            onClick={(e) => userStatus === 'succeeded' && e.preventDefault()}
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className='absolute top-10 left-6 w-20 h-20 bg-teal-200/50 blur-2xl rounded-full animate-pulse'></div>
      <div className='absolute top-1/3 left-1/4 w-16 h-16 bg-blue-200/50 blur-2xl rounded-full animate-bounce'></div>
      <div className='absolute bottom-16 right-6 w-24 h-24 bg-teal-300/40 blur-3xl rounded-full animate-ping'></div>
      <div className='absolute bottom-1/4 right-1/4 w-16 h-16 bg-blue-300/40 blur-2xl rounded-full animate-pulse'></div>

      <style>
        {`
          @keyframes color-change {
            0%, 100% { color: #94a3b8; }
            50% { color: #64748b; }
          }
        `}
      </style>
    </div>
  );
}

export default Front;
