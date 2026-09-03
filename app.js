/* Study Sorter — app logic */
(function(){
"use strict";

const $  = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const KEY = "studySorter.v1";

let state = { items:[], own:[] };


/* First run: open in a working state seeded with the current unit, rather than an empty shell.
   Anything the user adds or deletes replaces this immediately. */
const SEED = [
  "!Evaluate the limit of 5cos(x)tan(x)/(7x) as x approaches 0",
  "Express 3/sqrt(3) in simplest form with a rational denominator",
  "!Fully simplify (1 - x^2/25) / (x/5 + 1)",
  "Limits of piecewise functions - one sided",
  "Types of discontinuities",
  "Reading discontinuities off a graph",
  "Limits of rational functions - hole or asymptote",
  "Limit properties when one limit does not exist",
  "What is photosynthesis?",
  "Causes of World War 1 #history",
  "How do you write a thesis statement"
];

/* ---------- storage ---------- */
function load(){
  try{
    const raw = localStorage.getItem(KEY);
    if(raw){ const p = JSON.parse(raw); state.items = p.items||[]; state.own = p.own||[]; }
  }catch(e){ console.warn("Could not load saved work:", e); }
}
function save(){
  try{ localStorage.setItem(KEY, JSON.stringify(state)); }
  catch(e){ console.warn("Could not save:", e); }
}

/* ---------- library search ---------- */
function allEntries(){ return LIB.concat(state.own); }

function findEntry(text){
  const t = text.toLowerCase();
  let best = null, bestScore = 0;
  for(const en of allEntries()){
    let score = 0;
    if(t.includes(en.t.toLowerCase())) score += en.t.length * 3;
    for(const k of en.k){
      if(t.includes(k.toLowerCase())) score += k.length * 2;
    }
    const titleWords = en.t.toLowerCase().split(/[^a-z0-9]+/).filter(w=>w.length>3);
    for(const w of titleWords){ if(t.includes(w)) score += w.length; }
    if(score > bestScore){ bestScore = score; best = en; }
  }
  return bestScore >= 8 ? best : null;
}

function searchEntries(q){
  const t = q.toLowerCase().trim();
  if(!t) return [];
  return allEntries()
    .map(en=>{
      let s = 0;
      if(en.t.toLowerCase().startsWith(t)) s += 100;
      if(en.t.toLowerCase().includes(t)) s += 50;
      en.k.forEach(k=>{ if(k.toLowerCase().includes(t)) s += 20; });
      if((en.d||"").toLowerCase().includes(t)) s += 5;
      return {en,s};
    })
    .filter(x=>x.s>0).sort((a,b)=>b.s-a.s).slice(0,8).map(x=>x.en);
}

/* ---------- sorting an incoming line ---------- */
function detectSubject(text){
  const t = text.toLowerCase();
  const tag = t.match(/#([a-z]+)/);
  if(tag){
    const map = {bio:"biology",chem:"chemistry",phys:"physics",hist:"history",eng:"english",
                 math:"math",cs:"cs",econ:"economics",geo:"geography",calc:"math",
                 biology:"biology",chemistry:"chemistry",physics:"physics",history:"history",
                 english:"english",economics:"economics",geography:"geography"};
    if(map[tag[1]]) return map[tag[1]];
  }
  let best="general", bestN=0;
  for(const [sub,words] of Object.entries(SUBJECT_HINTS)){
    let n=0;
    for(const w of words){ if(t.includes(w)) n += w.length; }
    if(n>bestN){ bestN=n; best=sub; }
  }
  return bestN>0 ? best : "general";
}

function detectType(text){
  const t=text.trim();
  if(/\?$/.test(t) || /^(what|who|when|where|why|how|define|explain|describe|list|name|compare|evaluate|solve|find|simplify|factor)\b/i.test(t)) return "question";
  if(/[=+\-×÷^√]|\d\s*\/\s*\d|lim\(/.test(t) && /\d/.test(t)) return "formula";
  if(/\b(is|are|means|refers to|defined as)\b/i.test(t)) return "definition";
  if(/\b(1[0-9]{3}|20[0-2][0-9])\b/.test(t)) return "date / event";
  return "note";
}

function addLines(raw){
  const lines = raw.split("\n").map(l=>l.trim()).filter(Boolean);
  let added=0, dupes=0, matched=0;
  for(let line of lines){
    let priority = false;
    if(line.startsWith("!")){ priority = true; line = line.slice(1).trim(); }
    const clean = line.replace(/#[a-z]+/gi,"").trim();
    if(!clean) continue;
    if(state.items.some(i=>i.text.toLowerCase()===clean.toLowerCase())){ dupes++; continue; }
    const entry = findEntry(line);
    if(entry) matched++;
    state.items.push({
      id: Date.now()+"-"+Math.random().toString(36).slice(2,7),
      text: clean,
      subject: detectSubject(line),
      type: detectType(clean),
      priority,
      topic: entry ? entry.t : null,
      done: false,
      added: Date.now()
    });
    added++;
  }
  save();
  return {added,dupes,matched,total:lines.length};
}

/* ---------- rendering explanations ---------- */
function explainHTML(en){
  let h = `<div class="card"><h2>${esc(en.t)}</h2>`;
  h += `<div class="meta"><span class="chip">${esc(SUBJECTS[en.s]||en.s)}</span>`;
  if(en.own) h += `<span class="chip g">your note</span>`;
  h += `</div><div class="exp">`;
  h += `<h4>In plain English</h4><p>${esc(en.d).replace(/\n/g,"<br>")}</p>`;
  if(en.f) h += `<h4>Key formula / facts</h4><span class="fx">${esc(en.f).replace(/\n/g,"<br>")}</span>`;
  if(en.steps && en.steps.length){
    h += `<h4>How to do it</h4><ol class="steps">` + en.steps.map(s=>`<li>${esc(s)}</li>`).join("") + `</ol>`;
  }
  if(en.e) h += `<h4>Example</h4><span class="fx">${esc(en.e).replace(/\n/g,"<br>")}</span>`;
  if(en.m && en.m.length){
    h += `<h4>Where people lose points</h4><ul>` + en.m.map(m=>`<li>${esc(m)}</li>`).join("") + `</ul>`;
  }
  h += `</div></div>`;
  return h;
}

/* ---------- sorted list ---------- */
function renderList(){
  const q = $("#search").value.toLowerCase().trim();
  const fs = $("#filterSubject").value;
  const st = $("#filterStatus").value;
  const by = $("#sortBy").value;

  let items = state.items.filter(i=>{
    if(q && !i.text.toLowerCase().includes(q) && !(i.topic||"").toLowerCase().includes(q)) return false;
    if(fs && i.subject !== fs) return false;
    if(st==="explained" && !i.topic) return false;
    if(st==="unexplained" && i.topic) return false;
    if(st==="priority" && !i.priority) return false;
    if(st==="done" && !i.done) return false;
    if(st==="notdone" && i.done) return false;
    return true;
  });

  const el = $("#list");
  if(!items.length){
    el.innerHTML = `<div class="card empty">${state.items.length? "Nothing matches those filters." : "Nothing here yet — paste your notes into the <b>Add</b> tab."}</div>`;
    return;
  }

  if(by==="priority") items.sort((a,b)=> (b.priority-a.priority) || (!!b.topic - !!a.topic) || a.text.localeCompare(b.text));
  else if(by==="added") items.sort((a,b)=> b.added-a.added);
  else if(by==="alpha") items.sort((a,b)=> a.text.localeCompare(b.text));

  let html = "";
  if(by==="subject"){
    const groups = {};
    items.forEach(i=>{ (groups[i.subject] = groups[i.subject]||[]).push(i); });
    Object.keys(groups).sort((a,b)=>(SUBJECTS[a]||a).localeCompare(SUBJECTS[b]||b)).forEach(sub=>{
      groups[sub].sort((a,b)=>(b.priority-a.priority)||a.text.localeCompare(b.text));
      html += `<div class="group"><h3>${esc(SUBJECTS[sub]||sub)} · ${groups[sub].length}</h3>` +
              groups[sub].map(itemHTML).join("") + `</div>`;
    });
  } else {
    html = items.map(itemHTML).join("");
  }
  el.innerHTML = html;
}

function itemHTML(i){
  const cls = "item" + (i.priority?" pri":"") + (i.topic?" has":"") + (i.done?" done":"");
  let h = `<div class="${cls}" data-id="${i.id}">`;
  h += `<div class="txt">${esc(i.text)}</div>`;
  h += `<div class="meta">`;
  h += `<span class="chip">${esc(SUBJECTS[i.subject]||i.subject)}</span>`;
  h += `<span class="chip">${esc(i.type)}</span>`;
  if(i.priority) h += `<span class="chip r">priority</span>`;
  h += i.topic ? `<span class="chip g">${esc(i.topic)}</span>` : `<span class="chip a">no explanation yet</span>`;
  h += `<span class="acts">`;
  if(i.topic) h += `<button data-act="show">Explain</button>`;
  h += `<button data-act="done">${i.done?"Undo":"Done"}</button>`;
  h += `<button data-act="del">×</button></span></div>`;
  h += `<div class="expSlot"></div></div>`;
  return h;
}

/* ---------- test maker ---------- */
let currentTest = null;

const CALC_KEYS = ["trigLimit","piecewiseLimit","oneSidedLimit","discontinuity","limitProperties","limitFactor","rationalLimit","rationalize","simplifyRadical","complexFraction"];

function buildPicker(){
  const el = $("#genPicker");
  el.innerHTML = Object.entries(GENERATORS).map(([k,g])=>
    `<label data-k="${k}"><input type="checkbox" value="${k}"> <span>${esc(g.label)}</span></label>`
  ).join("");
  el.addEventListener("change", e=>{
    const lab = e.target.closest("label");
    if(lab) lab.classList.toggle("on", e.target.checked);
  });
  setPicked(CALC_KEYS);
}
function setPicked(keys){
  $$("#genPicker input").forEach(cb=>{
    cb.checked = keys.includes(cb.value);
    cb.closest("label").classList.toggle("on", cb.checked);
  });
}
function picked(){ return $$("#genPicker input:checked").map(cb=>cb.value); }

function makeGeneratedTest(){
  const keys = picked();
  if(!keys.length){ $("#testArea").innerHTML = `<div class="card result warn">Pick at least one problem type first.</div>`; return; }
  const n = parseInt($("#genCount").value,10);
  const qs = [];
  for(let i=0;i<n;i++){
    const k = keys[i % keys.length];
    let p, tries = 0;
    do { p = GENERATORS[k].make(); tries++; }
    while(tries<12 && qs.some(x=>x.q===p.q));
    p.gen = k; p.label = GENERATORS[k].label; p.topic = GENERATORS[k].topic;
    qs.push(p);
  }
  for(let i=qs.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [qs[i],qs[j]]=[qs[j],qs[i]]; }
  currentTest = { mode:"gen", qs, submitted:false };
  renderTest();
}

function makeMineTest(){
  const sub = $("#mineSubject").value;
  const n = parseInt($("#mineCount").value,10);
  let pool = state.items.filter(i=> !sub || i.subject===sub);
  if(!pool.length){
    $("#mineWarn").hidden = false;
    $("#mineWarn").textContent = "You have no saved questions" + (sub? " in that subject." : " yet. Add some in the Add tab first.");
    return;
  }
  $("#mineWarn").hidden = true;
  pool = pool.slice().sort(()=>Math.random()-0.5).slice(0,n);
  const qs = pool.map(i=>{
    const en = i.topic ? allEntries().find(e=>e.t===i.topic) : null;
    return { q:i.text, topic:i.topic, label:SUBJECTS[i.subject]||i.subject, entry:en, self:null,
             ans: en ? en.t : null,
             steps: en ? [en.d].concat(en.f?["Key: "+en.f]:[]).concat(en.e?["Example: "+en.e]:[]) : ["No stored explanation for this one yet — add one in the Save / Load tab."] };
  });
  currentTest = { mode:"mine", qs, submitted:false };
  renderTest();
}

function renderTest(){
  const t = currentTest;
  if(!t){ $("#testArea").innerHTML=""; return; }
  let h = `<div class="card"><div class="row">
    <b>${t.mode==="gen"?"Practice test":"Test from your notes"} — ${t.qs.length} question${t.qs.length>1?"s":""}</b>
    <span class="acts" style="margin-left:auto">
      <button id="btnNewSame" class="ghost">New test, same settings</button>
      <button id="btnPrintTest" class="ghost">Print</button>
    </span></div></div>`;

  h += t.qs.map((p,idx)=>{
    let c = "q" + (t.submitted ? (p.correct===true?" right":p.correct===false?" wrong":"") : "");
    let s = `<div class="${c}" data-i="${idx}">
      <div class="qhead"><span class="qnum">${idx+1}.</span>
      <span class="qtext">${esc(p.q)}</span>
      <span class="qtype">${esc(p.label||"")}</span></div>`;

    if(t.mode==="gen"){
      s += `<div class="ansrow"><input type="text" class="ansin" placeholder="Your answer" value="${esc(p.typed||"")}" ${t.submitted?"disabled":""}></div>`;
      if(t.submitted){
        s += `<div class="verdict ${p.correct?"ok":"no"}">${p.correct?"✓ Correct":"✗ Not quite — answer: "+esc(p.ans)}</div>`;
        s += `<div class="work"><h5>How to get there</h5><ol class="steps">${p.steps.map(x=>`<li>${esc(x)}</li>`).join("")}</ol></div>`;
      }
    } else {
      if(t.submitted){
        s += `<div class="work"><h5>${p.topic?esc(p.topic):"No explanation stored"}</h5>${
          p.steps.map(x=>`<p>${esc(x).replace(/\n/g,"<br>")}</p>`).join("")}</div>`;
        s += `<div class="selfgrade">Grade yourself:
          <button data-self="1" class="${p.self===1?"sel":""}">Got it</button>
          <button data-self="0" class="${p.self===0?"sel":""}">Missed it</button></div>`;
      } else {
        s += `<div class="ansrow"><input type="text" class="ansin" placeholder="Answer from memory, then reveal" value="${esc(p.typed||"")}"></div>`;
      }
    }
    return s + `</div>`;
  }).join("");

  if(!t.submitted){
    h += `<div class="card"><button id="btnSubmitTest" class="primary">${t.mode==="gen"?"Submit and grade":"Reveal answers"}</button></div>`;
  } else if(t.mode==="gen"){
    const right = t.qs.filter(p=>p.correct).length;
    const pct = Math.round(right/t.qs.length*100);
    h = `<div class="card scorebox"><div class="big">${right} / ${t.qs.length}</div>
      <div class="pct">${pct}%${pct===100?" — perfect":pct>=80?" — solid":pct>=60?" — nearly there":" — worth another pass"}</div>
      <button id="btnNewSame2" class="primary">Try a fresh test</button></div>` + h;
  }
  $("#testArea").innerHTML = h;
}

function submitTest(){
  const t = currentTest; if(!t) return;
  $$("#testArea .q").forEach(qEl=>{
    const i = +qEl.dataset.i;
    const inp = qEl.querySelector(".ansin");
    t.qs[i].typed = inp ? inp.value : "";
    if(t.mode==="gen") t.qs[i].correct = gradeAnswer(t.qs[i], t.qs[i].typed);
  });
  t.submitted = true;
  renderTest();
  window.scrollTo({top:0,behavior:"smooth"});
}

/* ---------- exports ---------- */
/* Saving a file works two different ways depending on where the page is running.
   Opened as a local file or on a normal web host, an anchor download works.
   Inside the claude.ai artifact viewer, anchors are inert and the page has to
   ask the host to save through the downloads capability. Try that first, and
   fall back to the anchor. Returns a status string so the caller can be honest
   about what actually happened. */
let dlNamespace;
async function getDownloads(){
  if(dlNamespace !== undefined) return dlNamespace;
  dlNamespace = null;
  try{
    if(window.claude && typeof window.claude.use === "function"){
      dlNamespace = await window.claude.use("downloads");
    }
  }catch(e){ dlNamespace = null; }
  return dlNamespace;
}

async function download(name, text, mime){
  const ns = await getDownloads();
  if(ns){
    try{
      await ns.save({ filename:name, data:text });
      return "saved";
    }catch(err){
      const code = err && err.code;
      if(code === "declined") return "declined";
      if(code === "rate_limited") return "busy";
      /* anything else: fall through and try the ordinary anchor */
    }
  }
  try{
    const b = new Blob([text], {type:mime||"text/plain;charset=utf-8"});
    const u = URL.createObjectURL(b);
    const a = document.createElement("a");
    a.href = u; a.download = name; document.body.appendChild(a); a.click();
    setTimeout(()=>{ document.body.removeChild(a); URL.revokeObjectURL(u); }, 0);
    return "saved";
  }catch(e){ return "failed"; }
}

function toMarkdown(){
  let md = "# Study sheet\n\n_Exported " + new Date().toLocaleDateString() + "_\n\n";
  const groups = {};
  state.items.forEach(i=>{ (groups[i.subject]=groups[i.subject]||[]).push(i); });
  Object.keys(groups).sort().forEach(sub=>{
    md += "\n## " + (SUBJECTS[sub]||sub) + "\n\n";
    groups[sub].forEach(i=>{
      md += "- " + (i.priority?"**[!] ":"") + i.text + (i.priority?"**":"") + "\n";
      const en = i.topic ? allEntries().find(e=>e.t===i.topic) : null;
      if(en){
        md += "  - " + en.d + "\n";
        if(en.f) md += "  - Formula: " + en.f.replace(/\n/g," ") + "\n";
        if(en.e) md += "  - Example: " + en.e.replace(/\n/g," ") + "\n";
      }
    });
  });
  return md;
}

/* ---------- wiring ---------- */
function fillSubjectSelects(){
  const used = [...new Set(state.items.map(i=>i.subject))].sort();
  const opts = used.map(s=>`<option value="${s}">${esc(SUBJECTS[s]||s)}</option>`).join("");
  ["#filterSubject","#mineSubject"].forEach(sel=>{
    const el=$(sel); if(!el) return;
    const cur=el.value;
    el.innerHTML = `<option value="">All subjects</option>` + opts;
    el.value = cur;
  });
  const own = $("#ownSubject");
  if(own) own.innerHTML = Object.entries(SUBJECTS).map(([k,v])=>`<option value="${k}">${esc(v)}</option>`).join("");
}

function refresh(){
  $("#countSorted").textContent = state.items.length;
  fillSubjectSelects();
  renderList();
}

function init(){
  load();
  const firstRun = !state.items.length && !state.own.length;
  if(firstRun) addLines(SEED.join("\n"));
  buildPicker();

  /* tabs */
  $$(".tab").forEach(b=>b.addEventListener("click", ()=>{
    $$(".tab").forEach(x=>x.classList.remove("active"));
    $$(".view").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    $("#view-"+b.dataset.view).classList.add("active");
  }));

  /* add */
  $("#btnSort").addEventListener("click", ()=>{
    const raw = $("#bulk").value;
    if(!raw.trim()) return;
    const r = addLines(raw);
    const box = $("#addResult");
    box.hidden = false;
    box.className = "result" + (r.added?"":" warn");
    box.textContent = r.added
      ? `Sorted ${r.added} item${r.added>1?"s":""}. ${r.matched} matched a topic I can explain${r.dupes?`. ${r.dupes} duplicate${r.dupes>1?"s":""} skipped`:""}.`
      : `Nothing new added${r.dupes?` — ${r.dupes} were already on your list.`:"."}`;
    if(r.added) $("#bulk").value = "";
    refresh();
  });
  $("#btnClearBox").addEventListener("click", ()=>{ $("#bulk").value=""; $("#addResult").hidden=true; });
  $("#btnSample").addEventListener("click", ()=>{
    $("#bulk").value = [
      "!Evaluate the limit of 5cos(x)tan(x)/(7x) as x approaches 0",
      "Express 3/sqrt(3) in simplest form with a rational denominator",
      "Types of discontinuities",
      "What is photosynthesis?",
      "!Causes of World War 1 #history",
      "How do you write a thesis statement",
      "Balancing chemical equations",
      "Newton's three laws of motion"
    ].join("\n");
  });

  /* sorted */
  ["#search","#filterSubject","#filterStatus","#sortBy"].forEach(s=>{
    $(s).addEventListener("input", renderList);
    $(s).addEventListener("change", renderList);
  });
  $("#list").addEventListener("click", e=>{
    const btn = e.target.closest("button[data-act]"); if(!btn) return;
    const wrap = btn.closest(".item"); const id = wrap.dataset.id;
    const item = state.items.find(i=>i.id===id); if(!item) return;
    const act = btn.dataset.act;
    if(act==="del"){ state.items = state.items.filter(i=>i.id!==id); save(); refresh(); }
    else if(act==="done"){ item.done=!item.done; save(); renderList(); }
    else if(act==="show"){
      const slot = wrap.querySelector(".expSlot");
      if(slot.innerHTML){ slot.innerHTML=""; btn.textContent="Explain"; }
      else{
        const en = allEntries().find(e=>e.t===item.topic);
        slot.innerHTML = en ? explainHTML(en) : "";
        btn.textContent="Hide";
      }
    }
  });
  $("#btnClearAll").addEventListener("click", ()=>{
    if(!state.items.length) return;
    if(confirm("Delete all "+state.items.length+" items? Your own saved explanations are kept.")){
      state.items = []; save(); refresh();
    }
  });

  /* explain */
  $("#lookup").addEventListener("input", ()=>{
    const q = $("#lookup").value;
    const hits = searchEntries(q);
    $("#suggest").innerHTML = hits.map(h=>`<button data-t="${esc(h.t)}">${esc(h.t)}</button>`).join("");
    $("#explainOut").innerHTML = hits.length ? explainHTML(hits[0]) : (q.trim()? `<div class="card empty">Nothing in the library for “${esc(q)}” yet. Send it to me and I'll add it, or write your own under <b>Save / Load</b>.</div>` : "");
  });
  $("#suggest").addEventListener("click", e=>{
    const b = e.target.closest("button"); if(!b) return;
    const en = allEntries().find(x=>x.t===b.dataset.t);
    if(en) $("#explainOut").innerHTML = explainHTML(en);
  });
  function renderLibIndex(){
    const all = allEntries().slice().sort((a,b)=>(SUBJECTS[a.s]||a.s).localeCompare(SUBJECTS[b.s]||b.s)||a.t.localeCompare(b.t));
    $("#libCount").textContent = all.length;
    $("#libIndex").innerHTML = all.map(e=>`<button data-t="${esc(e.t)}">${esc(e.t)}</button>`).join("");
  }
  $("#libIndex").addEventListener("click", e=>{
    const b = e.target.closest("button"); if(!b) return;
    const en = allEntries().find(x=>x.t===b.dataset.t);
    if(en){ $("#explainOut").innerHTML = explainHTML(en); window.scrollTo({top:0,behavior:"smooth"}); }
  });
  renderLibIndex();

  /* test maker */
  $$(".modebtn").forEach(b=>b.addEventListener("click", ()=>{
    $$(".modebtn").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    $("#modeGen").hidden = b.dataset.mode!=="gen";
    $("#modeMine").hidden = b.dataset.mode!=="mine";
  }));
  $("#btnPickAll").addEventListener("click", ()=>setPicked(Object.keys(GENERATORS)));
  $("#btnPickNone").addEventListener("click", ()=>setPicked([]));
  $("#btnPickCalc").addEventListener("click", ()=>setPicked(CALC_KEYS));
  $("#btnMakeTest").addEventListener("click", makeGeneratedTest);
  $("#btnMakeMine").addEventListener("click", makeMineTest);

  $("#testArea").addEventListener("click", e=>{
    const b = e.target.closest("button"); if(!b) return;
    if(b.id==="btnSubmitTest") submitTest();
    else if(b.id==="btnNewSame"||b.id==="btnNewSame2"){
      currentTest && currentTest.mode==="gen" ? makeGeneratedTest() : makeMineTest();
      window.scrollTo({top:0,behavior:"smooth"});
    }
    else if(b.id==="btnPrintTest") window.print();
    else if(b.dataset.self!==undefined){
      const i = +b.closest(".q").dataset.i;
      currentTest.qs[i].self = +b.dataset.self;
      renderTest();
    }
  });
  $("#testArea").addEventListener("keydown", e=>{
    if(e.key==="Enter" && e.target.classList.contains("ansin")){ e.preventDefault(); submitTest(); }
  });

  /* data */
  $("#btnExportJson").addEventListener("click", async ()=>{
    msg("#dataMsg","Saving backup\u2026");
    const r = await download("study-sorter-backup.json", JSON.stringify(state,null,2), "application/json");
    if(r==="saved") msg("#dataMsg","Backup saved. Keep it somewhere you'll find it again.");
    else if(r==="declined") msg("#dataMsg","Save cancelled \u2014 nothing was written.", true);
    else if(r==="busy") msg("#dataMsg","Another save is already open. Finish that one, then try again.", true);
    else msg("#dataMsg","Couldn't save the file here. Use Print / Save as PDF instead.", true);
  });
  $("#btnExportMd").addEventListener("click", async ()=>{
    msg("#dataMsg","Saving study sheet\u2026");
    const r = await download("study-sheet.md", toMarkdown(), "text/markdown");
    if(r==="saved") msg("#dataMsg","Study sheet saved.");
    else if(r==="declined") msg("#dataMsg","Save cancelled \u2014 nothing was written.", true);
    else if(r==="busy") msg("#dataMsg","Another save is already open. Finish that one, then try again.", true);
    else msg("#dataMsg","Couldn't save the file here. Use Print / Save as PDF instead.", true);
  });
  $("#btnPrint").addEventListener("click", ()=>window.print());
  $("#importFile").addEventListener("change", e=>{
    const f = e.target.files[0]; if(!f) return;
    const r = new FileReader();
    r.onload = ()=>{
      try{
        const p = JSON.parse(r.result);
        if(!p || !Array.isArray(p.items)) throw new Error("not a Study Sorter backup");
        state.items = p.items; state.own = p.own||[];
        save(); refresh(); renderLibIndex();
        msg("#dataMsg", `Imported ${state.items.length} items and ${state.own.length} of your own explanations.`);
      }catch(err){ msg("#dataMsg","That file didn't look like a Study Sorter backup.", true); }
    };
    r.readAsText(f);
    e.target.value = "";
  });
  $("#btnSaveOwn").addEventListener("click", ()=>{
    const t = $("#ownTitle").value.trim();
    const b = $("#ownBody").value.trim();
    if(!t || !b){ msg("#ownMsg","Give it a title and some text first.", true); return; }
    state.own = state.own.filter(o=>o.t.toLowerCase()!==t.toLowerCase());
    state.own.push({ t, s:$("#ownSubject").value, k:[t.toLowerCase()], d:b, m:[], own:true });
    save();
    state.items.forEach(i=>{ if(!i.topic && findEntry(i.text)) i.topic = findEntry(i.text).t; });
    save(); refresh(); renderLibIndex();
    $("#ownTitle").value=""; $("#ownBody").value="";
    msg("#ownMsg", `Saved “${t}”. It's now searchable and usable in tests.`);
  });

  function msg(sel,text,warn){
    const el=$(sel); el.hidden=false; el.className="result"+(warn?" warn":""); el.textContent=text;
  }

  refresh();
  if(firstRun) makeGeneratedTest();
}

document.addEventListener("DOMContentLoaded", init);
})();
