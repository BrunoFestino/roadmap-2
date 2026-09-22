const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const baseline = process.argv.includes('--before');
const base = process.env.TEST_FIXTURE_URL || 'http://127.0.0.1:18084';
async function ready(page) {
  await page.locator('h1').waitFor();
  await page.waitForFunction(() => window.Vaadin?.Flow?.clients &&
    Object.values(window.Vaadin.Flow.clients).every(client => !client.isActive()));
}
async function main() {
  assert.ok(['http://127.0.0.1:18084', 'http://127.0.0.1:18085'].includes(base), 'Use the isolated local test fixture');
  assert.ok((await (await fetch(base + '/test/state')).json()).plans.some(p => p.issue_key === 'TEST-SUB-A'));
  const browser = await chromium.launch({channel:'chrome',headless:true});
  const page = await browser.newPage({viewport:{width:1440,height:1000},locale:'en-US'});
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const output = path.join(__dirname,'evidence','information-feedback-' + (baseline?'before':'after'));
  fs.mkdirSync(output,{recursive:true});
  try {
    await page.goto(base + '/gantt/planning'); await ready(page);
    await page.getByRole('combobox',{name:'Show',exact:true}).click();
    await page.getByRole('option',{name:'Task',exact:true}).waitFor();
    const options = await page.getByRole('option').allTextContents();
    console.log('Planning categories:', JSON.stringify(options));
    await page.screenshot({path:path.join(output,'planning-types.png')});
    if (baseline) {
      assert.equal(options.some(v=>v.trim()==='Subtask'),false);
    } else {
      assert.ok(options.some(v=>v.trim()==='Subtask'));
      for (const type of ['Story','Task','Bug','Spike','Subtask','Epic']) {
        assert.ok(options.some(v=>v.trim()===type), 'Missing planning type '+type);
      }
      await page.getByRole('option',{name:'Subtask',exact:true}).click();
      await page.getByRole('textbox',{name:'Jira ID',exact:true}).fill('TEST-2111');
      await page.getByText('Validate Face ID and fingerprint',{exact:true}).click();
      await page.waitForFunction(()=>document.querySelector('vaadin-number-field')?.value==='2');
      const effort = page.getByRole('spinbutton',{name:'Jira estimate (MD)',exact:true});
      assert.equal(await effort.isEditable(),false);
      assert.equal(Number(await effort.inputValue()),2);
      await page.getByRole('button',{name:'Save plan',exact:true}).click();
      await page.getByText('Plan saved for TEST-2111.',{exact:true}).waitFor();
      assert.equal(await page.getByRole('combobox',{name:'Show',exact:true}).inputValue(),'Subtask');
      assert.equal(await page.getByRole('textbox',{name:'Jira ID',exact:true}).inputValue(),'TEST-2111');
      await page.getByRole('textbox',{name:'Jira ID',exact:true}).fill('TEST-2101');
      await page.getByRole('combobox',{name:'Show',exact:true}).click();
      await page.getByRole('option',{name:'Task',exact:true}).click();
      await page.getByText('Biometric authentication',{exact:true}).click();
      await page.waitForFunction(()=>document.querySelector('vaadin-number-field')?.readonly===true
        && document.querySelector('.selection-instruction')?.textContent.includes('TEST-2101'));
      assert.equal(await effort.isEditable(),false);
      assert.equal(Number(await effort.inputValue()),5);
      await page.getByRole('textbox',{name:'Jira ID',exact:true}).fill('TEST-2000');
      await page.getByRole('combobox',{name:'Show',exact:true}).click();
      await page.getByRole('option',{name:'Epic',exact:true}).click();
      await page.getByText('Mobile experience',{exact:true}).click();
      await page.waitForFunction(()=>document.querySelector('vaadin-number-field')?.value==='12.5');
      assert.equal(await effort.isEditable(),false);
      assert.equal(Number(await effort.inputValue()),12.5);
    }
    await page.goto(base); await ready(page);
    const cells = await page.locator('.usage-person-week').evaluateAll(elements => elements.map(el=>({
      text:el.innerText,title:el.title,background:getComputedStyle(el).backgroundColor
    })));
    let mismatches = 0;
    for (const cell of cells) {
      const match = cell.title.match(/([\d.]+) assigned h of ([\d.]+) available h/);
      if (!match || Number(match[2])===0) continue;
      const hours = Number(match[1]),capacity=Number(match[2]);
      const expected = hours>capacity*4/3+.05 ? 'rgb(252, 235, 234)' : hours>capacity+.05 ? 'rgb(255, 244, 214)' : 'rgb(232, 245, 233)';
      if (cell.background!==expected) mismatches++;
    }
    console.log('Traffic-light mismatches against requested 6h/8h rule:',mismatches);
    if (baseline) assert.ok(mismatches>0); else assert.equal(mismatches,0);
    await page.screenshot({path:path.join(output,'workload.png')});
    if (!baseline) {
      assert.ok((await page.locator('body').innerText()).includes('Critical · over 8 h/day avg.'));
      assert.ok(!(await page.locator('body').innerText()).includes('Near capacity · 80-100%'));
      assert.ok(cells.some(c=>c.background==='rgb(255, 244, 214)'));
      assert.ok(cells.some(c=>c.background==='rgb(252, 235, 234)'));
      const plots = await page.locator('.histogram-bar-plot').evaluateAll(elements=>elements.map(el=>({
        level:el.getAttribute('data-load-level'),
        colors:[...el.querySelectorAll('.histogram-bar-segment')].map(segment=>getComputedStyle(segment).backgroundColor)
      })));
      assert.ok(plots.some(plot=>plot.level==='YELLOW'&&plot.colors.includes('rgb(212, 155, 24)')));
      assert.ok(plots.some(plot=>plot.level==='RED'&&plot.colors.includes('rgb(179, 38, 30)')));
      assert.ok(plots.filter(plot=>plot.level==='YELLOW').every(plot=>!plot.colors.includes('rgb(179, 38, 30)')));
      await page.locator('[data-section-target="roadmap-histogram"]').click();
      await page.waitForFunction(()=>{
        const section=document.querySelector('#roadmap-histogram').getBoundingClientRect();
        const nav=document.querySelector('.roadmap-section-navigation').getBoundingClientRect();
        return section.top>=nav.bottom&&section.top<nav.bottom+160;
      });
      await page.screenshot({path:path.join(output,'histogram.png')});
      const stateBefore = await (await fetch(base+'/test/state')).json();
      const saveSubtask = async () => {
        await page.goto(base+'/gantt/planning'); await ready(page);
        await page.getByRole('textbox',{name:'Jira ID',exact:true}).fill('TEST-SUB-A');
        await page.getByText('Jira Original Estimate: 3 MD',{exact:true}).click();
        await page.waitForFunction(()=>document.querySelector('vaadin-number-field')?.value==='3');
        assert.equal(await page.getByRole('spinbutton',{name:'Jira estimate (MD)',exact:true}).isEditable(),false);
        await page.getByRole('button',{name:'Save plan',exact:true}).click();
        await page.getByText('Plan saved for TEST-SUB-A.',{exact:true}).waitFor();
      };
      const checkEffort = async a => {
        await page.goto(base); await ready(page);
        const rows = await page.locator('.usage-task-name').allTextContents();
        assert.equal(rows.some(row=>row.includes('TEST-SUB-A')), a !== null, 'A has workload from Jira Original Estimate');
        if (a !== null) assert.ok(rows.some(row=>row.includes('TEST-SUB-A')&&row.includes('('+a+' MD)')), 'A workload '+a);
        await page.getByRole('tab', {name: /^Missing estimates/}).click();
        await ready(page);
        for (const key of ['TEST-SUB-B','TEST-SUB-C']) {
          assert.equal(rows.some(row=>row.includes(key)), false, key+' has no Jira Original Estimate');
          assert.ok((await page.locator('#roadmap-unplanned').innerText()).includes(key));
        }
        assert.equal(rows.some(row=>row.includes('TEST-PARENT')),false);
        assert.equal((await page.locator('body').innerText()).includes('TEST-PARENT'), false);
        assert.equal(await page.locator('[title*="Inherited parent"]').count(), 0);
        const bars = await page.locator('[title^="Task Key: "]').evaluateAll(es => es.map(e => e.title));
        assert.ok(bars.some(text => text.includes('TEST-GREEN\n') && text.includes('3.75 MD (30 h)')), 'Standalone task keeps its own estimate');
        assert.equal(bars.some(text => text.includes('TEST-SUB-A\n')), a !== null);
        if (a !== null) assert.ok(bars.some(text => text.includes('TEST-SUB-A\n') && text.includes('Original effort: ' + a + ' MD')));
        if (a === null) assert.ok((await page.locator('#roadmap-unplanned').innerText()).includes('TEST-SUB-A'));
      };
      await checkEffort('3');
      await saveSubtask();
      await checkEffort('3');
      assert.deepEqual(await (await fetch(base+'/test/state')).json(),stateBefore);
      await page.goto(base + '/gantt/planning'); await ready(page);
      await page.getByRole('textbox', {name:'Jira ID',exact:true}).fill('TEST-PARENT');
      await page.waitForFunction(() => !document.querySelector('.planning-grid')?.textContent.includes('TEST-SUB-A'));
      assert.equal(await page.getByRole('link', {name:/^Open TEST-PARENT in Jira:/}).count(), 0);
      console.log('PASS: parents excluded, Jira estimates displayed read-only, saving dates preserves effort.');
      await page.goto(base+'/information'); await ready(page);
      const text = await page.locator('main, .information-page').last().innerText();
      assert.ok(text.includes('Subtasks'));
      assert.ok(text.includes('40 h'));
      assert.doesNotMatch(text,/max\(|ceil\(|Man Days field/);
      for(const width of [1440,1100,390]) {
        await page.setViewportSize({width,height:1000});
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
        await page.screenshot({path:path.join(output,'information-'+width+'.png'),fullPage:true});
        await page.screenshot({path:path.join(output,'information-top-'+width+'.png')});
      }
      await page.setViewportSize({width:1440,height:1000});
      await page.locator('#information-workload').screenshot({path:path.join(output,'information-workload.png')});
      await page.locator('#information-subtasks').screenshot({path:path.join(output,'information-subtasks.png')});
    }
    assert.deepEqual(errors,[]);
  } catch(error) {
    await page.screenshot({path:path.join(output,'failure.png')});
    throw error;
  } finally {await browser.close();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
