// scrapers/mood.js
const { safeWriteJSON } = require('../utils/fsHelpers');

async function fetchAndSave() {
  const data = require('../public/mood.json');
  safeWriteJSON('mood.json', data);
}

module.exports = { fetchAndSave, name: 'mood' };
