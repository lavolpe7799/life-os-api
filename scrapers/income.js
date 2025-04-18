const fs = require('fs');
const path = require('path');

async function fetchAndSave() {
  const data = [
    { idea: 'eBook', build_time_days: 7, effort: 'medium', language: 'EN', market: 'global' },
    { idea: 'Notion Kit', build_time_days: 3, effort: 'low', language: 'EN', market: 'productivity' }
  ];
  fs.writeFileSync(
    path.join(__dirname, '../public/income.json'),
    JSON.stringify(data, null, 2)
  );
}

module.exports = { fetchAndSave, name: 'income' };