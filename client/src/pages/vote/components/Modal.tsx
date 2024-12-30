import { useState } from 'react';
// memo
import { memo } from 'react';

const Modal = ({ isOpen, onClose }: any) => {
  const votingStarted = true;
  console.log(isOpen, onClose);
  console.log('Modal rendered');
  const [votes, setVotes] = useState({
    smile: false,
    pretty: false,
    innocent: false,
  });

  const categories = [
    { id: 1, title: 'Smile', key: 'smile' },
    { id: 2, title: 'Pretty', key: 'pretty' },
    { id: 3, title: 'Innocent', key: 'innocent' },
  ];

  const toggleVote = (categoryKey) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [categoryKey]: !prevVotes[categoryKey],
    }));
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-xl w-full max-w-md p-6 shadow-lg'
        onClick={(e) => e.stopPropagation()}
      >
        {votingStarted ? (
          <div>
            <h2 className='text-xl font-bold text-gray-700 border-b pb-2 mb-4'>
              Vote for Categories
            </h2>
            <div className='grid gap-4'>
              {categories.map((category) => (
                <div
                  key={category.id}
                  className='flex justify-between items-center'
                >
                  <span className='text-[#f50579] font-bold font-medium '>
                    {category.title}
                  </span>
                  {votes[category.key] ? (
                    <button
                      className='px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-full shadow-md hover:bg-red-600 transition'
                      onClick={() => toggleVote(category.key)}
                    >
                      Unvote
                    </button>
                  ) : (
                    <button
                      className='px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-full shadow-md hover:bg-blue-600 transition'
                      onClick={() => toggleVote(category.key)}
                    >
                      Vote
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className='text-center border-b-2 text-gray-600 text-lg font-medium'>
            The voting period hasn't begun yet.
          </div>
        )}
        <div className='flex justify-end mt-6'>
          <button
            className='px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg shadow-md hover:bg-gray-400 transition'
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Modal);
