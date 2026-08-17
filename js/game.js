const Game = (() => {
  const XP = { lesson: 12, check: 36, checkRetake: 8, badge: 10, lab: 6 };
  const RANKS = [
    {
      min: 0,
      name: "Syntax tourist",
      blurb: "Loops work. Shipping is still a rumor.",
    },
    {
      min: 36,
      name: "Tutorial ghost",
      blurb: "You've seen the words. Time to attach them to an app.",
    },
    {
      min: 96,
      name: "Map reader",
      blurb: "Spec, noun, verbs, layers. Costumes come after.",
    },
    {
      min: 180,
      name: "CRUD adventurer",
      blurb: "You can move records on purpose.",
    },
    {
      min: 300,
      name: "Stack literate",
      blurb: "You can say Controller without sweating.",
    },
    {
      min: 430,
      name: "Builder",
      blurb: "You start from data and verbs. Frameworks are optional hats.",
    },
  ];

  const BADGES = [
    { id: "first_quest", name: "First blood", hint: "Finish any quest step" },
    { id: "arena", name: "Walked in", hint: "Finish a placement run" },
    {
      id: "cartographer",
      name: "Cartographer",
      hint: "Clear The Map (how apps are built)",
    },
    { id: "page_smith", name: "Page smith", hint: "Clear HTML" },
    { id: "stylist", name: "Stylist", hint: "Clear CSS" },
    { id: "hands", name: "Live hands", hint: "Clear JavaScript" },
    { id: "operator", name: "Operator", hint: "Clear HTTP / APIs" },
    { id: "dungeon", name: "Dungeon clear", hint: "Clear CRUD + REST" },
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

  function hud() {
    const s = Store.get();
    const xp = s.xp || 0;
    const r = rankFor(xp);
    const n = nextRank(xp);
    const lo = r.min;
    const hi = n ? n.min : lo + 1;
    const pct = n
      ? Math.min(100, Math.round(((xp - lo) / (hi - lo)) * 100))
      : 100;
    return {
      xp,
      rank: r,
      next: n,
      pct,
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
    if (fresh) {
      addXp(XP.badge);
      toast("Badge: " + spec.name, "loot");
    }
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

  function lessonWin(lessonId, wordIds) {
    const first = !Store.isDone(lessonId);
    Store.complete(lessonId, wordIds);
    const combo = bumpCombo(true);
    let xp = 0;
    if (first) xp = addXp(XP.lesson);
    syncBadges();
    if (first && xp) toast("+" + xp + " XP · quest step", "xp");
    if (combo >= 3) toast("Combo x" + combo, "combo");
    return { first, xp, combo };
  }

  function hit(ok) {
    if (!ok) {
      bumpCombo(false);
      return 0;
    }
    const combo = bumpCombo(true);
    if (combo >= 3) toast("Combo x" + combo, "combo");
    return combo;
  }

  function checkDone(alreadyHad) {
    const xp = addXp(alreadyHad ? XP.checkRetake : XP.check);
    syncBadges();
    toast("+" + xp + " XP · placement", "xp");
    return xp;
  }

  function labPost() {
    let first = false;
    Store.update((s) => {
      if (!s.labPosts) first = true;
      s.labPosts = (s.labPosts || 0) + 1;
      return s;
    });
    if (first) {
      addXp(XP.lab);
      toast("+" + XP.lab + " XP · you touched the dungeon", "xp");
    }
    syncBadges();
  }

  return {
    XP,
    RANKS,
    BADGES,
    toast,
    hud,
    rankFor,
    lessonWin,
    checkDone,
    hit,
    labPost,
    syncBadges,
    trackClear,
  };
})();
