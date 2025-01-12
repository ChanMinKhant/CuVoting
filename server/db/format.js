const fs = require('fs');
const path = require('path');

// Path to the JSON file
const filePath = path.join(__dirname, 'Selection.json');
const output = path.join(__dirname, 'Selection_out.json');

// Read the JSON file
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Sort the data by number and then by gender
const sortedData = data.sort((a, b) => {
  if (a.number !== b.number) {
    return a.number - b.number;
  }
  if (a.gender.toLowerCase() < b.gender.toLowerCase()) return -1;
  if (a.gender.toLowerCase() > b.gender.toLowerCase()) return 1;
  return 0;
});

// Write the sorted data back to the JSON file
fs.writeFileSync(output, JSON.stringify(sortedData, null, 2), 'utf8');

console.log('Selection.json has been formatted by number and gender.');
