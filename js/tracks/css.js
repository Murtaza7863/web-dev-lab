window.LEARN_TRACKS = window.LEARN_TRACKS || [];
window.LEARN_TRACKS.push({
  id: "css",
  title: "CSS",
  quest: "CSS",
  blurb:
    "You already have HTML. CSS only changes how those tags look. It cannot run if.",
  youKnow:
    "You can write tags. This chapter is paint: color, space, rows. Not logic.",
  lessons: [
    {
      id: "css-1",
      title: "Paint, not if",
      words: ["css", "selector"],
      body: `
        <p>You just learned HTML. The page exists: headings, paragraphs, maybe a box. It may look plain. <strong>CSS</strong> is a second language of instructions that only change <em>how those tags look</em>.</p>
        <div class="callout word"><strong>New word — CSS.</strong> Cascading Style Sheets — a fussy name for paint instructions. HTML = what is on the page. CSS = color, size, spacing. Not Java. Not JavaScript. CSS cannot create an object and cannot run <code>if (age &lt; 0)</code>.</div>
        <p>A CSS instruction has two parts:</p>
<pre><span class="t">h1</span> <span class="x">{</span>
  <span class="a">color</span><span class="x">: red;</span>
<span class="x">}</span></pre>
        <ul>
          <li><code>h1</code> — <strong>selector</strong>: which elements this applies to. Here, every <code>&lt;h1&gt;</code> on the page.</li>
          <li><code>{ }</code> — a block of declarations, like braces in Java.</li>
          <li><code>color</code> — the <strong>property</strong> (what to change)</li>
          <li><code>red</code> — the <strong>value</strong></li>
          <li>The colon <code>:</code> sits between property and value. The semicolon <code>;</code> ends the line. Forgetting the semicolon is a common bug.</li>
        </ul>
        <div class="callout word"><strong>New word — selector.</strong> The part before the <code>{</code>. It answers “which tags?”</div>
        <p>In a real project this text lives in <code>style.css</code>, and HTML attaches it with <code>&lt;link rel="stylesheet" href="style.css"&gt;</code> in <code>head</code> (you practiced that). In this course you type CSS in the exercise box; the site applies it to a tiny preview.</p>
        <p>This rule does not change a <code>&lt;p&gt;</code>. Only <code>h1</code>. That is the point of a selector.</p>
      `,
      exercise: {
        type: "css",
        prompt: "Make every h1 red (color: red is fine).",
        fixture: "<h1>Hello</h1><p>Not a heading</p>",
        starter: "h1 {\n  \n}",
        expected: "h1 {\n  color: red;\n}",
        checks: [
          {
            sel: "h1",
            style: "color",
            includes: "red",
            msg: "h1 color should be red",
          },
        ],
      },
    },
    {
      id: "css-2",
      title: "Which tags: element, class, id",
      words: ["selector"],
      body: `
        <p>You need more than “every <code>h1</code>.” Sometimes you want every paragraph. Sometimes only some paragraphs. Sometimes exactly one box. CSS has three everyday selectors for that:</p>
<pre><span class="t">p</span> <span class="x">{ }</span>          <span class="c">/* every &lt;p&gt; — element selector */</span>
<span class="t">.card</span> <span class="x">{ }</span>      <span class="c">/* every tag with class="card" — the dot is required */</span>
<span class="t">#hello</span> <span class="x">{ }</span>     <span class="c">/* the one tag with id="hello" — the hash is required */</span></pre>
        <p><strong>Element selector</strong> — just the tag name. <code>p</code> hits all paragraphs. Broad.</p>
        <p><strong>Class selector</strong> — a dot plus the class name. In HTML you wrote <code>class="card"</code>. In CSS you write <code>.card</code>. Many elements may share a class, so you can paint a group at once.</p>
        <p><strong>Id selector</strong> — a hash <code>#</code> plus the id. In HTML, <code>id="hello"</code>. In CSS, <code>#hello</code>. One per page. Use it when you mean that exact box.</p>
        <p>That is why HTML has both <code>class</code> and <code>id</code>: class = many, id = one.</p>
        <div class="callout warn">The usual bug: writing <code>card { }</code> with no dot. The browser looks for a tag named <code>&lt;card&gt;</code>, which does not exist. You meant <code>.card</code>. Same for id: <code>hello { }</code> is not <code>#hello</code>.</div>
        <p>You can write two rules in one file, one after another. They both apply.</p>
      `,
      exercise: {
        type: "css",
        prompt:
          "Make .name bold (font-weight: bold) and #hello the color navy.",
        fixture: '<p><span class="name">Ada</span></p><p id="hello">Hi</p>',
        starter: ".name {\n\n}\n#hello {\n\n}",
        expected:
          ".name {\n  font-weight: bold;\n}\n#hello {\n  color: navy;\n}",
        checks: [
          {
            sel: ".name",
            style: "font-weight",
            includes: "bold",
            msg: ".name should be bold (font-weight)",
          },
          {
            sel: "#hello",
            style: "color",
            includes: "navy",
            msg: "#hello color should be navy",
          },
        ],
      },
    },
    {
      id: "css-3",
      title: "Every tag is a box",
      words: ["box-model"],
      body: `
        <p>The browser draws every element as a rectangle. That rectangle has layers, from the inside out:</p>
        <ol>
          <li><strong>content</strong> — the text (or image) itself</li>
          <li><strong>padding</strong> — empty space <em>inside</em> the border, around the content. Makes a card feel less cramped.</li>
          <li><strong>border</strong> — the visible edge. Width, style (solid, dashed), color.</li>
          <li><strong>margin</strong> — empty space <em>outside</em> the border, between this box and neighbors.</li>
        </ol>
        <div class="callout word"><strong>New word — box model.</strong> Content + padding + border + margin. If a layout looks “too tight” or “too far from the next thing,” you are usually missing padding or margin.</div>
<pre><span class="t">.card</span> <span class="x">{</span>
  <span class="a">padding</span><span class="x">: 16px;</span>
  <span class="a">border</span><span class="x">: 2px solid black;</span>
<span class="x">}</span></pre>
        <p><code>16px</code> means 16 pixels — a pixel is one dot on the screen. <code>border: 2px solid black</code> is a shortcut: thickness, style, color in one line.</p>
        <p>Padding is “space inside the card.” Margin is “space between cards.” Mixing them up is normal at first. Change one, look at the preview, then the other.</p>
      `,
      exercise: {
        type: "css",
        prompt: "Give .card 16px padding and a 2px solid black border.",
        fixture: '<div class="card">Hi</div>',
        starter: ".card {\n\n}",
        expected: ".card {\n  padding: 16px;\n  border: 2px solid black;\n}",
        checks: [
          {
            sel: ".card",
            style: "padding-top",
            includes: "16",
            msg: "padding should be 16px",
          },
          {
            sel: ".card",
            style: "border-top-width",
            includes: "2",
            msg: "border should be 2px",
          },
        ],
      },
    },
    {
      id: "css-4",
      title: "A row: flexbox",
      words: ["flexbox"],
      body: `
        <p>By default, block boxes stack vertically (a heading, then a paragraph, then another). Often you want two things on the <em>same row</em>: a name on the left, a short word on the right.</p>
        <p><strong>Flexbox</strong> is the CSS tool for “line these children up in a row or a column.” You turn it on with <code>display: flex</code> on the <em>parent</em>.</p>
<pre><span class="t">.row</span> <span class="x">{</span>
  <span class="a">display</span><span class="x">: flex;</span>
  <span class="a">justify-content</span><span class="x">: space-between;</span>
  <span class="a">gap</span><span class="x">: 8px;</span>
<span class="x">}</span></pre>
        <ul>
          <li><code>display: flex</code> — this element’s children become a flex row (the default direction is horizontal).</li>
          <li><code>justify-content</code> — how to spread them along that row. <code>space-between</code> means: first child at the start, last child at the end, space in the middle.</li>
          <li><code>gap</code> — minimum space between children.</li>
        </ul>
        <p>HTML stays simple: a parent with class <code>row</code>, two <code>span</code>s inside. CSS does the lining up. You do not need extra tags for “left” and “right.”</p>
        <div class="callout word"><strong>New word — flexbox.</strong> <code>display: flex</code> layout. Rows, columns, space-between. The parent is the flex container; the tags inside are flex items.</div>
      `,
      exercise: {
        type: "css",
        prompt: "Make .row a flex container with space-between.",
        fixture: '<div class="row"><span>Ada</span><span>Hi</span></div>',
        starter: ".row {\n\n}",
        expected:
          ".row {\n  display: flex;\n  justify-content: space-between;\n}",
        checks: [
          {
            sel: ".row",
            style: "display",
            includes: "flex",
            msg: "display: flex on .row",
          },
          {
            sel: ".row",
            style: "justify-content",
            includes: "space-between",
            msg: "justify-content: space-between",
          },
        ],
      },
    },
    {
      id: "css-5",
      title: "Put a card together",
      words: ["css"],
      body: `
        <p>You now have the usual pieces of a readable block:</p>
        <ul>
          <li>a <strong>class</strong> on the wrapper so you can select it (<code>.card</code>)</li>
          <li><strong>flex</strong> + <strong>space-between</strong> so two bits sit on one row</li>
          <li><strong>padding</strong> so text is not glued to the edge</li>
          <li>a <strong>border</strong> so you can see the box (here, a line under the row)</li>
        </ul>
        <p>One rule can list several declarations. Each ends with a semicolon:</p>
<pre><span class="t">.card</span> <span class="x">{</span>
  <span class="a">display</span><span class="x">: flex;</span>
  <span class="a">justify-content</span><span class="x">: space-between;</span>
  <span class="a">padding</span><span class="x">: 12px;</span>
  <span class="a">border-bottom</span><span class="x">: 1px solid #ccc;</span>
<span class="x">}</span></pre>
        <p><code>border-bottom</code> is only the bottom edge. <code>#ccc</code> is a gray color in hex (three pairs of digits). You do not need to memorize hex; “light gray” as <code>#ccc</code> is enough for now.</p>
        <p>You do not need a CSS framework for this. Most “cards” in tutorials are these four ideas.</p>
      `,
      exercise: {
        type: "css",
        prompt:
          "Style .card as flex, space-between, 12px padding, and a bottom border 1px solid #ccc.",
        fixture: '<div class="card"><span>Ada</span><span>Hi</span></div>',
        starter: ".card {\n\n}",
        expected:
          ".card {\n  display: flex;\n  justify-content: space-between;\n  padding: 12px;\n  border-bottom: 1px solid #ccc;\n}",
        checks: [
          { sel: ".card", style: "display", includes: "flex", msg: "flex" },
          {
            sel: ".card",
            style: "justify-content",
            includes: "space-between",
            msg: "space-between",
          },
          {
            sel: ".card",
            style: "padding-top",
            includes: "12",
            msg: "12px padding",
          },
          {
            sel: ".card",
            style: "border-bottom-width",
            includes: "1",
            msg: "1px bottom border",
          },
        ],
      },
    },
    {
      id: "css-6",
      title: "Block vs inline (why width seems to fail)",
      words: ["box-model"],
      body: `
        <p>Tags come in two everyday display modes. This is why <code>width: 200px</code> on a <code>span</code> often does nothing.</p>
        <table class="plain">
          <tr><td><strong>Block</strong></td><td><code>h1</code>, <code>p</code>, <code>div</code>, <code>ul</code> — start on a new line, take the full row, honor width and margin.</td></tr>
          <tr><td><strong>Inline</strong></td><td><code>span</code>, <code>a</code>, <code>strong</code> — sit in the sentence. Width and height are mostly ignored. They are only as wide as their text.</td></tr>
        </table>
        <p>If you need something that sits in a sentence <em>and</em> has padding/width, use <code>display: inline-block</code>: inline flow, but the box model works.</p>
<pre><span class="t">.chip</span> <span class="x">{</span>
  <span class="a">display</span><span class="x">: inline-block;</span>
  <span class="a">padding</span><span class="x">: 8px;</span>
<span class="x">}</span></pre>
        <p>Other fixes: wrap the text in a <code>div</code> (block), or put <code>display: flex</code> on the parent (last lessons).</p>
        <p>You now have the paints. Next three lessons are not new properties for a quiz — they are using several rules together, and fixing a broken file, the way a real page works.</p>
      `,
      exercise: {
        type: "css",
        prompt: "Make .chip display: inline-block with 8px padding.",
        fixture: '<span class="chip">Hi</span>',
        starter: ".chip {\n\n}",
        expected: ".chip {\n  display: inline-block;\n  padding: 8px;\n}",
        checks: [
          {
            sel: ".chip",
            style: "display",
            includes: "inline-block",
            msg: "display: inline-block",
          },
          {
            sel: ".chip",
            style: "padding-top",
            includes: "8",
            msg: "8px padding",
          },
        ],
      },
    },
    {
      id: "css-7",
      title: "Paint a small notes list",
      words: ["css", "flexbox", "selector"],
      body: `
        <p>Isolated properties are not a page. A notes list is several rules that have to work <em>together</em>. The HTML is already there (you would have written it last chapter). Your job is the look.</p>
        <p>New spelling, same idea as the row: <code>flex-direction: column</code> stacks children vertically. <code>gap</code> is the space <em>between</em> those children (like margin, but on the parent).</p>
<pre><span class="t">.list</span> <span class="x">{</span>
  <span class="a">display</span><span class="x">: flex;</span>
  <span class="a">flex-direction</span><span class="x">: column;</span>
  <span class="a">gap</span><span class="x">: 12px;</span>
<span class="x">}</span></pre>
        <p>A class on the title vs the meta: <code>.title</code> and <code>.meta</code>. If you write <code>span { color: navy }</code> you paint <em>every</em> span, including the title. That is the usual bug when you “just make it blue.”</p>
        <p>Read the preview. If the two cards are glued together, you forgot <code>gap</code> (or margin). If the title is navy too, your selector was too wide.</p>
      `,
      exercise: {
        type: "css",
        prompt:
          "Notes list: .list is a vertical flex column with 12px gap. Each .card has 16px padding and a 1px solid #ccc border. .title is bold. .meta is navy — not every span.",
        fixture:
          '<div class="list"><div class="card"><div class="row"><span class="title">Ada</span><span class="meta">now</span></div><p class="body">First note</p></div><div class="card"><div class="row"><span class="title">Hi</span><span class="meta">later</span></div><p class="body">Second</p></div></div>',
        starter: ".list {\n\n}\n.card {\n\n}\n.title {\n\n}\n.meta {\n\n}\n",
        expected:
          ".list {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.card {\n  padding: 16px;\n  border: 1px solid #ccc;\n}\n.title {\n  font-weight: bold;\n}\n.meta {\n  color: navy;\n}",
        checks: [
          {
            sel: ".list",
            style: "display",
            includes: "flex",
            msg: ".list should be display: flex",
          },
          {
            sel: ".list",
            style: "flex-direction",
            includes: "column",
            msg: "flex-direction: column (stack the cards)",
          },
          {
            sel: ".list",
            style: "row-gap",
            includes: "12",
            msg: "12px gap between cards",
          },
          {
            sel: ".card",
            style: "padding-top",
            includes: "16",
            msg: "card padding 16px",
          },
          {
            sel: ".card",
            style: "border-top-width",
            includes: "1",
            msg: "1px card border",
          },
          {
            sel: ".title",
            style: "font-weight",
            includes: "bold",
            msg: ".title bold",
          },
          {
            sel: ".meta",
            style: "color",
            includes: "navy",
            msg: ".meta navy",
          },
          {
            sel: ".title",
            style: "color",
            excludes: "navy",
            msg: "Do not paint .title navy — that means you colored every span",
          },
        ],
      },
    },
    {
      id: "css-8",
      title: "Fix the selectors",
      words: ["selector"],
      body: `
        <p>A real file often “does nothing” because the selector is missing the dot or the hash. The browser looks for a tag named <code>&lt;card&gt;</code> or <code>&lt;hello&gt;</code>, finds none, and applies zero paint. The rest of the declarations can be perfect.</p>
        <p>The preview on the right is already broken: padding and navy never show up. You do not write a new design. You fix the two selectors so they match the HTML that is already there (<code>class="card"</code>, <code>id="hello"</code>).</p>
        <p>Remember: class → <code>.card</code>. id → <code>#hello</code>. Element → <code>p</code> with no prefix (not this exercise).</p>
      `,
      exercise: {
        type: "css",
        prompt:
          "This CSS is meant to pad .card and color #hello navy. It does nothing. Fix the selectors only if you can; properties can stay.",
        fixture: '<div class="card">Hi</div><p id="hello">Ada</p>',
        starter:
          "card {\n  padding: 16px;\n  border: 2px solid black;\n}\nhello {\n  color: navy;\n}",
        expected:
          ".card {\n  padding: 16px;\n  border: 2px solid black;\n}\n#hello {\n  color: navy;\n}",
        checks: [
          {
            sel: ".card",
            style: "padding-top",
            includes: "16",
            msg: ".card padding — did you add the dot?",
          },
          {
            sel: "#hello",
            style: "color",
            includes: "navy",
            msg: "#hello navy — did you add the #?",
          },
        ],
      },
    },
    {
      id: "css-9",
      title: "A card row: title left, meta right",
      words: ["flexbox", "box-model"],
      body: `
        <p>One more composed look: the top of a note is a row (title left, a small word right), sitting inside a padded card. You already know each piece. Wire them without a recipe dumped as one property at a time.</p>
        <ul>
          <li>The <em>card</em> is the outer box: padding, a border so you can see it.</li>
          <li>The <em>row inside</em> is flex + space-between. Put <code>display: flex</code> on <code>.row</code>, not on the title span.</li>
        </ul>
        <p>If you flex the card itself and it also contains a <code>&lt;p class="body"&gt;</code>, the paragraph becomes a flex item on that same row and the layout looks drunk. Flex the row. Pad the card. Different jobs, different selectors.</p>
        <p>HTML drew the tags. CSS painted them. Next chapter is JavaScript: a click that reads a box and runs <code>if</code>. CSS will not do that for you.</p>
      `,
      exercise: {
        type: "css",
        prompt:
          "Pad .card 16px with a 1px solid #ccc border. Make .row flex with space-between. Do not flex .card (the body line must stay under the row).",
        fixture:
          '<div class="card"><div class="row"><span class="title">Ada</span><span class="meta">Hi</span></div><p class="body">First note</p></div>',
        starter: ".card {\n\n}\n.row {\n\n}\n",
        expected:
          ".card {\n  padding: 16px;\n  border: 1px solid #ccc;\n}\n.row {\n  display: flex;\n  justify-content: space-between;\n}",
        checks: [
          {
            sel: ".card",
            style: "padding-top",
            includes: "16",
            msg: "card padding 16px",
          },
          {
            sel: ".card",
            style: "border-top-width",
            includes: "1",
            msg: "card 1px border",
          },
          {
            sel: ".row",
            style: "display",
            includes: "flex",
            msg: ".row is the flex container",
          },
          {
            sel: ".row",
            style: "justify-content",
            includes: "space-between",
            msg: "space-between on .row",
          },
          {
            sel: ".card",
            style: "display",
            excludes: "flex",
            msg: "Do not display:flex the .card — only .row",
          },
        ],
      },
    },
  ],
});
