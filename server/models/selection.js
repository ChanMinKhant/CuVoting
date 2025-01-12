const mongoose = require('mongoose');

const selectionSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    height: { type: Number, required: true },
    gender: { type: String, required: true, enum: ['boy', 'girl', 'couple'] },
    sign: { type: String },
    favColor: { type: String },
    talent: { type: String },
    hobby: { type: String },
    personality: { type: String },
    social: { type: [String] },
    city: { type: String },
    ambition: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Selection', selectionSchema);
