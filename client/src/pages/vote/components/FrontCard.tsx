// memo
import { memo } from 'react';
import { useAppDispatch } from '../../../store/store';
import { openModal, setName } from '../../../store/features/modalSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component'; // Import LazyLoadImage
import 'react-lazy-load-image-component/src/effects/blur.css'; // Import blur effect
import { backendUrl } from '../../../services/api';

function FrontCard({ selection, activeTab }: any) {
  const dispatch = useAppDispatch();

  const handleVoteClick = (event: any) => {
    event.stopPropagation(); // Prevent card flip
    dispatch(openModal({ activeTab, selectionId: selection._id }));
    dispatch(setName(selection?.name));
  };

  return (
    <div className='relative w-full aspect-[2/3] overflow-hidden rounded-2xl shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
      <div className='relative w-full h-full bg-white rounded-xl overflow-hidden'>
        {/* Lazy Loaded Image with Blur Effect */}
        <LazyLoadImage
          src={`${backendUrl}/webp/${selection?.number}${
            selection?.gender === 'boy' ? 'b' : 'g'
          }.webp`}
          alt={`Contestant ${selection?.name}`}
          effect='blur'
          className='w-full h-full object-cover transition-transform duration-500 hover:scale-105 contrast-30'
        />
        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent'></div>
        {/* <div className='absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-transparent'></div> */}
        {/* Card Details */}
        <div className='absolute bottom-0 left-0 p-4 text-white text-left'>
          <h2
            className={`text-2xl font-extrabold mb-3 ${
              selection?.name?.length > 15 ? 'text-xl' : ''
            }`}
          >
            {selection?.name}
          </h2>
          <p className='text-sm opacity-90'>
            Height: {Math.round(selection?.height)}
          </p>
          <p className='text-sm opacity-90'>Age: {18}</p>
        </div>
        {/* Badge */}
        <div
          className={`absolute top-3 left-3 rounded-full px-4 py-1 shadow-md ${
            selection?.gender === 'boy'
              ? 'bg-gradient-to-r from-green-300 to-green-400'
              : 'bg-gradient-to-r from-pink-500 to-purple-500'
          }`}
        >
          <span className='text-white font-bold px-2 rounded'>
            #{selection?.number}
          </span>
        </div>
        {/* Vote Button */}
        {activeTab !== 'couple' ? (
          <button
            className={`absolute bottom-4 right-4 px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 shadow-lg transform focus:outline-none bg-white/20 text-[#fccc1c] backdrop-blur-sm hover:bg-white/40 hover:scale-105`}
            onClick={(event) => handleVoteClick(event)}
          >
            vote me
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default memo(FrontCard);
