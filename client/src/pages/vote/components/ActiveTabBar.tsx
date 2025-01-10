import { useAppDispatch, useAppSelector } from '../../../store/store';
import { changeActiveTab } from '../../../store/features/modalSlice';

const ActiveTabBar = () => {
  const dispatch = useAppDispatch();
  const { activeTab } = useAppSelector((state) => state.modal);
  const handleTabClick = (tab: 'boy' | 'girl' | 'couple') => {
    console.log(`Currently active tab: ${tab}`);
    dispatch(changeActiveTab(tab));
  };
  return (
    <>
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
    </>
  );
};

export default ActiveTabBar;
