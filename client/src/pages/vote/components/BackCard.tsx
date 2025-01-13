import { memo } from 'react';
import { FaFacebookF } from 'react-icons/fa';

// interface ProfileData {
//   name: string;
//   section: 'A' | 'B' | 'C';
//   sign: string;
//   favColor: string;
//   talent: string;
//   hobby: string;
//   personality: string;
//   social: string[];
//   city: string;
//   ambition: string;
// }

const ProfileCard = memo(({ selection }: any) => {
  // const selection: ProfileData | null = {
  //   name: 'John Doe',
  //   section: 'A',
  //   sign: 'Taurus',
  //   favColor: 'white',
  //   talent: 'helping',
  //   hobby: 'football',
  //   personality: 'INFJ-A',
  //   social: [
  //     'https://www.facebook.com/profile.php?id=100080816524575&mibextid=ZbWKwL',
  //   ],
  //   city: 'sittwe',
  //   ambition: 'software engineer',
  // };
  if (!selection) return null;

  return (
    <div className='text-[#000000] border h-full bg-white shadow-xl flex flex-col justify-evenly items-center max-w-sm mx-auto rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300'>
      <div className='w-full p-6 space-y-4'>
        <div className='text-center space-y-2'>
          <h1 className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500'>
            {selection.name}
          </h1>
          {/* <div className='text-lg font-semibold text-gray-600'>
            Section {selection.section}
          </div> */}
        </div>
        {/* <div className='text-2xl font-bold text-center text-blue-500'>
          {selection.sign}
        </div> */}
        <div className='grid grid-cols-2 gap-4 text-sm'>
          <InfoItem label='FavColor' value={selection.favColor} />
          <InfoItem label='Talent' value={selection.talent} />
          <InfoItem label='Hobby' value={selection.hobby} />
          <InfoItem label='Personality' value={selection.personality} />
          <InfoItem label='City' value={selection.city} />
          <InfoItem label='Ambition' value={selection.ambition} />
        </div>
        <div className='flex justify-center pt-4'>
          {selection?.social?.map((url: string, index: number) => (
            <a
              key={index}
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className='bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600 transition-colors duration-300'
              aria-label='Facebook Profile'
            >
              <FaFacebookF size={20} />
            </a>
          ))}
        </div>
      </div>
      <div className='w-full px-6 pb-4 flex justify-end'>
        <a
          href='#'
          className='text-blue-500 hover:text-blue-600 transition-colors duration-300'
          aria-label='External Link'
        >
          {/* <FiExternalLink size={24} /> */}
        </a>
      </div>
    </div>
  );
});

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className='space-y-1'>
    <div className='text-xs font-medium text-gray-500 uppercase'>{label}</div>
    <div className='font-semibold'>{value}</div>
  </div>
);

export default ProfileCard;
