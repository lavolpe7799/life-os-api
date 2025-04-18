// scrapers/location.js
const { safeWriteJSON } = require('../utils/fsHelpers');

async function fetchAndSave() {
  const loc = {
    city: process.env.CITY || null,
    country: process.env.COUNTRY || null,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
  safeWriteJSON('location.json', loc);
}

module.exports = { fetchAndSave, name: 'location' };
