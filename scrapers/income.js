// scrapers/income.js
const { safeWriteJSON } = require('../utils/fsHelpers');

async function fetchAndSave() {
  const data = [
    { idea: 'eBook', build_time_days: 7, effort: 'medium', language: 'EN', market: 'global' },
    { idea: 'Notion Kit', build_time_days: 3, effort: 'low', language: 'EN', market: 'productivity' }
  ];
  safeWriteJSON('income.json', data);
}

module.exports = { fetchAndSave, name: 'income' };
