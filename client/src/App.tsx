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
import Nav from './components/Nav';

function App() {
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
    console.log(user?.user?.isBanned);
    console.log(userStatus);
    if (userStatus === 'succeeded' && user?.user?.isBanned === false) {
      console.log('hi');
      const reasons = ['handsome 😎🔥', 'beautiful 💃✨'];
      const randomReason = reasons[Math.floor(Math.random() * reasons.length)];

      const text = `Hey ${user?.user?.username}! 🚨 You're banned! 🚫  
Reason? Because you're *TOO* ${randomReason} — it’s unfair to others! Right? 😂🤣   
Sorry, not sorry! 😔💔  
Tap "Okay" to logout! 👉🚪`;

      if (window.confirm(text)) {
        document.cookie =
          'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/login';
      }
    }
  }, [userStatus, user?.user?.isBanned, user?.user?.username]);

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
            <Route path='/test' element={<CoupleCard />} />
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
