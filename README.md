# Study Catalog

A class-first catalog for the 2026–27 school year. You pick a class, and
everything inside is scoped to it — the topics, the practice sets, the real
handout problems, and whatever you've added yourself.

**No install, no account, no internet after the first load.** Open
`index.html` in any browser, including on a phone.

## The five classes

Only the real academic classes on the schedule. PE, Wind Ensemble and the
counselor homeroom are not classes with coursework, so they aren't here.

| Class | | Topics | Practice sets |
|---|---|---|---|
| AP Calculus AB | Mr. Haruthunian · Unit 1 Limits and Continuity | 25 | 28 (incl. 105 real handout problems) |
| AP Psychology | Period 6 · Unit 0 Research Methods and Statistics | 18 | 4 |
| AP English Literature | Mr. Elias · Period 3 | 9 | 1 |
| AP Microeconomics | Period 1 | 4 | 1 |
| AP Macroeconomics | Period 2 | 2 | 1 |

## Inside a class

**Topics** — searchable list of that class's explanations. Each gives a plain
English explanation, the key formulas or facts, a step-by-step method where one
applies, a worked example, and the specific mistakes that lose points.

**Practice** — pick which sets to draw from and build a randomized test. The
Calculus handout sets serve the actual problems from the seven Unit 1 handouts,
each with a full worked solution and its original handout number. Answers are
graded loosely, so `sqrt3`, `√3` and `sqrt(3)` all count, as do `dne` and
`does not exist`.

**My items** — whatever you added to that class, with its matched explanation,
a done toggle and priority flags.

## Adding things

The **Add** tab takes pasted lines, one per item, and files each into a class by
matching it against that class's own topic keywords. You can force a class from
the dropdown, and `!` at the start of a line marks it priority. Anything it
can't file is reported rather than silently dropped.

## Your work lives in the browser

Everything persists in `localStorage`, which survives closing the tab but not
clearing your browser data. **Export a backup** from Save / Load before
anything important.

## Files

| File | What's in it |
|---|---|
| `index.html` | Page structure |
| `style.css` | All styling, including print rules |
| `library.js` | `CLASSES`, plus 57 topic entries each tagged to its class |
| `practice.js` | 35 generators and the 105 handout problems, each tagged to its class |
| `app.js` | Navigation, filing, test flow, storage, import/export |
| `study-catalog.standalone.html` | Single-file build (generated — edit the sources above) |

## Hosting it

Static, so GitHub Pages works for free: Settings → Pages → deploy from `main`,
root folder.
