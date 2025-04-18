// scrapers/freelance.js
const { safeWriteJSON } = require('../utils/fsHelpers');

async function fetchAndSave() {
  const data = require('../public/freelance-manual.json');
  safeWriteJSON('freelance.json', Array.isArray(data) ? data : []);
}

module.exports = { fetchAndSave, name: 'freelance' };
