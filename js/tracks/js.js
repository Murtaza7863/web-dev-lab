window.LEARN_TRACKS = window.LEARN_TRACKS || [];
window.LEARN_TRACKS.push({
  id: "js",
  title: "JavaScript",
  quest: "JavaScript",
  blurb:
    "You now have a page. JavaScript is a second language the browser runs. Objects, input, and if still exist — different spelling.",
  youKnow:
    "You can write HTML and a little CSS. You already know objects, Scanner, and if in Java. This is not Java.",
  lessons: [
    {
      id: "js-1",
      title: "Java is not JavaScript",
      words: ["javascript"],
      body: `
        <div class="callout word"><strong>New word — JavaScript.</strong> A programming language the <em>browser</em> runs. It is not Java. The similar name is a 1990s accident. You already attached a file with <code>&lt;script src="app.js"&gt;</code>. That file is JavaScript.</div>
        <table class="plain">
          <tr><td>Java</td><td>You compile it. You declare types (<code>int age</code>). You start in <code>main</code>. It runs in a terminal or on a server — not inside Chrome as this page’s logic.</td></tr>
          <tr><td>JavaScript</td><td>The browser reads the file and runs it. Types are looser. No <code>main</code> required. A file of functions is legal.</td></tr>
        </table>
        <p>A number looks similar, on purpose:</p>
<pre><span class="c">// Java</span>
<span class="t">int</span> age = 20;

<span class="c">// JavaScript</span>
<span class="t">const</span> age = 20;</pre>
        <p>In JavaScript you pick how the name may change:</p>
        <ul>
          <li><code>const</code> — you will not point this name at a different value later. Prefer this.</li>
          <li><code>let</code> — you will reassign it (<code>age = 21</code> later).</li>
          <li><code>var</code> — old rules. Skip it.</li>
        </ul>
        <p>A <strong>function</strong> is a method that does not have to live on a class. You still pass arguments and <code>return</code> a value:</p>
<pre><span class="t">function</span> isEmpty(s) {
  <span class="t">return</span> s === <span class="x">""</span>;
}</pre>
        <ul>
          <li><code>function</code> — keyword that starts a function</li>
          <li><code>isEmpty</code> — the name you choose</li>
          <li><code>(s)</code> — one parameter, like a method argument. No type written.</li>
          <li><code>return</code> — send a value back to the caller, same idea as Java</li>
          <li><code>===</code> — compare. For strings this is the usual “are these the same text?” (in Java you often use <code>.equals</code>)</li>
          <li><code>""</code> — the empty string: the user typed nothing</li>
        </ul>
        <div class="callout java">No class wrapper. No <code>public static</code>. The file may start with <code>function</code>.</div>
      `,
      exercise: {
        type: "js",
        prompt: 'Write isEmpty(s) that returns true only for "".',
        starter: "function isEmpty(s) {\n  \n}",
        expected: 'function isEmpty(s) {\n  return s === "";\n}',
        tests: [
          {
            expr: 'isEmpty("") === true',
            eq: true,
            msg: 'isEmpty("") should be true',
          },
          {
            expr: 'isEmpty("Ada") === false',
            eq: true,
            msg: 'isEmpty("Ada") should be false',
          },
        ],
      },
    },
    {
      id: "js-2",
      title: "An object, and an if",
      words: ["javascript"],
      body: `
        <p>In Java you might write a class, then fill fields:</p>
<pre>Person p = <span class="t">new</span> Person();
p.name = <span class="x">"Ada"</span>;
p.age = 20;
<span class="t">if</span> (p.age &lt; 0) { <span class="c">/* reject */</span> }</pre>
        <p>In JavaScript you can write the bundle in one pair of braces. No class file required. This is still an object: named fields stuck together.</p>
<pre><span class="t">const</span> person = {
  name: <span class="x">"Ada"</span>,
  age: 20
};
<span class="c">// person.name  →  "Ada"</span>
<span class="c">// person.age   →  20</span></pre>
        <p>Inside the braces: <code>fieldName: value</code>, commas between fields. Afterward, a dot reads a field: <code>person.name</code> — same idea as <code>p.name</code> in Java.</p>
        <p>Your <code>if</code> is the same English. Wrap it in a function if you want to reuse it:</p>
<pre><span class="t">function</span> isValidAge(n) {
  <span class="t">return</span> n &gt;= 0;
}</pre>
        <p>A list of objects is an <strong>array</strong> (like <code>ArrayList</code>):</p>
<pre><span class="t">const</span> people = [];     <span class="c">// empty list</span>
people.push(person);   <span class="c">// add at the end, like list.add</span></pre>
        <p>Square brackets <code>[]</code> make an array. <code>push</code> appends. You can still write a <code>for</code> loop; we will not require it yet.</p>
      `,
      exercise: {
        type: "js",
        prompt:
          'Write ada() returning {name:"Ada", age:20}. Write isValidAge(n) true only when n >= 0.',
        starter: "function ada() {\n  \n}\n\nfunction isValidAge(n) {\n  \n}",
        expected:
          'function ada() {\n  return { name: "Ada", age: 20 };\n}\n\nfunction isValidAge(n) {\n  return n >= 0;\n}',
        tests: [
          {
            expr: "ada().name",
            eq: "Ada",
            msg: "ada().name should be Ada",
          },
          {
            expr: "ada().age",
            eq: 20,
            msg: "ada().age should be 20",
          },
          {
            expr: "isValidAge(0) === true && isValidAge(20) === true && isValidAge(-1) === false",
            eq: true,
            msg: "isValidAge: n >= 0 (reject negatives)",
          },
        ],
      },
    },
    {
      id: "js-3",
      title: "Change the page after it loads",
      words: ["dom"],
      body: `
        <p>HTML is the starting drawing. After the file loads, JavaScript can find a tag and change it — like printing a new line, except you overwrite a box that already exists.</p>
        <div class="callout word"><strong>New word — DOM.</strong> Document Object Model: a fancy name for “the page as objects the script can find.” You look up a node by <code>id</code>, then set what it shows.</div>
        <p>You put <code>id="hello"</code> on a tag in HTML. JavaScript asks for it:</p>
<pre>document.getElementById(<span class="x">"hello"</span>).textContent = <span class="x">"Hi Ada"</span>;</pre>
        <ul>
          <li><code>document</code> — the page</li>
          <li><code>getElementById("hello")</code> — “give me the element whose id is hello” (like using a variable name)</li>
          <li><code>.textContent = "Hi Ada"</code> — set the visible text, replacing whatever was there</li>
        </ul>
        <p>To add a new list row, you build a tag in memory, set its text, then attach it to a list that already exists in HTML:</p>
<pre><span class="t">const</span> li = document.createElement(<span class="x">"li"</span>);
li.textContent = <span class="x">"Ada"</span>;
document.getElementById(<span class="x">"list"</span>).appendChild(li);</pre>
        <ul>
          <li><code>createElement("li")</code> — make an empty list item (not on the page yet)</li>
          <li><code>appendChild</code> — put it inside the parent (the <code>ul</code>)</li>
        </ul>
        <p>If <code>getElementById</code> returns nothing, the id is missing or the script ran before that tag existed. That is why the script tag goes at the bottom of <code>body</code>.</p>
      `,
      exercise: {
        type: "js-dom",
        prompt:
          "Set #hello's text to Hi Ada. Add an li that says Ada inside #list.",
        fixture: '<p id="hello">…</p><ul id="list"></ul>',
        starter: "// document.getElementById(...)\n",
        expected:
          'document.getElementById("hello").textContent = "Hi Ada";\nconst li = document.createElement("li");\nli.textContent = "Ada";\ndocument.getElementById("list").appendChild(li);',
        checks: [
          { sel: "#hello", text: "Hi Ada", msg: "#hello should say Hi Ada" },
          {
            sel: "#list li",
            text: "Ada",
            msg: "Add an li containing Ada",
          },
        ],
      },
    },
    {
      id: "js-4",
      title: "A click is “I’m done typing”",
      words: ["event"],
      body: `
        <p>Java waits with <code>sc.next()</code> inside a loop. The whole program sits there until the user presses Enter.</p>
        <p>A browser cannot freeze like that — it still has to draw the page. Instead it <strong>listens</strong>. When the user clicks, your function runs. That click is called an <strong>event</strong>.</p>
        <div class="callout word"><strong>New word — event.</strong> Something that happened: click, submit, typing. You register a function to run when it happens.</div>
<pre><span class="t">const</span> go = document.getElementById(<span class="x">"go"</span>);
go.addEventListener(<span class="x">"click"</span>, () => {
  <span class="c">// this block runs when #go is clicked</span>
});</pre>
        <ul>
          <li><code>addEventListener</code> — “when this happens, run this function”</li>
          <li><code>"click"</code> — the kind of event</li>
          <li><code>() => { … }</code> — a function with no name (an arrow function). Same idea as a method body. You could also write <code>function () { … }</code>.</li>
        </ul>
        <p>To read what is in a box: <code>.value</code> (always a <em>string</em>, even if the box looks like a number). Then you can <code>if</code>.</p>
<pre><span class="t">const</span> typed = document.getElementById(<span class="x">"src"</span>).value;
document.getElementById(<span class="x">"out"</span>).textContent = typed;</pre>
        <p>If the controls sit in a <code>&lt;form&gt;</code>, a submit (Enter or a submit button) reloads the page by default. Stop it:</p>
<pre>form.addEventListener(<span class="x">"submit"</span>, (e) => {
  e.preventDefault();
});</pre>
        <p><code>preventDefault</code> means “don’t do the browser’s default.” For forms, default is reload. You already saw <code>type="button"</code> as the other way to avoid that.</p>
      `,
      exercise: {
        type: "js-dom",
        prompt: "When #go is clicked, copy #src's value into #out.",
        fixture:
          '<input id="src" value="Ada"><button id="go" type="button">Go</button><p id="out"></p>',
        starter: 'const go = document.getElementById("go");\n',
        expected:
          'const go = document.getElementById("go");\ngo.addEventListener("click", () => {\n  document.getElementById("out").textContent =\n    document.getElementById("src").value;\n});',
        checks: [
          {
            after: (doc) => doc.getElementById("go").click(),
            sel: "#out",
            text: "Ada",
            msg: "Clicking #go should copy #src value into #out",
          },
        ],
      },
    },
    {
      id: "js-5",
      title: "Read, check, then add",
      words: ["javascript", "dom", "event"],
      body: `
        <p>Same order as Java: <strong>read → if → then store / show</strong>. If you skip the <code>if</code>, blank names become blank rows. That is a real bug, not a style issue.</p>
<pre><span class="t">const</span> add = document.getElementById(<span class="x">"add"</span>);
<span class="t">const</span> list = document.getElementById(<span class="x">"list"</span>);

add.addEventListener(<span class="x">"click"</span>, () => {
  <span class="t">const</span> name = document.getElementById(<span class="x">"name"</span>).value;
  <span class="t">if</span> (name === <span class="x">""</span>) <span class="t">return</span>;  <span class="c">// junk: stop, do not add</span>

  <span class="t">const</span> li = document.createElement(<span class="x">"li"</span>);
  li.textContent = name;
  list.appendChild(li);
});</pre>
        <p>Line by line: find the button and the list. On click, read the box. If the string is empty, <code>return</code> leaves the function — nothing is appended. Otherwise build an <code>li</code> and attach it.</p>
        <p>The checker will click once with “Ada”, then clear the box and click again. If you forgot the <code>if</code>, you get two rows. If you remembered it, you get one.</p>
      `,
      exercise: {
        type: "js-dom",
        prompt:
          'On #add click: read #name. If it is "", do nothing. Else append an li with that text.',
        fixture:
          '<input id="name" value="Ada"><button id="add" type="button">Add</button><ul id="list"></ul>',
        starter:
          'const add = document.getElementById("add");\nadd.addEventListener("click", () => {\n  \n});\n',
        expected:
          'const add = document.getElementById("add");\nadd.addEventListener("click", () => {\n  const name = document.getElementById("name").value;\n  if (name === "") return;\n  const li = document.createElement("li");\n  li.textContent = name;\n  document.getElementById("list").appendChild(li);\n});',
        after: (doc) => {
          doc.getElementById("add").click();
          doc.getElementById("name").value = "";
          doc.getElementById("add").click();
        },
        checks: [
          {
            sel: "#list li",
            count: 1,
            msg: "One row only — empty name must not add a second",
          },
          {
            sel: "#list li",
            text: "Ada",
            msg: "The row should mention Ada",
          },
        ],
      },
    },
    {
      id: "js-6",
      title: "Remember after refresh",
      words: ["localStorage"],
      body: `
        <p>A Java program can write a file on disk. This course is a static site: there is no Java process saving a file for you. When you refresh, a JavaScript array in memory is gone.</p>
        <p>The browser offers <code>localStorage</code>: a small key/value store of <em>strings</em>, per site, on this computer and this browser profile.</p>
        <div class="callout word"><strong>New word — localStorage.</strong> <code>setItem(key, string)</code> saves. <code>getItem(key)</code> reads. Clear site data and it is gone. It does not sync to another laptop.</div>
        <p>Your list is objects, not a string. Convert:</p>
<pre>localStorage.setItem(<span class="x">"people"</span>, JSON.stringify(people));
<span class="t">const</span> people = JSON.parse(localStorage.getItem(<span class="x">"people"</span>) || <span class="x">"[]"</span>);</pre>
        <ul>
          <li><code>JSON.stringify</code> — object/array → text (like writing a file format)</li>
          <li><code>JSON.parse</code> — text → object/array</li>
          <li><code>|| "[]"</code> — if nothing was saved, parse an empty array instead of crashing</li>
        </ul>
        <p>This course saves which lessons you finished this way. That is why Reset save exists on the home page.</p>
      `,
      exercise: {
        type: "js",
        prompt:
          "Write save(key, data) that JSON-stringifies into localStorage. Write load(key) that parses or returns [].",
        starter:
          "function save(key, data) {\n  \n}\n\nfunction load(key) {\n  \n}",
        expected:
          'function save(key, data) {\n  localStorage.setItem(key, JSON.stringify(data));\n}\n\nfunction load(key) {\n  return JSON.parse(localStorage.getItem(key) || "[]");\n}',
        tests: [
          {
            setup: "save('__webdev_lab_save_t', [{a:1}]);",
            expr: "load('__webdev_lab_save_t')[0].a",
            eq: 1,
            msg: "save then load should round-trip an array of objects",
          },
          {
            setup:
              "localStorage.removeItem('__webdev_lab_save_t'); localStorage.removeItem('__webdev_lab_missing');",
            expr: "Array.isArray(load('__webdev_lab_missing')) && load('__webdev_lab_missing').length === 0",
            eq: true,
            msg: "missing key → []",
          },
        ],
      },
    },
    {
      id: "js-7",
      title: "Waiting without freezing the page",
      words: ["async"],
      body: `
        <p><code>sc.next()</code> stops the whole Java program until the user types. That is fine in a terminal. A webpage must still paint, scroll, and react to other clicks. So JavaScript does not freeze the window while it waits for something slow (the network, later).</p>
        <p>The spelling is <code>async</code> and <code>await</code>:</p>
<pre><span class="t">async function</span> load() {
  <span class="t">const</span> res = <span class="t">await</span> fetch(<span class="x">"/api/notes"</span>);
  <span class="t">return</span> <span class="t">await</span> res.json();
}</pre>
        <ul>
          <li><code>async function</code> — this function is allowed to wait. It returns a Promise (a value that arrives later). You do not need to master Promise as a class yet.</li>
          <li><code>await</code> — pause <em>this</em> function until that later value is ready. Other code on the page can still run.</li>
          <li><code>await</code> is only legal inside <code>async</code> functions.</li>
          <li><code>fetch</code> — send an HTTP request (explained in a later chapter). Here it is just “ask another program for data.”</li>
          <li><code>res.json()</code> — parse the reply body as JSON (object/array text).</li>
        </ul>
        <div class="callout warn">If you forget <code>await</code>, you get the Promise object itself, not the array. The list looks empty. Add <code>await</code>.</div>
        <p>You already understand waiting. The new rule is: wait inside the function, not by freezing the whole window. We will use this for real when two programs talk.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "sc.next() freezes the CLI. await fetch is different because…",
        options: [
          {
            id: "a",
            text: "The whole browser freezes until the network returns",
            ok: false,
          },
          {
            id: "b",
            text: "Only that function waits. The page can still draw.",
            ok: true,
          },
          { id: "c", text: "HTML runs the if for you", ok: false },
        ],
        why: "You already know waiting. Don’t freeze the window.",
      },
    },
    {
      id: "js-8",
      title: "This is still one computer",
      words: ["frontend", "state"],
      body: `
        <p>You can now, all in the browser:</p>
        <ol>
          <li>Draw a page (HTML)</li>
          <li>Paint it (CSS)</li>
          <li>Read a box, run <code>if</code>, change the list (JavaScript)</li>
          <li>Save strings in <code>localStorage</code></li>
        </ol>
        <p>That is a complete program on <em>this</em> browser profile. Refresh on the same laptop: localStorage can restore the list. Open the same site on a different laptop or a different Chrome profile: empty. That is not a bug. There is no shared disk.</p>
        <div class="callout word"><strong>New word — frontend.</strong> HTML + CSS + JS: what the browser runs. You just did this.</div>
        <p>To share one list among many people you need a <strong>second program</strong> that owns the data (a backend). The page will send it a message. That is soon. Next chapter is Git: snapshot these files so you can see what an agent changed. Then we name the jobs (input, rules, remember, show). We will not restart HTML.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "localStorage is enough when…",
        options: [
          {
            id: "a",
            text: "One person, one browser profile",
            ok: true,
          },
          {
            id: "b",
            text: "Everyone in a team should see the same list live",
            ok: false,
          },
          {
            id: "c",
            text: "You install the site — then it syncs by magic",
            ok: false,
          },
        ],
        why: "Install does not create a server. Shared data needs another program.",
      },
    },
  ],
});
