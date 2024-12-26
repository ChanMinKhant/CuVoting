const mongoose = require('mongoose');
const { BoyTitles, GirlTitles, CoupleTitles } = require('../utils/enum');

const resultSchema = new mongoose.Schema(
  {
    selectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Selection',
      required: true,
    },
    category: {
      type: String,
      enum: [...BoyTitles, ...GirlTitles, ...CoupleTitles],
      required: true,
    },
    count: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Result', resultSchema);
