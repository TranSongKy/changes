const test = require("node:test");
const assert = require("node:assert");
const P = require("../js/practice.js");

test("chấm từng dạng câu hỏi", () => {
  assert.ok(P.grade({ type: "mcq", answer: 2 }, "2"));
  assert.ok(!P.grade({ type: "mcq", answer: 2 }, 1));
  assert.ok(P.grade({ type: "multi", answer: [0, 2] }, [2, 0]));
  assert.ok(!P.grade({ type: "multi", answer: [0, 2] }, [0]));
  assert.ok(P.grade({ type: "number", answer: 12 }, " 12 "));
  assert.ok(P.grade({ type: "number", answer: 2.5 }, "2,5"));
  assert.ok(!P.grade({ type: "number", answer: 12 }, ""));
  assert.ok(P.grade({ type: "text", answer: ["1,2,4,3"] }, "1 2 4 3"));
  assert.ok(P.grade({ type: "text", answer: ["1,2,4,3"] }, "1 → 2 → 4 → 3"));
  assert.ok(P.grade({ type: "text", answer: ["Đa hình"] }, "da hinh"));
  assert.ok(P.grade({ type: "output", answer: "A\nB" }, "A  \r\nB\n"));
  assert.ok(!P.grade({ type: "output", answer: "A\nB" }, "AB"));
});

test("ôn lại: sai thì mai ôn, đúng thì giãn dần", () => {
  let it = P.review(undefined, false, "2026-10-18");
  assert.strictEqual(it.due, "2026-10-19");
  it = P.review(it, true, "2026-10-19");
  assert.strictEqual(it.due, "2026-10-21");
  it = P.review(it, true, "2026-10-21");
  assert.strictEqual(it.due, "2026-10-25");
  it = P.review(it, false, "2026-10-25");
  assert.strictEqual(it.box, 0);
  assert.strictEqual(it.due, "2026-10-26");
  assert.strictEqual(P.review(undefined, true, "2026-10-18").due, null);
});

test("danh sách đến hạn", () => {
  const book = { a: { due: "2026-10-20" }, b: { due: "2026-10-18" }, c: { due: "2026-11-01" }, d: { due: null } };
  assert.deepStrictEqual(P.due(book, "2026-10-20").map((x) => x.key), ["b", "a"]);
});
