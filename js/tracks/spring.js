window.LEARN_TRACKS = window.LEARN_TRACKS || [];
window.LEARN_TRACKS.push({
  id: "spring",
  title: "Spring Boot",
  quest: "The Other Program",
  blurb:
    "Java that waits for the page to call it. Same expense rules as your CLI. Do this last-ish.",
  youKnow:
    "Expense.java can stay. Main.java's menu becomes a Controller. ArrayList + file becomes a Repository.",
  lessons: [
    {
      id: "spring-1",
      title: "What Spring Boot actually is",
      words: ["spring-boot"],
      body: `
        <p><strong>Spring</strong> is a huge Java toolkit. <strong>Spring Boot</strong> is the "start a server with almost no XML" edition people mean in job posts.</p>
        <p>What it does for you:</p>
        <ol>
          <li>Starts an HTTP server (embedded Tomcat)</li>
          <li>Maps URLs + methods to Java methods</li>
          <li>Turns JSON ↔ your classes</li>
          <li>Wires objects together (controllers, services, repos)</li>
        </ol>
        <p>It is not a language. You still write Java. Boot is the host, like the browser is JS's host.</p>
        <div class="callout warn">GitHub Pages cannot run Spring. Pages only serves static files (HTML/CSS/JS). You run Boot on your machine, or on a host like Railway/Render/Fly. This course fakes the API in the browser so the frontend lessons still work offline.</div>
        <div class="callout java">CLI <code>while(true)</code> + menu is a server for a human typing. Boot is a server for a browser sending HTTP.</div>
      `,
      exercise: {
        type: "choice",
        prompt: "Where can this PWA's Spring examples actually execute?",
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
        why: "Pages = static files. Spring = a running Java process. The mock API here is JavaScript pretending to be that process.",
      },
    },
    {
      id: "spring-2",
      title: "Controller = your Main menu",
      words: ["controller"],
      body: `
        <p>A <strong>controller</strong> is a class whose methods are HTTP endpoints. That's the menu, with URLs instead of <code>if (choice == 1)</code>.</p>
<pre><span class="p">@RestController</span>
<span class="p">@RequestMapping</span>(<span class="x">"/api/expenses"</span>)
<span class="t">public class</span> ExpenseController {

  <span class="p">@GetMapping</span>
  <span class="t">public</span> List&lt;Expense&gt; all() { <span class="c">/* GET /api/expenses */</span> }

  <span class="p">@PostMapping</span>
  <span class="t">public</span> Expense create(<span class="p">@RequestBody</span> Expense e) { <span class="c">/* POST */</span> }
}</pre>
        <ul>
          <li><code>@RestController</code> — this class serves JSON</li>
          <li><code>@RequestMapping("/api/expenses")</code> — prefix for every method</li>
          <li><code>@GetMapping</code> — GET on that prefix</li>
          <li><code>@RequestBody</code> — JSON body → <code>Expense</code></li>
        </ul>
        <p>Annotations are extra labels on code. Spring reads them at startup and builds the route table.</p>
      `,
      exercise: {
        type: "java",
        prompt:
          "Write a RestController mapped to /api/expenses with a GetMapping method named all that returns List<Expense>. Minimal compiling-shaped Java is enough.",
        starter: "@RestController\n",
        expected:
          '@RestController\n@RequestMapping("/api/expenses")\nclass C {\n  @GetMapping\n  List<Expense> all() { return null; }\n}',
        must: [
          { re: /@RestController/, msg: "Need @RestController" },
          {
            re: /@RequestMapping\s*\([^)]*\/api\/expenses/,
            msg: '@RequestMapping("/api/expenses")',
          },
          { re: /@GetMapping/, msg: "Need @GetMapping on the list method" },
          { re: /List\s*<\s*Expense\s*>/, msg: "Return type List<Expense>" },
        ],
      },
    },
    {
      id: "spring-3",
      title: "GET one: PathVariable",
      words: ["pathvariable"],
      body: `
        <p>The <code>3</code> in <code>/api/expenses/3</code> is a path variable.</p>
<pre><span class="p">@GetMapping</span>(<span class="x">"/{id}"</span>)
<span class="t">public</span> Expense one(<span class="p">@PathVariable</span> <span class="t">long</span> id) {
  <span class="t">return</span> service.find(id);
}</pre>
        <p><code>{id}</code> in the mapping and the method parameter name match. Spring converts the text <code>"3"</code> to <code>long</code>.</p>
        <p>If missing: throw an exception Spring turns into <code>404</code> (or return <code>ResponseEntity.notFound()</code>).</p>
        <div class="callout java">This is better than your CLI delete-by-description. Ids don't collide. Add an <code>id</code> field to <code>Expense</code> when you go web.</div>
      `,
      exercise: {
        type: "java",
        prompt:
          'Add a method getOne with @GetMapping("/{id}") and a @PathVariable long id, returning Expense.',
        starter: '@GetMapping("/{id}")\n',
        expected:
          '@GetMapping("/{id}")\nExpense getOne(@PathVariable long id) { return null; }',
        must: [
          {
            re: /@GetMapping\s*\([^)]*\{id\}/,
            msg: '@GetMapping("/{id}")',
          },
          { re: /@PathVariable/, msg: "Need @PathVariable" },
          { re: /Expense\s+\w+\s*\(/, msg: "Method should return Expense" },
        ],
      },
    },
    {
      id: "spring-4",
      title: "POST with RequestBody",
      words: ["requestbody", "post"],
      body: `
        <p>Create: client sends JSON, Spring builds an <code>Expense</code>, you save it, return it with an id. Status <code>201</code> is polite.</p>
<pre><span class="p">@PostMapping</span>
<span class="t">public</span> ResponseEntity&lt;Expense&gt; create(<span class="p">@RequestBody</span> Expense in) {
  Expense saved = service.add(in);
  <span class="t">return</span> ResponseEntity.status(201).body(saved);
}</pre>
        <p>Field names in JSON must match the Java properties (<code>description</code>, <code>amount</code>, <code>category</code>) — same as your class fields with getters/setters.</p>
        <p>Validation (amount &gt; 0) belongs here or in the service — you already did it in <code>Main</code> before <code>addExpense</code>.</p>
      `,
      exercise: {
        type: "java",
        prompt:
          "Write a PostMapping method create that takes @RequestBody Expense in and returns Expense.",
        starter: "@PostMapping\n",
        expected:
          "@PostMapping\nExpense create(@RequestBody Expense in) { return in; }",
        must: [
          { re: /@PostMapping/, msg: "@PostMapping" },
          { re: /@RequestBody/, msg: "@RequestBody Expense" },
          {
            re: /Expense\s+\w+\s*\(/,
            msg: "A method that returns Expense",
          },
        ],
      },
    },
    {
      id: "spring-5",
      title: "Service and Repository",
      words: ["service", "repository"],
      body: `
        <p>Don't dump ArrayList logic in the controller. Three layers — this is the "Spring-shaped" version of your two classes:</p>
        <table class="plain">
          <tr><td><strong>Controller</strong></td><td>HTTP in/out. Like <code>Main</code> reading the menu.</td></tr>
          <tr><td><strong>Service</strong></td><td>Rules: totals, reject negative amounts. Like <code>ExpenseTracker</code> methods.</td></tr>
          <tr><td><strong>Repository</strong></td><td>Save/load. Like <code>saveToFile</code> / the ArrayList.</td></tr>
        </table>
<pre><span class="p">@Service</span>
<span class="t">public class</span> ExpenseService {
  <span class="t">private final</span> ExpenseRepository repo;
  <span class="t">public</span> ExpenseService(ExpenseRepository repo) { <span class="t">this</span>.repo = repo; }
  <span class="t">public</span> Expense add(Expense e) {
    <span class="t">if</span> (e.getAmount() &lt;= 0) <span class="t">throw new</span> IllegalArgumentException();
    <span class="t">return</span> repo.save(e);
  }
}</pre>
        <p>Spring <strong>injects</strong> the repo into the service constructor. You don't <code>new</code> it in the controller. That's "dependency injection" — another buzzword that just means "pass collaborators in."</p>
        <p>A real repo often uses a database (JPA + <code>JpaRepository</code>). An in-memory <code>ArrayList</code> is a valid first repo. Your file-backed tracker is already a repository.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "Where should ArrayList&lt;Expense&gt; live in a Spring app?",
        options: [
          {
            id: "a",
            text: "ExpenseController — so the HTTP class owns the data",
            ok: false,
          },
          {
            id: "b",
            text: "ExpenseRepository — storage. Controller talks to Service talks to Repo.",
            ok: true,
          },
          { id: "c", text: "static field on Expense", ok: false },
        ],
        why: "Controller HTTP, service rules, repository storage. Your ExpenseTracker mixed service+repo; splitting them is the Spring habit.",
      },
    },
    {
      id: "spring-6",
      title: "CORS, and why Pages + Boot is two origins",
      words: ["cors"],
      body: `
        <p>If the PWA is at <code>https://you.github.io/expense-tracker/</code> and Spring is at <code>http://localhost:8080</code>, the browser treats those as different <strong>origins</strong>.</p>
        <p><strong>CORS</strong> is the browser asking the server "is this other site allowed to call you?" Spring must answer yes:</p>
<pre><span class="p">@CrossOrigin</span>(origins = <span class="x">"https://you.github.io"</span>)
<span class="p">@RestController</span>
<span class="c">// or a global WebMvc config</span></pre>
        <p>This mock API lives in the same page, so CORS never fires. That's why Lab works on Pages without a server.</p>
        <p>When you later run real Boot locally: frontend <code>fetch("http://localhost:8080/api/expenses")</code>, and enable CORS (or proxy).</p>
        <div class="callout tip">Next practical step after this course: copy <code>Expense.java</code>, add <code>id</code>, write <code>ExpenseController</code> + in-memory repo, run on 8080, point the Lab's fetch at it. Same UI, real Java.</div>
      `,
      exercise: {
        type: "choice",
        prompt:
          "The browser blocks a fetch from github.io to localhost:8080 until the server sends CORS headers. That rule is enforced by…",
        options: [
          { id: "a", text: "GitHub", ok: false },
          {
            id: "b",
            text: "The browser (same-origin policy / CORS)",
            ok: true,
          },
          { id: "c", text: "Spring's compiler", ok: false },
        ],
        why: "curl would succeed. The browser is the one being strict. @CrossOrigin is for the browser, not for Java.",
      },
    },
    {
      id: "spring-7",
      title: "Boot's main, and one request walking the layers",
      words: ["spring-boot", "controller", "service", "repository"],
      body: `
        <p>The process starts like your CLI — a <code>main</code> — but Boot takes over and listens on a port (8080):</p>
<pre><span class="p">@SpringBootApplication</span>
<span class="t">public class</span> ExpenseApp {
  <span class="t">public static void</span> main(String[] args) {
    SpringApplication.run(ExpenseApp.class, args);
  }
}</pre>
        <p>Then one POST walks your three piles:</p>
        <ol>
          <li>Tomcat receives HTTP</li>
          <li><strong>Controller</strong> — JSON → <code>Expense</code> (<code>@RequestBody</code>)</li>
          <li><strong>Service</strong> — amount &gt; 0? then save</li>
          <li><strong>Repository</strong> — ArrayList or database</li>
          <li>Controller returns JSON + 201</li>
          <li>Browser <code>await res.json()</code> → redraw the list</li>
        </ol>
        <p>That list is the whole backend. If you can narrate it, you can find a bug in it.</p>
      `,
      exercise: {
        type: "java",
        prompt:
          "Write a class ExpenseApp with @SpringBootApplication and a main that calls SpringApplication.run(ExpenseApp.class, args).",
        starter: "@SpringBootApplication\n",
        expected:
          "@SpringBootApplication\npublic class ExpenseApp {\n  public static void main(String[] args) {\n    SpringApplication.run(ExpenseApp.class, args);\n  }\n}",
        must: [
          { re: /@SpringBootApplication/, msg: "@SpringBootApplication" },
          {
            re: /SpringApplication\.run\s*\(\s*\w+\.class/,
            msg: "SpringApplication.run(ExpenseApp.class, args)",
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
        <p>You already fetch DELETE and PUT from JS. The Java side is the matching annotations:</p>
<pre><span class="p">@PutMapping</span>(<span class="x">"/{id}"</span>)
<span class="t">public</span> Expense update(<span class="p">@PathVariable</span> <span class="t">long</span> id, <span class="p">@RequestBody</span> Expense in) {
  <span class="t">return</span> service.update(id, in);
}

<span class="p">@DeleteMapping</span>(<span class="x">"/{id}"</span>)
<span class="t">public</span> ResponseEntity&lt;Void&gt; remove(<span class="p">@PathVariable</span> <span class="t">long</span> id) {
  service.delete(id);
  <span class="t">return</span> ResponseEntity.noContent().build();  <span class="c">// 204</span>
}</pre>
        <p>Now the Lab's four buttons have a real Java home. Same URLs as the mock.</p>
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
      title: "A database is just a fancier file",
      words: ["repository", "database"],
      body: `
        <p>Job posts say PostgreSQL, MySQL, Mongo. For this app they all mean: the repository talks to a process that stores rows, not a <code>.txt</code>.</p>
        <p>Spring Data JPA: you write an interface, Boot generates <code>save</code> / <code>findById</code>:</p>
<pre><span class="t">public interface</span> ExpenseRepository <span class="t">extends</span> JpaRepository&lt;Expense, Long&gt; {}</pre>
        <p>Same verbs as your ArrayList. Different durability and sharing (many phones, one database).</p>
        <p>You do <em>not</em> start here. In-memory repo first. Database when one laptop's file isn't enough — the spec you wrote on The Map.</p>
        <div class="callout warn">GitHub Pages still cannot run this. The database lives next to Spring, not next to <code>index.html</code>.</div>
      `,
      exercise: {
        type: "choice",
        prompt: "Why isn't a database the first Spring file you write?",
        options: [
          { id: "a", text: "Because JPA is deprecated", ok: false },
          {
            id: "b",
            text: "An ArrayList repo proves the verbs. Database is a storage costume on the same interface.",
            ok: true,
          },
          { id: "c", text: "HTML cannot work until Postgres is up", ok: false },
        ],
        why: "Interface first. Postgres is saveToFile with extra ops.",
      },
    },
  ],
});
