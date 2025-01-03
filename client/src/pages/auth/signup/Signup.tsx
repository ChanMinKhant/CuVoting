import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { register } from '../../../services/auth';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: string;
  section?: string;
  major?: string;
  year?: string;
  occupation?: string;
  deviceId: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    section: '',
    major: '',
    year: '',
    occupation: '',
    deviceId: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const userTypeRef = useRef<HTMLSelectElement>(null);
  const sectionRef = useRef<HTMLSelectElement>(null);
  const majorRef = useRef<HTMLSelectElement>(null);
  const yearRef = useRef<HTMLSelectElement>(null);
  const occupationRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  const validatePassword = (password: string): string[] => {
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

  const getFingerprint = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    // setFingerprint(result.visitorId); // Unique fingerprint
    return result.visitorId;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};

    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors.join('. ');
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.userType) newErrors.userType = 'User type is required';

    if (formData.userType === 'student') {
      if (!formData.section) newErrors.section = 'Section is required';
      if (!formData.major) newErrors.major = 'Major is required';
      if (!formData.year) newErrors.year = 'Year is required';
    } else if (formData.userType === 'other') {
      if (!formData.occupation) newErrors.occupation = 'Occupation is required';
    }

    setErrors(newErrors);

    const deviceId = await getFingerprint();
    setFormData((prev) => ({ ...prev, deviceId }));

    if (Object.keys(newErrors).length === 0) {
      try {
        const data = await register(formData);
        if (data.success) {
          alert('User registered successfully');
          // save email to session storage
          sessionStorage.setItem('email', formData.email);
          // go to otp page
          navigate('/otp');
        }
      } catch (error: any) {
        sessionStorage.setItem('email', formData.email);
        console.log(error);
      }
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Create Account</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <input
              ref={usernameRef}
              type='text'
              name='username'
              value={formData.username}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, emailRef)}
              placeholder='Username'
              className={`w-full p-2 border rounded-full ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.username && (
              <p className='text-red-500 text-sm mt-1'>{errors.username}</p>
            )}
          </div>
          <div>
            <input
              ref={emailRef}
              type='email'
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
              onKeyDown={(e) => handleKeyDown(e, confirmPasswordRef)}
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
          <div className='relative'>
            <input
              ref={confirmPasswordRef}
              type={showConfirmPassword ? 'text' : 'password'}
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, userTypeRef)}
              placeholder='Confirm Password'
              className={`w-full p-2 border rounded-full ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='absolute right-3 top-1/2 transform -translate-y-1/2'
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.confirmPassword && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div>
            <select
              ref={userTypeRef}
              name='userType'
              value={formData.userType}
              onChange={handleChange}
              onKeyDown={(e) =>
                handleKeyDown(
                  e,
                  formData.userType === 'student' ? sectionRef : occupationRef
                )
              }
              className={`w-full p-2 border rounded-full ${
                errors.userType ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value=''>Select user type</option>
              <option value='student'>Student</option>
              <option value='other'>Other</option>
            </select>
            {errors.userType && (
              <p className='text-red-500 text-sm mt-1'>{errors.userType}</p>
            )}
          </div>
          {formData.userType === 'student' && (
            <>
              <div>
                <select
                  ref={sectionRef}
                  name='section'
                  value={formData.section}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, majorRef)}
                  className={`w-full p-2 border rounded-full ${
                    errors.section ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value=''>Select section</option>
                  <option value='A'>Section A</option>
                  <option value='B'>Section B</option>
                  <option value='C'>Section C</option>
                </select>
                {errors.section && (
                  <p className='text-red-500 text-sm mt-1'>{errors.section}</p>
                )}
              </div>
              <div>
                <select
                  ref={majorRef}
                  name='major'
                  value={formData.major}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, yearRef)}
                  className={`w-full p-2 border rounded-full ${
                    errors.major ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value=''>Select major</option>
                  <option value='Computer Sci'>Computer Science</option>
                  <option value='Computer Tech'>Computer Technology</option>
                </select>
                {errors.major && (
                  <p className='text-red-500 text-sm mt-1'>{errors.major}</p>
                )}
              </div>
              <div>
                <select
                  ref={yearRef}
                  name='year'
                  value={formData.year}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-full ${
                    errors.year ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value=''>Select year</option>
                  <option value='1'>First Year</option>
                  <option value='2'>Second Year</option>
                  <option value='3'>Third Year</option>
                  <option value='4'>Fourth Year</option>
                  <option value='5'>Fifth Year</option>
                </select>
                {errors.year && (
                  <p className='text-red-500 text-sm mt-1'>{errors.year}</p>
                )}
              </div>
            </>
          )}
          {formData.userType === 'other' && (
            <div>
              <input
                ref={occupationRef}
                type='text'
                name='occupation'
                value={formData.occupation}
                onChange={handleChange}
                placeholder='Occupation/Other Details'
                className={`w-full p-2 border rounded-full ${
                  errors.occupation ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.occupation && (
                <p className='text-red-500 text-sm mt-1'>{errors.occupation}</p>
              )}
            </div>
          )}
          <button
            type='submit'
            className='w-full bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-500 transition-colors'
          >
            Sign Up
          </button>
        </form>
        <p className='mt-4 text-center'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-500 hover:underline'>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
