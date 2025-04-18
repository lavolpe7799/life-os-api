const fs = require('fs');
const path = require('path');

async function fetchAndSave() {
  const data = require('../public/raaz-mode.json');
  fs.writeFileSync(
    path.join(__dirname, '../public/raaz-mode.json'),
    JSON.stringify(data, null, 2)
  );
}

module.exports = { fetchAndSave, name: 'raaz-mode' };