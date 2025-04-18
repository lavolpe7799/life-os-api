require('dotenv').config();

const scrapers = [
  require('./scrapers/jobs'),
  require('./scrapers/freelance'),
  require('./scrapers/currency'),
  require('./scrapers/migration'),
  require('./scrapers/certs'),
  require('./scrapers/income'),
  require('./scrapers/investments'),
  require('./scrapers/dashboard'),
  require('./scrapers/mood'),
  require('./scrapers/status'),
  require('./scrapers/triggers'),
  require('./scrapers/timeline'),
  require('./scrapers/lifelog'),
  require('./scrapers/raaz-mode'),
  require('./scrapers/cv'),
  require('./scrapers/user'),
  require('./scrapers/events'),
  require('./scrapers/location')
];

async function buildAll() {
  for (const scraper of scrapers) {
    try {
      await scraper.fetchAndSave();
      console.log(`${scraper.name} ✓`);
    } catch (err) {
      console.error(`${scraper.name} ✗`, err);
    }
  }
}

buildAll();
