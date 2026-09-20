const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

// Read-only UI smoke test. Screenshots remain local in the ignored evidence folder.
async function main() {
  const phase = process.argv[2] || 'after';
  const base = process.env.DEMO_URL || 'http://127.0.0.1:18083';
  const output = path.join(__dirname, 'evidence', 'visual-' + phase);
  fs.mkdirSync(output, { recursive: true });
  const state = async () => (await fetch(base + '/test/state')).json();
  const deadline = Date.now() + 45000;
  let initialState;
  while (!initialState) {
    try { initialState = await state(); } catch (e) {
      if (Date.now() >= deadline) throw e;
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, locale: 'en-US' });
  page.setDefaultTimeout(15000);
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const routes = [['roadmap', '/'], ['planning', '/gantt/planning'], ['availability', '/gantt/availability'], ['information', '/information']];
  const ready = async () => {
    await page.locator('h1').waitFor();
    await page.waitForFunction(() => window.Vaadin?.Flow?.clients && Object.values(window.Vaadin.Flow.clients).every(c => !c.isActive()));
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => ![...document.querySelectorAll('.v-loading-indicator')].some(e => getComputedStyle(e).display !== 'none' && getComputedStyle(e).opacity !== '0'));
  };
  try {
    for (const [name, route] of routes) {
      await page.goto(base + route);
      await ready();
      if (phase !== 'before') assert.doesNotMatch(await page.locator('body').innerText(), /Ã|Â|â€|\uFFFD/, name + ' has corrupted text');
      await page.screenshot({ path: path.join(output, name + '.png'), fullPage: false });
      console.log(name, await page.locator('h1').innerText());
      if (name === 'roadmap') {
        console.log('Sections:', await page.locator('[data-section-target]').allTextContents());
        await page.locator('.usage-person-row > vaadin-details-summary').first().click();
        await ready();
        await page.locator('.usage-task-breakdown').first().scrollIntoViewIfNeeded();
        await page.screenshot({ path: path.join(output, 'effort-expanded.png') });
        for (const id of ['roadmap-histogram', 'roadmap-by-role', 'roadmap-unplanned']) {
          await page.locator('[data-section-target="' + id + '"]').click();
          await page.waitForFunction(id => {
            const nav = document.querySelector('.roadmap-section-navigation').getBoundingClientRect();
            const section = document.getElementById(id).getBoundingClientRect();
            return location.hash === '#' + id && section.top >= nav.bottom && section.top <= nav.bottom + 150
              && document.querySelector('[data-section-target="' + id + '"]').hasAttribute('active');
          }, id);
          await page.screenshot({ path: path.join(output, id + '.png') });
        }
      }
      if (name === 'planning') {
        await page.locator('vaadin-grid-cell-content .planning-grid-text').filter({ hasText: 'Epic' }).first().click();
        await page.waitForFunction(() => !document.querySelector('.planning-save-button')?.disabled);
        assert.equal(await page.locator('vaadin-number-field').evaluate(e => e.disabled), true);
        await page.getByRole('textbox', { name: 'Jira ID', exact: true }).fill('DEMO-TEST');
        await page.locator('vaadin-grid-cell-content .planning-grid-text').filter({ hasText: 'Friday-to-Monday test' }).click();
        await page.waitForFunction(() => document.querySelector('.selection-instruction')?.textContent.includes('DEMO-TEST'));
        assert.equal(await page.locator('vaadin-number-field').evaluate(e => e.disabled), true);
        assert.equal(await page.locator('.planning-save-button').isEnabled(), true);
        if (phase !== 'before') assert.ok((await page.locator('.planning-grid').boundingBox()).height < 180, 'Filtered grid leaves unnecessary blank space');
        await page.locator('.planning-form').scrollIntoViewIfNeeded();
        await page.screenshot({ path: path.join(output, 'planning-selected.png') });
      }
      if (name === 'availability') {
        await page.getByRole('button', { name: 'Edit', exact: true }).first().click();
        await page.getByRole('button', { name: 'Cancel editing', exact: true }).waitFor();
        assert.equal(await page.getByRole('button', { name: 'Save changes', exact: true }).isEnabled(), true);
        await page.screenshot({ path: path.join(output, 'availability-edit.png') });
        await page.getByRole('button', { name: 'Cancel editing', exact: true }).click();
        await page.getByRole('button', { name: 'Add', exact: true }).waitFor();
      }
      for (const width of [1100, 390]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(base + route);
        await ready();
        await page.screenshot({ path: path.join(output, name + '-' + width + '.png') });
        const size = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
        console.log(name, width, size);
        if (phase !== 'before') assert.ok(size.document <= size.viewport + 1, name + ' overflows at ' + width);
        if (width === 390 && name === 'planning') {
          await page.locator('.planning-form').scrollIntoViewIfNeeded();
          await page.screenshot({ path: path.join(output, 'planning-form-mobile.png') });
        }
      }
      await page.setViewportSize({ width: 1440, height: 1000 });
    }
    assert.deepEqual(errors, []);
    assert.deepEqual(await state(), initialState, 'Visual checks must not alter saved data');
    console.log('PASS: four routes, responsive layout, task selection, section navigation, unchanged demo data, no JavaScript errors.');
  } finally {
    await browser.close();
  }
}
main().catch(e => { console.error(e); process.exitCode = 1; });
