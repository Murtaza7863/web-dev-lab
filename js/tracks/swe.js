window.LEARN_TRACKS = window.LEARN_TRACKS || [];
window.LEARN_TRACKS.push({
  id: "swe",
  title: "How the parts fit",
  quest: "The Pieces",
  blurb:
    "You already made a page. This names the jobs an app has — still your expense tracker, still English.",
  youKnow:
    "You can show text in a browser and you can write Java. This quest only names: take input, apply rules, remember, show.",
  lessons: [
    {
      id: "swe-1",
      title: "You can code. That isn't building.",
      words: ["spec"],
      body: `
        <p>You can already put words on a page. A loop is still just a tool. An <strong>app</strong> (your tracker) still has four jobs — the same four as your CLI:</p>
        <ol>
          <li><strong>Input</strong> — user types, clicks, or a phone sends data</li>
          <li><strong>Rules</strong> — reject bad amounts, compute totals</li>
          <li><strong>Store</strong> — remember it after refresh / restart</li>
          <li><strong>Output</strong> — show a list, print a line, send JSON</li>
        </ol>
        <p>Your CLI already is that machine. <code>Scanner</code> is input. <code>ExpenseTracker</code> is rules. The text file is store. <code>println</code> is output.</p>
        <p>Vibe-coding feels productive because it sprays syntax. Building is deciding those four jobs <em>on purpose</em>, then writing the smallest code that does them.</p>
        <div class="callout warn"><strong>The trap:</strong> "I should learn Spring Boot" before you can say what the app <em>does</em>. Frameworks are costumes. The machine underneath is always input → rules → store → output.</div>
        <div class="callout java">If you can point at those four in <code>Main.java</code>, you already built software. The web is the same machine with a prettier input and a network in the middle.</div>
      `,
      exercise: {
        type: "choice",
        prompt:
          "You write a beautiful Expense class and a for-loop that prints it. Nothing reads input, nothing saves. What do you have?",
        options: [
          { id: "a", text: "An app — classes are basically apps", ok: false },
          {
            id: "b",
            text: "A piece. Missing input, store, or a way for a human to use it",
            ok: true,
          },
          { id: "c", text: "A backend", ok: false },
        ],
        why: "OOP is how you model the noun. An app is the loop around it: get data in, do rules, keep it, show it.",
      },
    },
    {
      id: "swe-2",
      title: "Write the spec before the stack",
      words: ["spec"],
      body: `
        <p>A <strong>spec</strong> is a short honest list of what a human can do. Not Java. Not Spring. Sentences.</p>
        <div class="demo">
          <div class="demo-label">Expense tracker spec (the whole product)</div>
          <ul>
            <li>Add an expense: description, amount, category</li>
            <li>See all expenses and a total</li>
            <li>Delete one</li>
            <li>Survive restart (save)</li>
          </ul>
        </div>
        <p>That's it. Filter-by-category is a bonus. Login is not in the spec until you say it is. "I need a REST API" is not a spec — it's a costume you might put on later.</p>
        <p>Job posts say <em>requirements</em> / <em>user stories</em>. Same thing: "As a user I can add an expense." If you can't write five of those, you are not ready for a framework. You are ready for a list.</p>
        <div class="callout tip">When you vibe-code, the AI invents a spec you never agreed to (auth, dark mode, microservices). Steal the wheel back: spec first, then one feature.</div>
      `,
      exercise: {
        type: "text",
        prompt:
          "Write a one-line spec for add. Must mention the user/action and the three fields (description, amount, category). Example shape: User can add an expense with …",
        placeholder: "User can …",
        expected:
          "User can add an expense with description, amount, and category.",
        check: (raw) => {
          const s = raw.toLowerCase();
          const hasUser = /user|i can|we can|allow|you can/.test(s);
          const hasAdd = /add|create|enter|save|log|record/.test(s);
          const hasD = /desc|name|item|title|what/.test(s);
          const hasA = /amount|price|cost|money|\$/.test(s);
          const hasC = /categor|type|tag/.test(s);
          if (hasUser && hasAdd && hasD && hasA && hasC) {
            return {
              ok: true,
              msg: "That's a requirement. Spring still doesn't belong in this sentence.",
            };
          }
          return {
            ok: false,
            msg: "Need: who (user), the verb (add/create), and description + amount + category. Or Skip if the checker is being a jerk.",
          };
        },
      },
    },
    {
      id: "swe-3",
      title: "Data model first (the noun)",
      words: ["data-model"],
      body: `
        <p>After the spec, name the <strong>thing</strong> you store. That's the <strong>data model</strong> (also called schema, entity, record).</p>
        <p>Yours is already written:</p>
<pre><span class="t">class</span> Expense {
  description;  <span class="c">// string</span>
  amount;       <span class="c">// number &gt; 0</span>
  category;     <span class="c">// string</span>
}</pre>
        <p>Web version adds <code>id</code> — a unique handle so "delete Coffee" doesn't delete the wrong Coffee. That's why APIs look like <code>/expenses/3</code>.</p>
        <p>If two programmers argue about JSON vs Java vs a database row: they're looking at the same noun in different costumes. Get the fields right once.</p>
        <div class="callout java"><strong>OOP you already know:</strong> a class with fields <em>is</em> the model. Builders get stuck because they start with folders named <code>controller</code> and empty files. Start with the noun.</div>
      `,
      exercise: {
        type: "choice",
        prompt:
          "You're about to 'learn Spring.' What should exist on paper first?",
        options: [
          {
            id: "a",
            text: "A folder of empty Controller/Service/Repository classes",
            ok: false,
          },
          {
            id: "b",
            text: "The Expense fields (and whether it needs an id)",
            ok: true,
          },
          { id: "c", text: "A Kubernetes cluster", ok: false },
        ],
        why: "Frameworks wrap the noun. If the noun is mush, Spring just serves mush over HTTP.",
      },
    },
    {
      id: "swe-4",
      title: "List the verbs (this is the API)",
      words: ["crud"],
      body: `
        <p>Nouns sit there. <strong>Verbs</strong> are what the user does to them. Write them in plain language before HTTP exists:</p>
        <table class="plain">
          <tr><td>add(expense)</td><td>Create</td></tr>
          <tr><td>listAll() / total()</td><td>Read</td></tr>
          <tr><td>change amount on #3</td><td>Update (you skipped this in the CLI)</td></tr>
          <tr><td>remove(id)</td><td>Delete</td></tr>
        </table>
        <p>That list <em>is</em> your API. Later you stamp HTTP on it (<code>POST /api/expenses</code>). The buzzword <strong>CRUD</strong> is just "did we cover those four verbs."</p>
        <p>If a feature isn't a verb on a noun, it's decoration (animations, themes) or a new noun (User, Budget).</p>
        <div class="callout tip">Interview "design an API" means: nouns, verbs, what you send, what you get back. You can do that on paper in 10 minutes. You already did it in a menu.</div>
      `,
      exercise: {
        type: "text",
        prompt:
          "Type the four CRUD letters in order, space-separated, matching Create Read Update Delete.",
        placeholder: "C R U D",
        expected: "C R U D",
        check: (raw) => {
          const letters = raw.toLowerCase().replace(/[^a-z]/g, "");
          const ok = letters === "crud" || letters === "createreadupdatedelete";
          return ok
            ? {
                ok: true,
                msg: "That's the whole genre of 'CRUD app.' Your CLI is 3/4 of it (no Update).",
              }
            : { ok: false, msg: "Type: C R U D  (or just CRUD)" };
        },
      },
    },
    {
      id: "swe-5",
      title: "Three layers (stop mixing them)",
      words: ["separation-of-concerns"],
      body: `
        <p><strong>Separation of concerns</strong> means: don't put the menu, the rules, and the file in one blob. Three piles:</p>
        <table class="plain">
          <tr><td><strong>UI / adapter</strong></td><td>How a human (or browser) talks. Scanner. HTML form. HTTP.</td></tr>
          <tr><td><strong>Rules / domain</strong></td><td>Amount must be &gt; 0. Totals. "Expense" meaning.</td></tr>
          <tr><td><strong>Storage</strong></td><td>ArrayList, text file, database. Dumb on purpose.</td></tr>
        </table>
        <p>Your <code>Main</code> is UI. <code>ExpenseTracker</code> mixed rules + storage (that's fine for a first app). Spring names them Controller / Service / Repository — same three piles, fancier hats.</p>
        <p>Why bother: you can swap Scanner for a webpage <em>without rewriting totals</em>. That's the whole point of a backend.</p>
        <div class="callout java">If <code>viewAllExpenses</code> both calculates and <code>println</code>s, the web can't reuse it. Return data from rules; let UI print or render.</div>
      `,
      exercise: {
        type: "choice",
        prompt: "System.out.println and Scanner belong in which pile?",
        options: [
          { id: "a", text: "Storage — they're how Java saves", ok: false },
          {
            id: "b",
            text: "UI / adapter — talking to a human in the terminal",
            ok: true,
          },
          { id: "c", text: "Rules — printing is business logic", ok: false },
        ],
        why: "HTML + JS is a different adapter on the same rules. That's 'frontend vs backend' without the mystique.",
      },
    },
    {
      id: "swe-6",
      title: "State: three copies that lie to each other",
      words: ["state"],
      body: `
        <p><strong>State</strong> means "the data right now." In a running app you usually have three copies:</p>
        <ol>
          <li><strong>Memory</strong> — the ArrayList / JS array</li>
          <li><strong>Screen</strong> — what the user sees (the HTML list, the println)</li>
          <li><strong>Disk</strong> — the file / database / localStorage</li>
        </ol>
        <p>Bugs are almost always "these three disagree." You added in memory but didn't redraw. You showed a list but didn't save. You saved CSV but parsed it wrong on load.</p>
        <p>Builders have a ritual: <em>change state → write it down → update the screen.</em> Miss a step, ship a ghost.</p>
        <div class="callout warn">Vibe-code symptom: the UI looks right, refresh, everything's gone. You decorated the screen and skipped the store.</div>
      `,
      exercise: {
        type: "choice",
        prompt:
          "User clicks Add. Memory has the new expense. The page still shows the old list. What failed?",
        options: [
          { id: "a", text: "The database caught fire", ok: false },
          {
            id: "b",
            text: "Screen state wasn't updated (you forgot to re-render)",
            ok: true,
          },
          { id: "c", text: "JSON is deprecated", ok: false },
        ],
        why: "Fix: after you push to the array, rebuild the list from the array. One source of truth, then paint.",
      },
    },
    {
      id: "swe-7",
      title: "Errors are part of the product",
      words: ["validation", "edge-case"],
      body: `
        <p>Happy path: amount is 4.50, everything saves. Real users type <code>-3</code>, blank description, the letter <code>e</code>, or delete an id that doesn't exist.</p>
        <p><strong>Validation</strong> = reject junk <em>before</em> it becomes state. You already did this in <code>Main</code> (<code>amt &lt;= 0</code>).</p>
        <p>On the web those become status codes: <code>400</code> you sent junk, <code>404</code> that id isn't there, <code>500</code> your code crashed. Crashing is not validation.</p>
        <p>An <strong>edge case</strong> is a boring situation you forgot: empty list, two Coffees, huge totals, decimal money (use cents if you get serious).</p>
        <div class="callout tip">When you debug: don't restart the whole app in ChatGPT. Reproduce the bad input. Watch which of the three states is wrong. Fix that step.</div>
      `,
      exercise: {
        type: "choice",
        prompt: "POST /api/expenses with amount: -4. The server should…",
        options: [
          { id: "a", text: "Save it. Negative expenses are a vibe", ok: false },
          {
            id: "b",
            text: "Reject it (400). That's validation — you already wrote this in the CLI",
            ok: true,
          },
          { id: "c", text: "Return 500 because Spring is angry", ok: false },
        ],
        why: "500 means you threw. 400 means you noticed. Noticing is the job.",
      },
    },
    {
      id: "swe-8",
      title: "Ship a slice, then debug like a grown-up",
      words: ["vertical-slice", "debug"],
      body: `
        <p>A <strong>vertical slice</strong> is one feature working through all layers: add-expense from form → rules → store → list updates. Not "seven empty Spring files."</p>
        <p>Order that actually ships:</p>
        <ol>
          <li>Spec one verb (add)</li>
          <li>Model the noun</li>
          <li>Make it work in the dumbest UI (CLI or a single HTML page)</li>
          <li>Then dress it (CSS, HTTP, Spring) <em>without changing the meaning</em></li>
        </ol>
        <p><strong>Debug loop</strong> (memorize this, it's the whole job):</p>
        <ol>
          <li>Reproduce it. Same click, same input.</li>
          <li>Name which state is wrong (memory / screen / disk).</li>
          <li>Make the failure small (one function, one request).</li>
          <li>Fix that. Don't rewrite the app.</li>
        </ol>
        <p>That's software engineering. Spring, REST, PWA are costumes you put on a slice that already works.</p>
        <div class="callout java">Next quests teach the costumes, always on this same expense tracker. If a buzzword doesn't map to a noun, a verb, or a layer, it's noise.</div>
      `,
      exercise: {
        type: "choice",
        prompt: "You have one weekend. What's the grown-up plan?",
        options: [
          {
            id: "a",
            text: "Generate a Spring + React + Docker repo, then 'fill in logic'",
            ok: false,
          },
          {
            id: "b",
            text: "One slice: add an expense, see it, survive refresh. Then the next verb.",
            ok: true,
          },
          {
            id: "c",
            text: "Watch a 4-hour microservices video so you're ready",
            ok: false,
          },
        ],
        why: "Empty architecture is cosplay. A working add() you understand is a product.",
      },
    },
    {
      id: "swe-9",
      title: "The costume order (do not skip)",
      words: ["vertical-slice", "frontend", "backend"],
      body: `
        <p>You now have the machine. The rest of this lab is eight costumes, always on the expense tracker, in this order on purpose:</p>
        <ol>
          <li><strong>HTML</strong> — the document (structure)</li>
          <li><strong>CSS</strong> — how boxes are drawn (look)</li>
          <li><strong>JS</strong> — clicks change memory + screen (still one computer)</li>
          <li><strong>HTTP/JSON</strong> — talk to a second program</li>
          <li><strong>CRUD/REST</strong> — name those talks</li>
          <li><strong>Spring Boot</strong> — that second program, in Java</li>
          <li><strong>PWA / Pages</strong> — ship the client as files</li>
        </ol>
        <p>Skip to Spring and you will copy annotations you cannot point at. Each quest ends by unlocking the next layer of the <em>same</em> Add click.</p>
        <div class="callout tip"><strong>Frontend</strong> = HTML + CSS + JS (what this Pages site is).<br><strong>Backend</strong> = the other process (Spring). The Lab fakes a backend so you can practice the talk before you run Java.</div>
      `,
      exercise: {
        type: "choice",
        prompt: "Why is JavaScript before HTTP in this lab?",
        options: [
          { id: "a", text: "Because JS is a backend language", ok: false },
          {
            id: "b",
            text: "You need clicks and the DOM first. HTTP is how those clicks talk to another program.",
            ok: true,
          },
          { id: "c", text: "GitHub Pages requires JS before HTML", ok: false },
        ],
        why: "Local add() is one process. fetch() is two. Don't rent a server until the button works.",
      },
    },
  ],
});
