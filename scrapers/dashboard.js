// scrapers/dashboard.js
const { safeWriteJSON } = require('../utils/fsHelpers');

async function fetchAndSave() {
  const jobs = require('../public/jobs.json');
  const fx = require('../public/currency.json');
  const certs = require('../public/certs.json');
  const mood = require('../public/mood.json');
  const raaz = require('../public/raaz-mode.json');

  const data = {
    mood: Array.isArray(mood.emotions) ? mood.emotions : [],
    job_count: Array.isArray(jobs) ? jobs.length : 0,
    fx_rate: fx.IRR_USD || null,
    active_certs: Array.isArray(certs) ? certs.map(c => c.name) : [],
    raaz_mode: Array.isArray(raaz) ? raaz.slice(-1)[0] : null
  };

  safeWriteJSON('dashboard.json', data);
}

module.exports = { fetchAndSave, name: 'dashboard' };
