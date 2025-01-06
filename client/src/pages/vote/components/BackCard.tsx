// memo
import { memo } from 'react';

const BackCard = () => {
  return (
    <div className='text-[#000000] border h-full bg-white shadow-xl flex flex-col justify-evenly items-center max-w-sm mx-auto rounded-xl overflow-hidden  hover:shadow-2xl transition-all duration-300 '>
      <div className='text-xl font-bold text-center text-red-500 animate-bounce bg-yellow-200 p-4 rounded-lg shadow-md'>
        noting here, hahaha 😂😂
      </div>
    </div>
  );
};

export default memo(BackCard);
