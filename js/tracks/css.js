window.LEARN_TRACKS = window.LEARN_TRACKS || [];
window.LEARN_TRACKS.push({
  id: "css",
  title: "CSS",
  quest: "The Skin",
  blurb:
    "How the page looks — color, space, layout. HTML is structure; CSS is appearance.",
  youKnow:
    "You don't style a terminal. CSS is the extra layer the web has that your CLI doesn't.",
  lessons: [
    {
      id: "css-1",
      title: "CSS is rules",
      words: ["css", "selector"],
      body: `
        <p>CSS = Cascading Style Sheets. A rule has two parts:</p>
<pre><span class="t">h1</span> <span class="x">{</span>
  <span class="a">color</span><span class="x">: red;</span>
<span class="x">}</span></pre>
        <ul>
          <li><code>h1</code> — the <strong>selector</strong> (which elements)</li>
          <li><code>color: red;</code> — the <strong>declaration</strong> (what to change)</li>
        </ul>
        <p>Hook CSS to HTML with a class or by tagging the element name.</p>
        <div class="callout java">Like setting fields on an object after you construct it. The HTML element already exists; CSS mutates how it's drawn.</div>
        <p>In this course you'll type CSS in the exercise box. In a real file you'd put it in <code>style.css</code> and link it from <code>&lt;head&gt;</code>:</p>
<pre><span class="t">&lt;link </span><span class="a">rel</span><span class="t">=</span><span class="x">"stylesheet"</span> <span class="a">href</span><span class="t">=</span><span class="x">"style.css"</span><span class="t">&gt;</span></pre>
      `,
      exercise: {
        type: "css",
        prompt: "Make every h1 red (color: red is fine).",
        fixture: "<h1>Expense Tracker</h1><p>Not a heading</p>",
        starter: "h1 {\n  \n}",
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
      title: "Selectors: element, class, id",
      words: ["selector"],
      body: `
        <p>Three selectors you'll use constantly:</p>
<pre><span class="t">p</span> <span class="x">{ }</span>          <span class="c">/* every paragraph */</span>
<span class="t">.item</span> <span class="x">{ }</span>      <span class="c">/* class="item"  note the dot */</span>
<span class="t">#total</span> <span class="x">{ }</span>     <span class="c">/* id="total"    note the hash */</span></pre>
        <p>Class = many. Id = one. That's why HTML <code>class</code> vs <code>id</code> exists.</p>
        <p>You can combine: <code>li.item</code> means an <code>li</code> that also has class item.</p>
        <div class="callout warn">Forgetting the dot is the #1 beginner bug: <code>item { }</code> looks for a tag named item, which doesn't exist. You meant <code>.item</code>.</div>
      `,
      exercise: {
        type: "css",
        prompt:
          "Make .price bold (font-weight: bold) and #total the color navy.",
        fixture:
          '<p>Coffee <span class="price">$4.50</span></p><p id="total">$4.50</p>',
        starter: ".price {\n\n}\n#total {\n\n}",
        checks: [
          {
            sel: ".price",
            style: "font-weight",
            includes: "bold",
            msg: ".price should be bold (font-weight)",
          },
          {
            sel: "#total",
            style: "color",
            includes: "navy",
            msg: "#total color should be navy",
          },
        ],
      },
    },
    {
      id: "css-3",
      title: "The box model",
      words: ["box-model"],
      body: `
        <p>Every element is a box:</p>
        <ol>
          <li><strong>content</strong> — the text/image</li>
          <li><strong>padding</strong> — space inside the border</li>
          <li><strong>border</strong> — the edge</li>
          <li><strong>margin</strong> — space outside, between this box and neighbors</li>
        </ol>
<pre><span class="t">.card</span> <span class="x">{</span>
  <span class="a">padding</span><span class="x">: 12px;</span>
  <span class="a">margin</span><span class="x">: 8px;</span>
  <span class="a">border</span><span class="x">: 1px solid black;</span>
<span class="x">}</span></pre>
        <p><code>box-sizing: border-box</code> makes width include padding+border. Almost everyone wants this. This PWA uses it.</p>
        <div class="callout java">Margin is like blank lines between <code>System.out.println</code> calls. Padding is space inside the card, like indenting fields in a class.</div>
      `,
      exercise: {
        type: "css",
        prompt: "Give .card 16px padding and a 2px solid black border.",
        fixture: '<div class="card">Coffee — $4.50</div>',
        starter: ".card {\n\n}",
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
      title: "Flexbox (layout in a row or column)",
      words: ["flexbox"],
      body: `
        <p>Flexbox is how you put things in a row or a column without fighting floats.</p>
<pre><span class="t">.row</span> <span class="x">{</span>
  <span class="a">display</span><span class="x">: flex;</span>
  <span class="a">justify-content</span><span class="x">: space-between;</span>  <span class="c">/* main axis */</span>
  <span class="a">align-items</span><span class="x">: center;</span>             <span class="c">/* cross axis */</span>
  <span class="a">gap</span><span class="x">: 8px;</span>
<span class="x">}</span></pre>
        <p>Default direction is a row. <code>flex-direction: column</code> stacks vertically — this app's phone nav. On a laptop the same links sit in a left rail.</p>
        <p>You'll use this for an expense row: description on the left, amount on the right.</p>
      `,
      exercise: {
        type: "css",
        prompt:
          "Make .row a flex container with space-between so the amount sits on the right.",
        fixture: '<div class="row"><span>Coffee</span><span>$4.50</span></div>',
        starter: ".row {\n\n}",
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
      title: "Style the expense list",
      words: ["css"],
      body: `
        <p>Put it together. A usable list is just:</p>
        <ul>
          <li>a class on each row</li>
          <li>flex to split name / amount</li>
          <li>padding so it's tappable</li>
          <li>a border between rows</li>
        </ul>
        <p>You don't need a framework. Most of the "look" of this PWA is those four ideas plus a color variable.</p>
      `,
      exercise: {
        type: "css",
        prompt:
          "Style .expense as flex, space-between, 12px padding, and a bottom border 1px solid #ccc.",
        fixture:
          '<div class="expense"><span>Coffee</span><span>$4.50</span></div><div class="expense"><span>Bus</span><span>$30.00</span></div>',
        starter: ".expense {\n\n}",
        checks: [
          { sel: ".expense", style: "display", includes: "flex", msg: "flex" },
          {
            sel: ".expense",
            style: "justify-content",
            includes: "space-between",
            msg: "space-between",
          },
          {
            sel: ".expense",
            style: "padding-top",
            includes: "12",
            msg: "12px padding",
          },
        ],
      },
    },
    {
      id: "css-6",
      title: "Block vs inline (why layout fights you)",
      words: ["box-model"],
      body: `
        <p>Two display modes you already used without naming them:</p>
        <table class="plain">
          <tr><td><strong>Block</strong></td><td><code>h1</code>, <code>p</code>, <code>div</code>, <code>ul</code> — take a full row, honor width/margin</td></tr>
          <tr><td><strong>Inline</strong></td><td><code>span</code>, <code>a</code>, <code>strong</code> — sit in the sentence, ignore width/height</td></tr>
        </table>
        <p>That's why <code>width: 200px</code> on a <code>span</code> seems to do nothing. Make it a block, or wrap it in a <code>div</code>, or use flex on the parent (last lesson).</p>
<pre><span class="t">.price</span> <span class="x">{</span>
  <span class="a">display</span><span class="x">: inline-block;</span>  <span class="c">/* inline flow, but width works */</span>
<span class="x">}</span></pre>
        <p>HTML quest built the boxes. This quest painted them. Next quest makes the Add button actually add — still no server.</p>
      `,
      exercise: {
        type: "css",
        prompt: "Make .chip display: inline-block with 8px padding.",
        fixture: '<span class="chip">Food</span>',
        starter: ".chip {\n\n}",
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
  ],
});
