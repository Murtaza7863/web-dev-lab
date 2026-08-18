window.SKILL_CHECK = [
  {
    track: "start",
    type: "choice",
    prompt: "new Person() with fields name and age is…",
    options: [
      { id: "a", text: "HTML", ok: false },
      { id: "b", text: "An object: a bundle of fields", ok: true },
      { id: "c", text: "A browser", ok: false },
    ],
  },
  {
    track: "start",
    type: "choice",
    prompt: "sc.next() in Java is…",
    options: [
      { id: "a", text: "Paint (CSS)", ok: false },
      { id: "b", text: "Input — forcing the user to type", ok: true },
      { id: "c", text: "A tag", ok: false },
    ],
  },
  {
    track: "start",
    type: "choice",
    prompt: "Have you written HTML yet at the start of this course?",
    options: [
      { id: "a", text: "Yes — Java is HTML", ok: false },
      {
        id: "b",
        text: "No. HTML starts with the first tag lesson.",
        ok: true,
      },
      { id: "c", text: "Only if you used Spring", ok: false },
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
    track: "js",
    type: "choice",
    prompt: "Java and JavaScript are…",
    options: [
      { id: "a", text: "The same language with two names", ok: false },
      {
        id: "b",
        text: "Different languages. Same ideas: objects, input, if.",
        ok: true,
      },
      { id: "c", text: "Both required to show a paragraph", ok: false },
    ],
  },
  {
    track: "js",
    type: "js",
    prompt: 'Write isEmpty(s) that returns true only for "".',
    starter: "function isEmpty(s) {\n  \n}",
    expected: 'function isEmpty(s) {\n  return s === "";\n}',
    tests: [
      {
        expr: 'isEmpty("") === true && isEmpty("Ada") === false',
        eq: true,
        msg: 'true only for ""',
      },
    ],
  },
  {
    track: "git",
    type: "choice",
    prompt: "Git vs GitHub:",
    options: [
      { id: "a", text: "They are the same program", ok: false },
      {
        id: "b",
        text: "Git is the timeline on your computer. GitHub hosts a copy.",
        ok: true,
      },
      { id: "c", text: "GitHub is the language the browser runs", ok: false },
    ],
  },
  {
    track: "http",
    type: "choice",
    prompt: "GET /api/notes/99 and nothing has that id. Typical status?",
    options: [
      { id: "a", text: "200", ok: false },
      { id: "b", text: "401", ok: false },
      { id: "c", text: "404", ok: true },
    ],
  },
];

window.LEARN_WORDS = {
  spec: {
    term: "Spec",
    def: "A short list of what a human can do. Not a framework. 'User can add a note with a title and text.'",
  },
  "data-model": {
    term: "Data model",
    def: "The noun you store. Example: Note with title and text, later an id. Class / JSON / DB row are the same noun.",
  },
  "separation-of-concerns": {
    term: "Separation of concerns",
    def: "Don't mix UI, rules, and storage. Boxes vs if vs localStorage. Spring says Controller / Service / Repository.",
  },
  state: {
    term: "State",
    def: "The data right now. Usually three copies: memory, screen, disk. Bugs = they disagree.",
  },
  validation: {
    term: "Validation",
    def: 'Reject junk before you store it. if (name === "") return. Same idea in Java and JavaScript.',
  },
  "edge-case": {
    term: "Edge case",
    def: "Boring situation you forgot: empty list, two notes with the same title, a missing id.",
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
    def: "Paint. HTML is the words. CSS is color, size, spacing. Cannot run if.",
  },
  selector: {
    term: "Selector",
    def: "Which elements a CSS rule hits: h1, .card, #hello.",
  },
  "box-model": {
    term: "Box model",
    def: "content + padding + border + margin. Every element is a box.",
  },
  flexbox: {
    term: "Flexbox",
    def: "display:flex layout. Rows, columns, space-between.",
  },
  javascript: {
    term: "JavaScript",
    def: "A different language the browser runs. Not Java. Same ideas: objects, reading input, if.",
  },
  dom: {
    term: "DOM",
    def: "The live page as objects JS can find. getElementById is “give me that box,” like using a variable name.",
  },
  event: {
    term: "Event",
    def: "Click, submit, input. How the browser waits, instead of a Scanner loop.",
  },
  localStorage: {
    term: "localStorage",
    def: "Per-origin key/value strings in the browser. Survives refresh on this device. Not a shared server.",
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
    def: "Convention: URL is the noun, HTTP method is the verb. GET /api/notes.",
  },
  fetch: {
    term: "fetch",
    def: "JS function that sends HTTP. await fetch(url, { method, headers, body }).",
  },
  crud: {
    term: "CRUD",
    def: "Create Read Update Delete. Add, list, change, remove.",
  },
  get: { term: "GET", def: "Read. No body. Listing notes." },
  post: { term: "POST", def: "Create. Body is the new note." },
  put: { term: "PUT", def: "Replace/update a thing at that URL." },
  delete: { term: "DELETE", def: "Remove a row by id." },
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
    def: "Java class that is the HTTP menu. if (choice == 1) becomes a mapped method.",
  },
  service: {
    term: "Service",
    def: "Business rules. ifs, without HTTP or storage details.",
  },
  repository: {
    term: "Repository",
    def: "Save and load. ArrayList, file, or database.",
  },
  requestbody: {
    term: "@RequestBody",
    def: "Spring: JSON body → Java object.",
  },
  pathvariable: {
    term: "@PathVariable",
    def: "Spring: the {id} in /notes/{id} → method argument.",
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
    def: "A timeline of source files on your computer. commit = snapshot. Not GitHub (that is a host).",
  },
  commit: {
    term: "commit",
    def: "One snapshot on the Git timeline, with a message. Local until you push.",
  },
  push: {
    term: "push",
    def: "git push: send commits you already made to GitHub (usually origin).",
  },
  github: {
    term: "GitHub",
    def: "A website that hosts Git timelines. git push sends snapshots there. Pages reads GitHub, not Cursor.",
  },
  clone: {
    term: "clone",
    def: "git clone: copy a repo (files + history) to a new folder once. After that, pull to update.",
  },
  branch: {
    term: "branch",
    def: "A named line of commits. main is the default. Other names let you commit without moving main yet.",
  },
  "pull-request": {
    term: "Pull request",
    def: "A GitHub request to merge a branch into another (usually main) after a human looks. Not the same as git pull.",
  },
  url: {
    term: "URL",
    def: "The full address: scheme, host, path, optional query. The HTTP method is not inside the URL.",
  },
  query: {
    term: "Query string",
    def: "The ?a=1&b=2 tail on a URL. Extra filters. GET with a query is still GET.",
  },
  database: {
    term: "Database",
    def: "Storage many clients can share. Same verbs as a repository: save, find, delete.",
  },
};
