const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const projects = [
  { slug: 'portfolio', letter: 'P', grad: 'linear-gradient(135deg,#9B59FF,#4D4DFF)', name: 'Portfolio', desc: 'Full-stack work & projects', url: 'samuelportfolio-seven.vercel.app' },
  { slug: 'samuelos', letter: 'O', grad: 'linear-gradient(135deg,#16E6EE,#0099A8)', name: 'Samuel OS', desc: 'macOS-style portfolio', url: 'samuelosportfolio.vercel.app' },
  { slug: 'payflow', letter: '$', grad: 'linear-gradient(135deg,#FF8C00,#FFB800)', name: 'PayFlow', desc: 'Payments dashboard', url: 'github.com/Samuel-Fx-1/PayFlow-Dashboard' },
  { slug: 'edge', letter: 'E', grad: 'linear-gradient(135deg,#34D399,#10B981)', name: 'Edge', desc: 'Trading journal', url: 'github.com/Samuel-Fx-1/Edge' },
];

(async () => {
  for (const t of ['dark', 'light']) {
    const browser = await chromium.launch({ executablePath: CHROME, headless: true });
    for (const p of projects) {
      const page = await browser.newPage({ viewport: { width: 480, height: 300 }, deviceScaleFactor: 2 });
      const params = new URLSearchParams({
        theme: t, letter: p.letter, grad: p.grad, name: p.name, desc: p.desc, url: p.url,
      });
      const url = 'file:///' + path.resolve('html/appcard.html').replace(/\\/g, '/') + '?' + params.toString();
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(300);
      const out = path.resolve('..\\assets', `appcard-${p.slug}-v1${t === 'light' ? '-light' : ''}.png`);
      await page.screenshot({ path: out, type: 'png' });
      console.log('rendered', out, fs.statSync(out).size, 'bytes');
      await page.close();
    }
    await browser.close();
  }
})();
