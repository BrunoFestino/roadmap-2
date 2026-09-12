const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = 'http://127.0.0.1:18083';
const out = process.env.EVIDENCE_DIR || path.join(__dirname, 'evidence');
fs.mkdirSync(out, { recursive: true });
const results = [];
async function run() {
  const deadline = Date.now() + 90000;
  while (true) {
    try { if ((await fetch(base + '/test/state')).ok) break; } catch {}
    if (Date.now() >= deadline) throw Error('La demo no responde en ' + base);
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  const browser = await chromium.launch({channel: 'chrome', headless: true});
  const context = await browser.newContext({viewport: {width: 1440, height: 1000}, locale: 'es-AR'});
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const check = (name, evidence) => { results.push({name, status: 'PASS', evidence}); console.log('PASS', name, JSON.stringify(evidence ?? '')); };
  const shot = async name => page.screenshot({path: path.join(out, name + '.png'), fullPage: false, animations: 'disabled'});
  const bodyHas = async text => page.getByText(text, {exact: false}).first().waitFor({state: 'visible'});
  const state = async () => (await fetch(base + '/test/state')).json();
  const fault = async mode => { const response = await fetch(base + '/test/fault/' + mode, {method: 'POST'}); assert.equal(response.status, 200); };
  const openPlanning = async () => { await page.goto(base + '/gantt/planning'); await page.getByText('TTAR-TEST', {exact: true}).click(); await bodyHas('TTAR-TEST: cargá'); };
  const idle = async () => page.waitForFunction(() => window.Vaadin?.Flow?.clients && Object.values(window.Vaadin.Flow.clients).every(client => !client.isActive()));
  const dates = async () => { await idle(); return page.locator('vaadin-date-picker').evaluateAll(elements => elements.map(e => e.value)); };
  const enterDate = async (index, value) => {
    const input = page.locator('vaadin-date-picker').nth(index).locator('input').first();
    await input.fill(value); await input.press('Enter'); await page.keyboard.press('Escape'); await idle();
  };
  try {
    await fault('none');
    const initialPlan = (await state()).plans.find(p => p.issue_key === 'TTAR-TEST');
    if (initialPlan.start_date !== '2026-09-11' || initialPlan.end_date !== '2026-09-14') {
      await openPlanning();
      await enterDate(0, '11/09/2026');
      await enterDate(1, '14/09/2026');
      await page.getByRole('button', {name: 'Guardar fechas', exact: true}).click();
      await bodyHas('Fechas guardadas para TTAR-TEST');
    }
    await page.goto(base);
    await bodyHas('Carga del equipo');
    await bodyHas('TTAR-NODATE');
    const evidence = await page.evaluate(() => ({
      bars: [...document.querySelectorAll('[title]')].filter(e => e.title.startsWith('Task Key: TTAR-TEST\n'))
        .map(e => ({width: e.getBoundingClientRect().width, tooltip: e.title})),
      headers: [...document.querySelectorAll('span')].filter(e => /^S[1-8]( · hoy)?$/.test(e.textContent) && e.getBoundingClientRect().height > 0).map(e => e.textContent),
      warnings: [...document.querySelectorAll('span')].filter(e => e.textContent.includes('h pendientes ·')).map(e => e.textContent)
    }));
    assert.equal(evidence.bars.length, 2);
    for (const bar of evidence.bars) { assert.equal(bar.width, 64); assert.match(bar.tooltip, /Planificación local/); assert.doesNotMatch(bar.tooltip, /Dedication:/); }
    assert.ok(evidence.headers.length >= 8);
    assert.deepEqual(evidence.warnings, []);
    assert.equal(await page.getByText('Trabajo que requiere revisión', {exact: false}).count(), 0);
    check('Gantt, semanas y origen local; sin bloque de advertencias', evidence);
    await shot('after-roadmap');
    await page.locator('h2').filter({hasText: 'Por persona'}).scrollIntoViewIfNeeded();
    await shot('after-gantt');
    await page.setViewportSize({width: 1100, height: 900});
    await page.evaluate(() => scrollTo(0, 0));
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await shot('after-roadmap-1100');
    check('La página no desborda a 1100 px; grilla con scroll propio');
    await page.setViewportSize({width: 1440, height: 1000});

    await openPlanning();
    assert.deepEqual(await dates(), ['2026-09-11', '2026-09-14']);
    const formats = await page.locator('vaadin-date-picker').evaluateAll(es => es.map(e => e.querySelector('input')?.value));
    assert.deepEqual(formats, ['11/09/2026', '14/09/2026']);
    await fault('schedule-save');
    await page.getByRole('button', {name: 'Guardar fechas', exact: true}).click();
    await bodyHas('No se guardaron las fechas de TTAR-TEST');
    assert.deepEqual(await dates(), ['2026-09-11', '2026-09-14']);
    await shot('after-save-error');
    check('Fallo de guardado visible; formulario conservado', formats);

    await enterDate(0, '12/09/2026');
    await enterDate(1, '13/09/2026');
    await page.getByRole('button', {name: 'Guardar fechas', exact: true}).click();
    await bodyHas('La ventana no tiene días disponibles');
    assert.equal((await state()).plans.find(p => p.issue_key === 'TTAR-TEST').start_date, '2026-09-11');
    await shot('after-weekend-validation');
    check('Se rechaza una ventana sin días disponibles sin escribir en PostgreSQL');

    await enterDate(0, '09/10/2026');
    await enterDate(1, '12/10/2026');
    await page.getByRole('button', {name: 'Guardar fechas', exact: true}).click();
    await bodyHas('Fechas guardadas para TTAR-TEST');
    let saved = (await state()).plans.find(p => p.issue_key === 'TTAR-TEST');
    assert.equal(saved.start_date, '2026-10-09');
    assert.equal(saved.end_date, '2026-10-12');
    await page.reload();
    await page.getByText('TTAR-TEST', {exact: true}).click();
    assert.deepEqual(await dates(), ['2026-10-09', '2026-10-12']);
    await shot('after-save-success');
    check('Entrada manual dd/MM/yyyy, guardado real y recarga', saved);

    await fault('reload-after-save');
    await enterDate(1, '13/10/2026');
    await page.getByRole('button', {name: 'Guardar fechas', exact: true}).click();
    await bodyHas('se guardaron, pero falló la recarga');
    assert.equal((await state()).plans.find(p => p.issue_key === 'TTAR-TEST').end_date, '2026-10-13');
    await shot('after-reload-error');
    await page.getByRole('button', {name: 'Actualizar tareas', exact: true}).click();
    await bodyHas('Elegí una tarea de la tabla.');
    await page.getByText('TTAR-TEST', {exact: true}).click();
    await bodyHas('TTAR-TEST: cargá');
    assert.deepEqual(await dates(), ['2026-10-09', '2026-10-13']);
    check('Distingue guardado exitoso de recarga fallida y permite reintentar');

    await page.goto(base + '/gantt/availability');
    await bodyHas('Ausencias del equipo (AR1)');
    await page.locator('vaadin-combo-box').first().click();
    await page.getByRole('option', {name: 'Bruno Festino', exact: true}).click();
    await page.locator('vaadin-combo-box').nth(1).click();
    await page.getByRole('option', {name: 'Vacaciones', exact: true}).click();
    await enterDate(0, '14/09/2026');
    await enterDate(1, '15/09/2026');
    await page.locator('vaadin-text-field').locator('input').fill('E2E días completos');
    await fault('absence-save');
    await page.getByRole('button', {name: 'Agregar', exact: true}).click();
    await bodyHas('No se guardó la ausencia');
    assert.deepEqual(await dates(), ['2026-09-14', '2026-09-15']);
    await page.getByRole('button', {name: 'Agregar', exact: true}).click();
    await bodyHas('Ausencia agregada');
    assert.equal((await state()).absences.length, 1);
    await shot('after-absence-success');
    await fault('absence-delete');
    await page.getByRole('button', {name: 'Eliminar', exact: true}).click();
    await bodyHas('No se eliminó la ausencia');
    assert.equal((await state()).absences.length, 1);
    await shot('after-absence-delete-error');
    await page.getByRole('button', {name: 'Eliminar', exact: true}).click();
    await bodyHas('Ausencia eliminada');
    assert.equal((await state()).absences.length, 0);
    await fault('absence-load');
    await page.getByRole('button', {name: 'Actualizar ausencias', exact: true}).click();
    await bodyHas('No se pudo actualizar la lista de ausencias');
    await page.getByRole('button', {name: 'Actualizar ausencias', exact: true}).click();
    check('Ausencias: error y reintento de alta, borrado y carga');

    await fault('jira-load');
    await page.goto(base);
    await bodyHas('No se pudo cargar el roadmap');
    await shot('after-roadmap-error');
    await page.getByRole('button', {name: 'Actualizar roadmap', exact: true}).click();
    await bodyHas('Carga del equipo');
    check('Error de carga contextual y recuperación del roadmap');
    assert.deepEqual(errors, []);
    check('Sin errores JavaScript', errors);
  } finally {
    await shot('last-e2e-state');
    fs.writeFileSync(path.join(out, 'e2e-results.json'), JSON.stringify({results, errors}, null, 2));
    await browser.close();
  }
}
run().catch(error => { console.error(error); process.exitCode = 1; });
