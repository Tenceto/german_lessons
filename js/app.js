/* =====================================================================
   App code, shared by every page. The page says which level it shows with
   <body data-level="1|2|3">; without data-level it shows all levels (alle.html).
   ===================================================================== */
const ALL = { WORDS, VERBS, SMALL, PHRASES, GRAMMAR };
{ // Inside this block WORDS, VERBS … only contain the current level's entries.

/* ---------- levels ---------- */
const LEVEL = +document.body.dataset.level || 0;
const LV = LEVELS[LEVEL] || null;
const lv = e => e.lvl || 0;
const pageOf = l => l ? LEVELS[l].code.toLowerCase() + '.html' : 'alle.html';
const inLevel = e => !LEVEL || lv(e) === LEVEL;
const upToLevel = e => lv(e) >= 1 && lv(e) <= LEVEL;
// Grammar: keep chapters that have something at the level; rules/examples inherit the chapter level.
// own = the chapter itself belongs to this level → show its intro, table and generated lists.
function grammarFor(pred) {
  return ALL.GRAMMAR.map(g => {
    const rules = (g.rules || []).filter(r => pred({ lvl: r.lvl || g.lvl }));
    const ex = (g.ex || []).filter(x => pred({ lvl: x[2] || g.lvl }));
    const own = pred(g);
    return own || rules.length || ex.length ? { ...g, rules, ex, own } : null;
  }).filter(Boolean);
}
const WORDS = ALL.WORDS.filter(inLevel), VERBS = ALL.VERBS.filter(inLevel),
  SMALL = ALL.SMALL.filter(inLevel), PHRASES = ALL.PHRASES.filter(inLevel), GRAMMAR = grammarFor(inLevel);
// Practice can optionally include the earlier levels too.
const withLower = () => LEVEL > 1 && P.lower;
const POOL = name => !withLower() ? { WORDS, VERBS, SMALL, PHRASES, GRAMMAR }[name]
  : name === 'GRAMMAR' ? grammarFor(upToLevel) : ALL[name].filter(upToLevel);
const lvTag = l => l ? `<span class="lvtag" style="--c:${LEVELS[l].color}">${LEVELS[l].code}</span>` : '<span class="lvtag none" title="ohne Stufe (lvl fehlt)">?</span>';
const lvBadge = e => LEVEL ? '' : lvTag(lv(e));   // on the "Alle Stufen" page every row shows its level

/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss');
const sortKey = s => norm(s).replace(/^(der|die|das|sich|\(sich\)) /, '');
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};
const allDates = [...WORDS, ...VERBS, ...SMALL, ...PHRASES].map(e => e.added).filter(Boolean).sort();
const NEW_SINCE = (() => { const d = new Date(); d.setDate(d.getDate() - 14); return d.toISOString().slice(0, 10); })();
const isNew = e => e.added && e.added >= NEW_SINCE;
const newBadge = e => isNew(e) ? '<span class="new">NEU</span>' : '';

function article(de) { const m = /^(der|die|das)\b/.exec(de); return m ? m[1] : null; }
function nounHtml(de) {
  return esc(de).replace(/(^|\/ )(der|die|das)\b/g, (m, a, art) => `${a}<span class="art-${art}">${art}</span>`);
}

/* ---------- verb conjugation ---------- */
const PRON = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];
const REFL = ['mich', 'dich', 'sich', 'uns', 'euch', 'sich'];
function verbParts(v) {
  let inf = v.de.replace(/\s*\(.*?\)\s*/g, ' ').trim();
  const refl = /^sich /.test(inf); if (refl) inf = inf.slice(5);
  let sep = v.sep || '';
  if (sep) inf = inf.startsWith(sep + ' ') ? inf.slice(sep.length + 1) : inf.slice(sep.length);
  const core = inf.split(' ')[0];
  return { core, refl, sep };
}
function present(v) {
  const { core, refl, sep } = verbParts(v);
  let f;
  if (v.conj) f = v.conj.slice();
  else {
    const stem = core.endsWith('en') ? core.slice(0, -2) : core.slice(0, -1);
    const needE = /[dt]$/.test(stem) || /([bdfgkpstvwz]|ch)[mn]$/.test(stem);
    const sib = /(s|ß|z|x)$/.test(stem);
    const ich = core.endsWith('eln') ? stem.slice(0, -2) + 'le' : stem + 'e';
    const t = needE ? 'et' : 't';
    f = [ich, v.du || stem + (needE ? 'est' : sib ? 't' : 'st'), v.er || stem + t, core, stem + t, core];
  }
  return f.map((x, i) => [x, refl ? REFL[i] : '', sep].filter(Boolean).join(' '));
}
function prateritum(v) {
  if (!v.prat) return null; const x = v.prat, w = x.endsWith('e') ? x + 'n' : x + 'en';
  return [x, x + 'st', x, w, x + 't', w];
}
const perfekt = v => (v.aux === 's' ? 'ist' : 'hat') + (/^sich /.test(v.de) ? ' sich' : '') + ' ' + v.pp;
const verbTags = v => (v.irr ? '<span class="tag irr">unregelm.</span>' : '') + (v.sep ? '<span class="tag sep">trennbar</span>' : '') +
  (/^sich /.test(v.de) ? '<span class="tag refl">reflexiv</span>' : '') + (v.aux === 's' ? '<span class="tag sein">sein</span>' : '');
