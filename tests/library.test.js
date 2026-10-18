const test = require("node:test");
const assert = require("node:assert");
const LIB = require("../js/library.js");
const PLAN = require("../js/data.js");

test("mỗi ngày học trong lịch 30 ngày có tài liệu cho cả Đồ thị và OOP", () => {
  PLAN.days30.forEach((d, i) => {
    if (d.rest) return;
    for (const subject of ["graph", "oop"]) {
      const n = LIB.topics.filter((t) => t.subject === subject && (t.days || []).includes(i + 1)).length;
      assert.ok(n >= 1, `ngày ${i + 1} thiếu tài liệu ${subject}`);
    }
  });
});

test("mã chủ đề không trùng và mỗi chủ đề có lý thuyết, bài tập có đáp án", () => {
  const ids = LIB.topics.map((t) => t.id);
  assert.strictEqual(new Set(ids).size, ids.length);
  for (const t of LIB.topics) {
    assert.ok(LIB.subjects[t.subject], `${t.id}: môn không hợp lệ`);
    assert.ok(t.theory.length > 0, `${t.id}: thiếu lý thuyết`);
    assert.ok(t.exercises.length > 0, `${t.id}: thiếu bài tập`);
    t.exercises.forEach((e, i) => assert.ok(e.q && e.a, `${t.id} bài ${i + 1}: thiếu câu hỏi hoặc đáp án`));
  }
});

test("mọi kỹ năng trong buổi IELTS mẫu và mọi giai đoạn HSK đều có tài liệu", () => {
  const skills = new Set();
  Object.values(PLAN.ieltsWeek).forEach((week) => Object.values(week).forEach((day) => day.forEach((it) => skills.add(it[0]))));
  for (const s of skills) assert.ok(LIB.topics.some((t) => (t.skills || []).includes(s)), `thiếu tài liệu IELTS cho ${s}`);
  for (const p of PLAN.hskStandards["3.0"].phases) assert.ok(LIB.topics.some((t) => (t.phases || []).includes(p.id)), `thiếu tài liệu HSK giai đoạn ${p.id}`);
});

test("liên kết tài liệu đều dùng https", () => {
  const all = [...Object.values(LIB.subjects).flatMap((s) => s.resources), ...LIB.topics.flatMap((t) => t.resources || [])];
  for (const r of all) if (r.url) assert.match(r.url, /^https:\/\//, r.name);
});
