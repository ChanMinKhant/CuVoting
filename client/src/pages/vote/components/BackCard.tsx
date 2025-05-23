import { memo } from 'react';
import { FaFacebookF, FaInstagram, FaTelegram, FaTiktok } from 'react-icons/fa';

const ProfileCard = memo(({ selection }: any) => {
  if (!selection) return null;

  return (
    <div className='w-full h-full bg-white shadow-lg rounded-xl max-w-md mx-auto p-6 space-y-6'>
      {/* Header Section */}
      <div className='text-center'>
        <h1
          className={`font-bold ${
            selection?.gender === 'boy' ? 'text-blue-500' : 'text-pink-500'
          } ${selection?.name?.length > 13 ? 'text-xl' : 'text-2xl'}`}
        >
          {selection?.name}
        </h1>
      </div>

      {/* Info Section */}
      <div className='space-y-2'>
        <InfoItem label='FavColor' value={selection?.favColor} />
        <InfoItem label='Talent' value={selection?.talent} />
        <InfoItem label='Hobby' value={selection?.hobby} />
        <InfoItem label='sign' value={selection?.sign} />
        <InfoItem label='City' value={selection?.city} />
        <InfoItem label='Ambition' value={selection?.ambition} />
      </div>

      {/* Social Media Links */}
      <div>
        <h2 className='text-xs font-semibold text-gray-700'>Social Media</h2>
        {selection.social?.length > 0 && (
          <div className='flex justify-center gap-4 pt-4'>
            {selection?.social?.map((url: string, index: number) => (
              <a
                key={index}
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                className={`${
                  selection?.gender === 'boy'
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-pink-500 hover:bg-pink-600'
                } text-white rounded-full p-2 transition duration-300`}
                aria-label='Social Profile'
              >
                {url?.includes('facebook') && <FaFacebookF />}
                {url?.includes('instagram') && <FaInstagram />}
                {url?.includes('tiktok') && <FaTiktok />}
                {url?.includes('t.me') && <FaTelegram />}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className='flex items-center'>
    <span className='w-1/3 text-sm font-medium text-gray-600'>{label}:</span>
    <span className='w-2/3 text-sm text-gray-800 font-semibold ml-2'>
      {value}
    </span>
  </div>
);

export default ProfileCard;
