# Performance measurements

Measured locally on 2026-09-23 using the isolated test fixture, Chrome headless,
a 1440 x 1000 viewport, and production Vaadin assets. Jira responses were
synthetic, with a fixed 500 ms delay per request. PostgreSQL ran locally.
These measurements do not represent production Jira response times or a load test.

Each scenario ran four times in the same browser. The first run was discarded;
the table shows the median of the remaining three runs. Timing includes the
browser action and the wait until Vaadin finishes processing requests.

| Browser action | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| Open Roadmap | 5275 ms | 1456 ms | 72.4% |
| Refresh Roadmap | 4550 ms | 1159 ms | 74.5% |
| Open task planning | 1479 ms | 1004 ms | 32.1% |
| Save a plan | 1397 ms | 312 ms | 77.7% |
| Refresh task planning | 1117 ms | 624 ms | 44.1% |

Changes behind the measurements:

- Independent Jira datasets load concurrently through a shared executor with
  four workers and at most 64 queued operations. Existing pagination, request
  timeouts, and final-status filters remain in effect. A failed dataset fails
  the load instead of being treated as an empty response. No Jira cache is added.
- Closed person details are created on first expansion and reused until the
  next Roadmap refresh. Initial browser element count fell from 3537 to 2612.
  Expanding details uses the loaded report and makes no Jira requests.
- Saving dates or a stack updates the local planning row and preserves the
  selection and filters. Jira requests per save fell from two to zero.
  Refresh and navigation still retrieve current Jira data and local schedules.

## Reproduce

Set `JAVA_HOME` to a JDK 21 or newer. From the repository root:

```powershell
.\mvnw.cmd -Pproduction package dependency:build-classpath "-Dmdep.includeScope=test" "-Dmdep.outputFile=target/test-classpath.txt"
npm.cmd --prefix .tools ci
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .tools/run-test-fixture.ps1
```

With Chrome installed, run in another terminal:

```powershell
node .tools/performance-check.cjs .tools/evidence/performance/results.json
node .tools/e2e.cjs
```

The benchmark runs only against `127.0.0.1:18083`, sets the synthetic delay,
records request counts and browser element counts, and resets the delay when
finished. Run it without other browser tests against that fixture. JSON results
and screenshots are stored under the ignored `.tools/evidence` directory.
The fixture and its delay/fault endpoints exist only in test sources.

Validation: 81 Maven tests passed. Browser tests covered local saves, weekends,
absences, failed Jira refreshes, retry recovery, lazy details for every person,
reopening without duplicate content, and absence of JavaScript errors.

## Planning follow-up: 2026-09-24

This comparison starts from the optimizations above. It uses the same browser
and isolated fixture, with zero simulated Jira delay to focus on interaction
overhead. Each scenario ran five times; medians discard the first warmup run.
The save scenarios submit the existing valid dates for an epic in the full
table and a task in the filtered table. Functional tests separately change dates
and stacks and verify persistence, selection, and validation failures.

| Action | Before | After |
| --- | ---: | ---: |
| Open planning | 422 ms | 393 ms |
| Save with the full table | 247 ms | 129.5 ms |
| Type `TEST-TEST`, 50 ms between keys | 676.5 ms | 697.5 ms |
| Save with a single filtered row | 147 ms | 147 ms |

Vaadin response body sizes (uncompressed): opening the table decreased from
209,227 to 65,736 bytes; saving with the full table decreased from 228,272 to
2,116 bytes; saving the filtered row decreased from approximately 11,238 to
2,088 bytes. Typing the filter decreased from a median 18 requests and about
1.2 MB to two requests and 3,098 bytes. The 150 ms typing debounce reduces
traffic; it is not a promise of lower latency on every local interaction.

- Removed the local final-status guard from saving. Saving makes no Jira calls.
  Loading or refreshing still excludes finalized issues.
- Replaced per-cell server components with property-bound Lit templates,
  following the [Vaadin renderer guidance](https://vaadin.com/docs/latest/components/grid/renderers).
  Dynamic text and attributes use template properties rather than raw HTML.
- A saved schedule refreshes only its existing row, preserving its identity,
  selection, filters, and table position. It does not replace the data provider.
- Availability validation reads absences for the selected person instead of
  downloading every person's absences. Dates and absences are still validated.

Run `node .tools/planning-performance-check.cjs` against the fixture to collect
timings, request counts, response sizes, and a screenshot under
`.tools/evidence/planning-performance`. The updated browser regression script
also checks vacation-only windows and recovery from availability lookup failures.
