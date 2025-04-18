// scrapers/events.js
const { safeWriteJSON } = require('../utils/fsHelpers');

async function fetchAndSave() {
  const data = require('../public/events.json');
  safeWriteJSON('events.json', data);
}

module.exports = { fetchAndSave, name: 'events' };
