const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const base = 'http://127.0.0.1:18083';
const output = process.argv[2] || '.tools/evidence/performance/results.json';
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({viewport: {width: 1440, height: 1000}, locale: 'en-US'});
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const idle = () => page.waitForFunction(() => window.Vaadin?.Flow?.clients && Object.values(window.Vaadin.Flow.clients).every(c => !c.isActive()));
  const rows = [];
  const measure = async (name, action) => {
    const before = await (await fetch(base + '/test/performance')).json();
    const start = performance.now();
    await action();
    await idle();
    const ms = Math.round(performance.now() - start);
    const after = await (await fetch(base + '/test/performance')).json();
    rows.push({name, ms, jiraCalls: after.jiraCalls - before.jiraCalls, nodes: await page.locator('*').count()});
    console.log(JSON.stringify(rows.at(-1)));
  };
  try {
    await fetch(base + '/test/performance/500', {method:'POST'});
    for (let run = 0; run < 4; run++) {
      await measure('roadmap', async () => {
        await page.goto(base);
        await page.locator('.usage-person-week').first().waitFor();
      });
      const initialDetails = await page.locator('.usage-task-breakdown').count();
      await measure('expand-person', async () => {
        await page.locator('.usage-person-row').first().locator('[slot="summary"]').click();
        await page.locator('.usage-task-breakdown').first().waitFor();
      });
      rows.at(-1).initialDetails = initialDetails;
      await measure('roadmap-refresh', () => page.getByRole('button', {name:'Refresh roadmap', exact:true}).click());
      await measure('planning', async () => {
        await page.goto(base + '/gantt/planning');
        await page.locator('.planning-grid-text').first().waitFor();
      });
      await page.getByRole('textbox', {name:'Jira ID', exact:true}).fill('TEST-TEST');
      await page.waitForFunction(() => document.querySelector('vaadin-grid').size === 1);
      await idle();
      await page.locator('.planning-grid-text[title]:visible').filter({hasText:'Friday-to-Monday test'}).click();
      await page.waitForFunction(() => document.querySelector('.selection-instruction')?.textContent.includes('TEST-TEST'));
      await idle();
      await measure('save', async () => {
        await page.getByRole('button', {name:'Save plan', exact:true}).click();
        await page.getByText('Plan saved for TEST-TEST.', {exact:true}).first().waitFor();
      });
      await measure('planning-refresh', () => page.getByRole('button', {name:'Refresh', exact:true}).click());
    }
    assert.deepEqual(errors, []);
    const report = {jiraDelayMillis:500, warmupRuns:1, rows};
    fs.mkdirSync(path.dirname(output), {recursive:true});
    fs.writeFileSync(output, JSON.stringify(report,null,2));
    console.log(JSON.stringify(report,null,2));
    await page.screenshot({path:path.join(path.dirname(output),'planning.png'),fullPage:true});
  } finally {
    await fetch(base + '/test/performance/0', {method:'POST'});
    await browser.close();
  }
})().catch(e => {console.error(e);process.exitCode=1;});
