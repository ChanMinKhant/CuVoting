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

  // if user type -ub id(user's id) reason
  // will ban the user
  if (cmd === '-ub') {
    banUser(id);
  }

  // if user type -unb id(user's id)
  // will unban the user
  if (cmd === '-unb') {
    unBanUser(id);
  }

  // if user type -urv id(user's id)
  // will restart the user's vote
  if (cmd === '-urv') {
    restartUserVote(id);
  }

  // if user type -ud id(user's id)
  // will return the user's data
  if (cmd === '-ud') {
    userData(id);
  }

  // if user type -udd email username
  // will return the user's data
  if (cmd === '-udd') {
    userDataWithDetail();
  }
};

const userVotedSelection = async (id) => {
  try {
    console.log('userVotedSelection');
    const user = await User.findById(id);
    const votes = await Vote.find({ user: id }).populate('selectionId');
    console.log('.....................................');
    console.log(`user ${user.username} voted`);
    votes.forEach((vote) => {
      console.log(
        `No.${vote.selectionId.number} - ${vote.selectionId.name}, ${vote.category}`
      );
      console.log('.....................................');
    });
  } catch (error) {
    console.log(error);
  }
};

const selectionVotedUser = async (id) => {
  try {
    console.log('selectionVotedUser');
    const selection = await Selection.findById(id);
    const votes = await Vote.find({ selectionId: id }).populate('user');
    console.log('.....................................');
    console.log(`selection no.${selection.number} ${selection.name} voted by`);
    votes.forEach((vote) => {
      console.log(`user ${vote.user.username}`);
      console.log('.....................................');
    });
  } catch (error) {
    console.log(error);
  }
};

const banUser = async (id) => {
  try {
    console.log('banUser');
    const user = await User.findById(id);
    user.isBanned = true;
    user.reasonForBan = process.argv[4] || "couldn't verify the user";
    await user.save();
    const votes = await Vote.find({ user: id });
    votes.forEach(async (vote) => {
      vote.isArchive = true;
      await vote.save();
    });

    console.log('.....................................');
    console.log(`user ${user.username} is banned`);
    console.log('.....................................');
  } catch (error) {
    console.log(error);
  }
};

const unBanUser = async (id) => {
  try {
    console.log('unBanUser');
    const user = await User.findById(id);
    user.isBanned = false;
    user.reasonForBan = '';
    await user.save();
    const votes = await Vote.find({ user: id });
    votes.forEach(async (vote) => {
      vote.isArchive = false;
      await vote.save();
    });

    console.log('.....................................');
    console.log(`user ${user.username} is unbanned`);
    console.log('.....................................');
  } catch (error) {}
};

const restartUserVote = async (id) => {
  try {
    console.log('restartUserVote');
    const user = await User.findById(id);
    user.votedTitles = [];
    await user.save();
    const votes = await Vote.find({ user: id });
    votes.forEach(async (vote) => {
      vote.isArchive = false;
      await vote.save();
    });
    console.log('.....................................');
    console.log(`user ${user.username}'s votes are restarted`);
    console.log('.....................................');
  } catch (error) {
    console.log(error);
  }
};

const userData = async (id) => {
  try {
    console.log('userData');
    const user = await User.findById(id);
    console.log('.....................................');
    console.log(`user ${user.username} data`);
    console.log(user);
    console.log('.....................................');
  } catch (error) {
    console.log(error);
  }
};

const userDataWithDetail = async () => {
  try {
    console.log('userDataWithDetail');
    if (!process.argv[3] || !process.argv[4]) {
      console.log('please provide the email');
      return;
    } else {
      if (process.argv[3] === 'email') {
        process.argv[4] += '@gmail.com';
      }
    }
    const user = await User.findOne({
      [process.argv[3]]: process.argv[4],
    });

    console.log('.....................................');
    console.log(`user ${user.username} data`);
    console.log(user);
    console.log('.....................................');
  } catch (error) {
    console.log(error);
  }
};

useFulQueries();
