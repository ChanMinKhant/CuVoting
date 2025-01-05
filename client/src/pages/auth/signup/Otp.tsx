import React, { useState, useRef, useEffect } from 'react';
import { submitOtp } from '../../../services/auth';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/store';

const OtpPage: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const { user, status } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (status === 'succeeded' && user) {
      navigate('/home');
    }
  }, [status, user, navigate]);

  const email: string | null = sessionStorage.getItem('email');
  if (!email) {
    navigate('/signup');
  }

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      } else {
        await handleSubmit(newOtp);
      }
    } else if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData('text');
    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split('');
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
      handleSubmit(newOtp);
    }
  };

  const handleSubmit = async (otpArray = otp) => {
    const otpValue = otpArray.join('');
    console.log('OTP Submitted:', otpValue);
    try {
      const data = await submitOtp(email!, otpValue);
      if (data.success) {
        alert('Account is verified successfully');
        window.location.href = '/home';
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Enter OTP</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className='space-y-4'
        >
          <div className='flex justify-center space-x-2'>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type='text'
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className='w-12 h-12 text-center text-2xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all'
              />
            ))}
          </div>
          <button
            type='submit'
            className='w-full bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-500 transition-colors'
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpPage;
