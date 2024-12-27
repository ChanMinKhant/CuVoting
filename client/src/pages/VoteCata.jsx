import { Link } from 'react-router-dom';

function VoteCata() {
  return (
    <div className='mx-auto w-full h-[100vh] flex flex-col justify-center items-center mt-[50px] bg-gray-100'>
      <Link
        className='px-6 py-3 bg-blue-500 text-white rounded-lg mb-4 text-lg hover:bg-blue-600'
        to='/vote/girls'
      >
        Girls
      </Link>
      <Link
        className='px-6 py-3 bg-green-500 text-white rounded-lg mb-4 text-lg hover:bg-green-600'
        to='/vote/boys'
      >
        Boys
      </Link>
      <Link
        className='px-6 py-3 bg-red-500 text-white rounded-lg text-lg hover:bg-red-600'
        to='/vote/couples'
      >
        Couples
      </Link>
    </div>
  );
}

export default VoteCata;
