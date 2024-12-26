import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import Card from '../components/Card';

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

function Home() {
  return (
    <div className='w-full h-full p-4'>
      <Swiper
        spaceBetween={50} // space between slides
        grabCursor={true}
        slidesPerView={'auto'}
        centeredSlides={true} // center the active slide
        loop={true} // enable looping of slides
        effect={'coverflow'} // 3D effect
        coverflowEffect={{
          rotate: 0, // Slight rotation for a natural overlap effect
          stretch: 0, // Keep all slides the same width
          depth: 100, // Make the overlapping effect more pronounced
          modifier: 2.5, // Controls the curve intensity
          slideShadows: true, // Enable slide shadows for depth
        }}
        pagination={{ clickable: true }} // pagination controls
        navigation={true} // navigation arrows
      >
        {users.map((user) => (
          <SwiperSlide key={user.name}>
            <Card name={user.name} img={user.img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Home;
