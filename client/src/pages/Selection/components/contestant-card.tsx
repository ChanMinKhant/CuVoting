import { useState } from 'react';

interface ContestantProps {
  name: string;
  height: string;
  number: number;
  photoUrl: string;
}

export default function ContestantCard({
  name,
  height,
  number,
}: //   photoUrl,
ContestantProps) {
  const [isVoted, setIsVoted] = useState(false);

  // Safely format the height, handling potential undefined values
  const formattedHeight =
    typeof height === 'string' ? height.replace(/"/g, "'") : 'N/A';

  return (
    <div className='relative w-full aspect-[2/3] overflow-hidden rounded-2xl shadow-lg'>
      <img
        src={
          'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fi.pinimg.com%2F736x%2F9d%2Ff7%2F12%2F9df71280ef9bcceb74f507a168ddecee--one-piece-d-luffy.jpg&sp=1735459984Tb76cf75cc21e22a6d0a6c8a2e61b3660792d76b8116ffb87ba25fd9fc863ea79'
        }
        alt={`Contestant ${name}`}
        className='w-full h-full object-cover'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent' />
      <div className='absolute bottom-0 left-0 right-0 p-4 text-white'>
        <h2 className='text-2xl font-bold mb-1'>{name}</h2>
        <p className='text-sm opacity-80'>Height: {formattedHeight}</p>
      </div>
      <div className='absolute top-3 left-3 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1'>
        <span className='text-white font-semibold'>#{number}</span>
      </div>
      <button
        className={`absolute bottom-4 right-4 p-2 rounded-full transition-all duration-300 transform ${
          isVoted
            ? 'bg-pink-500 scale-110'
            : 'bg-white/20 backdrop-blur-sm hover:bg-white/40'
        }`}
        onClick={() => setIsVoted(!isVoted)}
      >
        <svg
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
        </svg>
      </button>
    </div>
  );
}
