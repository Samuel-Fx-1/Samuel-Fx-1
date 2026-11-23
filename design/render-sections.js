const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const sections = [
  { slug: 'projects', title: 'Projects in motion', caption: 'animated previews of real work' },
  { slug: 'appdrawer', title: 'App drawer', caption: 'quick access to my projects' },
  { slug: 'builtwith', title: 'Built with', caption: 'the stack behind the work' },
];

(async () => {
  for (const t of ['dark', 'light']) {
    const browser = await chromium.launch({ executablePath: CHROME, headless: true });
    for (const s of sections) {
      const page = await browser.newPage({ viewport: { width: 1200, height: 80 }, deviceScaleFactor: 2 });
      const params = new URLSearchParams({ theme: t, title: s.title, caption: s.caption });
      const url = 'file:///' + path.resolve('html/section.html').replace(/\\/g, '/') + '?' + params.toString();
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(300);
      const out = path.resolve('..\\assets', `section-${s.slug}-v1${t === 'light' ? '-light' : ''}.png`);
      await page.screenshot({ path: out, type: 'png' });
      console.log('rendered', out, fs.statSync(out).size, 'bytes');
      await page.close();
    }
    await browser.close();
  }
})();
