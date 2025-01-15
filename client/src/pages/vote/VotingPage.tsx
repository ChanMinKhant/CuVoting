import { useEffect } from 'react';
import { useAppSelector } from '../../store/store';
import CardSwiper from './components/CardSwiper';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './components/Modal';

const VotingPage = () => {
  const navigate = useNavigate();

  const { user, status: userStatus } = useAppSelector((state) => state.user);
  const { selections, status: selectionStatus } = useAppSelector(
    (state) => state.selections
  );

  useEffect(() => {
    // Redirect to signup page if user or selections data fails to load
    if (
      (userStatus === 'failed' && !user) ||
      (selectionStatus === 'failed' && selections.length === 0)
    ) {
      navigate('/signup');
    }
  }, [selections, selectionStatus, user, userStatus, navigate]);

  return (
    <div className='w-full h-full p-4 flex flex-col select-none'>
      {/* Header */}
      <div className='text-center my-0'>
        <Link to='/'>
          <h1 className='text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-500'>
            UCS(Pyay) Voting
          </h1>
        </Link>
        <p className='text-sm font-semibold text-gray-600 mt-1'>
          Every Vote Matters
        </p>
      </div>

      {/* Divider for smaller screens */}
      <hr className='border-t-2 border-gray-300 my-2 rounded-full m-auto w-1/2 sm:hidden' />

      {/* Card Swiper */}
      <CardSwiper />

      {/* Divider */}
      <hr className='border-t-2 border-gray-300 my-4 rounded-full m-auto w-1/2' />

      {/* Motivational Text */}
      <div className='text-center text-sm my-2 px-2 text-gray-600 select-text'>
        "The person you vote for today might become your partner one day. So,
        choose your vote wisely! 🤔"
      </div>

      {/* Modal */}
      <Modal />
    </div>
  );
};

export default VotingPage;
