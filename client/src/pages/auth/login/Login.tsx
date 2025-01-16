import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import {
  detectedDeviceAccount,
  login,
  loginWithDeviceId,
} from '../../../services/auth';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getFingerprint } from '../../../utils/helpers';
import { fetchCurrentUser } from '../../../store/features/userSlice';
import { fetchAllSelections } from '../../../store/features/selectionSlice';
import ButtonLoader from '../../../components/ButtonLoader';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [deviceData, setDeviceData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (status === 'succeeded' && user) navigate('/');
  }, [status, user, navigate]);

  useEffect(() => {
    getFingerprint().then(setDeviceId).catch(console.error);
  }, []);

  useEffect(() => {
    if (deviceId) {
      detectedDeviceAccount({ deviceId })
        .then((data) => setDeviceData(data.user))
        .catch(console.error);
    }
  }, [deviceId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    nextRef: React.RefObject<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters long';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await login(formData);
      if (data) {
        dispatch(fetchCurrentUser());
        dispatch(fetchAllSelections());
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginWithDeviceID = async () => {
    try {
      const data = await loginWithDeviceId(deviceId);
      if (data) {
        dispatch(fetchCurrentUser());
        dispatch(fetchAllSelections());
        navigate('/');
      }
    } catch (error) {
      console.error('Fail to login with device id');
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Log In</h2>
        {deviceData?.email && (
          <div
            className='mb-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg cursor-pointer hover:bg-yellow-200 transition-colors'
            onClick={handleLoginWithDeviceID}
          >
            <div className='text-sm text-center'>
              You can log in to this account
            </div>
            <p className='text-center text-yellow-700 text-lg font-semibold'>
              Detected Email: {deviceData.email}
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <input
              ref={emailRef}
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
              placeholder='Email'
              className={`w-full p-2 border rounded-full ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
            )}
          </div>
          <div className='relative'>
            <input
              ref={passwordRef}
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              placeholder='Password'
              className={`w-full p-2 border rounded-full ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 transform -translate-y-1/2'
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
            )}
          </div>
          <button
            type='submit'
            className='w-full flex justify-center bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-500 transition-colors'
          >
            {isSubmitting ? <ButtonLoader /> : 'Log in'}
          </button>
        </form>
        <p className='mt-4 text-center'>
          Don't have an account?{' '}
          <Link to='/signup' className='text-blue-500 hover:underline'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
