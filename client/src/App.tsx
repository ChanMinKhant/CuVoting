import './App.css';
// router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/auth/signup/Signup';
import VotingPage from './pages/vote/VotingPage';
import Login from './pages/auth/login/Login';
import Otp from './pages/auth/signup/Otp';
import Hero from './pages/hero/Hero';
// import Nav from './pages/components/Nav';

function App() {
  return (
    <>
      <div className='sm:flex sm:justify-center'>
        <div className='max-w-screen-sm'>
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
        </div>
      </div>
    </>
  );
}

export default App;
