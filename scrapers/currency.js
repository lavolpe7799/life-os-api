const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function fetchAndSave() {
  const bRes = await fetch('https://bonbast.com/');
  const bHtml = await bRes.text();
  const $b = cheerio.load(bHtml);
  // TODO: replace with real selectors
  const usd = parseFloat($b('selector-USD').text().replace(/,/g,''));
  const eur = parseFloat($b('selector-EUR').text().replace(/,/g,''));

  const tRes = await fetch('https://tgju.org/');
  const tHtml = await tRes.text();
  const $t = cheerio.load(tHtml);
  const usdt = parseFloat($t('selector-USDT').text().replace(/,/g,''));

  const data = {
    IRR_USD: usd,
    IRR_EUR: eur,
    IRR_USDT: usdt,
    source: ['bonbast','tgju'],
    timestamp: Date.now()
  };
  data.change_pct = 0;
  data.suggested_action = data.change_pct > 0 ? 'sell' : 'buy';

  fs.writeFileSync(
    path.join(__dirname, '../public/currency.json'),
    JSON.stringify(data, null, 2)
  );
}

module.exports = { fetchAndSave, name: 'currency' };