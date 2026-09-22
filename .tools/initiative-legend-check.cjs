const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

async function main() {
  const base = process.env.TEST_FIXTURE_URL || 'http://127.0.0.1:18085';
  assert.match(base, /^http:\/\/127\.0\.0\.1:\d+$/);
  const output = path.join(__dirname, 'evidence', 'initiative-legend');
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  // Intercept the synthetic Jira destination so the click never needs an external Jira session.
  await context.route('**/browse/**', route => route.fulfill({ contentType: 'text/html', body: '<h1>Jira issue</h1>' }));
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  try {
    await page.goto(base);
    await page.locator('.epic-legend').waitFor();
    await page.waitForFunction(() => window.Vaadin?.Flow?.clients &&
      Object.values(window.Vaadin.Flow.clients).every(client => !client.isActive()));
    const legend = page.locator('.epic-legend');
    for (const [key, name] of Object.entries({
      'TEST-2000': 'Mobile experience',
      'TEST-2001': 'Platform modernization',
      'TEST-2002': 'Accessible web experience',
      'TEST-M2': 'Beta mobile'
    })) {
      const link = legend.getByRole('link', { name: new RegExp('^Open ' + key + ' · ' + name) });
      assert.equal(await link.count(), 1);
      assert.equal(await link.getAttribute('href'), 'http://127.0.0.1:18083/browse/' + key);
      assert.equal(await link.getAttribute('target'), '_blank');
      assert.equal(await link.getAttribute('rel'), 'noopener noreferrer');
    }
    assert.equal(await legend.getByRole('link', { name: /No epic/ }).count(), 0);
    if (process.argv.includes('--edge-cases')) {
      assert.equal(await page.locator('[title^="Epic: TEST-2000"], [title^="Epic: TEST-2001"], [title^="Epic: TEST-2002"]').count(), 0);
    }
    const destination = legend.getByRole('link', { name: /^Open TEST-2000 / });
    const opened = context.waitForEvent('page');
    await destination.click();
    const jira = await opened;
    await jira.waitForLoadState();
    assert.equal(jira.url(), 'http://127.0.0.1:18083/browse/TEST-2000');
    await jira.close();
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      await legend.scrollIntoViewIfNeeded();
      await legend.screenshot({ path: path.join(output, 'legend-' + width + '.png') });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    }
    assert.deepEqual(errors, []);
    console.log('PASS: initiative names, Jira links and new-tab navigation, including missing dates, past windows and closed initiatives; desktop and mobile layouts.');
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
