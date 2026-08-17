window.LEARN_TRACKS = window.LEARN_TRACKS || [];
window.LEARN_TRACKS.push({
  id: "http",
  title: "HTTP, JSON, APIs",
  quest: "The Call",
  blurb: "How the browser talks to a backend. fetch, JSON, status codes.",
  youKnow:
    "Your CLI calls methods on ExpenseTracker in-process. A web app often calls a server over HTTP instead.",
  lessons: [
    {
      id: "http-1",
      title: "Client and server",
      words: ["http", "request", "response", "api"],
      body: `
        <p>Two programs:</p>
        <ul>
          <li><strong>Client</strong> — this PWA, running in your browser</li>
          <li><strong>Server</strong> — Java/Spring (or anything) waiting for requests</li>
        </ul>
        <p>They talk <strong>HTTP</strong>: the client sends a <strong>request</strong>, the server sends a <strong>response</strong>.</p>
        <p>An <strong>API</strong> is the agreed shape of those messages: which URLs, which methods, which JSON. Not a library. A contract.</p>
        <div class="callout java">
          CLI: <code>tracker.addExpense(e)</code> — same process, a method call.<br>
          Web: <code>POST /api/expenses</code> with a JSON body — different process, maybe a different machine.
        </div>
        <p>GitHub Pages can only host the client. The mock API in this PWA fakes the server so you can practice <code>fetch</code> without installing Spring yet.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "Your browser loading this lesson is the…",
        options: [
          { id: "a", text: "Server", ok: false },
          { id: "b", text: "Client", ok: true },
          { id: "c", text: "Database", ok: false },
        ],
        why: "The browser is always the client. Spring Boot would be the server. GitHub Pages is just a file host for the client.",
      },
    },
    {
      id: "http-2",
      title: "Methods and status codes",
      words: ["get", "post", "status-code"],
      body: `
        <p>The <strong>method</strong> is the verb. The <strong>path</strong> is which thing. Together they mean "do this to that."</p>
        <table class="plain">
          <tr><td><code>GET</code></td><td>Read. No body. Repeatable.</td></tr>
          <tr><td><code>POST</code></td><td>Create. Body is the new thing.</td></tr>
          <tr><td><code>PUT</code> / <code>PATCH</code></td><td>Update.</td></tr>
          <tr><td><code>DELETE</code></td><td>Remove.</td></tr>
        </table>
        <p>The response starts with a <strong>status code</strong>:</p>
        <table class="plain">
          <tr><td><code>200</code></td><td>OK (GET usually)</td></tr>
          <tr><td><code>201</code></td><td>Created (POST succeeded)</td></tr>
          <tr><td><code>204</code></td><td>OK, no body (DELETE often)</td></tr>
          <tr><td><code>400</code></td><td>You sent junk</td></tr>
          <tr><td><code>404</code></td><td>That id/url doesn't exist</td></tr>
          <tr><td><code>500</code></td><td>Server crashed</td></tr>
        </table>
        <div class="callout java">Status codes are the web's return values. <code>void</code> + exception vs <code>204</code> + <code>404</code>.</div>
      `,
      exercise: {
        type: "choice",
        prompt:
          "You request GET /api/expenses/99 and nothing has id 99. Typical status?",
        options: [
          { id: "a", text: "200", ok: false },
          { id: "b", text: "201", ok: false },
          { id: "c", text: "404", ok: true },
          { id: "d", text: "500", ok: false },
        ],
        why: "404 = the resource isn't there. 500 would mean the server threw. 200 would mean you found it.",
      },
    },
    {
      id: "http-3",
      title: "JSON",
      words: ["json"],
      body: `
        <p>JSON is a text format for objects and arrays. Language-neutral. Java and JS both speak it.</p>
<pre>{
  <span class="a">"description"</span>: <span class="x">"Coffee"</span>,
  <span class="a">"amount"</span>: 4.5,
  <span class="a">"category"</span>: <span class="x">"Food"</span>
}</pre>
        <ul>
          <li>Keys in double quotes</li>
          <li>Strings in double quotes (not single)</li>
          <li>No trailing comma</li>
          <li>No comments</li>
        </ul>
        <p>JS: <code>JSON.stringify(obj)</code> / <code>JSON.parse(text)</code></p>
        <p>Java: libraries (Jackson, used by Spring) turn JSON into your <code>Expense</code> class.</p>
        <div class="callout java">Your <code>toString()</code> CSV (<code>Coffee,4.5,Food</code>) is a homemade format. JSON is the one APIs standardized on.</div>
      `,
      exercise: {
        type: "text",
        prompt:
          "Type a JSON object with description Coffee (string), amount 4.5 (number), category Food (string). No trailing comma.",
        placeholder: '{ "description": ... }',
        check: (raw) => {
          let v;
          try {
            v = JSON.parse(raw);
          } catch {
            return {
              ok: false,
              msg: "Not valid JSON. Double quotes, no trailing comma.",
            };
          }
          if (v.description !== "Coffee")
            return { ok: false, msg: "description should be Coffee" };
          if (v.amount !== 4.5)
            return {
              ok: false,
              msg: "amount should be the number 4.5, not a string",
            };
          if (v.category !== "Food")
            return { ok: false, msg: "category should be Food" };
          return {
            ok: true,
            msg: "That's a request body Spring can turn into Expense.",
          };
        },
      },
    },
    {
      id: "http-4",
      title: "fetch GET",
      words: ["fetch", "api"],
      body: `
        <p><code>fetch</code> is how JS sends HTTP.</p>
<pre><span class="t">const</span> res = <span class="t">await</span> fetch(<span class="x">"/api/expenses"</span>);
<span class="t">const</span> data = <span class="t">await</span> res.json();  <span class="c">// parse JSON body</span>
<span class="c">// data is an array of expenses</span></pre>
        <p><code>await</code> because the network is slow — you practiced that in The Hands. The function must be <code>async</code>.</p>
        <p>This PWA intercepts <code>/api/...</code> and answers like Spring would. Open the Lab tab after this — the list is a GET.</p>
<pre><span class="t">async function</span> load() {
  <span class="t">const</span> res = <span class="t">await</span> fetch(<span class="x">"/api/expenses"</span>);
  <span class="t">if</span> (!res.ok) <span class="t">throw new</span> Error(res.status);
  <span class="t">return</span> res.json();
}</pre>
      `,
      exercise: {
        type: "js-async",
        prompt:
          "Write async function listExpenses() that GET /api/expenses and returns the parsed JSON array.",
        starter: "async function listExpenses() {\n  \n}",
        tests: [
          {
            expr: "(await listExpenses()).length >= 2",
            eq: true,
            msg: "Should return the seeded list (at least Coffee and Bus)",
          },
          {
            expr: "(await listExpenses()).some(e => e.description === 'Coffee')",
            eq: true,
            msg: "Should include Coffee",
          },
        ],
      },
    },
    {
      id: "http-5",
      title: "fetch POST",
      words: ["fetch", "post", "json"],
      body: `
        <p>Create needs a method and a body. You must say it's JSON:</p>
<pre><span class="t">const</span> res = <span class="t">await</span> fetch(<span class="x">"/api/expenses"</span>, {
  method: <span class="x">"POST"</span>,
  headers: { <span class="x">"Content-Type"</span>: <span class="x">"application/json"</span> },
  body: JSON.stringify({
    description: <span class="x">"Tea"</span>,
    amount: 3,
    category: <span class="x">"Food"</span>
  })
});
<span class="t">const</span> created = <span class="t">await</span> res.json();  <span class="c">// includes id from server</span></pre>
        <p>The server assigns <code>id</code>. Don't invent ids on the client if the API owns them.</p>
        <p>This mock returns <code>201</code> plus the new object. A real Spring <code>@PostMapping</code> does the same.</p>
      `,
      exercise: {
        type: "js-async",
        prompt:
          "Write async function createExpense(desc, amount, category) that POSTs JSON to /api/expenses and returns the created object (with id).",
        starter:
          "async function createExpense(desc, amount, category) {\n  \n}",
        tests: [
          {
            expr: "(await createExpense('SkillCheckSnack', 1.25, 'Food')).description",
            eq: "SkillCheckSnack",
            msg: "Returned object should include the description you sent",
          },
          {
            expr: "typeof (await createExpense('SkillCheckSnack2', 1.25, 'Food')).id",
            eq: "number",
            msg: "Server should assign a numeric id",
          },
        ],
      },
    },
    {
      id: "http-6",
      title: "Anatomy of one request (Network tab)",
      words: ["request", "response", "headers"],
      body: `
        <p>Every <code>fetch</code> is the same five parts. Open DevTools → <strong>Network</strong>, click Add in the Lab, click the row:</p>
        <table class="plain">
          <tr><td>Method</td><td><code>POST</code></td></tr>
          <tr><td>URL</td><td><code>/api/expenses</code></td></tr>
          <tr><td>Headers</td><td>metadata. <code>Content-Type: application/json</code> means "body is JSON"</td></tr>
          <tr><td>Body</td><td>the Expense as JSON</td></tr>
          <tr><td>Status + body back</td><td><code>201</code> + the saved object with <code>id</code></td></tr>
        </table>
        <p>That is the whole conversation. Spring's job is to receive those five and run your Java. REST's job is to pick boring URLs so everyone guesses the same five.</p>
        <div class="callout tip">If a feature "doesn't work," Network is the first stop: did the request leave? Status 4xx you sent junk. 5xx the server threw. No row = JS never called fetch.</div>
      `,
      exercise: {
        type: "choice",
        prompt: "The Lab POST returns 400. Where do you look first?",
        options: [
          { id: "a", text: "Rewrite Spring. It's always Spring.", ok: false },
          {
            id: "b",
            text: "The request body/headers — 400 means the client sent junk",
            ok: true,
          },
          { id: "c", text: "CSS", ok: false },
        ],
        why: "400 = validation. You already wrote that in Main. Network tab shows the body you actually sent.",
      },
    },
  ],
});
