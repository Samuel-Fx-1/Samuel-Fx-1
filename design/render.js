const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function render(htmlPath, outFile, w, h, scale = 2, query = '') {
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
  const url = 'file:///' + path.resolve(htmlPath).replace(/\\/g, '/') + (query ? '?' + query : '');
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  await page.screenshot({ path: outFile, type: 'png' });
  await browser.close();
  const stat = fs.statSync(outFile);
  console.log('rendered', outFile, stat.size, 'bytes');
}

const args = process.argv.slice(2);
render(args[0], args[1], parseInt(args[2]), parseInt(args[3]), args[4] ? parseFloat(args[4]) : 2, args[5] || '').catch(e => { console.error(e); process.exit(1); });
