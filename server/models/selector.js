const mongoose = require('mongoose');

const selectorSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true, enum: ['boy', 'girl', 'couple'] },
    title: { type: String, required: true }, // e.g., Handsome, Beauty, Best Couple
    votes: { type: Number, default: 0 }, // Track votes for the selector
    category: {
      type: String,
      enum: [
        'handsome',
        'smart',
        'attractive',
        'beauty',
        'glory',
        'grace',
        'bestCouple',
      ],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Selector', selectorSchema);
