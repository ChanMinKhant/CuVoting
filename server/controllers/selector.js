const Selector = require('../models/selector');
const User = require('../models/user');
const Vote = require('../models/vote');
const asyncHandler = require('express-async-handler');

exports.getSelectors = asyncHandler(async (req, res) => {
  if (!req.user) {
    const err = new CustomError('You are not logged in', 400);
    return next(err);
  }
  const user = await User.findById(req.userId);
  if (!user) {
    const err = new CustomError('Something went wrong', 404);
    return next(err);
  }
  const selectors = await Selector.find();
  res.status(200).send({
    success: true,
    selectors,
    votedTitles: user.votedTitles,
  });
});

exports.voteSelector = asyncHandler(async (req, res) => {
  if (!req.user) {
    const err = new CustomError('You are not logged in', 400);
    return next(err);
  }
  const user = await User.findById(req.userId);
  if (!user) {
    const err = new CustomError('Something went wrong', 404);
    return next(err);
  }
  const { title, selectorId } = req.body;
  const selector = await Selector.findById(selectorId);
  if (!selector) {
    const err = new CustomError('Selector not found', 404);
    return next(err);
  }
  if (user.votedTitles.includes(title)) {
    const err = new CustomError('You have already voted for this title', 400);
    return next(err);
  }
  user.votedTitles.push(title);
  await user.save();
  selector.votes.push({ title, userId: req.userId });
  await selector.save();
  res.status(200).send({
    success: true,
    message: 'Vote submitted',
  });
});
