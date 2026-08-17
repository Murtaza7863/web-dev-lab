window.LEARN_TRACKS = window.LEARN_TRACKS || [];
window.LEARN_TRACKS.push({
  id: "crud",
  title: "CRUD + REST",
  quest: "The Dungeon",
  blurb: "Create Read Update Delete — your CLI menu, as HTTP.",
  youKnow:
    "You already built CRUD. Add / view / remove in Main.java is CRUD with a Scanner instead of HTTP.",
  lessons: [
    {
      id: "crud-1",
      title: "You already wrote CRUD",
      words: ["crud"],
      body: `
        <p><strong>CRUD</strong> is a label for four operations every data app has:</p>
        <table class="plain">
          <tr><td>Create</td><td>CLI 1. Add Expense</td><td><code>addExpense</code></td></tr>
          <tr><td>Read</td><td>CLI 3–6. View / totals</td><td><code>viewAllExpenses</code></td></tr>
          <tr><td>Update</td><td>(you skipped this in the CLI)</td><td>change amount/category</td></tr>
          <tr><td>Delete</td><td>CLI 2. Remove Expense</td><td><code>removeExpenseByDescription</code></td></tr>
        </table>
        <p>The word is not a technology. It's a checklist. Interviewers say "CRUD app" meaning "can you move records in and out of a store."</p>
        <div class="callout tip">If you can map each CLI menu item to Create/Read/Update/Delete, you understand CRUD. The rest is transport (HTTP) and storage (file vs database).</div>
      `,
      exercise: {
        type: "choice",
        prompt: 'tracker.viewExpensesByCategory("Food") is which letter?',
        options: [
          { id: "c", text: "Create", ok: false },
          { id: "r", text: "Read", ok: true },
          { id: "u", text: "Update", ok: false },
          { id: "d", text: "Delete", ok: false },
        ],
        why: "It only looks at data. Read. Totals are also Read.",
      },
    },
    {
      id: "crud-2",
      title: "REST URLs",
      words: ["rest"],
      body: `
        <p><strong>REST</strong> is a convention: the URL is a noun (the thing), the HTTP method is the verb (what to do).</p>
        <table class="plain">
          <tr><td><code>GET /api/expenses</code></td><td>list all</td></tr>
          <tr><td><code>GET /api/expenses/3</code></td><td>one by id</td></tr>
          <tr><td><code>POST /api/expenses</code></td><td>create</td></tr>
          <tr><td><code>PUT /api/expenses/3</code></td><td>replace/update 3</td></tr>
          <tr><td><code>DELETE /api/expenses/3</code></td><td>delete 3</td></tr>
        </table>
        <p>Not REST: <code>POST /api/getExpenses</code> or <code>/api/doAdd</code>. That's RPC named like Java methods. It works. It's just not the convention people mean by "REST API."</p>
        <p>Ids in the path (<code>/3</code>) beat ids in the query for a single resource. Filters can be query strings: <code>GET /api/expenses?category=Food</code>.</p>
      `,
      exercise: {
        type: "text",
        prompt:
          "What HTTP method + path would delete expense id 7? Type like: DELETE /api/expenses/7",
        placeholder: "METHOD /path",
        expected: "DELETE /api/expenses/7",
        check: (raw) => {
          const s = raw.trim().replace(/["'`]/g, "").replace(/\s+/g, " ");
          const ok = /^DELETE\s+(?:\/[\w.-]+)*\/expenses\/7\/?$/i.test(s);
          return ok
            ? { ok: true, msg: "Noun in the URL, verb in the method." }
            : { ok: false, msg: "Expected: DELETE /api/expenses/7 — or Skip." };
        },
      },
    },
    {
      id: "crud-3",
      title: "PUT and DELETE with fetch",
      words: ["put", "delete"],
      body: `
<pre><span class="t">await</span> fetch(<span class="x">"/api/expenses/1"</span>, {
  method: <span class="x">"PUT"</span>,
  headers: { <span class="x">"Content-Type"</span>: <span class="x">"application/json"</span> },
  body: JSON.stringify({ description: <span class="x">"Latte"</span>, amount: 5.5, category: <span class="x">"Food"</span> })
});

<span class="t">await</span> fetch(<span class="x">"/api/expenses/1"</span>, { method: <span class="x">"DELETE"</span> });</pre>
        <p>PUT sends the new full object. PATCH (optional) sends just the fields that change. This mock treats them the same.</p>
        <p>DELETE often returns <code>204</code> with an empty body. Don't call <code>.json()</code> on 204 — there's nothing to parse.</p>
      `,
      exercise: {
        type: "js-async",
        prompt:
          "Write async function removeExpense(id) that DELETE /api/expenses/{id} and returns true if status is 204 or 200.",
        starter: "async function removeExpense(id) {\n  \n}",
        tests: [
          {
            setup:
              "const row = await (await fetch('/api/expenses',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({description:'ToDelete',amount:1,category:'X'})})).json(); self.__delId = row.id;",
            expr: "await removeExpense(self.__delId)",
            eq: true,
            msg: "DELETE of a real id should return true",
          },
        ],
      },
    },
    {
      id: "crud-4",
      title: "Do all four in the Lab",
      words: ["crud", "rest"],
      body: `
        <p>The Lab tab is a real CRUD UI against the mock API. Network log at the bottom is the HTTP you used to invent by clicking.</p>
        <p>Your job this lesson: write a tiny script that does all four without the UI.</p>
        <ol>
          <li>GET list</li>
          <li>POST a new one named LabProbe</li>
          <li>PUT it to change amount to 9.99</li>
          <li>DELETE it</li>
        </ol>
        <p>After this, "CRUD API" should mean something in your hands, not a slide.</p>
        <p>The Lab's "server" is still JavaScript in this page. Next quest: the same URLs, implemented in Java — Controller, Service, Repository.</p>
      `,
      exercise: {
        type: "js-async",
        prompt:
          "Write async function crudRoundtrip() that: POSTs {description:'LabProbe', amount:1, category:'Test'}, PUTs that id with amount 9.99 (keep description/category), GETs it and returns the amount (should be 9.99), then DELETEs it.",
        starter:
          "async function crudRoundtrip() {\n  const headers = { 'Content-Type': 'application/json' };\n  \n}",
        tests: [
          {
            expr: "await crudRoundtrip()",
            eq: 9.99,
            msg: "Should return 9.99 from the GET after PUT",
          },
        ],
      },
    },
  ],
});
