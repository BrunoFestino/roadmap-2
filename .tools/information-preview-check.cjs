const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

async function main() {
  const root = path.resolve(__dirname, '..');
  const output = path.join(root, '.lavish');
  fs.mkdirSync(output, { recursive: true });
  const preview = path.join(output, 'information-preview.html');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    await page.goto((process.env.DEMO_URL || 'http://127.0.0.1:18084') + '/information');
    await page.locator('.information-hero').waitFor();
    await page.waitForFunction(() => window.Vaadin?.Flow?.clients &&
      Object.values(window.Vaadin.Flow.clients).every(client => !client.isActive()));
    await page.screenshot({ path: path.join(output, 'information-current.png') });
    if (fs.existsSync(preview)) {
      await page.goto(pathToFileURL(preview).href);
      for (const width of [1440, 1100, 768, 390]) {
        await page.setViewportSize({ width, height: 1000 });
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
        assert.equal(overflow, false, 'Horizontal overflow at ' + width);
        await page.screenshot({ path: path.join(output, 'information-preview-' + width + '.png'), fullPage: true });
        if (width === 1440 || width === 390) {
          await page.screenshot({ path: path.join(output, 'information-preview-top-' + width + '.png') });
        }
        console.log('Preview ' + width + 'px: no horizontal overflow');
      }
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.getByRole('link', { name: 'Parent & subtasks', exact: true }).click();
      assert.equal(new URL(page.url()).hash, '#subtasks');
      await page.locator('#subtasks').screenshot({ path: path.join(output, 'information-subtasks.png') });
      await page.getByText('Review notes and code evidence', { exact: true }).click();
      assert.equal(await page.locator('#review-notes').getAttribute('open'), '');
      console.log('Section navigation and evidence disclosure: passed');
    }
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
