import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import BackCard from './BackCard';
import Modal from './Modal';

const ContestantCard = ({ img, name, age, bio, hobbies, height }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleVoteClick = (event) => {
    event.stopPropagation();
    // alert(`You voted for ${name}!`);
    setIsModalOpen(true);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
      {/* Front Side */}
      <div
        className='relative w-[240px] h-[360px] mt-2 rounded-2xl overflow-hidden shadow-xl group'
        onClick={handleFlip}
      >
        {/* Image Section */}
        <div
          className='w-full h-2/3 bg-cover bg-center rounded-t-2xl'
          style={{
            backgroundImage: `url(${img})`,
          }}
        ></div>

        {/* Text Section */}
        <div className='flex justify-between h-1/3 p-5 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 rounded-b-2xl'>
          <div>
            <h3 className='text-lg font-bold text-white tracking-wide'>
              {name}
            </h3>
            <p className='text-gray-300'>Age: {age}</p>
          </div>
          <button
            className='mt-2 h-[40px] w-[100px] py-[2px] text-center text-md font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-md hover:shadow-lg hover:opacity-90 active:scale-95 transition-all duration-300'
            onClick={handleVoteClick}
          >
            Vote Me
          </button>
          <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>
        <div className='absolute bottom-0 right-2 flex items-center text-sm text-gray-400 group-hover:text-gray-200 transition-colors'>
          <span className='mr-1'>Click to Flip</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 animate-spin-slow'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 4v16m8-8H4'
            />
          </svg>
        </div>
      </div>

      {/* Back Side */}
      <div
        className='relative w-[240px] h-[360px] mx-auto mt-6 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 flex items-center justify-center text-white text-xl font-semibold'
        onClick={handleFlip}
      >
        {/* <p>Vote for {name}!</p> */}
        <BackCard
          img={img}
          name={name}
          age={age}
          height={height}
          bio={bio}
          hobbies={hobbies}
        />
      </div>
    </ReactCardFlip>
  );
};

export default ContestantCard;
// import React, { useState } from 'react';
// import ReactCardFlip from 'react-card-flip';
// import BackCard from './BackCard';

// const ContestantCard = ({ img, name, age, bio, hobbies, height }) => {
//   const [isFlipped, setIsFlipped] = useState(false);

//   const handleFlip = () => {
//     setIsFlipped(!isFlipped);
//   };

//   const handleVoteClick = (event) => {
//     event.stopPropagation();
//     alert(`You voted for ${name}!`);
//   };

//   return (
//     <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
//       {/* Front Side */}
//       <div
//         className='relative w-[270px] h-[400px] mx-auto mt-6 rounded-2xl overflow-hidden shadow-xl group transition-transform duration-500 hover:scale-105 cursor-pointer'
//         onClick={handleFlip}
//       >
//         {/* Image Section */}
//         <div
//           className='w-full h-2/3 bg-cover bg-center rounded-t-2xl'
//           style={{
//             backgroundImage: `url(${img})`,
//           }}
//         ></div>

//         {/* Text Section */}
//         <div className='flex justify-between p-5 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 rounded-b-2xl'>
//           <div>
//             <h3 className='text-lg font-bold text-white tracking-wide'>
//               {name}
//             </h3>
//             <p className='text-gray-300'>Age: {age}</p>
//           </div>
//           <button
//             className='mt-2 w-[100px] py-[2px] text-center text-md font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-md hover:shadow-lg hover:opacity-90 active:scale-95 transition-all duration-300'
//             onClick={handleVoteClick}
//           >
//             Vote Me
//           </button>
//         </div>
//         {/* Flip Icon */}
//         <div className='absolute bottom-2 right-2 flex items-center text-sm text-gray-400 group-hover:text-gray-200 transition-colors'>
//           <span className='mr-1'>Click to Flip</span>
//           <svg
//             xmlns='http://www.w3.org/2000/svg'
//             className='h-5 w-5 animate-spin-slow'
//             fill='none'
//             viewBox='0 0 24 24'
//             stroke='currentColor'
//           >
//             <path
//               strokeLinecap='round'
//               strokeLinejoin='round'
//               strokeWidth={2}
//               d='M12 4v16m8-8H4'
//             />
//           </svg>
//         </div>
//       </div>

//       {/* Back Side */}
//       <div
//         className='relative w-[270px] h-[400px] mx-auto mt-6 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 flex items-center justify-center text-white text-xl font-semibold cursor-pointer'
//         onClick={handleFlip}
//       >
//         <BackCard
//           img={img}
//           name={name}
//           age={age}
//           height={height}
//           bio={bio}
//           hobbies={hobbies}
//         />
//         {/* Flip Back Icon */}
//         <div className='absolute bottom-2 left-2 flex items-center text-sm text-[#6f7f80]'>
//           <span className='mr-1'>Click to Flip Back</span>
//           <svg
//             xmlns='http://www.w3.org/2000/svg'
//             className='h-5 w-5 rotate-180'
//             fill='none'
//             viewBox='0 0 24 24'
//             stroke='currentColor'
//           >
//             <path
//               strokeLinecap='round'
//               strokeLinejoin='round'
//               strokeWidth={2}
//               d='M12 4v16m8-8H4'
//             />
//           </svg>
//         </div>
//       </div>
//     </ReactCardFlip>
//   );
// };

// export default ContestantCard;
