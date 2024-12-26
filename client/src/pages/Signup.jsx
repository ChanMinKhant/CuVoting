import { useState } from 'react';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation (you can add more checks here)
    let formIsValid = true;
    let tempErrors = { name: '', email: '', password: '' };

    if (!formData.name) {
      tempErrors.name = 'Name is required.';
      formIsValid = false;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email.';
      formIsValid = false;
    }
    if (!formData.password) {
      tempErrors.password = 'Password is required.';
      formIsValid = false;
    }

    setErrors(tempErrors);

    if (formIsValid) {
      console.log('Form submitted successfully', formData);
      // You can send formData to the backend here for registration.
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 py-6'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-sm'>
        <h2 className='text-2xl font-semibold text-center text-gray-800 mb-6'>
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.name && (
              <p className='text-red-500 text-sm mt-2'>{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-2'>{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.password && (
              <p className='text-red-500 text-sm mt-2'>{errors.password}</p>
            )}
          </div>

          <button
            type='submit'
            className='w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
          >
            Sign Up
          </button>
        </form>

        <div className='mt-4 text-center'>
          <p className='text-sm text-gray-600'>
            Already have an account?{' '}
            <a href='/login' className='text-blue-600 hover:underline'>
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
