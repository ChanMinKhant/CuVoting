const mongoose = require('mongoose');

const selectionSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true, enum: ['boy', 'girl', 'couple'] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Selection', selectionSchema);
