require('dotenv').config({ path: './../config.env' });
const Result = require('../models/result');
const Vote = require('../models/vote');
const Selection = require('../models/selection');
const connectToDatabase = require('../config/db');
const { BoyTitles, GirlTitles, CoupleTitles } = require('../utils/enum');

connectToDatabase();

const calculateResult = async () => {
  try {
    const results = await Result.find().populate('selectionId');

    const logResults = (titleType, titles) => {
      titles.forEach((title) => {
        console.log('............................................');
        console.log(`${titleType} titles "${title}"`);
        results
          .filter((result) => result.category === title)
          .forEach((result) => {
            console.log(
              `${result?.selectionId?.number} - ${result?.selectionId?.name} = ${result.count}`
            );
          });
        console.log('............................................');
      });
    };

    console.log('Boy Titles:');
    logResults('Boy', BoyTitles);

    console.log('Girl Titles:');
    logResults('Girl', GirlTitles);

    console.log('Couple Titles:');
    logResults('Couple', CoupleTitles);
  } catch (error) {
    console.error('Error calculating results:', error);
  }
};

const reCalculateResult = async () => {
  try {
    // wont allow if the conn string is not local
    if (!process.env.MONGO_URI.includes('localhost')) {
      console.error('This command is only allowed in local environment');
      process.exit();
    }
    const votes = await Vote.find();
    if (votes.length === 0) {
      console.log('No votes found');
      return;
    }

    await Result.deleteMany();
    console.log('calculating results...');
    const resultMap = new Map();

    votes.forEach((vote) => {
      const key = `${vote.selectionId}-${vote.category}`;
      if (resultMap.has(key)) {
        resultMap.get(key).count += 1;
      } else {
        resultMap.set(key, {
          selectionId: vote.selectionId,
          category: vote.category,
          count: 1,
        });
      }
    });

    const bulkOperations = [];
    resultMap.forEach((value) => {
      bulkOperations.push({
        updateOne: {
          filter: { selectionId: value.selectionId, category: value.category },
          update: { $inc: { count: value.count } },
          upsert: true,
        },
      });
    });

    await Result.bulkWrite(bulkOperations);
    console.log('Results calculated successfully');
    process.exit();
  } catch (error) {
    console.error('Error calculating results:', error);
  }
};

if (process.argv[2] === '-r') {
  reCalculateResult();
} else {
  calculateResult();
}

module.exports = calculateResult;
