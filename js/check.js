window.SKILL_CHECK = [
  {
    track: "swe",
    type: "choice",
    prompt:
      "A class with fields and a for-loop, but no input and no save. What is it?",
    options: [
      { id: "a", text: "An app — OOP is basically shipping", ok: false },
      {
        id: "b",
        text: "A piece. An app is input → rules → store → output",
        ok: true,
      },
      { id: "c", text: "A REST API", ok: false },
    ],
  },
  {
    track: "swe",
    type: "choice",
    prompt:
      "Before Spring / React / folders named controller, you should have…",
    options: [
      {
        id: "a",
        text: "A spec (who can do what) and the data fields",
        ok: true,
      },
      { id: "b", text: "Docker", ok: false },
      { id: "c", text: "A blank monorepo so you're 'set up'", ok: false },
    ],
  },
  {
    track: "swe",
    type: "choice",
    prompt: "Scanner + println in Main.java is which layer?",
    options: [
      { id: "a", text: "Database", ok: false },
      { id: "b", text: "UI / adapter (talking to a human)", ok: true },
      { id: "c", text: "Spring Boot", ok: false },
    ],
  },
  {
    track: "html",
    type: "html",
    prompt: "From memory: wrap Hello in a paragraph tag. Only that.",
    starter: "Hello",
    checks: [{ sel: "p", text: "Hello", msg: "Need <p>Hello</p>" }],
  },
  {
    track: "html",
    type: "choice",
    prompt: "Which one is a closing tag?",
    options: [
      { id: "a", text: "<p>", ok: false },
      { id: "b", text: "</p>", ok: true },
      { id: "c", text: "<p/>", ok: false },
    ],
  },
  {
    track: "css",
    type: "css",
    prompt: "Make all h1 elements red.",
    fixture: "<h1>Title</h1>",
    starter: "",
    checks: [
      { sel: "h1", style: "color", includes: "red", msg: "h1 { color: red; }" },
    ],
  },
  {
    track: "css",
    type: "choice",
    prompt: 'To style class="item" you write…',
    options: [
      { id: "a", text: "item { }", ok: false },
      { id: "b", text: ".item { }", ok: true },
      { id: "c", text: "#item { }", ok: false },
    ],
  },
  {
    track: "js",
    type: "js",
    prompt: "Write function add(a, b) that returns the sum.",
    starter: "function add(a, b) {\n  \n}",
    tests: [{ expr: "add(2, 3)", eq: 5, msg: "add(2,3) === 5" }],
  },
  {
    track: "js",
    type: "choice",
    prompt: 'document.getElementById("total") looks up an element by…',
    options: [
      { id: "a", text: "CSS class", ok: false },
      { id: "b", text: "id attribute", ok: true },
      { id: "c", text: "tag name", ok: false },
    ],
  },
  {
    track: "http",
    type: "choice",
    prompt: "The browser wants a list of expenses. Typical method?",
    options: [
      { id: "a", text: "GET", ok: true },
      { id: "b", text: "POST", ok: false },
      { id: "c", text: "DELETE", ok: false },
    ],
  },
  {
    track: "http",
    type: "choice",
    prompt: "HTTP 404 means…",
    options: [
      { id: "a", text: "Created", ok: false },
      { id: "b", text: "That URL / id does not exist", ok: true },
      {
        id: "c",
        text: "The server Java threw a NullPointerException",
        ok: false,
      },
    ],
  },
  {
    track: "http",
    type: "text",
    prompt:
      "Type valid JSON: description Coffee (string), amount 4.5 (number).",
    placeholder: "{ ... }",
    expected: '{ "description": "Coffee", "amount": 4.5 }',
    check: (raw) => {
      try {
        const v = JSON.parse(raw.replace(/'/g, '"'));
        if (String(v.description || "").toLowerCase() !== "coffee")
          return { ok: false, msg: 'description: "Coffee"' };
        if (!(Math.abs(Number(v.amount) - 4.5) < 0.001))
          return { ok: false, msg: "amount should be 4.5" };
        return { ok: true, msg: "JSON checks out." };
      } catch {
        return {
          ok: false,
          msg: "Invalid JSON (double quotes, no trailing comma). Or Skip.",
        };
      }
    },
  },
  {
    track: "crud",
    type: "choice",
    prompt: "Your CLI menu item 2, Remove Expense, is which CRUD letter?",
    options: [
      { id: "c", text: "Create", ok: false },
      { id: "r", text: "Read", ok: false },
      { id: "u", text: "Update", ok: false },
      { id: "d", text: "Delete", ok: true },
    ],
  },
  {
    track: "crud",
    type: "text",
    prompt:
      "REST: read expense id 3. Type METHOD then path, like GET /api/expenses/3",
    expected: "GET /api/expenses/3",
    check: (raw) => {
      const s = raw.trim().replace(/["'`]/g, "").replace(/\s+/g, " ");
      const ok = /^GET\s+(?:\/[\w.-]+)*\/expenses\/3\/?$/i.test(s);
      return ok
        ? { ok: true, msg: "Yes." }
        : { ok: false, msg: "Expected GET /api/expenses/3 — or Skip." };
    },
  },
  {
    track: "spring",
    type: "choice",
    prompt: "Which annotation maps a Java method to HTTP GET?",
    options: [
      { id: "a", text: "@GetMapping", ok: true },
      { id: "b", text: "@SpringBootApplication", ok: false },
      { id: "c", text: "@Override", ok: false },
    ],
  },
  {
    track: "pwa",
    type: "choice",
    prompt: "Can GitHub Pages run your Spring Boot server?",
    options: [
      { id: "a", text: "Yes, if it's a PWA", ok: false },
      {
        id: "b",
        text: "No. Pages only serves static files. Spring needs a JVM host.",
        ok: true,
      },
    ],
  },
];

window.LEARN_WORDS = {
  spec: {
    term: "Spec",
    def: "A short list of what a human can do. Not a framework. 'User can add an expense with description, amount, category.'",
  },
  "data-model": {
    term: "Data model",
    def: "The noun you store. Expense: description, amount, category, later an id. Class / JSON / DB row are costumes.",
  },
  "separation-of-concerns": {
    term: "Separation of concerns",
    def: "Don't mix UI, rules, and storage. Scanner vs totals vs the file. Spring says Controller / Service / Repository.",
  },
  state: {
    term: "State",
    def: "The data right now. Usually three copies: memory, screen, disk. Bugs = they disagree.",
  },
  validation: {
    term: "Validation",
    def: "Reject junk before it becomes state. amount > 0. That's 400, not 500.",
  },
  "edge-case": {
    term: "Edge case",
    def: "Boring situation you forgot: empty list, duplicate names, negative amounts.",
  },
  "vertical-slice": {
    term: "Vertical slice",
    def: "One feature through every layer (add works end to end). Not seven empty architecture files.",
  },
  debug: {
    term: "Debug loop",
    def: "Reproduce. Name which state is wrong. Make the failure small. Fix that. Don't rewrite the app.",
  },
  html: {
    term: "HTML",
    def: "Markup. Tags that label content for the browser. Not a programming language.",
  },
  tag: { term: "Tag", def: "<p> and </p>. The punctuation of HTML." },
  element: {
    term: "Element",
    def: "Opening tag + content + closing tag. One node in the page.",
  },
  attribute: {
    term: "Attribute",
    def: 'Extra data on a tag: href, id, class, type. name="value".',
  },
  css: {
    term: "CSS",
    def: "Rules for how HTML looks. Selector + declarations.",
  },
  selector: {
    term: "Selector",
    def: "Which elements a CSS rule hits: h1, .item, #total.",
  },
  "box-model": {
    term: "Box model",
    def: "content + padding + border + margin. Every element is a box.",
  },
  flexbox: {
    term: "Flexbox",
    def: "display:flex layout. Rows, columns, space-between. Expense row: name | amount.",
  },
  javascript: {
    term: "JavaScript",
    def: "Language the browser runs. Not Java. Makes the page change after load.",
  },
  dom: {
    term: "DOM",
    def: "The live HTML tree JS can read and edit. getElementById, createElement.",
  },
  event: {
    term: "Event",
    def: "Click, submit, input. Browser's replacement for a Scanner loop.",
  },
  localStorage: {
    term: "localStorage",
    def: "Per-origin key/value strings in the browser. Your saveToFile for a static site.",
  },
  http: {
    term: "HTTP",
    def: "Request/response protocol. Method + URL in, status + body out.",
  },
  request: {
    term: "Request",
    def: "What the client sends: method, path, headers, optional body.",
  },
  response: {
    term: "Response",
    def: "What the server sends: status, headers, optional body.",
  },
  json: {
    term: "JSON",
    def: "Text format for objects. API lingua franca. JSON.stringify / parse.",
  },
  api: {
    term: "API",
    def: "The contract: URLs, methods, JSON shapes. Not a specific library.",
  },
  rest: {
    term: "REST",
    def: "Convention: URL is the noun, HTTP method is the verb. GET /api/expenses.",
  },
  fetch: {
    term: "fetch",
    def: "JS function that sends HTTP. await fetch(url, { method, headers, body }).",
  },
  crud: {
    term: "CRUD",
    def: "Create Read Update Delete. Your CLI menu. Every database app.",
  },
  get: { term: "GET", def: "Read. No body. Listing expenses." },
  post: { term: "POST", def: "Create. Body is the new expense." },
  put: { term: "PUT", def: "Replace/update a thing at that URL." },
  delete: { term: "DELETE", def: "Remove. Your CLI option 2." },
  "status-code": {
    term: "Status code",
    def: "200 ok, 201 created, 204 empty ok, 400 bad input, 404 missing, 500 server bug.",
  },
  "spring-boot": {
    term: "Spring Boot",
    def: "Java toolkit that starts an HTTP server and maps URLs to methods. Not a language.",
  },
  controller: {
    term: "Controller",
    def: "Java class that is the HTTP menu. Main.java with annotations.",
  },
  service: {
    term: "Service",
    def: "Business rules. ExpenseTracker methods, without HTTP or storage details.",
  },
  repository: {
    term: "Repository",
    def: "Save and load. ArrayList, file, or database. Your saveToFile.",
  },
  requestbody: {
    term: "@RequestBody",
    def: "Spring: JSON body → Java object.",
  },
  pathvariable: {
    term: "@PathVariable",
    def: "Spring: the {id} in /expenses/{id} → method argument.",
  },
  cors: {
    term: "CORS",
    def: "Browser rule: github.io calling localhost needs the server to allow that origin.",
  },
  pwa: {
    term: "PWA",
    def: "Website that can install on phone or laptop and work offline. Manifest + service worker. This app.",
  },
  "service-worker": {
    term: "Service worker",
    def: "JS that sits between page and network and can cache files for offline.",
  },
  "github-pages": {
    term: "GitHub Pages",
    def: "Free static host. HTML/CSS/JS only. No Spring, no database.",
  },
  frontend: {
    term: "Frontend",
    def: "HTML + CSS + JS. What the browser runs. This PWA.",
  },
  backend: {
    term: "Backend",
    def: "The other process. Spring. Owns the shared ArrayList/database.",
  },
  async: {
    term: "async/await",
    def: "JS pause-this-function-until-the-network-returns. Forgetting await gives you a Promise, not the data.",
  },
  headers: {
    term: "Headers",
    def: "Metadata on a request/response. Content-Type: application/json means the body is JSON.",
  },
  git: {
    term: "Git",
    def: "Timeline of source files. commit = snapshot. push = send to GitHub. Pages deploys from that.",
  },
  database: {
    term: "Database",
    def: "A fancier saveToFile that many clients share. Same verbs as a repository.",
  },
};
