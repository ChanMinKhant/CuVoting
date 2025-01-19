import 'swiper/swiper-bundle.css'; // Import Swiper styles
import Card from './Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import './cardSwiper.css';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'; // Update the import path
import MiniFlipCard from './MiniFlipCard';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { openModal, setName } from '../../../store/features/modalSlice';
import ActiveTabBar from './ActiveTabBar';
// import { LazyLoadImage } from 'react-lazy-load-image-component'; // Import LazyLoadImage
import 'react-lazy-load-image-component/src/effects/blur.css'; // Import blur effect for placeholders
import Loader from '../../../components/Loader';

function CardSwiper() {
  const dispatch = useAppDispatch();
  const [filteredSelections, setFilteredSelections] = useState<any[]>([]);
  const { activeTab } = useAppSelector((state) => state.modal);
  const { selections, status: selectionStatus } = useAppSelector(
    (state) => state.selections
  );

  useEffect(() => {
    if (selectionStatus === 'succeeded') {
      // console.log(selections);
      if (activeTab !== 'couple') {
        const filterSelections = selections?.filter(
          (selection) => selection.gender === activeTab
        );
        setFilteredSelections(filterSelections);
      } else {
        const boy = selections
          ?.filter((selection) => selection.gender === 'boy')
          .sort((a, b) => a.number - b.number);
        const girl = selections
          ?.filter((selection) => selection.gender === 'girl')
          .sort((a, b) => a.number - b.number);

        const filteredSelection: any[] = [];

        // i want to merge the two arrays with the same number use 2 dimensional array
        for (let number = 1; number <= 10; number++) {
          const boySelection = boy.find(
            (selection) => selection.number === number
          );
          const girlSelection = girl.find(
            (selection) => selection.number === number
          );
          if (boySelection && girlSelection) {
            filteredSelection.push([boySelection, girlSelection]);
          }
        }
        setFilteredSelections(filteredSelection);
      }
    }

    // console.log(filteredSelections);
  }, [selections, activeTab]);

  const handleVoteClick = (id: string, name: string[]) => {
    dispatch(openModal({ activeTab, selectionId: id }));
    //setName
    dispatch(setName(name?.join(' & ')));
  };

  return (
    <div>
      <ActiveTabBar />
      <br />
      <div className='w-full flex justify-end text-xs items-center mt-2 mr-4 mb-[-5px] px-2'>
        {/* <div className='border-b px-2 py-[2px] mr-2 rounded-md shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff,inset_10px_10px_20px_#bebebe,inset_-10px_-10px_10px_#ffffff]'>
          Click the cards to flip
        </div>
        <MiniFlipCard /> */}
      </div>
      {filteredSelections.length > 0 ? (
        <Swiper
          // effect={'coverflow'} // 3D effect
          spaceBetween={activeTab !== 'couple' ? 50 : 300} // Space between each slide
          grabCursor={true}
          slidesPerView={'auto'} // Set slidesPerView back to 'auto'
          centeredSlides={true} // Center the active slide
          loop={filteredSelections.length > 5} // Enable looping
          watchOverflow={true} // Automatically disable loop if not enough slides
          coverflowEffect={{
            rotate: 0, // Slight rotation for a natural overlap effect
            stretch: 0, // Keep all slides the same width
            depth: 100, // Make the overlapping effect more pronounced
            modifier: 2.5, // Controls the curve intensity
            slideShadows: false, // Enable slide shadows for depth
          }}
          pagination={false}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          // lazy={true} // Enable Swiper's lazy loading
          modules={[EffectCoverflow, Pagination, Navigation]} // Add Lazy module
          className='swiper-container z-0'
        >
          {filteredSelections?.map((selection, index) => {
            return activeTab !== 'couple' ? (
              <SwiperSlide key={selection._id}>
                <Card activeTab={activeTab} selection={selection} />
              </SwiperSlide>
            ) : (
              <>
                <SwiperSlide key={index}>
                  <div>
                    <div className='flex flex-col items-center w-[120px]'>
                      <Card
                        activeTab={activeTab}
                        selection={selection[0]}
                        size='small'
                      />

                      <Card
                        activeTab={activeTab}
                        selection={selection[1]}
                        size='small'
                      />
                      <div
                        className='flex justify-center mt-4'
                        onClick={() =>
                          handleVoteClick(selection[0]._id, [
                            selection[0].name,
                            selection[1].name,
                          ])
                        }
                      >
                        <button className='bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300'>
                          vote us
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </>
            );
          })}
          <div className='slider-controller'>
            <div className='swiper-button-prev slider-arrow'></div>
          </div>
          <div className='slider-controller'>
            <div className='swiper-button-next slider-arrow'></div>
            <div className='swiper-pagination'></div>
          </div>
        </Swiper>
      ) : selectionStatus === 'loading' ? (
        <Loader />
      ) : (
        <div className='text-center text-2xl text-red-500'>
          No Selections Found. Please check your network connection or report to
          admin.
        </div>
      )}
    </div>
  );
}

export default CardSwiper;
