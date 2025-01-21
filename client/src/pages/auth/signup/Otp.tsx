import React, { useState, useRef, useEffect } from 'react';
import { submitOtp, resendOtp } from '../../../services/auth';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/store';
import ButtonLoader from '../../../components/ButtonLoader';

const OtpPage: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>(''); // Add state for messages
  const [errorMessage, setErrorMessage] = useState<string>(''); // Add state for error messages
  const [isResending, setIsResending] = useState<boolean>(false); // State to manage resend button
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Add state for submit loading
  const [resendTimer, setResendTimer] = useState<number>(30); // Initialize to 30 seconds on first load

  const { user, status } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (status === 'succeeded' && user) {
      navigate('/vote');
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
    setIsSubmitting(true); // Start loading
    setErrorMessage(''); // Clear previous error messages
    const otpValue = otpArray.join('');
    try {
      const data = await submitOtp(email!, otpValue);
      if (data.success) {
        alert('Account is verified successfully');
        window.location.href = '/vote';
      }
    } catch (error: any) {
      console.error('Error verifying OTP:');
      setErrorMessage(error?.message || 'Failed to verify OTP.');
    } finally {
      setIsSubmitting(false); // End loading
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return; // Prevent if timer is active
    setIsResending(true);
    setMessage('');
    setErrorMessage(''); // Clear previous error messages
    try {
      const data = await resendOtp(email!);
      if (data.success) {
        setMessage('OTP has been resent to your email.');
        setOtp(new Array(6).fill('')); // Clear OTP inputs
        setResendTimer(30); // Start 30-second timer
      }
    } catch (error: any) {
      console.error('Error resending OTP:');
      setErrorMessage(error?.message || 'Failed to resend OTP.');
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendTimer]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Add a computed value to check if all OTP fields are filled
  const isOtpComplete = otp.every((digit) => digit !== '');

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
                inputMode='numeric'
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
            disabled={!isOtpComplete || isSubmitting} // Update disabled property
            className={`w-full bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-500 transition-colors flex items-center justify-center ${
              (!isOtpComplete || isSubmitting) &&
              'opacity-50 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? <ButtonLoader /> : null}
            {isSubmitting ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
        {message && (
          <div className='text-center text-green-500 mb-4'>{message}</div>
        )}
        {errorMessage && (
          <div className='text-center text-red-500 mb-4'>{errorMessage}</div>
        )}
        <button
          type='button'
          onClick={handleResend}
          disabled={isResending || resendTimer > 0}
          className={`mt-4 w-full p-2 rounded-full transition-colors ${
            resendTimer > 0
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isResending
            ? 'Resending...'
            : resendTimer > 0
            ? `Resend OTP (${resendTimer}s)`
            : 'Resend OTP'}
        </button>
      </div>
    </div>
  );
};

export default OtpPage;
