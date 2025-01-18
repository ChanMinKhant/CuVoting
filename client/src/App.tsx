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
import Nav from './components/Nav';
import { logout } from './services/auth';
import MaintenancePage from './pages/hero/MaintenancePage';
import Loader from './components/Loader';

function App() {
  const isMaintaining: boolean = false;
  if (isMaintaining) {
    return <MaintenancePage />;
  }
  const dispatch = useAppDispatch();

  const { user, status: userStatus } = useAppSelector((state) => state.user);
  const { status: selectionStatus } = useAppSelector(
    (state) => state.selections
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

  useEffect(() => {
    const checkBanStatus = async () => {
      if (userStatus === 'succeeded' && user?.user?.isBanned === true) {
        const text = `Hey ${user?.user?.username}! 🚨 You're banned! 🚫  
Reason? Because we couldn't verify who u are.   
Sorry, not sorry! 😔💔  
Tap "Okay" to logout! 👉🚪`;

        if (window.confirm(text)) {
          await logout();
          window.location.href = '/';
        } else {
          await logout();
          window.location.href = '/';
        }
      }
    };

    checkBanStatus();
  }, [userStatus, user?.user?.isBanned, user?.user?.username]);

  if (userStatus === 'loading') {
    // const dynamicText = ['king', 'queen', 'favourite couple'];
    // const rand = dynamicText[Math.floor(Math.random() * dynamicText.length)];
    return (
      <div className='flex flex-col justify-center items-center h-screen'>
        <Loader />
        {`Are you ready to vote?...`}
      </div>
    );
  }

  return (
    <>
      <Nav />
      <div className='flex justify-center items-center bg-soft-milk'>
        <div className='max-w-screen-sm w-full mx-auto'>
          <Routes>
            <Route path='/' element={<Hero />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/otp' element={<Otp />} />
            <Route path='/home' element={<VotingPage />} />
            <Route path='/vote-history' element={<VoteHistory />} />
            <Route path='/helloworld' element={<h1>Hello World!</h1>} />
            <Route path='*' element={<h1>Not Found</h1>} />
          </Routes>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default App;
