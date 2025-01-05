import {
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
  memo,
} from 'react';
import ReactCardFlip from 'react-card-flip';
import BackCard from './BackCard';
import Modal from './Modal';
import FrontCard from './FrontCard';

const Card = forwardRef(
  (
    {
      selection,
      activeTab,
    }: { selection: any; activeTab: 'boy' | 'girl' | 'couple' },
    ref
  ) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(selection);
    // return;

    useImperativeHandle(ref, () => ({
      resetFlip: () => setIsFlipped(false),
    }));

    const handleFlip = useCallback((event: any) => {
      if (event.target.tagName === 'BUTTON' || event.target.closest('button')) {
        return; // Don't flip if a button is clicked
      }
      setIsFlipped((prev) => !prev);
    }, []);

    const closeModal = useCallback(() => setIsModalOpen(false), []);

    return (
      <div>
        <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
          <div
            className='relative w-[240px] mt-2 h-[360px] rounded-2xl overflow-hidden shadow-xl group'
            onClick={handleFlip}
          >
            <FrontCard selection={selection} setIsModalOpen={setIsModalOpen} />
          </div>

          <div
            className='relative w-[240px] h-[360px] mx-auto mt-2 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 flex items-center justify-center text-white text-xl font-semibold'
            onClick={handleFlip}
          >
            {/* <BackCard
            img={img}
            name={name}
            age={age}
            height={height}
            bio={bio}
            hobbies={hobbies}
            id={id}
          /> */}
          </div>
        </ReactCardFlip>

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          activeTab={activeTab}
        />
      </div>
    );
  }
);

export default memo(Card);
