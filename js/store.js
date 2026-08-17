const Store = (() => {
  const KEY = "webdev-pwa-v1";

  const defaults = () => ({
    completed: {},
    check: null,
    words: {},
    hintDismissed: false,
    xp: 0,
    combo: 0,
    bestCombo: 0,
    badges: {},
    labPosts: 0,
  });

  function load() {
    try {
      return {
        ...defaults(),
        ...JSON.parse(localStorage.getItem(KEY) || "{}"),
      };
    } catch {
      return defaults();
    }
  }

  function save(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  function get() {
    return load();
  }

  function update(fn) {
    const next = fn(load());
    save(next);
    return next;
  }

  function complete(lessonId, wordIds) {
    return update((s) => {
      s.completed[lessonId] = Date.now();
      (wordIds || []).forEach((w) => {
        s.words[w] = true;
      });
      return s;
    });
  }

  function isDone(lessonId) {
    return Boolean(load().completed[lessonId]);
  }

  function resetProgress() {
    localStorage.removeItem(KEY);
  }

  return { get, update, complete, isDone, resetProgress };
})();
