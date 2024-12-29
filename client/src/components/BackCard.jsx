import React from 'react';

const BackCard = ({ img, name, age, height, bio, hobbies }) => {
  return (
    <div className=' text-white max-w-sm mx-auto mt-2 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-purple-100 via-purple-600 to-indigo-800 hover:shadow-2xl transition-all duration-300'>
      {/* Profile Image */}
      <div className='relative w-full h-48 bg-gray-300'>
        <img
          src={img}
          alt={`${name}'s profile`}
          className='absolute inset-0 w-full h-full object-cover'
        />
      </div>

      {/* Card Content */}
      <div className='p-2'>
        {/* Name */}
        <h3 className='text-xl font-bold text-gray-100 text-center'>{name}</h3>

        {/* Age and Height */}
        <div className='flex justify-center gap-4 mt-2'>
          <p className='text-gray-200 text-sm'>
            <span className='font-semibold text-gray-300'>Age:</span> {age}
          </p>
          <p className='text-gray-200 text-sm'>
            <span className='font-semibold text-gray-300'>Height:</span>{' '}
            {height}
          </p>
        </div>

        {/* Divider */}
        <div className='my-2 border-t border-gray-300'></div>

        {/* Bio */}
        <p className='text-gray-300 text-sm text-center'>{bio}</p>

        {/* Hobbies */}
        <div className='mt-0 flex'>
          <h4 className='text-[17px] mr-2 font-semibold text-gray-100'>
            Hobbies:
          </h4>
          <ul className='list-disc text-sm list-inside mt-0 text-gray-200'>
            {hobbies.map((item, index) => (
              <li className='mt-[2px]' key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Buttons */}
        {/* <div className='mt-6 flex justify-center gap-4'>
          <button className='px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 hover:shadow-md transition duration-300'>
            Message
          </button>
          <button className='px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 hover:shadow-md transition duration-300'>
            Follow
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default BackCard;
