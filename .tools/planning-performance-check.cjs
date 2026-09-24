const {chromium} = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const base = 'http://127.0.0.1:18083';
const output = process.argv[2] || '.tools/evidence/planning-performance/results.json';
(async () => {
  const browser = await chromium.launch({channel:'chrome', headless:true});
  const page = await browser.newPage({viewport:{width:1440,height:1000},locale:'en-US'});
  const errors=[];
  page.on('pageerror', e=>errors.push(e.message));
  const idle=()=>page.waitForFunction(()=>window.Vaadin?.Flow?.clients && Object.values(window.Vaadin.Flow.clients).every(c=>!c.isActive()));
  const rows=[];
  let bytes=0,requests=0;
  let responses=[];
  page.on('response',r=>{
    if(r.request().method()==='POST' && r.url().includes('v-r=uidl')) {
      requests++;
      responses.push(r.body().then(body=>{bytes+=body.length;}));
    }
  });
  const measure=async(name,action)=>{
    bytes=0;requests=0;responses=[];
    const before=(await(await fetch(base+'/test/performance')).json()).jiraCalls;
    const start=performance.now();
    await action();await idle();
    const ms=Math.round(performance.now()-start);
    await Promise.all(responses);
    const after=(await(await fetch(base+'/test/performance')).json()).jiraCalls;
    const row={name,ms,requests,responseBytes:bytes,jiraCalls:after-before};
    rows.push(row);console.log(JSON.stringify(row));
  };
  try {
    await fetch(base+'/test/performance/0',{method:'POST'});
    for(let run=0;run<5;run++) {
      await measure('open',async()=>{
        await page.goto(base+'/gantt/planning');
        await page.locator('.planning-grid-text').first().waitFor();
      });
      // The first epic is visible in the unfiltered table and already has dates.
      await page.locator('.planning-grid-text[title]:visible').filter({hasText:/^Mobile experience$/}).click();
      await page.getByRole('button',{name:'Save plan',exact:true}).waitFor();
      await idle();
      await measure('save-full-table',()=>page.getByRole('button',{name:'Save plan',exact:true}).click());
      await measure('type-filter',async()=>{
        await page.getByRole('textbox',{name:'Jira ID',exact:true}).pressSequentially('TEST-TEST',{delay:50});
        await page.waitForFunction(()=>document.querySelector('vaadin-grid').size===1);
      });
      await page.locator('.planning-grid-text[title]:visible').filter({hasText:/^Friday-to-Monday test$/}).click();
      await idle();
      await measure('save-filtered',()=>page.getByRole('button',{name:'Save plan',exact:true}).click());
    }
    assert.deepEqual(errors,[]);
    fs.mkdirSync(path.dirname(output),{recursive:true});
    fs.writeFileSync(output,JSON.stringify({jiraDelayMillis:0,warmupRuns:1,rows},null,2));
    await page.screenshot({path:path.join(path.dirname(output),'planning.png'),fullPage:true});
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