function conjGrid(forms) {
  return '<div class="conj-grid">' + [0, 1, 2, 3, 4, 5].map(i => `<div><span class="pro">${PRON[i]}</span><span class="vf">${esc(forms[i])}</span></div>`).join('') + '</div>';
}

/* ---------- state ---------- */
// Each level remembers its own filters and practice settings; "Alle Stufen" keeps the original keys.
const KEY = k => LEVEL ? `${k}:${LV.code}` : k;
const S = store.get(KEY('ui-v2'), store.get('ui-v2', {}));
const state = Object.assign({ tab: 'words', q: {}, wType: 'all', wTopic: 'all', wSort: 'topic', vFilter: 'all', sGroup: 'all', pTopic: 'all' }, S);
const save = () => store.set(KEY('ui-v2'), { tab: state.tab, wType: state.wType, wTopic: state.wTopic, wSort: state.wSort, vFilter: state.vFilter, sGroup: state.sGroup, pTopic: state.pTopic });
// Links from other pages: ?tab=verbs&q=fahren (search from another level) — reset filters so the hits are visible.
const URLP = new URLSearchParams(location.search);
if (URLP.get('tab')) state.tab = URLP.get('tab');
if (URLP.get('q')) Object.assign(state, { q: { [state.tab]: URLP.get('q') }, wType: 'all', wTopic: 'all', vFilter: 'all', sGroup: 'all', pTopic: 'all' });
if (URLP.toString()) history.replaceState(null, '', location.pathname);
if (LEVEL) store.set('last-level', LEVEL);

const TABS = [
  ['words', 'Wörter', WORDS.length], ['verbs', 'Verben', VERBS.length], ['small', 'Kleine Wörter', SMALL.length],
  ['phrases', 'Sätze', PHRASES.length], ['grammar', 'Grammatik', GRAMMAR.length], ['practice', '▶ Üben', null]
];
function renderHeader() {
  document.title = (LV ? `${LV.code} ${LV.name} · ` : 'Alle Stufen · ') + 'German Study Notes';
  if (LV) { document.body.style.setProperty('--accent', LV.color); document.body.style.setProperty('--accent-light', LV.light); }
  $('header').innerHTML = `<h1><a class="home" href="index.html" title="Zur Startseite">🇩🇪 German Study Notes</a>
      ${LV ? `<span class="lvbadge">${LV.code} · ${LV.name}</span>` : '<span class="lvbadge all">Alle Stufen</span>'}</h1>
    <nav class="lvswitch" id="lvswitch"></nav><div class="stats" id="stats"></div>`;
}
function renderNav() {
  $('#nav').innerHTML = TABS.map(([id, label, n]) =>
    `<button class="tab${id === 'practice' ? ' practice' : ''}${state.tab === id ? ' active' : ''}" data-tab="${id}">${label}${n != null ? `<span class="n">${n}</span>` : ''}</button>`).join('');
  $('#nav').querySelectorAll('.tab').forEach(b => b.onclick = () => { state.tab = b.dataset.tab; save(); render(); window.scrollTo(0, 0); });
  // level switcher keeps the current tab
  const tab = state.tab === 'practice' ? '' : `?tab=${state.tab}`;
  $('#lvswitch').innerHTML = [1, 2, 3, 0].map(l => `<a class="lv${l === LEVEL ? ' on' : ''}" href="${pageOf(l)}${tab}"${l ? ` style="--c:${LEVELS[l].color}" title="${LEVELS[l].en}"` : ''}>${l ? LEVELS[l].code : 'Alle'}</a>`).join('');
  const total = WORDS.length + VERBS.length + SMALL.length + PHRASES.length;
  const nNew = [...WORDS, ...VERBS, ...SMALL, ...PHRASES].filter(isNew).length;
  $('#stats').textContent = `${total} entries${LV ? ' in ' + LV.code : ''} · ${nNew} added in the last 14 days`;
}

