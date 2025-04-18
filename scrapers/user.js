// scrapers/user.js
const { safeWriteJSON } = require('../utils/fsHelpers');

async function fetchAndSave() {
  const data = require('../public/user.json');
  safeWriteJSON('user.json', data);
}

module.exports = { fetchAndSave, name: 'user' };
