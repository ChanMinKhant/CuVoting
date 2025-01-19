const MaintenancePage = () => {
  return (
    <div className='h-screen bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 flex justify-center items-center'>
      <div className='text-center max-w-2xl px-6'>
        <h1 className='text-5xl font-bold text-white mb-4 animate__animated animate__fadeIn'>
          Excuse Us for a Moment,
          <br />
          💖💻
        </h1>
        <p className='text-xl text-white mb-6 animate__animated animate__fadeIn animate__delay-1s'>
          Our website is currently engaged in an important upgrade. 🤫
        </p>
        <p className='text-lg text-white mb-8 animate__animated animate__fadeIn animate__delay-2s'>
          Kindly allow us some time to enhance your experience. Rest assured,
          we’ll return stronger, sharper, and full of energy! 🤗🔋
        </p>
        <p className='text-lg text-white mb-10 animate__animated animate__fadeIn animate__delay-3s'>
          Thank you for your patience and understanding. 🕴️✨
        </p>
      </div>
    </div>
  );
};

export default MaintenancePage;
