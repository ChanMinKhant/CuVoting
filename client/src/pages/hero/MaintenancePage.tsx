const MaintenancePage = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white'>
      <div className='text-center'>
        <div className='relative'>
          <div className='text-9xl font-bold animate-pulse'>🚧</div>
          <p className='mt-4 text-4xl font-extrabold'>Site Under Maintenance</p>
          <p className='mt-2 text-lg font-light animate-bounce'>
            Please check back later. We’re working hard to improve your
            experience!
          </p>
        </div>
        <div className='relative mt-8'>
          <div className='h-6 w-6 bg-yellow-300 rounded-full animate-bounce mx-auto'></div>
          <div className='flex justify-center items-center space-x-2 mt-4'>
            <div className='h-2 w-2 bg-red-300 animate-pulse rounded-full'></div>
            <div className='h-2 w-2 bg-green-300 animate-pulse rounded-full'></div>
            <div className='h-2 w-2 bg-blue-300 animate-pulse rounded-full'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
