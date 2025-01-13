import { useState, useCallback, memo } from 'react';
import ReactCardFlip from 'react-card-flip';
import BackCard from './BackCard';
import FrontCard from './FrontCard';
// import { LazyLoadImage } from 'react-lazy-load-image-component'; // Import LazyLoadImage
import 'react-lazy-load-image-component/src/effects/blur.css'; // Import blur effect

const Card = ({ selection, activeTab }: any) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = useCallback((event: any) => {
    if (event.target.tagName === 'BUTTON' || event.target.closest('button')) {
      return; // Don't flip if a button is clicked
    }
    setIsFlipped((prev) => !prev);
  }, []);

  return (
    <div>
      <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
        <div
          className='relative w-[240px] mt-2 h-[360px] rounded-2xl overflow-hidden shadow-xl group'
          onClick={handleFlip}
        >
          <FrontCard selection={selection} activeTab={activeTab} />
        </div>

        <div
          className='relative w-[240px] h-[360px] mx-auto mt-2 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 flex items-center justify-center text-white text-xl font-semibold'
          onClick={handleFlip}
        >
          <BackCard selection={selection} />
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default memo(Card);
