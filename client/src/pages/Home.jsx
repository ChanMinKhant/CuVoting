import { Link } from 'react-router-dom';
import CardSwiper from '../components/CardSwiper';
// import './home.css';
function Home() {
  return (
    <div className='w-full h-full p-4 mt-[60px] flex flex-col'>
      <div className='flex flex-col sm:flex-row  w-full justify-evenly'>
        <div className='w-full sm:w-[45%] text-center my-2 bg-[#f1f5f8] mx-2 py-2 addbg rounded-md'>
          {' '}
          <h2 className='text-center font-bold text-lg'>
            "Welcome, Developers! 👩‍💻👨‍💻"
          </h2>
          <div className=' font-medium '>
            In the court of Pyay Computer University, your vote holds the power
            to crown the next royal sovereign.Your choice. Your university. Your
            vote matters.{' '}
          </div>
        </div>
        <hr class='border-t-2 border-gray-300 my-4 rounded-full m-auto w-[50%] sm:hidden' />

        <div className='my-2  w-full sm:w-[45%]'>
          <Link
            to='/boys'
            className='w-full border-b-2 flex justify-between px-2 my-4'
          >
            <div>Boys</div>
            <img src='/right-up.png' alt='image' className='w-6 h-6' />
            {/* <button class='bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-1 px-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 text-sm transition-transform duration-300'>
              Vote Now
            </button> */}
          </Link>
          <Link
            to='/girls'
            className='w-full border-b-2 flex justify-between px-2 my-4'
          >
            <div>girls</div>
            <img src='/right-up.png' alt='image' className='w-6 h-6' />
          </Link>
          <Link
            to='/cluples'
            className='w-full border-b-2 flex justify-between px-2 my-4'
          >
            <div>couple</div>
            <img src='/right-up.png' alt='image' className='w-6 h-6' />
          </Link>
        </div>
      </div>

      {/* <img
        src='/bg1.jpeg'
        className='w-[100vw] sm:w-1/2 h-[200px] sm-[150px] overflow-hidden'
        alt=''
      /> */}
      <CardSwiper />
      <div className='text-center text-sm my-2 px-2'>
        "The person you vote for today might become your partner one day. So,
        choose your vote wisely! 🤔"
      </div>
    </div>
  );
}

export default Home;
