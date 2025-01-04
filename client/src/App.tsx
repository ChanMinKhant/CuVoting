import './App.css';
// router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/auth/signup/Signup';
import VotingPage from './pages/vote/VotingPage';
import Login from './pages/auth/login/Login';
import Otp from './pages/auth/signup/Otp';
import Hero from './pages/hero/Hero';
import { useAppDispatch, useAppSelector } from './store/store';
import { useEffect } from 'react';
import { fetchCurrentUser } from './store/features/userSlice';
import { fetchAllSelections } from './store/features/selectionSlice';
// import Nav from './pages/components/Nav';

function App() {
  const dispatch = useAppDispatch();
  const {
    user,
    status: userStatus,
    error: userError,
  } = useAppSelector((state) => state.user);
  const {
    selections,
    status: selectionStatus,
    error: selectionError,
  } = useAppSelector((state) => state.selections); // Corrected state slice name
  console.log(user);
  console.log(selections);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchCurrentUser());
    }
    if (selectionStatus === 'idle') {
      dispatch(fetchAllSelections());
    }

    if (userStatus === 'failed') {
      console.log(userError);
    }
    if (selectionStatus === 'failed') {
      console.log(selectionError);
    }
  }, [userStatus, selectionStatus, dispatch]);

  return (
    <>
      <Router>
        {/* <Nav /> */}
        <Routes>
          <Route path='/' element={<Hero />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/otp' element={<Otp />} />
          <Route path='/home' element={<VotingPage />} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
