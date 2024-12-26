const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
  {
    selection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Selection',
      required: true,
    },
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
    count: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Result', resultSchema);
