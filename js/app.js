(() => {
  const TRACK_ORDER = [
    "swe",
    "html",
    "css",
    "js",
    "http",
    "crud",
    "spring",
    "pwa",
  ];
  const ICONS = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 10.5 12 4l8 6.5V20H4z"/><path d="M9 20v-6h6v6"/></svg>',
    learn:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19V6l8-3 8 3v13"/><path d="M12 3v16"/><path d="M4 19c2 1 4 1.5 8 1.5S18 20 20 19"/></svg>',
    lab: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 12h5M8 15h6"/></svg>',
    words:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/><path d="M8 12h8M12 8c2 2 2 6 0 8M12 8c-2 2-2 6 0 8"/></svg>',
  };

  let deferredInstall = null;
  let checkAnswers = [];
  let checkTimer = 0;
  let checkScored = false;
  let unsubLab = null;

  const app = document.getElementById("app");

  function esc(s) {
    return String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  }

  function tracks() {
    const list = window.LEARN_TRACKS || [];
    return TRACK_ORDER.map((id) => list.find((t) => t.id === id)).filter(
      Boolean,
    );
  }

  function parseRoute() {
    const raw = (location.hash || "#/").replace(/^#/, "") || "/";
    const parts = raw.split("/").filter(Boolean);
    if (!parts.length) return { name: "home" };
    if (parts[0] === "check") {
      if (parts[1] === "done") return { name: "check-done" };
      const q = parseInt(parts[1], 10);
      if (Number.isFinite(q) && q > 0) return { name: "check", q };
      return { name: "check", q: 1 };
    }
    if (parts[0] === "lab") return { name: "lab" };
    if (parts[0] === "words") return { name: "words" };
    if (parts[0] === "learn" && parts[1] && parts[2]) {
      return { name: "lesson", trackId: parts[1], lessonId: parts[2] };
    }
    if (parts[0] === "learn" && parts[1])
      return { name: "track", trackId: parts[1] };
    if (parts[0] === "learn") return { name: "learn" };
    return { name: "home" };
  }

  function shell(tab, inner) {
    const g = Game.hud();
    const combo =
      g.combo >= 2
        ? `<span class="combo" title="correct in a row">x${g.combo}</span>`
        : "";
    return `
      <header class="app-top">
        <a class="brand" href="#/"><span class="mark" aria-hidden="true"></span>Web Dev <em>Lab</em></a>
        <div class="grow"></div>
        ${combo}
        <div class="hud" title="${esc(g.rank.blurb)}">
          <span class="hud-rank">${esc(g.rank.name)}</span>
          <div class="progress-mini"><i style="width:${g.pct}%"></i></div>
          <span class="hud-xp">${g.xp} XP</span>
        </div>
      </header>
      <main class="wrap">${inner}</main>
      <nav class="botnav">
        <a href="#/" class="${tab === "home" ? "on" : ""}">${ICONS.home}Home</a>
        <a href="#/learn" class="${tab === "learn" ? "on" : ""}">${ICONS.learn}Quests</a>
        <a href="#/lab" class="${tab === "lab" ? "on" : ""}">${ICONS.lab}Lab</a>
        <a href="#/words" class="${tab === "words" ? "on" : ""}">${ICONS.words}Loot</a>
      </nav>`;
  }

  function pipelineStrip(activeId) {
    const stages = window.PIPELINE || [];
    const cur = stages.find((s) => s.id === activeId);
    const steps = stages
      .map((s) => {
        const on = s.id === activeId ? "on" : "";
        return `<a class="pipe-step ${on}" href="#/learn/${s.id}" title="${esc(s.because)}"><b>${esc(s.layer)}</b><span>${esc(s.quest)}</span></a>`;
      })
      .join("");
    const idx = stages.findIndex((s) => s.id === activeId);
    const prevS = idx > 0 ? stages[idx - 1] : null;
    const why = cur
      ? `<p class="pipe-why">${
          prevS ? `<strong>Back:</strong> ${esc(prevS.quest)}. ` : ""
        }<strong>This layer:</strong> ${esc(cur.because)}${
          cur.next ? ` <strong>Next:</strong> ${esc(cur.next)}` : ""
        }</p>`
      : "";
    return `<div class="pipe">${steps}</div>${why}`;
  }

  function nextTrack(trackId) {
    const i = TRACK_ORDER.indexOf(trackId);
    if (i < 0) return null;
    return tracks()[i + 1] || null;
  }

  function prevTrack(trackId) {
    const i = TRACK_ORDER.indexOf(trackId);
    if (i <= 0) return null;
    return tracks()[i - 1] || null;
  }

  function flatSteps() {
    return tracks().flatMap((t) =>
      t.lessons.map((l) => ({ track: t, lesson: l })),
    );
  }

  function neighbors(trackId, lessonId) {
    const list = flatSteps();
    const i = list.findIndex(
      (s) => s.track.id === trackId && s.lesson.id === lessonId,
    );
    return {
      prev: i > 0 ? list[i - 1] : null,
      next: i >= 0 && i < list.length - 1 ? list[i + 1] : null,
    };
  }

  function lessonHref(step) {
    return `#/learn/${step.track.id}/${step.lesson.id}`;
  }

  function questName(t) {
    return t.quest || t.title;
  }

  function nextQuest() {
    for (const t of tracks()) {
      const lesson = t.lessons.find((l) => !Store.isDone(l.id));
      if (lesson) return { track: t, lesson };
    }
    return null;
  }

  function renderBadges() {
    const got = Store.get().badges || {};
    return `<div class="badge-row">${Game.BADGES.map(
      (b) =>
        `<span class="mini-badge ${got[b.id] ? "on" : ""}" title="${esc(b.hint)}">${esc(b.name)}</span>`,
    ).join("")}</div>`;
  }

  function renderHome() {
    const check = Store.get().check;
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const mac = /macintosh/i.test(navigator.userAgent);
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      navigator.standalone;
    const showInstall = !standalone && !Store.get().hintDismissed;
    const how = ios
      ? "Share → Add to Home Screen. Then it works like an app, offline included."
      : mac
        ? "Chrome/Edge: Install in the address bar (or the button). Safari: File → Add to Dock. Opens as a laptop window."
        : "Chrome/Edge on a laptop: Install in the address bar (or the button). Phone: browser menu → Add to Home Screen. Lessons cache offline.";

    let install = "";
    if (showInstall) {
      install = `
        <div class="install-banner" id="install-banner">
          <div>
            <strong>Phone or laptop.</strong>
            ${how}
          </div>
          <div class="row" style="margin:0">
            ${deferredInstall ? '<button class="btn" id="install-btn">Install</button>' : ""}
            <button class="btn ghost" id="dismiss-install">Later</button>
          </div>
        </div>`;
    }

    const nq = nextQuest();
    const last = Store.get().last;
    let lastLink = "";
    if (last && last.trackId && last.lessonId) {
      const lt = tracks().find((x) => x.id === last.trackId);
      const ll = lt && lt.lessons.find((x) => x.id === last.lessonId);
      if (ll && (!nq || nq.lesson.id !== ll.id)) {
        lastLink = `<a class="btn ghost" href="#/learn/${last.trackId}/${last.lessonId}">Back to: ${esc(ll.title)}</a>`;
      }
    }
    const g = Game.hud();
    app.innerHTML = shell(
      "home",
      `
      ${install}
      <section class="hero">
        <span class="badge">${esc(g.rank.name)}</span>
        <h1>You can code. This is how you build.</h1>
        <p>Loops and classes are ammo. An app is input → rules → store → output. Your CLI already is one. The quests name the web costumes (HTML, APIs, Spring) so you stop vibe-coding words you can't point at.</p>
        <div class="row">
          <a class="btn" href="#/check/1" id="start-check">${check ? "Retake placement" : "Placement run"}</a>
          ${
            nq
              ? `<a class="btn ghost" href="#/learn/${nq.track.id}/${nq.lesson.id}">Next: ${esc(nq.lesson.title)}</a>`
              : `<a class="btn ghost" href="#/lab">Dungeon is open</a>`
          }
          ${lastLink}
        </div>
      </section>
      ${
        nq
          ? `<a class="card next-quest" href="#/learn/${nq.track.id}/${nq.lesson.id}">
              <div class="demo-label">Current quest</div>
              <h3>${esc(questName(nq.track))} · ${esc(nq.lesson.title)}</h3>
              <p>${esc(nq.track.blurb)}</p>
              <div class="meta">+${Game.XP.lesson} XP on first clear</div>
            </a>`
          : ""
      }
      ${pipelineStrip(nq ? nq.track.id : "pwa")}
      ${check ? renderCheckSummary(check) : `<div class="callout warn"><strong>Placement is from memory.</strong> Wrong answers still advance — that's the scout, not a boss you grind. Start with The Map if the words "spec / state / slice" feel fuzzy.</div>`}
      <h2>Badges</h2>
      ${renderBadges()}
      <h2>Quest line</h2>
      ${questPathHtml()}
      <div class="callout java"><strong>GitHub Pages</strong> hosts this client. Spring cannot run here. The Lab is a fake dungeon API so fetch/CRUD are real.</div>
      <p class="sub" style="color:var(--muted);font-family:system-ui;font-size:0.85rem">Classic HTML files: <a href="lessons/01-what-is-a-tag.html">lessons/</a>. <button class="btn ghost" id="reset-progress" type="button">Reset save</button></p>
    `,
    );

    bindInstall();
    const start = document.getElementById("start-check");
    if (start) {
      start.onclick = (e) => {
        e.preventDefault();
        startCheck();
      };
    }
    const reset = document.getElementById("reset-progress");
    if (reset) {
      reset.onclick = () => {
        if (confirm("Clear lesson progress and skill check?")) {
          Store.resetProgress();
          render();
        }
      };
    }
  }

  function renderCheckSummary(check) {
    const rows = Object.entries(check.scores)
      .map(([k, v]) => {
        const pct = v.n ? Math.round((v.ok / v.n) * 100) : 0;
        return `<div class="score-row"><span>${esc(k)}</span><div class="bar"><i style="width:${pct}%"></i></div><span>${pct}%</span></div>`;
      })
      .join("");
    const weak = (check.weak || []).join(", ") || "none — go punch the Lab";
    return `<div class="callout tip"><strong>Last placement.</strong> Soft spots: ${esc(weak)}.<div class="score-grid">${rows}</div></div>`;
  }

  function questPathHtml() {
    const nq = nextQuest();
    return `<div class="quest-path">${tracks()
      .map((t, i) => {
        const done = t.lessons.every((l) => Store.isDone(l.id));
        const started = t.lessons.some((l) => Store.isDone(l.id));
        const isNext = nq && nq.track.id === t.id;
        const cls = done ? "done" : isNext ? "next" : started ? "mid" : "";
        const n = t.lessons.filter((l) => Store.isDone(l.id)).length;
        return `<a class="path-node ${cls}" href="#/learn/${t.id}">
          <span class="path-num">${i + 1}</span>
          <span>
            <strong>${esc(questName(t))}</strong>
            <em>${esc(t.title)} · ${n}/${t.lessons.length}</em>
          </span>
        </a>`;
      })
      .join("")}</div>`;
  }

  function renderLearn() {
    app.innerHTML = shell(
      "learn",
      `
      <span class="badge">The pipeline</span>
      <h1>One tracker. Eight layers. This order.</h1>
      <p>Plan → structure → look → clicks → network → CRUD names → Java server → ship. Each quest is the next layer of the same Add Expense click. Skip ahead and the words stay fog.</p>
      ${pipelineStrip(nextQuest() ? nextQuest().track.id : "pwa")}
      ${questPathHtml()}
    `,
    );
  }

  function renderTrack(trackId) {
    const t = tracks().find((x) => x.id === trackId);
    if (!t) return renderLearn();
    const items = t.lessons
      .map((l, i) => {
        const done = Store.isDone(l.id);
        return `<a class="step ${done ? "done" : ""}" href="#/learn/${t.id}/${l.id}">
          <span class="step-n">${String(i + 1).padStart(2, "0")}</span>
          <span class="step-t">${esc(l.title)}</span>
          <span class="step-m">${done ? "Cleared" : "Open"}</span>
        </a>`;
      })
      .join("");
    const prevT = prevTrack(t.id);
    const nxtT = nextTrack(t.id);
    app.innerHTML = shell(
      "learn",
      `
      <div class="lesson-nav top">
        ${
          prevT
            ? `<a href="#/learn/${prevT.id}">← ${esc(questName(prevT))}</a>`
            : `<a href="#/learn">← Quest log</a>`
        }
        ${
          nxtT
            ? `<a href="#/learn/${nxtT.id}">${esc(questName(nxtT))} →</a>`
            : `<a href="#/lab">Lab →</a>`
        }
      </div>
      ${pipelineStrip(t.id)}
      <span class="badge">${esc(questName(t))}</span>
      <h1>${esc(t.title)}</h1>
      <p>${esc(t.blurb)}</p>
      <div class="callout java">${esc(t.youKnow)}</div>
      ${
        t.id === "html"
          ? `<div class="callout tip">Optional Cursor mode: original fill-in-the-blank files still live in <code>lessons/</code> and <code>exercises/</code>. The PWA lessons below check you in the browser.</div>`
          : ""
      }
      <div class="steps">${items}</div>
    `,
    );
  }

  function lessonNav(track, index, top) {
    const { prev, next } = neighbors(track.id, track.lessons[index].id);
    const back = prev
      ? `<a href="${lessonHref(prev)}">← ${esc(prev.lesson.title)}</a>`
      : `<a href="#/learn/${track.id}">← ${esc(questName(track))}</a>`;
    const fwd = next
      ? `<a href="${lessonHref(next)}">${esc(next.lesson.title)} →</a>`
      : `<a href="#/lab">Capstone: the Lab →</a>`;
    return `<div class="lesson-nav${top ? " top" : ""}">${back}${fwd}</div>`;
  }

  function renderLesson(trackId, lessonId) {
    const track = tracks().find((x) => x.id === trackId);
    const index = track
      ? track.lessons.findIndex((l) => l.id === lessonId)
      : -1;
    const lesson = index >= 0 ? track.lessons[index] : null;
    if (!lesson) return renderTrack(trackId);
    Store.update((s) => {
      s.last = { trackId, lessonId };
      return s;
    });
    app.innerHTML = shell(
      "learn",
      `
      ${lessonNav(track, index, true)}
      <span class="badge">${esc(questName(track))} · ${index + 1}/${track.lessons.length}</span>
      ${pipelineStrip(track.id)}
      <h1>${esc(lesson.title)}</h1>
      <div class="lesson-desk">
        <article class="lesson-body">${lesson.body}</article>
        <section class="ex" id="ex"></section>
      </div>
      ${lessonNav(track, index, false)}
    `,
    );
    mountExercise(
      document.getElementById("ex"),
      lesson.exercise,
      () => {
        const win = Game.lessonWin(lesson.id, lesson.words);
        const n = neighbors(track.id, lesson.id);
        const msg = document.createElement("p");
        msg.className = "msg ok";
        const xpBit = win.first
          ? `+${win.xp} XP. `
          : "Already cleared — combo still counts. ";
        const back = n.prev
          ? `<a href="${lessonHref(n.prev)}">← Back</a> `
          : "";
        const more = n.next
          ? `<a href="${lessonHref(n.next)}">Next step →</a>`
          : `<a href="#/lab">Run it in the Lab</a>`;
        msg.innerHTML = xpBit + back + more;
        document.getElementById("ex").appendChild(msg);
      },
      () => Game.hit(false),
    );
  }

  function styleMatches(actual, expected) {
    const a = String(actual).toLowerCase().replace(/\s+/g, "");
    const e = String(expected).toLowerCase();
    if (String(actual).toLowerCase().includes(e)) return true;
    if (e === "red" && (a.includes("rgb(255,0,0)") || a === "red")) return true;
    if (e === "navy" && (a.includes("rgb(0,0,128)") || a === "navy"))
      return true;
    if (e === "bold" && (a.includes("700") || a.includes("bold"))) return true;
    if (e === "16" && (a.includes("16px") || a === "16")) return true;
    if (e === "12" && (a.includes("12px") || a === "12")) return true;
    if (e === "8" && (a.includes("8px") || a === "8")) return true;
    if (e === "2" && (a.startsWith("2px") || a === "2")) return true;
    return a.includes(e.replace(/\s+/g, ""));
  }

  function iframeDoc(srcdoc, host) {
    return new Promise((resolve, reject) => {
      const iframe = document.createElement("iframe");
      iframe.className = "preview-frame";
      iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
      const t = setTimeout(() => reject(new Error("preview timeout")), 2500);
      iframe.onload = () => {
        clearTimeout(t);
        resolve(iframe);
      };
      iframe.onerror = () => {
        clearTimeout(t);
        reject(new Error("preview failed"));
      };
      if (host) {
        host.innerHTML = "";
        host.appendChild(iframe);
      } else {
        iframe.style.cssText =
          "position:fixed;left:-9999px;width:400px;height:200px";
        document.body.appendChild(iframe);
      }
      iframe.srcdoc = srcdoc;
    });
  }

  function htmlSrcdoc(code, requireDoctype) {
    const raw = code.trim();
    if (/<html/i.test(raw)) return raw;
    if (requireDoctype) return raw;
    return `<!DOCTYPE html><html><head></head><body>${raw}</body></html>`;
  }

  function checkDom(doc, checks) {
    for (const c of checks) {
      const nodes = [...doc.querySelectorAll(c.sel)];
      if (c.count != null && nodes.length !== c.count) {
        return { ok: false, msg: c.msg };
      }
      const el = c.nth != null ? nodes[c.nth] : nodes[0];
      if (!el) return { ok: false, msg: c.msg };
      if (c.text && !(el.textContent || "").includes(c.text)) {
        return { ok: false, msg: c.msg };
      }
      if (c.style) {
        const val = doc.defaultView.getComputedStyle(el)[c.style];
        if (!styleMatches(val, c.includes)) return { ok: false, msg: c.msg };
      }
    }
    return { ok: true, msg: "Looks right." };
  }

  function deepEq(a, b) {
    if (Object.is(a, b)) return true;
    return JSON.stringify(a) === JSON.stringify(b);
  }

  async function runJsTests(code, tests, asyncMode) {
    for (const t of tests) {
      try {
        const body = `${code}\n${t.setup || ""}\nreturn (${t.expr});`;
        let value;
        if (asyncMode) {
          const AsyncFunction = Object.getPrototypeOf(
            async function () {},
          ).constructor;
          value = await new AsyncFunction("self", body)(window);
        } else {
          value = new Function("self", body)(window);
        }
        if (!deepEq(value, t.eq)) {
          return { ok: false, msg: `${t.msg} (got ${JSON.stringify(value)})` };
        }
      } catch (err) {
        return { ok: false, msg: (t.msg || "Error") + " — " + err.message };
      }
    }
    return { ok: true, msg: "All tests passed." };
  }

  function mountExercise(root, ex, onPass, onFail, opts) {
    if (!ex) {
      root.innerHTML = "";
      return;
    }
    const needsCode = [
      "html",
      "css",
      "js",
      "js-dom",
      "js-async",
      "java",
      "text",
    ].includes(ex.type);
    const previewId = "ex-preview";
    root.innerHTML = `
      <h2>Challenge</h2>
      <p>${esc(ex.prompt)}</p>
      ${
        ex.type === "choice"
          ? `<div class="choices">${ex.options
              .map(
                (o) =>
                  `<label><input type="radio" name="choice" value="${esc(o.id)}"> <span>${esc(o.text)}</span></label>`,
              )
              .join("")}</div>`
          : ""
      }
      ${
        needsCode && ex.type === "text"
          ? `<input class="line" id="ex-code" placeholder="${esc(ex.placeholder || "")}">`
          : needsCode
            ? `<textarea class="code" id="ex-code">${esc(ex.starter || "")}</textarea>`
            : ""
      }
      ${["html", "css", "js-dom"].includes(ex.type) ? `<div class="demo-label">Preview</div><div id="${previewId}"></div>` : ""}
      <div class="row"><button class="btn" type="button" id="ex-run">Lock in</button></div>
      <div id="ex-msg"></div>
    `;

    const msg = root.querySelector("#ex-msg");
    const runBtn = root.querySelector("#ex-run");
    const codeEl = root.querySelector("#ex-code");
    let settled = false;

    async function run() {
      msg.innerHTML = "";
      try {
        const result = await evaluate(
          ex,
          codeEl,
          root.querySelector("#" + previewId),
          root,
        );
        msg.innerHTML = `<div class="msg ${result.ok ? "ok" : "bad"}">${esc(result.msg)}${ex.why && result.ok ? " " + esc(ex.why) : ""}</div>`;
        if (result.ok) {
          if (!settled) {
            settled = true;
            onPass();
          }
        } else if (onFail && result.msg !== "Pick one.") {
          if (opts && opts.advanceOnFail) {
            if (settled) return;
            settled = true;
          }
          onFail(result);
        }
      } catch (err) {
        msg.innerHTML = `<div class="msg bad">${esc(err.message)}</div>`;
      }
    }
    runBtn.onclick = run;
  }

  async function evaluate(ex, codeEl, preview, root) {
    if (ex.type === "choice") {
      const picked = (root || document).querySelector(
        'input[name="choice"]:checked',
      );
      if (!picked) return { ok: false, msg: "Pick one." };
      const opt = ex.options.find((o) => o.id === picked.value);
      if (opt && opt.ok) return { ok: true, msg: ex.why || "Correct." };
      return {
        ok: false,
        msg: "Not that one. Read it again — guessing is how buzzwords stay fog.",
      };
    }

    const code = codeEl ? codeEl.value : "";

    if (ex.type === "text") return ex.check(code);

    if (ex.type === "java") {
      for (const m of ex.must) {
        if (!m.re.test(code)) return { ok: false, msg: m.msg };
      }
      return { ok: true, msg: "Annotations and types look like Spring." };
    }

    if (ex.type === "js") return runJsTests(code, ex.tests, false);
    if (ex.type === "js-async") return runJsTests(code, ex.tests, true);

    if (ex.type === "html") {
      if (ex.requireDoctype && !/^\s*<!doctype html>/i.test(code)) {
        return { ok: false, msg: "Start with <!DOCTYPE html>" };
      }
      if (ex.requireDoctype && !/<title>/i.test(code)) {
        return { ok: false, msg: "Need a <title> in <head>" };
      }
      const src = htmlSrcdoc(code, ex.requireDoctype);
      const iframe = await iframeDoc(src, preview);
      return checkDom(iframe.contentDocument, ex.checks);
    }

    if (ex.type === "css") {
      const src = `<!DOCTYPE html><html><head><style>${code}</style></head><body>${ex.fixture}</body></html>`;
      const iframe = await iframeDoc(src, preview);
      return checkDom(iframe.contentDocument, ex.checks);
    }

    if (ex.type === "js-dom") {
      const src = `<!DOCTYPE html><html><body>${ex.fixture}</body></html>`;
      const iframe = await iframeDoc(src, preview);
      const win = iframe.contentWindow;
      try {
        new win.Function(code)();
      } catch (err) {
        return { ok: false, msg: err.message };
      }
      const after = ex.checks.find((c) => c.after);
      if (after) after.after(iframe.contentDocument);
      return checkDom(iframe.contentDocument, ex.checks);
    }

    return { ok: false, msg: "Unknown exercise type" };
  }

  function startCheck() {
    checkAnswers = [];
    checkScored = false;
    clearTimeout(checkTimer);
    if ((location.hash || "") === "#/check/1") renderCheckAt(0);
    else location.hash = "#/check/1";
  }

  function scheduleCheckAdvance(nextI, ms) {
    clearTimeout(checkTimer);
    const qs = window.SKILL_CHECK;
    const dest = nextI >= qs.length ? "#/check/done" : `#/check/${nextI + 1}`;
    checkTimer = setTimeout(() => {
      location.hash = dest;
    }, ms);
  }

  function recordCheck(i, track, ok) {
    checkAnswers[i] = { track, ok };
    const qs = window.SKILL_CHECK;
    const filled = qs.every((_, idx) => checkAnswers[idx]);
    scheduleCheckAdvance(filled ? qs.length : i + 1, ok ? 350 : 900);
  }

  function renderCheck() {
    const r = parseRoute();
    const qs = window.SKILL_CHECK || [];
    const i = Math.max(0, (r.q || 1) - 1);
    if (i >= qs.length) return finishCheck();
    renderCheckAt(i);
  }

  function renderCheckAt(i) {
    const qs = window.SKILL_CHECK;
    if (i >= qs.length) return finishCheck();
    const q = qs[i];
    const prevHref = i > 0 ? `#/check/${i}` : "#/";
    const prevLabel = i > 0 ? `← Room ${i}` : "← Camp";
    const fwd =
      checkAnswers[i] && i + 1 < qs.length
        ? `<a href="#/check/${i + 2}">Room ${i + 2} →</a>`
        : checkAnswers[i]
          ? `<a href="#/check/done">Results →</a>`
          : `<span class="q-num">Room ${i + 1} / ${qs.length}</span>`;
    app.innerHTML = shell(
      "home",
      `
      <div class="lesson-nav top">
        <a href="${prevHref}" id="check-back">${prevLabel}</a>
        ${fwd}
      </div>
      <p class="q-num">Room ${i + 1} / ${qs.length} · ${esc(q.track)}</p>
      <h1>Placement run</h1>
      <p>From memory. Use ← to go back a room and change an answer. Wrong still records.</p>
      <section class="ex" id="ex"></section>
    `,
    );
    const back = document.getElementById("check-back");
    if (back) {
      back.addEventListener("click", () => clearTimeout(checkTimer));
    }
    mountExercise(
      document.getElementById("ex"),
      q,
      () => {
        Game.hit(true);
        recordCheck(i, q.track, true);
      },
      () => {
        Game.hit(false);
        recordCheck(i, q.track, false);
      },
      { advanceOnFail: true },
    );
  }

  function finishCheck() {
    const qs = window.SKILL_CHECK || [];
    if (!checkAnswers.some((a) => a && a.track)) {
      location.hash = "#/check/1";
      return;
    }
    const scores = {};
    for (const a of checkAnswers) {
      if (!a || !a.track) continue;
      scores[a.track] = scores[a.track] || { ok: 0, n: 0 };
      scores[a.track].n += 1;
      if (a.ok) scores[a.track].ok += 1;
    }
    if (!Object.keys(scores).length) {
      location.hash = "#/check/1";
      return;
    }
    const weak = Object.entries(scores)
      .filter(([, v]) => v.ok / v.n < 0.7)
      .sort((a, b) => a[1].ok / a[1].n - b[1].ok / b[1].n)
      .map(([k]) => k);
    const had = Boolean(Store.get().check);
    Store.update((s) => {
      s.check = { at: Date.now(), scores, weak };
      return s;
    });
    if (!checkScored) {
      checkScored = true;
      Game.checkDone(had);
    }
    const start = weak[0] || "swe";
    const startTitle =
      (tracks().find((t) => t.id === start) || {}).title || start;
    const lastQ = Math.min(checkAnswers.length, qs.length);
    app.innerHTML = shell(
      "home",
      `
      <div class="lesson-nav top">
        <a href="#/check/${lastQ}">← Last room</a>
        <a href="#/">Camp →</a>
      </div>
      <span class="badge">Scout complete</span>
      <h1>${weak.length ? "Soft spots found. That's the useful part." : "Clean run. Now build in the Lab anyway."}</h1>
      ${renderCheckSummary({ scores, weak })}
      <div class="row">
        <a class="btn" href="#/learn/${start}">Quest: ${esc(startTitle)}</a>
        <a class="btn ghost" href="#/" id="start-check">Retake</a>
      </div>
    `,
    );
    const retake = document.getElementById("start-check");
    if (retake) {
      retake.onclick = (e) => {
        e.preventDefault();
        startCheck();
      };
    }
  }

  function renderLab() {
    app.innerHTML = shell(
      "lab",
      `
      <span class="badge">Dungeon · mock REST</span>
      <h1>The Lab</h1>
      <p>Same verbs as your CLI, wearing HTTP. POST to create, GET to read, PUT to poke amount, DELETE to yeet. The log is the spellbook — read it.</p>
      <div class="lab-desk">
        <div>
          <form class="ex" id="lab-form">
            <div class="row">
              <input class="line" name="description" placeholder="Description" required>
              <input class="line" name="amount" type="number" step="0.01" placeholder="Amount" required>
              <input class="line" name="category" placeholder="Category" required>
            </div>
            <button class="btn" type="submit">POST /api/expenses</button>
            <button class="btn ghost" type="button" id="lab-reload">GET list</button>
            <button class="btn ghost" type="button" id="lab-reset">Reset seed data</button>
          </form>
          <h2>Read</h2>
          <div id="lab-list"></div>
          <p id="lab-total"></p>
        </div>
        <div>
          <h2>HTTP log</h2>
          <div class="lab-log" id="lab-log"></div>
        </div>
      </div>
    `,
    );

    const logEl = document.getElementById("lab-log");
    unsubLab = MockApi.subscribe((entry) => {
      const line =
        `${entry.method} ${entry.path} → ${entry.status}` +
        (entry.request ? "  req " + JSON.stringify(entry.request) : "") +
        (entry.body != null ? "  res " + JSON.stringify(entry.body) : "");
      logEl.textContent = line + "\n" + logEl.textContent;
    });

    async function refresh() {
      const res = await fetch("/api/expenses");
      const rows = await res.json();
      const list = document.getElementById("lab-list");
      list.innerHTML =
        rows
          .map(
            (r) => `<div class="lab-item">
            <span>${esc(r.description)} · ${esc(r.category)} · $${Number(r.amount).toFixed(2)} <span class="mono">#${r.id}</span></span>
            <span>
              <button type="button" data-put="${r.id}">PUT +1</button>
              <button type="button" data-del="${r.id}">DELETE</button>
            </span>
          </div>`,
          )
          .join("") || "<p>No expenses.</p>";
      const total = rows.reduce((s, r) => s + Number(r.amount), 0);
      document.getElementById("lab-total").innerHTML =
        `Total: <strong>$${total.toFixed(2)}</strong>`;
      list.querySelectorAll("[data-del]").forEach((b) => {
        b.onclick = async () => {
          await fetch("/api/expenses/" + b.dataset.del, { method: "DELETE" });
          refresh();
        };
      });
      list.querySelectorAll("[data-put]").forEach((b) => {
        b.onclick = async () => {
          const row = rows.find((r) => String(r.id) === b.dataset.put);
          await fetch("/api/expenses/" + row.id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...row,
              amount: Math.round((row.amount + 1) * 100) / 100,
            }),
          });
          refresh();
        };
      });
    }

    document.getElementById("lab-form").onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: fd.get("description"),
          amount: Number(fd.get("amount")),
          category: fd.get("category"),
        }),
      });
      e.target.reset();
      Game.labPost();
      refresh();
    };
    document.getElementById("lab-reload").onclick = refresh;
    document.getElementById("lab-reset").onclick = () => {
      MockApi.reset();
      refresh();
    };
    refresh();
  }

  function renderWords() {
    const unlocked = Store.get().words || {};
    const entries = Object.entries(window.LEARN_WORDS);
    const on = entries.filter(([id]) => unlocked[id]);
    const off = entries.filter(([id]) => !unlocked[id]);
    app.innerHTML = shell(
      "words",
      `
      <span class="badge">Loot — earned, not googled</span>
      <h1>Buzzwords you can actually point at</h1>
      <p>Grey = still fog. Color = you finished the quest that uses it. Tap a live one. If you can explain it with the expense tracker, it's yours.</p>
      <div class="words" id="word-list">
        ${on.map(([id, w]) => `<button type="button" class="word on" data-id="${esc(id)}">${esc(w.term)}</button>`).join("")}
        ${off.map(([, w]) => `<span class="word">${esc(w.term)}</span>`).join("")}
      </div>
      <div id="word-def"></div>
    `,
    );
    document.querySelectorAll(".word.on").forEach((btn) => {
      btn.onclick = () => {
        const w = window.LEARN_WORDS[btn.dataset.id];
        document.getElementById("word-def").innerHTML =
          `<div class="word-def"><strong>${esc(w.term)}</strong><p>${esc(w.def)}</p></div>`;
      };
    });
  }

  function bindInstall() {
    const later = document.getElementById("dismiss-install");
    if (later) {
      later.onclick = () => {
        Store.update((s) => {
          s.hintDismissed = true;
          return s;
        });
        const b = document.getElementById("install-banner");
        if (b) b.remove();
      };
    }
    const btn = document.getElementById("install-btn");
    if (btn && deferredInstall) {
      btn.onclick = async () => {
        deferredInstall.prompt();
        await deferredInstall.userChoice;
        deferredInstall = null;
        const b = document.getElementById("install-banner");
        if (b) b.remove();
      };
    }
  }

  function render() {
    clearTimeout(checkTimer);
    if (unsubLab) {
      unsubLab();
      unsubLab = null;
    }
    const r = parseRoute();
    if (r.name === "check-done") return finishCheck();
    if (r.name === "check") return renderCheck();
    if (r.name === "learn") return renderLearn();
    if (r.name === "track") return renderTrack(r.trackId);
    if (r.name === "lesson") return renderLesson(r.trackId, r.lessonId);
    if (r.name === "lab") return renderLab();
    if (r.name === "words") return renderWords();
    return renderHome();
  }

  window.addEventListener("hashchange", render);
  window.addEventListener("keydown", (e) => {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = (e.target && e.target.tagName) || "";
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag)) return;
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const r = parseRoute();
    if (r.name === "lesson") {
      const n = neighbors(r.trackId, r.lessonId);
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        location.hash = n.prev ? lessonHref(n.prev) : `#/learn/${r.trackId}`;
      } else {
        e.preventDefault();
        location.hash = n.next ? lessonHref(n.next) : "#/lab";
      }
      return;
    }
    if (r.name === "check" && e.key === "ArrowLeft") {
      e.preventDefault();
      location.hash = r.q > 1 ? `#/check/${r.q - 1}` : "#/";
    }
    if (r.name === "check-done" && e.key === "ArrowLeft") {
      e.preventDefault();
      location.hash = `#/check/${window.SKILL_CHECK.length}`;
    }
    if (r.name === "track") {
      const t =
        e.key === "ArrowLeft" ? prevTrack(r.trackId) : nextTrack(r.trackId);
      if (t) {
        e.preventDefault();
        location.hash = `#/learn/${t.id}`;
      }
    }
  });
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredInstall = e;
    if (parseRoute().name === "home") renderHome();
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register(new URL("sw.js", document.baseURI), { scope: "./" })
      .catch(() => {});
  }

  render();
})();
