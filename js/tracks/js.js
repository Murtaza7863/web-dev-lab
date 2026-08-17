window.LEARN_TRACKS = window.LEARN_TRACKS || [];
window.LEARN_TRACKS.push({
  id: "js",
  title: "JavaScript",
  quest: "The Hands",
  blurb:
    "The programming language the browser runs. This is what makes Add actually add.",
  youKnow:
    "You already program. JS is a different syntax in a different host (the browser, not the JVM).",
  lessons: [
    {
      id: "js-1",
      title: "Java vs JavaScript",
      words: ["javascript"],
      body: `
        <p>They are not the same language. The name is a 1990s marketing accident.</p>
        <table class="plain">
          <tr><td>Java</td><td>Compiled, types, JVM. Your CLI.</td></tr>
          <tr><td>JavaScript</td><td>Runs in the browser (and Node). Dynamic types.</td></tr>
        </table>
<pre><span class="c">// Java</span>
<span class="t">double</span> amount = 4.5;

<span class="c">// JavaScript</span>
<span class="t">const</span> amount = 4.5;</pre>
        <ul>
          <li><code>const</code> — won't reassign this name</li>
          <li><code>let</code> — will reassign</li>
          <li><code>var</code> — old, skip it</li>
        </ul>
        <p>Functions:</p>
<pre><span class="t">function</span> <span class="x">add(a, b) {</span>
  <span class="t">return</span> a + b;
<span class="x">}</span></pre>
        <div class="callout java">No class required. No <code>public static</code>. A file of functions is legal.</div>
      `,
      exercise: {
        type: "js",
        prompt:
          "Write function add(a, b) that returns the sum. Write function label(desc, amount) that returns 'Coffee: $4.5' style strings (description + ': $' + amount).",
        starter:
          "function add(a, b) {\n  \n}\n\nfunction label(desc, amount) {\n  \n}",
        tests: [
          { expr: "add(2, 3)", eq: 5, msg: "add(2,3) should be 5" },
          { expr: "add(10, -4)", eq: 6, msg: "add handles negatives" },
          {
            expr: "label('Coffee', 4.5)",
            eq: "Coffee: $4.5",
            msg: "label('Coffee', 4.5) → 'Coffee: $4.5'",
          },
        ],
      },
    },
    {
      id: "js-2",
      title: "Objects and arrays (your Expense class)",
      words: ["javascript"],
      body: `
        <p>Your Java <code>Expense</code> class is three fields. In JS that's an object literal:</p>
<pre><span class="t">const</span> expense = {
  description: <span class="x">"Coffee"</span>,
  amount: 4.5,
  category: <span class="x">"Food"</span>
};
<span class="c">// expense.amount  →  4.5</span></pre>
        <p>A list of them is an array — your <code>ArrayList</code>:</p>
<pre><span class="t">const</span> expenses = [];
expenses.push(expense);
expenses.length;           <span class="c">// 1</span>
expenses.filter(e => e.category === <span class="x">"Food"</span>);</pre>
        <p><code>filter</code> / <code>map</code> / <code>reduce</code> are the replacements for a lot of <code>for</code> loops. You can still write loops.</p>
      `,
      exercise: {
        type: "js",
        prompt:
          "Write total(expenses) that sums .amount. Write byCategory(expenses, cat) that returns only those items.",
        starter:
          "function total(expenses) {\n  \n}\n\nfunction byCategory(expenses, cat) {\n  \n}",
        tests: [
          {
            expr: "total([{amount:4.5},{amount:30}])",
            eq: 34.5,
            msg: "total should sum .amount",
          },
          {
            expr: "byCategory([{category:'Food',amount:1},{category:'Bus',amount:2}], 'Food').length",
            eq: 1,
            msg: "byCategory should filter",
          },
        ],
      },
    },
    {
      id: "js-3",
      title: "The DOM",
      words: ["dom"],
      body: `
        <p><strong>DOM</strong> = Document Object Model. The live tree of HTML elements JS can read and change.</p>
<pre>document.getElementById(<span class="x">"total"</span>).textContent = <span class="x">"$4.50"</span>;

<span class="t">const</span> li = document.createElement(<span class="x">"li"</span>);
li.textContent = <span class="x">"Coffee — $4.50"</span>;
document.getElementById(<span class="x">"expense-list"</span>).appendChild(li);</pre>
        <p>That's how a dead HTML list becomes a live app. HTML is the starting tree. JS mutates it after load.</p>
        <div class="callout java"><code>getElementById</code> is like looking up a field by name. <code>textContent</code> is the setter for what the user sees.</div>
        <p>You'll also see <code>querySelector("#total")</code> (CSS selector) and <code>querySelectorAll(".item")</code>.</p>
      `,
      exercise: {
        type: "js-dom",
        prompt:
          "Set #total's text to $12.00. Add an li that says Tea inside #expense-list.",
        fixture:
          '<p>Total: <strong id="total">$0.00</strong></p><ul id="expense-list"></ul>',
        starter: "// document.getElementById(...)\n",
        checks: [
          { sel: "#total", text: "$12.00", msg: "#total should say $12.00" },
          {
            sel: "#expense-list li",
            text: "Tea",
            msg: "Add an li containing Tea",
          },
        ],
      },
    },
    {
      id: "js-4",
      title: "Events (the button)",
      words: ["event"],
      body: `
        <p>The CLI waits in a <code>while(true)</code> + <code>sc.nextInt()</code>. The browser waits with <strong>events</strong>.</p>
<pre>button.addEventListener(<span class="x">"click"</span>, () => {
  <span class="c">// runs when the user clicks</span>
});</pre>
        <p>Reading an input: <code>document.getElementById("amount").value</code> is always a <em>string</em>. Convert with <code>Number(...)</code>.</p>
<pre>form.addEventListener(<span class="x">"submit"</span>, (e) => {
  e.preventDefault();  <span class="c">// stop page reload</span>
});</pre>
        <div class="callout warn"><code>preventDefault</code> is the JS version of <code>type="button"</code>. Forms want to reload. You stop them.</div>
      `,
      exercise: {
        type: "js-dom",
        prompt:
          "When #go is clicked, copy #src's value into #out's textContent.",
        fixture:
          '<input id="src" value="Coffee"><button id="go" type="button">Go</button><p id="out"></p>',
        starter: 'const go = document.getElementById("go");\n',
        checks: [
          {
            after: (doc) => doc.getElementById("go").click(),
            sel: "#out",
            text: "Coffee",
            msg: "Clicking #go should copy #src value into #out",
          },
        ],
      },
    },
    {
      id: "js-5",
      title: "Add an expense (client only)",
      words: ["javascript", "dom", "event"],
      body: `
        <p>Glue: read inputs → push an object into an array → redraw the list → clear inputs → update total.</p>
        <p>That is your CLI option 1, minus <code>Scanner</code>.</p>
<pre><span class="t">function</span> render() {
  list.innerHTML = <span class="x">""</span>;
  expenses.forEach((e) => {
    <span class="t">const</span> li = document.createElement(<span class="x">"li"</span>);
    li.textContent = e.description + <span class="x">" — $"</span> + e.amount;
    list.appendChild(li);
  });
}</pre>
        <p><code>innerHTML = ""</code> wipes children. Then you rebuild. Crude, clear, fine for this app.</p>
      `,
      exercise: {
        type: "js-dom",
        prompt:
          "On #add click: read #d and #a, append an li like Coffee — $4.5 to #list. Use the input values.",
        fixture:
          '<input id="d" value="Coffee"><input id="a" value="4.5"><button id="add" type="button">Add</button><ul id="list"></ul>',
        starter:
          'const add = document.getElementById("add");\nadd.addEventListener("click", () => {\n  \n});\n',
        checks: [
          {
            after: (doc) => doc.getElementById("add").click(),
            sel: "#list li",
            text: "Coffee",
            msg: "Click Add should append an li mentioning Coffee",
          },
          {
            after: (doc) => doc.getElementById("add").click(),
            sel: "#list li",
            text: "4.5",
            msg: "The li should also mention 4.5",
          },
        ],
      },
    },
    {
      id: "js-6",
      title: "localStorage (your text file)",
      words: ["localStorage"],
      body: `
        <p>Your CLI does <code>saveToFile</code> / <code>loadFromFile</code>. In a static site (GitHub Pages) there is no server disk. The browser gives you <code>localStorage</code> — a key/value string store per origin.</p>
<pre>localStorage.setItem(<span class="x">"expenses"</span>, JSON.stringify(expenses));
<span class="t">const</span> expenses = JSON.parse(localStorage.getItem(<span class="x">"expenses"</span>) || <span class="x">"[]"</span>);</pre>
        <p>Must be strings → <code>JSON.stringify</code>. That's the same idea as your <code>toString()</code> CSV, but structured.</p>
        <div class="callout tip">This PWA saves your lesson progress and the Lab expenses this way. Delete site data = forget progress. That's a real limitation, not a toy one.</div>
      `,
      exercise: {
        type: "js",
        prompt:
          "Write save(key, data) that JSON-stringifies into localStorage. Write load(key) that parses or returns [].",
        starter:
          "function save(key, data) {\n  \n}\n\nfunction load(key) {\n  \n}",
        tests: [
          {
            setup: "save('t', [{a:1}]);",
            expr: "load('t')[0].a",
            eq: 1,
            msg: "save then load should round-trip an array of objects",
          },
          {
            expr: "Array.isArray(load('nope-not-set')) && load('nope-not-set').length === 0",
            eq: true,
            msg: "missing key → []",
          },
        ],
      },
    },
    {
      id: "js-7",
      title: "async / await (the network is slow)",
      words: ["async"],
      body: `
        <p>A function that waits for the network cannot return a value the same millisecond. JS marks that with <code>async</code> and <code>await</code>.</p>
<pre><span class="t">async function</span> load() {
  <span class="t">const</span> res = <span class="t">await</span> fetch(<span class="x">"/api/expenses"</span>);
  <span class="t">return</span> <span class="t">await</span> res.json();
}</pre>
        <ul>
          <li><code>async function</code> — this function returns a Promise (a value that arrives later)</li>
          <li><code>await</code> — pause <em>this</em> function until that Promise finishes. The page does not freeze.</li>
          <li>Only legal inside <code>async</code> functions</li>
        </ul>
        <p>You already waited: <code>sc.next()</code> blocks the CLI. <code>await fetch</code> is the browser version, without blocking painting.</p>
        <div class="callout warn">Forgetting <code>await</code> is the #1 bug. You get a Promise object, not the array. The list looks empty. Add <code>await</code>.</div>
      `,
      exercise: {
        type: "js-async",
        prompt:
          "Write async function doubleAfter(n) that awaits a resolved Promise of n and returns n * 2. Hint: await Promise.resolve(n)",
        starter: "async function doubleAfter(n) {\n  \n}",
        tests: [
          {
            expr: "await doubleAfter(4)",
            eq: 8,
            msg: "doubleAfter(4) should be 8",
          },
        ],
      },
    },
    {
      id: "js-8",
      title: "This is still one computer",
      words: ["frontend", "state"],
      body: `
        <p>You can now: read inputs, push to an array, redraw, save to <code>localStorage</code>. That is a complete app — on <em>this</em> phone.</p>
        <p>Refresh on another laptop: empty. Two tabs: they don't share until they reload from storage. That's not a bug. That's "one process, one origin, one profile."</p>
        <p>Your CLI file on disk had the same limit (one machine). To share expenses you need a <strong>second program</strong> that owns the ArrayList. The browser will <em>call</em> it. That's the next quest: HTTP.</p>
        <div class="callout java">CLI: one JVM, one ArrayList.<br>Web so far: one browser tab, one array.<br>Web next: browser + server. <code>fetch</code> replaces calling <code>tracker.addExpense</code> in-process.</div>
      `,
      exercise: {
        type: "choice",
        prompt: "localStorage on GitHub Pages is enough when…",
        options: [
          {
            id: "a",
            text: "You need one person's expenses on one browser profile",
            ok: true,
          },
          {
            id: "b",
            text: "The whole team should see the same list live",
            ok: false,
          },
          {
            id: "c",
            text: "You install the PWA — then it syncs by magic",
            ok: false,
          },
        ],
        why: "Install does not create a server. Shared truth needs HTTP to a backend. Next quest.",
      },
    },
  ],
});
