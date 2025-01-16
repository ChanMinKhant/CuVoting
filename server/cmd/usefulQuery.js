require('dotenv').config({ path: './../config.env' });
const connectToDatabase = require('../config/db');
const fs = require('fs');
const Otp = require('../models/otp');
const User = require('../models/user');
const Result = require('../models/result');
const Selection = require('../models/selection');
const Vote = require('../models/vote');
const moment = require('moment-timezone');
const path = require('path');
connectToDatabase();

const cmd = process.argv[2];

const useFulQueries = () => {
  const id = process.argv[3];
  // if user type -uvs id(user's id)
  // will return all selection's numbers and name of that user voted
  if (cmd === '-uvs') {
    userVotedSelection(id);
  }

  // if user type -svu id(selection's id)
  // will return all user's id who voted that selection
  if (cmd === '-svu') {
    selectionVotedUser(id);
  }
};

const userVotedSelection = async (id) => {
  console.log('userVotedSelection');
  const user = await User.findById(id);
  const votes = await Vote.find({ user: id }).populate('selectionId');
  console.log('.....................................');
  console.log(`user ${user.username} voted`);
  votes.forEach((vote) => {
    console.log(
      `No.${vote.selectionId.number} - ${vote.selectionId.name}, ${vote.category}`,
    );
    console.log('.....................................');
  });
};

const selectionVotedUser = async (id) => {
  console.log('selectionVotedUser');
  const selection = await Selection.findById(id);
  const votes = await Vote.find({ selectionId: id }).populate('user');
  console.log('.....................................');
  console.log(`selection no.${selection.number} ${selection.name} voted by`);
  votes.forEach((vote) => {
    console.log(`user ${vote.user.username}`);
    console.log('.....................................');
  });
};

useFulQueries();
