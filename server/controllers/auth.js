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

exports.register = asyncHandler(async (req, res, next) => {
  // if (req.user) {
  //   const err = new CustomError('You are already logged in', 400);
  //   return next(err);
  // }
  const {
    email,
    password,
    confirmPassword,
    username,
    section,
    year,
    major,
    deviceId,
  } = req.body;
  console.log(req.body);
  const { error } = registerSchema.validate(req.body);
  // console.log(error);
  if (error) {
    const err = new CustomError(error.details[0].message, 400);
    return next(err);
  }
  const isAlreadyRegisteredDevice = await User.findOne({
    deviceId,
    isVerified: true,
  });
  if (isAlreadyRegisteredDevice) {
    const err = new CustomError(
      `You've already register with ${isAlreadyRegisteredDevice.email}, you can login with this email`,
      400
    );
    return next(err);
  }

  let user = await User.findOne({ email });
  const isPending = await Otp.find({ email });
  if (user?.isVerified) {
    const err = new CustomError('User already exists', 400);
    return next(err);
  }

  if (user || isPending.length > 0) {
    await Otp.deleteMany({ email });
    await user.deleteOne();
  }

  if (password !== confirmPassword) {
    const err = new CustomError('Passwords do not match', 400);
    return next(err);
  }

  user = await User.create(req.body);

  //send otp
  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log(otp);

  // hash the otp
  const hashOtp = bcrypt.hashSync(otp.toString(), 10);
  const otpData = {
    otp: hashOtp,
    email: email,
  };

  const otpDoc = await Otp.create(otpData);
  if (!otpDoc) {
    await user.deleteOne();
    const err = new CustomError('Something went wrong', 500);
    return next(err);
  }

  //send otp here
  const message = `Your OTP is ${otp}`;
  try {
    const subject = 'OTP for email verification';
    await sendMail(email, subject, message);
  } catch (error) {
    await user.deleteOne();
    await otpDoc.deleteOne();
    console.log(error);
    const err = new CustomError('Email could not be sent', 500);
    return next(err);
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
    const err = new CustomError('Invalid credentials', 400);
    return next(err);
  }
  // compare the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new CustomError('Invalid credentials', 400);
    return next(err);
  }
  // generate token
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });

  // set cookie
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + (process.env.COOKIE_EXPIRES_IN || 365) * 24 * 60 * 60 * 1000
    ),
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
      expiresIn: process.env.JWT_EXPIRE || '30d',
    }
  );

  //set cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
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
    expiresIn: process.env.JWT_EXPIRE || '30d',
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
