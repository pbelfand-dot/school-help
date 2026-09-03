# Study Sorter

A one-page study site for the end of the school year. Paste in your notes and
questions, it sorts them by subject, explains the topics it knows, and builds
you a randomized practice test.

**No install, no account, no internet after the first load.** Open `index.html`
in any browser — including on your phone.

## What it does

**Add** — dump notes and questions in, one per line. It tags each one with a
subject, a type (question / formula / definition / date / note), and whether it
has a stored explanation. `#bio` forces a subject, a leading `!` marks priority.

**Sorted** — search, filter, and group everything. Hit *Explain* on any item to
open the full write-up inline. Mark things done as you study.

**Explain** — look up any of the 55 built-in topics. Each one gives you a plain
English explanation, the key formula, a step-by-step method where it applies, a
worked example, and the specific mistakes that lose points.

**Test Maker** — two modes:
- *New problems* — 21 generators produce fresh randomized questions with full
  worked solutions. Run the same topics forever without repeating numbers.
- *From my saved questions* — turns the questions you pasted in into a
  self-graded test against the stored explanations.

**Save / Load** — export a JSON backup, export a markdown study sheet, print to
PDF, or write your own explanations into the library.

## Coverage

55 topics across Math (incl. Calculus AB limits), Biology, Chemistry, Physics,
History, English, Computer Science, Economics, and Geography.

21 problem generators: trig limits (including the substitution trap), one-sided
and piecewise limits, discontinuity types, limit properties, limits by
factoring, rationalizing denominators, simplifying radicals, complex fractions,
difference of squares, factoring trinomials, the quadratic formula, slope,
Pythagorean theorem, exponent rules, systems of equations, mean/median,
probability, moles, Newton's second law, and Punnett squares.

Answer grading accepts loose formatting — `sqrt3`, `√3`, and `sqrt(3)` all
count, as do `dne` / `does not exist` and `(3,-2)` / `x=3, y=-2`.

## Two ways to run it

- **Hosted link** — a single-file build published as a private Artifact. Open it
  on your phone, nothing to install. Its source is `study-sorter.standalone.html`
  (everything inlined, plus the `downloads` capability so exports work inside the
  viewer).
- **Local / GitHub Pages** — the split files below. `download()` falls back to a
  normal anchor download when the artifact capability isn't there.

## Files

| File | What's in it |
|---|---|
| `index.html` | Page structure |
| `style.css` | All styling, including print rules |
| `library.js` | The 54-topic explanation library + subject keyword routing |
| `practice.js` | The 21 problem generators + answer grading |
| `app.js` | Sorting, rendering, test flow, storage, import/export |
| `study-sorter.standalone.html` | Single-file build (generated — edit the sources above, not this) |

## Your work is saved in the browser

Everything persists in `localStorage`. That means it survives closing the tab,
but clearing your browser data wipes it. **Export a backup before finals week.**

## Hosting it

It's static, so GitHub Pages works for free: repo Settings → Pages → deploy
from the `main` branch, root folder.
