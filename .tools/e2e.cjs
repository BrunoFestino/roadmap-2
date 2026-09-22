const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Fault injection is allowed only against the local test fixture, never Jira or production.
const base = process.env.TEST_FIXTURE_URL || 'http://127.0.0.1:18083';
const out = process.env.EVIDENCE_DIR || path.join(__dirname, 'evidence', 'e2e');
async function run() {
  assert.ok(/^http:\/\/127\.0\.0\.1:\d+$/.test(base), 'Use an isolated loopback fixture');
  const initial = await (await fetch(base + '/test/state')).json();
  const original = initial.plans.find(p => p.issue_key === 'TEST-TEST');
  assert.ok(original, 'Expected synthetic TEST-TEST fixture');
  assert.ok(initial.absences.every(a => a.start_date > '2026-09-15'), 'Use a fresh fixture with no earlier absences');
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, locale: 'en-US' });
  page.setDefaultTimeout(15000);
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const state = async () => (await fetch(base + '/test/state')).json();
  const fault = async mode => assert.equal((await fetch(base + '/test/fault/' + mode, { method: 'POST' })).status, 200);
  const idle = async () => page.waitForFunction(() => window.Vaadin?.Flow?.clients
    && Object.values(window.Vaadin.Flow.clients).every(c => !c.isActive()));
  const visible = text => page.getByText(text, { exact: false }).first().waitFor();
  const openPlan = async (key = 'TEST-TEST') => {
    await page.goto(base + '/gantt/planning');
    await page.locator('h1').waitFor();
    await idle();
    await page.getByRole('textbox', { name: 'Jira ID', exact: true }).fill(key);
    await idle();
    const link = page.getByRole('link', { name: new RegExp('^Open ' + key + ' in Jira:') });
    await link.waitFor();
    const summary = (await link.getAttribute('aria-label')).split(' in Jira: ')[1];
    await page.locator('.planning-grid-text[title]:visible').filter({ hasText: summary }).click();
    await page.waitForFunction(key => document.querySelector('.selection-instruction')?.textContent.includes(key), key);
    await idle();
  };
  const date = async (index, value) => {
    const input = page.locator('vaadin-date-picker').nth(index).locator('input').first();
    await input.fill(value);
    await input.press('Enter');
    await page.keyboard.press('Escape');
    await idle();
  };
  const dates = async () => {
    await idle();
    return page.locator('vaadin-date-picker').evaluateAll(es => es.map(e => e.value));
  };
  const save = () => page.getByRole('button', { name: 'Save plan', exact: true }).click();
  const stack = () => page.getByRole('combobox', { name: 'Local stack', exact: true });
  const selectStack = async label => {
    if (label) {
      await stack().click();
      await page.getByRole('option', { name: label, exact: true }).click();
    } else {
      await stack().fill('');
      await stack().press('Tab');
    }
    await idle();
  };
  const usDate = iso => { const [y, m, d] = iso.split('-'); return m + '/' + d + '/' + y; };
  let createdAbsence = false;
  const note = 'E2E audit temporary absence';
  const deleteTestAbsence = async () => {
    await page.goto(base + '/gantt/availability');
    await page.locator('h1').waitFor();
    await idle();
    // Fixture absences start in September; this test deliberately inserts an earlier row.
    assert.equal((await page.getByRole('button', { name: 'Delete', exact: true }).count()), initial.absences.length + 1);
    await visible(note);
    await page.getByRole('button', { name: 'Delete', exact: true }).first().click();
    await visible('Absence deleted.');
    createdAbsence = false;
  };
  try {
    await fault('none');
    await openPlan();
    assert.equal(await page.getByRole('textbox', { name: 'Label Jira', exact: true }).inputValue(), 'No stack label');
    assert.equal(await page.getByRole('textbox', { name: 'Person fallback', exact: true }).inputValue(), 'John Doe · Mobile');
    await selectStack(null);
    await visible('Effective stack: Mobile · source: Person role');
    await selectStack('Front');
    await visible('Effective stack: Front · source: Local planning');
    await date(0, '09/11/2026');
    await date(1, '09/14/2026');
    await save();
    await visible('Plan saved for TEST-TEST.');
    assert.equal(await page.getByRole('textbox', { name: 'Jira ID', exact: true }).inputValue(), 'TEST-TEST');
    await openPlan();
    assert.deepEqual(await dates(), ['2026-09-11', '2026-09-14']);
    assert.equal(await stack().inputValue(), 'Front');
    assert.deepEqual(await page.locator('vaadin-date-picker input').evaluateAll(es => es.map(e => e.value)), ['09/11/2026', '09/14/2026']);
    await fault('schedule-save');
    await save();
    await visible('The dates for TEST-TEST were not saved.');
    assert.deepEqual(await dates(), ['2026-09-11', '2026-09-14']);
    await date(0, '09/12/2026');
    await date(1, '09/13/2026');
    await save();
    await visible('This window has no available days');
    assert.equal((await state()).plans.find(p => p.issue_key === 'TEST-TEST').start_date, '2026-09-11');
    await date(0, '10/09/2026');
    await date(1, '10/12/2026');
    await save();
    await visible('Plan saved for TEST-TEST.');
    await openPlan();
    assert.deepEqual(await dates(), ['2026-10-09', '2026-10-12']);
    await fault('reload-after-save');
    await date(1, '10/13/2026');
    await save();
    await visible('was saved, but refresh failed');
    assert.equal((await state()).plans.find(p => p.issue_key === 'TEST-TEST').end_date, '2026-10-13');
    await page.getByRole('button', { name: 'Refresh', exact: true }).click();
    await visible('Select an Epic, task or subtask from the table.');
    await openPlan();
    assert.deepEqual(await dates(), ['2026-10-09', '2026-10-13']);
    console.log('PASS: dates, persistence, weekend validation, save and refresh error recovery.');

    for (const [key, expected] of [
      ['TEST-2104', 'Effective stack: Front · source: Local planning'],
      ['TEST-2105', 'Effective stack: Mobile · source: Label Jira'],
      ['TEST-2107', 'Effective stack: Ambiguous stack · source: Label Jira']
    ]) {
      await openPlan(key);
      await visible(expected);
    }
    assert.equal(await page.locator('.effective-stack-preview').evaluate(e => getComputedStyle(e).color), 'rgb(179, 38, 30)');
    console.log('PASS: local stack overrides Jira, Jira overrides role, ambiguity visible.');

    await page.goto(base + '/gantt/availability');
    await page.locator('h1').waitFor();
    await idle();
    await page.getByRole('combobox', { name: 'Person', exact: true }).click();
    await page.getByRole('option', { name: 'John Doe', exact: true }).click();
    await page.getByRole('combobox', { name: 'Type', exact: true }).click();
    await page.getByRole('option', { name: 'Vacation', exact: true }).click();
    await date(0, '09/14/2026');
    await date(1, '09/15/2026');
    await page.getByRole('textbox', { name: 'Note (optional)', exact: true }).fill(note);
    await fault('absence-save');
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await visible('The absence was not saved.');
    assert.deepEqual(await dates(), ['2026-09-14', '2026-09-15']);
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await visible('Absence added.');
    createdAbsence = true;
    assert.equal((await state()).absences.length, initial.absences.length + 1);
    await idle();
    await fault('absence-delete');
    await page.getByRole('button', { name: 'Delete', exact: true }).first().click();
    await visible('The absence was not deleted.');
    assert.equal((await state()).absences.length, initial.absences.length + 1);
    await deleteTestAbsence();
    await fault('absence-load');
    await page.getByRole('button', { name: 'Refresh absences', exact: true }).click();
    await visible('The absence list could not be refreshed.');
    await page.getByRole('button', { name: 'Refresh absences', exact: true }).click();
    await idle();
    console.log('PASS: absence create/delete/load failures and retries.');

    await fault('jira-load');
    await page.goto(base);
    await visible('The roadmap could not be loaded.');
    await page.getByRole('button', { name: 'Refresh roadmap', exact: true }).click();
    await visible('Team capacity & load');
    await idle();
    assert.deepEqual(errors, []);
    await page.screenshot({ path: path.join(out, 'roadmap.png') });
    console.log('PASS: roadmap reload recovery and no JavaScript errors.');
  } catch (error) {
    await page.screenshot({ path: path.join(out, 'failure.png'), fullPage: true });
    throw error;
  } finally {
    try {
      await fault('none');
      if (createdAbsence) await deleteTestAbsence();
      await openPlan();
      await date(0, usDate(original.start_date));
      await date(1, usDate(original.end_date));
      const labels = { FRONTEND: 'Front', BACKEND: 'BE', MOBILE: 'Mobile', DEVOPS: 'DevOps' };
      await selectStack(labels[original.stack_local] || null);
      await save();
      await visible('Plan saved for TEST-TEST.');
      assert.deepEqual(await state(), initial, 'All fixture data must be restored');
      console.log('PASS: original fixture state restored.');
    } finally { await browser.close(); }
  }
}
run().catch(error => { console.error(error); process.exitCode = 1; });
