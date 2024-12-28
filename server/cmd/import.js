require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const { dbConnect } = require('../config/dbConnect');
const fs = require('fs');

const User = require('../models/userModel');
const Url = require('../models/urlModel');
const File = require('../models/fileModel');
const RefreshToken = require('../models/refreshTokenModel');
dbConnect();
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/restoreData/users.json`, 'utf-8')
);
const urls = JSON.parse(
  fs.readFileSync(`${__dirname}/restoreData/urls.json`, 'utf-8')
);
const files = JSON.parse(
  fs.readFileSync(`${__dirname}/restoreData/files.json`, 'utf-8')
);
const refreshTokens = JSON.parse(
  fs.readFileSync(`${__dirname}/restoreData/refreshTokens.json`, 'utf-8')
);

console.log(typeof users);

//import data from json file to mongodb
const importData = async () => {
  try {
    if (users) await User.insertMany(users, { validate: false });

    if (urls) await Url.insertMany(urls, { validate: false });

    if (files) await File.insertMany(files, { validate: false });

    if (refreshTokens)
      await RefreshToken.insertMany(refreshTokens, { validate: false });

    console.log('Data successfully loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//delete data from mongodb
const deleteData = async () => {
  try {
    if (users) await User.deleteMany();
    if (urls) await Url.deleteMany();
    if (files) await File.deleteMany();
    if (refreshTokens) await RefreshToken.deleteMany();
    console.log('Data successfully deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// node restore.js --import //import data
if (process.argv[2] === '--i' || process.argv[2] === '--import') {
  (async () => {
    try {
      if (
        (await User.findOne()) ||
        (await Url.findOne()) ||
        (await File.findOne()) ||
        (await RefreshToken.findOne())
      ) {
        console.log('Data already exists! Please delete data first');
        process.exit();
      }
      importData();
    } catch (err) {
      console.log(err);
    }
  })();
}

if (process.argv[2] === '--forceImport' || process.argv[2] === '--fi') {
  importData();
}

// node restore.js --delete //delete data
if (process.argv[2] === '--d' || process.argv[2] === '--delete') {
  deleteData();
}

// node restore.js --delete --import //delete and import data
if (
  (process.argv[2] === '--delete' && process.argv[3] === '--import') ||
  (process.argv[2] === '--d' && process.argv[3] === '--i')
) {
  deleteData();
  importData();
}

// node restore.js --restore //delete and import data
if (
  process.argv[2] === '--restore' ||
  process.argv[2] === '--r' ||
  !process.argv[2]
) {
  deleteData();
  importData();
}
async function test() {
  try {
    const user = new User({
      username: 'test',
      password: 'test',
      email: 'test12@gmail.com',
      confirmPassword: 'test',
    });

    user.validateBeforeSave = false; // Disable all validation

    user
      .save()
      .then((result) => {
        console.log('Data successfully inserted:', result);
        process.exit();
      })
      .catch((error) => {
        console.error('Error inserting data:', error);
        process.exit(1); // Exit with an error code
      });
  } catch (err) {
    console.log(err);
  }
}

if (process.argv[2] === '--test') {
  test();
}
