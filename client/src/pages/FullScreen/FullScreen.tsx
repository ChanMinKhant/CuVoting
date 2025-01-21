import { IoIosBackspace } from 'react-icons/io';
import { backendUrl } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function FullScreen() {
  const navigate = useNavigate();
  const { gender, number } = useParams();
  return (
    <div className=''>
      <IoIosBackspace
        onClick={() => {
          navigate(-1);
        }}
      />

      <img
        src={`${backendUrl}/webp/${number}${gender === 'boy' ? 'b' : 'g'}.webp`}
      />
    </div>
  );
}

export default FullScreen;
