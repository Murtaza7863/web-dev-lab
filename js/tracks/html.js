window.LEARN_TRACKS = window.LEARN_TRACKS || [];
window.LEARN_TRACKS.push({
  id: "html",
  title: "HTML",
  quest: "The Page",
  blurb: "Tags that tell the browser what each piece of the page is.",
  youKnow:
    "You already labeled data in Java (description, amount, category). HTML labels content for the browser.",
  lessons: [
    {
      id: "html-1",
      title: "What is a tag?",
      words: ["html", "tag", "element"],
      body: `
        <p>HTML is not Java. It's a <strong>markup language</strong> — you wrap content in <strong>tags</strong> so the browser knows what each piece is.</p>
        <pre><span class="t">&lt;p&gt;</span><span class="x">Hello world</span><span class="t">&lt;/p&gt;</span></pre>
        <ul>
          <li><code>&lt;p&gt;</code> — opening tag</li>
          <li><code>Hello world</code> — content the user sees</li>
          <li><code>&lt;/p&gt;</code> — closing tag (note the <code>/</code>)</li>
        </ul>
        <p>Opening + content + closing = an <strong>element</strong>.</p>
        <div class="callout java"><strong>Java:</strong> <code>System.out.println("Hello")</code> prints. <code>&lt;p&gt;Hello&lt;/p&gt;</code> displays — no <code>main</code>, no compile.</div>
        <div class="demo"><div class="demo-label">This page is rendering a real paragraph</div><p>Hello world</p></div>
        <h2>Rules</h2>
        <ol>
          <li>Most tags come in pairs.</li>
          <li>Closing tags have a slash: <code>&lt;/p&gt;</code></li>
          <li>Tag names are lowercase.</li>
        </ol>
      `,
      exercise: {
        type: "html",
        prompt:
          "Write HTML so the preview shows: a big heading Welcome, a paragraph This is my first HTML exercise., and the word important in bold inside a sentence.",
        starter:
          "Welcome\n\nThis is my first HTML exercise.\n\nLearning HTML is important.",
        checks: [
          { sel: "h1", text: "Welcome", msg: "Need an <h1> that says Welcome" },
          {
            sel: "p",
            text: "first HTML exercise",
            msg: "Need a <p> about the first HTML exercise",
          },
          {
            sel: "strong",
            text: "important",
            msg: "Wrap important in <strong>",
          },
        ],
      },
    },
    {
      id: "html-2",
      title: "The page skeleton",
      words: ["html"],
      body: `
        <p>Every HTML file has the same outer shape. Learn it once, recognize it everywhere.</p>
<pre><span class="t">&lt;!DOCTYPE html&gt;</span>     <span class="c">&lt;!-- HTML5 --&gt;</span>
<span class="t">&lt;html&gt;</span>
  <span class="t">&lt;head&gt;</span>              <span class="c">&lt;!-- invisible setup --&gt;</span>
    <span class="t">&lt;title&gt;</span><span class="x">Page Title</span><span class="t">&lt;/title&gt;</span>
  <span class="t">&lt;/head&gt;</span>
  <span class="t">&lt;body&gt;</span>              <span class="c">&lt;!-- what the user sees --&gt;</span>
    <span class="t">&lt;h1&gt;</span><span class="x">Hello</span><span class="t">&lt;/h1&gt;</span>
  <span class="t">&lt;/body&gt;</span>
<span class="t">&lt;/html&gt;</span></pre>
        <table class="plain">
          <tr><td><code>&lt;!DOCTYPE html&gt;</code></td><td>Declaration, not a tag. First line.</td></tr>
          <tr><td><code>&lt;head&gt;</code></td><td>Title, encoding, CSS links. Not visible.</td></tr>
          <tr><td><code>&lt;title&gt;</code></td><td>Browser tab text.</td></tr>
          <tr><td><code>&lt;body&gt;</code></td><td>All visible content.</td></tr>
        </table>
        <div class="callout java"><strong>Java:</strong> <code>public class Main</code> wraps the file; <code>main</code> is where work starts. In HTML, <code>&lt;body&gt;</code> is where visible work lives.</div>
        <p>Comments the browser ignores: <code>&lt;!-- note --&gt;</code></p>
      `,
      exercise: {
        type: "html",
        prompt:
          "Write a full page skeleton. Tab title Expense Tracker. Inside body, an h1 Expense Tracker.",
        starter: "",
        checks: [
          {
            sel: "title",
            text: "Expense Tracker",
            msg: "Need <title>Expense Tracker</title> in <head>",
          },
          {
            sel: "h1",
            text: "Expense Tracker",
            msg: "Need <h1>Expense Tracker</h1> in <body>",
          },
        ],
        requireDoctype: true,
      },
    },
    {
      id: "html-3",
      title: "Text and headings",
      words: ["element"],
      body: `
        <p>Headings <code>h1</code>–<code>h6</code>. Use one <code>h1</code> per page (the page title).</p>
        <div class="demo">
          <div class="demo-label">Live</div>
          <h1>Expense Tracker</h1>
          <h2>All Expenses</h2>
          <p>I spent <strong>$45.00</strong> on <em>groceries</em>.</p>
        </div>
<pre><span class="t">&lt;h1&gt;</span><span class="x">Expense Tracker</span><span class="t">&lt;/h1&gt;</span>
<span class="t">&lt;h2&gt;</span><span class="x">All Expenses</span><span class="t">&lt;/h2&gt;</span>
<span class="t">&lt;p&gt;</span><span class="x">I spent </span><span class="t">&lt;strong&gt;</span><span class="x">$45.00</span><span class="t">&lt;/strong&gt;</span><span class="x"> on </span><span class="t">&lt;em&gt;</span><span class="x">groceries</span><span class="t">&lt;/em&gt;</span><span class="t">&lt;/p&gt;</span></pre>
        <ul>
          <li><code>&lt;p&gt;</code> — a paragraph (block of text)</li>
          <li><code>&lt;strong&gt;</code> — important / bold</li>
          <li><code>&lt;em&gt;</code> — emphasis / italic</li>
          <li><code>&lt;br&gt;</code> — line break, no closing tag</li>
        </ul>
      `,
      exercise: {
        type: "html",
        prompt:
          "Make an h2 August, a paragraph with Coffee in em, and $4.50 in strong.",
        starter: "August\nCoffee 4.50",
        checks: [
          { sel: "h2", text: "August", msg: "Need <h2>August</h2>" },
          { sel: "em", text: "Coffee", msg: "Wrap Coffee in <em>" },
          {
            sel: "strong",
            text: "4.50",
            msg: "Wrap 4.50 (or $4.50) in <strong>",
          },
        ],
      },
    },
    {
      id: "html-4",
      title: "Links",
      words: ["attribute"],
      body: `
        <p><code>&lt;a&gt;</code> is an anchor (a link). It needs an <strong>attribute</strong> <code>href</code> — the destination.</p>
<pre><span class="t">&lt;a </span><span class="a">href</span><span class="t">=</span><span class="x">"https://developer.mozilla.org"</span><span class="t">&gt;</span><span class="x">MDN docs</span><span class="t">&lt;/a&gt;</span></pre>
        <p>Attributes live on the opening tag: <code>name="value"</code>.</p>
        <ul>
          <li>Relative path: <code>href="lessons/05-lists.html"</code> — another file you wrote</li>
          <li>Absolute URL: <code>href="https://…"</code> — another site</li>
          <li>New tab: add <code>target="_blank"</code></li>
        </ul>
        <div class="callout java"><strong>Java:</strong> <code>href</code> is the destination. The text between the tags is the label the user clicks.</div>
      `,
      exercise: {
        type: "html",
        prompt: "Make a link whose text is Lab and whose href is #/lab",
        starter: "Lab",
        checks: [
          { sel: "a", text: "Lab", msg: "Need an <a> whose text is Lab" },
          { sel: 'a[href="#/lab"]', msg: "href must be exactly #/lab" },
        ],
      },
    },
    {
      id: "html-5",
      title: "Lists",
      words: ["element"],
      body: `
        <p>Your Java app stores expenses in an <code>ArrayList</code>. On a page, you <em>show</em> a list with tags.</p>
        <p><code>ul</code> = bullets. <code>ol</code> = numbers. Each item is <code>li</code>.</p>
<pre><span class="t">&lt;ul&gt;</span>
  <span class="t">&lt;li&gt;</span><span class="x">Coffee — $4.50 — Food</span><span class="t">&lt;/li&gt;</span>
  <span class="t">&lt;li&gt;</span><span class="x">Bus — $30.00 — Transport</span><span class="t">&lt;/li&gt;</span>
<span class="t">&lt;/ul&gt;</span></pre>
        <div class="demo">
          <div class="demo-label">Like viewAllExpenses()</div>
          <ul>
            <li>Coffee — $4.50 — Food</li>
            <li>Bus — $30.00 — Transport</li>
          </ul>
        </div>
        <p>Never put text directly inside <code>ul</code> — always wrap in <code>li</code>.</p>
        <div class="callout tip">Later, JavaScript will insert <code>li</code>s into an empty <code>&lt;ul id="expense-list"&gt;</code> when you click Add.</div>
      `,
      exercise: {
        type: "html",
        prompt: "Build a ul with exactly two li items: Coffee and Bus.",
        starter: "Coffee\nBus",
        checks: [
          { sel: "ul", msg: "Need a <ul>" },
          {
            sel: "ul > li",
            count: 2,
            msg: "Need exactly two <li> inside the <ul>",
          },
          {
            sel: "ul > li",
            text: "Coffee",
            nth: 0,
            msg: "First item should mention Coffee",
          },
          {
            sel: "ul > li",
            text: "Bus",
            nth: 1,
            msg: "Second item should mention Bus",
          },
        ],
      },
    },
    {
      id: "html-6",
      title: "Forms and inputs",
      words: ["attribute"],
      body: `
        <p>In the CLI, <code>Scanner</code> reads what you type. On the web, users type into <code>&lt;input&gt;</code> inside a <code>&lt;form&gt;</code>.</p>
<pre><span class="t">&lt;form&gt;</span>
  <span class="t">&lt;input </span><span class="a">type</span><span class="t">=</span><span class="x">"text"</span> <span class="a">placeholder</span><span class="t">=</span><span class="x">"Description"</span><span class="t">&gt;</span>
  <span class="t">&lt;input </span><span class="a">type</span><span class="t">=</span><span class="x">"number"</span> <span class="a">placeholder</span><span class="t">=</span><span class="x">"Amount"</span><span class="t">&gt;</span>
  <span class="t">&lt;button </span><span class="a">type</span><span class="t">=</span><span class="x">"button"</span><span class="t">&gt;</span><span class="x">Add Expense</span><span class="t">&lt;/button&gt;</span>
<span class="t">&lt;/form&gt;</span></pre>
        <table class="plain">
          <tr><td><code>type="text"</code></td><td>Normal typing (description)</td></tr>
          <tr><td><code>type="number"</code></td><td>Amount</td></tr>
          <tr><td><code>placeholder</code></td><td>Gray hint when empty</td></tr>
          <tr><td><code>type="button"</code></td><td>Don't reload the page on click</td></tr>
        </table>
        <div class="callout java">
          <strong>Java:</strong><br>
          print prompt → <code>&lt;label&gt;</code> / placeholder<br>
          <code>sc.next()</code> → <code>&lt;input&gt;</code><br>
          menu option 1 → the button (once JS is wired)
        </div>
        <div class="callout warn">A button inside a form defaults to submit (reload). Use <code>type="button"</code> until you handle submit in JS.</div>
      `,
      exercise: {
        type: "html",
        prompt:
          "Build a form with a text input (placeholder Description), a number input (placeholder Amount), and a button that says Add.",
        starter: "",
        checks: [
          { sel: "form", msg: "Wrap it in <form>" },
          { sel: 'input[type="text"]', msg: 'Need <input type="text">' },
          { sel: 'input[type="number"]', msg: 'Need <input type="number">' },
          { sel: "button", text: "Add", msg: "Need a <button> containing Add" },
        ],
      },
    },
    {
      id: "html-7",
      title: "Attributes (id and class)",
      words: ["attribute", "dom"],
      body: `
        <p>You've used <code>href</code>, <code>type</code>, <code>placeholder</code>. Two more matter constantly:</p>
        <p><code>id</code> — unique name for <em>one</em> element. JavaScript finds it later.</p>
<pre><span class="t">&lt;ul </span><span class="a">id</span><span class="t">=</span><span class="x">"expense-list"</span><span class="t">&gt;&lt;/ul&gt;</span>
<span class="c">&lt;!-- document.getElementById("expense-list") --&gt;</span></pre>
        <p><code>class</code> — a label many elements can share. CSS uses this to style a group.</p>
<pre><span class="t">&lt;li </span><span class="a">class</span><span class="t">=</span><span class="x">"expense-item"</span><span class="t">&gt;</span><span class="x">Coffee</span><span class="t">&lt;/li&gt;</span></pre>
        <div class="callout java"><code>id="expense-list"</code> is like naming a variable so you can use it later.</div>
        <p>Self-closing (no content): <code>&lt;input&gt;</code>, <code>&lt;img&gt;</code>, <code>&lt;br&gt;</code>, <code>&lt;meta&gt;</code>.</p>
      `,
      exercise: {
        type: "html",
        prompt:
          "Build the expense page shell: h1 Expense Tracker, form#add-form with three inputs (ids description, amount, category), ul#expense-list, and p with strong#total saying $0.00",
        starter: "",
        checks: [
          { sel: "h1", text: "Expense Tracker", msg: "Need the h1 title" },
          { sel: "form#add-form", msg: 'Form needs id="add-form"' },
          { sel: "#description", msg: 'Need input id="description"' },
          { sel: "#amount", msg: 'Need input id="amount"' },
          { sel: "#category", msg: 'Need input id="category"' },
          { sel: "ul#expense-list", msg: 'Need ul id="expense-list"' },
          {
            sel: "strong#total",
            text: "0.00",
            msg: 'Need strong id="total" showing $0.00',
          },
        ],
      },
    },
    {
      id: "html-8",
      title: "div and span (boxes with no meaning)",
      words: ["element"],
      body: `
        <p>Headings, lists, forms <em>mean</em> something. Sometimes you just need a box:</p>
        <ul>
          <li><code>&lt;div&gt;</code> — a block box (new line). Layout wrapper. CSS lives here a lot.</li>
          <li><code>&lt;span&gt;</code> — an inline box (stays in the sentence). Wrap a price, a category chip.</li>
        </ul>
<pre><span class="t">&lt;div </span><span class="a">class</span><span class="t">=</span><span class="x">"expense"</span><span class="t">&gt;</span>
  <span class="t">&lt;span&gt;</span><span class="x">Coffee</span><span class="t">&lt;/span&gt;</span>
  <span class="t">&lt;span&gt;</span><span class="x">$4.50</span><span class="t">&lt;/span&gt;</span>
<span class="t">&lt;/div&gt;</span></pre>
        <p>Don't wrap everything in <code>div</code> because a tutorial did. If it's a list, use <code>ul</code>. If it's a title, use <code>h1</code>. <code>div</code> is the leftover box.</p>
        <div class="callout java">A <code>div</code> is like a generic <code>Object</code> — legal, but a named type (<code>Expense</code>, <code>ul</code>) is clearer.</div>
      `,
      exercise: {
        type: "html",
        prompt: "A div.expense containing two spans: Coffee and $4.50",
        starter: "Coffee $4.50",
        checks: [
          { sel: "div.expense", msg: 'Need <div class="expense">' },
          {
            sel: "div.expense span",
            count: 2,
            msg: "Two <span>s inside the div",
          },
        ],
      },
    },
    {
      id: "html-9",
      title: "How CSS and JS attach (the sockets)",
      words: ["html"],
      body: `
        <p>HTML is the document. The next two quests plug in here — not magic, two tags:</p>
<pre><span class="t">&lt;head&gt;</span>
  <span class="t">&lt;link </span><span class="a">rel</span><span class="t">=</span><span class="x">"stylesheet"</span> <span class="a">href</span><span class="t">=</span><span class="x">"style.css"</span><span class="t">&gt;</span>
<span class="t">&lt;/head&gt;</span>
<span class="t">&lt;body&gt;</span>
  <span class="c">&lt;!-- page content --&gt;</span>
  <span class="t">&lt;script </span><span class="a">src</span><span class="t">=</span><span class="x">"app.js"</span><span class="t">&gt;&lt;/script&gt;</span>
<span class="t">&lt;/body&gt;</span></pre>
        <ul>
          <li><code>link</code> in <code>head</code> — CSS, load before first paint so it doesn't flash unstyled</li>
          <li><code>script</code> at the <em>bottom of body</em> — JS, so the HTML exists when it runs <code>getElementById</code></li>
        </ul>
        <p>Right-click this page → Inspect. The tree is the DOM. That's what JS will edit next quest after CSS.</p>
        <div class="callout tip">This PWA is exactly that: <code>index.html</code> + <code>css/app.css</code> + <code>js/*.js</code>. You can open those files in Cursor and see the sockets.</div>
      `,
      exercise: {
        type: "html",
        prompt:
          "Full skeleton with doctype, a title in head, link rel=stylesheet href=style.css in head, an h1, and script src=app.js last in body.",
        starter: "",
        requireDoctype: true,
        checks: [
          {
            sel: 'link[rel="stylesheet"]',
            msg: 'Need <link rel="stylesheet" href="..."> in head',
          },
          { sel: "script[src]", msg: 'Need <script src="...">' },
          { sel: "h1", msg: "Still need visible content — an h1" },
        ],
      },
    },
  ],
});
