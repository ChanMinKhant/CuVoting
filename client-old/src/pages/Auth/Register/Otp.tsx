import React, { useState } from 'react';
import { submitOtp } from './../../../services/auth';

const SubmitOtp: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      //get email from session storage
      const email = sessionStorage.getItem('email');
      console.log('Email:', email);
      const response = await submitOtp(email, otp);

      console.log('OTP submitted successfully:', response);
      // Handle success, e.g., redirect or show a success message
    } catch (err: any) {
      console.error('Error submitting OTP:', err);
      setError(err.message || 'An error occurred while submitting OTP.');
    }
  };

  return (
    <div>
      <h2>Submit OTP</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>OTP:</label>
          <input
            type='text'
            name='otp'
            value={otp}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default SubmitOtp;
