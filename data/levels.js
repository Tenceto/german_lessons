/* =====================================================================
   LEVELS — every entry in the other data files has lvl: 1 (A1), 2 (A2) or 3 (B1).
   An entry without lvl still appears under "Alle Stufen" and is flagged on the start page.
   Grammar: each chapter has a lvl (where its intro/table is shown) and each rule its own lvl;
   an ex pair can carry a third value to override the chapter level: ["Satz", "sentence", 2].
   ===================================================================== */
const LEVELS = {
  1: { code: "A1", name: "Grundlagen", en: "Very basic", color: "#0f8a7e", light: "#e6f6f4",
       blurb: "Greetings, numbers and time, everyday nouns, the present tense and the most common verbs." },
  2: { code: "A2", name: "Alltag", en: "Basic", color: "#2563eb", light: "#eff4ff",
       blurb: "Talking about your week and your trips: Perfekt, dass/weil/wenn, comparisons, everyday topics." },
  3: { code: "B1", name: "Mittelstufe", en: "Intermediate", color: "#7c3aed", light: "#f3efff",
       blurb: "Connectors, um … zu, relative clauses, and words for opinions, feelings and abstract topics." }
};

// "Hier anfangen": suggested order per level. [tab, filter, label]
// tab: words (filter = topic) · phrases (topic) · small (group) · verbs (verb filter) · grammar (chapter id)
// Steps with nothing at that level are hidden automatically.
const START_HERE = {
  1: [
    ["phrases", "alltag", "Begrüssen & Smalltalk"],
    ["small", "zahl", "Zahlen"],
    ["verbs", "modal", "sein, haben & Modalverben"],
    ["grammar", "satz", "Satzstellung: Verb auf Position 2"],
    ["grammar", "faelle", "der / die / das & Akkusativ"],
    ["small", "frage", "Fragewörter"],
    ["phrases", "zeit", "Uhrzeit & Termine"],
    ["grammar", "neg", "nicht & kein"],
    ["words", "essen", "Essen & Trinken"]
  ],
  2: [
    ["grammar", "perfekt", "Perfekt: Ich habe … gemacht"],
    ["verbs", "sein", "Perfekt mit sein"],
    ["small", "zeit", "Zeit — wann? wie oft?"],
    ["grammar", "neben", "weil, dass, wenn: Verb am Ende"],
    ["grammar", "komp", "Komparativ & Superlativ"],
    ["words", "reisen", "Reisen & Verkehr"],
    ["grammar", "adj", "Adjektivendungen"],
    ["verbs", "refl", "Reflexive Verben"]
  ],
  3: [
    ["small", "conn", "Verbindungswörter"],
    ["grammar", "satz", "um … zu & zu + Infinitiv"],
    ["grammar", "neben", "Relativsätze, als, damit"],
    ["grammar", "verw", "Leicht verwechselt"],
    ["phrases", "gefuehle", "Gefühle & Meinungen"],
    ["words", "gefuehle", "Gefühle & Beschreibung"]
  ]
};
