// import React from 'react';
// import './backCard.css';
// const BackCard = ({ img, name, age }) => {
//   return (
//     <div className='relative w-[270px] h-[400px] mx-auto mt-6 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 group animate-cardEffect'>
//       <div
//         className='w-full h-2/3 bg-cover bg-center rounded-t-2xl'
//         style={{
//           backgroundImage: `url(${img})`,
//         }}
//       ></div>

//       <div className='p-5'>
//         <h3 className='text-lg font-bold text-white tracking-wide'>{name}</h3>
//         <p className='text-gray-300'>Age: {age}</p>

//         <button className='mt-4 w-full py-2 text-center text-lg font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-md hover:shadow-lg hover:opacity-90 active:scale-95 transition-all duration-300'>
//           Vote Me
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BackCard;

import React from 'react';

const BackCard = ({ img, name, age, height, bio, hobbies }) => {
  return (
    <div className='max-w-sm mx-auto mt-10 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 via-white to-gray-50 hover:shadow-2xl transition-all duration-300'>
      {/* Profile Image */}
      <div className='relative w-full h-48 bg-gray-300'>
        <img
          src={img}
          alt={`${name}'s profile`}
          className='absolute inset-0 w-full h-full object-cover'
        />
      </div>

      {/* Card Content */}
      <div className='p-6'>
        {/* Name */}
        <h3 className='text-2xl font-bold text-gray-800 text-center'>{name}</h3>

        {/* Age and Height */}
        <div className='flex justify-center gap-4 mt-2'>
          <p className='text-gray-600 text-sm'>
            <span className='font-semibold text-gray-800'>Age:</span> {age}
          </p>
          <p className='text-gray-600 text-sm'>
            <span className='font-semibold text-gray-800'>Height:</span>{' '}
            {height}
          </p>
        </div>

        {/* Divider */}
        <div className='my-4 border-t border-gray-300'></div>

        {/* Bio */}
        <p className='text-gray-700 text-sm text-center'>{bio}</p>

        {/* Hobbies */}
        <div className='mt-4'>
          <h4 className='text-lg font-semibold text-gray-800'>Hobbies:</h4>
          <ul className='list-disc list-inside mt-2 space-y-1 text-gray-600'>
            {hobbies.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Buttons */}
        <div className='mt-6 flex justify-center gap-4'>
          <button className='px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 hover:shadow-md transition duration-300'>
            Message
          </button>
          <button className='px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 hover:shadow-md transition duration-300'>
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackCard;
