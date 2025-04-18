// utils/fsHelpers.js
const fs = require('fs');
const path = require('path');

/**
 * Write JSON to ./public/<filename>, creating folders if needed.
 * @param {string} filename e.g. 'jobs.json'
 * @param {any} data serializable to JSON
 */
function safeWriteJSON(filename, data) {
  const outputPath = path.join(__dirname, '../public', filename);
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`✅ Wrote public/${filename}`);
}

module.exports = { safeWriteJSON };