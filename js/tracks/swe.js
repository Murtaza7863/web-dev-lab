window.LEARN_TRACKS = window.LEARN_TRACKS || [];
window.LEARN_TRACKS.push({
  id: "swe",
  title: "The jobs",
  quest: "The jobs",
  blurb:
    "You already made a page and a click. This only names the jobs: take input, apply rules, remember, show.",
  youKnow:
    "HTML, CSS, JavaScript, and Git already happened. This chapter does not teach tags or commits again. It names what you just built.",
  lessons: [
    {
      id: "swe-1",
      title: "Four jobs, not a new language",
      words: ["spec"],
      body: `
        <p>You already built a page: tags, paint, a click that reads a box and can run <code>if</code>. That is not a new language. It is still four jobs every app has, whether it is a Java terminal or a website:</p>
        <ol>
          <li><strong>Input</strong> — the user types or clicks. You do not guess the value. In Java that was <code>sc.next()</code>. On the page that was <code>.value</code> after a click.</li>
          <li><strong>Rules</strong> — reject junk, or compute something. <code>if (name === "") return;</code> is a rule. So is “age must not be negative.”</li>
          <li><strong>Store</strong> — remember after refresh. An array in memory dies when the tab closes. <code>localStorage</code> (or a file, or a database later) is store.</li>
          <li><strong>Output</strong> — show a list or a line of text. <code>println</code> in Java. <code>textContent</code> and <code>appendChild</code> on the page.</li>
        </ol>
        <p>A class by itself is not an app. <code>Person</code> with a loop that prints one object is a noun plus a demo. An app is the loop around it: take input, apply rules, remember, show.</p>
        <p>This chapter only names those jobs. We will not restart HTML.</p>
      `,
      exercise: {
        type: "choice",
        prompt:
          "You have a Person class and a loop that prints it. Nothing reads input. Nothing saves. What do you have?",
        options: [
          { id: "a", text: "A finished app", ok: false },
          {
            id: "b",
            text: "A piece. Missing input, store, or a way for a human to use it",
            ok: true,
          },
          { id: "c", text: "HTML", ok: false },
        ],
        why: "A class is the noun. An app is the loop around it.",
      },
    },
    {
      id: "swe-2",
      title: "Write what a human can do",
      words: ["spec"],
      body: `
        <div class="callout word"><strong>New word — spec.</strong> A short list of what a person can do, in sentences. Not Spring. Not HTML. Not “use a framework.”</div>
        <p>Before you pick tools, write the sentences. If you cannot write them, you do not know what to build yet. A framework will not invent the sentences for you.</p>
        <div class="demo">
          <div class="demo-label">Example spec</div>
          <ul>
            <li>Add a note with a title and some text</li>
            <li>See all notes</li>
            <li>Delete one</li>
            <li>Survive refresh</li>
          </ul>
        </div>
        <p>Each line has a <strong>who</strong> (the user) and a <strong>verb</strong> (add, see, delete). “Survive refresh” is store: after they close the tab, the notes are still there on this browser.</p>
        <p>Bad spec: “Use REST and a microservice.” That names tools, not what a human can do. Good spec: “User can add a note with a title and text.”</p>
        <p>If you cannot write five of those sentences, you are not ready for a framework. You are ready for a list on paper.</p>
      `,
      exercise: {
        type: "text",
        prompt:
          "One line: a user can add a note with a title and text. Mention the user, add, title, and text.",
        placeholder: "User can …",
        expected: "User can add a note with a title and text.",
        check: (raw) => {
          const s = raw.toLowerCase();
          const hasUser = /user|i can|we can|allow|you can/.test(s);
          const hasAdd = /add|create|enter|save|write/.test(s);
          const hasT = /title|name|heading/.test(s);
          const hasX = /text|body|message|note|content/.test(s);
          if (hasUser && hasAdd && hasT && hasX) {
            return {
              ok: true,
              msg: "That’s a requirement. No framework in the sentence.",
            };
          }
          return {
            ok: false,
            msg: "Need: who (user), the verb (add), title, and text. Or Skip.",
          };
        },
      },
    },
    {
      id: "swe-3",
      title: "Name the thing you store",
      words: ["data-model"],
      body: `
        <p>After the spec, name the <strong>thing</strong> you keep. Fields only. Not the button. Not the color. The data.</p>
<pre><span class="t">class</span> Note {
  String title;
  String text;
}</pre>
        <p>That is the same idea as <code>Person</code> with <code>name</code> and <code>age</code>. A note has a title and some text, so those two fields live on one object.</p>
        <div class="callout word"><strong>New word — data model.</strong> The named fields of the thing you store. Get this right once. JSON, a Java class, and a database row are the same noun in different clothes.</div>
        <p>On the web you often add <code>id</code> — a unique handle so “delete this one” hits the right row when two notes have the same title. The user may never type the id. The program assigns it.</p>
        <p>If the fields are mush (“stuff”, “data”, “info”), every later chapter will be mush. Title and text are enough for a note.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "Before you pick a framework, what should exist on paper?",
        options: [
          { id: "a", text: "Empty Controller folders", ok: false },
          {
            id: "b",
            text: "The fields of the thing you store (and whether it needs an id)",
            ok: true,
          },
          { id: "c", text: "A cluster", ok: false },
        ],
        why: "Frameworks wrap the noun. Mush in, mush out.",
      },
    },
    {
      id: "swe-4",
      title: "List the verbs",
      words: ["crud"],
      body: `
        <p>A <code>Note</code> sits there. It does not do anything until a human (or a program) acts. <strong>Verbs</strong> are what the user does to that noun:</p>
        <table class="plain">
          <tr><td>add</td><td>Create — make a new note</td></tr>
          <tr><td>list / show one</td><td>Read — look without changing</td></tr>
          <tr><td>change</td><td>Update — edit title or text</td></tr>
          <tr><td>remove</td><td>Delete — throw it away</td></tr>
        </table>
        <p>That English list <em>is</em> the API, before HTTP exists. Later you stamp a method and a URL on each verb. You already practiced add + list in JavaScript (click, <code>if</code>, append). Change and delete are the same idea with a different action.</p>
        <div class="callout word"><strong>New word — CRUD.</strong> Create, Read, Update, Delete. A nickname for those four letters. Not a library. Not a server. A checklist: did we implement all four, or only add?</div>
        <p>You do not have to ship all four on day one. You do have to know which ones you skipped.</p>
      `,
      exercise: {
        type: "text",
        prompt: "Type the four CRUD letters in order, space-separated.",
        placeholder: "C R U D",
        expected: "C R U D",
        check: (raw) => {
          const letters = raw.toLowerCase().replace(/[^a-z]/g, "");
          const ok = letters === "crud" || letters === "createreadupdatedelete";
          return ok
            ? { ok: true, msg: "Create Read Update Delete." }
            : { ok: false, msg: "Type: C R U D  (or just CRUD)" };
        },
      },
    },
    {
      id: "swe-5",
      title: "Don’t mix the piles",
      words: ["separation-of-concerns"],
      body: `
        <p>Three piles of code. Mixing them is how a 40-line click handler becomes unreadable:</p>
        <table class="plain">
          <tr><td><strong>UI</strong></td><td>How a human talks to the program. Scanner in a terminal. HTML boxes and clicks in a browser. HTTP later, when another program talks.</td></tr>
          <tr><td><strong>Rules</strong></td><td>What is allowed. Title must not be empty. Age must not be negative. This pile does not know about buttons.</td></tr>
          <tr><td><strong>Storage</strong></td><td>Where the list lives. Array, file, localStorage, database. This pile does not decide if a title is valid.</td></tr>
        </table>
        <p>You already split them a bit without naming it: HTML draws the boxes (UI), JavaScript <code>if</code> decides (rules), <code>localStorage</code> remembers (storage).</p>
        <div class="callout word"><strong>New word — separation of concerns.</strong> Keep the piles from eating each other. Finding <code>#name</code> is UI. <code>if (name === "")</code> is rules. <code>setItem</code> is storage.</div>
        <p>Spring later names them Controller / Service / Repository. Same three piles, Java labels. You do not need Spring to start splitting.</p>
      `,
      exercise: {
        type: "choice",
        prompt:
          "document.getElementById and a click handler belong in which pile?",
        options: [
          { id: "a", text: "Storage", ok: false },
          { id: "b", text: "UI — talking to a human in the browser", ok: true },
          { id: "c", text: "Rules — clicks are business logic", ok: false },
        ],
        why: "The if that rejects an empty title is rules. Finding the box is UI.",
      },
    },
    {
      id: "swe-6",
      title: "Three copies of the data",
      words: ["state"],
      body: `
        <div class="callout word"><strong>New word — state.</strong> The data right now. Not the CSS. Not the spec. The notes that exist at this moment.</div>
        <p>You usually have three copies of that state, and they can disagree:</p>
        <ol>
          <li><strong>Memory</strong> — the JavaScript array (or a Java <code>ArrayList</code>). Fast. Dies on refresh unless you saved.</li>
          <li><strong>Screen</strong> — the HTML the user sees. <code>ul</code> of <code>li</code>s. This is a drawing of memory, not memory itself.</li>
          <li><strong>Disk</strong> — localStorage / a file / a database. Survives refresh. Can be stale if you forgot to write after a change.</li>
        </ol>
        <p>Typical bugs, all the same shape:</p>
        <ul>
          <li>You <code>push</code>ed to the array but did not redraw the list → memory yes, screen no.</li>
          <li>You showed a list but never <code>setItem</code> → screen yes, disk no. Refresh loses it.</li>
          <li>You saved text but <code>JSON.parse</code> failed on load → disk yes, memory empty.</li>
        </ul>
        <p>Ritual after every successful add/change/delete: <strong>change memory → save → update the screen</strong>. If a bug appears, ask which copy is wrong before rewriting the app.</p>
      `,
      exercise: {
        type: "choice",
        prompt:
          "User clicks Add. Memory has the new row. The page still shows the old list. What failed?",
        options: [
          { id: "a", text: "The network", ok: false },
          {
            id: "b",
            text: "Screen wasn’t updated (you forgot to re-draw the list)",
            ok: true,
          },
          { id: "c", text: "CSS", ok: false },
        ],
        why: "After you push, rebuild the list from the array.",
      },
    },
    {
      id: "swe-7",
      title: "Reject junk on purpose",
      words: ["validation", "edge-case"],
      body: `
        <p>You already wrote <code>if (name === "") return;</code> in JavaScript. That is not a style choice. That is <strong>validation</strong>: refuse junk before it becomes state.</p>
        <div class="callout word"><strong>New word — validation.</strong> Check the value. If it is illegal, stop. Do not save it. Do not pretend it is fine. The user can try again.</div>
        <p>On a server, the same if becomes a status code the browser can read:</p>
        <table class="plain">
          <tr><td><code>400</code></td><td>You sent junk (empty title). The server’s if said no.</td></tr>
          <tr><td><code>404</code></td><td>That id is not there. You asked to delete a note that does not exist.</td></tr>
          <tr><td><code>500</code></td><td>The other program crashed. That is not validation. That is a bug.</td></tr>
        </table>
        <p>We will use those numbers in the next chapter. You already know the English: reject vs crash.</p>
        <div class="callout word"><strong>New word — edge case.</strong> A boring miss, not the happy path: empty list, two notes with the same title, a huge string, a missing id. Write them down. Try them. That is how you find the if you forgot.</div>
      `,
      exercise: {
        type: "choice",
        prompt:
          "The user submits a note with an empty title. The program should…",
        options: [
          { id: "a", text: "Save it anyway", ok: false },
          {
            id: "b",
            text: 'Reject it. Same idea as if (name === "") return',
            ok: true,
          },
          { id: "c", text: "Crash with 500", ok: false },
        ],
        why: "Noticing is the job. Crashing is not validation.",
      },
    },
    {
      id: "swe-8",
      title: "One feature all the way through",
      words: ["vertical-slice", "debug"],
      body: `
        <p>Do not start by creating seven empty folders named Controller and Service. Ship <strong>one verb</strong> all the way through the four jobs:</p>
        <p><strong>Add</strong>: box exists (input) → <code>if</code> (rules) → array (memory) → list updates (output) → maybe <code>localStorage</code> (disk).</p>
        <p>When that works, the next verb (list on load, delete, change) reuses the same piles. Empty folders do not prove anything.</p>
        <div class="callout word"><strong>New word — vertical slice.</strong> One feature through every layer, not one layer for every feature. Add working is more valuable than a complete folder tree with no add.</div>
        <p>When it breaks, debug in this order:</p>
        <ol>
          <li>Do the same click again. Can you reproduce it?</li>
          <li>Name which copy is wrong: memory, screen, or disk.</li>
          <li>Make the failure small (one note, one click).</li>
          <li>Fix that. Do not rewrite the app.</li>
        </ol>
        <div class="callout word"><strong>New word — debug.</strong> Find which copy is wrong, then change that. Guessing “rewrite JavaScript” is not a step.</div>
      `,
      exercise: {
        type: "choice",
        prompt: "You have one weekend. What’s the plan?",
        options: [
          {
            id: "a",
            text: "Generate a huge project, then fill in logic",
            ok: false,
          },
          {
            id: "b",
            text: "One feature: add a note, see it, survive refresh. Then the next verb.",
            ok: true,
          },
          { id: "c", text: "Watch a microservices video first", ok: false },
        ],
        why: "A working add() you understand is a product.",
      },
    },
    {
      id: "swe-9",
      title: "What you already did, what’s next",
      words: ["frontend", "backend"],
      body: `
        <p>HTML, CSS, and JavaScript already happened in this course. You can draw, paint, and click. We will not restart those chapters.</p>
        <table class="plain">
          <tr><td><strong>Frontend</strong></td><td>HTML + CSS + JS. What the browser runs. You just did this. One computer, this browser profile.</td></tr>
          <tr><td><strong>Backend</strong></td><td>Another program that owns a shared list. Often Java. Not in the tab. Not yet in this course’s running site.</td></tr>
        </table>
        <p>localStorage is enough for one person on one browser. It is not enough when two phones should see the same notes. That is the only reason a backend exists: a second program with one copy of the list that many clients can call.</p>
        <p>Git already happened: snapshots and push. Next is HTTP — how a message replaces a method call — then the four verbs as URLs, then optional Java that waits (Spring), then how these files get hosted.</p>
        <p>We will not restart HTML or Git.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "Why is JavaScript already behind you before HTTP?",
        options: [
          { id: "a", text: "Because JS is a backend language", ok: false },
          {
            id: "b",
            text: "You needed a page and a click first. HTTP is how that click talks to another program.",
            ok: true,
          },
          { id: "c", text: "HTML comes after HTTP", ok: false },
        ],
        why: "Local add() is one process. fetch() is two.",
      },
    },
  ],
});
