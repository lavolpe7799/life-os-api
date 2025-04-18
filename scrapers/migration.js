// scrapers/migration.js
const { safeWriteJSON } = require('../utils/fsHelpers');

async function fetchAndSave() {
  const data = [
    { type: 'Blue Card', salary_requirement: 56100, certs: ['University Degree'], avg_time_days: 90 },
    { type: 'D7', salary_requirement: 3000, certs: [], avg_time_days: 120 },
    { type: 'UAE Remote', salary_requirement: 5000, certs: [], avg_time_days: 30 }
  ];
  safeWriteJSON('migration.json', data);
}

module.exports = { fetchAndSave, name: 'migration' };
