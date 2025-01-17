const MaintenancePage = () => {
  return (
    <div className='h-screen bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 flex justify-center items-center'>
      <div className='text-center max-w-2xl px-6'>
        <h1 className='text-5xl font-bold text-white mb-4 animate__animated animate__fadeIn'>
          Site Under Maintenance 🛠️
        </h1>
        <p className='text-xl text-white mb-6 animate__animated animate__fadeIn animate__delay-1s'>
          Website is currently at the gym. 💪
        </p>
        <p className='text-lg text-white mb-8 animate__animated animate__fadeIn animate__delay-2s'>
          She's super fast, a little slow today...🐢💨
        </p>
        <p className='text-lg text-white mb-10 animate__animated animate__fadeIn animate__delay-3s'>
          She's working hard to slim down and get faster, just give her a little
          break! 🏃‍♀️💨😅
        </p>
      </div>
    </div>
  );
};

export default MaintenancePage;
