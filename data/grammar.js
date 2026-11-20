// Grammar reference (in learning order). rules: {t: rule, ex: example, note}. ex: [German, English] example pairs.
const GRAMMAR = [
 {
  "id": "satz",
  "lvl": 1,
  "title": "Satzstellung — word order in main clauses",
  "intro": [
   "The conjugated verb is always in <b>position 2</b>. Everything else (infinitive, Partizip II, separable prefix) goes to the <b>end</b>.",
   "Time comes before place: <i>wann → wo / wohin</i>."
  ],
  "rules": [
   {
    "lvl": 3,
    "t": "um … zu → in order to",
    "ex": "Ich nehme den Zug, um nach Hause zu gehen.",
    "note": "\"um\" introduces the purpose clause; infinitive goes last with \"zu\""
   },
   {
    "lvl": 1,
    "t": "Modal verb sentences",
    "ex": "Ich muss ins Büro gehen. — modal verb conjugated, infinitive at end."
   },
   {
    "lvl": 1,
    "t": "Time before place (wann → wo / wohin)",
    "ex": "Wir sind für zwei Wochen nach Island geflogen. · Ich bin letzten November nach Argentinien gereist. · Am Freitag habe ich meinen Geburtstag gefeiert.",
    "note": "Put the time expression before the destination; for trips use fliegen/fahren/reisen, not gehen (= on foot)"
   },
   {
    "lvl": 2,
    "t": "werden + Infinitiv → future (will)",
    "ex": "Im Oktober werden wir zwei Wochen nach Peru reisen. · Wie alt bist du geworden?",
    "note": "werden (conjugated, position 2) + infinitive at the end = will / going to."
   },
   {
    "lvl": 1,
    "t": "Trennbare Verben → prefix goes to the end",
    "ex": "Ich lade die Gäste morgen Abend ein. · Ich stehe um 7 Uhr auf. · Ich bereite mein Frühstück vor. · Er fängt am Mittag an. (anfangen)",
    "note": "Separable verbs (einladen, aufräumen, aufstehen…) split in the present: verb in position 2, prefix at the end"
   },
   {
    "lvl": 1,
    "t": "und → verb stays in 2nd position",
    "ex": "Ich stehe um 8 Uhr auf und ich bereite mein Frühstück vor.",
    "note": "und (like aber, oder) does not change the word order: the clause after it keeps normal order with the verb in position 2. Compare ob / wenn / weil → verb at the end."
   },
   {
    "lvl": 3,
    "t": "nicht nur …, sondern auch …",
    "ex": "Padel ist nicht nur gesund, sondern auch lustig.",
    "note": "not only … but also. Put a comma before sondern."
   },
   {
    "lvl": 3,
    "t": "zu + Infinitiv (Es ist schön, … zu …; versuchen, … zu …)",
    "ex": "Es ist immer wunderbar, ihr hausgemachtes Abendessen zu essen. · Generell versuche ich, 10 km zu rennen. · Es ist einfach, Freunde zu werden. / Es ist sehr gut, den Tag so zu starten.",
    "note": "After 'Es ist schön/wunderbar/schwierig, …' put 'zu' + infinitive at the very end of the clause."
   },
   {
    "lvl": 2,
    "t": "am ersten Tag → time phrase in Dativ, then verb second",
    "ex": "Am ersten Tag sind wir sieben Stunden gefahren. / Am ersten Tag haben wir in einer schönen Hütte geschlafen.",
    "note": "say \"am ersten Tag\" (an + dem), not \"der erste Tag\"; after a time phrase the verb comes next"
   }
  ]
 },
 {
  "id": "neg",
  "lvl": 1,
  "title": "Negation — nicht & kein",
  "intro": [
   "<b>kein</b> negates a noun with ein/no article (kein Buch); <b>nicht</b> negates everything else."
  ],
  "ex": [
   [
    "Ich lese nicht.",
    "I don't read. (nicht = not)"
   ],
   [
    "Ich lese kein Buch.",
    "I don't read a book. (kein = no/not a)"
   ],
   [
    "Ich habe nicht gekocht.",
    "I didn't cook.",
    2
   ],
   [
    "Ich kann nicht kochen.",
    "I can't cook."
   ],
   [
    "Ich muss nicht kochen.",
    "I don't have to cook. (not the same as \"I can't\"!)"
   ],
   [
    "nicht mehr",
    "not anymore — Ich habe keine Probleme mehr."
   ],
   [
    "Ich habe dich nicht gesehen.",
    "I didn't see you.",
    2
   ]
  ],
  "rules": [
   {
    "lvl": 2,
    "t": "Imperativ: nicht goes to the end",
    "ex": "Bitte vergessen Sie Ihr Gepäck nicht.",
    "note": "In commands, \"nicht\" comes after the object, at the end of the sentence"
   }
  ]
 },
 {
  "id": "faelle",
  "lvl": 1,
  "title": "Fälle — Nominativ, Akkusativ, Dativ",
  "intro": [
   "Masculine articles change the most: der/ein (Nom.) → den/einen (Akk.) → dem/einem (Dat.).",
   "<b>mit, bei, zu, seit, von, aus, nach</b> always take the dative."
  ],
  "table": {
   "head": [
    "",
    "masc.",
    "fem.",
    "neut.",
    "plural"
   ],
   "rows": [
    [
     "Nominativ",
     "der / ein",
     "die / eine",
     "das / ein",
     "die / –"
    ],
    [
     "Akkusativ",
     "den / einen",
     "die / eine",
     "das / ein",
     "die / –"
    ],
    [
     "Dativ",
     "dem / einem",
     "der / einer",
     "dem / einem",
     "den / – (+n)"
    ]
   ]
  },
  "ex": [
   [
    "dich",
    "you (accusative) — Ich habe dich nicht gesehen."
   ],
   [
    "dir",
    "you (dative) — Carola hat es mir gesagt."
   ],
   [
    "einen Freund (Akk.)",
    "a friend — Ich spiele Tennis mit einem Freund. (Dat.)"
   ]
  ],
  "rules": [
   {
    "lvl": 1,
    "t": "einen Marathon laufen (Akkusativ)",
    "ex": "Letztes Jahr bin ich einen Halbmarathon gelaufen.",
    "note": "der Marathon is masculine, so the object takes einen (not \"ein\"). Same for: Ich möchte einen Marathon laufen."
   },
   {
    "lvl": 1,
    "t": "haben + Akkusativ: einen Bruder, eine Stadt",
    "ex": "Carola hat einen Bruder. Sie haben einen Hund und zwei Katzen.",
    "note": "The object of 'haben' is accusative, so masculine ein → einen (not 'eine Bruder'). Feminine stays eine: eine kleine Stadt (not 'ein kleine Stadt')."
   }
  ]
 },
 {
  "id": "poss",
  "lvl": 1,
  "title": "Possessivartikel — mein, dein, sein …",
  "intro": [
   "The ending depends on the thing owned (its gender and case), not on the owner."
  ],
  "ex": [
   [
    "mein / meine",
    "my"
   ],
   [
    "dein / deine",
    "your (informal)"
   ],
   [
    "sein / seine",
    "his"
   ],
   [
    "ihr / ihre",
    "her / their"
   ],
   [
    "unser / unsere",
    "our"
   ],
   [
    "euer / eure",
    "your (plural)"
   ]
  ],
  "rules": [
   {
    "lvl": 1,
    "t": "ihr (her) takes the noun's gender: ihr Vater / ihre Mutter",
    "ex": "Ihr Vater heisst Carlo. Ihre Mutter heisst Claudia.",
    "note": "The ending depends on the thing owned, not the owner: der Vater → ihr (not 'ihre'), die Mutter → ihre."
   }
  ]
 },
 {
  "id": "prep",
  "lvl": 1,
  "title": "Präpositionen",
  "auto": "preps",
  "intro": [
   "All prepositions are listed in <b>Kleine Wörter → Präpositionen</b> too. Rules and contractions:"
  ],
  "rules": [
   {
    "lvl": 1,
    "t": "in + dem = im (Dativ)",
    "ex": "Ich bin im Supermarkt.",
    "note": "in + dative masculine/neuter article contracts to im (where? → dative)."
   },
   {
    "lvl": 2,
    "t": "auf dem Foto (not \"in dem Foto\")",
    "ex": "Auf dem ersten Foto sieht man einen Schwan.",
    "note": "For photos and pictures German uses auf + Dativ."
   },
   {
    "lvl": 3,
    "t": "zu + adjective + zum + Infinitiv-Nomen",
    "ex": "Es war zu heiss zum Wandern.",
    "note": "\"too … for doing X\": zum + infinitive used as a noun (capitalised)."
   },
   {
    "lvl": 1,
    "t": "in das → ins",
    "ex": "Ich gehe ins Kino. / Er muss ins Krankenhaus.",
    "note": "in + das (neuter, direction/Akkusativ) contracts to \"ins\""
   },
   {
    "lvl": 2,
    "t": "vor + Dativ (time) → ago / before",
    "ex": "Ich habe meine Schwester vor zwei Monaten gesehen.",
    "note": "vor + amount of time = ago (vor zwei Monaten); vor + event = before (vor Weihnachten). Dative plural adds -n: Monaten, Wochen."
   },
   {
    "lvl": 3,
    "t": "wegen (+ Genitiv; spoken: + Dativ)",
    "ex": "wegen des Konzerts / wegen dem Konzert; wegen der Suche",
    "note": "because of. Written German uses the genitive; in everyday speech the dative is very common."
   }
  ]
 },
 {
  "id": "perfekt",
  "lvl": 2,
  "title": "Perfekt & Partizip II",
  "auto": "participles",
  "intro": [
   "Structure: <b>haben/sein (conjugated, position 2) + Partizip II (end)</b>. Used for the past in spoken German.",
   "<b>sein</b> for movement and change of state (gehen, fahren, aufstehen, sterben …) plus sein, werden, bleiben. <b>haben</b> for everything else, including reflexive verbs.",
   "<b>Regular:</b> ge- + stem + -t (gemacht, gefragt; stem in -d/-t → -et: geredet, geachtet).",
   "<b>Separable:</b> prefix + ge + stem + t (abgesetzt, aufgeräumt). <b>Inseparable (be-, ver-, ent-, er-, zer-, über-) and -ieren:</b> no ge- (beantragt, studiert, telefoniert).",
   "<b>Irregular:</b> ge- + (changed) stem + -en (geschrieben, getrunken, gegangen) — must be memorised."
  ],
  "rules": [
   {
    "lvl": 2,
    "t": "Ich habe einen Film gesehen.",
    "ex": "I watched a film. (haben + gesehen)"
   },
   {
    "lvl": 2,
    "t": "Ich bin zur Arbeit gegangen.",
    "ex": "I went to work. (sein + gegangen)"
   },
   {
    "lvl": 2,
    "t": "Hast du gut geschlafen?",
    "ex": "Did you sleep well? (haben moves to position 1 in questions)"
   },
   {
    "lvl": 2,
    "t": "wandern gehen → sind wandern gegangen",
    "ex": "Wir sind wandern gegangen.",
    "note": "With gehen + infinitive, the activity stays as an infinitive and gehen becomes gegangen (with sein)."
   },
   {
    "lvl": 2,
    "t": "Reflexive verbs in Perfekt: hat sich …",
    "ex": "Die Nachbarin hat sich beschwert. / Das Kind hat sich entschuldigt.",
    "note": "Reflexive verbs take haben; sich comes right after the auxiliary."
   }
  ]
 },
 {
  "id": "adj",
  "lvl": 2,
  "title": "Adjektivendungen",
  "intro": [
   "After der/die/das (nominative) → <b>-e</b>. After ein-words the adjective shows the gender: ein leckeres Essen, ein schöner Tag. In the dative → <b>-en</b>. No article: the adjective takes the article's ending (besseren Wein, niedrige Preise)."
  ],
  "ex": [
   [
    "Die freundliche Frau",
    "the friendly woman (-e ending)"
   ],
   [
    "Der hilfsbereite Mann",
    "the helpful man (-e ending)"
   ],
   [
    "Das war ein leckeres Essen.",
    "That was a tasty meal (-es with neuter das-word)"
   ],
   [
    "Wir haben eine sehr schöne Wanderung gemacht.",
    "very beautiful hike (-e ending)"
   ],
   [
    "Es war eine spannende Reise.",
    "It was an exciting trip. (eine + -e)"
   ],
   [
    "Reykjavík ist eine sehr schöne Stadt.",
    "Reykjavík is a very beautiful city. (eine + -e)"
   ],
   [
    "Wir waren in einem kleinen Airbnb.",
    "We were in a small Airbnb — in + Dativ (location): einem + adjective -en"
   ],
   [
    "Ich bezahle oft niedrige Preise.",
    "I often pay low prices (plural, no article → -e)"
   ],
   [
    "Du kannst hier besseren Wein finden.",
    "You can find better wine here (masculine accusative, no article → -en)",
    3
   ]
  ]
 },
 {
  "id": "komp",
  "lvl": 2,
  "title": "Komparativ & Superlativ",
  "auto": "comparatives",
  "intro": [
   "Pattern: <b>Grundform → -er (als) → am -sten</b>. Short adjectives often add an umlaut: kalt → kälter, gross → grösser.",
   "Comparison: <i>besser als</i> (better than) · <i>genauso gut wie</i> (just as good as)."
  ],
  "rules": [
   {
    "lvl": 2,
    "t": "(nicht) so + Adjektiv + wie",
    "ex": "Es ist nicht so teuer wie in der Schweiz.",
    "note": "(not) as … as. Use the base adjective (no -er) with so … wie; use the comparative with als (teurer als)."
   },
   {
    "lvl": 2,
    "t": "Komparativ + als → than",
    "ex": "Heute ist es heisser als am Donnerstag. / Es ist kälter als gestern. · Galaxus ist schneller als Amazon. Amazon ist fast immer viel teurer als Galaxus.",
    "note": "Add -er to the adjective and use 'als' for 'than'. Short adjectives often take an umlaut: kalt → kälter, gross → grösser."
   },
   {
    "lvl": 2,
    "t": "Superlativ: am …-(e)sten → the most",
    "ex": "Galaxus ist am schnellsten.",
    "note": "After 'sein' (no noun), the superlative is am + adjective + -sten (am niedrigsten, am schnellsten)."
   }
  ]
 },
 {
  "id": "ord",
  "lvl": 1,
  "title": "Ordinalzahlen",
  "intro": [
   "1–19: number + -te (zweite, vierte; irregular: erste, dritte). From 20: + -ste (zwanzigste)."
  ],
  "ex": [
   [
    "erste/r (1.)",
    "first — der erste Januar"
   ],
   [
    "zweite/r (2.)",
    "second"
   ],
   [
    "dritte/r (3.)",
    "third"
   ],
   [
    "vierte (4.)",
    "fourth"
   ],
   [
    "fünfte (5.)",
    "fifth"
   ]
  ],
  "rules": [
   {
    "lvl": 2,
    "t": "am ersten / zweiten / letzten Tag",
    "ex": "Am zweiten Tag sind wir nach Sinaia gefahren.",
    "note": "\"On the first/second/last day\" = am + ordinal + -en (not \"Der zweite Tag sind wir…\"). der erste Tag = the first day."
   }
  ]
 },
 {
  "id": "neben",
  "lvl": 2,
  "title": "Nebensätze — verb at the end",
  "intro": [
   "<b>weil, dass, ob, wenn, als, damit</b>, relative pronouns and question words send the conjugated verb to the end.",
   "<b>und, aber, oder, denn, sondern</b> do not change the word order.",
   "If the sentence starts with the side clause, the main clause starts with its verb: <i>Wenn das Wetter schön ist, <b>gehe</b> ich joggen.</i>"
  ],
  "rules": [
   {
    "lvl": 2,
    "t": "weil → verb goes to end",
    "ex": "Mein Freund kauft Sachen in Italien, weil alles günstiger dort ist.",
    "note": "\"because\" triggers verb-final word order in the clause"
   },
   {
    "lvl": 2,
    "t": "Ich denke, … → normal word order (without dass)",
    "ex": "Ich denke, er ist aus Italien. / Ich denke, dass er aus Italien ist.",
    "note": "Without \"dass\" the verb stays in position 2; with \"dass\" it goes to the end"
   },
   {
    "lvl": 2,
    "t": "weil → verb at the end, even after 'nicht' + adjective",
    "ex": "…, weil Amazon und eBay in der Schweiz nicht beliebt sind.",
    "note": "Correction from the homework: in a weil-clause 'sind' goes last (not 'weil Amazon … nicht beliebt in der Schweiz sind')."
   },
   {
    "lvl": 2,
    "t": "dass → verb goes to the end",
    "ex": "Ich hoffe, dass die Sonne morgen scheinen wird. · Die Nachbarin hat sich beschwert, dass die Musik zu laut ist. · Island ist so wunderschön, dass das Fahren nicht langweilig ist.",
    "note": "\"that\" sends the conjugated verb to the end (like weil). Without dass, normal order: Ich hoffe, die Sonne wird morgen scheinen."
   },
   {
    "lvl": 2,
    "t": "ob → verb goes to the end",
    "ex": "Sie hat gefragt, ob sie die Musik leiser machen kann. · Ich bin mir nicht sicher, ob ich den Anschlusszug erreiche. · Kannst du mir sagen, ob du morgen Zeit hast?",
    "note": "\"whether/if\" in indirect yes/no questions; the conjugated (modal) verb goes last."
   },
   {
    "lvl": 3,
    "t": "Relativsatz (der / die / das) → verb goes to the end",
    "ex": "Die Person, die dort lebt, muss die Wohnung aufräumen. / Der Mann, der dort lebt. / Meine Schwester, die mich besuchen kommt. · Das ist einer der besten Filme, die ich gesehen habe. · Die erste Stadt, die wir gesehen haben, war Lima.",
    "note": "\"who/that\": the pronoun matches the noun's gender (der Mann → der, die Person → die); the verb goes to the end of the relative clause"
   },
   {
    "lvl": 2,
    "t": "wenn → verb goes to the end",
    "ex": "Wenn ich mit meiner Arbeit fertig bin, gehe ich ins Fitnessstudio. · Er ist sehr lustig, wenn er nicht müde ist. / Sie ist immer glücklich, wenn wir sie besuchen.",
    "note": "In the wenn-clause the conjugated verb goes last (not \"Wenn ich bin fertig…\"). If the sentence starts with the wenn-clause, the main clause starts with its verb: \"…, gehe ich…\"."
   },
   {
    "lvl": 3,
    "t": "als (when, one event in the past) → verb goes to the end",
    "ex": "Als wir nach Hause gekommen sind, waren wir sehr müde. · Als ich jünger war, war es sehr normal, in die Kirche zu gehen.",
    "note": "'als' = 'when' for a single event in the past; it sends the verb to the end of its clause. (als also means 'as' and 'than'.)"
   },
   {
    "lvl": 3,
    "t": "Nebensatz first → main clause starts with the verb",
    "ex": "Als meine Freunde zum Flughafen gefahren sind, haben Carola und ich einen Film gesehen. · Wenn das Wetter schön ist, gehe ich joggen. · Wenn ich einen Marathon rennen möchte, dann muss ich länger rennen.",
    "note": "After a side clause the conjugated verb comes first in the main clause — and only once (not 'haben Carola und ich haben'). Also: einen Film (der Film, Akkusativ)."
   },
   {
    "lvl": 3,
    "t": "Indirect question (was / wie / wo …) → verb goes to the end",
    "ex": "Erzähl mir, was du am Wochenende machst.",
    "note": "A question word inside a sentence works like 'weil': the conjugated verb moves to the end."
   },
   {
    "lvl": 3,
    "t": "damit → verb goes to the end",
    "ex": "Sie brauchen am Morgen Koffein, damit sie richtig wach werden.",
    "note": "damit = so that; the verb goes to the end. Use um … zu instead when both clauses have the same subject."
   },
   {
    "lvl": 2,
    "t": "weil + Modalverb → modal verb goes last",
    "ex": "Es war sehr schön, weil wir die Sterne sehen konnten. / … weil ich morgen früh arbeiten muss.",
    "note": "in a weil clause the conjugated modal goes after the infinitive, at the very end"
   }
  ]
 },
 {
  "id": "verw",
  "lvl": 2,
  "title": "Leicht verwechselt — easily confused",
  "intro": [
   "Pairs that are easy to mix up."
  ],
  "rules": [
   {
    "lvl": 1,
    "t": "fahren vs. gehen",
    "ex": "Danach sind wir nach Brașov gefahren.",
    "note": "Use fahren when travelling by car/train/bus; gehen means going on foot. Both take sein in the Perfekt."
   },
   {
    "lvl": 2,
    "t": "kennen vs. kennenlernen",
    "ex": "Ich habe sie nicht gekannt. Ich habe sie auf der Reise kennengelernt.",
    "note": "kennen = already know someone; kennenlernen = meet / get to know for the first time"
   },
   {
    "lvl": 1,
    "t": "kennen vs. wissen",
    "ex": "Kennst du Biella? / Weisst du, ob sie kommt?",
    "note": "kennen = to be familiar with a person/place (Spanish conocer); wissen = to know a fact, often + dass/ob (Spanish saber)"
   },
   {
    "lvl": 3,
    "t": "\"if\" = ob (whether) vs. wenn (condition)",
    "ex": "Kannst du mir sagen, ob du Zeit hast? · Kannst du mir sagen, wie ich nach Zürich komme, wenn du Zeit hast?",
    "note": "Use ob when \"if\" means \"whether\" (a yes/no question). Use wenn when \"if\" sets a condition."
   },
   {
    "lvl": 2,
    "t": "wann (when?) vs. wenn (if / whenever)",
    "ex": "Ich sage dir, wann ich mit der Arbeit fertig bin.",
    "note": "wann asks about a point in time (direct or indirect question). wenn = if / whenever. Both send the verb to the end in a subordinate clause."
   },
   {
    "lvl": 2,
    "t": "anrufen vs. telefonieren",
    "ex": "Ich rufe dich an. / Ich telefoniere mit dir.",
    "note": "anrufen = to make a call; telefonieren = to be having a call"
   },
   {
    "lvl": 2,
    "t": "sich freuen auf vs. über",
    "ex": "Ich freue mich auf Peru. / Ich habe mich über deine E-Mail gefreut.",
    "note": "auf = something in the future; über = something that already happened"
   },
   {
    "lvl": 2,
    "t": "nicht müssen vs. nicht dürfen",
    "ex": "Ich muss nicht kochen. / Er darf nicht rauchen.",
    "note": "nicht müssen = don't have to; nicht dürfen = not allowed to"
   }
  ]
 }
];
