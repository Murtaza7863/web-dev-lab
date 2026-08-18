window.LEARN_TRACKS = window.LEARN_TRACKS || [];
window.LEARN_TRACKS.push({
  id: "http",
  title: "Two programs talking",
  quest: "Two programs",
  blurb:
    "You already have a page and a click. Sometimes the list lives in another program. A message replaces a method call.",
  youKnow:
    "HTML, CSS, and JS already happened. Your click can change an array in this tab. Sharing needs a second program.",
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
        <p>Your browser loading this lesson is already a client. The files came from a server (GitHub Pages). Next we will send our own requests for notes, not just for HTML files.</p>
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
        <div class="callout word"><strong>New word — API.</strong> Application Programming Interface: the set of URLs + methods the server promises. “The notes API” means paths like <code>/api/notes</code>, not a special language.</div>
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
          { id: "c", text: "CSS", ok: false },
        ],
        why: "400 = validation. You already wrote that as if.",
      },
    },
  ],
});
