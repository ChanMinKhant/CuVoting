import { useEffect, useState } from 'react';
import { deleteVote, getVoteHistory } from '../../services/selection';

const VoteHistory = () => {
  const [voteHistory, setVoteHistory] = useState<any>([]);
  useEffect(() => {
    getVoteHistory().then((res) => {
      console.log(res.data);
      setVoteHistory(res.data);
    });
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteVote(id);
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
      {voteHistory.map((vote: any) => (
        <div
          key={vote.id}
          className='flex items-center justify-between border-b-2 border-gray-200 py-4'
        >
          <p className='mr-4'>{vote.selectionId.number}</p>
          <p className='mr-4'>{vote.selectionId.name}</p>
          <p className='mr-4'>{vote.selectionId.gender}</p>
          <p className='mr-4'>{vote.category}</p>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700'
            onClick={() => handleDelete(vote._id)}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default VoteHistory;
