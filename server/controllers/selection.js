const Selection = require('../models/selection');
const User = require('../models/user');
const Vote = require('../models/vote');
const Result = require('../models/result');
const asyncHandler = require('express-async-handler');
const CustomError = require('../utils/customError');
const mongoose = require('mongoose');

exports.getSelections = asyncHandler(async (req, res, next) => {
  if (!req.userId) {
    const err = new CustomError('You are not logged in', 400);
    return next(err);
  }
  const user = await User.findById(req.userId);
  if (!user) {
    const err = new CustomError('Something went wrong', 404);
    return next(err);
  }
  const Selections = await Selection.find();
  res.status(200).send({
    success: true,
    data: Selections,
    userVotedTitles: user.votedTitles,
  });
});

exports.voteSelection = asyncHandler(async (req, res) => {
  if (!req.user) {
    const err = new CustomError('You are not logged in', 400);
    return next(err);
  }
  const user = await User.findById(req.userId);
  if (!user) {
    const err = new CustomError('Something went wrong', 404);
    return next(err);
  }
  const { title, SelectionId } = req.body;
  const Selection = await Selection.findById(SelectionId);
  if (!Selection) {
    const err = new CustomError('Selection not found', 404);
    return next(err);
  }
  if (user.votedTitles.includes(title)) {
    const err = new CustomError('You have already voted for this title', 400);
    return next(err);
  }
  user.votedTitles.push(title);
  await user.save();
  Vote.create({
    user: req.userId,
    Selection: mongoose.Types.ObjectId(SelectionId),
    title,
  });
  const result = await Result.findOneAndUpdate(
    { Selection: mongoose.Types.ObjectId(SelectionId), category: title },
    { $inc: { count: 1 } }, // Increment count by 1 if the document exists
    { upsert: true, new: true, setDefaultsOnInsert: true } // Create if not exists
  );

  res.status(200).send({
    success: true,
    message: 'Vote submitted',
  });
});

exports.getUserVoted = asyncHandler(async (req, res, next) => {
  if (!req.userId) {
    const err = new CustomError('You are not logged in', 400);
    return next(err);
  }
  const user = await User.findById(req.userId);
});
