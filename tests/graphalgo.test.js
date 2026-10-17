const test = require("node:test");
const assert = require("node:assert");
const G = require("../js/graphalgo.js");

const sample = { n: 7, directed: false, edges: [[1, 2, 1], [1, 3, 1], [2, 4, 1], [2, 5, 1], [3, 6, 1], [5, 6, 1], [4, 7, 1]] };

test("BFS khớp bài tập mẫu trong tài liệu", () => {
  const r = G.bfs(sample, 1);
  assert.deepStrictEqual(r.order, [1, 2, 3, 4, 5, 6, 7]);
  assert.deepStrictEqual(r.dist.slice(1), [0, 1, 1, 2, 2, 2, 3]);
  assert.strictEqual(r.parent[7], 4);
});

test("DFS xét đỉnh kề theo thứ tự tăng", () => {
  assert.deepStrictEqual(G.dfs(sample, 1).order, [1, 2, 4, 7, 5, 6, 3]);
});

test("Dijkstra trên đồ thị có trọng số", () => {
  const g = { n: 5, directed: false, edges: [[1, 2, 4], [1, 3, 1], [3, 2, 2], [2, 4, 5], [3, 4, 8], [4, 5, 3]] };
  const r = G.dijkstra(g, 1);
  assert.deepStrictEqual(r.dist.slice(1), [0, 3, 1, 8, 11]);
  assert.deepStrictEqual(r.order, [1, 3, 2, 4, 5]);
  assert.strictEqual(r.parent[2], 3);
});

test("Kruskal, Prim cho cùng tổng; Floyd khớp Dijkstra; đồ thị ngẫu nhiên liên thông", () => {
  for (let seed = 1; seed <= 60; seed++) {
    const g = G.randomGraph({ n: 4 + (seed % 5), m: 6 + (seed % 6), seed });
    assert.strictEqual(G.bfs(g, 1).order.length, g.n, "không liên thông");
    const k = G.kruskal(g), p = G.prim(g, 1);
    assert.strictEqual(k.tree.length, g.n - 1);
    assert.strictEqual(k.total, p.total);
    assert.ok(G.isMST(g, k.tree) && G.isMST(g, p.tree));
    const F = G.floyd(g).matrix;
    for (let s = 1; s <= g.n; s++) assert.deepStrictEqual(F[s].slice(1), G.dijkstra(g, s).dist.slice(1));
  }
});

test("cây khung với trọng số khác nhau là duy nhất", () => {
  const g = G.randomGraph({ n: 6, m: 10, distinct: true, seed: 7 });
  assert.strictEqual(new Set(g.edges.map((e) => e[2])).size, g.edges.length);
  const t = G.kruskal(g).tree;
  assert.ok(!G.isMST(g, [...t.slice(1), g.edges.find(([u, v]) => !t.some(([a, b]) => (a === u && b === v) || (a === v && b === u))).slice(0, 2)]));
});

test("tô pô trên DAG ngẫu nhiên hợp lệ, phát hiện chu trình", () => {
  for (let seed = 1; seed <= 30; seed++) {
    const g = G.randomGraph({ n: 6, m: 8, dag: true, seed });
    const r = G.topo(g);
    assert.ok(!r.cyclic);
    const pos = {};
    r.order.forEach((v, i) => (pos[v] = i));
    for (const [u, v] of g.edges) assert.ok(pos[u] < pos[v]);
  }
  assert.ok(G.topo({ n: 3, directed: true, edges: [[1, 2], [2, 3], [3, 1]] }).cyclic);
});

test("đọc danh sách cạnh", () => {
  const g = G.parseGraph("1 2 5\n2-3 4, 3 1");
  assert.strictEqual(g.n, 3);
  assert.deepStrictEqual(g.edges, [[1, 2, 5], [2, 3, 4], [3, 1, 1]]);
  assert.throws(() => G.parseGraph("1 a"));
  assert.throws(() => G.parseGraph(""));
});
