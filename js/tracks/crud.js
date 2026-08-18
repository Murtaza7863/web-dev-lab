window.LEARN_TRACKS = window.LEARN_TRACKS || [];
window.LEARN_TRACKS.push({
  id: "crud",
  title: "Add, list, change, delete",
  quest: "Add list change delete",
  blurb:
    "The four verbs, as messages a page can send. You already named them in English.",
  youKnow:
    "You can GET and POST. This chapter is the same four jobs with URLs.",
  lessons: [
    {
      id: "crud-1",
      title: "CRUD is a nickname",
      words: ["crud"],
      body: `
        <p>You already listed four verbs in English (add, list, change, remove) and four HTTP methods (POST, GET, PUT, DELETE). <strong>CRUD</strong> is only a nickname that lines them up:</p>
        <table class="plain">
          <tr><td>Create</td><td>Add a note</td><td><code>POST /api/notes</code></td></tr>
          <tr><td>Read</td><td>List all, or show one</td><td><code>GET /api/notes</code> or <code>GET /api/notes/3</code></td></tr>
          <tr><td>Update</td><td>Change title or text</td><td><code>PUT /api/notes/3</code></td></tr>
          <tr><td>Delete</td><td>Remove</td><td><code>DELETE /api/notes/3</code></td></tr>
        </table>
        <p>It is not a library you install. It is a checklist: which of the four does this page actually send? Many first apps only Create and Read. That is fine if you know Update and Delete are missing.</p>
        <p>GET is Read because it only looks. Repeating GET should not add a second note. POST is Create because it adds. Repeating POST may add twice — that is why a double-click on Add can duplicate a row if you do not disable the button.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "GET /api/notes is which letter?",
        options: [
          { id: "c", text: "Create", ok: false },
          { id: "r", text: "Read", ok: true },
          { id: "u", text: "Update", ok: false },
          { id: "d", text: "Delete", ok: false },
        ],
        why: "It only looks at data. Read.",
      },
    },
    {
      id: "crud-2",
      title: "URL is the noun, method is the verb",
      words: ["rest"],
      body: `
        <p>You could invent any paths: <code>POST /api/getNotes</code>, <code>GET /api/doDelete?id=3</code>. They can work. People still argue about them.</p>
        <p>A common convention: the <strong>URL is the noun</strong> (which notes), the <strong>HTTP method is the verb</strong> (what to do). That convention is often called REST.</p>
        <div class="callout word"><strong>New word — REST.</strong> A style for HTTP APIs: same noun in the path, change the method. Not a product. Not required for a working app. You will see it everywhere, so you should recognize it.</div>
        <table class="plain">
          <tr><td><code>GET /api/notes</code></td><td>list all notes</td></tr>
          <tr><td><code>GET /api/notes/3</code></td><td>the one whose id is 3</td></tr>
          <tr><td><code>POST /api/notes</code></td><td>create; id is not in the URL yet — the server assigns it</td></tr>
          <tr><td><code>PUT /api/notes/3</code></td><td>replace note 3 with the JSON body</td></tr>
          <tr><td><code>DELETE /api/notes/3</code></td><td>delete 3</td></tr>
        </table>
        <p><code>/api/notes/3</code> is “the collection, then one id.” The <code>3</code> is not a query like <code>?id=3</code> here; it is part of the path. Spring will call that a path variable later.</p>
        <p>Not this convention: <code>POST /api/getNotes</code> (that names the path like a Java method). Fine if you own both sides. People just don’t call that REST.</p>
      `,
      exercise: {
        type: "text",
        prompt:
          "What HTTP method + path would delete note id 7? Type like: DELETE /api/notes/7",
        placeholder: "METHOD /path",
        expected: "DELETE /api/notes/7",
        check: (raw) => {
          const s = raw.trim().replace(/["'`]/g, "").replace(/\s+/g, " ");
          const ok = /^DELETE\s+(?:\/[\w.-]+)*\/notes\/7\/?$/i.test(s);
          return ok
            ? { ok: true, msg: "Noun in the URL, verb in the method." }
            : { ok: false, msg: "Expected: DELETE /api/notes/7 — or Skip." };
        },
      },
    },
    {
      id: "crud-3",
      title: "PUT and DELETE with fetch",
      words: ["put", "delete"],
      body: `
        <p>You already wrote GET (URL only) and POST (method + JSON body). Update and delete reuse <code>fetch</code> with a different method. The id lives in the URL.</p>
<pre><span class="t">await</span> fetch(<span class="x">"/api/notes/1"</span>, {
  method: <span class="x">"PUT"</span>,
  headers: { <span class="x">"Content-Type"</span>: <span class="x">"application/json"</span> },
  body: JSON.stringify({ title: <span class="x">"Hello"</span>, text: <span class="x">"Edited"</span> })
});

<span class="t">await</span> fetch(<span class="x">"/api/notes/1"</span>, { method: <span class="x">"DELETE"</span> });</pre>
        <p><strong>PUT</strong> looks like POST: you still send JSON, you still set Content-Type. Difference: the path includes the id you are replacing. The server finds that row and overwrites fields from the body, keeping the same <code>id</code>.</p>
        <p><strong>DELETE</strong> often has no body. You only need the method and the URL. Many servers reply <code>204</code> with an empty body — “ok, nothing to parse.”</p>
        <div class="callout warn">Do not call <code>res.json()</code> on a 204. There is no JSON. Check <code>res.status</code> (204 or 200) instead, or you will throw in the browser.</div>
        <p>If the id is missing, expect 404. Same as GET of a missing row.</p>
      `,
      exercise: {
        type: "js-async",
        prompt:
          "Write async function removeNote(id) that DELETE /api/notes/{id} and returns true if status is 204 or 200.",
        starter: "async function removeNote(id) {\n  \n}",
        tests: [
          {
            setup:
              "const row = await (await fetch('/api/notes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title:'ToDelete',text:'x'})})).json(); self.__delId = row.id;",
            expr: "await removeNote(self.__delId)",
            eq: true,
            msg: "DELETE of a real id should return true",
          },
        ],
      },
    },
    {
      id: "crud-4",
      title: "Do all four",
      words: ["crud", "rest"],
      body: `
        <p>One function can walk the whole checklist. That proves you can send each message, not that you built a pretty UI.</p>
        <ol>
          <li><strong>POST</strong> a note with a known title — Create. Save the <code>id</code> from the JSON you get back.</li>
          <li><strong>PUT</strong> that same id with a new <code>text</code> — Update. Keep the title if the server expects both fields.</li>
          <li><strong>GET</strong> that id (or GET the list and find it) — Read. Check that <code>text</code> is the new value.</li>
          <li><strong>DELETE</strong> that id — Delete. Leave the list clean.</li>
        </ol>
        <p>Order matters: you cannot PUT before you have an id. You cannot trust GET before PUT if you never changed anything.</p>
        <p>The Lab’s “server” is still JavaScript in this page (the mock). The spelling of <code>fetch</code> does not change when a real Java process answers. Next chapter: those same URLs, as Java methods, if you want a backend.</p>
      `,
      exercise: {
        type: "js-async",
        prompt:
          "Write async function crudRoundtrip() that: POSTs {title:'LabProbe', text:'a'}, PUTs that id with text 'b' (keep title), GETs it and returns the text (should be b), then DELETEs it.",
        starter:
          "async function crudRoundtrip() {\n  const headers = { 'Content-Type': 'application/json' };\n  \n}",
        tests: [
          {
            expr: "await crudRoundtrip()",
            eq: "b",
            msg: "Should return 'b' from the GET after PUT",
          },
        ],
      },
    },
  ],
});
