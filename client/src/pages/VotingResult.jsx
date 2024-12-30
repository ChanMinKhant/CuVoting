import React from 'react';
import { Progress } from 'antd';
import 'antd/dist/reset.css';
import { Link } from 'react-router-dom';
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
  const allowed = false;
  if (!allowed) {
    return (
      <div className='w-full h-[100vh] flex justify-center items-center bg-gradient-to-b from-blue-100 to-white'>
        <div className='text-center flex flex-col h-full p-8 rounded-lg shadow-2xl bg-white border border-gray-200'>
          <div className='mt-[30px] text-2xl font-bold text-gray-500'>
            <img
              src='/hidden.png'
              alt='Exciting'
              className='mx-auto mb-6 w-[130px] h-[130px]'
            />
            {/* animate-bounce */}
          </div>
          <div className='text-lg font-semibold text-gray-800 mb-4'>
            We have decided to hide the results until the selection is over to
            make things more exciting.
          </div>
          <p className='text-gray-600 italic mb-6'>
            Come back when the selection is over.
          </p>
          <Link
            to='/home'
            className='text-white bg-blue-500 px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition'
          >
            Go back to Home
          </Link>
          {/* <div className='h-4 w-4 mx-auto bg-gray-500 rounded-full animate-bounce mt-[20px]'></div> */}
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
          <div key={person.id} className='my-4 border-t pt-2'>
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
          Winner: <span className='font-normal'>Diana (40 votes)</span>
        </div>
        <div className='text-xl text-[gold] text-center p-2 my-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-lg shadow-lg shadow-pink-500/50'>
          Congratulation Diana 🏆.
        </div>
      </div>
    </div>
  );
};

export default VotingResult;
