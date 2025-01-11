// import { useState } from 'react';

// const CoupleCard: React.FC = () => {
//   const [activeImage, setActiveImage] = useState<'first' | 'second' | null>(
//     'first',
//   );

//   return (
//     <div className='relative flex justify-center items-center min-h-screen bg-gray-100'>
//       <div className='w-[300px] relative'>
//         {/* First Image */}
//         <div
//           className={`absolute transition-all duration-500 ${
//             activeImage === 'first'
//               ? 'z-20 w-[200px] h-[300px]'
//               : 'z-10 w-[150px] h-[225px] rotate-[8deg]'
//           } `}
//           style={{ right: activeImage === 'first' ? '50px' : '0px' }}
//           onClick={() => setActiveImage('first')}
//         >
//           <img
//             src='img.jpg'
//             alt='First Tilted Image'
//             className='w-full h-full object-cover rounded-lg shadow-lg cursor-pointer'
//           />
//         </div>

//         {/* Second Image */}
//         <div
//           className={`absolute transition-all duration-500 ${
//             activeImage === 'second'
//               ? 'z-20 w-[200px] h-[300px]'
//               : 'z-10 w-[160px] h-[240px] -rotate-[8deg]'
//           } `}
//           style={{ left: activeImage === 'second' ? '50px' : '10px' }}
//           onClick={() => setActiveImage('second')}
//         >
//           <img
//             src='img.jpg'
//             alt='Second Tilted Image'
//             className='w-full h-full object-cover rounded-lg shadow-lg cursor-pointer'
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CoupleCard;
import { useState } from 'react';

const CoupleCard: React.FC = () => {
  const [activeImage, setActiveImage] = useState<'first' | 'second' | null>(
    'first',
  );

  return (
    <div className='relative flex justify-center items-center mt-4 bg-gray-100'>
      <div className='w-[300px] relative'>
        {/* First Image */}
        <div
          className={`absolute transition-all duration-500 ${
            activeImage === 'first'
              ? 'z-20 w-[200px] h-[300px]'
              : 'z-10 w-[150px] h-[225px] rotate-[8deg]'
          }`}
          style={{ right: activeImage === 'first' ? '50px' : '0px' }}
          onClick={() => setActiveImage('first')}
        >
          <div className='relative w-full h-full'>
            {/* Image */}
            <img
              src='img.jpg'
              alt='First Tilted Image'
              className='w-full h-full object-cover rounded-lg shadow-lg cursor-pointer'
            />
            {/* Dark Overlay */}
            <div
              className={`absolute transition-all duration-500 inset-0 bg-gradient-to-t ${
                activeImage === 'first'
                  ? ' from-black/80 via-black/20 to-transparent'
                  : 'from-black/100 via-black/60 to-transparent'
              } rounded-lg`}
            ></div>
            {/* Text Content */}
            <div className='absolute bottom-3 left-3 text-white text-xs space-y-1'>
              <p className='font-bold'>Name: John Doe</p>
              <p>Height: 6'0"</p>
              <p>Age: 25</p>
            </div>
          </div>
        </div>

        {/* Second Image */}
        <div
          className={`absolute transition-all duration-500 ${
            activeImage === 'second'
              ? 'z-20 w-[200px] h-[300px]'
              : 'z-10 w-[160px] h-[240px] -rotate-[8deg]'
          }`}
          style={{ left: activeImage === 'second' ? '50px' : '10px' }}
          onClick={() => setActiveImage('second')}
        >
          <div className='relative w-full h-full'>
            {/* Image */}
            <img
              src='img.jpg'
              alt='Second Tilted Image'
              className='w-full h-full object-cover rounded-lg shadow-lg cursor-pointer'
            />
            {/* Dark Overlay */}
            <div
              className={`absolute transition-all duration-500 inset-0 bg-gradient-to-t${
                activeImage === 'second'
                  ? ' from-black/80 via-black/20 to-transparent'
                  : 'from-black/100 via-black/60 to-transparent'
              } rounded-lg`}
            ></div>
            {/* Text Content */}
            <div className='absolute bottom-3 left-3 text-white text-xs space-y-1 '>
              <p className='font-bold'>Name: Jane Doe</p>
              <p>Height: 5'8"</p>
              <p>Age: 24</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoupleCard;
