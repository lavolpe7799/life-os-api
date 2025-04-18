// scrapers/investments.js
const fetch = require('node-fetch');
const { safeWriteJSON } = require('../utils/fsHelpers');

async function fetchAndSave() {
  let crypto = [];
  try {
    const prices = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd'
    ).then(r => r.json());
    const timestamp = Date.now();
    crypto = Object.entries(prices).map(([id, o]) => ({
      asset: id,
      price: o.usd,
      risk: 'high',
      platform: 'CoinGecko',
      timestamp
    }));
  } catch (err) {
    console.warn('⚠ Crypto fetch failed:', err.message);
  }

  const etfs = [{ asset: 'SPY', risk: 'medium', platform: 'NYSE', timestamp: Date.now() }];
  safeWriteJSON('investments.json', [...crypto, ...etfs]);
}

module.exports = { fetchAndSave, name: 'investments' };
