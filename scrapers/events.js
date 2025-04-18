const fs = require('fs');
const path = require('path');

async function fetchAndSave() {
  const data = require('../public/events.json');
  fs.writeFileSync(
    path.join(__dirname, '../public/events.json'),
    JSON.stringify(data, null, 2)
  );
}

module.exports = { fetchAndSave, name: 'events' };