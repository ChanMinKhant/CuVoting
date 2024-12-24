const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    selector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Selector',
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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vote', voteSchema);
