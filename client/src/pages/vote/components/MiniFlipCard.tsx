import './mini.css';

const MiniFlipCard = () => {
  console.log('MiniFlipCard');
  return (
    <div className='relative w-[20px] h-[30px] perspective flex'>
      <div className='mini-flip-card '>
        {/* Front Side */}
        <div className='absolute w-full h-full bg-blue-500 text-white text-[8px] flex items-center justify-center rounded-lg backface-hidden '>
          Front
        </div>
        {/* Back Side */}
        <div className='absolute w-full h-full bg-[black] text-white text-[8px] flex items-center justify-center rounded-lg backface-hidden transform rotate-y-180'>
          Flip
        </div>
      </div>
    </div>
  );
};

export default MiniFlipCard;
