// import { useState } from 'react';

// function FrontCard({ name, age, height, img, id, setIsModalOpen }) {
//   const [isVoted, setIsVoted] = useState(false);

//   const handleVoteClick = (event) => {
//     event.stopPropagation(); // Prevent card flip
//     setIsModalOpen(true); // Open the modal
//     setIsVoted(!isVoted); // Toggle vote status
//   };

//   return (
//     <div className='relative w-full aspect-[2/3] overflow-hidden rounded-2xl shadow-lg'>
//       <img
//         src={img}
//         alt={`Contestant ${name}`}
//         className='w-full h-full object-cover'
//       />
//       <div className='absolute inset-0 bg-gradient-to-t from-black/100 via-black/30 to-transparent' />
//       <div className='absolute bottom-0 left-0 right-0 p-4 text-white'>
//         <h2 className='text-2xl font-bold mb-1'>{name}</h2>
//         <p className='text-sm opacity-80'>Height: {height}</p>
//       </div>
//       <div className='absolute top-3 left-3 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1'>
//         <span className='text-white font-semibold'>#{id}</span>
//       </div>
//       <button
//         className={`absolute bottom-4 right-4 p-2 text-[#fccc1c] font-bold rounded-full transition-all duration-300 transform ${
//           isVoted
//             ? 'bg-pink-500 scale-110'
//             : 'bg-white/20 backdrop-blur-sm hover:bg-white/40'
//         }`}
//         onClick={(event) => handleVoteClick(event)}
//       >
//         Vote me
//       </button>
//     </div>
//   );
// }

// export default FrontCard;
import { useState } from 'react';

function FrontCard({ name, age, height, img, id, setIsModalOpen }) {
  const [isVoted, setIsVoted] = useState(false);

  const handleVoteClick = (event) => {
    event.stopPropagation(); // Prevent card flip
    setIsModalOpen(true); // Open the modal
    setIsVoted(!isVoted); // Toggle vote status
  };

  return (
    <div className='relative w-full aspect-[2/3] overflow-hidden rounded-2xl shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
      <div className='relative w-full h-full bg-white rounded-xl overflow-hidden'>
        {/* Card Image */}
        <img
          src={img}
          alt={`Contestant ${name}`}
          className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
        />
        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent'></div>
        {/* Card Details */}
        <div className='absolute bottom-0 left-0 right-0 p-4 text-white'>
          <h2 className='text-3xl font-extrabold mb-1'>{name}</h2>
          <p className='text-sm opacity-90'>Height: {height}</p>
          <p className='text-sm opacity-90'>Age: {age}</p>
        </div>
        {/* Badge */}
        <div className='absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full px-4 py-1 shadow-md'>
          <span className='text-white font-bold'>#{id}</span>
        </div>
        {/* Vote Button */}
        <button
          className={`absolute bottom-4 right-4 px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 shadow-lg transform focus:outline-none ${
            isVoted
              ? 'bg-pink-600 text-white scale-110 hover:scale-105'
              : 'bg-white/20 text-[#fccc1c] backdrop-blur-sm hover:bg-white/40 hover:scale-105'
          }`}
          onClick={(event) => handleVoteClick(event)}
        >
          {/* {isVoted ? 'Voted!' : 'Vote Me'} */}
          vote me
        </button>
      </div>
    </div>
  );
}

export default FrontCard;