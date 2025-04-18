const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

async function fetchAndSave() {
  const prices = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd')
    .then(r => r.json());
  const timestamp = Date.now();
  const crypto = Object.entries(prices).map(([id, o]) => ({
    asset: id,
    price: o.usd,
    risk: 'high',
    platform: 'CoinGecko',
    timestamp
  }));
  const etfs = [{ asset: 'SPY', risk: 'medium', platform: 'NYSE', timestamp }];
  const data = [...crypto, ...etfs];

  fs.writeFileSync(
    path.join(__dirname, '../public/investments.json'),
    JSON.stringify(data, null, 2)
  );
}

module.exports = { fetchAndSave, name: 'investments' };