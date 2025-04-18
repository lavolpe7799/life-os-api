// scrapers/currency.js
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { safeWriteJSON } = require('../utils/fsHelpers');

async function fetchAndSave() {
  // load fallback or seed
  let data = {};
  try {
    data = require('../public/currency.json');
  } catch {
    data = {};
  }

  try {
    // Bonbast
    const bRes = await fetch('https://bonbast.com/');
    const bHtml = await bRes.text();
    const $b = cheerio.load(bHtml);
    const usd = parseFloat($b('.usd-rate-selector').text().replace(/,/g, ''));
    const eur = parseFloat($b('.eur-rate-selector').text().replace(/,/g, ''));

    // TGJU
    const tRes = await fetch('https://tgju.org/');
    const tHtml = await tRes.text();
    const $t = cheerio.load(tHtml);
    const usdt = parseFloat($t('.usdt-rate-selector').text().replace(/,/g, ''));

    const timestamp = Date.now();
    const prevUsd = data.IRR_USD || usd;
    const change_pct = prevUsd
      ? ((usd - prevUsd) / prevUsd) * 100
      : 0;

    data = {
      IRR_USD: usd,
      IRR_EUR: eur,
      IRR_USDT: usdt,
      source: ['bonbast', 'tgju'],
      timestamp,
      change_pct,
      suggested_action: change_pct >= 0 ? 'sell' : 'buy'
    };
  } catch (err) {
    console.warn('⚠️  Currency fetch failed, using fallback data:', err.message);
  }

  safeWriteJSON('currency.json', data);
}

module.exports = { fetchAndSave, name: 'currency' };
