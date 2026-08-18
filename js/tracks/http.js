window.LEARN_TRACKS = window.LEARN_TRACKS || [];
window.LEARN_TRACKS.push({
  id: "http",
  title: "HTTP and APIs",
  quest: "HTTP and APIs",
  blurb:
    "A message replaces a method call. This part is the important one: request, reply, JSON, fetch, then the four verbs.",
  youKnow:
    "You have a page, Git snapshots, and names for the jobs. Sharing a list needs a second program and a contract of URLs.",
  lessons: [
    {
      id: "http-1",
      title: "This page, and another program",
      words: ["http", "request", "response"],
      body: `
        <p>Until now, add() lived in one place: this tab. The array was in JavaScript memory. A second laptop could not see it.</p>
        <p>To share a list, you run <strong>two programs</strong>:</p>
        <ul>
          <li><strong>This page</strong> (the <strong>client</strong>) — HTML/CSS/JS in your browser. It draws boxes and sends messages.</li>
          <li><strong>Another program</strong> (the <strong>server</strong>) — often Java, sitting somewhere, waiting. It owns the real list.</li>
        </ul>
        <p>In one Java file you would call a method on an object in the same memory: <code>list.add(note)</code>. A website often cannot do that. The list is not in this tab. You send a <strong>message</strong> instead of calling a method.</p>
        <div class="callout word"><strong>New word — HTTP.</strong> The envelope those messages use: a question (request) and an answer (response). You do not need the full spec. “A request and a reply” is enough.</div>
        <div class="callout word"><strong>New word — request.</strong> What the client sends: “please list the notes” or “please save this note.”</div>
        <div class="callout word"><strong>New word — response.</strong> What the server sends back: a yes/no number plus optional data (the list, the saved note, an error).</div>
        <p>You have already used HTTP without naming it: this lesson file was a GET of HTML from GitHub Pages. Next we send our own requests for <em>notes</em> — a different path, often a different program, same envelope.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "Your browser loading this lesson is the…",
        options: [
          { id: "a", text: "Server", ok: false },
          { id: "b", text: "Client", ok: true },
          { id: "c", text: "Database", ok: false },
        ],
        why: "The browser is always the client.",
      },
    },
    {
      id: "http-2",
      title: "Verbs and a yes/no number",
      words: ["get", "post", "status-code"],
      body: `
        <p>An HTTP request has at least two important pieces besides the data:</p>
        <ul>
          <li>The <strong>method</strong> (verb) — what you want done</li>
          <li>The <strong>path</strong> (URL after the site) — which thing</li>
        </ul>
        <p>The four verbs you already named in English map to HTTP methods:</p>
        <table class="plain">
          <tr><td><code>GET</code></td><td>Read. List notes, or show one. Do not change the list. Safe to repeat.</td></tr>
          <tr><td><code>POST</code></td><td>Create. The body of the request is the new note. Repeating it may create two notes.</td></tr>
          <tr><td><code>PUT</code></td><td>Change an existing note. You say which id in the path.</td></tr>
          <tr><td><code>DELETE</code></td><td>Remove that id.</td></tr>
        </table>
        <p>The reply starts with a <strong>status code</strong> — a number meaning yes, no, or crash. You already knew the English (reject vs missing vs threw). These are the usual numbers:</p>
        <table class="plain">
          <tr><td><code>200</code></td><td>OK. Here is the data (a list, or one note).</td></tr>
          <tr><td><code>201</code></td><td>Created. POST worked. The body is often the saved note with an <code>id</code>.</td></tr>
          <tr><td><code>204</code></td><td>OK, empty body. Common after DELETE.</td></tr>
          <tr><td><code>400</code></td><td>You sent junk. Empty title — the server’s <code>if</code>, same as yours.</td></tr>
          <tr><td><code>404</code></td><td>That id is not there.</td></tr>
          <tr><td><code>500</code></td><td>The other program crashed. Not your validation. Their bug.</td></tr>
        </table>
        <div class="callout word"><strong>New word — status code.</strong> The number at the start of the response. Read it before you read the JSON. 400 means look at what you sent. 500 means look at the server log.</div>
      `,
      exercise: {
        type: "choice",
        prompt: "GET /api/notes/99 and nothing has id 99. Typical status?",
        options: [
          { id: "a", text: "200", ok: false },
          { id: "b", text: "201", ok: false },
          { id: "c", text: "404", ok: true },
          { id: "d", text: "500", ok: false },
        ],
        why: "404 = not there. 500 = threw. 200 = you found it.",
      },
    },
    {
      id: "http-3",
      title: "JSON is the object as text",
      words: ["json"],
      body: `
        <p>HTTP bodies are bytes. Programs agree on a text format so Java and JavaScript can share an object. That format is <strong>JSON</strong>.</p>
        <div class="callout word"><strong>New word — JSON.</strong> JavaScript Object Notation: a text format for objects and arrays. Despite the name, Java speaks it too. It is not JavaScript code. It is data.</div>
<pre>{
  <span class="a">"title"</span>: <span class="x">"Hello"</span>,
  <span class="a">"text"</span>: <span class="x">"First note"</span>
}</pre>
        <p>Rules that bite beginners:</p>
        <ul>
          <li>Keys in <strong>double quotes</strong>. <code>title:</code> without quotes is not JSON (that was a JS object literal).</li>
          <li>Strings in double quotes. No single quotes.</li>
          <li><strong>No trailing comma</strong> after the last field. JS often allows it. JSON does not.</li>
          <li>No comments.</li>
        </ul>
        <p>You already converted objects ↔ text for localStorage:</p>
        <ul>
          <li><code>JSON.stringify(obj)</code> — object → text, to send or save</li>
          <li><code>JSON.parse(text)</code> — text → object, after you receive or load</li>
        </ul>
        <p>A POST body is the stringify step, sent over HTTP instead of into localStorage.</p>
      `,
      exercise: {
        type: "text",
        prompt:
          "JSON object with title Hello (string) and text Hi (string). No trailing comma.",
        placeholder: '{ "title": ... }',
        expected: '{ "title": "Hello", "text": "Hi" }',
        check: (raw) => {
          let v;
          try {
            v = JSON.parse(raw.replace(/'/g, '"'));
          } catch {
            return {
              ok: false,
              msg: "Not valid JSON. Double quotes, no trailing comma. Or Skip.",
            };
          }
          if (String(v.title || "").toLowerCase() !== "hello")
            return { ok: false, msg: "title should be Hello" };
          if (String(v.text || "").toLowerCase() !== "hi")
            return { ok: false, msg: "text should be Hi" };
          return { ok: true, msg: "That’s a request body." };
        },
      },
    },
    {
      id: "http-4",
      title: "fetch GET",
      words: ["fetch", "api"],
      body: `
        <p><code>fetch</code> is the JavaScript function that sends HTTP. You already met <code>async</code> / <code>await</code> so this function can wait without freezing the page.</p>
        <div class="callout word"><strong>New word — fetch.</strong> Built into the browser. You pass a URL. It returns a response. Default method is GET (read).</div>
        <div class="callout word"><strong>New word — API.</strong> Application Programming Interface: the set of URLs + methods the server promises. “The notes API” means paths like <code>/api/notes</code>, not a special language. A later lesson is the full menu.</div>
<pre><span class="t">const</span> res = <span class="t">await</span> fetch(<span class="x">"/api/notes"</span>);
<span class="t">const</span> data = <span class="t">await</span> res.json();</pre>
        <ul>
          <li><code>fetch("/api/notes")</code> — GET that path. Relative URL: same site as this page.</li>
          <li><code>res</code> — the response object (status + body). Not the array yet.</li>
          <li><code>res.json()</code> — parse the body as JSON. Also async, so <code>await</code> again.</li>
          <li><code>data</code> — now a real array of note objects, like you built in JS.</li>
        </ul>
        <p>This course intercepts paths containing <code>/api/</code> inside the page, so the Lab works without a real Java server. Same <code>fetch</code> spelling you would use against Spring later.</p>
        <div class="callout warn">Forget <code>await</code> and <code>data</code> is a Promise, not an array. The list looks empty. Add <code>await</code>.</div>
      `,
      exercise: {
        type: "js-async",
        prompt:
          "Write async function listNotes() that GET /api/notes and returns the parsed JSON array.",
        starter: "async function listNotes() {\n  \n}",
        expected:
          'async function listNotes() {\n  const res = await fetch("/api/notes");\n  return await res.json();\n}',
        tests: [
          {
            expr: "(await listNotes()).length >= 2",
            eq: true,
            msg: "Should return the seeded list (at least two notes)",
          },
          {
            expr: "(await listNotes()).some(n => n.title === 'Hello')",
            eq: true,
            msg: "Should include a note titled Hello",
          },
        ],
      },
    },
    {
      id: "http-5",
      title: "fetch POST",
      words: ["fetch", "post", "json"],
      body: `
        <p>GET only needs a URL. POST needs extra options: the verb, the fact that the body is JSON, and the body itself.</p>
<pre><span class="t">const</span> res = <span class="t">await</span> fetch(<span class="x">"/api/notes"</span>, {
  method: <span class="x">"POST"</span>,
  headers: { <span class="x">"Content-Type"</span>: <span class="x">"application/json"</span> },
  body: JSON.stringify({ title: <span class="x">"Hi"</span>, text: <span class="x">"There"</span> })
});
<span class="t">const</span> created = <span class="t">await</span> res.json();</pre>
        <ul>
          <li>Second argument to <code>fetch</code> is an object of options.</li>
          <li><code>method: "POST"</code> — create, not read. If you omit this, you GET by accident.</li>
          <li><code>headers</code> — extra labels on the envelope. <code>Content-Type: application/json</code> tells the server “parse this body as JSON,” not as a form.</li>
          <li><code>body</code> — must be a <em>string</em>. <code>JSON.stringify</code> turns your object into that string. Passing the object raw is a common bug.</li>
          <li><code>created</code> — usually the saved note, now with an <code>id</code> the server assigned. You did not pick the id.</li>
        </ul>
        <p>Empty title → this Lab’s mock returns <code>400</code>, same as your <code>if</code>. Check <code>res.ok</code> or <code>res.status</code> if you need to show an error instead of assuming success.</p>
      `,
      exercise: {
        type: "js-async",
        prompt:
          "Write async function createNote(title, text) that POSTs JSON to /api/notes and returns the created object (with id).",
        starter: "async function createNote(title, text) {\n  \n}",
        expected:
          'async function createNote(title, text) {\n  const res = await fetch("/api/notes", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({ title, text })\n  });\n  return await res.json();\n}',
        tests: [
          {
            expr: "(await createNote('SkillCheckSnack', 'x')).title",
            eq: "SkillCheckSnack",
            msg: "Returned object should include the title you sent",
          },
          {
            expr: "typeof (await createNote('SkillCheckSnack2', 'x')).id",
            eq: "number",
            msg: "Server should assign a numeric id",
          },
        ],
      },
    },
    {
      id: "http-6",
      title: "One request, five parts",
      words: ["request", "response", "headers"],
      body: `
        <p>When something fails, do not rewrite the whole app. Name the five parts of the round trip:</p>
        <table class="plain">
          <tr><td>Method</td><td>GET / POST / PUT / DELETE</td></tr>
          <tr><td>URL</td><td>e.g. <code>/api/notes</code> or <code>/api/notes/3</code></td></tr>
          <tr><td>Headers</td><td>labels, especially <code>Content-Type: application/json</code> on POST</td></tr>
          <tr><td>Body</td><td>JSON text you sent (GET usually has none)</td></tr>
          <tr><td>Status + body back</td><td>e.g. <code>201</code> + the saved object with <code>id</code></td></tr>
        </table>
        <div class="callout word"><strong>New word — headers.</strong> Extra key/value labels on the request or response. Not the note itself. Content-Type is a header. Status is not a header; it is the code.</div>
        <p>Open the Lab, click Add, and think in those five parts. Then map the failure:</p>
        <ul>
          <li><code>400</code> → look at the body you sent (empty title? bad JSON?)</li>
          <li><code>404</code> → look at the URL (wrong id?)</li>
          <li><code>500</code> → the other program threw</li>
          <li>No row in the network log → JavaScript never called <code>fetch</code> (click handler, or you forgot to attach it)</li>
        </ul>
        <p>That is the same debug ritual as three copies of state, with two programs instead of one.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "The Lab POST returns 400. Where do you look first?",
        options: [
          { id: "a", text: "Rewrite the server immediately", ok: false },
          {
            id: "b",
            text: "The request body — 400 means this side sent junk",
            ok: true,
          },
          {
            id: "c",
            text: "The path — 400 always means the id is missing (that is 404)",
            ok: false,
          },
        ],
        why: "400 = validation. You already wrote that as if.",
      },
    },
    {
      id: "http-7",
      title: "A URL is an address with pieces",
      words: ["url", "query"],
      body: `
        <p>You have been writing paths like <code>/api/notes/3</code>. A full address has more pieces. You should be able to point at each one:</p>
<pre>https://notes.example.com/api/notes/3?limit=10</pre>
        <table class="plain">
          <tr><td><code>https</code></td><td><strong>Scheme.</strong> How to talk. <code>https</code> is HTTP inside encryption. Browsers warn on plain <code>http</code> except localhost.</td></tr>
          <tr><td><code>notes.example.com</code></td><td><strong>Host.</strong> Which computer. Port is optional (<code>:8080</code>). Scheme + host + port is the <em>web</em> origin — not Git’s <code>origin</code> (that was a nickname for GitHub).</td></tr>
          <tr><td><code>/api/notes/3</code></td><td><strong>Path.</strong> Which thing on that computer. The <code>3</code> is the id, in the path, not after <code>?</code>.</td></tr>
          <tr><td><code>?limit=10</code></td><td><strong>Query string.</strong> Extra filters after <code>?</code>. <code>name=value</code>, more pairs joined with <code>&amp;</code>. Not a new verb. GET with a query is still GET.</td></tr>
        </table>
        <div class="callout word"><strong>New word — URL.</strong> Uniform Resource Locator: the full address. Path is one piece. The verb (GET/POST) is <em>not</em> in the URL. It travels beside it.</div>
        <div class="callout word"><strong>New word — query.</strong> The <code>?a=1&amp;b=2</code> tail. Optional. Use it for “list, but only 10” or “search,” not for “please delete” (that is DELETE + path).</div>
        <p><code>fetch("/api/notes")</code> is a <em>relative</em> URL: same host as this page. <code>fetch("https://other.com/api/notes")</code> is another web origin. CORS (Spring chapter) is the browser rule for that case. You do not need it for this Lab.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "In GET /api/notes?limit=10 the ?limit=10 is…",
        options: [
          { id: "a", text: "A different HTTP method named QUERY", ok: false },
          {
            id: "b",
            text: "A query string: extra filters. The method is still GET",
            ok: true,
          },
          {
            id: "c",
            text: "The note id (that would be /3 in the path)",
            ok: false,
          },
        ],
        why: "Verb stays GET. Query is optional data on the URL.",
      },
    },
    {
      id: "http-8",
      title: "An API is a promised menu",
      words: ["api"],
      body: `
        <p>You already met <strong>API</strong> as “the URLs + methods the server promises.” Treat it like a menu taped to the kitchen: the page does not invent paths. It orders what the menu lists.</p>
        <div class="demo">
          <div class="demo-label">A tiny notes API (this Lab)</div>
          <table class="plain">
            <tr><td><code>GET /api/notes</code></td><td>list → JSON array</td></tr>
            <tr><td><code>POST /api/notes</code></td><td>JSON <code>{ title, text }</code> → 201 + note with <code>id</code>, or 400 if title empty</td></tr>
            <tr><td><code>GET /api/notes/:id</code></td><td>one note, or 404</td></tr>
            <tr><td><code>PUT /api/notes/:id</code></td><td>replace fields</td></tr>
            <tr><td><code>DELETE /api/notes/:id</code></td><td>204 or 404</td></tr>
          </table>
        </div>
        <p>That table <em>is</em> the API. <code>:id</code> is a placeholder in the docs: a real request uses <code>/api/notes/3</code>, not the letters <code>:id</code>. JSON shapes are part of the promise: the page sends <code>title</code>, not <code>heading</code>, because the server’s <code>Note</code> uses <code>title</code>.</p>
        <p>Real products publish this as docs (or OpenAPI). You still read it as: verb, path, body in, status + body out. You already debug with those five parts.</p>
        <p>This site’s Lab is a fake kitchen that honors the same menu, in the browser, so you can practice without Spring running.</p>
      `,
      exercise: {
        type: "choice",
        prompt:
          "You want to create a note. The menu says POST /api/notes. You should…",
        options: [
          {
            id: "a",
            text: "GET /api/notes and hope it creates one",
            ok: false,
          },
          {
            id: "b",
            text: "POST /api/notes with JSON { title, text } as the menu states",
            ok: true,
          },
          { id: "c", text: "Invent POST /api/makeNoteBecauseJava", ok: false },
        ],
        why: "The API is the contract. Guessing paths is how 404s happen.",
      },
    },
    {
      id: "http-9",
      title: "401 and 403: the server refused you",
      words: ["status-code", "headers"],
      body: `
        <p>You know 400 (junk body), 404 (no such id), 500 (their crash). Two more numbers show up the moment a list is not public:</p>
        <table class="plain">
          <tr><td><code>401</code></td><td>Who are you? The server expected a login (or a token) and you sent none, or a bad one.</td></tr>
          <tr><td><code>403</code></td><td>The server knows who you are, and you are not allowed to do this verb on this note.</td></tr>
        </table>
        <p>Example: nobody logged in, GET the private list → often <code>401</code>. You logged in as Bob, DELETE Ada’s note → often <code>403</code>. Wrong id that does not exist → still <code>404</code>, even if you are logged in.</p>
        <p>Often the page sends a <strong>header</strong> such as <code>Authorization: Bearer …</code> — a string the server checks, the same idea as a password, but for programs. You put it in a header, not in the query string, so it is less likely to land in logs and screenshots.</p>
        <p>This Lab does not require login. A real notes app would. You do not need to build auth in this course. You need to <em>read</em> 401 vs 403 instead of rewriting fetch at random.</p>
        <div class="callout warn">If a lesson or a person asks you to steal someone else’s token, stop. That is not this course. Your own token is a secret, like a password.</div>
      `,
      exercise: {
        type: "choice",
        prompt: "GET /api/notes returns 401. That means…",
        options: [
          {
            id: "a",
            text: "The JSON body was invalid (that is 400)",
            ok: false,
          },
          {
            id: "b",
            text: "The server wants you identified (login/token) and you weren’t",
            ok: true,
          },
          {
            id: "c",
            text: "The note id does not exist (that is 404)",
            ok: false,
          },
        ],
        why: "401 = who are you. 403 = we know you, no. 400 = junk body. 404 = missing row.",
      },
    },
    {
      id: "http-10",
      title: "Repeating GET is safe. Repeating POST may not be.",
      words: ["get", "post"],
      body: `
        <p>Refresh this lesson: the browser GETs the HTML again. That should not create a second copy of the lesson. GET is supposed to <strong>only read</strong>.</p>
        <p>POST create is different. Two POSTs with the same body can mean two notes. A double-click on Add, or a retry when the network hiccups, is a real bug: duplicate rows.</p>
        <p>Practical habits:</p>
        <ul>
          <li>Disable the button until the response arrives.</li>
          <li>Read the status before you <code>json()</code> and redraw.</li>
          <li>If you meant “change this id,” use PUT on that path, not another POST.</li>
        </ul>
        <p>You now have the whole HTTP spine: two programs, verb + path, JSON, fetch, five parts when it fails, URL pieces, the menu, 401/403, and why GET vs POST matter when you retry. Next chapter is those four verbs as URLs you type in JavaScript.</p>
        <p>Open the Lab after this part. Watch the log. Name the five parts out loud once. That is the skill.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "The user double-clicks Add. Two identical notes appear. Why?",
        options: [
          {
            id: "a",
            text: "GET ran twice and GET always creates rows",
            ok: false,
          },
          {
            id: "b",
            text: "POST ran twice. Create is not safe to repeat like GET",
            ok: true,
          },
          { id: "c", text: "localStorage duplicated it on refresh", ok: false },
        ],
        why: "GET read. POST create. Retries of POST can duplicate. Disable the button.",
      },
    },
  ],
});
