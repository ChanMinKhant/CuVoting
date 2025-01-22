import Loader from '../../components/Loader';
import { useAppSelector } from '../../store/store';
import { useEffect, useState } from 'react';

const MaintenancePage = () => {
  const { selections, status } = useAppSelector((state) => state.selections);
  const [randomSelection, setRandomSelection] = useState<string>('');

  useEffect(() => {
    if (status === 'succeeded' && selections.length > 0) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * selections.length);
        setRandomSelection(selections[randomIndex]?.name);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [status, selections]);
  console.log(status);

  if (status !== 'succeeded') {
    return <Loader />;
  }

  return (
    <div className='h-screen bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 flex justify-center items-center'>
      <div className='text-center max-w-2xl px-6'>
        <h1 className='text-5xl font-bold text-white mb-4 animate__animated animate__fadeIn'>
          We're currently fixing things up! 🛠️
        </h1>
        <p className='text-2xl text-white mb-4 animate__animated animate__fadeIn animate__delay-1s'>
          Meanwhile, enjoy this random selection:
        </p>
        <p className='text-3xl font-semibold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-transparent bg-clip-text mb-6 animate__animated animate__fadeIn animate__delay-1s'>
          {randomSelection}
        </p>
        <p className='text-lg text-white mb-8 animate__animated animate__fadeIn animate__delay-2s'>
          Make your choice wisely! Please wait for a moment.
        </p>
        <p className='text-lg text-white mb-10 animate__animated animate__fadeIn animate__delay-3s'>
          👑 👑
        </p>
      </div>
    </div>
  );
};

export default MaintenancePage;
