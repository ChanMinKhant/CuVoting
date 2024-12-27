function Card({ img, name }) {
  return (
    <div className='flex flex-col p-1 bg-[#f2f5f8] rounded-md w-[150px] h-[230px] z-0'>
      <div className='w-full h-[150px] overflow-hidden'>
        <img src={img} alt='' className='w-full rounded-md' />
      </div>
    </div>
  );
}

export default Card;
