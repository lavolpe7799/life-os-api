const fs = require('fs');
const path = require('path');

async function fetchAndSave() {
  const data = require('../public/cv.json');
  fs.writeFileSync(
    path.join(__dirname, '../public/cv.json'),
    JSON.stringify(data, null, 2)
  );
}

module.exports = { fetchAndSave, name: 'cv' };