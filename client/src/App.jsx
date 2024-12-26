import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';
import CandidateProfile from './pages/CandidateProfile ';
import SignUpPage from './pages/Signup';
import Nav from './components/Nav';
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<SignUpPage />}></Route>
        <Route path='/candidates/:id' element={<CandidateProfile />}></Route>
      </Routes>
    </>
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
