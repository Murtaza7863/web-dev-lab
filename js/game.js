const Game = (() => {
  const XP = { lesson: 12, check: 36, checkRetake: 8, badge: 10, lab: 6 };
  const RANKS = [
    {
      min: 0,
      name: "Just starting",
      blurb: "You can write Java. A page is next.",
    },
    {
      min: 36,
      name: "Showed a tag",
      blurb: "The browser drew something you wrote.",
    },
    {
      min: 96,
      name: "Made it pretty",
      blurb: "HTML plus a little CSS.",
    },
    {
      min: 180,
      name: "Made a click",
      blurb: "A button that does something.",
    },
    {
      min: 300,
      name: "Can name the pieces",
      blurb: "Input, rules, memory, screen — in English.",
    },
    {
      min: 430,
      name: "Builder",
      blurb: "You can point at the words instead of fearing them.",
    },
  ];

  const BADGES = [
    { id: "first_quest", name: "First step", hint: "Finish any lesson" },
    { id: "arena", name: "Took the quiz", hint: "Finish the optional quiz" },
    {
      id: "window",
      name: "Opened the window",
      hint: "Finish First steps",
    },
    {
      id: "cartographer",
      name: "Named the pieces",
      hint: "Clear The Pieces",
    },
    { id: "page_smith", name: "Page smith", hint: "Clear HTML" },
    { id: "stylist", name: "Stylist", hint: "Clear CSS" },
    { id: "hands", name: "Live hands", hint: "Clear JavaScript" },
    { id: "operator", name: "Operator", hint: "Clear HTTP / APIs" },
    {
      id: "dungeon",
      name: "Four jobs",
      hint: "Clear add / list / change / delete",
    },
    { id: "spring_tongue", name: "Spring tongue", hint: "Clear Spring Boot" },
    { id: "pocket", name: "Pocket app", hint: "Clear PWA" },
    { id: "lab_rat", name: "Lab rat", hint: "POST something in the Lab" },
    { id: "loot_10", name: "Pocket glossary", hint: "Unlock 10 words" },
    { id: "combo_5", name: "On a tear", hint: "5 correct in a row" },
    { id: "builder", name: "Can build it", hint: "Clear every quest" },
  ];

  const host = () => {
    let el = document.getElementById("toasts");
    if (!el) {
      el = document.createElement("div");
      el.id = "toasts";
      el.className = "toasts";
      document.body.appendChild(el);
    }
    return el;
  };

  function toast(text, kind) {
    const el = document.createElement("div");
    el.className = "toast" + (kind ? " " + kind : "");
    el.textContent = text;
    host().appendChild(el);
    setTimeout(() => el.classList.add("show"), 10);
    setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => el.remove(), 250);
    }, 2200);
  }

  function rankFor(xp) {
    let r = RANKS[0];
    for (const x of RANKS) if (xp >= x.min) r = x;
    return r;
  }

  function nextRank(xp) {
    const r = rankFor(xp);
    const i = RANKS.indexOf(r);
    return RANKS[i + 1] || null;
  }

  function progress() {
    const all = (window.LEARN_TRACKS || []).flatMap((t) => t.lessons || []);
    const total = all.length;
    const done = all.filter((l) => Store.isDone(l.id)).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    return { done, total, pct };
  }

  function hud() {
    const s = Store.get();
    const xp = s.xp || 0;
    const r = rankFor(xp);
    const n = nextRank(xp);
    const p = progress();
    return {
      xp,
      rank: r,
      next: n,
      pct: p.pct,
      done: p.done,
      total: p.total,
      combo: s.combo || 0,
      best: s.bestCombo || 0,
    };
  }

  function addXp(amount) {
    let gained = 0;
    Store.update((s) => {
      s.xp = (s.xp || 0) + amount;
      gained = amount;
      return s;
    });
    return gained;
  }

  function bumpCombo(ok) {
    let combo = 0;
    Store.update((s) => {
      s.combo = ok ? (s.combo || 0) + 1 : 0;
      s.bestCombo = Math.max(s.bestCombo || 0, s.combo || 0);
      combo = s.combo || 0;
      return s;
    });
    return combo;
  }

  function awardBadge(id) {
    const spec = BADGES.find((b) => b.id === id);
    if (!spec) return false;
    let fresh = false;
    Store.update((s) => {
      s.badges = s.badges || {};
      if (!s.badges[id]) {
        s.badges[id] = Date.now();
        fresh = true;
      }
      return s;
    });
    if (fresh) addXp(XP.badge);
    return fresh;
  }

  function trackClear(trackId) {
    const t = (window.LEARN_TRACKS || []).find((x) => x.id === trackId);
    if (!t) return false;
    return t.lessons.every((l) => Store.isDone(l.id));
  }

  function syncBadges() {
    const s = Store.get();
    const doneN = Object.keys(s.completed || {}).length;
    const wordN = Object.keys(s.words || {}).length;
    const all = (window.LEARN_TRACKS || []).flatMap((t) => t.lessons);
    if (doneN >= 1) awardBadge("first_quest");
    if (s.check) awardBadge("arena");
    if (trackClear("start")) awardBadge("window");
    if (trackClear("swe")) awardBadge("cartographer");
    if (trackClear("html")) awardBadge("page_smith");
    if (trackClear("css")) awardBadge("stylist");
    if (trackClear("js")) awardBadge("hands");
    if (trackClear("http")) awardBadge("operator");
    if (trackClear("crud")) awardBadge("dungeon");
    if (trackClear("spring")) awardBadge("spring_tongue");
    if (trackClear("pwa")) awardBadge("pocket");
    if (s.labPosts) awardBadge("lab_rat");
    if (wordN >= 10) awardBadge("loot_10");
    if ((s.bestCombo || 0) >= 5) awardBadge("combo_5");
    if (all.length && all.every((l) => Store.isDone(l.id)))
      awardBadge("builder");
  }

  function lessonSkip(lessonId, wordIds) {
    const first = !Store.isDone(lessonId);
    Store.complete(lessonId, wordIds);
    bumpCombo(false);
    syncBadges();
    return { first, xp: 0, combo: 0, skipped: true };
  }

  function lessonWin(lessonId, wordIds) {
    const first = !Store.isDone(lessonId);
    Store.complete(lessonId, wordIds);
    const combo = bumpCombo(true);
    let xp = 0;
    if (first) xp = addXp(XP.lesson);
    syncBadges();
    return { first, xp, combo };
  }

  function hit(ok) {
    if (!ok) {
      bumpCombo(false);
      return 0;
    }
    return bumpCombo(true);
  }

  function checkDone(alreadyHad) {
    const xp = addXp(alreadyHad ? XP.checkRetake : XP.check);
    syncBadges();
    return xp;
  }

  function labPost() {
    let first = false;
    Store.update((s) => {
      if (!s.labPosts) first = true;
      s.labPosts = (s.labPosts || 0) + 1;
      return s;
    });
    if (first) addXp(XP.lab);
    syncBadges();
  }

  return {
    XP,
    RANKS,
    BADGES,
    toast,
    hud,
    progress,
    rankFor,
    lessonWin,
    lessonSkip,
    checkDone,
    hit,
    labPost,
    syncBadges,
    trackClear,
  };
})();
