import { Link } from 'react-router-dom';

function Front() {
  return (
    <div
      className='w-full h-[100vh] bg-cover bg-center flex flex-col justify-center items-center text-white relative overflow-hidden'
      style={{ backgroundImage: 'url(/background.jpg)' }}
    >
      {/* Overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-purple-900/70 to-black/90'></div>

      {/* Content */}
      <div className='relative z-10 text-center'>
        <h1 className='text-5xl font-extrabold text-white mb-6 tracking-wider'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500'>
            UCSP Voting
          </span>
        </h1>
        <p className='text-lg text-gray-300 mb-8 max-w-md mx-auto leading-relaxed'>
          Cast your vote and make your voice heard on the UCSP platform. Join
          the community today!
        </p>
        <Link
          to='/home'
          className='px-8 py-3 text-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-300'
        >
          Vote Now
        </Link>
      </div>

      {/* Floating Decorative Elements */}
      <div className='absolute top-20 left-10 w-32 h-32 bg-pink-500/20 blur-3xl rounded-full animate-pulse'></div>
      <div className='absolute bottom-10 right-10 w-48 h-48 bg-purple-500/20 blur-3xl rounded-full animate-pulse'></div>
    </div>
  );
}

export default Front;
