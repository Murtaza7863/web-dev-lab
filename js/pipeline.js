window.PIPELINE = [
  {
    id: "swe",
    quest: "The Map",
    layer: "Plan",
    because:
      "Name the machine first: spec, noun, verbs, layers, state. Costumes come after.",
    next: "The browser needs a document. HTML is that document.",
  },
  {
    id: "html",
    quest: "The Page",
    layer: "Structure",
    because:
      "Output and input for a human: title, form, list. No look, no clicks yet.",
    next: "Same tags, readable. CSS changes how boxes are drawn.",
  },
  {
    id: "css",
    quest: "The Skin",
    layer: "Look",
    because: "Color, space, layout. The HTML does not change.",
    next: "The button still does nothing. JavaScript is the hands.",
  },
  {
    id: "js",
    quest: "The Hands",
    layer: "Behavior",
    because:
      "Clicks change memory and the screen. Still one computer — this browser.",
    next: "Shared data needs a second program. That's HTTP.",
  },
  {
    id: "http",
    quest: "The Call",
    layer: "Talk",
    because: "Method + URL + JSON in, status + JSON out. Two processes.",
    next: "Those calls are just the four verbs you already wrote in the CLI.",
  },
  {
    id: "crud",
    quest: "The Dungeon",
    layer: "Verbs",
    because:
      "Create Read Update Delete. REST is nouns in the URL, verbs in the method.",
    next: "A real server is Java waiting for those URLs. Spring Boot.",
  },
  {
    id: "spring",
    quest: "The Other Process",
    layer: "Server",
    because:
      "Controller / Service / Repository = Main / rules / file. HTTP instead of Scanner.",
    next: "Ship the frontend as files. Spring still needs a JVM host.",
  },
  {
    id: "pwa",
    quest: "The Install",
    layer: "Ship",
    because:
      "Pages = static client. Manifest + service worker = installable. Git is how it gets there.",
    next: "You can explain a click from button to database without a buzzword fog.",
  },
];
