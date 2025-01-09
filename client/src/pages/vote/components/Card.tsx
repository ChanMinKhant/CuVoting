import { useState, useCallback, memo } from 'react';
import ReactCardFlip from 'react-card-flip';
import BackCard from './BackCard';
import FrontCard from './FrontCard';

const Card = ({ selection, activeTab }: any) => {
  const [isFlipped, setIsFlipped] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log(selection);
  // return;

  // if (true) {
  //   console.log(selection);
  //   return;
  // }

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
          <FrontCard
            selection={selection}
            // setIsModalOpen={setIsModalOpen}
            activeTab={activeTab}
          />
        </div>

        <div
          className='relative w-[240px] h-[360px] mx-auto mt-2 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 flex items-center justify-center text-white text-xl font-semibold'
          onClick={handleFlip}
        >
          <BackCard
          // img={img}
          // name={name}
          // age={age}
          // height={height}
          // bio={bio}
          // hobbies={hobbies}
          // id={id}
          />
        </div>
      </ReactCardFlip>

      {/* <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          activeTab={activeTab}
        /> */}
    </div>
  );
};

export default memo(Card);
