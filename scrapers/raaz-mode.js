// scrapers/raaz-mode.js
const { safeWriteJSON } = require('../utils/fsHelpers');

async function fetchAndSave() {
  const data = require('../public/raaz-mode.json');
  safeWriteJSON('raaz-mode.json', data);
}

module.exports = { fetchAndSave, name: 'raaz-mode' };
