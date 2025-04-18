// scrapers/triggers.js
const { safeWriteJSON } = require('../utils/fsHelpers');

async function fetchAndSave() {
  const data = require('../public/triggers.json');
  safeWriteJSON('triggers.json', data);
}

module.exports = { fetchAndSave, name: 'triggers' };
