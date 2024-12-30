import './App.css';
// router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/auth/signup/Signup';
import VotingPage from './pages/vote/VotingPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          // home route
          <Route path='/home' element={<VotingPage />} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
