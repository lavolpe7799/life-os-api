// scrapers/lifelog.js
const { safeWriteJSON } = require('../utils/fsHelpers');

async function fetchAndSave() {
  const data = require('../public/lifelog.json');
  safeWriteJSON('lifelog.json', data);
}

module.exports = { fetchAndSave, name: 'lifelog' };
