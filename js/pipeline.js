window.PIPELINE = [
  {
    id: "start",
    quest: "Before HTML",
    layer: "You",
    because:
      "You can write Java. You have not written a webpage. This chapter only names that gap.",
    next: "HTML: labels around words, so a browser can draw them.",
  },
  {
    id: "html",
    quest: "HTML",
    layer: "Page",
    because:
      "A page is a text file of tags. You have not done this yet. Start with one tag.",
    next: "Optional paint. Not logic.",
  },
  {
    id: "css",
    quest: "CSS",
    layer: "Paint",
    because: "Color and spacing. if-statements do not live here.",
    next: "JavaScript: read a box, run an if, change the page.",
  },
  {
    id: "js",
    quest: "JavaScript",
    layer: "Click",
    because:
      "A second language. Same ideas you know: objects, input, if. Different syntax, runs in the browser.",
    next: "Git: snapshot these files. Then name the jobs, then HTTP.",
  },
  {
    id: "git",
    quest: "Git and GitHub",
    layer: "Save",
    because:
      "A timeline of files on your computer, then GitHub as a host. Enough to read what an agent committed and pushed.",
    next: "Name the jobs you built. Then two programs talk.",
  },
  {
    id: "swe",
    quest: "The jobs",
    layer: "Jobs",
    because:
      "You can draw a page, handle a click, and read a commit. An app is still: input, rules, remember, show.",
    next: "HTTP: a method call becomes a message.",
  },
  {
    id: "http",
    quest: "HTTP and APIs",
    layer: "Talk",
    because:
      "A method call in one program becomes a message to another. Request, reply, JSON, fetch. This part matters.",
    next: "Those messages are still add / list / change / delete.",
  },
  {
    id: "crud",
    quest: "Add list change delete",
    layer: "Verbs",
    because: "Four verbs on a list. Nickname: CRUD. Same API menu, in fetch.",
    next: "Java can wait for those messages. Optional.",
  },
  {
    id: "spring",
    quest: "Java that waits",
    layer: "Server",
    because: "Same objects and ifs. The menu becomes a listener on a URL.",
    next: "Put the page on the internet.",
  },
  {
    id: "pwa",
    quest: "On the internet",
    layer: "Ship",
    because: "These files, hosted. You already know push. Install is extra.",
    next: "You started with no HTML. That was the point.",
  },
];
