import { Link } from 'react-router-dom';

function Card({ img, name, id }) {
  return (
    <div className='flex flex-col justify-evenly p-1 bg-[#f2f5f8] rounded-md w-[180px] h-[250px] z-0'>
      <Link
        to={`/candidates/:${id}`}
        className='w-full h-[130px] overflow-hidden'
      >
        <img src={img} alt='' className='w-full rounded-md' />
      </Link>
      <div className='flex flex-col h-[45%] justify-evenly items-start'>
        <div className='text-base font-bold'>{name}</div>
        <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded'>
          Vote
        </button>
        <Link
          to={`/candidates/:${id}`}
          className='text-xs text-purple-600 font-bold'
        >
          see more
        </Link>
        <div className='flex'>
          <img
            src='/facebook.png'
            className='w-5 h-5 rounded-full mr-3'
            alt=''
          />
          <img src='/instagram.png' className='w-5 h-5 rounded-full' alt='' />
        </div>
      </div>
    </div>
  );
}

export default Card;
