import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import {
  detectedDeviceAccount,
  login,
  loginWithDeviceId,
} from '../../../services/auth';
import { useAppSelector } from '../../../store/store';
import { getFingerprint } from '../../../utils/helpers';

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [deviceData, setDeviceData] = useState<any>({});

  const email = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { user, status } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (status === 'succeeded' && user) {
      navigate('/home');
    }
    if (deviceId === '') {
      getFingerprint().then((fp) => {
        console.log(fp);
        setDeviceId(() => fp);
      });
    }
  }, [status, user, navigate]);

  useEffect(() => {
    if (deviceId) {
      detectdUser(deviceId);
    }
  }, [deviceId]);

  const detectdUser = async (deviceId: string) => {
    try {
      const data = await detectedDeviceAccount({
        deviceId: deviceId,
      });
      console.log(data);
      setDeviceData(data.user);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    nextRef: React.RefObject<any>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

  const validatePassword = (password: string) => {
    const errors: string[] = [];
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    }

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors.join('. ');
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        console.log('Logging in...');
        const data = await login(formData);
        if (data) {
          console.log('Logged in successfully');
          window.location.href = '/home';
        }
      } catch (error: any) {
        console.error(error);
      }
    }
  };

  const handleLoginWithDeviceID = async () => {
    try {
      console.log('Logging in with device id...');
      const data = await loginWithDeviceId(deviceId);
      if (data) {
        console.log('Logged in successfully');
        window.location.href = '/home';
      }
    } catch (error: any) {
      console.error(error);
    }
  };
  if (deviceData) {
    console.log(deviceData.email);
  }
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Log In</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <input
              ref={email}
              type='text'
              name='email'
              value={formData.email}
              onChange={handleChange}
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
              onChange={handleChange}
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
            className='w-full bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-500 transition-colors'
          >
            Log In
          </button>
        </form>

        {deviceData?.email ? (
          <div
            className='mt-4 p-4 bg-gray-200 rounded-lg'
            onClick={handleLoginWithDeviceID}
          >
            <p className='text-center text-gray-700'>
              Detected Email: {deviceData.email}
            </p>
          </div>
        ) : (
          <Link to='/signup' className='text-blue-500 hover:underline'>
            Sign Up
          </Link>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
