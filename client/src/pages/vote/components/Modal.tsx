import { useEffect, useState } from 'react';
// memo
import { memo } from 'react';
import { vote } from '../../../services/selection';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { Link } from 'react-router-dom';
import { addUserVotedTitles } from '../../../store/features/selectionSlice';
import { closeModal } from '../../../store/features/modalSlice';

const GirlTitles = ['queen', 'attraction', 'glory', 'smile'];

const BoyTitles = ['king', 'smart', 'handsome'];

const CoupleTitles = ['bestCouple'];

const Modal = () => {
  const votingStarted = true;
  const [votes, setVotes] = useState<string[]>([]);
  const [isVoting, setIsVoting] = useState<{ [key: string]: boolean }>({}); // Add state for voting loading

  const { isOpen, activeTab, selectionId, name } = useAppSelector(
    (state) => state.modal
  );
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(closeModal());
  };

  const { userVotedTitles, status } = useAppSelector(
    (status) => status.selections
  );

  useEffect(() => {
    let filteredTitles: string[] = [];

    if (status === 'succeeded') {
      if (activeTab === 'boy') {
        filteredTitles = BoyTitles.filter(
          (title) => !userVotedTitles.includes(title)
        );
      } else if (activeTab === 'girl') {
        filteredTitles = GirlTitles.filter(
          (title) => !userVotedTitles.includes(title)
        );
      } else if (activeTab === 'couple') {
        filteredTitles = CoupleTitles.filter(
          (title) => !userVotedTitles.includes(title)
        );
      }
      setVotes(filteredTitles);
    }
  }, [status, activeTab, userVotedTitles]);

  const handleVoteClick = async (category: string) => {
    setIsVoting((prev) => ({ ...prev, [category]: true })); // Start voting loading
    try {
      if (selectionId) {
        await vote(selectionId, category);
        dispatch(addUserVotedTitles(category));
        setVotes((prev) => prev.filter((title) => title !== category));
      }
    } catch (error: any) {
      console.log('error voting');
      if (error.data?.message === 'You have already voted for this title') {
        dispatch(addUserVotedTitles(category));
        setVotes((prev) => prev.filter((title) => title !== category));
      }
    } finally {
      setIsVoting((prev) => ({ ...prev, [category]: false })); // End voting loading
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-xl w-full max-w-md p-6 shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        onClick={(e) => e.stopPropagation()}
      >
        {votingStarted ? (
          <div>
            <h2 className='text-xl font-bold text-gray-700 border-b pb-2 mb-4'>
              Vote for {name}
            </h2>
            <div className='grid gap-4'>
              {votes.map((category, index) => (
                <div key={index} className='flex justify-between items-center'>
                  <span className='text-[#f50579] font-bold font-medium '>
                    {category}
                  </span>

                  <button
                    className='px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-full shadow-md hover:bg-blue-600 transition'
                    onClick={() => handleVoteClick(category)}
                    disabled={isVoting[category]} // Disable button while voting
                  >
                    {isVoting[category] ? (
                      <div>voting...</div> // Display loader when voting
                    ) : (
                      'Vote'
                    )}
                  </button>
                </div>
              ))}
              <div className='text-center mt-4'>
                <Link
                  to='/vote-history'
                  className='text-blue-500 hover:underline'
                >
                  Check your vote history
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className='text-center border-b-2 text-gray-600 text-lg font-medium'>
            The voting period hasn't begun yet for you.
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
