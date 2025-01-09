const Selection = require('../models/selection');
const User = require('../models/user');
const Vote = require('../models/vote');
const Result = require('../models/result');
const asyncHandler = require('express-async-handler');
const CustomError = require('../utils/CustomError');
const mongoose = require('mongoose');
const { BoyTitles, GirlTitles, CoupleTitles } = require('../utils/enum');

exports.getSelections = asyncHandler(async (req, res, next) => {
  // query for boy, girls, and couples
  // const { gender } = req.query;
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

exports.voteSelection = asyncHandler(async (req, res, next) => {
  if (!req.userId) {
    const err = new CustomError('You are not logged in', 400);
    return next(err);
  }
  const user = await User.findById(req.userId);
  if (!user) {
    const err = new CustomError('Something went wrong', 404);
    return next(err);
  }
  const { title, selectionId } = req.body;
  console.log(title);
  const selection = await Selection.findById(selectionId);
  if (!selection) {
    const err = new CustomError('Selection not found', 404);
    return next(err);
  }
  // console.log(BoyTitles);
  // for couple. i will count for a boy. mean that if some on vote for a couple, i will count for a boy bcz of same number with girl.
  if (
    selection.gender === 'boy' &&
    ![...BoyTitles, ...CoupleTitles].includes(title)
  ) {
    const err = new CustomError('Invalid title', 400);
    return next(err);
  }

  if (selection.gender === 'girl' && !GirlTitles.includes(title)) {
    const err = new CustomError('Invalid title', 400);
    return next(err);
  }

  // for couple. i will count for a boy. mean that if some on vote for a couple, i will count for a boy bcz of same number with girl.
  if (selection.gender === 'boy' && !CoupleTitles.includes(title)) {
    const err = new CustomError('Invalid title', 400);
    return next(err);
  }

  if (user.votedTitles.includes(title)) {
    const err = new CustomError('You have already voted for this title', 400);
    return next(err);
  }

  user.votedTitles.push(title);
  await user.save();
  await Vote.create({
    user: req.userId,
    selectionId: new mongoose.Types.ObjectId(selectionId),
    category: title,
  });
  const result = await Result.findOneAndUpdate(
    { selectionId: new mongoose.Types.ObjectId(selectionId), category: title },
    { $inc: { count: 1 } }, // Increment count by 1 if the document exists
    { upsert: true, new: true, setDefaultsOnInsert: true } // Create if not exists
  );

  if (!result) {
    const err = new CustomError('Something went wrong', 500);
    return next(err);
  }

  res.status(200).send({
    success: true,
    message: 'Vote submitted',
  });
});

exports.getUserVotedHistories = asyncHandler(async (req, res, next) => {
  if (!req.userId) {
    const err = new CustomError('You are not logged in', 400);
    return next(err);
  }
  const user = await User.findById(req.userId);
  if (!user) {
    const err = new CustomError('Something went wrong', 404);
    return next(err);
  }
  const votes = await Vote.find(
    { user: req.userId },
    '-createdAt -updatedAt'
  ).populate('selectionId', 'name number gender');
  // console.log(votes);
  res.status(200).send({
    success: true,
    data: votes,
  });
});

// need to implement
exports.deleteVote = asyncHandler(async (req, res, next) => {
  if (!req.userId) {
    const err = new CustomError('You are not logged in', 400);
    return next(err);
  }
  const user = await User.findById(req.userId);
  if (!user) {
    const err = new CustomError('Something went wrong', 404);
    return next(err);
  }
  const { voteId } = req.params;
  const vote = await Vote.findById(voteId);
  if (!vote) {
    const err = new CustomError('Vote not found', 404);
    return next(err);
  }
  if (vote.user.toString() !== req.userId) {
    const err = new CustomError('Unauthorized', 401);
    return next(err);
  }
  await vote.deleteOne();

  user.votedTitles = user.votedTitles.filter(
    (title) => title !== vote.category
  );
  await user.save();
  const result = await Result.findOne({
    selectionId: new mongoose.Types.ObjectId(vote.selectionId),
    category: vote.category,
  });
  console.log(result);
  result.count -= 1;
  await result.save();
  res.status(200).send({
    success: true,
    message: 'Vote deleted',
  });
});

exports.getWinners = asyncHandler(async (req, res, next) => {
  const Result = await Result.find();
  if (!Result) {
    const err = new CustomError('Something went wrong', 500);
    return next(err);
  }
});
