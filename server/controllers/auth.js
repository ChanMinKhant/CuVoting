const User = require('../models/user');
const Otp = require('../models/otp');
const bcrypt = require('bcrypt');
const CustomError = require('../utils/CustomError');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { sendMail } = require('../utils/sendMail');
const {
  registerSchema,
  loginSchema,
  otpSchema,
  deviceIdSchema,
} = require('../validate/auth');

// Utility function to normalize email by removing dots before '@'
function normalizeEmail(email) {
  const [local, domain] = email.split('@');
  return `${local.replace(/\./g, '')}@${domain}`;
}

exports.register = asyncHandler(async (req, res, next) => {
  const { email, password, confirmPassword, deviceId } = req.body;

  // Validate request data
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }

  req.body.email = normalizeEmail(email);

  // Check for password mismatch
  if (password !== confirmPassword) {
    return next(new CustomError('Passwords do not match', 400));
  }

  // Check if the device is already registered
  const existingDeviceUser = await User.findOne({ deviceId, isVerified: true });
  if (existingDeviceUser) {
    return next(
      new CustomError(
        `This device is already registered with ${existingDeviceUser.email}. You can log in with this email.`,
        400,
      ),
    );
  }

  // Check if the email is already registered or has a pending OTP
  let existingUser = await User.findOne({ email });
  const pendingOtps = await Otp.find({ email });

  if (existingUser?.isVerified) {
    return next(new CustomError('User already exists', 400));
  }

  // Clean up unverified accounts or pending OTPs
  if (existingUser || pendingOtps.length > 0) {
    await Otp.deleteMany({ email });
    if (existingUser) {
      await existingUser.deleteOne();
    }
  }

  // Create the new user
  const newUser = await User.create(req.body);

  // Generate and hash OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = bcrypt.hashSync(otp, 10);

  // Save OTP to database
  const otpDoc = await Otp.create({ otp: hashedOtp, email });
  if (!otpDoc) {
    await newUser.deleteOne();
    return next(new CustomError('Failed to create OTP', 500));
  }

  // Send OTP via email
  const subject = 'OTP for Email Verification';
  const message = `Your OTP is ${otp}`;
  try {
    await sendMail(email, subject, message);
  } catch (err) {
    await newUser.deleteOne();
    await otpDoc.deleteOne();
    console.error('Email sending error:', err);
    return next(new CustomError('Failed to send OTP email', 500));
  }

  res.status(200).send({
    success: true,
    message: 'OTP has been sent to your email.',
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  // if (req.user) {
  //   const err = new CustomError('You are already logged in', 400);
  //   return next(err);
  // }
  const { email, password } = req.body;
  const { error } = loginSchema.validate(req.body);
  if (error) {
    const err = new CustomError(error.details[0].message, 400);
    return next(err);
  }
  // find the user in the database
  const user = await User.findOne({ email }, '+password');
  if (!user || !user?.isVerified) {
    const err = new CustomError('invalid email or password', 400);
    return next(err);
  }
  // compare the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new CustomError('Invalid email or password', 400);
    return next(err);
  }
  // generate token
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: '365d',
  });

  // set cookie
  res.cookie('jwt', token, {
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
  });

  res.status(200).send({
    success: true,
    message: 'Logged in successfully',
  });
});

exports.submitOtp = asyncHandler(async (req, res, next) => {
  const { email, otp } = req.body;
  const { error } = otpSchema.validate(req.body);
  if (error) {
    const err = new CustomError(error.details[0].message, 400);
    return next(err);
  }
  const user = await User.findOne({
    email,
  });
  console.log(email, otp);
  if (!user) {
    const err = new CustomError('Invalid credentials', 400);
    return next(err);
  }
  console.log(user._id);
  const otpDoc = await Otp.findOne({ email });
  if (!otpDoc) {
    const err = new CustomError('Invalid OTP', 400);
    return next(err);
  }

  const isMatch = await bcrypt.compare(otp.toString(), otpDoc.otp);
  if (!isMatch) {
    const err = new CustomError('Invalid credentials', 400);
    return next(err);
  }

  //delete the otp
  await Otp.deleteOne();
  user.isVerified = true;
  await user.save();

  //generate token
  const token = jwt.sign(
    { id: user._id.toString() },
    process.env.TOKEN_SECRET,
    {
      expiresIn: '365d',
    },
  );

  //set cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 365 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: 'None',
    secure: true,
  });

  // send mail to user
  const message = 'Your account has been verified';
  const subject = 'Account verified';
  try {
    await sendMail(email, subject, message);
  } catch (error) {
    console.log(error);
  }
  res.status(200).send({
    success: true,
    message: 'OTP verified successfully',
  });
});

exports.resendOtp = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    const err = new CustomError('Email is required', 400);
    return next(err);
  }
  const user = await User.findOne({ email });
  if (!user) {
    const err = new CustomError('Invalid credentials', 400);
    return next(err);
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = bcrypt.hashSync(otp, 10);
  const otpDoc = await Otp.findOneAndUpdate(
    { email },
    { otp: hashedOtp, email },
    { upsert: true, new: true },
  );

  if (!otpDoc) {
    const err = new CustomError('Failed to create OTP', 500);
    return next(err);
  }

  // Send OTP via email
  const subject = 'OTP for Email Verification';
  const message = `Your OTP is ${otp}`;
  try {
    await sendMail(email, subject, message);
  } catch (err) {
    await otpDoc.deleteOne();
    console.error('Email sending error:', err);
    return next(new CustomError('Failed to send OTP email', 500));
  }

  res.status(200).send({
    success: true,
    message: 'OTP has been sent to your email.',
  });
});

//deviceId
exports.detectedDeviceAccount = asyncHandler(async (req, res, next) => {
  const { deviceId } = req.body;
  const { error } = deviceIdSchema.validate(req.body);
  if (error) {
    const err = new CustomError(error.details[0].message, 400);
    return next(err);
  }
  const user = await User.findOne({ deviceId });
  if (!user) {
    const err = new CustomError('Invalid credentials', 400);
    return next(err);
  }

  res.status(200).send({
    success: true,
    user,
    message: 'you can login this accound with this device',
  });
});

exports.loginWithDeviceId = asyncHandler(async (req, res, next) => {
  const { deviceId } = req.body;
  const { error } = deviceIdSchema.validate(req.body);
  if (error) {
    const err = new CustomError(error.details[0].message, 400);
    return next(err);
  }
  const user = await User.findOne({ deviceId });
  if (!user) {
    const err = new CustomError('Invalid credentials', 400);
    return next(err);
  }
  // generate token
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: '365d',
  });

  //set cookie
  res.cookie('jwt', token, {
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
  });

  res.status(200).send({
    success: true,
    message: 'Logged in successfully',
  });
});

exports.getMe = asyncHandler(async (req, res, next) => {
  if (!req.userId) {
    const err = new CustomError('You are not login!', 400);
    return next(err);
  }
  const user = await User.findById(req.userId);
  if (!user) {
    const err = new CustomError('User not found', 404);
    return next(err);
  }
  res.status(200).send({
    success: true,
    user,
  });
});

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('jwt', '', { path: '/', maxAge: 1 });
  res.status(200).send({
    success: true,
    message: 'Logged out successfully',
  });
});
