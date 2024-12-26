const User = require('../models/user');
const Otp = require('../models/otp');
const bcrypt = require('bcrypt');
const CustomError = require('../utils/customError');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

exports.register = asyncHandler(async (req, res, next) => {
  // if (req.user) {
  //   const err = new CustomError('You are already logged in', 400);
  //   return next(err);
  // }
  const { email, password, confirmPassword, username, section, year } =
    req.body;
  let user = await User.findOne({ email });
  const isPending = await Otp.find({ email });
  if (user?.isVerified) {
    const err = new CustomError('User already exists', 400);
    return next(err);
  }

  if (user && isPending.length > 0) {
    await Otp.deleteMany({ email });
    user.password = password;
    await user.save();
  } else {
    user = await User.create({
      email,
      password,
    });
  }

  if (password !== confirmPassword) {
    const err = new CustomError('Passwords do not match', 400);
    return next(err);
  }

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
  res.status(200).send({
    success: true,
    message: 'OTP has been sent to your email.',
  });
  // const message = `Your OTP is ${otp}`;
  // try {
  //   await sendEmail({
  //     email,
  //     subject: 'Verify Your Email',
  //     message,
  //   });
  // } catch (error) {
  //   await user.deleteOne();
  //   await otpDoc.deleteOne();
  //   const err = new CustomError('Email could not be sent', 500);
  //   return next(err);
  // }
});

exports.login = asyncHandler(async (req, res, next) => {
  // if (req.user) {
  //   const err = new CustomError('You are already logged in', 400);
  //   return next(err);
  // }
  const { email, password } = req.body;
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
  const user = await User.findOne({
    email,
  });
  if (!user) {
    const err = new CustomError('Invalid credentials', 400);
    return next(err);
  }
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
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });

  //set cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: 'None',
    secure: true,
  });

  res.status(200).send({
    success: true,
    message: 'OTP verified successfully',
  });
});