/* ---------- Hier anfangen (suggested order for this level) ---------- */
function stepHasContent([tab, f]) {
  if (tab === 'words') return WORDS.some(e => e.tags.includes(f));
  if (tab === 'phrases') return PHRASES.some(e => e.tags.includes(f));
  if (tab === 'small') return SMALL.some(e => e.g === f);
  if (tab === 'verbs') return VF[f] && VERBS.some(VF[f][1]);
  if (tab === 'grammar') return GRAMMAR.some(g => g.id === f);
}
function goStep(tab, f) {
  state.tab = tab; state.q[tab] = '';
  if (tab === 'words') Object.assign(state, { wTopic: f, wType: 'all', wSort: 'topic' });
  if (tab === 'phrases') state.pTopic = f;
  if (tab === 'small') state.sGroup = f;
  if (tab === 'verbs') state.vFilter = f;
  save(); render();
  const target = tab === 'grammar' ? document.getElementById('g-' + f) : $('#nav');
  if (target) target.scrollIntoView({ behavior: 'smooth' });
}
function renderStart() {
  const box = $('#start'); if (!box) return;
  const steps = (START_HERE[LEVEL] || []).filter(stepHasContent);
  if (!steps.length) { box.innerHTML = ''; return; }
  const done = store.get(KEY('start-done'), {}), open = store.get(KEY('start-open'), matchMedia('(min-width: 641px)').matches);
  const nDone = steps.filter(s => done[s[0] + ':' + s[1]]).length;
  box.innerHTML = `<details class="start"${open ? ' open' : ''}><summary>🧭 Hier anfangen <span class="count">${nDone} / ${steps.length} erledigt</span></summary>
    <ol>${steps.map(([tab, f, label]) => { const k = tab + ':' + f; return `<li class="${done[k] ? 'done' : ''}">
      <button class="step" data-step="${k}">${esc(label)}</button><button class="tick" data-tick="${k}" title="${done[k] ? 'erledigt' : 'als erledigt markieren'}">✓</button></li>`; }).join('')}</ol></details>`;
  box.querySelector('details').ontoggle = e => store.set(KEY('start-open'), e.target.open);
  box.querySelectorAll('[data-step]').forEach(b => b.onclick = () => { const [t, f] = b.dataset.step.split(':'); goStep(t, f); });
  box.querySelectorAll('[data-tick]').forEach(b => b.onclick = () => { const k = b.dataset.tick; done[k] = !done[k]; store.set(KEY('start-done'), done); renderStart(); });
}

/* ---------- search ---------- */
function searchBox(key, placeholder) {
  return `<input class="search" id="q" placeholder="${placeholder}" value="${esc(state.q[key] || '')}" autocomplete="off">`;
}
function bindSearch(key, rerender) {
  const q = $('#q'); if (!q) return;
  q.closest('.toolbar').insertAdjacentHTML('afterend', '<div class="elsewhere" id="elsewhere"></div>');
  q.oninput = () => { state.q[key] = q.value; rerender(); showElsewhere(key); };
  showElsewhere(key);
}
// On a level page, tell the user when the search term exists in another level.
function showElsewhere(key) {
  const box = $('#elsewhere'), q = state.q[key], name = { words: 'WORDS', verbs: 'VERBS', small: 'SMALL', phrases: 'PHRASES' }[key];
  if (!box) return;
  const hits = !LEVEL || !q || !name ? [] : [1, 2, 3].filter(l => l !== LEVEL)
    .map(l => [l, ALL[name].filter(e => lv(e) === l && matches(e, q)).length]).filter(([, n]) => n);
  box.innerHTML = hits.length ? 'Auch in anderen Stufen: ' + hits.map(([l, n]) =>
    `<a href="${pageOf(l)}?tab=${key}&q=${encodeURIComponent(q)}" style="--c:${LEVELS[l].color}">${LEVELS[l].code} · ${n} Treffer →</a>`).join(' ') : '';
}
const matches = (e, q) => !q || norm([e.de, e.pl, e.en, e.ex, e.note, e.pp].filter(Boolean).join(' ')).includes(norm(q));
function chips(items, current, attr) {
  return '<div class="chips">' + items.map(([v, label, n]) => `<button class="chip${current === v ? ' on' : ''}" data-${attr}="${v}">${label}${n != null ? `<span class="n">${n}</span>` : ''}</button>`).join('') + '</div>';
}
function bindChips(attr, fn) { document.querySelectorAll(`[data-${attr}]`).forEach(c => c.onclick = () => fn(c.dataset[attr])); }
function goPractice(source, filter) {
  Object.assign(P, { source, filter: filter || 'all' }); P.mode = 'meaning';
  store.set(KEY('practice-v1'), P); startSession();
  state.tab = 'practice'; save(); render(); window.scrollTo(0, 0);
}
function bindGo() { document.querySelectorAll('[data-go]').forEach(b => b.onclick = e => { e.stopPropagation(); const [s, f] = b.dataset.go.split(':'); goPractice(s, f); }); }

