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
    while (q.length) {
      const u = q.shift();
      snap(`Lấy ${u} ra khỏi hàng đợi, xét các đỉnh kề của ${u}.`, { cur: u });
      for (const { v } of adj[u]) {
        if (d[v] !== INF) continue;
        d[v] = d[u] + 1;
        p[v] = u;
        order.push(v);
        tree.push([u, v]);
        q.push(v);
        snap(`Thăm ${v} từ ${u}: d[${v}] = ${d[v]}, trước[${v}] = ${u}, đưa ${v} vào hàng đợi.`, { cur: v, hiEdge: [u, v] });
      }
    }
    snap(`Hàng đợi rỗng, kết thúc. Thứ tự thăm: ${order.join(", ")}.`);
    return { steps, order, dist: d, parent: p };
  }

  // ---------- DFS (đệ quy) ----------
  function dfs(g, s) {
    const adj = adjacency(g);
    const seen = Array(g.n + 1).fill(false), p = Array(g.n + 1).fill(0);
    const order = [], tree = [], stack = [], steps = [];
    const snap = (msg, extra = {}) => steps.push({ msg, visited: copy(order), tree: tree.map(copy), frontier: { label: "Ngăn xếp đệ quy", items: copy(stack) }, parent: copy(p), ...extra });
    function visit(u) {
      seen[u] = true;
      order.push(u);
      stack.push(u);
      snap(p[u] ? `Đi từ ${p[u]} sang ${u}, thăm ${u}.` : `Bắt đầu thăm ${u}.`, { cur: u, hiEdge: p[u] ? [p[u], u] : null });
      for (const { v } of adj[u]) {
        if (seen[v]) continue;
        p[v] = u;
        tree.push([u, v]);
        visit(v);
        snap(`Quay lại ${u}.`, { cur: u });
      }
      stack.pop();
    }
    visit(s);
    snap(`Hết đỉnh để đi, kết thúc. Thứ tự thăm: ${order.join(", ")}.`);
    return { steps, order, parent: p };
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
      rows.push({ fixed: u, dist: copy(d), parent: copy(p) });
      snap(`Chọn ${u} (d nhỏ nhất trong các đỉnh chưa cố định, d[${u}] = ${d[u]}). Cố định ${u}.`, { cur: u });
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
    return { steps, order, dist: d, parent: p, rows };
  }

  // ---------- Kruskal ----------
  function kruskal(g) {
    const parent = range(g.n + 1).map((_, i) => i);
    const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
    const sorted = g.edges.map(([u, v, w]) => [Math.min(u, v), Math.max(u, v), w]).sort((a, b) => a[2] - b[2] || a[0] - b[0] || a[1] - b[1]);
    const tree = [], steps = [];
    let total = 0;
    const snap = (msg, extra = {}) => steps.push({ msg, tree: tree.map(copy), visited: [...new Set(tree.flat())], edgeList: sorted, total, ...extra });
    snap(`Sắp xếp ${sorted.length} cạnh theo trọng số tăng dần, xét lần lượt.`);
    for (const [u, v, w] of sorted) {
      if (tree.length === g.n - 1) break;
      const a = find(u), b = find(v);
      if (a !== b) {
        parent[a] = b;
        tree.push([u, v]);
        total += w;
        snap(`Cạnh ${u}-${v} (w = ${w}) nối hai thành phần khác nhau, chọn. Tổng = ${total}.`, { hiEdge: [u, v], picked: true });
      } else {
        snap(`Cạnh ${u}-${v} (w = ${w}) tạo chu trình, bỏ qua.`, { hiEdge: [u, v], rejected: true });
      }
    }
    snap(tree.length === g.n - 1 ? `Đủ ${g.n - 1} cạnh, cây khung nhỏ nhất có tổng ${total}.` : `Đồ thị không liên thông, chỉ có rừng khung tổng ${total}.`);
    return { steps, tree, total };
  }

  // ---------- Prim ----------
  function prim(g, s) {
    const adj = adjacency(g);
    const inT = Array(g.n + 1).fill(false), key = Array(g.n + 1).fill(INF), p = Array(g.n + 1).fill(0);
    const order = [], tree = [], steps = [];
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
      for (const { v, w } of adj[u]) {
        if (!inT[v] && w < key[v]) {
          key[v] = w;
          p[v] = u;
        }
      }
      snap(`Cập nhật cạnh nhẹ nhất từ cây tới các đỉnh kề của ${u}.`, { cur: u });
    }
    snap(`Cây khung nhỏ nhất có tổng ${total}. Thứ tự thêm đỉnh: ${order.join(", ")}.`);
    return { steps, tree, total, order };
  }

  // ---------- Floyd-Warshall ----------
  function floyd(g) {
    const n = g.n;
    const D = Array.from({ length: n + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => (i === j ? 0 : INF)));
    for (const [u, v, w = 1] of g.edges) {
      D[u][v] = Math.min(D[u][v], w);
      if (!g.directed) D[v][u] = Math.min(D[v][u], w);
    }
    const steps = [];
    const snap = (msg, extra = {}) => steps.push({ msg, matrix: D.map(copy), ...extra });
    snap("Ma trận ban đầu D⁰: trọng số cạnh, ∞ nếu không có cạnh.");
    for (let k = 1; k <= n; k++) {
      const changed = [];
      for (let i = 1; i <= n; i++) for (let j = 1; j <= n; j++) {
        if (D[i][k] + D[k][j] < D[i][j]) {
          D[i][j] = D[i][k] + D[k][j];
          changed.push([i, j]);
        }
      }
      snap(`Cho đi qua đỉnh ${k} (D${superscript(k)}): ${changed.length ? `cập nhật ${changed.length} ô.` : "không ô nào thay đổi."}`, { cur: k, k, changed });
    }
    return { steps, matrix: D };
  }
  const superscript = (k) => String(k).split("").map((c) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[c]).join("");

  // ---------- Sắp xếp tô pô (Kahn) ----------
  function topo(g) {
    const adj = adjacency({ ...g, directed: true });
    const indeg = Array(g.n + 1).fill(0);
    for (const [, v] of g.edges) indeg[v]++;
    const order = [], steps = [];
    const ready = () => range(g.n).filter((v) => indeg[v] === 0 && !order.includes(v));
    const snap = (msg, extra = {}) => steps.push({ msg, visited: copy(order), frontier: { label: "Đỉnh có bán bậc vào 0", items: ready() }, indeg: copy(indeg), tree: [], ...extra });
    snap("Tính bán bậc vào của mọi đỉnh.");
    while (order.length < g.n) {
      const r = ready();
      if (!r.length) {
        snap("Không còn đỉnh có bán bậc vào 0 nhưng vẫn còn đỉnh: đồ thị có chu trình.");
        return { steps, order, cyclic: true };
      }
      const u = r[0];
      order.push(u);
      for (const { v } of adj[u]) indeg[v]--;
      snap(`Lấy ${u} (bán bậc vào 0, số nhỏ nhất), xóa các cung đi ra từ ${u}.`, { cur: u });
    }
    snap(`Thứ tự tô pô: ${order.join(", ")}.`);
    return { steps, order, cyclic: false };
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
