import 'swiper/swiper-bundle.css'; // Import Swiper styles
import Card from './Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import './cardSwiper.css';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'; // Update the import path
const users = [
  { name: 'Alice', img: '/emma.jpg' },
  { name: 'Bob', img: '/emma1.jpg' },
  { name: 'Charlie', img: '/Thor.jpg' },
  { name: 'David', img: '/tonystark.jpg' },
  { name: 'Eva', img: '/mjolnir.jpg' },
  { name: 'Frank', img: '/supandbatsy.jpg' },
  { name: 'Grace', img: '/hulk.jpg' },
  { name: 'Hannah', img: '/Groot.jpg' },
  { name: 'Ivy', img: '/emma3.jpg' },
  { name: 'Jack', img: '/city.jpg' },
];
function CardSwiper() {
  return (
    <div>
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
          <SwiperSlide key={user.name} className='swiper-slide relative z-0'>
            <Card name={user.name} img={user.img} />
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
