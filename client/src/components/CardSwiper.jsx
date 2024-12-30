import 'swiper/swiper-bundle.css'; // Import Swiper styles
import Card from './Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import './cardSwiper.css';
import users from '../db.json';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'; // Update the import path
import MiniFlipCard from './MiniFlipCard ';

function CardSwiper() {
  return (
    <div>
      <div className='w-full'>
        <div className='flex border-b-2 text-sm border-gray-300 pb-2'>
          <div className='w-1/3 text-center py-2 mx-[3px] cursor-pointer hover:text-purple-600 hover:border-b-2 hover:border-purple-600 '>
            Boys
          </div>

          <div className='w-1/3 text-center py-2 mx-[3px] cursor-pointer hover:text-purple-600 hover:border-b-2 hover:border-purple-600 '>
            Girls
          </div>

          <div className='w-1/3 text-center py-2 mx-[3px] cursor-pointer hover:text-purple-600 hover:border-b-2 hover:border-purple-600 '>
            Couples
          </div>
        </div>
      </div>

      <div className='w-full flex justify-end text-xs items-center mt-2 mr-4 mb-[-5px] px-2'>
        <div className='border-b px-2 py-[2px] mr-2 rounded-md shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff,inset_10px_10px_20px_#bebebe,inset_-10px_-10px_10px_#ffffff]'>
          {' '}
          Click the cards to flip
        </div>
        <MiniFlipCard />
      </div>
      <Swiper
        effect={'coverflow'} // 3D effect
        spaceBetween={50}
        grabCursor={true}
        slidesPerView={'auto'}
        centeredSlides={true} // Center the active slide
        loop={true} // Enable looping of slides
        coverflowEffect={{
          rotate: 0, // Slight rotation for a natural overlap effect
          stretch: 0, // Keep all slides the same width
          depth: 100, // Make the overlapping effect more pronounced
          modifier: 2.5, // Controls the curve intensity
          slideShadows: true, // Enable slide shadows for depth
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]} // Corrected import usage
        className='swiper-container z-0'
        // style={{
        //   overflow: 'hidden',
        // }}
      >
        {users.map((user) => (
          <SwiperSlide key={user.id} className='swiper-slide relative z-0'>
            <Card
              name={user.name}
              age={user.age}
              bio={user.bio}
              hobbies={user.hobbies}
              img={user.img}
              height={user.height}
              id={user.id}
            />
          </SwiperSlide>
        ))}
        <div className='slider-controller'>
          <div className='swiper-button-prev slider-arrow'>
            <ion-icon name='arrow-back-outline'></ion-icon>
          </div>
        </div>
        <div className='slider-controller'>
          <div className='swiper-button-next slider-arrow'>
            <ion-icon name='arrow-forward-outline'></ion-icon>
          </div>
          <div className='swiper-pagination'></div>
        </div>
      </Swiper>
    </div>
  );
}

export default CardSwiper;
