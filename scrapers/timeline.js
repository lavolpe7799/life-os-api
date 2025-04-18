const fs = require('fs');
const path = require('path');

async function fetchAndSave() {
  const data = require('../public/timeline.json');
  fs.writeFileSync(
    path.join(__dirname, '../public/timeline.json'),
    JSON.stringify(data, null, 2)
  );
}

module.exports = { fetchAndSave, name: 'timeline' };