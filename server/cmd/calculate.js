const Result = require('../models/result');
const Selection = require('../models/selection');
const connectToDatabase = require('../config/db');
const { BoyTitles, GirlTitles, CoupleTitles } = require('../utils/enum');

if (!global.dbConnected) {
  connectToDatabase();
  global.dbConnected = true;
}

const calculateResult = async () => {
  try {
    const results = await Result.find().populate('selectionId');
    console.log(results);

    const logResults = (titleType, titles) => {
      titles.forEach((title) => {
        console.log(`${titleType} titles "${title}"`);
        results
          .filter((result) => result.category === title)
          .forEach((result) => {
            console.log(
              `Result.selectionId.name = ${result.selectionId.name} = ${result.count}`
            );
          });
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

calculateResult();

module.exports = calculateResult;
