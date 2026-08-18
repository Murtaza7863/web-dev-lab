window.LEARN_TRACKS = window.LEARN_TRACKS || [];
window.LEARN_TRACKS.push({
  id: "start",
  title: "Before HTML",
  quest: "Before HTML",
  blurb:
    "You can write Java. You have not made a webpage. We name that gap, then HTML starts from nothing.",
  youKnow:
    "You know objects, forcing the user to type, and if. You do not know tags, CSS, or JavaScript yet.",
  lessons: [
    {
      id: "start-1",
      title: "What you can already do in Java",
      words: ["browser"],
      body: `
        <p>This course assumes you already write Java. Not “heard of Java.” You can make an object, make the user type, and refuse bad values. That is enough to start. We will not teach Java here.</p>
        <p><strong>1. An object</strong> is a bundle of fields that belong together. A person has a name and an age, so you put both on one object:</p>
<pre><span class="t">class</span> Person {
  String name;
  <span class="t">int</span> age;
}

Person p = <span class="t">new</span> Person();
p.name = <span class="x">"Ada"</span>;
p.age = 20;</pre>
        <p><code>new Person()</code> creates one person in memory. <code>p.name</code> is “the name field on that person.” You already know this.</p>
        <p><strong>2. Input</strong> means you force the user to give you a value. In a terminal that is <code>Scanner</code>:</p>
<pre>Scanner sc = <span class="t">new</span> Scanner(System.in);
System.out.print(<span class="x">"Name: "</span>);
String name = sc.next();</pre>
        <p>The program prints a prompt, then <strong>waits</strong> until the user types and presses Enter. You wrote that on purpose. The program does not guess the name.</p>
        <p><strong>3. A rule</strong> is an <code>if</code>. You look at a value and decide whether to continue:</p>
<pre><span class="t">if</span> (age &lt; 0) {
  System.out.println(<span class="x">"Invalid"</span>);
}</pre>
        <p>Negative age is junk. You reject it <em>before</em> you treat it as a real person. That order matters: read, check, then use.</p>
        <table class="plain">
          <tr><td><strong>Object</strong></td><td>A bundle of fields. <code>new Person()</code>.</td></tr>
          <tr><td><strong>Input</strong></td><td>You make the user type. <code>sc.next()</code>.</td></tr>
          <tr><td><strong>Rules</strong></td><td>You refuse junk. <code>if (age &lt; 0)</code>.</td></tr>
        </table>
        <p>That is coding. None of it is a website yet. A website is a different window, with a different kind of file. We have not opened that window.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "if (age < 0) { … } in Java is…",
        options: [
          { id: "a", text: "How a browser draws a page", ok: false },
          { id: "b", text: "A rule: reject bad data", ok: true },
          { id: "c", text: "HTML", ok: false },
        ],
        why: "An if is a rule. HTML cannot run an if. We have not started HTML yet.",
      },
    },
    {
      id: "start-2",
      title: "A website is files. A browser draws them.",
      words: ["html", "browser", "website"],
      body: `
        <p>When you run Java, a <strong>terminal</strong> (the black or white text window) prints lines. The terminal is a program that shows text from <code>System.out.println</code>.</p>
        <p>A <strong>website</strong> is different. It is one or more <strong>files on a disk</strong> (or on the internet). Another program opens those files and <em>draws</em> them as a page with headings, buttons, and colors.</p>
        <div class="callout word"><strong>New word — browser.</strong> That drawing program. Chrome, Safari, Edge, Firefox. You are inside a browser right now, reading this sentence. The browser is not Java. It does not run <code>javac</code>.</div>
        <div class="callout word"><strong>New word — website.</strong> Pages a browser can open. This course is a website: files the browser fetched and drew.</div>
        <p>The main file type for a page is HTML. You have not written HTML yet in this course.</p>
        <div class="callout word"><strong>New word — HTML.</strong> A <em>text</em> file of labels around words, so the browser knows what to draw. The letters mean HyperText Markup Language. “Markup” means labels, not a program. There is no <code>class</code>, no <code>main</code>, no compile step. You save the file and the browser reads it.</div>
        <p>Java in a terminal:</p>
<pre>System.out.println(<span class="x">"Hello"</span>);</pre>
        <p>That prints Hello in the terminal. To put Hello on a <em>page</em>, you will later write a label around it. The browser does not run that Java line. Different window, different file.</p>
        <p>Next chapter is that label. Not yet. This lesson only: terminal ≠ browser, Java file ≠ HTML file.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "Have you already written HTML in this course?",
        options: [
          {
            id: "a",
            text: "Yes — the last chapter was a full webpage",
            ok: false,
          },
          {
            id: "b",
            text: "No. HTML has not happened yet. The next chapter starts with one tag.",
            ok: true,
          },
          { id: "c", text: "HTML is just another name for Java", ok: false },
        ],
        why: "This chapter named the window (browser) and the file type (HTML). You have not written a tag yet.",
      },
    },
    {
      id: "start-3",
      title: "Three kinds of file (you will learn them in order)",
      words: ["html", "css", "javascript"],
      body: `
        <p>A simple site is usually three kinds of text file. Each file has a job. Mixing the jobs is how beginners get lost, so we learn them one at a time. You have not written any of them yet.</p>
        <ol>
          <li>
            <strong>HTML</strong> — the page itself. Headings, paragraphs, lists, boxes to type in.
            If you open only an HTML file, you already have a page. Ugly is fine. It exists.
          </li>
          <li>
            <strong>CSS</strong> — how it <em>looks</em>: color, size, spacing.
            CSS cannot create an object. CSS cannot run <code>if (age &lt; 0)</code>.
            It only paints tags that HTML already made.
          </li>
          <li>
            <strong>JavaScript</strong> — a <em>second programming language</em> the browser runs.
            This is where objects, reading what the user typed, and <code>if</code> live on the web.
            It is <strong>not Java</strong>. The similar name is an accident from the 1990s. We will say that again when we get there.
          </li>
        </ol>
        <p>Order is forced: nothing to paint until there is HTML. Nothing useful to click until there is HTML. So HTML is first, from zero.</p>
        <p>You will also hear “server,” “API,” “Spring.” Those mean <em>another program</em> running somewhere else. You do not need them to show Hello on a page. They wait until you can draw and click.</p>
        <div class="callout tip">If a sentence uses a word you have not met, the lesson will put it in an orange box. Skip exists on exercises if a checker is picky.</div>
      `,
      exercise: {
        type: "choice",
        prompt: "The first file you should learn to write is…",
        options: [
          { id: "a", text: "HTML — the page itself", ok: true },
          { id: "b", text: "Spring Boot", ok: false },
          { id: "c", text: "A database", ok: false },
        ],
        why: "Nothing to click or paint until there is a page. HTML is that page.",
      },
    },
    {
      id: "start-4",
      title: "Park your Java skills — HTML will not use them",
      words: ["html"],
      body: `
        <p>Your Java skills are not wasted. They just do not live in HTML. HTML cannot declare a class. HTML cannot wait on <code>Scanner</code>. HTML cannot run <code>if</code>. It only <em>labels text</em> so the browser can draw it.</p>
        <p>Here is where those skills come back — <em>later</em>, after a page exists:</p>
        <table class="plain">
          <tr><td>What you know in Java</td><td>Where it shows up on the web</td></tr>
          <tr><td>An object with fields</td><td>A JavaScript object — after you can write HTML</td></tr>
          <tr><td><code>Scanner</code> / <code>sc.next()</code></td><td>A box on the page, then a button meaning “I’m done typing”</td></tr>
          <tr><td><code>if (…)</code></td><td>The same <code>if</code>, in JavaScript, after the click</td></tr>
          <tr><td><code>System.out.println</code></td><td>HTML shows the starting text; JavaScript can change it later</td></tr>
        </table>
        <p>If you try to put <code>if (age &lt; 0)</code> inside an HTML file, the browser will not run it as Java. It may even show the words on the page as text. That is why we start with labels, from scratch, and only later write a second language for rules.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "Can an HTML file run if (age < 0)?",
        options: [
          { id: "a", text: "Yes — tags are if-statements", ok: false },
          {
            id: "b",
            text: "No. HTML only labels text. Rules come later, in JavaScript.",
            ok: true,
          },
          { id: "c", text: "Only inside <head>", ok: false },
        ],
        why: "HTML draws. JavaScript decides. We have not written either yet.",
      },
    },
    {
      id: "start-5",
      title: "What you will type next: one tag",
      words: ["html", "tag"],
      body: `
        <p>The next chapter’s first exercise is this, and only this: wrap the word Hello so the browser treats it as a paragraph.</p>
<pre><span class="t">&lt;p&gt;</span><span class="x">Hello</span><span class="t">&lt;/p&gt;</span></pre>
        <p>Read it left to right:</p>
        <ul>
          <li><code>&lt;</code> and <code>&gt;</code> — angle brackets. They mark “this is a label, not a normal word.”</li>
          <li><code>p</code> — short for paragraph. A paragraph is a block of text.</li>
          <li><code>&lt;p&gt;</code> — start of the paragraph</li>
          <li><code>Hello</code> — the words the human sees</li>
          <li><code>&lt;/p&gt;</code> — end. The slash <code>/</code> means “stop this label.”</li>
        </ul>
        <div class="callout word"><strong>New word — tag.</strong> Those wrappers: <code>&lt;p&gt;</code> and <code>&lt;/p&gt;</code>. You have not typed one yet. That is expected.</div>
        <p>You do not need a class. You do not need <code>public static void main</code>. You do not compile. You type it in the exercise box on the right, and this site checks that a paragraph containing Hello exists.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "The next lesson will ask you to…",
        options: [
          { id: "a", text: "Write Spring annotations", ok: false },
          {
            id: "b",
            text: "Write your first HTML tag, starting from nothing",
            ok: true,
          },
          { id: "c", text: "Reuse a page you already built", ok: false },
        ],
        why: "From scratch. One tag. Then we build up.",
      },
    },
  ],
});
