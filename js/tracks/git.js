window.LEARN_TRACKS = window.LEARN_TRACKS || [];
window.LEARN_TRACKS.push({
  id: "git",
  title: "Git and GitHub",
  quest: "Git and GitHub",
  blurb:
    "How a team (or you + an agent) shares work without stomping main: branch, pull request, review, merge.",
  youKnow:
    "You can write a page. Git does not draw tags. It snapshots files so several people can change the same project without emailing zip files.",
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
        <p>Commands exist. The skill later is <em>procedure</em>: when a team shares one repo, you do not dump work straight onto <code>main</code>. First you need the words for snapshot, host, and branch.</p>
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
        <p>When an AI coding agent “commits,” it ran those commands (or the same idea through a button). A new commit is a new point. Your previous commit is still on the timeline unless someone rewrote history (you will say no to that on <code>main</code>).</p>
        <p>The message should say <em>why</em>, not a dump of file names: “make h1 red” is better than “update files.” Reviewers read messages in a list.</p>
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
      title: "GitHub is the shared copy",
      words: ["git", "push", "github"],
      body: `
        <p><strong>Git</strong> is the timeline on disk. <strong>GitHub</strong> is a website (github.com) that stores a copy of that timeline so other computers — teammates, CI, Pages — can see it.</p>
        <div class="callout word"><strong>New word — GitHub.</strong> A host for Git timelines. Not the Git program. GitLab and others do the same job. This course lives on GitHub.</div>
        <div class="callout word"><strong>New word — push.</strong> <code>git push</code> sends commits you already made to GitHub (usually <code>origin</code>). Until you push, only your laptop has the new snapshots.</div>
        <p><code>git pull</code> is the other direction: download commits that are on GitHub but not on this laptop yet. That is how you pick up a teammate’s merge (later lessons) instead of working on a stale copy.</p>
        <p>Push is a <em>mechanic</em>. It is not the whole job. On a team you almost never “finish by pushing <code>main</code>.” You push a <strong>branch</strong>, then ask for a review. That procedure starts in a few lessons. Solo toy repos sometimes push <code>main</code>; that is why this course’s agent sometimes did. That is not how shared products work.</p>
        <p>GitHub stores <em>source files</em>. It is not the notes list you type in the Lab.</p>
      `,
      exercise: {
        type: "choice",
        prompt:
          "You committed on your laptop. A teammate refreshes GitHub and does not see your work. Why?",
        options: [
          {
            id: "a",
            text: "Commit already uploaded it — they should restart Java",
            ok: false,
          },
          {
            id: "b",
            text: "Commit is local. GitHub updates after a push (of that commit’s branch)",
            ok: true,
          },
          {
            id: "c",
            text: "They must clone into the same folder again",
            ok: false,
          },
        ],
        why: "commit = snapshot here. push = send. Teams still push a branch, not a silent dump onto main.",
      },
    },
    {
      id: "git-4",
      title: "clone and origin (everyone gets a copy)",
      words: ["clone", "git"],
      body: `
        <p><code>git clone https://github.com/you/web-dev-lab.git</code> copies the timeline into a new folder on your machine. You then have the files <em>and</em> the history. Each teammate clones once. After that they <code>pull</code>.</p>
        <div class="callout word"><strong>New word — clone.</strong> Download a Git repo (files + history) for the first time. After that you <code>pull</code> to update, not clone again every day.</div>
        <p>Inside a clone, <code>origin</code> is the usual nickname for “that GitHub URL.” Not the same word as a web page’s origin (scheme + host). Here it means the remote copy.</p>
        <p>When an agent says “the remote,” it means that GitHub copy. When it says “I cannot push,” it usually means login (SSH key or token), or the branch is protected — not that Git is broken.</p>
        <p>Opening a project in Cursor that already has a <code>.git</code> folder means you are already in a clone. You do not clone again into itself.</p>
      `,
      exercise: {
        type: "choice",
        prompt:
          "You already have the repo on your laptop. Tomorrow a teammate merged to GitHub. You should…",
        options: [
          { id: "a", text: "git clone again into the same folder", ok: false },
          { id: "b", text: "git pull — download the new snapshots", ok: true },
          { id: "c", text: "Rewrite HTML from scratch", ok: false },
        ],
        why: "clone once. pull to update. Next: you do not put new work on main first.",
      },
    },
    {
      id: "git-5",
      title: "main stays clean. You branch.",
      words: ["branch"],
      body: `
        <p>The shared line everyone treats as “the real product” is usually called <code>main</code> (older repos: <code>master</code>). On a team, <code>main</code> is what deploys, what CI tests, what the next person pulls. You do <strong>not</strong> sit down and commit experimental CSS straight onto <code>main</code>.</p>
        <p>A <strong>branch</strong> is another named line that starts from some commit (almost always the current <code>main</code>). You commit on the branch. <code>main</code> does not move until a review says so.</p>
        <div class="callout word"><strong>New word — branch.</strong> A named line of commits. <code>main</code> is the default shared line. Feature work lives on another name first, e.g. <code>notes-card</code>.</div>
<pre>git checkout main
git pull
git switch -c notes-card</pre>
        <p><code>git switch -c notes-card</code> (older spelling: <code>git checkout -b notes-card</code>) means: create and move onto that branch. The name is a short why, like a method name — not <code>fix</code> or <code>asdf</code>.</p>
        <p>Two people can each have a branch at the same time. That is the point. Their laptops do not have to take turns with one shared <code>main</code> folder.</p>
        <p>If an agent starts editing while you are on <code>main</code>, stop it and make a branch first — or tell it to. Silent commits on <code>main</code> are how live sites break on Friday afternoon.</p>
      `,
      exercise: {
        type: "choice",
        prompt:
          "Ada needs to restyle the notes card. Bob is also working in the same repo. Ada should…",
        options: [
          {
            id: "a",
            text: "Commit straight on main so Bob sees it immediately",
            ok: false,
          },
          {
            id: "b",
            text: "Update main, create a branch, commit there",
            ok: true,
          },
          {
            id: "c",
            text: "Email Bob a zip of her project folder",
            ok: false,
          },
        ],
        why: "main stays the shared known-good line. Work happens on a branch.",
      },
    },
    {
      id: "git-6",
      title: "The loop everyone repeats",
      words: ["git", "branch", "push"],
      body: `
        <p>This is the standard procedure. Memorize the <em>order</em>, not twenty flags.</p>
        <ol>
          <li><strong>Start from the team’s main.</strong> <code>git checkout main</code> then <code>git pull</code>. If you skip this, you build on last week’s code.</li>
          <li><strong>Branch.</strong> <code>git switch -c a-short-name</code>.</li>
          <li><strong>Work.</strong> Edit files. <code>git add</code> / <code>git commit</code> as many times as you need. Small commits are easier to review than one giant blob.</li>
          <li><strong>Push the branch</strong> (not main): <code>git push -u origin a-short-name</code>. The <code>-u</code> remembers that name so later <code>git push</code> is enough.</li>
          <li><strong>Open a pull request</strong> on GitHub: “please copy these commits onto main after a look.”</li>
          <li><strong>Review.</strong> A human reads the diff. CI (tests) may run. You change the branch if they ask; new commits land on the same PR.</li>
          <li><strong>Merge.</strong> Someone with permission hits Merge. Now main has the work.</li>
          <li><strong>Come home.</strong> <code>git checkout main</code> then <code>git pull</code>. Delete the old branch. Next task: step 1 again.</li>
        </ol>
        <p>That loop is what “collaborative development” means in Git. <code>git push</code> is step 4, of a branch. It is not the definition of done.</p>
        <p>Solo weekend project: you can skip the PR. As soon as a second human (or an agent you do not blindly trust) touches the repo, use the loop.</p>
      `,
      exercise: {
        type: "text",
        prompt:
          "In your own words, list the loop. Need these ideas: pull (or update main), branch, commit, push, pull request (or PR), merge.",
        placeholder: "pull main, branch, …",
        expected:
          "pull main, branch, commit, push the branch, open a PR, merge, pull main",
        check: (raw) => {
          const s = raw.toLowerCase();
          const pull = /\bpull\b|\bupdate main\b|\bgit pull\b/.test(s);
          const branch = /\bbranch\b|\bswitch -c\b|\bcheckout -b\b/.test(s);
          const commit = /\bcommit\b/.test(s);
          const push = /\bpush\b/.test(s);
          const pr = /\bpull request\b|\bpr\b/.test(s);
          const merge = /\bmerge\b/.test(s);
          if (pull && branch && commit && push && pr && merge) {
            return {
              ok: true,
              msg: "That’s the loop. Commands are spelling. Order is the skill.",
            };
          }
          return {
            ok: false,
            msg: "Need: pull/update main, branch, commit, push, PR, merge. Or Skip.",
          };
        },
      },
    },
    {
      id: "git-7",
      title: "A pull request is the review",
      words: ["pull-request", "review"],
      body: `
        <p>A <strong>pull request</strong> (PR) is a GitHub page, not a Git command you type every day. It says: these commits on branch X should become part of <code>main</code> after a human looks.</p>
        <div class="callout word"><strong>New word — pull request.</strong> A request to merge a branch into another (usually main). The word “pull” is historical. It is <em>not</em> <code>git pull</code>.</div>
        <div class="callout word"><strong>New word — review.</strong> A person reads the <em>diff</em> (what changed, line by line) and the commit messages. They ask questions, request changes, or approve. CI (automated tests) is extra signal, not a substitute for a look.</div>
        <p>What you actually do on the PR page:</p>
        <ul>
          <li>Write a short description: what and why, like a commit message for the whole change.</li>
          <li>Open the Files tab. Read your own diff once. Agents include junk (debug logs, leftover files). Remove those on the branch and push again — the PR updates.</li>
          <li>Request a reviewer if the team has one. On a personal repo, <em>you</em> are the reviewer for the agent.</li>
        </ul>
        <p>Merging without reading the diff is how “the agent said it worked” becomes a broken main. You already know how to read code. The PR is that, with a green Merge button at the end.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "An agent opened a PR. Your job before Merge is…",
        options: [
          {
            id: "a",
            text: "Merge immediately — the agent compiled it in its head",
            ok: false,
          },
          {
            id: "b",
            text: "Read the diff (and description). Ask for changes if it is wrong or noisy",
            ok: true,
          },
          {
            id: "c",
            text: "git pull, which is the same thing as a pull request",
            ok: false,
          },
        ],
        why: "PR = review + merge on GitHub. git pull downloads. You still read.",
      },
    },
    {
      id: "git-8",
      title: "After merge: everyone comes home to main",
      words: ["merge", "git"],
      body: `
        <p><strong>Merge</strong> copies the branch’s commits onto <code>main</code> (GitHub offers a few buttons: a merge commit, squash, rebase — you do not need to pick apart the flavors yet. “Merge when the review is done” is enough).</p>
        <div class="callout word"><strong>New word — merge.</strong> Combine one branch into another. After a PR merge, GitHub’s <code>main</code> has the work. Your laptop does not, until you pull.</div>
        <p>Standard after a merge:</p>
        <ol>
          <li>On GitHub, delete the feature branch (there is a button). It already landed. Keeping it forever is clutter.</li>
          <li>On your laptop: <code>git checkout main</code> then <code>git pull</code>. Now your main matches the team.</li>
          <li>Do not keep committing on the old local branch. Next task: new branch from this updated main.</li>
        </ol>
        <p>Bob, who did not write this feature, does the same <code>git checkout main && git pull</code> before he starts his own branch. That is how two people stay aligned without a zip file.</p>
        <p>If Pages is still old: the deploy workflow may still be running, or the service worker cached a file. Hard-refresh. That is not “Git failed to merge.”</p>
      `,
      exercise: {
        type: "choice",
        prompt:
          "The PR is merged. Ada’s laptop still has the old main. She should…",
        options: [
          { id: "a", text: "git clone into the same folder again", ok: false },
          {
            id: "b",
            text: "checkout main and git pull, then start the next branch from there",
            ok: true,
          },
          {
            id: "c",
            text: "Keep committing on the old feature branch forever",
            ok: false,
          },
        ],
        why: "Merge updates GitHub’s main. Pull updates the laptop. Then a new branch.",
      },
    },
    {
      id: "git-9",
      title: "Two people touched the same lines",
      words: ["conflict"],
      body: `
        <p>If Ada and Bob both change the <em>same lines</em> of the same file on different branches, Git cannot guess the winner. When the second person merges (or rebases), Git stops and marks a <strong>conflict</strong>.</p>
        <div class="callout word"><strong>New word — conflict.</strong> The same region of a file has two versions. Git writes both into the file with markers (<code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code> and <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>). A human (or an agent you then re-read) keeps the right text and commits the result.</div>
        <p>This is normal. It is not “Git is broken.” It means the loop needs a decision.</p>
        <p>What you do <em>not</em> do:</p>
        <ul>
          <li><code>git push --force</code> to <code>main</code> to “make the error go away.” That rewrites the shared timeline. Teammates’ laptops lie. Say no, including to an agent.</li>
          <li>Delete Bob’s work silently because yours compiled.</li>
        </ul>
        <p>You do not need to become a conflict expert in this course. You need to recognize the word, not panic, and not force-push <code>main</code>. Pull often (step 1 of the loop) so conflicts stay small.</p>
      `,
      exercise: {
        type: "choice",
        prompt: "Git reports a merge conflict on main. Worst response?",
        options: [
          {
            id: "a",
            text: "Open the file, keep the right lines, commit the merge",
            ok: false,
          },
          {
            id: "b",
            text: "git push --force to main so the other version disappears",
            ok: true,
          },
          {
            id: "c",
            text: "Ask Bob what he meant in those lines",
            ok: false,
          },
        ],
        why: "The prompt asked for the worst response. Force-pushing main rewrites the shared timeline. Don’t.",
      },
    },
    {
      id: "git-10",
      title: "An agent uses the same loop",
      words: ["git", "pull-request", "review"],
      body: `
        <p>You do not need to type every command. You do need the agent to follow the same procedure a teammate would:</p>
        <ul>
          <li>Update main, then a branch — not “commit on main because this repo is yours.” If other people (or future-you on another machine) use it, it is shared.</li>
          <li>Push the <em>branch</em>, open a PR, wait. You read the diff. Then merge.</li>
          <li>No force-push to main. No rewriting published history to hide a mistake.</li>
        </ul>
        <p>Sanity checks after it works (still useful):</p>
        <table class="plain">
          <tr><td><code>git status</code></td><td>Uncommitted junk? Files you did not ask for?</td></tr>
          <tr><td><code>git diff</code></td><td>Uncommitted edits vs the last snapshot.</td></tr>
          <tr><td>The PR Files tab</td><td>What would actually land on main.</td></tr>
        </table>
        <p>If Pages is old after a merge: workflow still running, or hard-refresh the service worker. Lesson checkmarks in <em>this</em> course are <code>localStorage</code>, not a Git commit. Updating course files does not reset them if lesson ids stay the same.</p>
        <p>Next we name the jobs (input, rules, remember, show). Then HTTP. We will not restart Git. You have the team loop.</p>
      `,
      exercise: {
        type: "choice",
        prompt:
          "A shared repo. The agent asks to push --force to main to “fix” a bad commit. You…",
        options: [
          { id: "a", text: "Say yes — agents know Git better", ok: false },
          {
            id: "b",
            text: "Say no. Fix it with a new commit (or a PR). Don’t rewrite main",
            ok: true,
          },
          {
            id: "c",
            text: "git clone again so the force-push becomes safe",
            ok: false,
          },
        ],
        why: "Same rule for humans and agents. main is shared. New commit or a revert, not force-push.",
      },
    },
  ],
});
