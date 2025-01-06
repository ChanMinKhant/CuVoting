const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { BoyTitles, GirlTitles, CoupleTitles } = require('../utils/enum');

const userSchema = new mongoose.Schema(
  {
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
