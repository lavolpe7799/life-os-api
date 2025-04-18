// scrapers/timeline.js
const { safeWriteJSON } = require('../utils/fsHelpers');

async function fetchAndSave() {
  const data = require('../public/timeline.json');
  safeWriteJSON('timeline.json', data);
}

module.exports = { fetchAndSave, name: 'timeline' };
