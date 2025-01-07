import { useEffect, useState } from 'react';
import { deleteVote, getVoteHistory } from '../../services/selection';
import { useNavigate } from 'react-router-dom';
import { removeUserVotedTitles } from '../../store/features/selectionSlice';
import { useAppDispatch } from '../../store/store';

const VoteHistory = () => {
  const [voteHistory, setVoteHistory] = useState<any>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); // Move this line to the top level of the component
  useEffect(() => {
    getVoteHistory().then((res) => {
      console.log(res.data);
      setVoteHistory(res.data);
    });
  }, []);

  const handleDelete = async (id: string, category: string) => {
    try {
      await deleteVote(id);
      dispatch(removeUserVotedTitles(category));
      const updatedVoteHistory = voteHistory.filter(
        (vote: any) => vote._id !== id
      );
      setVoteHistory(updatedVoteHistory);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Vote History</h1>
      <button
        className='bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700'
        onClick={() => navigate('/home')}
      >
        Back to Home
      </button>
      {voteHistory.map((vote: any) => (
        <div
          key={vote._id}
          className='flex items-center justify-between border-b-2 border-gray-200 py-4'
        >
          <p className='mr-4'>{vote.selectionId.number}</p>
          <p className='mr-4'>{vote.selectionId.name}</p>
          <p className='mr-4'>{vote.selectionId.gender}</p>
          <p className='mr-4'>{vote.category}</p>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700'
            onClick={() => handleDelete(vote._id, vote.category)}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default VoteHistory;
