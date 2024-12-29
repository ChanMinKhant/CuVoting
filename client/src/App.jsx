import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';
import CandidateProfile from './pages/CandidateProfile ';
import SignUpPage from './pages/Signup';
import Nav from './components/Nav';
// import Footer from './components/Footer';
import Vote from './pages/Vote';
import VoteCata from './pages/VoteCata';
import Register from './pages/Auth/Register/Regsiter';
import SubmitOtp from './pages/Auth/Register/Otp';
import SelectionPage from './pages/Selection/Selection';
function App() {
  return (
    <div className='sm:flex sm:justify-center'>
      <div className='max-w-screen-sm'>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/vote/:cate' element={<Vote />}></Route>
          <Route path='/vote_categories' element={<VoteCata />}></Route>
          <Route path='/signup' element={<SignUpPage />}></Route>
          <Route path='/candidates/:id' element={<CandidateProfile />}></Route>
          // register pages
          <Route path='/register' element={<Register />}></Route>
          // otp pages
          <Route path='/otp' element={<SubmitOtp />}></Route>
          // selection pages
          <Route path='/selection' element={<SelectionPage />}></Route>
        </Routes>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default App;
// import React, { useEffect, useState } from 'react';
// import FingerprintJS from '@fingerprintjs/fingerprintjs';

// const App = () => {
//   const [visitorId, setVisitorId] = useState(null);

//   useEffect(() => {
//     const loadFingerprint = async () => {
//       const fp = await FingerprintJS.load();
//       const result = await fp.get();
//       setVisitorId(result.visitorId); // Unique visitor identifier
//     };

//     loadFingerprint();
//   }, []);

//   return (
//     <div>
//       <h1>FingerprintJS Example</h1>
//       {visitorId ? <p>Your Visitor ID: {visitorId}</p> : <p>Loading...</p>}
//     </div>
//   );
// };

// export default App;
