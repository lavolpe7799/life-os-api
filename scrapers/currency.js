// scrapers/currency.js
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function fetchAndSave() {
  let data = {};

  // Try loading existing data as fallback
  try {
    data = require('../public/currency.json');
  } catch {
    data = {};
  }

  // Attempt to fetch fresh rates
  try {
    // Bonbast
    const bRes = await fetch('https://bonbast.com/');
    const bHtml = await bRes.text();
    const $b = cheerio.load(bHtml);
    // TODO: replace these selectors with the real ones
    const usd = parseFloat($b('.usd-rate-selector').text().replace(/,/g, ''));
    const eur = parseFloat($b('.eur-rate-selector').text().replace(/,/g, ''));

    // TGJU
    const tRes = await fetch('https://tgju.org/');
    const tHtml = await tRes.text();
    const $t = cheerio.load(tHtml);
    const usdt = parseFloat($t('.usdt-rate-selector').text().replace(/,/g, ''));

    // Compute new data
    const timestamp = Date.now();
    data = {
      IRR_USD: usd,
      IRR_EUR: eur,
      IRR_USDT: usdt,
      source: ['bonbast', 'tgju'],
      timestamp,
    };
    // You can compute change_pct against the old data:
    if (data.IRR_USD && data.IRR_USD && typeof data.IRR_USD === 'number') {
      const prev = data.IRR_USD || 0;
      data.change_pct = prev ? ((usd - prev) / prev) * 100 : 0;
    } else {
      data.change_pct = 0;
    }
    data.suggested_action = data.change_pct >= 0 ? 'sell' : 'buy';
  } catch (err) {
    console.warn('⚠️  Currency fetch failed, using fallback data:', err.message);
  }

  // Always write something valid
  fs.writeFileSync(
    path.join(__dirname, '../public/currency.json'),
    JSON.stringify(data, null, 2)
  );
}

module.exports = { fetchAndSave, name: 'currency' };