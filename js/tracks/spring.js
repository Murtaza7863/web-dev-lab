window.LEARN_TRACKS = window.LEARN_TRACKS || [];
window.LEARN_TRACKS.push({
  id: "spring",
  title: "Spring Boot",
  quest: "Java that waits",
  blurb:
    "Java that waits for the page to call it. Same objects and ifs. Optional, after HTML/CSS/JS.",
  youKnow:
    "You already built the page. A Note class can stay Java. The menu becomes a Controller. The list becomes a Repository.",
  lessons: [
    {
      id: "spring-1",
      title: "What Spring Boot is",
      words: ["spring-boot"],
      body: `
        <p>You already send <code>fetch("/api/notes")</code> from the page. Something has to sit on the other end, parse HTTP, run your <code>if</code>, and reply with JSON. You could write that socket code by hand. Most Java teams do not.</p>
        <div class="callout word"><strong>New word — Spring Boot.</strong> A Java toolkit that starts an HTTP server and maps URLs to methods you write. It is not a language. You still write Java: classes, fields, <code>if</code>.</div>
        <p>Three jobs Boot takes so you do not:</p>
        <ol>
          <li>Starts a server (listens on a port, often 8080)</li>
          <li>Maps “GET /api/notes” to a method you named <code>all()</code></li>
          <li>Turns JSON ↔ your classes (<code>Note</code> with <code>title</code> and <code>text</code>)</li>
        </ol>
        <div class="callout java">A <code>while (true)</code> menu that reads <code>sc.next()</code> is a server for a human typing in a terminal. Boot is a server for a browser sending HTTP. Same idea: wait, then run a branch.</div>
        <div class="callout warn">GitHub Pages cannot run Spring. Pages only serves files (HTML/CSS/JS). You run Boot on your machine or a host that has a JVM. This course fakes <code>/api/notes</code> in the browser so earlier lessons work offline.</div>
      `,
      exercise: {
        type: "choice",
        prompt: "Where can these Spring snippets actually run?",
        options: [
          {
            id: "a",
            text: "On GitHub Pages, because this site is a PWA",
            ok: false,
          },
          {
            id: "b",
            text: "In a JVM on your computer (or a real server), not on Pages",
            ok: true,
          },
          { id: "c", text: "Inside localStorage", ok: false },
        ],
        why: "Pages = static files. Spring = a running Java process.",
      },
    },
    {
      id: "spring-2",
      title: "Controller = the menu",
      words: ["controller"],
      body: `
        <p>In a CLI you might write <code>if (choice == 1) list();</code>. On the web, the “choice” is the HTTP method + path. A <strong>controller</strong> is a class whose methods are those endpoints.</p>
        <div class="callout word"><strong>New word — controller.</strong> The UI pile on the server: HTTP in, HTTP out. It should not own the list forever, and it should not hide all the rules, but it is the menu.</div>
        <p>The words starting with <code>@</code> are <strong>annotations</strong> — labels Spring reads. They are not methods. They tell Boot how to wire this class to HTTP.</p>
<pre><span class="p">@RestController</span>
<span class="p">@RequestMapping</span>(<span class="x">"/api/notes"</span>)
<span class="t">public class</span> NoteController {

  <span class="p">@GetMapping</span>
  <span class="t">public</span> List&lt;Note&gt; all() { <span class="c">/* GET /api/notes */</span> }

  <span class="p">@PostMapping</span>
  <span class="t">public</span> Note create(<span class="p">@RequestBody</span> Note n) { <span class="c">/* POST */</span> }
}</pre>
        <ul>
          <li><code>@RestController</code> — this class serves JSON (not an HTML page). “Rest” here matches the JSON API style you already used.</li>
          <li><code>@RequestMapping("/api/notes")</code> — prefix for every method in the class. GET with no extra path → <code>/api/notes</code>.</li>
          <li><code>@GetMapping</code> — this method handles GET on that prefix.</li>
          <li><code>@PostMapping</code> — this method handles POST.</li>
          <li><code>@RequestBody</code> — take the JSON body and fill a <code>Note</code> (title, text). Same fields you stringify in <code>fetch</code>.</li>
          <li><code>List&lt;Note&gt;</code> — Java generic list, like <code>ArrayList&lt;Note&gt;</code>. Boot will stringify it as a JSON array.</li>
        </ul>
      `,
      exercise: {
        type: "java",
        prompt:
          "Write a RestController mapped to /api/notes with a GetMapping method named all that returns List<Note>.",
        starter: "@RestController\n",
        expected:
          '@RestController\n@RequestMapping("/api/notes")\nclass C {\n  @GetMapping\n  List<Note> all() { return null; }\n}',
        must: [
          { re: /@RestController/, msg: "Need @RestController" },
          {
            re: /@RequestMapping\s*\([^)]*\/api\/notes/,
            msg: '@RequestMapping("/api/notes")',
          },
          { re: /@GetMapping/, msg: "Need @GetMapping on the list method" },
          { re: /List\s*<\s*Note\s*>/, msg: "Return type List<Note>" },
        ],
      },
    },
    {
      id: "spring-3",
      title: "GET one: PathVariable",
      words: ["pathvariable"],
      body: `
        <p>List-all was GET with no extra path. Show-one needs the id in the URL: <code>GET /api/notes/3</code>. The <code>3</code> is not a Java argument until you declare it.</p>
<pre><span class="p">@GetMapping</span>(<span class="x">"/{id}"</span>)
<span class="t">public</span> Note one(<span class="p">@PathVariable</span> <span class="t">long</span> id) {
  <span class="t">return</span> service.find(id);
}</pre>
        <ul>
          <li><code>@GetMapping("/{id}")</code> — added onto the class prefix, so the full path is <code>/api/notes/{id}</code>.</li>
          <li>The braces <code>{id}</code> mean “this segment is a value, not the letters i-d.”</li>
          <li><code>@PathVariable long id</code> — fill the method argument from that segment. The name <code>id</code> matches <code>{id}</code>.</li>
          <li><code>long</code> because ids were numbers in the mock. If the path is not a number, Spring will fail the request before your method runs.</li>
        </ul>
        <p>If nothing has that id, do not return a fake note. Return 404 (you will throw or use a ResponseEntity later). Missing row is not 200 with null — the page would not know it failed.</p>
      `,
      exercise: {
        type: "java",
        prompt:
          'Add a method getOne with @GetMapping("/{id}") and a @PathVariable long id, returning Note.',
        starter: '@GetMapping("/{id}")\n',
        expected:
          '@GetMapping("/{id}")\nNote getOne(@PathVariable long id) { return null; }',
        must: [
          {
            re: /@GetMapping\s*\([^)]*\{id\}/,
            msg: '@GetMapping("/{id}")',
          },
          { re: /@PathVariable/, msg: "Need @PathVariable" },
          { re: /Note\s+\w+\s*\(/, msg: "Method should return Note" },
        ],
      },
    },
    {
      id: "spring-4",
      title: "POST with RequestBody",
      words: ["requestbody", "post"],
      body: `
        <p>POST creates. The JSON body is the new note. <code>@RequestBody Note in</code> is “parse JSON into this object,” the reverse of <code>JSON.stringify</code> in the browser.</p>
<pre><span class="p">@PostMapping</span>
<span class="t">public</span> Note create(<span class="p">@RequestBody</span> Note in) {
  <span class="t">if</span> (in.getTitle() == <span class="t">null</span> || in.getTitle().isEmpty()) {
    <span class="c">/* reject — same if you already know */</span>
  }
  <span class="t">return</span> service.add(in);
}</pre>
        <ul>
          <li><code>in.getTitle()</code> — Java style getters. JSON field <code>"title"</code> maps to that property. Names must match: <code>title</code> and <code>text</code>, not <code>heading</code>.</li>
          <li>The <code>if</code> is validation you already wrote in JS. Empty title should become 400, not 500. Throwing a generic exception without handling often becomes 500 — that is the crash code, not the junk code.</li>
          <li>Return the saved <code>Note</code>, including the id the repository assigned, so the page can PUT/DELETE later.</li>
        </ul>
        <p>You still need <code>Content-Type: application/json</code> on the fetch. If the header is missing, Spring may not fill <code>@RequestBody</code>.</p>
      `,
      exercise: {
        type: "java",
        prompt:
          "Write a PostMapping method create that takes @RequestBody Note in and returns Note.",
        starter: "@PostMapping\n",
        expected:
          "@PostMapping\nNote create(@RequestBody Note in) { return in; }",
        must: [
          { re: /@PostMapping/, msg: "@PostMapping" },
          { re: /@RequestBody/, msg: "@RequestBody Note" },
          { re: /Note\s+\w+\s*\(/, msg: "A method that returns Note" },
        ],
      },
    },
    {
      id: "spring-5",
      title: "Service and Repository",
      words: ["service", "repository"],
      body: `
        <p>Three piles, Java names. You already used this split in the jobs chapter:</p>
        <table class="plain">
          <tr><td><strong>Controller</strong></td><td>HTTP in/out. Like a menu. Annotations live here.</td></tr>
          <tr><td><strong>Service</strong></td><td>Rules: reject empty title. No <code>@GetMapping</code> here.</td></tr>
          <tr><td><strong>Repository</strong></td><td>Save/load. An in-memory list first, a database later.</td></tr>
        </table>
<pre><span class="p">@Service</span>
<span class="t">public class</span> NoteService {
  <span class="t">private final</span> NoteRepository repo;
  <span class="t">public</span> NoteService(NoteRepository repo) { <span class="t">this</span>.repo = repo; }
  <span class="t">public</span> Note add(Note n) {
    <span class="t">if</span> (n.getTitle().isEmpty()) <span class="t">throw new</span> IllegalArgumentException();
    <span class="t">return</span> repo.save(n);
  }
}</pre>
        <ul>
          <li><code>@Service</code> — label: this class is the rules pile. Spring will create one and pass it into the controller.</li>
          <li>The constructor takes <code>NoteRepository</code>. You do not write <code>new NoteRepository()</code> inside the controller. Spring passes the object in.</li>
        </ul>
        <div class="callout word"><strong>New word — dependency injection.</strong> Pass collaborators in (the repo) instead of constructing them inside the class. “Dependency” = the other object you need. “Injection” = someone else hands it to you. You already did this whenever a method took an argument instead of <code>new</code>ing inside.</div>
        <p><code>List&lt;Note&gt;</code> belongs in the repository, not as a static field on <code>Note</code>, and not as the only field on the controller. HTTP should not own the data.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "Where should List<Note> live in a Spring app?",
        options: [
          { id: "a", text: "The controller — HTTP owns the data", ok: false },
          {
            id: "b",
            text: "The repository — storage. Controller → service → repo.",
            ok: true,
          },
          { id: "c", text: "static on Note", ok: false },
        ],
        why: "Controller HTTP, service rules, repository storage.",
      },
    },
    {
      id: "spring-6",
      title: "Two origins (CORS)",
      words: ["cors"],
      body: `
        <p>An <strong>origin</strong> is scheme + host + port. <code>https://you.github.io</code> is one origin. <code>http://localhost:8080</code> is another. They are different even if both are “your project.”</p>
        <p>If the page is on GitHub Pages and Spring is on <code>localhost:8080</code>, the browser treats a <code>fetch</code> from the page to Boot as <strong>cross-origin</strong>. It will block the response unless the server says the page is allowed.</p>
        <div class="callout word"><strong>New word — CORS.</strong> Cross-Origin Resource Sharing. The browser asks the server “is this other site allowed to call you?” The server answers with headers. Your Java <code>if</code> is unrelated. This is a browser rule.</div>
<pre><span class="p">@CrossOrigin</span>(origins = <span class="x">"https://you.github.io"</span>)
<span class="p">@RestController</span></pre>
        <p><code>@CrossOrigin</code> tells Boot to send those allow headers. During local work you might allow <code>http://localhost:8080</code> for the page as well — only list origins you trust.</p>
        <p>This course’s mock API lives in the <em>same</em> page as the Lab, so CORS never fires. That is why the Lab works here without a Java process. <code>curl</code> also skips CORS (no browser). If fetch fails in Chrome but curl works, think CORS before rewriting the controller.</p>
      `,
      exercise: {
        type: "choice",
        prompt:
          "The browser blocks a fetch from github.io to localhost:8080 until CORS headers exist. Enforced by…",
        options: [
          { id: "a", text: "GitHub", ok: false },
          { id: "b", text: "The browser", ok: true },
          { id: "c", text: "The Java compiler", ok: false },
        ],
        why: "curl would succeed. The browser is strict. @CrossOrigin is for the browser.",
      },
    },
    {
      id: "spring-7",
      title: "Boot’s main",
      words: ["spring-boot", "controller", "service", "repository"],
      body: `
        <p>Java still starts in <code>main</code>. Boot’s main is short: “run this application class.” That starts the server and scans for <code>@RestController</code>, <code>@Service</code>, and so on.</p>
<pre><span class="p">@SpringBootApplication</span>
<span class="t">public class</span> NotesApp {
  <span class="t">public static void</span> main(String[] args) {
    SpringApplication.run(NotesApp.class, args);
  }
}</pre>
        <ul>
          <li><code>@SpringBootApplication</code> — this is the app entry; enable Boot’s auto-setup.</li>
          <li><code>SpringApplication.run(NotesApp.class, args)</code> — start. <code>NotesApp.class</code> is which class to run. <code>args</code> are command-line arguments, same as any <code>main</code>.</li>
        </ul>
        <p>Then one POST from the page, in order:</p>
        <ol>
          <li>The server (often Tomcat inside Boot) receives HTTP</li>
          <li>Controller: JSON → <code>Note</code></li>
          <li>Service: <code>if</code> on title</li>
          <li>Repository: save, assign id</li>
          <li>JSON + 201 back</li>
          <li>Your JS reads the body and redraws the list</li>
        </ol>
        <p>If you skip redraw, you get the three-copies bug again: disk/server yes, screen no.</p>
      `,
      exercise: {
        type: "java",
        prompt:
          "Write a class NotesApp with @SpringBootApplication and a main that calls SpringApplication.run(NotesApp.class, args).",
        starter: "@SpringBootApplication\n",
        expected:
          "@SpringBootApplication\npublic class NotesApp {\n  public static void main(String[] args) {\n    SpringApplication.run(NotesApp.class, args);\n  }\n}",
        must: [
          { re: /@SpringBootApplication/, msg: "@SpringBootApplication" },
          {
            re: /SpringApplication\.run\s*\(\s*\w+\.class/,
            msg: "SpringApplication.run(NotesApp.class, args)",
          },
          {
            re: /public\s+static\s+void\s+main/,
            msg: "public static void main",
          },
        ],
      },
    },
    {
      id: "spring-8",
      title: "DELETE and PUT on the server",
      words: ["delete", "put"],
      body: `
        <p>Same two methods you already sent with <code>fetch</code>. On the server they are two more controller methods. Id in the path, body only on PUT.</p>
<pre><span class="p">@PutMapping</span>(<span class="x">"/{id}"</span>)
<span class="t">public</span> Note update(<span class="p">@PathVariable</span> <span class="t">long</span> id, <span class="p">@RequestBody</span> Note in) {
  <span class="t">return</span> service.update(id, in);
}

<span class="p">@DeleteMapping</span>(<span class="x">"/{id}"</span>)
<span class="t">public void</span> remove(<span class="p">@PathVariable</span> <span class="t">long</span> id) {
  service.delete(id);
}</pre>
        <ul>
          <li><code>@PutMapping("/{id}")</code> — PUT /api/notes/3. Two inputs: which row (<code>id</code>), and the new fields (<code>in</code>).</li>
          <li><code>@DeleteMapping("/{id}")</code> — DELETE. Often <code>void</code>; Boot can answer 200 or 204 with an empty body. The page should not assume JSON.</li>
          <li>If <code>id</code> is missing, service/repo should surface 404, not silently no-op (or the page thinks delete worked).</li>
        </ul>
        <p>Keep rules in the service: empty title on PUT is still 400. The controller stays the menu.</p>
      `,
      exercise: {
        type: "java",
        prompt:
          "Write a DeleteMapping on /{id} named remove that takes @PathVariable long id.",
        starter: '@DeleteMapping("/{id}")\n',
        expected:
          '@DeleteMapping("/{id}")\nvoid remove(@PathVariable long id) {}',
        must: [
          {
            re: /@DeleteMapping\s*\([^)]*\{id\}/,
            msg: '@DeleteMapping("/{id}")',
          },
          { re: /@PathVariable/, msg: "@PathVariable" },
          { re: /\w+\s*\(/, msg: "a method" },
        ],
      },
    },
    {
      id: "spring-9",
      title: "A database is a fancier file",
      words: ["repository", "database"],
      body: `
        <p>A <strong>database</strong> is save/load that many clients can share at once, with queries and durability a text file struggles with. It is still storage. The verbs do not change: save, find by id, delete.</p>
        <div class="callout word"><strong>New word — database.</strong> A program that stores rows so many servers (or many requests) can share one list. Not HTML. Not a replacement for validation.</div>
<pre><span class="t">public interface</span> NoteRepository <span class="t">extends</span> JpaRepository&lt;Note, Long&gt; {}</pre>
        <p>That empty interface is a Spring Data pattern: you inherit <code>save</code>, <code>findById</code>, <code>deleteById</code>. <code>Note</code> is the entity type. <code>Long</code> is the id type. You do not start here.</p>
        <p>Order that actually works:</p>
        <ol>
          <li>In-memory list in a repository class you wrote — proves GET/POST/PUT/DELETE</li>
          <li>Then plug a database behind the same methods</li>
        </ol>
        <p>If you start with JPA, you debug SQL, annotations, and HTTP at once. HTML already happened without a database. The page does not care whether <code>GET /api/notes</code> read a list or Postgres, as long as the JSON matches.</p>
        <div class="callout warn">GitHub Pages still cannot run this. The database lives next to Spring, not next to <code>index.html</code>.</div>
      `,
      exercise: {
        type: "choice",
        prompt: "Why isn’t a database the first Spring file you write?",
        options: [
          { id: "a", text: "Because JPA is deprecated", ok: false },
          {
            id: "b",
            text: "A list in memory proves the verbs. A database is storage on the same interface.",
            ok: true,
          },
          {
            id: "c",
            text: "HTML cannot work until a database is up",
            ok: false,
          },
        ],
        why: "Interface first. HTML already happened without a database.",
      },
    },
  ],
});
