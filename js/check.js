window.SKILL_CHECK = [
  {
    track: "start",
    type: "choice",
    prompt: "This course is being shown by…",
    options: [
      { id: "a", text: "The Java terminal", ok: false },
      { id: "b", text: "A browser (Chrome, Safari, Edge…)", ok: true },
      { id: "c", text: "Spring Boot", ok: false },
    ],
  },
  {
    track: "start",
    type: "choice",
    prompt: "To put words on a website, the smallest true answer is…",
    options: [
      { id: "a", text: "A database", ok: false },
      { id: "b", text: "A text file the browser can read (HTML)", ok: true },
      { id: "c", text: "Docker", ok: false },
    ],
  },
  {
    track: "html",
    type: "html",
    prompt: "Wrap Hello in a paragraph tag. Only that.",
    starter: "Hello",
    expected: "<p>Hello</p>",
    checks: [{ sel: "p", text: "Hello", msg: "Need <p>Hello</p>" }],
  },
  {
    track: "html",
    type: "choice",
    prompt: "Which one means “end of paragraph”?",
    options: [
      { id: "a", text: "<p>", ok: false },
      { id: "b", text: "</p>", ok: true },
      { id: "c", text: "<p/>", ok: false },
    ],
  },
  {
    track: "css",
    type: "css",
    prompt: "Make all h1 elements red. (color: red is fine.)",
    fixture: "<h1>Title</h1>",
    starter: "h1 {\n  \n}",
    checks: [
      { sel: "h1", style: "color", includes: "red", msg: "h1 { color: red; }" },
    ],
  },
  {
    track: "js",
    type: "choice",
    prompt: "Java and JavaScript are…",
    options: [
      { id: "a", text: "The same language with two names", ok: false },
      {
        id: "b",
        text: "Different languages. The similar name is an accident.",
        ok: true,
      },
      { id: "c", text: "Both required to show a paragraph", ok: false },
    ],
  },
  {
    track: "js",
    type: "js",
    prompt: "Write function add(a, b) that returns the sum.",
    starter: "function add(a, b) {\n  \n}",
    tests: [{ expr: "add(2, 3)", eq: 5, msg: "add(2,3) === 5" }],
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
  browser: {
    term: "Browser",
    def: "Chrome, Safari, Edge. The program that shows websites. You're in one now.",
  },
  website: {
    term: "Website",
    def: "One or more pages (HTML files) a browser can open. This course is a website.",
  },
  html: {
    term: "HTML",
    def: "A text file of labels around words, so the browser knows what to draw. Not Java. No compile.",
  },
  tag: {
    term: "Tag",
    def: "<p> means start paragraph. </p> means stop. The slash means end.",
  },
  element: {
    term: "Element",
    def: "The whole sandwich: <p>Hello</p>. Opening + words + closing.",
  },
  attribute: {
    term: "Attribute",
    def: 'Extra data on a tag: href, id, class, type. name="value".',
  },
  css: {
    term: "CSS",
    def: "Paint rules. HTML is the words. CSS is color, size, spacing.",
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
    def: "A different language the browser runs. Not Java. The similar name is an accident.",
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
    def: "The envelope two programs use: a question and an answer. “A request and a reply” is enough.",
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
