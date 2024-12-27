function Footer() {
  return (
    <footer className='bg-gray-800 text-white py-6'>
      <div className='container mx-auto text-center'>
        <p className='text-sm'>
          &copy; 2024 Pyay Computer University. All rights reserved.
        </p>
        <div className='flex justify-center space-x-4 my-4'>
          <a
            href='https://facebook.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src='/facebook.png' alt='Facebook' className='w-6 h-6' />
          </a>
          <a
            href='https://instagram.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src='/instagram.png' alt='Instagram' className='w-6 h-6' />
          </a>
          <a
            href='https://twitter.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src='/twitter.png' alt='Twitter' className='w-6 h-6' />
          </a>
        </div>
        <div className='text-sm'>
          <a href='/privacy-policy' className='hover:underline'>
            Privacy Policy
          </a>{' '}
          |{' '}
          <a href='/terms-of-service' className='hover:underline'>
            Terms of Service
          </a>{' '}
          |{' '}
          <a href='/contact-us' className='hover:underline'>
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
