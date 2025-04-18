const fs = require('fs');
const path = require('path');

async function fetchAndSave() {
  const data = require('../public/freelance-manual.json');
  fs.writeFileSync(
    path.join(__dirname, '../public/freelance.json'),
    JSON.stringify(data, null, 2)
  );
}

module.exports = { fetchAndSave, name: 'freelance' };