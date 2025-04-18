const fs = require('fs');
const path = require('path');

async function fetchAndSave() {
  const loc = {
    city: process.env.CITY || null,
    country: process.env.COUNTRY || null,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
  fs.writeFileSync(
    path.join(__dirname, '../public/location.json'),
    JSON.stringify(loc, null, 2)
  );
}

module.exports = { fetchAndSave, name: 'location' };