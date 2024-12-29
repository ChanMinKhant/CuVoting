function Front() {
  return (
    <div
      className='w-full h-[100vh] bg-cover bg-center flex flex-col justify-center items-center text-white'
      style={{ backgroundImage: 'url(/background.jpg)' }}
    >
      <h1 className='text-4xl text-black font-bold mb-4'>UCSP Voting</h1>
      <p className='text-xl text-black mb-6'>
        Welcome to the UCSP Voting platform!
      </p>
      <button className='px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300'>
        Sign Up
      </button>
    </div>
  );
}

export default Front;
