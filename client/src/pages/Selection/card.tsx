import ContestantSlider from './components/contestant-slider';

const contestants = [
  {
    name: 'Jane Doe',
    height: '5\'9"',
    number: 1,
    photoUrl: '/placeholder.svg?height=900&width=600',
  },
  {
    name: 'Emily Smith',
    height: '5\'10"',
    number: 2,
    photoUrl: '/placeholder.svg?height=900&width=600',
  },
  {
    name: 'Sarah Johnson',
    height: '5\'8"',
    number: 3,
    photoUrl: '/placeholder.svg?height=900&width=600',
  },
  {
    name: 'Olivia Brown',
    height: '5\'7"',
    number: 4,
    photoUrl: '/placeholder.svg?height=900&width=600',
  },
  {
    name: 'Emma Davis',
    height: '5\'11"',
    number: 5,
    photoUrl: '/placeholder.svg?height=900&width=600',
  },
];

export default function MissVotingPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 py-8 px-4'>
      <div className='max-w-md mx-auto'>
        <ContestantSlider contestants={contestants} />
        <p className='text-center text-white mt-8 opacity-80'>
          Swipe or use arrows to view contestants. Tap the crown to vote!
        </p>
      </div>
    </div>
  );
}
