const { chromium } = require('playwright-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

chromium.use(StealthPlugin());

(async () => {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://fuelinsights.gasbuddy.com/Home/US/Massachusetts', { waitUntil: 'networkidle' });
    
    await page.screenshot({ path: 'output/screenshot.png', fullPage: true });
    const text = await page.innerText('body');
    fs.writeFileSync('output/content.txt', text);
    
    await browser.close();
    console.log('Done!');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
