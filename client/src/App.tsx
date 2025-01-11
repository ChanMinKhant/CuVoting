import './App.css';
// router
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/auth/signup/Signup';
import VotingPage from './pages/vote/VotingPage';
import Login from './pages/auth/login/Login';
import Otp from './pages/auth/signup/Otp';
import Hero from './pages/hero/Hero';
import { useAppDispatch, useAppSelector } from './store/store';
import { useEffect } from 'react';
import { fetchCurrentUser } from './store/features/userSlice';
import { fetchAllSelections } from './store/features/selectionSlice';
import { ToastContainer } from 'react-toastify';
import VoteHistory from './pages/vote-history/VoteHistory';
import CoupleCard from './pages/vote/components/CoupleCard';
// import Nav from './pages/components/Nav';

function App() {
  const dispatch = useAppDispatch();

  const { status: userStatus } = useAppSelector((state) => state.user);
  console.log(useAppSelector((state) => state.selections));
  const { status: selectionStatus } = useAppSelector(
    (state) => state.selections,
  );

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchCurrentUser());
      // toast.success('Welcome to the voting app');
    }
    if (selectionStatus === 'idle') {
      dispatch(fetchAllSelections());
    }
  }, [userStatus, selectionStatus, dispatch]);

  return (
    <>
      {/* <Nav /> */}
      <div className='flex justinfy-center items-center'>
        <div className='max-w-screen-sm w-full mx-auto'>
          <Routes>
            <Route path='/' element={<Hero />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/otp' element={<Otp />} />
            <Route path='/home' element={<VotingPage />} />
            <Route path='/test' element={<CoupleCard />} />
            <Route path='/vote-history' element={<VoteHistory />} />
            <Route path='*' element={<h1>Not Found</h1>} />
          </Routes>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default App;
