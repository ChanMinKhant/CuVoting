import React, { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const App = () => {
  const [visitorId, setVisitorId] = useState(null);

  useEffect(() => {
    const loadFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setVisitorId(result.visitorId); // Unique visitor identifier
    };

    loadFingerprint();
  }, []);

  return (
    <div>
      <h1>FingerprintJS Example</h1>
      {visitorId ? <p>Your Visitor ID: {visitorId}</p> : <p>Loading...</p>}
    </div>
  );
};

export default App;
