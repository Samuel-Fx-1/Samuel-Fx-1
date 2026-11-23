const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const chips = [
  { slug: 'portfolio', letter: 'P', grad: 'linear-gradient(135deg,#9B59FF,#4D4DFF)', label: 'Portfolio', url: 'samuelportfolio-seven.vercel.app' },
  { slug: 'samuelos', letter: 'O', grad: 'linear-gradient(135deg,#16E6EE,#0099A8)', label: 'Samuel OS', url: 'samuelosportfolio.vercel.app' },
  { slug: 'github', letter: 'G', grad: 'linear-gradient(135deg,#4D4DFF,#2A2A99)', label: 'GitHub', url: 'github.com/Samuel-Fx-1' },
  { slug: 'email', letter: '@', grad: 'linear-gradient(135deg,#FF8C00,#FFB800)', label: 'Email', url: 'samuelislegend8@gmail.com' },
];

(async () => {
  for (const t of ['dark', 'light']) {
    const browser = await chromium.launch({ executablePath: CHROME, headless: true });
    for (const c of chips) {
      const page = await browser.newPage({ viewport: { width: 420, height: 90 }, deviceScaleFactor: 2 });
      const params = new URLSearchParams({ theme: t, letter: c.letter, grad: c.grad, label: c.label, url: c.url });
      const url = 'file:///' + path.resolve('html/appchip.html').replace(/\\/g, '/') + '?' + params.toString();
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(300);
      const out = path.resolve('..\\assets', `appchip-${c.slug}-v1${t === 'light' ? '-light' : ''}.png`);
      await page.screenshot({ path: out, type: 'png' });
      console.log('rendered', out, fs.statSync(out).size, 'bytes');
      await page.close();
    }
    await browser.close();
  }
})();
