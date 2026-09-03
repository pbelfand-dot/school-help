/* Study Catalog — a class-first browser over the library, the practice
   generators and whatever gets added. Nothing appears that is not filed
   to one of the five classes in CLASSES. */
(function(){
"use strict";

const $  = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const KEY = "studyCatalog.v2";

let state = { items:[], own:[] };
let activeClass = null;          /* class id, or null on the picker */
let sub = "topics";              /* topics | practice | mine */
let currentTest = null;

/* ---------- classes ---------- */
const classById = id => CLASSES.find(c => c.id === id);
const CLASS_ALIAS = {
  calc:"calc", calculus:"calc", ab:"calc", math:"calc",
  psych:"psych", psychology:"psych", ap_psych:"psych",
  lit:"lit", english:"lit", eng:"lit", aplit:"lit",
  micro:"micro", microeconomics:"micro",
  macro:"macro", macroeconomics:"macro", econ:"micro"
};

/* ---------- storage ---------- */
function load(){
  try{
    const raw = localStorage.getItem(KEY) || localStorage.getItem("studySorter.v1");
    if(!raw) return;
    const p = JSON.parse(raw);
    state.items = (p.items||[]).map(migrateItem).filter(i => i.cls);
    state.own   = (p.own||[]).map(o => Object.assign({}, o, {cls: o.cls || [o.clsId || "calc"].flat()}));
  }catch(e){ console.warn("Could not load the catalog:", e); }
}
/* v1 stored a subject; the catalog stores a class. */
function migrateItem(i){
  if(i.cls) return i;
  const map = {math:"calc", psychology:"psych", english:"lit", economics:"micro"};
  return Object.assign({}, i, {cls: map[i.subject] || detectClass(i.text)});
}
function save(){
  try{ localStorage.setItem(KEY, JSON.stringify(state)); }
  catch(e){ console.warn("Could not save:", e); }
}

/* ---------- library access, always class-scoped ---------- */
function allEntries(){ return LIB.concat(state.own); }
function entriesFor(cls){ return allEntries().filter(e => (e.cls||[]).includes(cls)); }
function generatorsFor(cls){ return Object.entries(GENERATORS).filter(([,g]) => g.cls === cls); }
function itemsFor(cls){ return state.items.filter(i => i.cls === cls); }

function scoreEntry(en, t){
  let s = 0;
  if(t.includes(en.t.toLowerCase())) s += en.t.length * 3;
  (en.k||[]).forEach(k => { if(t.includes(k.toLowerCase())) s += k.length * 2; });
  en.t.toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 3)
    .forEach(w => { if(t.includes(w)) s += w.length; });
  return s;
}
function findEntry(text, cls){
  const t = text.toLowerCase();
  const pool = cls ? entriesFor(cls) : allEntries();
  let best = null, bestScore = 0;
  pool.forEach(en => { const s = scoreEntry(en, t); if(s > bestScore){ bestScore = s; best = en; } });
  return bestScore >= 8 ? best : null;
}
/* Route a line to a class by scoring each class's own topic keywords. */
function detectClass(text){
  const t = text.toLowerCase();
  const tag = t.match(/#([a-z_]+)/);
  if(tag && CLASS_ALIAS[tag[1]]) return CLASS_ALIAS[tag[1]];
  let best = null, bestScore = 0;
  CLASSES.forEach(c => {
    let s = 0;
    entriesFor(c.id).forEach(en => { s += scoreEntry(en, t); });
    if(s > bestScore){ bestScore = s; best = c.id; }
  });
  return bestScore >= 8 ? best : null;
}

function detectType(text){
  const t = text.trim();
  if(/\?$/.test(t) || /^(what|who|when|where|why|how|define|explain|describe|list|name|compare|evaluate|solve|find|simplify|factor|determine)\b/i.test(t)) return "question";
  if(/[=+\-×÷^√]|lim\(|\d\s*\/\s*\d/.test(t) && /\d/.test(t)) return "formula";
  if(/\b(is|are|means|refers to|defined as)\b/i.test(t)) return "definition";
  return "note";
}

function addLines(raw, forceClass){
  const lines = raw.split("\n").map(l => l.trim()).filter(Boolean);
  let added = 0, dupes = 0, unfiled = 0, matched = 0;
  const per = {};
  lines.forEach(line => {
    let priority = false;
    if(line.startsWith("!")){ priority = true; line = line.slice(1).trim(); }
    const clean = line.replace(/#[a-z_]+/gi, "").trim();
    if(!clean) return;
    if(state.items.some(i => i.text.toLowerCase() === clean.toLowerCase())){ dupes++; return; }
    const cls = forceClass || detectClass(line);
    if(!cls){ unfiled++; return; }
    const entry = findEntry(line, cls);
    if(entry) matched++;
    per[cls] = (per[cls]||0) + 1;
    state.items.push({
      id: Date.now() + "-" + Math.random().toString(36).slice(2,7),
      text: clean, cls, type: detectType(clean), priority,
      topic: entry ? entry.t : null, done:false, added: Date.now()
    });
    added++;
  });
  save();
  return {added, dupes, unfiled, matched, per};
}

/* ---------- rendering: the picker ---------- */
function renderPicker(){
  $("#classDetail").hidden = true;
  const el = $("#classPicker");
  el.hidden = false;
  el.innerHTML =
    `<p class="lede">Pick a class. Everything inside is filed to it — the topics,
     the practice problems, and whatever you've added.</p>` +
    `<div class="classgrid">` + CLASSES.map(c => {
      const topics = entriesFor(c.id).length;
      const gens   = generatorsFor(c.id);
      const probs  = gens.reduce((n,[k]) => n + (typeof HANDOUTS !== "undefined" && HANDOUTS[k] ? HANDOUTS[k].items.length : 0), 0);
      const mine   = itemsFor(c.id).length;
      const todo   = itemsFor(c.id).filter(i => !i.done).length;
      return `<button class="classcard" data-cls="${c.id}">
        <span class="cglyph" aria-hidden="true">${esc(c.glyph)}</span>
        <span class="cbody">
          <span class="cname">${esc(c.name)}</span>
          <span class="cmeta">${esc(c.meta)}</span>
          <span class="cunit">${esc(c.unit)}</span>
          <span class="cstats">
            <span><b>${topics}</b> topics</span>
            <span><b>${gens.length}</b> practice sets</span>
            ${probs ? `<span><b>${probs}</b> real problems</span>` : ""}
            ${mine ? `<span class="${todo?"hot":""}"><b>${mine}</b> of yours${todo?` · ${todo} open`:""}</span>` : ""}
          </span>
        </span>
      </button>`;
    }).join("") + `</div>`;
}

/* ---------- rendering: one class ---------- */
function renderClass(){
  const c = classById(activeClass);
  if(!c){ activeClass = null; renderPicker(); return; }
  $("#classPicker").hidden = true;
  const el = $("#classDetail");
  el.hidden = false;
  el.innerHTML =
    `<button id="btnBack" class="crumb">← All classes</button>
     <div class="classhead">
       <span class="cglyph big" aria-hidden="true">${esc(c.glyph)}</span>
       <div>
         <h2>${esc(c.name)}</h2>
         <p class="meta">${esc(c.meta)} · ${esc(c.unit)}</p>
       </div>
     </div>
     <nav class="subtabs">
       <button data-sub="topics"   class="${sub==="topics"?"active":""}">Topics <span class="count">${entriesFor(c.id).length}</span></button>
       <button data-sub="practice" class="${sub==="practice"?"active":""}">Practice <span class="count">${generatorsFor(c.id).length}</span></button>
       <button data-sub="mine"     class="${sub==="mine"?"active":""}">My items <span class="count">${itemsFor(c.id).length}</span></button>
     </nav>
     <div id="subPane"></div>`;
  renderSub();
}

function renderSub(){
  if(sub === "topics") renderTopics();
  else if(sub === "practice") renderPractice();
  else renderMine();
}

function renderTopics(){
  const list = entriesFor(activeClass).slice().sort((a,b) => a.t.localeCompare(b.t));
  $("#subPane").innerHTML =
    `<div class="card">
       <input id="topicSearch" type="search" placeholder="Search this class…" autocomplete="off">
       <div id="topicList" class="topiclist"></div>
     </div>
     <div id="topicOut"></div>`;
  drawTopicList(list);
  $("#topicSearch").addEventListener("input", e => {
    const q = e.target.value.toLowerCase().trim();
    drawTopicList(!q ? list : list.filter(en =>
      en.t.toLowerCase().includes(q) ||
      (en.k||[]).some(k => k.includes(q)) ||
      (en.d||"").toLowerCase().includes(q)));
  });
}
function drawTopicList(list){
  $("#topicList").innerHTML = list.length
    ? list.map(en => `<button data-t="${esc(en.t)}">${esc(en.t)}${en.own?' <span class="mine">yours</span>':""}</button>`).join("")
    : `<p class="empty">Nothing matches.</p>`;
}

function renderPractice(){
  const gens = generatorsFor(activeClass);
  const hasHandouts = gens.some(([k]) => typeof HANDOUTS !== "undefined" && HANDOUTS[k]);
  $("#subPane").innerHTML =
    `<div class="card">
       <h3>Build a test</h3>
       <p class="hint">Freshly randomized every time${hasHandouts ? ", and the handout sets serve the real problems with worked solutions" : ""}.</p>
       <div class="picker">` +
        gens.map(([k,g]) => `<label data-k="${k}"><input type="checkbox" value="${k}" checked> <span>${esc(g.label)}</span></label>`).join("") +
       `</div>
       <div class="row">
         <button class="ghost" data-pick="all">Select all</button>
         <button class="ghost" data-pick="none">Clear</button>
         ${hasHandouts ? `<button class="ghost" data-pick="handouts">Only my handouts</button>` : ""}
       </div>
       <div class="row">
         <label class="lbl">Questions <select id="genCount">
           <option>5</option><option selected>10</option><option>15</option><option>20</option><option>25</option>
         </select></label>
         <button id="btnMakeTest" class="primary">Make the test</button>
       </div>
     </div>
     <div id="testArea"></div>`;
  $$("#subPane .picker label").forEach(l => l.classList.add("on"));
  if(currentTest && currentTest.cls === activeClass) renderTest();
}

function renderMine(){
  const items = itemsFor(activeClass);
  if(!items.length){
    $("#subPane").innerHTML = `<div class="card empty">Nothing added to this class yet.
      Use the <b>Add</b> tab and paste in questions or topics.</div>`;
    return;
  }
  items.sort((a,b) => (b.priority - a.priority) || (a.done - b.done) || (b.added - a.added));
  $("#subPane").innerHTML = `<div id="mineList">` + items.map(itemHTML).join("") + `</div>`;
}
function itemHTML(i){
  const cls = "item" + (i.priority?" pri":"") + (i.topic?" has":"") + (i.done?" done":"");
  return `<div class="${cls}" data-id="${i.id}">
    <div class="txt">${esc(i.text)}</div>
    <div class="meta">
      <span class="chip">${esc(i.type)}</span>
      ${i.priority?`<span class="chip r">priority</span>`:""}
      ${i.topic?`<span class="chip g">${esc(i.topic)}</span>`:`<span class="chip a">no explanation yet</span>`}
      <span class="acts">
        ${i.topic?`<button data-act="show">Explain</button>`:""}
        <button data-act="done">${i.done?"Undo":"Done"}</button>
        <button data-act="del">×</button>
      </span>
    </div>
    <div class="expSlot"></div>
  </div>`;
}

function explainHTML(en){
  let h = `<div class="card"><h2>${esc(en.t)}</h2><div class="exp">`;
  h += `<h4>In plain English</h4><p>${esc(en.d).replace(/\n/g,"<br>")}</p>`;
  if(en.f) h += `<h4>Key formula / facts</h4><span class="fx">${esc(en.f).replace(/\n/g,"<br>")}</span>`;
  if(en.steps && en.steps.length) h += `<h4>How to do it</h4><ol class="steps">${en.steps.map(s=>`<li>${esc(s)}</li>`).join("")}</ol>`;
  if(en.e) h += `<h4>Example</h4><span class="fx">${esc(en.e).replace(/\n/g,"<br>")}</span>`;
  if(en.m && en.m.length) h += `<h4>Where people lose points</h4><ul>${en.m.map(m=>`<li>${esc(m)}</li>`).join("")}</ul>`;
  return h + `</div></div>`;
}

/* ---------- tests ---------- */
function makeTest(){
  const keys = $$("#subPane .picker input:checked").map(cb => cb.value);
  if(!keys.length){ $("#testArea").innerHTML = `<div class="card result warn">Pick at least one set first.</div>`; return; }
  const n = parseInt($("#genCount").value, 10);
  const qs = [];
  for(let i=0;i<n;i++){
    const k = keys[i % keys.length];
    let p, tries = 0;
    do { p = GENERATORS[k].make(); tries++; } while(tries < 15 && qs.some(x => x.q === p.q));
    p.gen = k;
    if(!p.label) p.label = GENERATORS[k].label;
    qs.push(p);
  }
  for(let i=qs.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); [qs[i],qs[j]] = [qs[j],qs[i]]; }
  currentTest = { cls: activeClass, qs, submitted:false };
  renderTest();
}

function renderTest(){
  const t = currentTest;
  if(!t){ $("#testArea").innerHTML = ""; return; }
  let h = "";
  if(t.submitted){
    const right = t.qs.filter(p => p.correct).length;
    const pct = Math.round(right / t.qs.length * 100);
    h += `<div class="card scorebox"><div class="big">${right} / ${t.qs.length}</div>
      <div class="pct">${pct}%${pct===100?" — perfect":pct>=80?" — solid":pct>=60?" — nearly there":" — worth another pass"}</div>
      <button id="btnNewSame" class="primary">Try a fresh test</button></div>`;
  }
  h += `<div class="card"><div class="row">
      <b>${t.qs.length} question${t.qs.length>1?"s":""}</b>
      <span class="acts" style="margin-left:auto">
        <button id="btnNewSame2" class="ghost">New test</button>
        <button id="btnPrintTest" class="ghost">Print</button>
      </span></div></div>`;
  h += t.qs.map((p,idx) => {
    const c = "q" + (t.submitted ? (p.correct ? " right" : " wrong") : "");
    let s = `<div class="${c}" data-i="${idx}">
      <div class="qhead"><span class="qnum">${idx+1}.</span>
      <span class="qtext">${esc(p.q)}</span>
      <span class="qtype">${esc(p.label||"")}</span></div>
      <div class="ansrow"><input type="text" class="ansin" placeholder="Your answer" value="${esc(p.typed||"")}" ${t.submitted?"disabled":""}></div>`;
    if(t.submitted){
      s += `<div class="verdict ${p.correct?"ok":"no"}">${p.correct?"✓ Correct":"✗ Not quite — answer: "+esc(p.ans)}</div>`;
      s += `<div class="work"><h5>How to get there</h5><ol class="steps">${p.steps.map(x=>`<li>${esc(x)}</li>`).join("")}</ol></div>`;
    }
    return s + `</div>`;
  }).join("");
  if(!t.submitted) h += `<div class="card"><button id="btnSubmitTest" class="primary">Submit and grade</button></div>`;
  $("#testArea").innerHTML = h;
}

function submitTest(){
  if(!currentTest) return;
  $$("#testArea .q").forEach(qEl => {
    const i = +qEl.dataset.i;
    const inp = qEl.querySelector(".ansin");
    currentTest.qs[i].typed = inp ? inp.value : "";
    currentTest.qs[i].correct = gradeAnswer(currentTest.qs[i], currentTest.qs[i].typed);
  });
  currentTest.submitted = true;
  renderTest();
  window.scrollTo({top:0, behavior:"smooth"});
}

/* ---------- exports ---------- */
let dlNamespace;
async function getDownloads(){
  if(dlNamespace !== undefined) return dlNamespace;
  dlNamespace = null;
  try{ if(window.claude && typeof window.claude.use === "function") dlNamespace = await window.claude.use("downloads"); }
  catch(e){ dlNamespace = null; }
  return dlNamespace;
}
async function download(name, text, mime){
  const ns = await getDownloads();
  if(ns){
    try{ await ns.save({filename:name, data:text}); return "saved"; }
    catch(err){
      if(err && err.code === "declined") return "declined";
      if(err && err.code === "rate_limited") return "busy";
    }
  }
  try{
    const b = new Blob([text], {type: mime || "text/plain;charset=utf-8"});
    const u = URL.createObjectURL(b);
    const a = document.createElement("a");
    a.href = u; a.download = name; document.body.appendChild(a); a.click();
    setTimeout(()=>{ document.body.removeChild(a); URL.revokeObjectURL(u); }, 0);
    return "saved";
  }catch(e){ return "failed"; }
}
function toMarkdown(){
  let md = "# Study catalog\n\n_Exported " + new Date().toLocaleDateString() + "_\n";
  CLASSES.forEach(c => {
    const items = itemsFor(c.id);
    const topics = entriesFor(c.id);
    md += `\n\n## ${c.name}\n${c.meta} · ${c.unit}\n`;
    if(items.length){
      md += `\n### My items\n\n`;
      items.forEach(i => { md += "- " + (i.priority?"**[!] ":"") + i.text + (i.priority?"**":"") + (i.topic?`  _(${i.topic})_`:"") + "\n"; });
    }
    md += `\n### Topics\n\n`;
    topics.forEach(en => {
      md += `**${en.t}** — ${en.d}\n`;
      if(en.f) md += `  - ${en.f.replace(/\n/g,"  ")}\n`;
      md += "\n";
    });
  });
  return md;
}

/* ---------- wiring ---------- */
function fillClassSelects(){
  const opts = CLASSES.map(c => `<option value="${c.id}">${esc(c.name)}</option>`).join("");
  $("#addClass").innerHTML = `<option value="">work it out from the text</option>` + opts;
  $("#ownClass").innerHTML = opts;
}

function msg(sel, text, warn){
  const el = $(sel); el.hidden = false;
  el.className = "result" + (warn ? " warn" : ""); el.textContent = text;
}

function init(){
  load();
  const firstRun = !state.items.length && !state.own.length;
  if(firstRun) addLines(SEED.join("\n"));
  fillClassSelects();
  renderPicker();

  $$(".tab").forEach(b => b.addEventListener("click", () => {
    $$(".tab").forEach(x => x.classList.remove("active"));
    $$(".view").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    $("#view-" + b.dataset.view).classList.add("active");
    if(b.dataset.view === "classes"){ activeClass ? renderClass() : renderPicker(); }
  }));

  /* one delegated listener for everything inside the Classes view */
  $("#view-classes").addEventListener("click", e => {
    const card = e.target.closest(".classcard");
    if(card){ activeClass = card.dataset.cls; sub = "topics"; currentTest = null; renderClass(); return; }
    if(e.target.closest("#btnBack")){ activeClass = null; currentTest = null; renderPicker(); return; }

    const st = e.target.closest(".subtabs button");
    if(st){ sub = st.dataset.sub; renderClass(); return; }

    const topic = e.target.closest("#topicList button");
    if(topic){
      const en = entriesFor(activeClass).find(x => x.t === topic.dataset.t);
      if(en){ $("#topicOut").innerHTML = explainHTML(en); $("#topicOut").scrollIntoView({behavior:"smooth", block:"start"}); }
      return;
    }

    const pick = e.target.closest("[data-pick]");
    if(pick){
      const mode = pick.dataset.pick;
      $$("#subPane .picker input").forEach(cb => {
        cb.checked = mode === "all" ? true : mode === "none" ? false
                   : (typeof HANDOUTS !== "undefined" && !!HANDOUTS[cb.value]);
        cb.closest("label").classList.toggle("on", cb.checked);
      });
      return;
    }
    if(e.target.closest("#btnMakeTest")){ makeTest(); return; }
    if(e.target.closest("#btnSubmitTest")){ submitTest(); return; }
    if(e.target.closest("#btnNewSame") || e.target.closest("#btnNewSame2")){ makeTest(); window.scrollTo({top:0,behavior:"smooth"}); return; }
    if(e.target.closest("#btnPrintTest")){ window.print(); return; }

    const act = e.target.closest("#mineList button[data-act]");
    if(act){
      const wrap = act.closest(".item");
      const item = state.items.find(i => i.id === wrap.dataset.id);
      if(!item) return;
      if(act.dataset.act === "del"){ state.items = state.items.filter(i => i.id !== item.id); save(); renderClass(); }
      else if(act.dataset.act === "done"){ item.done = !item.done; save(); renderMine(); }
      else if(act.dataset.act === "show"){
        const slot = wrap.querySelector(".expSlot");
        if(slot.innerHTML){ slot.innerHTML = ""; act.textContent = "Explain"; }
        else{
          const en = allEntries().find(x => x.t === item.topic);
          slot.innerHTML = en ? explainHTML(en) : "";
          act.textContent = "Hide";
        }
      }
    }
  });
  $("#view-classes").addEventListener("change", e => {
    const lab = e.target.closest(".picker label");
    if(lab) lab.classList.toggle("on", e.target.checked);
  });
  $("#view-classes").addEventListener("keydown", e => {
    if(e.key === "Enter" && e.target.classList.contains("ansin")){ e.preventDefault(); submitTest(); }
  });

  /* add */
  $("#btnSort").addEventListener("click", () => {
    const raw = $("#bulk").value;
    if(!raw.trim()) return;
    const r = addLines(raw, $("#addClass").value || null);
    const where = Object.entries(r.per)
      .map(([c,n]) => `${n} to ${classById(c).name}`).join(", ");
    msg("#addResult",
      r.added
        ? `Added ${r.added} item${r.added>1?"s":""} — ${where}. ${r.matched} matched an explanation.` +
          (r.unfiled ? ` ${r.unfiled} couldn't be filed — pick a class above and try those again.` : "") +
          (r.dupes ? ` ${r.dupes} already in the catalog.` : "")
        : `Nothing added.` + (r.unfiled ? ` ${r.unfiled} line${r.unfiled>1?"s":""} didn't match any class — pick one above.` : "")
             + (r.dupes ? ` ${r.dupes} already in the catalog.` : ""),
      !r.added);
    if(r.added){ $("#bulk").value = ""; renderPicker(); }
  });
  $("#btnClearBox").addEventListener("click", () => { $("#bulk").value = ""; $("#addResult").hidden = true; });

  /* data */
  $("#btnExportJson").addEventListener("click", async () => {
    msg("#dataMsg", "Saving backup…");
    const r = await download("study-catalog-backup.json", JSON.stringify(state,null,2), "application/json");
    msg("#dataMsg",
      r==="saved" ? "Backup saved. Keep it somewhere you'll find it again."
      : r==="declined" ? "Save cancelled — nothing was written."
      : r==="busy" ? "Another save is already open. Finish that one, then try again."
      : "Couldn't save here. Use Print / Save as PDF instead.", r!=="saved");
  });
  $("#btnExportMd").addEventListener("click", async () => {
    msg("#dataMsg", "Saving study sheet…");
    const r = await download("study-sheet.md", toMarkdown(), "text/markdown");
    msg("#dataMsg", r==="saved" ? "Study sheet saved." : "Couldn't save here. Use Print / Save as PDF instead.", r!=="saved");
  });
  $("#btnPrint").addEventListener("click", () => window.print());
  $("#importFile").addEventListener("change", e => {
    const f = e.target.files[0]; if(!f) return;
    const rd = new FileReader();
    rd.onload = () => {
      try{
        const p = JSON.parse(rd.result);
        if(!p || !Array.isArray(p.items)) throw new Error("not a catalog backup");
        state.items = p.items.map(migrateItem).filter(i => i.cls);
        state.own = p.own || [];
        save(); activeClass = null; renderPicker();
        msg("#dataMsg", `Imported ${state.items.length} items and ${state.own.length} of your own explanations.`);
      }catch(err){ msg("#dataMsg", "That file didn't look like a catalog backup.", true); }
    };
    rd.readAsText(f); e.target.value = "";
  });
  $("#btnSaveOwn").addEventListener("click", () => {
    const t = $("#ownTitle").value.trim(), b = $("#ownBody").value.trim();
    if(!t || !b){ msg("#ownMsg", "Give it a title and some text first.", true); return; }
    const cls = $("#ownClass").value;
    state.own = state.own.filter(o => o.t.toLowerCase() !== t.toLowerCase());
    state.own.push({ t, s:"general", cls:[cls], k:[t.toLowerCase()], d:b, m:[], own:true });
    state.items.forEach(i => { if(!i.topic){ const en = findEntry(i.text, i.cls); if(en) i.topic = en.t; } });
    save(); renderPicker();
    $("#ownTitle").value = ""; $("#ownBody").value = "";
    msg("#ownMsg", `Saved “${t}” to ${classById(cls).name}.`);
  });
}

const SEED = [
  "!The four techniques for evaluating limits",
  "Types of discontinuities",
  "Limits of rational functions - hole or asymptote",
  "!Continuity - the three part test",
  "Limits at infinity and horizontal asymptotes",
  "Infinite limits and vertical asymptotes",
  "!Experimental design - independent and dependent variable",
  "Random sampling vs random assignment",
  "Correlation does not equal causation",
  "Frequency distributions, the normal curve and skew",
  "Statistical significance, effect size and replication",
  "!The Story of an Hour by Kate Chopin",
  "Critical lenses for reading literature",
  "AP English Lit course reference - grading and reading list",
  "Elasticity of demand",
  "Supply and demand",
  "GDP inflation and unemployment"
];

document.addEventListener("DOMContentLoaded", init);
})();
