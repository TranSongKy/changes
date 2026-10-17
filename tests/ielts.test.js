const test = require("node:test");
const assert = require("node:assert");
const I = require("../js/ielts.js");

test("quy đổi điểm thô ra band", () => {
  assert.strictEqual(I.bandFromRaw("Listening", 40), 9);
  assert.strictEqual(I.bandFromRaw("Listening", 30), 7);
  assert.strictEqual(I.bandFromRaw("Listening", 29), 6.5);
  assert.strictEqual(I.bandFromRaw("Reading", 30), 7);
  assert.strictEqual(I.bandFromRaw("Reading", 32), 7);
  assert.strictEqual(I.bandFromRaw("Reading", 33), 7.5);
  assert.strictEqual(I.bandFromRaw("Reading", 0), 0);
  assert.strictEqual(I.rawForBand("Listening", 7), 30);
  assert.strictEqual(I.rawForBand("Reading", 6.5), 27);
  // band không giảm khi số câu đúng tăng
  for (const k of ["Listening", "Reading"]) for (let r = 1; r <= 40; r++) assert.ok(I.bandFromRaw(k, r) >= I.bandFromRaw(k, r - 1));
});

test("đếm từ và band Writing", () => {
  assert.strictEqual(I.wordCount("The chart shows a rise in 2010, while it's well-known."), 10);
  assert.strictEqual(I.writingBand({ TA: 6, CC: 6.5, LR: 6, GRA: 6 }), 6);
  assert.strictEqual(I.writingBand({ TA: 7, CC: 7, LR: 6.5, GRA: 6.5 }), 6.5);
  assert.strictEqual(I.writingBand({ TA: 7 }), null);
  const c = I.CRITERIA[0].checks;
  assert.strictEqual(I.criterionBand(c, [0, 1, 2, 3]), 7);
  assert.strictEqual(I.criterionBand(c, [0, 1]), 6);
  assert.strictEqual(I.criterionBand(c, [0]), 5.5);
  assert.strictEqual(I.criterionBand(c, []), 5);
});

test("đề Speaking đủ 4 gợi ý", () => {
  assert.ok(I.CUE_CARDS.length >= 20);
  for (const [t, b] of I.CUE_CARDS) assert.ok(t.startsWith("Describe") && b.length === 4);
});
