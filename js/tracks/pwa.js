window.LEARN_TRACKS = window.LEARN_TRACKS || [];
window.LEARN_TRACKS.push({
  id: "pwa",
  title: "PWA + GitHub Pages",
  quest: "The Install",
  blurb: "This app is the lesson. Install it, go offline, know the limits.",
  youKnow:
    "If you can install this on a phone home screen or a laptop as its own window, you already used a PWA.",
  lessons: [
    {
      id: "pwa-1",
      title: "What a PWA is",
      words: ["pwa"],
      body: `
        <p><strong>PWA</strong> = Progressive Web App. A website that can:</p>
        <ul>
          <li>Install on a phone (home screen) or a laptop (its own window)</li>
          <li>Work (partly) offline</li>
          <li>Skip the browser URL bar once installed</li>
        </ul>
        <p>It's still HTML/CSS/JS. Not the App Store. Two extra files do most of the work:</p>
        <ol>
          <li><code>manifest.webmanifest</code> — name, icons, theme color</li>
          <li><code>sw.js</code> — service worker that caches files</li>
        </ol>
        <p>You are reading this inside one. Phone: Share / menu → Add to Home Screen. Laptop Chrome/Edge: Install in the address bar. Mac Safari: File → Add to Dock.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "A PWA is…",
        options: [
          { id: "a", text: "A native iOS language", ok: false },
          {
            id: "b",
            text: "A website with a manifest + service worker so it can install and cache",
            ok: true,
          },
          { id: "c", text: "A Spring Boot feature", ok: false },
        ],
        why: "PWA is a frontend idea. Spring can serve a PWA, but this one is just static files on Pages.",
      },
    },
    {
      id: "pwa-2",
      title: "Manifest and service worker",
      words: ["service-worker"],
      body: `
        <p>The manifest (already in this project) is JSON:</p>
<pre>{
  <span class="a">"name"</span>: <span class="x">"Web Dev Lab"</span>,
  <span class="a">"start_url"</span>: <span class="x">"./"</span>,
  <span class="a">"display"</span>: <span class="x">"standalone"</span>,
  <span class="a">"icons"</span>: [{ <span class="a">"src"</span>: <span class="x">"icons/icon-192.png"</span>, <span class="a">"sizes"</span>: <span class="x">"192x192"</span> }]
}</pre>
        <p>The service worker intercepts <code>GET</code>s and can reply from cache. That's offline lessons on a plane.</p>
        <p>It must be HTTPS (GitHub Pages is) or localhost. It cannot cache your Spring server on someone else's machine without extra work.</p>
        <div class="callout warn">A service worker can serve a stale JS file after you deploy. When you ship a new version, bump the cache name in <code>sw.js</code> (this project uses a version string).</div>
      `,
      exercise: {
        type: "text",
        prompt:
          "In the manifest, which field makes it open like an app without the Safari/Chrome URL bar? Type the field name and value like display: standalone",
        placeholder: "field: value",
        expected: "display: standalone",
        check: (raw) => {
          const s = raw.toLowerCase();
          const ok =
            /standalone/.test(s) &&
            (/display/.test(s) || /^\s*standalone\s*$/.test(s));
          return ok
            ? {
                ok: true,
                msg: "display: standalone is the installable-app look.",
              }
            : { ok: false, msg: "Expected: display: standalone — or Skip." };
        },
      },
    },
    {
      id: "pwa-3",
      title: "What GitHub Pages can and cannot do",
      words: ["github-pages"],
      body: `
        <p><strong>Can:</strong> host this whole course + Lab + mock API (the mock is JS). Custom domain. HTTPS. PWAs.</p>
        <p><strong>Cannot:</strong> run Java, Spring, Python, a database, or keep secrets. No server process.</p>
        <p>So the split you'll see in real apps:</p>
        <ul>
          <li>Frontend (this) → Pages, Netlify, Cloudflare Pages</li>
          <li>Backend (Spring) → a host that runs a JVM</li>
        </ul>
        <p>Your original CLI still matters: it's the rules (add, total, save). Web is those rules behind HTTP plus a UI in the browser.</p>
        <div class="callout tip">You're done with the keyword tour when you can explain each word on the Words tab using your expense tracker, not a definition you memorized.</div>
      `,
      exercise: {
        type: "choice",
        prompt:
          "You want a real database that multiple phones share. GitHub Pages alone is…",
        options: [
          {
            id: "a",
            text: "Enough, because localStorage syncs between users",
            ok: false,
          },
          {
            id: "b",
            text: "Not enough — you need a backend (e.g. Spring) + a database host",
            ok: true,
          },
          { id: "c", text: "Enough if the PWA is installed", ok: false },
        ],
        why: "localStorage is per browser profile. Shared data needs a server. That's the whole point of Spring in this story.",
      },
    },
    {
      id: "pwa-4",
      title: "Git is how the files get to Pages",
      words: ["git", "github-pages"],
      body: `
        <p>GitHub Pages does not pull from your laptop by magic. You <strong>commit</strong> files, <strong>push</strong> to GitHub, a workflow copies <code>web/frontend</code> to the public site.</p>
<pre>git add web/frontend
git commit -m "lesson: fetch POST"
git push</pre>
        <p>That's version control: a timeline of the project, not "save as final-final-2". Branches and PRs are costumes on that timeline. The verb is: snapshot, then publish.</p>
        <div class="callout java">Your CLI had <code>saveToFile</code> for expenses. Git is <code>saveToFile</code> for source code, with a history.</div>
      `,
      exercise: {
        type: "choice",
        prompt:
          "You edited a lesson locally. GitHub Pages still shows the old one. What's missing?",
        options: [
          { id: "a", text: "A Spring Boot restart", ok: false },
          {
            id: "b",
            text: "Commit + push (and the Pages workflow finishing)",
            ok: true,
          },
          { id: "c", text: "localStorage.clear()", ok: false },
        ],
        why: "Pages serves what's on GitHub, not what's in Cursor. Push is the deploy.",
      },
    },
    {
      id: "pwa-5",
      title: "Follow one click through the whole stack",
      words: ["frontend", "backend", "api"],
      body: `
        <p>User taps <strong>Add</strong> in a real app. Narrate it. If you can, you learned the pipeline:</p>
        <ol>
          <li><strong>HTML</strong> — form fields exist, ids to find them</li>
          <li><strong>CSS</strong> — the button looks tappable</li>
          <li><strong>JS event</strong> — click, read values, <code>preventDefault</code></li>
          <li><strong>fetch POST</strong> — JSON body, <code>Content-Type</code></li>
          <li><strong>HTTP</strong> — leaves the browser (Network tab)</li>
          <li><strong>Spring Controller</strong> — <code>@PostMapping</code> + <code>@RequestBody</code></li>
          <li><strong>Service</strong> — reject amount ≤ 0</li>
          <li><strong>Repository</strong> — ArrayList or database</li>
          <li><strong>201 + JSON</strong> back</li>
          <li><strong>JS</strong> — redraw the list (screen matches memory)</li>
        </ol>
        <p>On this PWA, steps 6–8 are the mock API. Same contract. That's the point of an API: swap the actor, keep the lines.</p>
        <div class="callout tip">If a buzzword isn't in this list, you don't need it to ship the tracker. Add it when a spec forces it (auth, many users, etc.).</div>
      `,
      exercise: {
        type: "choice",
        prompt:
          "The list doesn't update after a successful 201. Which state is stale?",
        options: [
          { id: "a", text: "The database — 201 is a lie", ok: false },
          {
            id: "b",
            text: "The screen. Memory/server has the row; JS didn't re-render.",
            ok: true,
          },
          { id: "c", text: "CSS cache", ok: false },
        ],
        why: "You named this on The Map: three copies. 201 means store worked. Paint the DOM.",
      },
    },
  ],
});