/* ---------- Wörter ---------- */
function wordRow(e) {
  let de = e.t === 'noun' ? nounHtml(e.de) : esc(e.de);
  if (e.pl) de += `<span class="pl">${nounHtml(e.pl)}</span>`;
  if (e.komp) de += `<span class="komp">${esc(e.komp)} · ${esc(e.sup)}</span>`;
  return `<div class="row"><span class="de">${de}${newBadge(e)}${lvBadge(e)}</span><span class="en">${esc(e.en)}${e.ex ? `<span class="ex">${esc(e.ex)}</span>` : ''}</span></div>`;
}
function renderWords() {
  const m = $('#main');
  const typeOk = e => state.wType === 'all' || e.t === state.wType;
  const counts = t => WORDS.filter(e => typeOk(e) && (t === 'all' || e.tags.includes(t))).length;
  m.innerHTML = `<div class="toolbar">${searchBox('words', 'Suchen… (Deutsch oder Englisch)')}
      <select id="wType"><option value="all">Nomen & Adjektive</option><option value="noun">Nur Nomen</option><option value="adj">Nur Adjektive</option></select>
      <select id="wSort"><option value="topic">Nach Thema</option><option value="az">A–Z</option><option value="new">Neueste zuerst</option></select></div>
    ${chips([['all', 'Alle', counts('all')], ...Object.entries(TOPICS).map(([k, v]) => [k, v, counts(k)])], state.wTopic, 'topic')}
    <div class="legend">Artikel: <b class="art-der">der</b> · <b class="art-die">die</b> · <b class="art-das">das</b> — plural in grey</div>
    <div id="list"></div>`;
  $('#wType').value = state.wType; $('#wSort').value = state.wSort;
  $('#wType').onchange = e => { state.wType = e.target.value; save(); renderWords(); };
  $('#wSort').onchange = e => { state.wSort = e.target.value; save(); list(); };
  bindChips('topic', v => { state.wTopic = v; save(); renderWords(); });
  bindSearch('words', list);
  function list() {
    const q = state.q.words;
    const items = WORDS.filter(e => typeOk(e) && (state.wTopic === 'all' || e.tags.includes(state.wTopic)) && matches(e, q));
    let html = '';
    if (state.wSort === 'topic') {
      const topics = state.wTopic === 'all' ? Object.keys(TOPICS) : [state.wTopic];
      for (const t of topics) {
        const g = items.filter(e => e.tags[0] === t || (state.wTopic !== 'all' && e.tags.includes(t)));
        if (!g.length) continue;
        g.sort((a, b) => (a.t === b.t ? 0 : a.t === 'noun' ? -1 : 1) || sortKey(a.de).localeCompare(sortKey(b.de)));
        html += `<h3>${TOPICS[t]} <span class="count">${g.length}</span><button class="go" data-go="words:${t}">▶ üben</button></h3><div class="card">${g.map(wordRow).join('')}</div>`;
      }
    } else {
      const g = items.slice().sort(state.wSort === 'new' ? (a, b) => (b.added || '').localeCompare(a.added || '') : (a, b) => sortKey(a.de).localeCompare(sortKey(b.de)));
      html = g.length ? `<div class="card">${g.map(wordRow).join('')}</div>` : '';
    }
    $('#list').innerHTML = html || '<div class="empty">Nichts gefunden.</div>';
    bindGo();
  }
  list();
}

/* ---------- Verben ---------- */
const VF = {
  all: ['Alle', v => true], reg: ['Regelmässig', v => !v.irr], irr: ['Unregelmässig', v => v.irr && !v.modal],
  sep: ['Trennbar', v => v.sep], refl: ['Reflexiv', v => /^sich /.test(v.de)], sein: ['Perfekt mit sein', v => v.aux === 's'],
  modal: ['Modal- & Hilfsverben', v => v.modal], neu: ['Neu', isNew]
};
function renderVerbs() {
  const m = $('#main');
  m.innerHTML = `<div class="toolbar">${searchBox('verbs', 'Verb suchen… (z.B. fahren, to drive, gefahren)')}</div>
    ${chips(Object.entries(VF).map(([k, [l, f]]) => [k, l, VERBS.filter(f).length]), state.vFilter, 'vf')}
    <div class="legend">Click a verb for the full conjugation. Regular verbs follow the pattern -e / -st / -t / -en / -t / -en.
      <button class="chip" data-go="verbs:${state.vFilter}" style="margin-left:6px">▶ diese Verben üben</button></div>
    <div class="card" style="padding:0;overflow:hidden"><table class="vtable"><thead><tr><th>Infinitiv</th><th>Bedeutung</th><th class="hide-sm">er/sie/es</th><th>Perfekt</th></tr></thead><tbody id="vbody"></tbody></table></div>`;
  bindChips('vf', v => { state.vFilter = v; save(); renderVerbs(); });
  bindSearch('verbs', list); bindGo();
  function list() {
    const f = VF[state.vFilter][1], q = state.q.verbs;
    const items = VERBS.filter(v => f(v) && matches(v, q));
    $('#vbody').innerHTML = items.map((v, i) => {
      const pr = present(v), pt = prateritum(v);
      return `<tr class="v" data-i="${i}"><td><b>${esc(v.de)}</b>${verbTags(v)}${newBadge(v)}${lvBadge(v)}</td><td>${esc(v.en)}</td><td class="hide-sm">${esc(pr[2])}</td><td class="vf">${esc(perfekt(v))}</td></tr>
        <tr class="vdetail" style="display:none"><td colspan="4"><div style="font-size:12px;color:var(--text-3);font-weight:600">PRÄSENS</div>${conjGrid(pr)}
        ${pt ? `<div style="font-size:12px;color:var(--text-3);font-weight:600">PRÄTERITUM</div>${conjGrid(pt)}` : ''}
        ${v.ex ? `<div class="vnote"><i>${esc(v.ex)}</i></div>` : ''}${v.note ? `<div class="vnote">💡 ${esc(v.note)}</div>` : ''}</td></tr>`;
    }).join('') || '<tr><td colspan="4" class="empty">Nichts gefunden.</td></tr>';
    document.querySelectorAll('tr.v').forEach(tr => tr.onclick = () => {
      const d = tr.nextElementSibling, open = d.style.display === 'none';
      d.style.display = open ? '' : 'none'; tr.classList.toggle('open', open);
    });
  }
  list();
}

