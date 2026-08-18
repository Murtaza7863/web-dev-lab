window.LEARN_TRACKS = window.LEARN_TRACKS || [];
window.LEARN_TRACKS.push({
  id: "pwa",
  title: "PWA + GitHub Pages",
  quest: "On the internet",
  blurb:
    "You already have a page. This is how these files get hosted and optionally installed.",
  youKnow:
    "HTML, CSS, and JS already happened. This chapter is shipping, not tags.",
  lessons: [
    {
      id: "pwa-1",
      title: "What a PWA is",
      words: ["pwa"],
      body: `
        <p>You already have a website: HTML, CSS, JavaScript files a browser can load. A <strong>PWA</strong> is still that website, plus two extra files so the browser may treat it like an installable app and keep a cache for offline.</p>
        <div class="callout word"><strong>New word — PWA.</strong> Progressive Web App: a site that can install and work partly offline. Not a new language. Not Spring. Not iOS Swift.</div>
        <ol>
          <li><code>manifest.webmanifest</code> — JSON: name, icons, how to open (full window vs browser tab)</li>
          <li><code>sw.js</code> — a <strong>service worker</strong> script that can intercept requests and answer from cache</li>
        </ol>
        <p>You are reading this inside one. On a phone: browser menu → Add to Home Screen. On laptop Chrome or Edge: Install in the address bar when the site qualifies.</p>
        <p>Install does not create a backend. It does not sync localStorage between people. It puts a shortcut on the device and may hide the URL bar. The code is still the same files.</p>
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
        why: "PWA is a frontend idea. This one is static files.",
      },
    },
    {
      id: "pwa-2",
      title: "Manifest and service worker",
      words: ["service-worker"],
      body: `
        <p>The manifest is JSON the browser reads to know the app name and how to display it:</p>
<pre>{
  <span class="a">"name"</span>: <span class="x">"Web Dev Lab"</span>,
  <span class="a">"start_url"</span>: <span class="x">"./"</span>,
  <span class="a">"display"</span>: <span class="x">"standalone"</span>
}</pre>
        <ul>
          <li><code>name</code> — label under the icon</li>
          <li><code>start_url</code> — which page to open on launch (<code>./</code> means this folder’s index)</li>
          <li><code>display: standalone</code> — open like an app: no URL bar. <code>browser</code> would keep the normal tab chrome.</li>
        </ul>
        <div class="callout word"><strong>New word — service worker.</strong> A JavaScript file the browser runs in the background, separate from the page. It can cache <code>index.html</code> and lesson files, then serve them when the network is gone. It is not your click handler. It is not Spring.</div>
        <p>Service workers only register on HTTPS (GitHub Pages is HTTPS) or on <code>localhost</code>. Opening the folder as <code>file://</code> skips them. Use a local static server when developing.</p>
        <div class="callout warn">A service worker can serve a <em>stale</em> file after you deploy. This project bumps a version string in <code>sw.js</code> when lesson files change. If a lesson looks old, hard-refresh (or unregister the worker in DevTools). That is a cache, not your code being ignored by Git.</div>
      `,
      exercise: {
        type: "text",
        prompt:
          "Which manifest field makes it open like an app without the URL bar? Type like display: standalone",
        placeholder: "field: value",
        expected: "display: standalone",
        check: (raw) => {
          const s = raw.toLowerCase();
          const ok =
            /standalone/.test(s) &&
            (/display/.test(s) || /^\s*standalone\s*$/.test(s));
          return ok
            ? { ok: true, msg: "display: standalone" }
            : { ok: false, msg: "Expected: display: standalone — or Skip." };
        },
      },
    },
    {
      id: "pwa-3",
      title: "What GitHub Pages can and cannot do",
      words: ["github-pages"],
      body: `
        <p><strong>GitHub Pages</strong> is a host that serves the files in a GitHub repo over HTTPS. You push HTML/CSS/JS (and a manifest, and <code>sw.js</code>). GitHub copies them to a URL like <code>https://you.github.io/web-dev-lab/</code>.</p>
        <p><strong>Can:</strong> host this course, the Lab’s mock API (because that mock is JavaScript in the page), HTTPS, PWAs.</p>
        <p><strong>Cannot:</strong> run Java, Spring Boot, or a database. There is no JVM process. There is no always-on program waiting for POST except what the browser fakes.</p>
        <table class="plain">
          <tr><td>Frontend (this course)</td><td>Pages is enough</td></tr>
          <tr><td>Backend (Spring + real notes)</td><td>A host that runs a JVM, plus storage</td></tr>
        </table>
        <p>localStorage on a PWA still lives on that phone. Two people installing the same PWA do not share notes. Shared data still needs a backend. Install does not change that.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "You want a list many phones share. GitHub Pages alone is…",
        options: [
          {
            id: "a",
            text: "Enough, because localStorage syncs between users",
            ok: false,
          },
          {
            id: "b",
            text: "Not enough — you need a backend + a place that stores the list",
            ok: true,
          },
          { id: "c", text: "Enough if the PWA is installed", ok: false },
        ],
        why: "localStorage is per browser. Shared data needs a server.",
      },
    },
    {
      id: "pwa-4",
      title: "Git is how files get to Pages",
      words: ["git", "github-pages"],
      body: `
        <p>Pages does not watch your laptop. It serves what is in the GitHub repository after a publish step. The usual path:</p>
<pre>git add .
git commit -m "lessons"
git push</pre>
        <ul>
          <li><code>git add</code> — stage files (mark them for the next snapshot)</li>
          <li><code>git commit</code> — take a snapshot with a message. Local only until you push.</li>
          <li><code>git push</code> — send commits to GitHub</li>
        </ul>
        <div class="callout java">Git is a timeline of source files. commit = snapshot. push = send to GitHub. It is not a compiler. It is not HTTP for your notes API.</div>
        <p>This repo uses GitHub Actions: after push, a workflow copies the repo (or a folder) to the Pages site. Until that job finishes, the public URL can still show the old files. Until you push, Pages cannot know you edited a lesson in Cursor.</p>
        <p>If you edited locally and the live site is old: commit, push, wait for the workflow, then hard-refresh because of the service worker cache.</p>
      `,
      exercise: {
        type: "choice",
        prompt:
          "You edited a lesson locally. GitHub Pages still shows the old one. What’s missing?",
        options: [
          { id: "a", text: "A Spring Boot restart", ok: false },
          {
            id: "b",
            text: "Commit + push (and the Pages workflow finishing)",
            ok: true,
          },
          { id: "c", text: "localStorage.clear()", ok: false },
        ],
        why: "Pages serves what’s on GitHub, not what’s in Cursor.",
      },
    },
    {
      id: "pwa-5",
      title: "One click through the stack",
      words: ["frontend", "backend", "api"],
      body: `
        <p>User taps Add. You now have a name for every layer. Walk the click; do not skip to “the cloud.”</p>
        <ol>
          <li><strong>HTML</strong> — the boxes exist, with <code>id</code>s, so JS can find them</li>
          <li><strong>CSS</strong> — the button is visible (display, padding). Paint does not add the note</li>
          <li><strong>JS click</strong> — read <code>.value</code>, <code>if</code> empty then stop, maybe <code>preventDefault</code></li>
          <li><strong>fetch POST</strong> — JSON body, <code>/api/notes</code></li>
          <li><strong>Optional Spring</strong> — Controller maps the URL, Service runs the same <code>if</code>, Repository saves</li>
          <li><strong>JS again</strong> — read 201 + body, then redraw the list (screen copy)</li>
        </ol>
        <p>On this PWA, step 5 is the mock API in the page. Same contract: POST JSON, get an object with <code>id</code>, or 400 on empty title.</p>
        <p>If the list does not update after 201, the server (or mock) already stored the note. The stale copy is the screen. Rebuild the list. That is the same three-copies bug from the jobs chapter, at the end of the course.</p>
      `,
      exercise: {
        type: "choice",
        prompt:
          "The list doesn’t update after a successful 201. Which copy is stale?",
        options: [
          { id: "a", text: "The server — 201 is a lie", ok: false },
          {
            id: "b",
            text: "The screen. JS didn’t re-render.",
            ok: true,
          },
          { id: "c", text: "CSS cache", ok: false },
        ],
        why: "201 means store worked. Paint the list.",
      },
    },
  ],
});
