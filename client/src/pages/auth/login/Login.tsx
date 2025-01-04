import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { login } from '../../../services/auth';
import { useAppSelector } from '../../../store/store';

interface FormData {
  usernameOrEmail: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    usernameOrEmail: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showPassword, setShowPassword] = useState(false);

  const usernameOrEmailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { user, status } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (status === 'succeeded' && user) {
      navigate('/home');
    }
  }, [status, user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    nextRef: React.RefObject<any>
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
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};

    if (!formData.usernameOrEmail)
      newErrors.usernameOrEmail = 'Username or Email is required';

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors.join('. ');
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const data = await login(formData);
        if (data) {
          console.log('Logged in successfully');
          // redirect to home page
          navigate('/home');
        }
      } catch (error: any) {
        if (error.status === 401) {
          setErrors({ password: 'Invalid username or password' });
        } else {
          console.error(error);
        }
      }
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Log In</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <input
              ref={usernameOrEmailRef}
              type='text'
              name='usernameOrEmail'
              value={formData.usernameOrEmail}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
              placeholder='Username or Email'
              className={`w-full p-2 border rounded-full ${
                errors.usernameOrEmail ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.usernameOrEmail && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.usernameOrEmail}
              </p>
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
        <p className='mt-4 text-center'>
          Don't have an account?{' '}
          <Link to='/signup' className='text-blue-500 hover:underline'>
            Sign Up
          </Link>
        </p>
        <div className='mt-6 bg-gray-100 p-4 rounded-lg'>
          <h3 className='font-semibold mb-2'>Example Login Credentials:</h3>
          <p>Username: johndoe</p>
          <p>Email: john.doe@example.com</p>
          <p className='text-sm text-gray-500 mt-2'>
            (Use either username or email to log in)
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
