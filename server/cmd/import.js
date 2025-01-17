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

// command to import data node import backup/2021-09-29-15-00-00
const importData = async () => {
  try {
    // const backupFolder = `${__dirname}/backup`;
    // console.log(process.argv[2]);
    // const folder = `${backupFolder}/${process.argv[2]}`;
    const folder = path.join(__dirname, 'backup', process.argv[2]);
    console.log(folder);
    if (!fs.existsSync(folder)) {
      console.log('Backup folder does not exist');
      process.exit();
    }
    const otps = JSON.parse(fs.readFileSync(`${folder}/otps.json`, 'utf-8'));
    const results = JSON.parse(
      fs.readFileSync(`${folder}/results.json`, 'utf-8'),
    );
    const selections = JSON.parse(
      fs.readFileSync(`${folder}/selections.json`, 'utf-8'),
    );
    const users = JSON.parse(fs.readFileSync(`${folder}/users.json`, 'utf-8'));
    const votes = JSON.parse(fs.readFileSync(`${folder}/votes.json`, 'utf-8'));

    // INSERT DATA
    if (users) await User.insertMany(users, { validate: false });
    if (otps) await Otp.insertMany(otps, { validate: false });
    if (results) await Result.insertMany(results, { validate: false });
    if (selections) await Selection.insertMany(selections, { validate: false });
    if (votes) await Vote.insertMany(votes, { validate: false });
    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
};
importData();
const deleteData = async () => {};

// const users = JSON.parse(
//   fs.readFileSync(`${__dirname}/restoreData/users.json`, 'utf-8')
// );
// const urls = JSON.parse(
//   fs.readFileSync(`${__dirname}/restoreData/urls.json`, 'utf-8')
// );
// const files = JSON.parse(
//   fs.readFileSync(`${__dirname}/restoreData/files.json`, 'utf-8')
// );
// const refreshTokens = JSON.parse(
//   fs.readFileSync(`${__dirname}/restoreData/refreshTokens.json`, 'utf-8')
// );

// console.log(typeof users);

// //import data from json file to mongodb
// const importData = async () => {
//   try {
//     if (users) await User.insertMany(users, { validate: false });

//     if (urls) await Url.insertMany(urls, { validate: false });

//     if (files) await File.insertMany(files, { validate: false });

//     if (refreshTokens)
//       await RefreshToken.insertMany(refreshTokens, { validate: false });

//     console.log('Data successfully loaded');
//     process.exit();
//   } catch (err) {
//     console.log(err);
//   }
// };

// //delete data from mongodb
// const deleteData = async () => {
//   try {
//     if (users) await User.deleteMany();
//     if (urls) await Url.deleteMany();
//     if (files) await File.deleteMany();
//     if (refreshTokens) await RefreshToken.deleteMany();
//     console.log('Data successfully deleted');
//     process.exit();
//   } catch (err) {
//     console.log(err);
//   }
// };

// // node restore.js --import //import data
// if (process.argv[2] === '--i' || process.argv[2] === '--import') {
//   (async () => {
//     try {
//       if (
//         (await User.findOne()) ||
//         (await Url.findOne()) ||
//         (await File.findOne()) ||
//         (await RefreshToken.findOne())
//       ) {
//         console.log('Data already exists! Please delete data first');
//         process.exit();
//       }
//       importData();
//     } catch (err) {
//       console.log(err);
//     }
//   })();
// }

// if (process.argv[2] === '--forceImport' || process.argv[2] === '--fi') {
//   importData();
// }

// // node restore.js --delete //delete data
// if (process.argv[2] === '--d' || process.argv[2] === '--delete') {
//   deleteData();
// }

// // node restore.js --delete --import //delete and import data
// if (
//   (process.argv[2] === '--delete' && process.argv[3] === '--import') ||
//   (process.argv[2] === '--d' && process.argv[3] === '--i')
// ) {
//   deleteData();
//   importData();
// }

// // node restore.js --restore //delete and import data
// if (
//   process.argv[2] === '--restore' ||
//   process.argv[2] === '--r' ||
//   !process.argv[2]
// ) {
//   deleteData();
//   importData();
// }
// async function test() {
//   try {
//     const user = new User({
//       username: 'test',
//       password: 'test',
//       email: 'test12@gmail.com',
//       confirmPassword: 'test',
//     });

//     user.validateBeforeSave = false; // Disable all validation

//     user
//       .save()
//       .then((result) => {
//         console.log('Data successfully inserted:', result);
//         process.exit();
//       })
//       .catch((error) => {
//         console.error('Error inserting data:', error);
//         process.exit(1); // Exit with an error code
//       });
//   } catch (err) {
//     console.log(err);
//   }
// }

// if (process.argv[2] === '--test') {
//   test();
// }
