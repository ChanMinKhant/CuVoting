import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/store';

function Front() {
  const { status: userStatus } = useAppSelector((state) => state.user);

  return (
    <div className='w-full h-[100vh] bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col justify-center items-center text-gray-700 relative overflow-hidden'>
      {/* Overlay */}
      <div className='absolute inset-0 bg-white opacity-40'></div>

      {/* Content */}
      <div className='relative flex flex-col items-center z-10 text-center p-6 bg-white/90 backdrop-blur-md rounded-lg shadow-md max-w-[85%] sm:max-w-[60%]'>
        <h1 className='text-4xl sm:text-5xl font-semibold mb-4 tracking-tight text-gray-800'>
          UCSP Voting Platform
        </h1>
        <p className='text-md sm:text-lg text-gray-600 mb-5 leading-relaxed'>
          It's time to choose king and queen <br /> of UCSPyay. Vote for your
          favorite. <br /> Show your support and Make them win.
        </p>
        <div className='flex flex-col sm:flex-row justify-center gap-3 w-full'>
          <Link
            to='/vote'
            className='w-full sm:w-auto px-5 py-3 text-md bg-teal-200 hover:bg-teal-300 text-gray-800 font-medium rounded-md shadow transition-all duration-300'
          >
            Vote Now
          </Link>
          <Link
            to='/login'
            className={`w-full sm:w-auto px-5 py-3 text-md bg-blue-200 hover:bg-blue-300 text-gray-800 font-medium rounded-md shadow transition-all duration-300 ${
              userStatus === 'succeeded'
                ? 'cursor-not-allowed opacity-50'
                : 'hover:scale-105'
            }`}
            onClick={(e) => userStatus === 'succeeded' && e.preventDefault()}
          >
            Login
          </Link>
        </div>
        <div className='mt-4'>
          <button
            onClick={() => window.location.reload()}
            className='px-5 py-3 text-md bg-red-200 hover:bg-red-300 text-gray-800 font-medium rounded-md shadow transition-all duration-300'
          >
            Refresh the Page
          </button>
          <p className='text-sm text-gray-600 mt-2'>
            If you have trouble, click here.
          </p>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className='absolute top-12 left-8 w-16 h-16 bg-teal-100 blur-2xl rounded-full animate-pulse'></div>
      <div className='absolute top-1/4 left-1/3 w-12 h-12 bg-blue-100 blur-xl rounded-full animate-bounce'></div>
      <div className='absolute bottom-20 right-10 w-20 h-20 bg-teal-200 blur-3xl rounded-full animate-ping'></div>
      <div className='absolute bottom-1/3 right-1/4 w-14 h-14 bg-blue-200 blur-2xl rounded-full animate-pulse'></div>

      <style>
        {`
          @keyframes color-change {
            0%, 100% { color: #6b7280; }
            50% { color: #4b5563; }
          }
        `}
      </style>
    </div>
  );
}

export default Front;
