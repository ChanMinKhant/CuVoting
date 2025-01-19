require('dotenv').config({ path: './../config.env' });
const connectToDatabase = require('../config/db');
const fs = require('fs');
const User = require('../models/user');
const Selection = require('../models/selection');
const Result = require('../models/result');
const Vote = require('../models/vote');
const moment = require('moment-timezone');

connectToDatabase();

const backupData = async () => {
  try {
    const users = await User.find();
    const results = await Result.find();
    const votes = await Vote.find();
    const selections = await Selection.find();

    let userJson = JSON.stringify(users);
    userJson = JSON.parse(userJson);
    userJson.forEach((user) => {
      user._id = { $oid: user._id };
    });

    let resultJson = JSON.stringify(results);
    resultJson = JSON.parse(resultJson);
    resultJson.forEach((result) => {
      result._id = { $oid: result._id };
      result.selectionId = { $oid: result.selectionId };
    });

    let voteJson = JSON.stringify(votes);
    voteJson = JSON.parse(voteJson);
    voteJson.forEach((vote) => {
      vote._id = { $oid: vote._id };
      vote.user = { $oid: vote.user };
      vote.selectionId = { $oid: vote.selectionId };
    });

    let selectionJson = JSON.stringify(selections);
    selectionJson = JSON.parse(selectionJson);
    selectionJson.forEach((selection) => {
      selection._id = { $oid: selection._id };
    });

    const formattedDate = moment()
      .tz('Asia/Yangon')
      .format('YYYY-MM-DD-HH-mm-ss'); // Including seconds for uniqueness
    console.log(formattedDate);

    const backupFolder = `${__dirname}/backup`;
    if (!fs.existsSync(backupFolder)) {
      fs.mkdirSync(backupFolder, { recursive: true });
    }

    const folder = `${backupFolder}/${formattedDate}`;
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    if (users) {
      fs.writeFileSync(
        `${folder}/users.json`,
        JSON.stringify(userJson, null, 2)
      );
    }

    if (results) {
      fs.writeFileSync(
        `${folder}/results.json`,
        JSON.stringify(resultJson, null, 2)
      );
    }

    if (votes) {
      fs.writeFileSync(
        `${folder}/votes.json`,
        JSON.stringify(voteJson, null, 2)
      );
    }

    if (selections) {
      fs.writeFileSync(
        `${folder}/selections.json`,
        JSON.stringify(selectionJson, null, 2)
      );
    }
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '-b') {
  backupData();
}
