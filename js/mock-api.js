const MockApi = (() => {
  const KEY = "webdev-pwa-expenses";
  const nativeFetch = window.fetch.bind(window);
  const listeners = new Set();
  let seq = 3;

  function seed() {
    return [
      { id: 1, description: "Coffee", amount: 4.5, category: "Food" },
      { id: 2, description: "Bus", amount: 30, category: "Transport" },
    ];
  }

  function read() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return seed();
      const rows = JSON.parse(raw);
      seq = rows.reduce((m, r) => Math.max(m, r.id), 0) + 1;
      return rows;
    } catch {
      return seed();
    }
  }

  function write(rows) {
    localStorage.setItem(KEY, JSON.stringify(rows));
  }

  function reset() {
    write(seed());
    seq = 3;
    emit({ method: "RESET", path: "/api/expenses", status: 200, body: seed() });
  }

  function emit(entry) {
    const item = { ...entry, at: Date.now() };
    listeners.forEach((fn) => fn(item));
  }

  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  function json(status, body) {
    return new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }

  function apiPath(url) {
    const u = new URL(url, location.href);
    const i = u.pathname.indexOf("/api/");
    return i >= 0 ? u.pathname.slice(i) : null;
  }

  async function handle(url, init = {}) {
    const path = apiPath(url);
    const method = (init.method || "GET").toUpperCase();
    let reqBody = null;
    if (init.body) {
      try {
        reqBody =
          typeof init.body === "string" ? JSON.parse(init.body) : init.body;
      } catch {
        reqBody = init.body;
      }
    }

    let status = 200;
    let body;

    const rows = read();
    const idMatch = path.match(/^\/api\/expenses\/(\d+)$/);

    if (path === "/api/expenses" && method === "GET") {
      body = rows;
    } else if (path === "/api/expenses" && method === "POST") {
      if (
        !reqBody ||
        !reqBody.description ||
        typeof reqBody.amount !== "number"
      ) {
        status = 400;
        body = { error: "Need JSON { description, amount, category }" };
      } else {
        const row = {
          id: seq++,
          description: String(reqBody.description),
          amount: Number(reqBody.amount),
          category: String(reqBody.category || "Other"),
        };
        rows.push(row);
        write(rows);
        status = 201;
        body = row;
      }
    } else if (idMatch && method === "GET") {
      const row = rows.find((r) => r.id === Number(idMatch[1]));
      if (!row) {
        status = 404;
        body = { error: "Not found" };
      } else body = row;
    } else if (idMatch && (method === "PUT" || method === "PATCH")) {
      const idx = rows.findIndex((r) => r.id === Number(idMatch[1]));
      if (idx < 0) {
        status = 404;
        body = { error: "Not found" };
      } else {
        rows[idx] = {
          ...rows[idx],
          ...(reqBody || {}),
          id: rows[idx].id,
        };
        write(rows);
        body = rows[idx];
      }
    } else if (idMatch && method === "DELETE") {
      const idx = rows.findIndex((r) => r.id === Number(idMatch[1]));
      if (idx < 0) {
        status = 404;
        body = { error: "Not found" };
      } else {
        rows.splice(idx, 1);
        write(rows);
        status = 204;
        body = null;
      }
    } else {
      status = 404;
      body = { error: "No mock route for " + method + " " + path };
    }

    emit({ method, path, status, request: reqBody, body });
    if (status === 204) {
      return new Response(null, { status });
    }
    return json(status, body);
  }

  window.fetch = async function (input, init) {
    const url = typeof input === "string" ? input : input.url;
    if (apiPath(url)) return handle(url, init || {});
    return nativeFetch(input, init);
  };

  return { read, reset, subscribe, handle, apiPath };
})();
