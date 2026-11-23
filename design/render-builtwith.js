const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const techs = [
  { slug: 'nextdotjs', name: 'Next.js', desc: 'App Router, SSR/SSG, API routes', grad: 'linear-gradient(135deg,#FFFFFF,#9C9CBE)' },
  { slug: 'react', name: 'React', desc: 'Component-driven UI', grad: 'linear-gradient(135deg,#16E6EE,#4D4DFF)' },
  { slug: 'nodedotjs', name: 'Node.js', desc: 'Serverless functions & APIs', grad: 'linear-gradient(135deg,#34D399,#10B981)' },
  { slug: 'typescript', name: 'TypeScript', desc: 'Typed end-to-end', grad: 'linear-gradient(135deg,#4D4DFF,#9B59FF)' },
];

(async () => {
  for (const t of ['dark', 'light']) {
    const browser = await chromium.launch({ executablePath: CHROME, headless: true });
    for (const tech of techs) {
      const page = await browser.newPage({ viewport: { width: 480, height: 380 }, deviceScaleFactor: 2 });
      const params = new URLSearchParams({ theme: t, slug: tech.slug, name: tech.name, desc: tech.desc, grad: tech.grad });
      const url = 'file:///' + path.resolve('html/builtwith.html').replace(/\\/g, '/') + '?' + params.toString();
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(400);
      const out = path.resolve('..\\assets', `builtwith-${tech.slug === 'nextdotjs' ? 'nextjs' : tech.slug === 'nodedotjs' ? 'nodejs' : tech.slug}-v1${t === 'light' ? '-light' : ''}.png`);
      await page.screenshot({ path: out, type: 'png' });
      console.log('rendered', out, fs.statSync(out).size, 'bytes');
      await page.close();
    }
    await browser.close();
  }
})();
