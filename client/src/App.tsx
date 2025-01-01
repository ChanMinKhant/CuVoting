import './App.css';
// router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/auth/signup/Signup';
import VotingPage from './pages/vote/VotingPage';
import Login from './pages/auth/login/Login';
import Otp from './pages/auth/signup/Otp';

function App() {
  return (
    <>
      <Router>
        <Routes>
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
