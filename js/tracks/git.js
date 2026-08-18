window.LEARN_TRACKS = window.LEARN_TRACKS || [];
window.LEARN_TRACKS.push({
  id: "git",
  title: "Git and GitHub",
  quest: "Git and GitHub",
  blurb:
    "A timeline of your files, then a website that stores that timeline. Enough to understand what an AI agent just did.",
  youKnow:
    "You can write a page. Git does not draw tags. It snapshots the files you already have, so you can see what changed and send that to GitHub.",
  lessons: [
    {
      id: "git-1",
      title: "Git is a timeline, on your computer",
      words: ["git"],
      body: `
        <p>You now have files: HTML, CSS, JavaScript. If you overwrite them, yesterday’s version is gone unless something kept a copy.</p>
        <p><strong>Git</strong> is a program that stores a <em>timeline</em> of those files in a hidden folder named <code>.git</code> inside the project. Each point on the timeline is a snapshot. You can look back. You can see what changed. It runs on <em>your</em> laptop. It is not the internet yet.</p>
        <div class="callout word"><strong>New word — Git.</strong> A timeline of source files. Not a language. Not HTML. Not GitHub (that is a website, next lessons).</div>
        <p>Java comparison: this is not <code>javac</code>. Git does not compile. It does not run your page. It only records “these bytes, at this moment, with this message.”</p>
        <p><code>git status</code> means: compared with the last snapshot, what is new, changed, or gone? When an agent “looks at git status,” it is reading that list so it does not guess.</p>
        <p>You do not need twenty commands. Status, snapshot, send — that is the spine.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "Git is…",
        options: [
          {
            id: "a",
            text: "A language the browser runs, like JavaScript",
            ok: false,
          },
          {
            id: "b",
            text: "A timeline of your project files on this computer",
            ok: true,
          },
          { id: "c", text: "The same thing as GitHub", ok: false },
        ],
        why: "Git = local timeline. GitHub = a host for that timeline. Next lessons split them.",
      },
    },
    {
      id: "git-2",
      title: "add, then commit (a snapshot)",
      words: ["git", "commit"],
      body: `
        <p>Saving in the editor is not a Git snapshot. Git wants two steps on purpose:</p>
        <ol>
          <li><code>git add</code> — mark which files belong in the <em>next</em> snapshot (staging). <code>git add .</code> means “the whole folder.”</li>
          <li><code>git commit -m "a short why"</code> — take the snapshot. The message is for humans (and for you, later).</li>
        </ol>
<pre>git add .
git commit -m "red headings"</pre>
        <div class="callout word"><strong>New word — commit.</strong> One snapshot on the timeline, with a message. Local until you push. The old snapshots are still there.</div>
        <p>When an AI coding agent “commits,” it ran those commands (or the same idea through a button). It should not rewrite history unless you asked. A new commit is a new point. Your previous commit is still on the timeline.</p>
        <p>The message should say <em>why</em>, not a dump of file names: “make h1 red” is better than “update files.”</p>
        <div class="callout java">A commit is like keeping numbered copies of a project folder, except Git stores the differences efficiently. You still have one working folder.</div>
      `,
      exercise: {
        type: "text",
        prompt:
          "Type the two commands in order: git add then git commit (a message is optional here).",
        placeholder: "git add …",
        expected: 'git add .\ngit commit -m "red headings"',
        check: (raw) => {
          const s = raw.toLowerCase();
          const addAt = s.search(/git\s+add\b/);
          const commitAt = s.search(/git\s+commit\b/);
          if (addAt >= 0 && commitAt > addAt) {
            return {
              ok: true,
              msg: "Add first (pick files), then commit (snapshot).",
            };
          }
          return {
            ok: false,
            msg: "Need git add, then git commit, in that order. Or Skip.",
          };
        },
      },
    },
    {
      id: "git-3",
      title: "GitHub is a host. push sends.",
      words: ["git", "push", "github"],
      body: `
        <p><strong>Git</strong> is the timeline on disk. <strong>GitHub</strong> is a website (github.com) that stores a copy of that timeline so other computers — and Pages — can see it.</p>
        <div class="callout word"><strong>New word — GitHub.</strong> A host for Git timelines. Not the Git program. GitLab and others do the same job. This course lives on GitHub.</div>
        <div class="callout word"><strong>New word — push.</strong> <code>git push</code> sends commits you already made to GitHub (usually <code>origin</code>). Until you push, GitHub still has the old timeline.</div>
        <p>That is why “I edited it in Cursor” does not update the public course. Cursor is your laptop. Pages reads GitHub. An agent that “pushed to origin/main” sent snapshots to GitHub’s <code>main</code> branch.</p>
<pre>git push</pre>
        <p><code>git pull</code> is the other direction: download commits that are on GitHub but not on this laptop yet. Two people (or you + an agent on another machine) stay in sync that way.</p>
        <p>GitHub stores <em>source files</em> (this course’s HTML and JavaScript). It is not the notes list you type in the Lab. Those are different piles of data.</p>
      `,
      exercise: {
        type: "text",
        prompt: "Type the command that sends local commits to GitHub.",
        placeholder: "git …",
        expected: "git push",
        check: (raw) => {
          const ok = /^\s*git\s+push\b/i.test(raw.trim());
          return ok
            ? {
                ok: true,
                msg: "push = send snapshots. commit already happened locally.",
              }
            : { ok: false, msg: "Expected: git push — or Skip." };
        },
      },
    },
    {
      id: "git-4",
      title: "clone and origin (a copy with a remote)",
      words: ["clone", "git"],
      body: `
        <p><code>git clone https://github.com/you/web-dev-lab.git</code> copies the timeline into a new folder on your machine. You then have the files <em>and</em> the history.</p>
        <div class="callout word"><strong>New word — clone.</strong> Download a Git repo (files + history) for the first time. After that you <code>pull</code> to update, not clone again every day.</div>
        <p>Inside a clone, <code>origin</code> is the usual nickname for “that GitHub URL.” <code>git push origin main</code> means: send this laptop’s <code>main</code> commits to GitHub’s <code>main</code>.</p>
        <p>When an agent says “the remote,” it means that GitHub copy. When it says “I cannot push,” it usually means login (SSH key or token), not that Git is broken.</p>
        <p>Opening a project in Cursor that already has a <code>.git</code> folder means you are already in a clone. You do not clone again into itself.</p>
      `,
      exercise: {
        type: "choice",
        prompt:
          "You already have the repo on your laptop. Tomorrow GitHub has new commits. You should…",
        options: [
          { id: "a", text: "git clone again into the same folder", ok: false },
          { id: "b", text: "git pull — download the new snapshots", ok: true },
          { id: "c", text: "Rewrite HTML from scratch", ok: false },
        ],
        why: "clone once. pull to update. push to publish your commits.",
      },
    },
    {
      id: "git-5",
      title: "A branch, and a pull request",
      words: ["branch", "pull-request"],
      body: `
        <p>The default line of snapshots is usually called <code>main</code> (older repos: <code>master</code>). A <strong>branch</strong> is another line with a name, starting from some commit. You can commit on the branch without moving <code>main</code> yet.</p>
        <div class="callout word"><strong>New word — branch.</strong> A named line of commits. <code>main</code> is the one you treat as “the real course.” Feature work often lives on another name first.</div>
        <p>A <strong>pull request</strong> (PR) on GitHub is a webpage that says: “please copy these commits from my branch onto <code>main</code> after a human looks.” It is not a Git command you must memorize. It is a review step.</p>
        <div class="callout word"><strong>New word — pull request.</strong> A GitHub request to merge a branch into another (usually main). Agents open PRs so you can read the diff before it becomes the default. The word “pull” here is historical. It is <em>not</em> <code>git pull</code>.</div>
        <p>You asked this course’s agent to push to <code>main</code> sometimes. That skips the PR. Fine for a personal repo. Teams use PRs so nobody’s agent overwrites the live site unseen.</p>
        <p>You do not need rebase, cherry-pick, or force-push. If an agent wants <code>push --force</code> to <code>main</code>, say no unless you fully understand you are rewriting the public timeline.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "A pull request is…",
        options: [
          {
            id: "a",
            text: "A Java method that pulls from a database",
            ok: false,
          },
          {
            id: "b",
            text: "A GitHub request: merge this branch into main after a look",
            ok: true,
          },
          { id: "c", text: "The same as git pull", ok: false },
        ],
        why: "git pull downloads. A pull request is a review + merge on GitHub.",
      },
    },
    {
      id: "git-6",
      title: "What to check after an agent works",
      words: ["git"],
      body: `
        <p>You do not need to type every Git command yourself. You do need to <em>recognize</em> what happened:</p>
        <table class="plain">
          <tr><td><code>git status</code></td><td>Is anything uncommitted? Did it leave junk files?</td></tr>
          <tr><td><code>git diff</code></td><td>What changed in the working files vs the last commit?</td></tr>
          <tr><td><code>git log</code></td><td>What snapshots exist, and their messages?</td></tr>
        </table>
        <p>If the agent committed: there is a new log line. If it pushed: GitHub shows that commit. If Pages is still old: the workflow may still be running, or your browser cached a service worker — hard-refresh. That is not Git failing.</p>
        <p>Progress in <em>this</em> course (which lessons you finished) is <code>localStorage</code> in your browser. It is not a Git commit. Updating the course files does not reset that, as long as lesson ids stay the same.</p>
        <p>Next we name the jobs (input, rules, remember, show). Then HTTP: a message instead of a method call. You have enough Git to read an agent’s sentences. We will not restart this chapter.</p>
      `,
      exercise: {
        type: "choice",
        prompt:
          "The agent committed and pushed. This PWA still shows an old lesson. First suspects?",
        options: [
          { id: "a", text: "Java is not installed", ok: false },
          {
            id: "b",
            text: "Pages workflow not finished yet, or the browser cache (hard-refresh)",
            ok: true,
          },
          {
            id: "c",
            text: "You must clone the repo again every time",
            ok: false,
          },
        ],
        why: "GitHub has the files after push. Pages and the service worker can lag. Lesson progress is localStorage, separate.",
      },
    },
  ],
});
