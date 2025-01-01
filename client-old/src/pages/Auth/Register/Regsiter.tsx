import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

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
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
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

  const handleSubmit = (e: React.FormEvent) => {
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

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
      <h2 className='text-2xl font-bold mb-6 text-center'>Create Account</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <input
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
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
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
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
        <div className='relative'>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
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
            name='userType'
            value={formData.userType}
            onChange={handleChange}
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
                name='section'
                value={formData.section}
                onChange={handleChange}
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
                name='major'
                value={formData.major}
                onChange={handleChange}
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
  );
};

export default RegisterForm;