/* ---------- Kleine Wörter ---------- */
function smallRow(e) {
  let de = esc(e.de); if (e.komp) de += `<span class="komp">${esc(e.komp)} · ${esc(e.sup)}</span>`;
  return `<div class="row"><span class="de">${de}${newBadge(e)}${lvBadge(e)}</span><span class="en">${esc(e.en)}${e.ex ? `<span class="ex">${esc(e.ex)}</span>` : ''}</span></div>`;
}
function renderSmall() {
  const m = $('#main');
  m.innerHTML = `<div class="toolbar">${searchBox('small', 'Suchen…')}</div>
    ${chips([['all', 'Alle', SMALL.length], ...Object.keys(SMALL_GROUPS).map(k => [k, SMALL_GROUPS[k].split(' — ')[0], SMALL.filter(e => e.g === k).length])], state.sGroup, 'sg')}
    <div id="list"></div>`;
  bindChips('sg', v => { state.sGroup = v; save(); renderSmall(); });
  bindSearch('small', list);
  function list() {
    const q = state.q.small; let html = '';
    for (const g of Object.keys(SMALL_GROUPS)) {
      if (state.sGroup !== 'all' && state.sGroup !== g) continue;
      const items = SMALL.filter(e => e.g === g && matches(e, q));
      if (!items.length) continue;
      html += `<h3>${SMALL_GROUPS[g]} <span class="count">${items.length}</span><button class="go" data-go="small:${g}">▶ üben</button></h3><div class="card">${items.map(smallRow).join('')}</div>`;
    }
    $('#list').innerHTML = html || '<div class="empty">Nichts gefunden.</div>'; bindGo();
  }
  list();
}

/* ---------- Sätze ---------- */
function renderPhrases() {
  const m = $('#main');
  const cnt = t => PHRASES.filter(e => t === 'all' || e.tags.includes(t)).length;
  m.innerHTML = `<div class="toolbar">${searchBox('phrases', 'Satz suchen…')}</div>
    ${chips([['all', 'Alle', cnt('all')], ...Object.keys(TOPICS).filter(k => cnt(k)).map(k => [k, TOPICS[k], cnt(k)])], state.pTopic, 'pt')}
    <div id="list"></div>`;
  bindChips('pt', v => { state.pTopic = v; save(); renderPhrases(); });
  bindSearch('phrases', list);
  function list() {
    const q = state.q.phrases; let html = '';
    for (const t of Object.keys(TOPICS)) {
      if (state.pTopic !== 'all' && state.pTopic !== t) continue;
      const items = PHRASES.filter(e => (state.pTopic === 'all' ? e.tags[0] === t : e.tags.includes(t)) && matches(e, q));
      if (!items.length) continue;
      html += `<h3>${TOPICS[t]} <span class="count">${items.length}</span><button class="go" data-go="phrases:${t}">▶ üben</button></h3><div class="card">${items.map(smallRow).join('')}</div>`;
    }
    $('#list').innerHTML = html || '<div class="empty">Nichts gefunden.</div>'; bindGo();
  }
  list();
}

