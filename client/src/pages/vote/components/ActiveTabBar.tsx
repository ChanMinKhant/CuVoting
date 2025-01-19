import { useAppDispatch, useAppSelector } from '../../../store/store';
import { changeActiveTab } from '../../../store/features/modalSlice';

const ActiveTabBar = () => {
  const dispatch = useAppDispatch();
  const { activeTab } = useAppSelector((state) => state.modal);
  const handleTabClick = (tab: 'boy' | 'girl' | 'couple') => {
    dispatch(changeActiveTab(tab));
  };
  return (
    <>
      <div className='w-full'>
        <div className='flex border-b-2 text-sm border-gray-300 pb-2'>
          <div
            className={`w-1/3 text-center py-2 mx-[3px] cursor-pointer ${
              activeTab === 'boy'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'hover:text-blue-600 hover:border-b-2 hover:border-blue-600'
            }`}
            onClick={() => handleTabClick('boy')}
          >
            Boys
          </div>
          <div
            className={`w-1/3 text-center py-2 mx-[3px] cursor-pointer ${
              activeTab === 'girl'
                ? 'text-pink-800 border-b-2 border-pink-600'
                : 'hover:text-pink-600 hover:border-b-2 hover:border-pink-600'
            }`}
            onClick={() => handleTabClick('girl')}
          >
            Girls
          </div>
          <div
            className={`w-1/3 text-center py-2 mx-[3px] cursor-pointer ${
              activeTab === 'couple'
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600 border-b-2 border-gradient-to-r from-blue-600 to-pink-600'
                : 'hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-pink-600 hover:border-b-2 hover:border-gradient-to-r hover:from-blue-600 hover:to-pink-600'
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
