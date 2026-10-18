// Thuật toán đồ thị chạy từng bước, dùng cho phần mô phỏng và luyện chạy tay.
// Đồ thị: { n, directed, edges: [[u, v, w], ...] }, đỉnh đánh số 1..n.
// Quy ước khi chạy tay: xét đỉnh kề theo thứ tự tăng dần; khi hòa, chọn đỉnh (hoặc cạnh) có số nhỏ hơn.
(function (root) {
  const INF = Infinity;

  function adjacency(g) {
    const adj = Array.from({ length: g.n + 1 }, () => []);
    for (const [u, v, w = 1] of g.edges) {
      adj[u].push({ v, w });
      if (!g.directed) adj[v].push({ v: u, w });
    }
    adj.forEach((l) => l.sort((a, b) => a.v - b.v));
    return adj;
  }

  const range = (n) => Array.from({ length: n }, (_, i) => i + 1);
  const copy = (a) => a.slice();
  const fmtD = (d) => (d === INF ? "∞" : String(d));
  const set = (a) => (a.length ? `{${a.join(", ")}}` : "∅");
  const list = (a) => (a.length ? a.join(", ") : "∅");
  // Đường đi từ s tới v theo mảng trước; "" nếu không tới được
  const path = (p, s, v, d) => {
    if (d !== undefined && d === INF) return "";
    const out = [v];
    while (out[0] !== s && p[out[0]]) out.unshift(p[out[0]]);
    return out[0] === s ? out.join(" → ") : "";
  };
  // Bảng trình bày như làm trên giấy: { tables: [{ title, group, head, rows: [{ step, cells }] , note }] }
  // step là số thứ tự bước mô phỏng ứng với dòng đó, để hiện dần theo mô phỏng. Ô là chuỗi hoặc { t, c } (c: lớp tô màu).
  const cell = (t, c) => (c ? { t: String(t), c } : String(t));

  // ---------- BFS ----------
  function bfs(g, s) {
    const adj = adjacency(g);
    const d = Array(g.n + 1).fill(INF), p = Array(g.n + 1).fill(0);
    const order = [], tree = [], steps = [];
    const snap = (msg, extra = {}) => steps.push({ msg, visited: copy(order), tree: tree.map(copy), frontier: { label: "Hàng đợi", items: copy(q) }, dist: copy(d), parent: copy(p), ...extra });
    const q = [s];
    d[s] = 0;
    order.push(s);
    snap(`Bắt đầu từ đỉnh ${s}: d[${s}] = 0, đưa ${s} vào hàng đợi.`, { cur: s });
    const rows = [{ step: 0, cells: ["0", "–", String(s), list(q), set(order)] }];
    while (q.length) {
      const u = q.shift();
      snap(`Lấy ${u} ra khỏi hàng đợi, xét các đỉnh kề của ${u}.`, { cur: u });
      const added = [];
      for (const { v } of adj[u]) {
        if (d[v] !== INF) continue;
        d[v] = d[u] + 1;
        p[v] = u;
        order.push(v);
        tree.push([u, v]);
        q.push(v);
        added.push(v);
        snap(`Thăm ${v} từ ${u}: d[${v}] = ${d[v]}, trước[${v}] = ${u}, đưa ${v} vào hàng đợi.`, { cur: v, hiEdge: [u, v] });
      }
      rows.push({ step: steps.length - 1, cells: [String(rows.length), cell(u, "sel"), added.length ? added.join(", ") : "–", list(q), set(order)] });
    }
    snap(`Hàng đợi rỗng, kết thúc. Thứ tự thăm: ${order.join(", ")}.`);
    const last = steps.length - 1;
    const paper = { tables: [
      { title: "Bảng duyệt BFS", head: ["Bước", "Lấy ra u", "Đỉnh kề chưa thăm, đưa vào Q", "Hàng đợi Q", "Đã thăm"], rows },
      { title: "Kết quả", head: ["Đỉnh", "d", "Trước", `Đường đi từ ${s}`],
        rows: range(g.n).map((v) => ({ step: last, cells: [String(v), fmtD(d[v]), p[v] ? String(p[v]) : "–", d[v] === INF ? "không tới được" : path(p, s, v)] })) },
    ], note: `Thứ tự thăm: ${order.join(", ")}.` };
    return { steps, order, dist: d, parent: p, paper };
  }

  // ---------- DFS (đệ quy) ----------
  function dfs(g, s) {
    const adj = adjacency(g);
    const seen = Array(g.n + 1).fill(false), p = Array(g.n + 1).fill(0);
    const order = [], tree = [], stack = [], steps = [], rows = [];
    const snap = (msg, extra = {}) => steps.push({ msg, visited: copy(order), tree: tree.map(copy), frontier: { label: "Ngăn xếp đệ quy", items: copy(stack) }, parent: copy(p), ...extra });
    const row = (u, act) => rows.push({ step: steps.length - 1, cells: [String(rows.length + 1), cell(u, "sel"), act, list(stack), set(order)] });
    function visit(u) {
      seen[u] = true;
      order.push(u);
      stack.push(u);
      snap(p[u] ? `Đi từ ${p[u]} sang ${u}, thăm ${u}.` : `Bắt đầu thăm ${u}.`, { cur: u, hiEdge: p[u] ? [p[u], u] : null });
      row(u, p[u] ? `Thăm ${u} (từ ${p[u]}), đẩy vào ngăn xếp` : `Thăm ${u}, đẩy vào ngăn xếp`);
      for (const { v } of adj[u]) {
        if (seen[v]) continue;
        p[v] = u;
        tree.push([u, v]);
        visit(v);
        snap(`Quay lại ${u}.`, { cur: u });
        row(u, `${v} hết đỉnh kề chưa thăm, rút ${v}, quay lui về ${u}`);
      }
      stack.pop();
    }
    visit(s);
    snap(`Hết đỉnh để đi, kết thúc. Thứ tự thăm: ${order.join(", ")}.`);
    rows.push({ step: steps.length - 1, cells: [String(rows.length + 1), "–", `${s} hết đỉnh kề chưa thăm, rút ${s}, kết thúc`, list(stack), set(order)] });
    const last = steps.length - 1;
    const paper = { tables: [
      { title: "Bảng duyệt DFS", head: ["Bước", "Đỉnh đang xét", "Thao tác", "Ngăn xếp", "Đã thăm"], rows },
      { title: "Kết quả", head: ["Đỉnh", "Thứ tự thăm", "Trước"],
        rows: range(g.n).map((v) => ({ step: last, cells: [String(v), order.includes(v) ? String(order.indexOf(v) + 1) : "–", p[v] ? String(p[v]) : "–"] })) },
    ], note: `Thứ tự thăm: ${order.join(", ")}. Cây DFS gồm các cạnh: ${tree.map(([a, b]) => `${a}-${b}`).join(", ") || "∅"}.` };
    return { steps, order, parent: p, paper };
  }

  // Bảng nhãn kiểu Dijkstra/Prim: mỗi dòng là một lần chọn đỉnh, mỗi cột một đỉnh.
  function labelTable(title, n, rows, fmt, chosenHead, extra = []) {
    const vs = range(n);
    return { title, head: ["Bước", "Tập đã chọn", ...vs.map(String), chosenHead, ...extra.map((e) => e[0])],
      rows: rows.map((r, k) => {
        const before = rows.slice(0, k).map((x) => x.fixed);
        return { step: r.step, cells: [String(k + 1), set(before),
          ...vs.map((v) => (before.includes(v) ? "–" : r.fixed === v ? cell(fmt(r, v) + "*", "sel") : fmt(r, v))),
          cell(r.fixed, "sel"), ...extra.map((e) => e[1](r, k))] };
      }) };
  }

  // ---------- Dijkstra ----------
  function dijkstra(g, s) {
    const adj = adjacency(g);
    const d = Array(g.n + 1).fill(INF), p = Array(g.n + 1).fill(0), fixed = Array(g.n + 1).fill(false);
    const order = [], steps = [], rows = [];
    const tree = () => range(g.n).filter((v) => p[v] && fixed[v]).map((v) => [p[v], v]);
    const snap = (msg, extra = {}) => steps.push({ msg, visited: copy(order), tree: tree(), dist: copy(d), parent: copy(p), ...extra });
    d[s] = 0;
    snap(`Khởi tạo: d[${s}] = 0, các đỉnh khác d = ∞.`, { cur: s });
    for (let it = 0; it < g.n; it++) {
      let u = 0;
      for (const v of range(g.n)) if (!fixed[v] && d[v] < INF && (!u || d[v] < d[u])) u = v;
      if (!u) break;
      fixed[u] = true;
      order.push(u);
      snap(`Chọn ${u} (d nhỏ nhất trong các đỉnh chưa cố định, d[${u}] = ${d[u]}). Cố định ${u}.`, { cur: u });
      rows.push({ fixed: u, dist: copy(d), parent: copy(p), step: steps.length - 1 });
      for (const { v, w } of adj[u]) {
        if (fixed[v]) continue;
        if (d[u] + w < d[v]) {
          const old = d[v];
          d[v] = d[u] + w;
          p[v] = u;
          snap(`Cạnh ${u}→${v} (w = ${w}): ${d[u]} + ${w} = ${d[v]} < ${fmtD(old)}, cập nhật d[${v}] = ${d[v]}, trước[${v}] = ${u}.`, { cur: u, hiEdge: [u, v] });
        } else {
          snap(`Cạnh ${u}→${v} (w = ${w}): ${d[u]} + ${w} = ${d[u] + w} ≥ ${fmtD(d[v])}, giữ nguyên.`, { cur: u, hiEdge: [u, v] });
        }
      }
    }
    snap(`Đã cố định mọi đỉnh tới được. Thứ tự cố định: ${order.join(", ")}.`);
    const last = steps.length - 1;
    const paper = { tables: [
      labelTable("Bảng Dijkstra", g.n, rows, (r, v) => (r.dist[v] === INF ? "∞" : `${r.dist[v]}, ${r.parent[v] || v}`), "Đỉnh cố định"),
      { title: "Kết quả", head: ["Đỉnh", "d", "Trước", `Đường đi ngắn nhất từ ${s}`],
        rows: range(g.n).map((v) => ({ step: last, cells: [String(v), fmtD(d[v]), p[v] ? String(p[v]) : "–", d[v] === INF ? "không tới được" : path(p, s, v)] })) },
    ], note: "Mỗi ô ghi (d, trước). Dấu * đánh dấu đỉnh có d nhỏ nhất, được cố định ở bước đó; dấu – là đỉnh đã cố định từ trước." };
    return { steps, order, dist: d, parent: p, rows, paper };
  }

  // ---------- Kruskal ----------
  function kruskal(g) {
    const parent = range(g.n + 1).map((_, i) => i);
    const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
    const sorted = g.edges.map(([u, v, w]) => [Math.min(u, v), Math.max(u, v), w]).sort((a, b) => a[2] - b[2] || a[0] - b[0] || a[1] - b[1]);
    const tree = [], steps = [], rows = [];
    let total = 0;
    const snap = (msg, extra = {}) => steps.push({ msg, tree: tree.map(copy), visited: [...new Set(tree.flat())], edgeList: sorted, total, ...extra });
    const comps = () => {
      const m = new Map();
      range(g.n).forEach((v) => { const r = find(v); m.set(r, [...(m.get(r) || []), v]); });
      return [...m.values()].sort((a, b) => a[0] - b[0]).map(set).join(" ");
    };
    const row = (u, v, w, ok) => rows.push({ step: steps.length - 1, cells: [String(rows.length + 1), `${u}-${v}`, String(w),
      ok ? cell("Chọn", "ok") : cell("Loại (tạo chu trình)", "bad"), tree.map(([a, b]) => `${a}-${b}`).join(", ") || "∅", String(total), comps()] });
    snap(`Sắp xếp ${sorted.length} cạnh theo trọng số tăng dần, xét lần lượt.`);
    for (const [u, v, w] of sorted) {
      if (tree.length === g.n - 1) break;
      const a = find(u), b = find(v);
      if (a !== b) {
        parent[a] = b;
        tree.push([u, v]);
        total += w;
        snap(`Cạnh ${u}-${v} (w = ${w}) nối hai thành phần khác nhau, chọn. Tổng = ${total}.`, { hiEdge: [u, v], picked: true });
        row(u, v, w, true);
      } else {
        snap(`Cạnh ${u}-${v} (w = ${w}) tạo chu trình, bỏ qua.`, { hiEdge: [u, v], rejected: true });
        row(u, v, w, false);
      }
    }
    snap(tree.length === g.n - 1 ? `Đủ ${g.n - 1} cạnh, cây khung nhỏ nhất có tổng ${total}.` : `Đồ thị không liên thông, chỉ có rừng khung tổng ${total}.`);
    const paper = { tables: [
      { title: "Bảng Kruskal", head: ["Bước", "Cạnh xét", "w", "Kết quả", "Tập cạnh T", "Tổng", "Các thành phần"], rows },
    ], note: `Cạnh sắp theo trọng số tăng dần: ${sorted.map(([u, v, w]) => `${u}-${v} (${w})`).join(", ")}. Cây khung: ${tree.map(([a, b]) => `${a}-${b}`).join(", ")}, tổng ${total}.` };
    return { steps, tree, total, paper };
  }

  // ---------- Prim ----------
  function prim(g, s) {
    const adj = adjacency(g);
    const inT = Array(g.n + 1).fill(false), key = Array(g.n + 1).fill(INF), p = Array(g.n + 1).fill(0);
    const order = [], tree = [], steps = [], rows = [];
    let total = 0;
    const snap = (msg, extra = {}) => steps.push({ msg, visited: copy(order), tree: tree.map(copy), dist: copy(key), parent: copy(p), total, ...extra });
    key[s] = 0;
    for (let it = 0; it < g.n; it++) {
      let u = 0;
      for (const v of range(g.n)) if (!inT[v] && key[v] < INF && (!u || key[v] < key[u])) u = v;
      if (!u) break;
      inT[u] = true;
      order.push(u);
      if (p[u]) {
        tree.push([p[u], u]);
        total += key[u];
        snap(`Chọn cạnh ${p[u]}-${u} (w = ${key[u]}), nhẹ nhất nối cây với bên ngoài. Thêm ${u}. Tổng = ${total}.`, { cur: u, hiEdge: [p[u], u] });
      } else {
        snap(`Bắt đầu cây từ đỉnh ${u}.`, { cur: u });
      }
      rows.push({ fixed: u, dist: copy(key), parent: copy(p), step: steps.length - 1, edge: p[u] ? `${p[u]}-${u}` : "–", total });
      for (const { v, w } of adj[u]) {
        if (!inT[v] && w < key[v]) {
          key[v] = w;
          p[v] = u;
        }
      }
      snap(`Cập nhật cạnh nhẹ nhất từ cây tới các đỉnh kề của ${u}.`, { cur: u });
    }
    snap(`Cây khung nhỏ nhất có tổng ${total}. Thứ tự thêm đỉnh: ${order.join(", ")}.`);
    const paper = { tables: [
      labelTable("Bảng Prim", g.n, rows, (r, v) => (r.dist[v] === INF ? "∞" : r.parent[v] ? `${r.dist[v]}, ${r.parent[v]}` : `${r.dist[v]}, –`), "Đỉnh thêm",
        [["Cạnh thêm", (r) => r.edge], ["Tổng", (r) => String(r.total)]]),
    ], note: `Mỗi ô ghi (trọng số cạnh nhẹ nhất nối với cây, đỉnh trong cây ở đầu kia). Dấu * là đỉnh được thêm vào cây. Cây khung: ${tree.map(([a, b]) => `${a}-${b}`).join(", ")}, tổng ${total}.` };
    return { steps, tree, total, order, paper };
  }

  // ---------- Floyd-Warshall ----------
  function floyd(g) {
    const n = g.n;
    const D = Array.from({ length: n + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => (i === j ? 0 : INF)));
    for (const [u, v, w = 1] of g.edges) {
      D[u][v] = Math.min(D[u][v], w);
      if (!g.directed) D[v][u] = Math.min(D[v][u], w);
    }
    // P[i][j]: đỉnh đứng ngay trước j trên đường đi ngắn nhất từ i (0 nếu chưa có đường)
    const P = Array.from({ length: n + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => (i !== j && D[i][j] < INF ? i : 0)));
    const steps = [], tables = [];
    const snap = (msg, extra = {}) => steps.push({ msg, matrix: D.map(copy), ...extra });
    const mtx = (name, M, k, ch, fmt) => ({ title: `${name}${superscript(k)}`, group: `k${k}`, head: ["", ...range(n).map(String)],
      rows: range(n).map((i) => ({ step: steps.length - 1, cells: [String(i), ...range(n).map((j) => cell(fmt(M[i][j]), ch.has(`${i},${j}`) ? "chg" : k && (i === k || j === k) ? "kcol" : ""))] })) });
    const both = (k, changed) => {
      const ch = new Set(changed.map(([i, j]) => `${i},${j}`));
      tables.push(mtx("D", D, k, ch, fmtD), mtx("P", P, k, ch, (x) => (x ? String(x) : "–")));
    };
    snap("Ma trận ban đầu D⁰: trọng số cạnh, ∞ nếu không có cạnh.");
    both(0, []);
    for (let k = 1; k <= n; k++) {
      const changed = [];
      for (let i = 1; i <= n; i++) for (let j = 1; j <= n; j++) {
        if (D[i][k] + D[k][j] < D[i][j]) {
          D[i][j] = D[i][k] + D[k][j];
          P[i][j] = P[k][j];
          changed.push([i, j]);
        }
      }
      snap(`Cho đi qua đỉnh ${k} (D${superscript(k)}): ${changed.length ? `cập nhật ${changed.length} ô.` : "không ô nào thay đổi."}`, { cur: k, k, changed });
      both(k, changed);
    }
    const paper = { tables, note: "D là độ dài đường đi ngắn nhất, P[i][j] là đỉnh đứng ngay trước j trên đường đi từ i. Ô tô đậm là ô vừa cập nhật theo công thức D[i][j] = D[i][k] + D[k][j], khi đó P[i][j] = P[k][j]; hàng và cột k được tô nhạt." };
    return { steps, matrix: D, pred: P, paper };
  }
  const superscript = (k) => String(k).split("").map((c) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[c]).join("");

  // ---------- Sắp xếp tô pô (Kahn) ----------
  function topo(g) {
    const adj = adjacency({ ...g, directed: true });
    const indeg = Array(g.n + 1).fill(0);
    for (const [, v] of g.edges) indeg[v]++;
    const order = [], steps = [], rows = [];
    const ready = () => range(g.n).filter((v) => indeg[v] === 0 && !order.includes(v));
    const snap = (msg, extra = {}) => steps.push({ msg, visited: copy(order), frontier: { label: "Đỉnh có bán bậc vào 0", items: ready() }, indeg: copy(indeg), tree: [], ...extra });
    const row = (u) => rows.push({ step: steps.length - 1, cells: [String(rows.length), u ? cell(u, "sel") : "–",
      ...range(g.n).map((v) => (order.includes(v) ? (v === u ? cell("–", "sel") : "–") : String(indeg[v]))), list(ready()), list(order)] });
    const done = (cyclic) => ({ steps, order, cyclic, paper: { tables: [
      { title: "Bảng sắp xếp tô pô (Kahn)", head: ["Bước", "Lấy ra", ...range(g.n).map((v) => `vào(${v})`), "Đỉnh có bán bậc vào 0", "Thứ tự L"], rows },
    ], note: cyclic ? "Còn đỉnh nhưng không đỉnh nào có bán bậc vào 0: đồ thị có chu trình, không sắp xếp tô pô được." : `Thứ tự tô pô: ${order.join(", ")}. Mỗi bước lấy đỉnh có bán bậc vào 0 số nhỏ nhất, xóa các cung đi ra và giảm bán bậc vào của đỉnh kề.` } });
    snap("Tính bán bậc vào của mọi đỉnh.");
    row(0);
    while (order.length < g.n) {
      const r = ready();
      if (!r.length) {
        snap("Không còn đỉnh có bán bậc vào 0 nhưng vẫn còn đỉnh: đồ thị có chu trình.");
        return done(true);
      }
      const u = r[0];
      order.push(u);
      for (const { v } of adj[u]) indeg[v]--;
      snap(`Lấy ${u} (bán bậc vào 0, số nhỏ nhất), xóa các cung đi ra từ ${u}.`, { cur: u });
      row(u);
    }
    snap(`Thứ tự tô pô: ${order.join(", ")}.`);
    return done(false);
  }

  // ---------- sinh đồ thị ngẫu nhiên ----------
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Đồ thị liên thông n đỉnh, m cạnh. distinct: trọng số khác nhau (cây khung nhỏ nhất duy nhất). dag: có hướng không chu trình.
  function randomGraph({ n = 6, m = 9, directed = false, dag = false, distinct = false, maxW = 9, seed = 1 } = {}) {
    const r = rng(seed);
    const int = (a, b) => a + Math.floor(r() * (b - a + 1));
    const perm = range(n);
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [perm[i], perm[j]] = [perm[j], perm[i]];
    }
    const has = new Set();
    const key = (u, v) => (directed || dag ? `${u}>${v}` : `${Math.min(u, v)}-${Math.max(u, v)}`);
    const pairs = [];
    const add = (a, b) => {
      // a, b là vị trí trong perm; với DAG cung luôn đi từ vị trí nhỏ tới vị trí lớn
      let u = perm[a], v = perm[b];
      if (dag && a > b) [u, v] = [v, u];
      else if (directed && !dag && r() < 0.5) [u, v] = [v, u];
      if (u === v || has.has(key(u, v)) || (!directed && !dag && has.has(key(v, u)))) return false;
      has.add(key(u, v));
      pairs.push([u, v]);
      return true;
    };
    for (let i = 1; i < n; i++) add(int(0, i - 1), i);
    const maxM = dag || !directed ? (n * (n - 1)) / 2 : n * (n - 1);
    let guard = 0;
    while (pairs.length < Math.min(m, maxM) && guard++ < 1000) add(int(0, n - 1), int(0, n - 1));
    let weights;
    if (distinct) {
      const pool = range(Math.max(maxW, pairs.length));
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(r() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      weights = pool.slice(0, pairs.length);
    } else weights = pairs.map(() => int(1, maxW));
    const edges = pairs.map(([u, v], i) => (directed || dag || u < v ? [u, v, weights[i]] : [v, u, weights[i]])).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    return { n, directed: directed || dag, edges };
  }

  // Đọc danh sách cạnh dạng "u v [w]" mỗi dòng (hoặc cách nhau bởi dấu phẩy).
  function parseGraph(text, directed = false) {
    const edges = [];
    let n = 0;
    for (const part of String(text).split(/[\n;,]+/)) {
      const t = part.trim();
      if (!t) continue;
      const nums = t.split(/[\s\-–>]+/).filter(Boolean).map(Number);
      if (nums.length < 2 || nums.length > 3 || nums.some((x) => !Number.isFinite(x))) throw new Error(`Không hiểu dòng "${t}". Viết dạng: u v trọng_số`);
      const [u, v, w = 1] = nums;
      if (!Number.isInteger(u) || !Number.isInteger(v) || u < 1 || v < 1) throw new Error(`Đỉnh phải là số nguyên từ 1: "${t}"`);
      edges.push([u, v, w]);
      n = Math.max(n, u, v);
    }
    if (!edges.length) throw new Error("Chưa có cạnh nào.");
    if (n > 12) throw new Error("Tối đa 12 đỉnh để còn vẽ và chạy tay được.");
    return { n, directed, edges };
  }

  const formatGraph = (g) => g.edges.map(([u, v, w]) => `${u} ${v} ${w}`).join("\n");

  // Kiểm tra một tập cạnh có phải cây khung nhỏ nhất không (để chấm khi có nhiều đáp án đúng).
  function isMST(g, picked) {
    const best = kruskal(g).total;
    if (picked.length !== g.n - 1) return false;
    const wOf = (u, v) => {
      const e = g.edges.find(([a, b]) => (a === u && b === v) || (a === v && b === u));
      return e ? e[2] : null;
    };
    const parent = range(g.n + 1).map((_, i) => i);
    const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
    let total = 0;
    for (const [u, v] of picked) {
      const w = wOf(u, v);
      if (w === null) return false;
      const a = find(u), b = find(v);
      if (a === b) return false;
      parent[a] = b;
      total += w;
    }
    return total === best;
  }

  const ALGOS = {
    bfs: { name: "BFS", needs: { source: true }, run: bfs, topic: "g-bfs" },
    dfs: { name: "DFS", needs: { source: true }, run: dfs, topic: "g-dfs" },
    dijkstra: { name: "Dijkstra", needs: { source: true, weighted: true }, run: dijkstra, topic: "g-dijkstra" },
    kruskal: { name: "Kruskal", needs: { weighted: true, undirected: true }, run: kruskal, topic: "g-mst" },
    prim: { name: "Prim", needs: { source: true, weighted: true, undirected: true }, run: prim, topic: "g-mst" },
    floyd: { name: "Floyd-Warshall", needs: { weighted: true }, run: floyd, topic: "g-floyd" },
    topo: { name: "Sắp xếp tô pô", needs: { directed: true }, run: topo, topic: "g-topo" },
  };

  const api = { INF, adjacency, bfs, dfs, dijkstra, kruskal, prim, floyd, topo, randomGraph, parseGraph, formatGraph, isMST, ALGOS, fmtD };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.GraphAlgo = api;
})(this);
