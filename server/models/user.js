const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { BoyTitles, GirlTitles, CoupleTitles } = require('../utils/enum');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    // votes: [{ type: String }],
    votedTitles: {
      type: [String],
      enum: [...BoyTitles, ...GirlTitles, ...CoupleTitles],
      default: [],
    },
    isVerified: { type: Boolean, default: false },
    deviceId: { type: String, select: false },
    additionalData: { type: String },
    userType: { type: String },
    section: { type: String },
    major: { type: String },
    year: { type: String },
    occupation: { type: String },
    isBanned: { type: Boolean, default: false },
    reasonForBan: { type: String },
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

module.exports = mongoose.model('User', userSchema);
