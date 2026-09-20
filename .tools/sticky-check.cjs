const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

async function main() {
  const baseline = process.argv.includes('--before');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 2560, height: 1000 } });
  const base = process.env.TEST_FIXTURE_URL || 'http://127.0.0.1:18084';
  const evidence = path.join(__dirname, 'evidence', 'sticky-' + (baseline ? 'before' : 'after'));
  fs.mkdirSync(evidence, { recursive: true });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    await page.goto(base);
    await page.locator('[data-section-target="roadmap-histogram"]').waitFor();
    await page.waitForFunction(() => window.Vaadin?.Flow?.clients
      && Object.values(window.Vaadin.Flow.clients).every(client => !client.isActive()));
    if (process.env.STICKY_CSS_PREVIEW === '1') {
      await page.addStyleTag({ path: path.join(__dirname, '../src/main/frontend/themes/roadmap/styles.css') });
    }
    await page.screenshot({ path: path.join(evidence, 'initial-layout.png') });
    if (!baseline) {
      const order = await page.evaluate(() => ({
        navBottom: document.querySelector('.roadmap-section-navigation').getBoundingClientRect().bottom,
        titleTop: document.querySelector('.roadmap-page-header').getBoundingClientRect().top
      }));
      assert.ok(order.navBottom <= order.titleTop, 'Navigation must be above the title');
    }
    const measure = async label => {
      await page.waitForTimeout(350);
      const bounds = await page.evaluate(() => {
        const nav = document.querySelector('.roadmap-section-navigation').getBoundingClientRect();
        const header = document.querySelector('.app-header').getBoundingClientRect();
        const content = document.querySelector('.roadmap-section').getBoundingClientRect();
        return { navLeft: nav.left, navRight: nav.right, navTop: nav.top,
          headerLeft: header.left, headerRight: header.right, headerBottom: header.bottom,
          contentWidth: content.width, viewport: innerWidth,
          documentWidth: document.documentElement.scrollWidth };
      });
      console.log(label, JSON.stringify(bounds));
      if (!baseline) {
        assert.ok(Math.abs(bounds.navLeft - bounds.headerLeft) <= 1, label + ': left edge');
        assert.ok(Math.abs(bounds.navRight - bounds.headerRight) <= 1, label + ': right edge');
        assert.ok(bounds.documentWidth <= bounds.viewport + 1, label + ': page overflow');
        assert.ok(bounds.contentWidth <= 1457, label + ': content width changed');
      }
      return bounds;
    };
    for (const width of [2560, 1920, 1440, 1100, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      await measure(width + ' initial');
      await page.locator('[data-section-target="roadmap-histogram"]').click();
      await page.waitForFunction(() => {
        const nav = document.querySelector('.roadmap-section-navigation').getBoundingClientRect();
        const section = document.querySelector('#roadmap-histogram').getBoundingClientRect();
        return location.hash === '#roadmap-histogram' && section.top >= nav.bottom && section.top < nav.bottom + 160;
      });
      const scrolled = await measure(width + ' scrolled');
      if (!baseline) assert.ok(Math.abs(scrolled.navTop - scrolled.headerBottom) <= 2, 'Sticky top gap');
      await page.screenshot({ path: path.join(evidence, width + '.png') });
      if (width >= 1100) {
        await page.locator('vaadin-drawer-toggle').click();
        await measure(width + ' sidebar toggled');
        await page.locator('vaadin-drawer-toggle').click();
      }
    }
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
