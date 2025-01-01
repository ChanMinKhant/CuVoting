import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from '@/components/ui/link';

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

export function RegisterForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>({
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
  const [errors, setErrors] = React.useState<Partial<FormData>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};

    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword)
      newErrors.confirmPassword = 'Please confirm your password';
    if (!formData.userType) newErrors.userType = 'Please select a user type';

    if (formData.userType === 'student') {
      if (!formData.section) newErrors.section = 'Please select a section';
      if (!formData.major) newErrors.major = 'Please select a major';
      if (!formData.year) newErrors.year = 'Please select a year';
    } else if (formData.userType === 'other') {
      if (!formData.occupation)
        newErrors.occupation = 'Please provide your occupation';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Form is valid, proceed with submission
      console.log('Form submitted:', formData);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.currentTarget.form;
      const index = Array.prototype.indexOf.call(form, e.currentTarget);
      form?.elements[index + 1]?.focus();
    }
  };

  return (
    <div className='w-full max-w-[440px] mx-auto px-4'>
      <div className='mb-12'>
        <h1 className='text-[32px] font-normal text-center'>Create Account</h1>
      </div>

      <form className='space-y-4' onSubmit={handleSubmit}>
        <div>
          <Input
            type='text'
            name='username'
            placeholder='Username'
            value={formData.username}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={`h-14 px-4 rounded-full border-gray-200 ${
              errors.username ? 'border-red-500' : ''
            }`}
          />
          {errors.username && (
            <p className='text-red-500 text-sm mt-1'>{errors.username}</p>
          )}
        </div>

        <div>
          <Input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={`h-14 px-4 rounded-full border-gray-200 ${
              errors.email ? 'border-red-500' : ''
            }`}
          />
          {errors.email && (
            <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
          )}
        </div>

        <div className='relative'>
          <Input
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={`h-14 px-4 rounded-full border-gray-200 pr-12 ${
              errors.password ? 'border-red-500' : ''
            }`}
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500'
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && (
            <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
          )}
        </div>

        <div className='relative'>
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            name='confirmPassword'
            placeholder='Confirm Password'
            value={formData.confirmPassword}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={`h-14 px-4 rounded-full border-gray-200 pr-12 ${
              errors.confirmPassword ? 'border-red-500' : ''
            }`}
          />
          <button
            type='button'
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500'
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.confirmPassword && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <Select
          name='userType'
          value={formData.userType}
          onValueChange={(value) =>
            handleChange({
              target: { name: 'userType', value },
            } as React.ChangeEvent<HTMLSelectElement>)
          }
        >
          <SelectTrigger
            className={`h-14 px-4 rounded-full border-gray-200 ${
              errors.userType ? 'border-red-500' : ''
            }`}
          >
            <SelectValue placeholder='Select user type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='student'>Student</SelectItem>
            <SelectItem value='other'>Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.userType && (
          <p className='text-red-500 text-sm mt-1'>{errors.userType}</p>
        )}

        {formData.userType === 'student' && (
          <>
            <Select
              name='section'
              value={formData.section}
              onValueChange={(value) =>
                handleChange({
                  target: { name: 'section', value },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
            >
              <SelectTrigger
                className={`h-14 px-4 rounded-full border-gray-200 ${
                  errors.section ? 'border-red-500' : ''
                }`}
              >
                <SelectValue placeholder='Select section' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='A'>Section A</SelectItem>
                <SelectItem value='B'>Section B</SelectItem>
                <SelectItem value='C'>Section C</SelectItem>
              </SelectContent>
            </Select>
            {errors.section && (
              <p className='text-red-500 text-sm mt-1'>{errors.section}</p>
            )}

            <Select
              name='major'
              value={formData.major}
              onValueChange={(value) =>
                handleChange({
                  target: { name: 'major', value },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
            >
              <SelectTrigger
                className={`h-14 px-4 rounded-full border-gray-200 ${
                  errors.major ? 'border-red-500' : ''
                }`}
              >
                <SelectValue placeholder='Select major' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='cs'>Computer Science</SelectItem>
                <SelectItem value='ct'>Computer Technology</SelectItem>
              </SelectContent>
            </Select>
            {errors.major && (
              <p className='text-red-500 text-sm mt-1'>{errors.major}</p>
            )}

            <Select
              name='year'
              value={formData.year}
              onValueChange={(value) =>
                handleChange({
                  target: { name: 'year', value },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
            >
              <SelectTrigger
                className={`h-14 px-4 rounded-full border-gray-200 ${
                  errors.year ? 'border-red-500' : ''
                }`}
              >
                <SelectValue placeholder='Select year' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='1'>First Year</SelectItem>
                <SelectItem value='2'>Second Year</SelectItem>
                <SelectItem value='3'>Third Year</SelectItem>
                <SelectItem value='4'>Fourth Year</SelectItem>
                <SelectItem value='5'>Fifth Year</SelectItem>
              </SelectContent>
            </Select>
            {errors.year && (
              <p className='text-red-500 text-sm mt-1'>{errors.year}</p>
            )}
          </>
        )}

        {formData.userType === 'other' && (
          <div>
            <Input
              name='occupation'
              placeholder='Occupation/Other Details'
              value={formData.occupation}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className={`h-14 px-4 rounded-full border-gray-200 ${
                errors.occupation ? 'border-red-500' : ''
              }`}
            />
            {errors.occupation && (
              <p className='text-red-500 text-sm mt-1'>{errors.occupation}</p>
            )}
          </div>
        )}

        <div className='flex items-center space-x-2'>
          <Checkbox id='terms' />
          <label htmlFor='terms' className='text-sm'>
            Accept{' '}
            <a href='#' className='text-blue-600 hover:underline'>
              Legal Agreements
            </a>
          </label>
        </div>

        <Button
          type='submit'
          className='w-full h-14 rounded-full bg-[#FFE600] hover:bg-[#FFE600]/90 text-black font-medium'
        >
          Sign Up
        </Button>

        <p className='text-center text-gray-600'>
          Already Have an Account?{' '}
          <Link href='/login' className='text-blue-600 hover:underline'>
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}
