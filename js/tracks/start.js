window.LEARN_TRACKS = window.LEARN_TRACKS || [];
window.LEARN_TRACKS.push({
  id: "start",
  title: "First steps",
  quest: "The Window",
  blurb:
    "You can write Java. A website is just files a browser shows. No new language yet — only the picture.",
  youKnow:
    "You already run programs in a terminal. This quest is only: what is the other window (Chrome, Safari) actually doing?",
  lessons: [
    {
      id: "start-1",
      title: "You're looking at a program called a browser",
      words: ["browser"],
      body: `
        <p>Chrome, Safari, Edge, Firefox — that's a <strong>browser</strong>. It's a program whose job is: take a page and show it.</p>
        <p>This course <em>is</em> a page. You're not in IntelliJ. You're not compiling. The browser already drew these words.</p>
        <div class="callout word"><strong>New word — browser.</strong> The app that displays websites. Like a PDF reader, but for web pages.</div>
        <div class="callout java"><strong>You already know:</strong> <code>java Main</code> opens your expense tracker in the terminal. Opening this site is the same idea: a program (the browser) runs a file (this page).</div>
        <p>That's the whole first fact. We will not say API, Spring, or server yet.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "Right now, this course is being shown by…",
        options: [
          { id: "a", text: "Java / the terminal", ok: false },
          { id: "b", text: "A browser (Chrome, Safari, Edge…)", ok: true },
          { id: "c", text: "Spring Boot", ok: false },
        ],
        why: "If you can see this sentence, a browser is running. Java is not required to show a page.",
      },
    },
    {
      id: "start-2",
      title: "A web page is a text file",
      words: ["html", "website"],
      body: `
        <p>Your Java program is text in a <code>.java</code> file. A web page is text in an <code>.html</code> file.</p>
        <p>The browser reads that file and draws it. There is no <code>javac</code>. There is no <code>main</code>.</p>
        <div class="callout word"><strong>New word — HTML.</strong> The text format of a page. Those <code>&lt;p&gt;</code> things you'll type next quest are HTML. It is <em>not</em> a programming language — it's labels around words.</div>
        <div class="callout word"><strong>New word — website.</strong> One or more HTML files (plus pictures, later). This course is a website.</div>
        <p>You can write HTML in any editor, save as <code>hello.html</code>, and open it in the browser. That's a real page.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "To show “Hello” in a browser, the smallest true answer is…",
        options: [
          {
            id: "a",
            text: "Install Spring, Docker, and a database first",
            ok: false,
          },
          {
            id: "b",
            text: "A text file the browser can read (HTML)",
            ok: true,
          },
          { id: "c", text: "A Java class named Hello", ok: false },
        ],
        why: "A page can be one file. Frameworks are extra. We'll get there only after a page exists.",
      },
    },
    {
      id: "start-3",
      title: "Your expense tracker — two windows",
      words: ["html"],
      body: `
        <p>You already built an expense tracker in Java: type a description, an amount, a category, see a list, save to a file.</p>
        <p>A <em>web</em> expense tracker does the same jobs, in a different window:</p>
        <table class="plain">
          <tr><td>Terminal</td><td>You type numbers into the menu</td></tr>
          <tr><td>Browser</td><td>You type into boxes on a page</td></tr>
          <tr><td>Both</td><td>Coffee, 4.50, Food — same data</td></tr>
        </table>
        <p>We are not throwing away your Java. We're building the page version in tiny pieces, then later (much later) the Java can sit behind the page.</p>
        <div class="callout tip">If a lesson mentions Coffee / $4.50 / Food, it's your app. Same story, slower camera.</div>
      `,
      exercise: {
        type: "choice",
        prompt: "The web version of your tracker is mainly…",
        options: [
          { id: "a", text: "A brand-new kind of math", ok: false },
          {
            id: "b",
            text: "The same add / list / delete, shown in a browser instead of a terminal",
            ok: true,
          },
          {
            id: "c",
            text: "Something you can only write in Spring",
            ok: false,
          },
        ],
        why: "Same machine. Different mouth (page vs Scanner).",
      },
    },
    {
      id: "start-4",
      title: "Foreign words: we box them, then we wait",
      words: ["html"],
      body: `
        <p>Coding bootcamps throw: API, REST, JSON, CRUD, Spring, frontend, backend. Those are <em>names</em> for things. They are not the things.</p>
        <p>In this course a <strong>new word</strong> gets an orange box the first time. If there is no box, you are not supposed to already know it.</p>
        <p>Words we are <em>not</em> using yet on purpose:</p>
        <ul>
          <li>API, REST, JSON</li>
          <li>Spring, controller, server</li>
          <li>Deploy, PWA, service worker</li>
        </ul>
        <p>You'll meet them when you can point at something on screen and say “that.” Until then, skip any article that starts with those.</p>
        <div class="callout warn">If a sentence feels foggy, it's usually a word we haven't boxed. Use Skip on picky questions. Keep going.</div>
      `,
      exercise: {
        type: "choice",
        prompt: "When this course uses a word you don't know, you should…",
        options: [
          {
            id: "a",
            text: "Memorize a Wikipedia page before continuing",
            ok: false,
          },
          {
            id: "b",
            text: "Look for the orange “New word” box — or wait, we'll name it when you can see it",
            ok: true,
          },
          {
            id: "c",
            text: "Install Spring so the word starts making sense",
            ok: false,
          },
        ],
        why: "Names stick after you have a picture. Not before.",
      },
    },
    {
      id: "start-5",
      title: "The order (don't skip to the scary chapter)",
      words: ["html", "css", "javascript"],
      body: `
        <p>We'll build the web tracker in this order. Each line is one quest:</p>
        <ol>
          <li><strong>Page</strong> — put words on screen (HTML)</li>
          <li><strong>Look</strong> — color and spacing (CSS)</li>
          <li><strong>Click</strong> — a button that does something (JavaScript)</li>
          <li><strong>Pieces</strong> — name the jobs your CLI already does</li>
          <li><strong>Later</strong> — talking to another program, then Java that waits for the page, then putting it on the internet</li>
        </ol>
        <p>HTML / CSS / JavaScript are just the names of those first three files. You'll see them one at a time.</p>
        <div class="callout java">Do not open a Spring tutorial yet. That's chapter 8 energy. You don't start a Java course on JVM internals.</div>
      `,
      exercise: {
        type: "choice",
        prompt: "What is the next thing to actually type?",
        options: [
          { id: "a", text: "A Spring controller", ok: false },
          {
            id: "b",
            text: "A tiny HTML tag so the browser shows a sentence",
            ok: true,
          },
          { id: "c", text: "A database", ok: false },
        ],
        why: "Next quest is The Page. One tag. That's the whole homework.",
      },
    },
  ],
});
