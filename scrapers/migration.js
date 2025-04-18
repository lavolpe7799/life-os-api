const fs = require('fs');
const path = require('path');

async function fetchAndSave() {
  const data = [
    { type: 'Blue Card', salary_requirement: 56100, certs: ['University Degree'], avg_time_days: 90 },
    { type: 'D7', salary_requirement: 3000, certs: [], avg_time_days: 120 },
    { type: 'UAE Remote', salary_requirement: 5000, certs: [], avg_time_days: 30 }
  ];
  fs.writeFileSync(
    path.join(__dirname, '../public/migration.json'),
    JSON.stringify(data, null, 2)
  );
}

module.exports = { fetchAndSave, name: 'migration' };