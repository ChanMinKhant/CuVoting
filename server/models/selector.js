const mongoose = require('mongoose');

const selectorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
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
