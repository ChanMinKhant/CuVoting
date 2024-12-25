const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, // OTP will expire after 5 minutes
    },
  },
  {
    timestamps: true,
  }
);

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;
