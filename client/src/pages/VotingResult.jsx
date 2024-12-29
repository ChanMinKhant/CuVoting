import React from 'react';
import { Progress } from 'antd';
import 'antd/dist/reset.css';
const contestants = [
  {
    id: 1,
    name: 'Alice',
    voteCount: 45,
  },
  {
    id: 2,
    name: 'Bob',
    voteCount: 30,
  },
  {
    id: 3,
    name: 'Charlie',
    voteCount: 25,
  },
  {
    id: 4,
    name: 'Diana',
    voteCount: 50,
  },
  {
    id: 5,
    name: 'Eve',
    voteCount: 10,
  },
];

const totalVotes = contestants.reduce(
  (sum, contestant) => sum + contestant.voteCount,
  0,
);
const percentages = contestants.map((contestant) => ({
  ...contestant,
  percentage: ((contestant.voteCount / totalVotes) * 100).toFixed(2), // Format to 2 decimal places
}));
const VotingResult = () => {
  const allowed = true;
  if (!allowed) {
    return (
      <div className='w-full p-4 h-[100vh] flex justify-center items-center'>
        <div className='text-center'>
          We have decided to hide the results untill the selection is over to
          make things more exicting.
        </div>
      </div>
    );
  }
  return (
    <div className='px-2 py-2 my-2 w-full h-full'>
      <div className='px-4 py-2 border rounded-full max-w-[300px] h-[50px] flex items-center justify-between'>
        <label htmlFor='category' className='text-sm font-medium'>
          Choose Category:
        </label>
        <select
          id='category'
          name='category'
          className='ml-2 bg-white border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500'
        >
          <option value='king'>King</option>
          <option value='queen'>Queen</option>
          <option value='bestCouple'>Best Couple</option>
          <option value='bestDressed'>Best Dressed</option>
          <option value='mostTalented'>Most Talented</option>
        </select>
      </div>
      <div className='border-b-2'>
        {percentages.map((person) => (
          <div key={person.id} className='my-4 border-t'>
            <div className='flex justify-between mb-[-10px]'>
              <h4 className='text-[15px]'>{person.name}</h4>
              <div className='text-[13px]'>
                {person.voteCount}/{totalVotes}
              </div>
            </div>
            <Progress percent={person.percentage} />
          </div>
        ))}
      </div>
      <div>
        <div className='font-bold my-2'>
          Total Votes : <span className='font-normal'>{totalVotes}</span>
        </div>
        <div className='font-bold my-2'>
          Titel : <span className='font-normal'>Queen</span>
        </div>
        <div className='font-bold my-2'>
          Winner: <span className='font-normal'>Natalia (40 votes)</span>
        </div>
        <div className='text-xl text-[gold] text-center p-2 my-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-lg shadow-lg shadow-pink-500/50'>
          Congratulation Natalia 🏆.
        </div>
      </div>
    </div>
  );
};

export default VotingResult;
