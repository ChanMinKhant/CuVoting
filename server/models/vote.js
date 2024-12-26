const mongoose = require('mongoose');
const { BoyTitles, GirlTitles, CoupleTitles } = require('../utils/enum');

const voteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vote', voteSchema);
