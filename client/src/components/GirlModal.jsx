import { useState } from 'react';

const GirlModal = ({ isOpen, onClose }) => {
  const [votes, setVotes] = useState({
    smileQueen: 0,
    stylish: 0,
    mostHelpful: 0,
  });
  const catas = [
    {
      id: 1,
      title: 'smile',
    },
    {
      id: 2,
      title: 'pretty',
    },
    {
      id: 3,
      title: 'innocent',
    },
  ];

  const handleVoteChange = (category) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [category]: prevVotes[category] + 1,
    }));
    // onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-lg w-96 p-6'
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className='text-2xl font-semibold mb-4'>Vote for Categories</h2>

        {/* Vote for Smile Queen */}
        <div className='mb-4'>
          {catas.map((cata) => (
            <div>
              <p className='font-medium'>Vote for {cata.title}</p>
              <button
                className='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                onClick={() => handleVoteChange('smileQueen')}
              >
                Vote {cata.title}
              </button>
              <p className='mt-2 text-gray-700'>Votes: {votes.smileQueen}</p>
            </div>
          ))}
          {/* <p className='font-medium'>Vote for Smile Queen</p>
          <button
            className='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            onClick={() => handleVoteChange('smileQueen')}
          >
            Vote Smile Queen
          </button>
          <p className='mt-2 text-gray-700'>Votes: {votes.smileQueen}</p>*/}
        </div>

        <div className='flex justify-end mt-4'>
          <button
            className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GirlModal;
