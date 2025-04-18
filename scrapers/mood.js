const fs = require('fs');
const path = require('path');

async function fetchAndSave() {
  const data = require('../public/mood.json');
  fs.writeFileSync(
    path.join(__dirname, '../public/mood.json'),
    JSON.stringify(data, null, 2)
  );
}

module.exports = { fetchAndSave, name: 'mood' };