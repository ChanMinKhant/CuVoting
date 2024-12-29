import { useRef } from 'react';
import Slider from 'react-slick';
import ContestantCard from './contestant-card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Contestant {
  name: string;
  height: string;
  number: number;
  photoUrl: string;
}

interface ContestantSliderProps {
  contestants: Contestant[];
}

export default function ContestantSlider({
  contestants,
}: ContestantSliderProps) {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: '40px',
    responsive: [
      {
        breakpoint: 640,
        settings: {
          centerPadding: '20px',
        },
      },
    ],
  };

  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className='relative w-full max-w-md mx-auto'>
      <Slider ref={sliderRef} {...settings}>
        {contestants.map((contestant) => (
          <div key={contestant.number} className='px-2'>
            <ContestantCard {...contestant} />
          </div>
        ))}
      </Slider>
      {/* <button
        className='absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors duration-300'
        onClick={goToPrev}
      >
        <ChevronLeft className='w-6 h-6 text-white' />
      </button>
      <button
        className='absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors duration-300'
        onClick={goToNext}
      >
        <ChevronRight className='w-6 h-6 text-white' />
      </button> */}
    </div>
  );
}
