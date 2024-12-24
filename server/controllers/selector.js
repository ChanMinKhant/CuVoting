const Selector = require('../models/selector');
const User = require('../models/user');
const Vote = require('../models/vote');
const asyncHandler = require('express-async-handler');

exports.getSelectors = asyncHandler(async (req, res) => {
  const selectors = await Selector.find();
  res.json(selectors);
});
