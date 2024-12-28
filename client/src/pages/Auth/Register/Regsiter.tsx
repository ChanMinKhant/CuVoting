import React, { useState } from 'react';
import { register } from './../../../services/auth';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  section: string;
  year: string;
  deviceId: string;
};

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    section: '',
    year: '',
    deviceId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation logic can be added here (e.g., password matching)
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    console.log('Registration data:', formData);

    // Add logic to send data to the backend
    // fetch('/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // }).then(response => response.json())
    //   .then(data => console.log(data));

    try {
      const response = await register(formData);
      console.log(response);
      //save email in seeion storage
      sessionStorage.setItem('email', formData.email);
      //get from session
      // negative path: redirect to OTP page
      window.location.href = '/otp';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type='password'
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          type='text'
          name='username'
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Section:</label>
        <input
          type='text'
          name='section'
          value={formData.section}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Year:</label>
        <input
          type='text'
          name='year'
          value={formData.year}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Device ID:</label>
        <input
          type='text'
          name='deviceId'
          value={formData.deviceId}
          onChange={handleChange}
          required
        />
      </div>
      <button type='submit'>Register</button>
    </form>
  );
};

export default Register;
