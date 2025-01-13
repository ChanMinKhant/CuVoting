import { Link } from 'react-router-dom';

function Front() {
  return (
    <div className='w-full h-[100vh] bg-gradient-to-r from-purple-800 to-blue-600 flex flex-col justify-center items-center text-white relative overflow-hidden'>
      {/* Overlay */}
      <div className='absolute inset-0 bg-black opacity-50'></div>

      {/* Content */}
      <div className='relative h-full z-10 text-center p-8 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl'>
        <h1 className='text-6xl font-extrabold mb-6 tracking-wide drop-shadow-lg animate-fadeIn'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-600'>
            UCSP Fresher Welcome
          </span>
        </h1>
        <p className='text-xl text-gray-200 mb-8 max-w-lg mx-auto leading-relaxed drop-shadow-md animate-slideIn'>
          Cast your vote and make your voice heard on the UCSP platform. Join
          the community today and be part of the decision-making process!
        </p>
        <div className='flex justify-center space-x-6 animate-bounce'>
          <Link
            to='/home'
            className='px-8 py-3 text-lg bg-gradient-to-r from-yellow-400 to-red-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition transform duration-300'
          >
            Vote Now
          </Link>
          <Link
            to='/signup'
            className='px-8 py-3 text-lg bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition transform duration-300'
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Enhanced Floating Decorative Elements */}
      <div className='absolute top-10 left-5 w-40 h-40 bg-pink-400/30 blur-2xl rounded-full animate-pulse'></div>
      <div className='absolute top-1/3 left-1/4 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full animate-bounce'></div>
      <div className='absolute bottom-20 right-5 w-48 h-48 bg-purple-600/25 blur-2xl rounded-full animate-pulse'></div>
      <div className='absolute bottom-1/3 right-1/3 w-24 h-24 bg-yellow-500/20 blur-2xl rounded-full animate-ping'></div>
    </div>
  );
}

export default Front;
