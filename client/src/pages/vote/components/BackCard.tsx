// memo
import { memo } from 'react';

const BackCard = ({ img, name, age, height, bio, hobbies }: any) => {
  console.log('BackCard rendered');
  return (
    <div className='text-[#000000] border h-full bg-white shadow-xl flex flex-col justify-evenly items-center max-w-sm mx-auto rounded-xl overflow-hidden  hover:shadow-2xl transition-all duration-300 '>
      {/* bg-gradient-to-br from-purple-100 via-purple-600 to-indigo-800 */}
      {/* Profile Image */}
      <div className='p-2 rounded-full shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff,inset_10px_10px_20px_#bebebe,inset_-10px_-10px_10px_#ffffff]'>
        <div className='relative rounded-full overflow-hidden w-[100px] h-[100px] bg-gray-300'>
          <img
            src={img}
            alt={`${name}'s profile`}
            className='absolute inset-0 w-full h-full object-cover'
          />
        </div>
      </div>

      {/* Card Content */}
      <div className='p-2'>
        {/* Name */}
        <h3 className='text-xl font-bold text-[#7502a6] text-center'>{name}</h3>

        {/* Age and Height */}
        <div className='flex justify-center gap-4 mt-2'>
          <p className='text-gray-700 text-sm'>
            <span className='font-semibold text-gray-500'>Age:</span> {age}
          </p>
          <p className='text-gray-700 text-sm'>
            <span className='font-semibold text-gray-500'>Height:</span>{' '}
            {height}
          </p>
        </div>

        {/* Divider */}
        <div className='my-2 border-t border-gray-6'></div>

        {/* Bio */}
        <p className='text-gray-500 text-sm text-center'>{bio}</p>

        {/* Hobbies */}
        <div className='mt-0 flex'>
          <h4 className='text-[17px] mr-2 font-semibold text-gray-900'>
            Hobbies:
          </h4>
          <ul className='list-disc text-sm list-inside mt-0 text-gray-700'>
            {hobbies.map((item: any, index: any) => (
              <li className='mt-[2px]' key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(BackCard);
