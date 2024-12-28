require('dotenv').config({ path: './config.env' });
const connectToDatabase = require('../config/db');
const fs = require('fs');
const Otp = require('../models/otp');
const User = require('../models/user');
const Result = require('../models/result');
const Selection = require('../models/selection');
const Vote = require('../models/vote');
const moment = require('moment-timezone');

connectToDatabase();

const backupData = async () => {
  try {
    const otps = await Otp.find();
    const users = await User.find();
    console.log(users.length);
    const results = await Result.find();
    const selections = await Selection.find();
    const votes = await Vote.find();

    // Get current date-time in Asia/Yangon timezone with seconds included
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
    if (otps) {
      fs.writeFileSync(`${folder}/otps.json`, JSON.stringify(otps));
    }
    if (users) {
      fs.writeFileSync(`${folder}/users.json`, JSON.stringify(users));
    }
    if (results) {
      fs.writeFileSync(`${folder}/results.json`, JSON.stringify(results));
    }
    if (selections) {
      fs.writeFileSync(`${folder}/selections.json`, JSON.stringify(selections));
    }
    if (votes) {
      fs.writeFileSync(`${folder}/votes.json`, JSON.stringify(votes));
    }

    console.log('Data successfully backed up for ' + formattedDate);
  } catch (err) {
    console.log(err);
  }
};

// backup every 15 seconds (or adjust as needed)
setInterval(backupData, 1000 * 5);
