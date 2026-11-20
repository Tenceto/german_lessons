/* Start page: pick a level. Shows what each level contains and your practice progress in it. */
(() => {
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const get = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } };
  const SRS = get('srs-v1', {});
  const today = new Date().toISOString().slice(0, 10);
  const since = (() => { const d = new Date(); d.setDate(d.getDate() - 14); return d.toISOString().slice(0, 10); })();
  const page = l => LEVELS[l].code.toLowerCase() + '.html';
  const lists = [['w:', WORDS, 'Wörter'], ['v:', VERBS, 'Verben'], ['s:', SMALL, 'Kleine Wörter'], ['p:', PHRASES, 'Sätze']];
  const rulesAt = l => GRAMMAR.reduce((n, g) => n + (g.rules || []).filter(r => (r.lvl || g.lvl) === l).length, 0);

  function stats(l) {
    let total = 0, learned = 0, due = 0, seen = 0, fresh = 0;
    const counts = lists.map(([pre, list, label]) => {
      const items = list.filter(e => e.lvl === l);
      for (const e of items) {
        const s = SRS[pre + e.de]; total++;
        if (e.added && e.added >= since) fresh++;
        if (!s) continue; seen++;
        if (s.b >= 3) learned++;
        if (s.due <= today) due++;
      }
      return [label, items.length];
    });
    counts.push(['Grammatikregeln', rulesAt(l)]);
    return { counts, total, learned, due, seen, fresh };
  }

  const last = get('last-level', 0);
  $('#levels').innerHTML = [1, 2, 3].map(l => {
    const L = LEVELS[l], s = stats(l), pct = s.total ? Math.round(100 * s.learned / s.total) : 0;
    return `<a class="lvcard" href="${page(l)}" style="--c:${L.color};--cl:${L.light}">
      <div class="top"><span class="code">${L.code}</span><span class="names"><b>${esc(L.name)}</b><span>${esc(L.en)}</span></span></div>
      <p class="blurb">${esc(L.blurb)}</p>
      <ul class="counts">${s.counts.map(([k, n]) => `<li><b>${n}</b> ${k}</li>`).join('')}</ul>
      <div class="bar" title="${s.learned} von ${s.total} gut gelernt (Box 3+)"><span style="width:${pct}%"></span></div>
      <div class="prog">${s.seen ? `${pct}% gut gelernt · ${s.due} fällig` : 'Noch nicht geübt'}${s.fresh ? ` · ${s.fresh} neu` : ''}</div>
      <span class="open">${l === last ? 'Weiterlernen' : 'Öffnen'} →</span></a>`;
  }).join('');

  if (LEVELS[last]) $('#cont').innerHTML = `<a class="cont" href="${page(last)}" style="--c:${LEVELS[last].color}">Weiter mit ${LEVELS[last].code} · ${esc(LEVELS[last].name)} →</a>`;

  // Entries without a level still show up under "Alle Stufen"; flag them here so nothing gets lost.
  const unsorted = [...WORDS, ...VERBS, ...SMALL, ...PHRASES].filter(e => !LEVELS[e.lvl]);
  $('#foot').innerHTML = `<a href="alle.html">Alle Stufen zusammen ansehen →</a>` +
    (unsorted.length ? `<p class="warn">⚠️ ${unsorted.length} ${unsorted.length === 1 ? 'Eintrag hat' : 'Einträge haben'} noch keine Stufe (lvl fehlt): ${unsorted.slice(0, 5).map(e => esc(e.de)).join(', ')}${unsorted.length > 5 ? ' …' : ''} — sie erscheinen nur unter „Alle Stufen“.</p>` : '');
})();
