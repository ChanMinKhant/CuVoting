import { useEffect } from 'react';
import CardSwiper from './components/CardSwiper';
import VotingAnimation from './components/VotingAnimation';
import { getAllSelections } from '../../services/selection';
// import './home.css';
function VotingPage() {
  // call get all slection

  useEffect(() => {
    const fetchdata = async () => {
      const data = await getAllSelections();
      console.log(data);
    };
    fetchdata();
  }, []);
  return (
    <div className='w-full h-full p-4 mt-0 flex flex-col '>
      <div className='text-center my-0'>
        <h1 className='text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-500'>
          UCS(Pyay) Voting
        </h1>
        <p className='text-[14px] font-semibold text-gray-600 mt-[3px]'>
          Every Vote Matters
        </p>
      </div>

      {/* <div className='flex flex-col sm:flex-row  w-full justify-evenly'> */}
      <hr className='border-t-2 border-gray-300 my-2 rounded-full m-auto w-[50%] sm:hidden' />
      <CardSwiper />
      <hr className='border-t-2 border-gray-300 my-4 rounded-full m-auto w-[50%]' />

      <div className='text-center text-sm my-2 px-2 text-gray-600'>
        "The person you vote for today might become your partner one day. So,
        choose your vote wisely! 🤔"
      </div>
      <br />
      <br />
      {/* <button class='bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-1 px-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 text-sm transition-transform duration-300'>
              Vote Now
            </button> */}
      <VotingAnimation />
    </div>
  );
}

export default VotingPage;
