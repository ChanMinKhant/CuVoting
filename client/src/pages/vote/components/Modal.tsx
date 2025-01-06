import { useEffect, useState } from 'react';
// memo
import { memo } from 'react';
import { vote } from '../../../services/selection';
import { useAppSelector } from '../../../store/store';
import { Link } from 'react-router-dom';

const GirlTitles = ['queen', 'attraction', 'glory', 'smile'];

const BoyTitles = ['king', 'smart', 'handsome'];

const CoupleTitles = ['bestCouple'];

const Modal = ({ isOpen, onClose, activeTab, selectionId }: any) => {
  const votingStarted = true;
  const [votes, setVotes] = useState<string[]>([]);
  const { userVotedTitles, status } = useAppSelector(
    (state) => state.selections
  );
  useEffect(() => {
    if (status === 'succeeded') {
      console.log(userVotedTitles);
    }
  }, [status]);
  useEffect(() => {
    if (activeTab === 'boy') {
      const filteredTitles = BoyTitles.filter(
        (title) => !userVotedTitles.includes(title)
      );
      console.log(filteredTitles);
      setVotes(filteredTitles);
    } else if (activeTab === 'girl') {
      const filteredTitles = GirlTitles.filter(
        (title) => !userVotedTitles.includes(title)
      );
      setVotes(filteredTitles);
    } else if (activeTab === 'couple') {
      const filteredTitles = CoupleTitles.filter(
        (title) => !userVotedTitles.includes(title)
      );
      setVotes(filteredTitles);
    }
  }, [activeTab]);

  const handleVouteClick = async (category: string) => {
    console.log(selectionId);
    console.log(category);
    try {
      const data = await vote(selectionId, category);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
              {votes.length > 0 ? (
                votes.map((category, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-center'
                  >
                    <span className='text-[#f50579] font-bold font-medium '>
                      {category}
                    </span>

                    <button
                      className='px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-full shadow-md hover:bg-blue-600 transition'
                      onClick={() => handleVouteClick(category)}
                    >
                      Vote
                    </button>
                  </div>
                ))
              ) : (
                <div>
                  <div className='text-center text-gray-600 text-lg font-medium'>
                    You have voted for all categories
                  </div>
                  <Link
                    to='/vote-history'
                    className='text-blue-500 hover:underline'
                  >
                    check your vote hostory
                  </Link>
                </div>
              )}
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
