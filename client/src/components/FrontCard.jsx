import { useState } from 'react';

function FrontCard({ name, age, height, img, id, setIsModalOpen }) {
  const [isVoted, setIsVoted] = useState(false);

  const handleVoteClick = (event) => {
    event.stopPropagation(); // Prevent card flip
    setIsModalOpen(true); // Open the modal
    setIsVoted(!isVoted); // Toggle vote status
  };

  return (
    <div className='relative w-full aspect-[2/3] overflow-hidden rounded-2xl shadow-lg'>
      <img
        src={img}
        alt={`Contestant ${name}`}
        className='w-full h-full object-cover'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black/100 via-black/30 to-transparent' />
      <div className='absolute bottom-0 left-0 right-0 p-4 text-white'>
        <h2 className='text-2xl font-bold mb-1'>{name}</h2>
        <p className='text-sm opacity-80'>Height: {height}</p>
      </div>
      <div className='absolute top-3 left-3 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1'>
        <span className='text-white font-semibold'>#{id}</span>
      </div>
      <button
        className={`absolute bottom-4 right-4 p-2 text-[#fccc1c] font-bold rounded-full transition-all duration-300 transform ${
          isVoted
            ? 'bg-pink-500 scale-110'
            : 'bg-white/20 backdrop-blur-sm hover:bg-white/40'
        }`}
        onClick={(event) => handleVoteClick(event)}
      >
        Vote me
        {/* <svg
          className='w-6 h-6'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11L20 14V22H4V14L7 11Z'
            stroke={isVoted ? 'white' : 'currentColor'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={isVoted ? 'fill-white' : 'fill-none'}
          />
        </svg> */}
      </button>
    </div>
  );
}

export default FrontCard;
