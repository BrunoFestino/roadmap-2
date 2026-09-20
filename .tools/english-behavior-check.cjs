const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const base = process.env.DEMO_URL || 'http://127.0.0.1:18083';
const forbiddenSpanish = /\b(Actualizar|Agregar|Ausencias|Buscar|Cancelar|Carga|Equipo|Esfuerzo|Guardar|Histograma|Información|Necesita atención|Persona|Planificar|Sin fecha|Tarea)\b/i;

async function ready(page) {
  await page.locator('h1').waitFor();
  await page.waitForFunction(() => window.Vaadin?.Flow?.clients
    && Object.values(window.Vaadin.Flow.clients).every(client => !client.isActive()));
}

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, locale: 'en-US' });
  page.setDefaultTimeout(20000);
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));

  try {
    for (const route of ['/', '/gantt/planning', '/gantt/availability', '/information']) {
      await page.goto(base + route);
      await ready(page);
      assert.doesNotMatch(await page.locator('body').innerText(), forbiddenSpanish, route + ' contains Spanish UI text');
    }

    await page.goto(base + '/gantt/planning');
    await ready(page);
    await page.getByRole('textbox', { name: 'Jira ID', exact: true }).fill('DEMO-TEST');
    await page.getByRole('combobox', { name: 'Person', exact: true }).click();
    await page.getByRole('option', { name: 'John Doe', exact: true }).click();
    await page.getByRole('combobox', { name: 'Show', exact: true }).click();
    await page.getByRole('option', { name: 'Task', exact: true }).click();
    await page.getByText('Friday-to-Monday test', { exact: true }).click();
    await page.getByRole('button', { name: 'Save plan', exact: true }).click();
    await page.getByText('Plan saved for DEMO-TEST.', { exact: true }).waitFor();

    assert.equal(await page.getByRole('textbox', { name: 'Jira ID', exact: true }).inputValue(), 'DEMO-TEST');
    assert.equal(await page.getByRole('combobox', { name: 'Person', exact: true }).inputValue(), 'John Doe');
    assert.equal(await page.getByRole('combobox', { name: 'Show', exact: true }).inputValue(), 'Task');
    assert.equal(await page.getByText('Friday-to-Monday test', { exact: true }).count(), 1);
    assert.deepEqual(pageErrors, []);
    console.log('PASS: English UI on four routes and planning filters persist after save.');
  } finally {
    await browser.close();
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
