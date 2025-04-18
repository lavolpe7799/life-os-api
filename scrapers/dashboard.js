const fs = require('fs');
const path = require('path');

async function fetchAndSave() {
  const jobs = require('../public/jobs.json');
  const fx = require('../public/currency.json');
  const certs = require('../public/certs.json');
  const mood = require('../public/mood.json');
  const raaz = require('../public/raaz-mode.json');
  const data = {
    mood: mood.emotions || [],
    job_count: jobs.length,
    fx_rate: fx.IRR_USD,
    active_certs: certs.map(c => c.name),
    raaz_mode: raaz.slice(-1)[0] || null
  };
  fs.writeFileSync(
    path.join(__dirname, '../public/dashboard.json'),
    JSON.stringify(data, null, 2)
  );
}

module.exports = { fetchAndSave, name: 'dashboard' };