import { useEffect, useState } from 'react';
import { deleteVote, getVoteHistory } from '../../services/selection';
import { useNavigate } from 'react-router-dom';
import { removeUserVotedTitles } from '../../store/features/selectionSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import Loader from '../../components/Loader';

const VoteHistory = () => {
  const [voteHistory, setVoteHistory] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selections, status } = useAppSelector((state) => state.selections);

  useEffect(() => {
    setIsLoading(true);
    getVoteHistory().then((res) => {
      console.log(res.data);

      setVoteHistory(res.data);
      setIsLoading(false);
    });
  }, []);

  const handleDelete = async (id: string, category: string) => {
    setDeletingId(id);
    try {
      await deleteVote(id);
      dispatch(removeUserVotedTitles(category));
      const updatedVoteHistory = voteHistory.filter(
        (vote: any) => vote._id !== id
      );
      setVoteHistory(updatedVoteHistory);
    } catch (error: any) {
      console.log(error);
    } finally {
      setDeletingId(null);
    }
  };

  //bceacue in the system vote for boy when vote the couple title. show i need to show also girl name to show
  const getGirlNameForCouple = (number: string) => {
    if (status === 'succeeded') {
      return (
        selections.find(
          (selection: any) =>
            selection.number === Number(number) && selection.gender === 'girl'
        )?.name || 'Unknown'
      );
    }
  };

  return (
    <div className='p-6 md:p-10 bg-gradient-to-br from-gray-100 to-white rounded-lg shadow-2xl'>
      <h1 className='text-4xl font-bold mb-8 text-center text-indigo-600 animate-fadeInDown'>
        Vote History
      </h1>
      <button
        className='bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700 mb-4'
        onClick={() => navigate('/home')}
      >
        Back to Home
      </button>
      {!isLoading ? (
        <div className='space-y-6'>
          {voteHistory.map((vote: any) => (
            <div
              key={vote?._id}
              className='bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between transition-transform duration-300 ease-in-out transform hover:translate-y-1 hover:shadow-2xl'
            >
              <div className='flex-1 mb-4 md:mb-0'>
                <p className='text-2xl font-semibold text-indigo-500 animate-pulse'>{`#${vote?.selectionId?.number}`}</p>
                <p className='text-lg text-gray-700'>
                  {vote?.selectionId?.name}{' '}
                  {vote.category === 'bestCouple'
                    ? ` & ${getGirlNameForCouple(vote?.selectionId?.number)}`
                    : ''}
                </p>
                <p className='text-gray-500'>
                  {vote.category === 'bestCouple'
                    ? 'Couple'
                    : vote?.selectionId?.gender}
                </p>
                <p className='text-gray-500'>{vote?.category}</p>
              </div>
              <button
                className='bg-red-600 text-white px-5 py-2 rounded-lg shadow hover:bg-red-700 transition-colors duration-300'
                onClick={() => handleDelete(vote?._id, vote?.category)}
                disabled={deletingId === vote?._id}
              >
                {deletingId === vote?._id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          ))}
          {voteHistory.length === 0 && (
            <p className='text-gray-500 text-center animate-bounce'>
              No votes found.
            </p>
          )}
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default VoteHistory;
