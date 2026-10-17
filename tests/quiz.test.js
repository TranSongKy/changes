const test = require("node:test");
const assert = require("node:assert");
const LIB = require("../js/library.js");
const QUIZ = require("../js/quiz.js");

const isIndex = (i, n) => Number.isInteger(i) && i >= 0 && i < n;

test("mã câu hỏi không trùng và có dạng q-<chủ đề>-<số>", () => {
  const ids = QUIZ.map((q) => q.id);
  assert.strictEqual(new Set(ids).size, ids.length);
  for (const q of QUIZ) assert.match(q.id, new RegExp(`^q-${q.topic}-\\d+$`), q.id);
});

test("mọi câu hỏi gắn với một chủ đề có trong thư viện", () => {
  const topics = new Set(LIB.topics.map((t) => t.id));
  for (const q of QUIZ) assert.ok(topics.has(q.topic), `${q.id}: chủ đề ${q.topic} không tồn tại`);
});

test("mỗi chủ đề Đồ thị và OOP có ít nhất 3 câu hỏi", () => {
  for (const t of LIB.topics.filter((t) => t.subject === "graph" || t.subject === "oop")) {
    const n = QUIZ.filter((q) => q.topic === t.id).length;
    assert.ok(n >= 3, `${t.id}: chỉ có ${n} câu hỏi`);
  }
});

test("mọi câu hỏi có đề và lời giải thích", () => {
  for (const q of QUIZ) {
    assert.ok(typeof q.q === "string" && q.q.trim(), `${q.id}: thiếu đề`);
    assert.ok(typeof q.explain === "string" && q.explain.trim(), `${q.id}: thiếu giải thích`);
  }
});

test("đáp án đúng dạng theo từng loại câu hỏi", () => {
  for (const q of QUIZ) {
    switch (q.type) {
      case "mcq":
        assert.ok(Array.isArray(q.choices) && q.choices.length >= 3 && q.choices.length <= 5, `${q.id}: cần 3–5 lựa chọn`);
        assert.ok(isIndex(q.answer, q.choices.length), `${q.id}: chỉ số đáp án ngoài phạm vi`);
        break;
      case "multi":
        assert.ok(Array.isArray(q.choices) && q.choices.length >= 3, `${q.id}: cần ít nhất 3 lựa chọn`);
        assert.ok(Array.isArray(q.answer) && q.answer.length > 0, `${q.id}: đáp án rỗng`);
        q.answer.forEach((i, k) => {
          assert.ok(isIndex(i, q.choices.length), `${q.id}: chỉ số ${i} ngoài phạm vi`);
          if (k > 0) assert.ok(i > q.answer[k - 1], `${q.id}: đáp án phải tăng dần, không trùng`);
        });
        assert.match(q.q, /chọn tất cả đáp án đúng/, `${q.id}: đề cần ghi "(chọn tất cả đáp án đúng)"`);
        break;
      case "number":
        assert.ok(typeof q.answer === "number" && Number.isFinite(q.answer), `${q.id}: đáp án phải là số`);
        break;
      case "text":
        assert.ok(Array.isArray(q.answer) && q.answer.length > 0, `${q.id}: cần ít nhất một đáp án`);
        for (const a of q.answer) assert.ok(typeof a === "string" && a.trim(), `${q.id}: đáp án phải là chuỗi khác rỗng`);
        break;
      case "output":
        assert.ok(["cpp", "java"].includes(q.lang), `${q.id}: lang phải là cpp hoặc java`);
        assert.ok(typeof q.code === "string" && q.code.trim(), `${q.id}: thiếu code`);
        assert.ok(typeof q.answer === "string" && q.answer.trim(), `${q.id}: thiếu kết quả in ra`);
        if (q.lang === "java") assert.match(q.code, /public class Main\b/, `${q.id}: Java cần public class Main`);
        break;
      default:
        assert.fail(`${q.id}: loại câu hỏi không hợp lệ ${q.type}`);
    }
  }
});
