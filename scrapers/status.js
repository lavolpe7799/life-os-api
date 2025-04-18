// scrapers/status.js
const { safeWriteJSON } = require('../utils/fsHelpers');

async function fetchAndSave() {
  const data = require('../public/status.json');
  safeWriteJSON('status.json', data);
}

module.exports = { fetchAndSave, name: 'status' };
