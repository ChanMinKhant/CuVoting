const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    votes: [{ type: String }],
    votedTitles: {
      type: [String],
      enum: ['glory', 'smart', 'handsome', 'king', 'queen'],
      default: [],
    },
    isVerified: { type: Boolean, default: false },
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
