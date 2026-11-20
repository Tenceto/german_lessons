/* =====================================================================
   DATA — the files in data/ are the only part you need to edit to add new things.
   Add one line per entry in the right file (words.js, verbs.js, small.js, phrases.js, grammar.js).
   lvl = level: 1 = A1 (very basic), 2 = A2 (basic), 3 = B1 (intermediate) — see levels.js. Examples:
     WORDS:   {lvl: 1, de: "der Stuhl", pl: "die Stühle", en: "chair", t: "noun", tags: ["wohnen"], added: "2026-11-08"},
              {lvl: 1, de: "müde", en: "tired", t: "adj", tags: ["gefuehle"], added: "2026-11-08"},
     VERBS:   {lvl: 1, de: "kaufen", en: "to buy", pp: "gekauft", aux: "h", ex: "Ich kaufe Obst.", added: "2026-11-08"},
              {lvl: 1, de: "anfangen", en: "to start", pp: "angefangen", aux: "h", irr: 1, sep: "an", du: "fängst", er: "fängt", added: "2026-11-08"},
     SMALL:   {lvl: 2, de: "trotzdem", en: "nevertheless", g: "conn", added: "2026-11-08"},
     PHRASES: {lvl: 1, de: "Wie geht's?", en: "How are you?", tags: ["alltag"], added: "2026-11-08"},
   Optional on any entry: ex (example sentence), note.
   Topics (tags): see TOPICS below. Regular verb conjugations are generated automatically.
   ===================================================================== */
const TOPICS = {
  alltag: "Alltag & Smalltalk", zeit: "Zeit & Termine", menschen: "Menschen & Familie", gefuehle: "Gefühle & Beschreibung",
  wohnen: "Wohnen & Haushalt", essen: "Essen & Trinken", reisen: "Reisen & Verkehr", orte: "Stadt & Orte",
  natur: "Natur, Tiere & Wetter", arbeit: "Arbeit & Lernen", gesundheit: "Körper, Sport & Gesundheit", freizeit: "Freizeit & Hobbys"
};
const SMALL_GROUPS = {
  conn: "Verbindungswörter — weil, deshalb, stattdessen …", prep: "Präpositionen", zeit: "Zeit — wann? wie oft?",
  ort: "Ort & Richtung — wo? wohin?", menge: "Menge & Grad — wie viel?", satz: "Satzadverbien — leider, eigentlich …",
  pron: "Pronomen & Begleiter — jemand, beide …", frage: "Fragewörter", zahl: "Zahlen"
};
