import 'swiper/swiper-bundle.css'; // Import Swiper styles
import Card from './Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import './cardSwiper.css';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'; // Update the import path
import MiniFlipCard from './MiniFlipCard';
import { useRef, useCallback, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { changeActiveTab } from '../../../store/features/modalSlice';

function CardSwiper() {
  const dispatch = useAppDispatch();
  const cardRefs = useRef<any[]>([]);
  const [activeTab, setActiveTab] = useState<'boy' | 'girl' | 'couple'>('boy');
  const [filteredSelections, setFilteredSelections] = useState<any[]>([]);

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
        const boy = selections?.filter(
          (selection) => selection.gender === 'boy'
        );
        const girl = selections?.filter(
          (selection) => selection.gender === 'girl'
        );
        console.log(boy);
        console.log(girl);
        const filteredSelection: any[] = [];

        // i want to merge the two arrays with the same number use 2 dimensional array
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => {
          const boySelection = boy[number - 1];
          const girlSelection = girl[number - 1];
          filteredSelection.push([boySelection, girlSelection]);
        });
        console.log(filteredSelection);
        setFilteredSelections(filteredSelection);
      }
    }

    // console.log(filteredSelections);
  }, [selections, activeTab]);

  const { activeTab: activeTabFromStore } = useAppSelector(
    (state) => state.modal
  );

  useEffect(() => {
    setActiveTab(activeTabFromStore);
  }, [activeTabFromStore]);

  const resetAllFlips = useCallback(() => {
    cardRefs.current.forEach((ref) => ref?.resetFlip());
  }, []);

  const handleTabClick = (tab: 'boy' | 'girl' | 'couple') => {
    setActiveTab(tab);
    console.log(`Currently active tab: ${tab}`);
    dispatch(changeActiveTab(tab));
  };

  return (
    <div>
      <div className='w-full'>
        <div className='flex border-b-2 text-sm border-gray-300 pb-2'>
          <div
            className={`w-1/3 text-center py-2 mx-[3px] cursor-pointer ${
              activeTab === 'boy'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'hover:text-purple-600 hover:border-b-2 hover:border-purple-600'
            }`}
            onClick={() => handleTabClick('boy')}
          >
            Boys
          </div>
          <div
            className={`w-1/3 text-center py-2 mx-[3px] cursor-pointer ${
              activeTab === 'girl'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'hover:text-purple-600 hover:border-b-2 hover:border-purple-600'
            }`}
            onClick={() => handleTabClick('girl')}
          >
            Girls
          </div>
          <div
            className={`w-1/3 text-center py-2 mx-[3px] cursor-pointer ${
              activeTab === 'couple'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'hover:text-purple-600 hover:border-b-2 hover:border-purple-600'
            }`}
            onClick={() => handleTabClick('couple')}
          >
            Couples
          </div>
        </div>
      </div>
      <br />
      <div className='w-full flex justify-end text-xs items-center mt-2 mr-4 mb-[-5px] px-2'>
        <div className='border-b px-2 py-[2px] mr-2 rounded-md shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff,inset_10px_10px_20px_#bebebe,inset_-10px_-10px_10px_#ffffff]'>
          Click the cards to flip
        </div>
        <MiniFlipCard />
      </div>
      {filteredSelections.length > 0 ? (
        <Swiper
          effect={'coverflow'} // 3D effect
          spaceBetween={50}
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
          modules={[EffectCoverflow, Pagination, Navigation]} // Corrected import usage
          className='swiper-container z-0'
        >
          {filteredSelections?.map((selection, index) =>
            activeTab !== 'couple' ? (
              <SwiperSlide key={index}>
                <Card
                  activeTab={activeTab}
                  ref={(ref) => (cardRefs.current[index] = ref)}
                  selection={selection}
                />
              </SwiperSlide>
            ) : (
              <div>
                <SwiperSlide key={index}>
                  {/* <Card
                    activeTab={activeTab}
                    ref={(ref) => (cardRefs.current[index] = ref)}
                    selection={selection[index][0]}
                  />
                </SwiperSlide>
                <SwiperSlide key={index}>
                  <Card
                    activeTab={activeTab}
                    ref={(ref) => (cardRefs.current[index] = ref)}
                    selection={selection[index][1]}
                  /> */}
                </SwiperSlide>
              </div>
            )
          )}
          <div className='slider-controller'>
            <div
              className='swiper-button-prev slider-arrow'
              onClick={resetAllFlips}
            ></div>
          </div>
          <div className='slider-controller'>
            <div
              className='swiper-button-next slider-arrow'
              onClick={resetAllFlips}
            ></div>
            <div className='swiper-pagination'></div>
          </div>
        </Swiper>
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
