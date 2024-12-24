const User = require('../models/user');
const Otp = require('../models/otp');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const CustomError = require('../utils/customError');

const asyncHandler = require('express-async-handler');

exports.register = asyncHandler(async (req, res, next) => {
  // if (req.user) {
  //   const err = new CustomError('You are already logged in', 400);
  //   return next(err);
  // }
  const { email, password, confirmPassword } = req.body;
  let user = await User.findOne({ email });
  const isPending = await Otp.find({ email });
  if (user?.isVerified) {
    const err = new CustomError('User already exists', 400);
    return next(err);
  }

  console.log(isPending);
  if (user && isPending.length > 0) {
    await Otp.deleteMany({ email });
    user.password = password;
    await user.save();
  } else {
    console.log(1);
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
  const hashOtp = crypto
    .createHash('sha256')
    .update(otp.toString())
    .digest('hex');
  const otpExpiresAt = Date.now() + 1000 * 60 * 5; // 5 minutes
  const otpData = {
    otp: hashOtp,
    email: email,
    expiresAt: otpExpiresAt,
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
  user = await User.findOne({ email });
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
  // const token = user.generateAuthToken();
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
  console.log(user._id);
  const otpDoc = await Otp.findOne({
    userId: user._id,
  });
  console.log(otpDoc);
  if (!otpDoc) {
    const err = new CustomError('Invalid credentials', 400);
    return next(err);
  }
  const isMatch = await bcrypt.compare(otp.toString(), otpDoc.otp);
  if (!isMatch) {
    const err = new CustomError('Invalid credentials', 400);
    const isMatch = otp.toString() === otpDoc.otp;
  }
  if (otpDoc.expiresAt < Date.now()) {
    const err = new CustomError('OTP has expired', 400);
    return next(err);
  }
  await otpDoc.deleteOne();
  // await User.updateOne(
  //   {
  //     email,
  //   },
  //   {
  //     isVerified: true,
  //   }
  // );

  res.status(200).send({
    success: true,
    message: 'OTP verified successfully',
  });
});