/* ---------- Grammatik ---------- */
function renderGrammar() {
  const m = $('#main');
  const autoHtml = {
    preps: () => '<details><summary>Alle Präpositionen anzeigen</summary><div class="card" style="margin-top:8px">' + SMALL.filter(e => e.g === 'prep').map(smallRow).join('') + '</div></details>',
    participles: () => {
      const vs = VERBS.slice().sort((a, b) => sortKey(a.de).localeCompare(sortKey(b.de)));
      return `<details><summary>Alle ${vs.length} Partizipien anzeigen (unregelmässige in Orange)</summary><div class="gcols">` +
        vs.map(v => `<div>${esc(v.de.replace(/ \(.*\)/, ''))} → <b style="color:${v.irr ? '#b45309' : 'var(--accent)'}">${esc(perfekt(v))}</b></div>`).join('') + '</div></details>';
    },
    comparatives: () => '<table class="gtable"><thead><tr><th>Grundform</th><th>Komparativ</th><th>Superlativ</th></tr></thead><tbody>' +
      [...WORDS, ...SMALL].filter(e => e.komp).map(e => `<tr><td>${esc(e.de)} <span style="color:var(--text-3)">(${esc(e.en)})</span></td><td class="vf">${esc(e.komp)}</td><td class="vf">${esc(e.sup)}</td></tr>`).join('') + '</tbody></table>'
  };
  m.innerHTML = '<div class="toc">' + GRAMMAR.map((g, i) => `<button class="chip" data-jump="${g.id}">${i + 1}. ${esc(g.title.split(' — ')[0])}</button>`).join('') + '</div>' +
    GRAMMAR.map((g, i) => `<section class="gsec" id="g-${g.id}"><h2><span class="num">${i + 1}</span>${esc(g.title)}${lvBadge(g)}${(g.rules.length || g.ex.length) ? `<button class="go" data-go="grammar:${g.id}">▶ üben</button>` : ''}</h2>
      ${!g.own ? `<p class="basics">Die Grundlagen dieses Kapitels sind in <a href="${pageOf(g.lvl)}?tab=grammar" style="--c:${LEVELS[g.lvl].color}">${LEVELS[g.lvl].code} · ${LEVELS[g.lvl].name}</a>. Hier nur die ${LV.code}-Regeln.</p>` : ''}
      ${g.own ? (g.intro || []).map(p => `<p>${p}</p>`).join('') : ''}
      ${g.own && g.table ? `<table class="gtable"><thead><tr>${g.table.head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${g.table.rows.map(r => `<tr>${r.map((c, j) => `<td${j ? '' : ' style="font-weight:600"'}>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>` : ''}
      ${(g.rules || []).map(r => `<div class="rule"><div class="t">${esc(r.t)}</div><div class="e">${esc(r.ex)}</div>${r.note ? `<div class="n">${esc(r.note)}</div>` : ''}</div>`).join('')}
      ${g.ex && g.ex.length ? `<div class="card" style="margin-top:10px">${g.ex.map(([de, en]) => `<div class="row"><span class="de">${esc(de)}</span><span class="en">${esc(en)}</span></div>`).join('')}</div>` : ''}
      ${g.own && g.auto ? autoHtml[g.auto]() : ''}</section>`).join('');
  document.querySelectorAll('[data-jump]').forEach(b => b.onclick = () => document.getElementById('g-' + b.dataset.jump).scrollIntoView({ behavior: 'smooth' }));
  bindGo();
}

/* ---------- Üben (spaced repetition) ---------- */
const INTERVALS = [0, 1, 3, 7, 14, 30, 60]; // days per box
const P = Object.assign({ source: 'words', filter: 'all', mode: 'meaning', dir: 'de-en', dueOnly: true, size: 20, lower: false }, store.get(KEY('practice-v1'), store.get('practice-v1', {})));
let SRS = store.get('srs-v1', {});
let queue = [], qi = 0, revealed = false, done = 0;
const today = () => new Date().toISOString().slice(0, 10);
const addDays = n => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };

function sourceFilters(src) {
  if (src === 'words' || src === 'phrases') return [['all', 'Alle Themen'], ['neu', 'Neu (14 Tage)'], ...Object.entries(TOPICS)];
  if (src === 'small') return [['all', 'Alle Gruppen'], ['neu', 'Neu (14 Tage)'], ...Object.entries(SMALL_GROUPS).map(([k, v]) => [k, v.split(' — ')[0]])];
  if (src === 'verbs') return Object.entries(VF).map(([k, [l]]) => [k, l]);
  if (src === 'grammar') return [['all', 'Alle Kapitel'], ...POOL('GRAMMAR').map(g => [g.id, g.title.split(' — ')[0]])];
  return [['all', 'Alle']];
}
function sourceModes(src) {
  if (src === 'words') return [['meaning', 'Bedeutung'], ['article', 'Artikel & Plural (nur Nomen)']];
  if (src === 'verbs') return [['meaning', 'Bedeutung'], ['perfekt', 'Perfekt'], ['present', 'Präsens (du / er)'], ['conj', 'Ganze Konjugation']];
  return [['meaning', 'Bedeutung']];
}
function buildCards() {
  const f = P.filter, cards = [];
  const [WORDS, VERBS, SMALL, PHRASES, GRAMMAR] = ['WORDS', 'VERBS', 'SMALL', 'PHRASES', 'GRAMMAR'].map(POOL);
  const push = (l, c) => cards.push({ ...c, lvl: l });
  const topicOk = e => f === 'all' || (f === 'neu' ? isNew(e) : (e.tags || []).includes(f) || e.g === f);
  const wordDe = e => (e.t === 'noun' ? nounHtml(e.de) : esc(e.de)) + (e.pl ? `<span class="pl">${nounHtml(e.pl)}</span>` : '');
  const exHtml = e => e.ex ? `<span class="ex">${esc(e.ex)}</span>` : '';
  if (P.source === 'words') {
    for (const e of WORDS.filter(topicOk)) {
      if (P.mode === 'article') {
        if (e.t !== 'noun') continue;
        const bare = e.de.replace(/\b(der|die|das) /g, '');
        push(e.lvl, { id: 'art:' + e.de, kind: 'Artikel & Plural', front: esc(bare), hint: esc(e.en), back: wordDe(e), fixed: true });
      } else push(e.lvl, { id: 'w:' + e.de, kind: e.t === 'noun' ? 'Nomen' : 'Adjektiv', de: wordDe(e), en: esc(e.en) + exHtml(e) });
    }
  } else if (P.source === 'small' || P.source === 'phrases') {
    const list = P.source === 'small' ? SMALL : PHRASES;
    for (const e of list.filter(topicOk)) push(e.lvl, { id: P.source[0] + ':' + e.de, kind: P.source === 'small' ? 'Kleines Wort' : 'Satz', de: esc(e.de), en: esc(e.en) + exHtml(e) });
  } else if (P.source === 'verbs') {
    for (const v of VERBS.filter(VF[f] ? VF[f][1] : () => true)) {
      const pr = present(v);
      if (P.mode === 'perfekt') push(v.lvl, { id: 'vp:' + v.de, kind: 'Perfekt', front: esc(v.de), hint: esc(v.en), back: esc(perfekt(v)), fixed: true });
      else if (P.mode === 'present') push(v.lvl, { id: 'vr:' + v.de, kind: 'Präsens', front: esc(v.de), hint: 'du … / er … ?', back: `du ${esc(pr[1])} · er ${esc(pr[2])}`, fixed: true });
      else if (P.mode === 'conj') push(v.lvl, { id: 'vc:' + v.de, kind: 'Konjugation', front: esc(v.de), hint: esc(v.en), back: conjGrid(pr), fixed: true });
      else push(v.lvl, { id: 'v:' + v.de, kind: 'Verb', de: esc(v.de), en: esc(v.en) + exHtml(v) });
    }
  } else if (P.source === 'grammar') {
    for (const g of GRAMMAR.filter(g => f === 'all' || g.id === f)) {
      for (const r of g.rules || []) push(r.lvl || g.lvl, { id: 'g:' + r.t, kind: 'Grammatik', front: esc(r.t), hint: 'Regel & Beispiel?', back: esc(r.ex) + (r.note ? `<span class="ex">${esc(r.note)}</span>` : ''), fixed: true });
      for (const [de, en, l] of g.ex || []) push(l || g.lvl, { id: 'ge:' + de, kind: 'Grammatik-Beispiel', de: esc(de), en: esc(en) });
    }
  }
  return cards;
}
function isDue(c) { const s = SRS[c.id]; return !s || s.due <= today(); }
function startSession() {
  let cards = buildCards();
  if (P.dueOnly) cards = cards.filter(isDue);
  // due-but-seen first (oldest due), then unseen, shuffled within groups
  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const seen = shuffle(cards.filter(c => SRS[c.id])), unseen = shuffle(cards.filter(c => !SRS[c.id]));
  queue = [...seen, ...unseen];
  if (P.size) queue = queue.slice(0, P.size);
  queue.forEach(c => { c.showDe = P.dir === 'de-en' ? true : P.dir === 'en-de' ? false : Math.random() < .5; });
  qi = 0; done = 0; revealed = false;
}
function grade(g) {
  const c = queue[qi]; if (!c) return;
  const s = SRS[c.id] || { b: 0 };
  if (g === 0) { s.b = 0; s.due = today(); queue.splice(Math.min(qi + 4, queue.length), 0, c); }
  else if (g === 1) { s.b = Math.max(1, s.b); s.due = addDays(1); }
  else { s.b = Math.min(s.b + 1, INTERVALS.length - 1); s.due = addDays(INTERVALS[s.b]); }
  SRS[c.id] = s; store.set('srs-v1', SRS);
  done++; qi++; revealed = false; drawCard();
}
function renderPractice() {
  const m = $('#main');
  const opt = (arr, cur) => arr.map(([v, l]) => `<option value="${v}"${v === cur ? ' selected' : ''}>${esc(l)}</option>`).join('');
  if (!sourceFilters(P.source).some(([v]) => v === P.filter)) P.filter = 'all';
  if (!sourceModes(P.source).some(([v]) => v === P.mode)) P.mode = 'meaning';
  m.innerHTML = `<div class="pr-settings">
      <label>Was üben?<select id="pSrc">${opt([['words', 'Wörter'], ['verbs', 'Verben'], ['small', 'Kleine Wörter'], ['phrases', 'Sätze'], ['grammar', 'Grammatik']], P.source)}</select></label>
      <label>Auswahl<select id="pFil">${opt(sourceFilters(P.source), P.filter)}</select></label>
      <label>Modus<select id="pMode">${opt(sourceModes(P.source), P.mode)}</select></label>
      <label>Richtung<select id="pDir">${opt([['de-en', 'Deutsch → Englisch'], ['en-de', 'Englisch → Deutsch'], ['random', 'Gemischt']], P.dir)}</select></label>
      <label>Karten<select id="pSize">${opt([['10', '10'], ['20', '20'], ['50', '50'], ['0', 'Alle']], String(P.size))}</select></label>
      <label class="inline"><input type="checkbox" id="pDue"${P.dueOnly ? ' checked' : ''}> Nur fällige Karten</label>
      ${LEVEL > 1 ? `<label class="inline"><input type="checkbox" id="pLower"${P.lower ? ' checked' : ''}> Frühere Stufen einbeziehen (${[1, 2].filter(l => l < LEVEL).map(l => LEVELS[l].code).join(' + ')})</label>` : ''}
    </div>
    <div class="pr-info"><span id="pInfo"></span><span class="boxes" id="pBoxes"></span></div>
    <div id="fcWrap"></div>
    <div class="kbd">Leertaste = aufdecken · 1 = Nochmal · 2 = Schwer · 3 = Gewusst</div>`;
  const upd = () => { store.set(KEY('practice-v1'), P); startSession(); renderPractice(); };
  $('#pSrc').onchange = e => { P.source = e.target.value; P.filter = 'all'; P.mode = 'meaning'; upd(); };
  $('#pFil').onchange = e => { P.filter = e.target.value; upd(); };
  $('#pMode').onchange = e => { P.mode = e.target.value; upd(); };
  $('#pDir').onchange = e => { P.dir = e.target.value; upd(); };
  $('#pSize').onchange = e => { P.size = +e.target.value; upd(); };
  $('#pDue').onchange = e => { P.dueOnly = e.target.checked; upd(); };
  if ($('#pLower')) $('#pLower').onchange = e => { P.lower = e.target.checked; upd(); };
  if (!queue.length && !done) startSession();
  drawCard();
}
function drawCard() {
  const all = buildCards(), due = all.filter(isDue).length, learned = all.filter(c => SRS[c.id] && SRS[c.id].b >= 3).length;
  const info = $('#pInfo'); if (!info) return;
  info.textContent = `${all.length} Karten · ${due} fällig · ${learned} gut gelernt` + (queue.length ? ` · Karte ${Math.min(qi + 1, queue.length)} / ${queue.length}` : '');
  const boxes = [0, 0, 0, 0, 0, 0, 0]; let unseen = 0;
  all.forEach(c => SRS[c.id] ? boxes[SRS[c.id].b]++ : unseen++);
  $('#pBoxes').innerHTML = `<span title="noch nie gesehen">neu ${unseen}</span>` + boxes.map((n, i) => `<span title="Box ${i}">${i}: ${n}</span>`).join('');
  const w = $('#fcWrap'), c = queue[qi];
  if (!c) {
    w.innerHTML = `<div class="fc" style="cursor:default"><div class="front">${done ? '🎉 Fertig für heute!' : 'Keine fälligen Karten.'}</div>
      <div class="hint">${done ? `${done} Karten wiederholt.` : 'Alles wiederholt — oder wähle eine andere Auswahl.'}</div>
      <div class="grade"><button class="btn" id="again">Neue Runde</button>${P.dueOnly ? '<button class="btn light" id="all">Alle Karten üben</button>' : ''}</div></div>`;
    $('#again').onclick = () => { startSession(); drawCard(); };
    if ($('#all')) $('#all').onclick = () => { P.dueOnly = false; store.set(KEY('practice-v1'), P); startSession(); renderPractice(); };
    return;
  }
  const front = c.fixed ? c.front : (c.showDe ? c.de : c.en);
  const back = c.fixed ? c.back : (c.showDe ? c.en : c.de);
  const box = SRS[c.id] ? SRS[c.id].b : null;
  w.innerHTML = `<div class="fc" id="fc"><div class="kind">${c.kind}${LEVEL && c.lvl !== LEVEL ? ' · ' + lvTag(c.lvl) : ''}${box != null ? ` · Box ${box}` : ' · neu'}</div>
      <div class="front">${front}</div>${c.hint ? `<div class="hint">${c.hint}</div>` : ''}
      ${revealed ? `<div class="back">${back}</div>` : '<div class="tap">Klicken zum Aufdecken</div>'}</div>
    ${revealed ? `<div class="grade"><button class="again" data-g="0">Nochmal<small>gleich wieder</small></button><button class="hard" data-g="1">Schwer<small>morgen</small></button><button class="good" data-g="2">Gewusst<small>in ${INTERVALS[Math.min((box ?? 0) + 1, INTERVALS.length - 1)]} Tag(en)</small></button></div>` : ''}`;
  $('#fc').onclick = () => { if (!revealed) { revealed = true; drawCard(); } };
  document.querySelectorAll('[data-g]').forEach(b => b.onclick = () => grade(+b.dataset.g));
}
document.addEventListener('keydown', e => {
  if (state.tab !== 'practice' || /INPUT|SELECT/.test(e.target.tagName)) return;
  if (e.key === ' ') { e.preventDefault(); if (!revealed && queue[qi]) { revealed = true; drawCard(); } }
  else if (revealed && ['1', '2', '3'].includes(e.key)) grade(+e.key - 1);
});

/* ---------- main ---------- */
function render() {
  renderNav(); renderStart();
  ({ words: renderWords, verbs: renderVerbs, small: renderSmall, phrases: renderPhrases, grammar: renderGrammar, practice: renderPractice }[state.tab] || renderWords)();
}
renderHeader();
if (LEVEL) $('#main').insertAdjacentHTML('beforebegin', '<section id="start"></section>');
render();

} // end of level block
