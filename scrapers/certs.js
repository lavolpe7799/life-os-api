const fs = require('fs');
const path = require('path');

async function fetchAndSave() {
  const data = [
    { name: 'PMP', roi_months: 6, migration_value: true, income_boost: 10000, hours_to_complete: 200 },
    { name: 'CISSP', roi_months: 8, migration_value: false, income_boost: 15000, hours_to_complete: 300 },
    { name: 'Google PM', roi_months: 4, migration_value: true, income_boost: 12000, hours_to_complete: 150 }
  ];
  fs.writeFileSync(
    path.join(__dirname, '../public/certs.json'),
    JSON.stringify(data, null, 2)
  );
}

module.exports = { fetchAndSave, name: 'certs' };