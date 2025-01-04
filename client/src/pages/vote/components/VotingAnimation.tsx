import './votingAnimation.css';
// use memo to prevent re-rendering

function VotingAnimation() {
  return (
    <div className='relative w-48 h-[115px] mx-auto mt-8'>
      {/* Voting Box */}
      <div className='absolute bottom-0 left-[50%] transform -translate-x-1/2 w-24 h-16 bg-gray-800 rounded-t-md shadow-lg'>
        <div className='absolute top-0 left-[50%] transform -translate-x-1/2 w-12 h-2 bg-black rounded-sm'></div>
      </div>

      {/* Tickets */}
      <div className='absolute top-0 left-[50%] transform -translate-x-1/2 w-12 h-8 bg-yellow-300 border-2 border-yellow-500 rounded-md shadow-md animate-ticket'>
        <div className='flex justify-center items-center h-full text-xs font-bold text-gray-800'>
          vote
        </div>
      </div>

      {/* Additional tickets for staggered effect */}
      <div className='absolute top-[-2rem] left-[50%] transform -translate-x-1/2 w-12 h-8 bg-yellow-300 border-2 border-yellow-500 rounded-md shadow-md animate-ticket animation-delay-1'>
        <div className='flex justify-center items-center h-full text-xs font-bold text-gray-800'>
          vote
        </div>
      </div>
    </div>
  );
}

export default VotingAnimation;
