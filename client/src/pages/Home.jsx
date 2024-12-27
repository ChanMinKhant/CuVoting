import { Link } from 'react-router-dom';
import CardSwiper from '../components/CardSwiper';
import VotingAnimation from '../components/VotingAnimation';
// import './home.css';
function Home() {
  return (
    <div className='w-full h-full p-4 mt-[50px] flex flex-col '>
      <div className='flex flex-col sm:flex-row  w-full justify-evenly'>
        <div className='w-full sm:w-[45%] text-center my-2 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 text-gray-800 mx-2 p-2 addbg rounded-md shadow-md'>
          {' '}
          <h2 className='text-center font-bold text-lg mb-[10px]'>
            "Welcome, Developers! 👩‍💻👨‍💻"
          </h2>
          <div className=' font-medium sm:text-[17px] text-sm'>
            In the court of Pyay Computer University, your vote holds the power
            to crown the next royal sovereign.Your choice. Your university. Your
            vote matters.
            {/* <button class='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded ml-2'>
              Vote
            </button> */}
          </div>
        </div>
        <hr className='border-t-2 border-gray-300 my-2 rounded-full m-auto w-[50%] sm:hidden' />

        <div className='my-2 sm:text-[17px] text-sm w-full sm:w-[45%]'>
          <div>Choose categorie to vote</div>
          <Link
            to='/vote/boys'
            className='w-full border-b-2 flex justify-between px-2 my-4'
          >
            <div>Boys</div>
            <img
              src='/right-up.png'
              alt='image'
              className='sm:w-6 sm:h-6 w-4 h-4'
            />
            {/* <button class='bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-1 px-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 text-sm transition-transform duration-300'>
              Vote Now
            </button> */}
          </Link>
          <Link
            to='/vote/girls'
            className='w-full border-b-2 flex justify-between px-2 my-4'
          >
            <div>girls</div>
            <img
              src='/right-up.png'
              alt='image'
              className='sm:w-6 sm:h-6 w-4 h-4'
            />
          </Link>
          <Link
            to='/vote/cluples'
            className='w-full border-b-2 flex justify-between px-2 my-4'
          >
            <div>couple</div>
            <img
              src='/right-up.png'
              alt='image'
              className='sm:w-6 sm:h-6 w-4 h-4'
            />
          </Link>
        </div>
      </div>

      {/* <img
        src='/bg1.jpeg'
        className='w-[100vw] sm:w-1/2 h-[200px] sm-[150px] overflow-hidden'
        alt=''
      /> */}
      {/* <div className='text-sm py-2 text-center bg-[#f1f5f8] mb-2 rounded-md'>
        Hear ye, hear ye! See the candidates
      </div> */}
      <div className='sm:text-[18px] text:sm sm:py-3 py-[3px] text-center bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 text-gray-800 mb-4 rounded-lg shadow-md sm:w-[93%] w-[100%] mx-auto sm:mt-4 mt-0'>
        Meet the Candidates for Selection
      </div>

      <CardSwiper />
      <hr className='border-t-2 border-gray-300 my-4 rounded-full m-auto w-[50%]' />

      <div className='text-center text-sm my-2 px-2'>
        "The person you vote for today might become your partner one day. So,
        choose your vote wisely! 🤔"
      </div>
      <VotingAnimation />
    </div>
  );
}

export default Home;
