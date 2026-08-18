window.LEARN_TRACKS = window.LEARN_TRACKS || [];
window.LEARN_TRACKS.push({
  id: "html",
  title: "HTML",
  quest: "HTML",
  blurb:
    "From zero. A page is tags around words. No JavaScript yet. No CSS required to show text.",
  youKnow:
    "You can write Java. You have not written HTML. This chapter is the first webpage — one idea at a time.",
  lessons: [
    {
      id: "html-1",
      title: "What is a tag?",
      words: ["html", "tag", "element"],
      body: `
        <p>HTML is not a programming language like Java. You do not write <code>if</code> here. You do not compile. You wrap words in <strong>tags</strong> so the browser knows <em>what each piece is</em> — a paragraph, a title, a list.</p>
        <p>Here is the smallest useful example:</p>
<pre><span class="t">&lt;p&gt;</span><span class="x">Hello</span><span class="t">&lt;/p&gt;</span></pre>
        <p>Three parts:</p>
        <ul>
          <li><code>&lt;p&gt;</code> — <strong>opening tag</strong>. “A paragraph starts here.” <code>p</code> is short for paragraph.</li>
          <li><code>Hello</code> — the <strong>content</strong>. This is what the human actually sees.</li>
          <li><code>&lt;/p&gt;</code> — <strong>closing tag</strong>. “The paragraph stops here.” The slash <code>/</code> before the name means end.</li>
        </ul>
        <div class="callout word"><strong>New word — tag.</strong> A label in angle brackets: <code>&lt;p&gt;</code> or <code>&lt;/p&gt;</code>. The browser reads tags. Humans read the words in between.</div>
        <div class="callout word"><strong>New word — element.</strong> The whole sandwich: opening tag + content + closing tag. <code>&lt;p&gt;Hello&lt;/p&gt;</code> is one element.</div>
        <div class="demo"><div class="demo-label">The browser drawing that element</div><p>Hello</p></div>
        <p>Rules to remember:</p>
        <ol>
          <li>Most tags come in pairs: open, then close.</li>
          <li>The closing tag has a slash: <code>&lt;/p&gt;</code> not <code>&lt;p&gt;</code> again.</li>
          <li>Tag names are lowercase by convention: <code>p</code>, not <code>P</code>.</li>
          <li>Content goes <em>between</em> the tags, not outside them.</li>
        </ol>
        <div class="callout java">In Java, <code>System.out.println("Hello")</code> prints in the terminal. <code>&lt;p&gt;Hello&lt;/p&gt;</code> is how you put Hello on a page. No <code>main</code>. Save a <code>.html</code> file, open it in a browser — or type it in the box on the right.</div>
        <p>If you forget <code>&lt;/p&gt;</code>, the browser may still show Hello, but later tags get confused. Always close.</p>
      `,
      exercise: {
        type: "html",
        prompt: "Wrap the word Hello in a paragraph tag. Only that.",
        starter: "Hello",
        expected: "<p>Hello</p>",
        checks: [{ sel: "p", text: "Hello", msg: "Need <p>Hello</p>" }],
      },
    },
    {
      id: "html-2",
      title: "The shape of every page",
      words: ["html"],
      body: `
        <p>A real HTML file is not only a paragraph. The browser expects a <strong>skeleton</strong> — the same outer shape every time. You write it once, then put your content in the middle.</p>
<pre><span class="t">&lt;!DOCTYPE html&gt;</span>
<span class="t">&lt;html&gt;</span>
  <span class="t">&lt;head&gt;</span>
    <span class="t">&lt;title&gt;</span><span class="x">My Page</span><span class="t">&lt;/title&gt;</span>
  <span class="t">&lt;/head&gt;</span>
  <span class="t">&lt;body&gt;</span>
    <span class="t">&lt;h1&gt;</span><span class="x">Hello</span><span class="t">&lt;/h1&gt;</span>
  <span class="t">&lt;/body&gt;</span>
<span class="t">&lt;/html&gt;</span></pre>
        <p>Read it like nested braces in Java. Each opening tag has a matching close. Inner things sit inside outer things.</p>
        <table class="plain">
          <tr><td><code>&lt;!DOCTYPE html&gt;</code></td><td>Always the first line. Not a tag with a close. It tells the browser: “treat this as modern HTML.”</td></tr>
          <tr><td><code>&lt;html&gt; … &lt;/html&gt;</code></td><td>Wraps the whole document. Everything else goes inside.</td></tr>
          <tr><td><code>&lt;head&gt; … &lt;/head&gt;</code></td><td><em>Setup</em>, not the visible page. Tab title lives here. Later, the CSS file links here. The user does not see <code>head</code> as a box on the page.</td></tr>
          <tr><td><code>&lt;title&gt;</code></td><td>The text in the <em>browser tab</em> (the little label at the top of the window), not the big title on the page.</td></tr>
          <tr><td><code>&lt;body&gt; … &lt;/body&gt;</code></td><td>Everything the user sees: headings, paragraphs, lists, buttons.</td></tr>
          <tr><td><code>&lt;h1&gt;</code></td><td>The biggest heading on the page. We will explain headings next. For now: it is a title, not a paragraph.</td></tr>
        </table>
        <p>Indentation (spaces at the start of a line) is for humans. The browser does not require it. Use it anyway so you can see what is inside what.</p>
        <p>A comment the browser ignores: <code>&lt;!-- this is a note --&gt;</code></p>
        <div class="callout java">A Java file wraps work in a class and starts in <code>main</code>. An HTML file wraps the document in <code>&lt;html&gt;</code> and puts visible work in <code>&lt;body&gt;</code>.</div>
      `,
      exercise: {
        type: "html",
        prompt:
          "Full page: tab title My Page, and an h1 Hello in the body. Include the doctype.",
        starter: "",
        expected:
          "<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Hello</h1>\n</body>\n</html>",
        checks: [
          {
            sel: "title",
            text: "My Page",
            msg: "Need <title>My Page</title> in <head>",
          },
          { sel: "h1", text: "Hello", msg: "Need <h1>Hello</h1> in <body>" },
        ],
        requireDoctype: true,
      },
    },
    {
      id: "html-3",
      title: "Headings and text",
      words: ["element"],
      body: `
        <p>A <strong>heading</strong> is a title, not a paragraph. HTML gives you six sizes: <code>h1</code> (biggest) through <code>h6</code> (smallest). They are for outline, not for “I wanted bigger text.” Use CSS later if you only want size.</p>
        <ul>
          <li><code>h1</code> — the page’s main title. Use <strong>one</strong> <code>h1</code> per page.</li>
          <li><code>h2</code> — a section title under that</li>
          <li><code>h3</code> … <code>h6</code> — smaller sections if you need them</li>
        </ul>
        <p>A <code>p</code> is still a paragraph: a block of normal sentences.</p>
        <p>You can put tags <em>inside</em> a paragraph to mark a few words:</p>
        <ul>
          <li><code>&lt;strong&gt;</code> — important. Browsers usually show it <strong>bold</strong>.</li>
          <li><code>&lt;em&gt;</code> — emphasis. Browsers usually show it <em>italic</em>.</li>
        </ul>
        <p>Those still need closing tags: <code>&lt;strong&gt;Hi&lt;/strong&gt;</code>.</p>
        <div class="demo">
          <div class="demo-label">Live — this is real HTML on this page</div>
          <h1>Hello</h1>
          <h2>A subtitle</h2>
          <p>This is a <strong>paragraph</strong> with <em>emphasis</em>.</p>
        </div>
<pre><span class="t">&lt;h1&gt;</span><span class="x">Hello</span><span class="t">&lt;/h1&gt;</span>
<span class="t">&lt;h2&gt;</span><span class="x">A subtitle</span><span class="t">&lt;/h2&gt;</span>
<span class="t">&lt;p&gt;</span><span class="x">This is a </span><span class="t">&lt;strong&gt;</span><span class="x">paragraph</span><span class="t">&lt;/strong&gt;</span><span class="x"> with </span><span class="t">&lt;em&gt;</span><span class="x">emphasis</span><span class="t">&lt;/em&gt;</span><span class="t">&lt;/p&gt;</span></pre>
        <p>Notice <code>strong</code> and <code>em</code> sit inside the <code>p</code>. Nesting is allowed. Do not put a heading inside a paragraph.</p>
        <p><code>&lt;br&gt;</code> is a line break with <em>no</em> closing tag. Prefer a new <code>p</code> for a new paragraph. Use <code>br</code> only for a hard wrap inside the same block.</p>
      `,
      exercise: {
        type: "html",
        prompt: "An h2 Notes, the word Ada inside em, and Hi inside strong.",
        starter: "Notes\nAda Hi",
        checks: [
          { sel: "h2", text: "Notes", msg: "Need <h2>Notes</h2>" },
          { sel: "em", text: "Ada", msg: "Wrap Ada in <em>" },
          { sel: "strong", text: "Hi", msg: "Wrap Hi in <strong>" },
        ],
      },
    },
    {
      id: "html-4",
      title: "Attributes: extra facts on a tag",
      words: ["attribute"],
      body: `
        <p>So far a tag was only a name: <code>&lt;p&gt;</code>. Sometimes the tag needs <strong>extra facts</strong>. Those facts are called <strong>attributes</strong>. They live on the <em>opening</em> tag only, as <code>name="value"</code>.</p>
        <p>A link is the usual first example. The tag is <code>a</code> (anchor — an old word for “link”). The browser needs to know <em>where</em> the link goes. That fact is the attribute <code>href</code> (think: “where this points”).</p>
<pre><span class="t">&lt;a </span><span class="a">href</span><span class="t">=</span><span class="x">"https://example.com"</span><span class="t">&gt;</span><span class="x">Example</span><span class="t">&lt;/a&gt;</span></pre>
        <p>Break it down:</p>
        <ul>
          <li><code>&lt;a</code> — start of a link</li>
          <li><code>href="https://example.com"</code> — attribute. Name <code>href</code>, value in quotes. Always quotes.</li>
          <li><code>&gt;</code> — end of the opening tag</li>
          <li><code>Example</code> — the words the user sees and clicks</li>
          <li><code>&lt;/a&gt;</code> — end of the link</li>
        </ul>
        <div class="callout word"><strong>New word — attribute.</strong> Extra data on a tag: <code>href</code>, and later <code>id</code>, <code>class</code>, <code>type</code>. It is not the words between the tags. Those words are the label the user sees.</div>
        <p>If you write <code>&lt;a&gt;Example&lt;/a&gt;</code> with no <code>href</code>, you have a label that goes nowhere. The destination is the attribute, not the clickable text.</p>
        <div class="callout java">Think of attributes like arguments: the tag is the thing, <code>href</code> is extra information you pass in. The text between tags is what the human reads.</div>
      `,
      exercise: {
        type: "html",
        prompt:
          "A link whose text is Example and whose href is https://example.com",
        starter: "Example",
        expected: '<a href="https://example.com">Example</a>',
        checks: [
          {
            sel: "a",
            text: "Example",
            msg: "Need an <a> whose text is Example",
          },
          {
            sel: 'a[href="https://example.com"]',
            msg: "href must be https://example.com",
          },
        ],
      },
    },
    {
      id: "html-5",
      title: "Lists",
      words: ["element"],
      body: `
        <p>A list in HTML is two layers, always:</p>
        <ol>
          <li>The list itself — <code>ul</code> means <strong>unordered list</strong> (bullets). There is also <code>ol</code> for numbered lists. We use <code>ul</code> here.</li>
          <li>Each row — <code>li</code> means <strong>list item</strong>.</li>
        </ol>
<pre><span class="t">&lt;ul&gt;</span>
  <span class="t">&lt;li&gt;</span><span class="x">Apples</span><span class="t">&lt;/li&gt;</span>
  <span class="t">&lt;li&gt;</span><span class="x">Bread</span><span class="t">&lt;/li&gt;</span>
<span class="t">&lt;/ul&gt;</span></pre>
        <p>The <code>ul</code> is the bag. Each <code>li</code> is one thing in the bag. You must not put the word Apples directly inside <code>ul</code> with no <code>li</code>. The browser expects items.</p>
        <div class="demo">
          <div class="demo-label">Live</div>
          <ul>
            <li>Apples</li>
            <li>Bread</li>
          </ul>
        </div>
        <p>Close every <code>li</code> before you start the next one. Close the <code>ul</code> at the end. Same nesting idea as <code>html</code> wrapping <code>body</code>.</p>
      `,
      exercise: {
        type: "html",
        prompt: "A ul with exactly two li rows: Apples and Bread.",
        starter: "Apples\nBread",
        checks: [
          { sel: "ul", msg: "Need a <ul>" },
          {
            sel: "ul > li",
            count: 2,
            msg: "Need exactly two <li> inside the <ul>",
          },
          {
            sel: "ul > li",
            text: "Apples",
            nth: 0,
            msg: "First item should mention Apples",
          },
          {
            sel: "ul > li",
            text: "Bread",
            nth: 1,
            msg: "Second item should mention Bread",
          },
        ],
      },
    },
    {
      id: "html-6",
      title: "A box the user can type in",
      words: ["attribute"],
      body: `
        <p>In Java, input looks like this: print a prompt, then <code>sc.next()</code> waits. On a page there is no Scanner. You <em>draw</em> a box. The user clicks it and types. A button means “I am done typing.”</p>
        <p>This lesson only draws those pieces. The button will not add anything yet. Wiring the click is JavaScript, later. That is the same as drawing a menu and not calling <code>sc.nextInt()</code> yet.</p>
<pre><span class="t">&lt;form&gt;</span>
  <span class="t">&lt;input </span><span class="a">type</span><span class="t">=</span><span class="x">"text"</span> <span class="a">placeholder</span><span class="t">=</span><span class="x">"Your name"</span><span class="t">&gt;</span>
  <span class="t">&lt;button </span><span class="a">type</span><span class="t">=</span><span class="x">"button"</span><span class="t">&gt;</span><span class="x">Go</span><span class="t">&lt;/button&gt;</span>
<span class="t">&lt;/form&gt;</span></pre>
        <p><code>&lt;form&gt;</code> groups controls that belong together (the box and the button). It needs a closing <code>&lt;/form&gt;</code>.</p>
        <p><code>&lt;input&gt;</code> is the box. It often has no closing tag. Facts go on the opening tag as attributes:</p>
        <table class="plain">
          <tr><td><code>type="text"</code></td><td>A single line of text — like <code>sc.next()</code> reading a word or line of text.</td></tr>
          <tr><td><code>placeholder="Your name"</code></td><td>Gray hint inside the empty box. It is not the value. It disappears when the user types. Like your printed <code>"Name: "</code> prompt.</td></tr>
        </table>
        <p><code>&lt;button&gt;</code> is the clickable thing. The words between <code>&lt;button&gt;</code> and <code>&lt;/button&gt;</code> are the label (here, Go).</p>
        <div class="callout warn"><strong>Why <code>type="button"</code>?</strong> A button inside a form, with no type, defaults to “submit.” Submit means the browser reloads the page and the box empties. That looks like a bug. <code>type="button"</code> means “this is just a button. Do not reload.” We will handle the click in JavaScript later.</div>
      `,
      exercise: {
        type: "html",
        prompt:
          "A form with a text input placeholder Your name, and a button that says Go.",
        starter: "",
        expected:
          '<form>\n  <input type="text" placeholder="Your name">\n  <button type="button">Go</button>\n</form>',
        checks: [
          { sel: "form", msg: "Wrap it in <form>" },
          {
            sel: 'input[type="text"]',
            msg: "Need a text input",
          },
          { sel: "button", text: "Go", msg: "Need a <button> containing Go" },
        ],
      },
    },
    {
      id: "html-7",
      title: "Name a box with id",
      words: ["attribute"],
      body: `
        <p>In Java, a value has a name so you can use it later: <code>String name = sc.next();</code> then you write <code>name</code> in an <code>if</code>.</p>
        <p>On a page, the box is just a drawing unless you name it. JavaScript looks boxes up by name. That name is the attribute <code>id</code>.</p>
<pre><span class="t">&lt;input </span><span class="a">id</span><span class="t">=</span><span class="x">"name"</span> <span class="a">type</span><span class="t">=</span><span class="x">"text"</span><span class="t">&gt;</span>
<span class="t">&lt;p </span><span class="a">id</span><span class="t">=</span><span class="x">"out"</span><span class="t">&gt;&lt;/p&gt;</span></pre>
        <ul>
          <li><code>id="name"</code> — this input is called <code>name</code></li>
          <li><code>id="out"</code> — this paragraph is called <code>out</code> (we will put a result there later)</li>
        </ul>
        <p><code>id</code> must be unique on the page. Two things with <code>id="name"</code> and JavaScript will only find one of them — usually the first. Use the same idea as “don’t declare two variables named <code>name</code> in the same method.”</p>
        <p>You will later write <code>document.getElementById("name")</code>. In English: “browser, give me the element whose id is name.” You do not write that today. Today you only put the <code>id</code> on the tag.</p>
        <p><code>class</code> is a different attribute. Many elements may share the same class. CSS uses class to paint a group (“all cards”). <code>id</code> is “this one box.” You need <code>id</code> to read input. You need <code>class</code> mostly for look.</p>
      `,
      exercise: {
        type: "html",
        prompt: 'An input with id="name" and a p with id="out".',
        starter: "",
        expected: '<input id="name" type="text">\n<p id="out"></p>',
        checks: [
          { sel: "#name", msg: 'Need id="name"' },
          { sel: "#out", msg: 'Need id="out"' },
        ],
      },
    },
    {
      id: "html-8",
      title: "div and span: boxes with no extra meaning",
      words: ["element"],
      body: `
        <p>A heading <em>means</em> “this is a title.” A list <em>means</em> “these are items.” Sometimes you only need a wrapper so you can paint a group later — a bag with no special meaning.</p>
        <ul>
          <li><code>&lt;div&gt;</code> — a <strong>block</strong> box. It starts on a new line and stretches across (like a <code>p</code>). Use it as a container around a chunk of the page.</li>
          <li><code>&lt;span&gt;</code> — an <strong>inline</strong> box. It stays in the sentence, like <code>strong</code>. Use it to wrap a few words you want to paint separately.</li>
        </ul>
<pre><span class="t">&lt;div </span><span class="a">class</span><span class="t">=</span><span class="x">"card"</span><span class="t">&gt;</span>
  <span class="t">&lt;span&gt;</span><span class="x">Ada</span><span class="t">&lt;/span&gt;</span>
  <span class="t">&lt;span&gt;</span><span class="x">Hi</span><span class="t">&lt;/span&gt;</span>
<span class="t">&lt;/div&gt;</span></pre>
        <p><code>class="card"</code> is a label for CSS (next chapter). It does not change meaning by itself. You could name it anything; <code>card</code> is just a readable word.</p>
        <p>Do not wrap everything in <code>div</code> because a tutorial did. If it is a list, use <code>ul</code>. If it is a title, use <code>h1</code>. <code>div</code> is the leftover box when no better tag fits.</p>
        <div class="callout java">A <code>div</code> is like using a generic <code>Object</code> — legal, but a named type is clearer when you have one.</div>
      `,
      exercise: {
        type: "html",
        prompt: "A div.card containing two spans: Ada and Hi",
        starter: "Ada Hi",
        checks: [
          { sel: "div.card", msg: 'Need <div class="card">' },
          {
            sel: "div.card span",
            count: 2,
            msg: "Two <span>s inside the div",
          },
        ],
      },
    },
    {
      id: "html-9",
      title: "How CSS and JavaScript files attach",
      words: ["html"],
      body: `
        <p>HTML is the document. Look (CSS) and behavior (JavaScript) are usually <strong>other files</strong>. You have not written those files yet. You only need to know the two tags that point at them, so the browser loads them.</p>
<pre><span class="t">&lt;head&gt;</span>
  <span class="t">&lt;link </span><span class="a">rel</span><span class="t">=</span><span class="x">"stylesheet"</span> <span class="a">href</span><span class="t">=</span><span class="x">"style.css"</span><span class="t">&gt;</span>
<span class="t">&lt;/head&gt;</span>
<span class="t">&lt;body&gt;</span>
  <span class="c">&lt;!-- visible page here --&gt;</span>
  <span class="t">&lt;script </span><span class="a">src</span><span class="t">=</span><span class="x">"app.js"</span><span class="t">&gt;&lt;/script&gt;</span>
<span class="t">&lt;/body&gt;</span></pre>
        <p><code>&lt;link&gt;</code> (in <code>head</code>):</p>
        <ul>
          <li><code>rel="stylesheet"</code> — “this link is a CSS file” (<code>rel</code> means relationship)</li>
          <li><code>href="style.css"</code> — the path to that file, same idea as a link’s <code>href</code></li>
        </ul>
        <p>Put CSS in <code>head</code> so paint is ready before the page draws. Otherwise the page can flash unstyled.</p>
        <p><code>&lt;script src="app.js"&gt;&lt;/script&gt;</code>:</p>
        <ul>
          <li><code>src</code> — path to the JavaScript file</li>
          <li>Put it at the <em>bottom of <code>body</code></em> so the HTML boxes exist first. If the script runs too early and asks for <code>id="name"</code>, the box is not there yet and you get nothing.</li>
        </ul>
        <p>Next chapter you will write CSS in the exercise box (this site injects it for you). Then JavaScript: click, read the box, <code>if</code>.</p>
      `,
      exercise: {
        type: "html",
        prompt:
          "Full skeleton: doctype, a title, link rel=stylesheet href=style.css in head, an h1, and script src=app.js last in body.",
        starter: "",
        requireDoctype: true,
        expected:
          '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Hello</h1>\n  <script src="app.js"><\/script>\n</body>\n</html>',
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
