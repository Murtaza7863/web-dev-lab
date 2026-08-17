window.PIPELINE = [
  {
    id: "start",
    quest: "The Window",
    layer: "Start",
    because:
      "A browser shows files. You already code in a terminal. That's the whole picture for now.",
    next: "Make one sentence appear. That's HTML.",
  },
  {
    id: "html",
    quest: "The Page",
    layer: "Page",
    because: "Tags are labels so the browser knows what each bit of text is.",
    next: "Then we only change how it looks. That's CSS.",
  },
  {
    id: "css",
    quest: "The Look",
    layer: "Look",
    because: "Color and spacing. The words stay the same.",
    next: "Then a button that does something. That's JavaScript.",
  },
  {
    id: "js",
    quest: "The Click",
    layer: "Click",
    because:
      "JavaScript is a language the browser runs. Not Java. Makes Add actually add.",
    next: "Then we name the jobs your CLI already does.",
  },
  {
    id: "swe",
    quest: "The Pieces",
    layer: "Pieces",
    because:
      "Input, rules, memory, screen. You already built that in Java. Now you can point at it.",
    next: "Sometimes the page asks another program for data.",
  },
  {
    id: "http",
    quest: "The Call",
    layer: "Talk",
    because:
      "Two programs sending messages. We'll name the message format when you send one.",
    next: "Those messages are just add / list / change / delete.",
  },
  {
    id: "crud",
    quest: "The Four Jobs",
    layer: "Jobs",
    because: "Add, list, change, delete — your CLI menu, as messages.",
    next: "Java can sit on the other end of those messages. That's later.",
  },
  {
    id: "spring",
    quest: "The Other Program",
    layer: "Java",
    because:
      "Spring Boot = Java that waits for the page to call it. Same rules as your CLI.",
    next: "Put the page on the internet.",
  },
  {
    id: "pwa",
    quest: "The Install",
    layer: "Ship",
    because:
      "This course is files on the internet. You can install it like an app.",
    next: "You started with a tag. That's the point.",
  },
];
