const test = require("node:test");
const assert = require("node:assert");
const L = require("../js/logic.js");
const PLAN = require("../js/data.js");

const { exam30Start: start, exam30End: end } = PLAN.defaults;

test("lịch 30 ngày khớp từ ngày bắt đầu tới ngày thi", () => {
  assert.strictEqual(PLAN.days30.length, 30);
  assert.strictEqual(L.addDays(start, 29), end);
});

test("không trễ thì giữ nguyên lịch gốc", () => {
  const r = L.reschedule30(PLAN.days30, {}, start, end, start);
  assert.strictEqual(r.overdue, 0);
  assert.strictEqual(r.schedule[start].length, 2);
  assert.ok(Object.values(r.schedule).flat().every((t) => !t.moved));
});

test("việc trễ được dời và không mất việc nào", () => {
  const today = L.addDays(start, 5); // bỏ lỡ 5 ngày đầu
  const r = L.reschedule30(PLAN.days30, {}, start, end, today);
  assert.strictEqual(r.overdue, 10);
  const future = Object.entries(r.schedule).filter(([d]) => d >= today).flatMap(([, ts]) => ts);
  const ids = new Set(future.map((t) => t.id));
  for (let i = 1; i <= 30; i++) {
    assert.ok(ids.has(`g${i}`), `thiếu g${i}`);
    assert.ok(ids.has(`o${i}`), `thiếu o${i}`);
  }
  // Ngày nghỉ cuối giữ nguyên, không bị dồn việc.
  assert.deepStrictEqual(r.schedule[end].map((t) => t.id).sort(), ["g30", "o30"]);
  assert.ok(r.maxPerDay >= 2);
});

test("việc đã xong không bị dời", () => {
  const today = L.addDays(start, 2);
  const r = L.reschedule30(PLAN.days30, { g1: true, o1: true, g2: true }, start, end, today);
  assert.strictEqual(r.overdue, 1);
  const future = Object.entries(r.schedule).filter(([d]) => d >= today).flatMap(([, ts]) => ts);
  assert.ok(!future.some((t) => t.id === "g1" || t.id === "g2"));
  assert.ok(future.some((t) => t.id === "o2" && t.moved));
});

test("làm tròn band IELTS theo quy tắc chính thức", () => {
  assert.strictEqual(L.ieltsOverall(6.5, 6.5, 5.5, 6.5), 6.5); // 6.25 -> 6.5
  assert.strictEqual(L.ieltsOverall(6.5, 7, 6.5, 7), 7); // 6.75 -> 7.0
  assert.strictEqual(L.ieltsOverall(6, 6, 6, 6.5), 6); // 6.125 -> 6.0
  assert.strictEqual(L.ieltsOverall(6, 6.5, 6.5, 6.5), 6.5); // 6.375 -> 6.5
});

test("giờ IELTS dồn về kỹ năng yếu nhất", () => {
  const r = L.ieltsFocus({ Listening: 6, Reading: 6.5, Writing: 5, Speaking: 5.5 }, 7, 13);
  assert.strictEqual(r.weakest, "Writing");
  assert.ok(r.hours.Writing > r.hours.Reading);
  const sum = Object.values(r.hours).reduce((a, b) => a + b, 0);
  assert.ok(Math.abs(sum - 13) < 0.3);
});

test("dự báo IELTS cho biết có kịp hay không", () => {
  const base = { currentBand: 4.5, target: 7, hoursPerBand: 250, today: "2026-11-17", exam: "2027-12-01" };
  assert.ok(L.ieltsProjection({ ...base, weeklyHours: 13 }).onTrack);
  assert.ok(!L.ieltsProjection({ ...base, weeklyHours: 5 }).onTrack);
});

test("dự báo HSK tính số từ mỗi ngày", () => {
  const r = L.hskProjection({ knownWords: 300, targetLevel: 4, levels: PLAN.hskStandards["2.0"].levels, today: "2027-03-01", exam: "2028-04-15" });
  assert.strictEqual(r.level, 2);
  assert.strictEqual(r.remaining, 900);
  assert.ok(r.perDay > 1.5 && r.perDay < 2.5);
});

test("chuẩn HSK 3.0: HSK 4 cần khoảng 6 từ mỗi ngày từ lúc bắt đầu", () => {
  const std = PLAN.hskStandards["3.0"];
  const r = L.hskProjection({ knownWords: 50, targetLevel: 4, levels: std.levels, today: "2026-11-17", exam: "2028-04-15" });
  assert.strictEqual(r.targetWords, 3245);
  assert.ok(r.perDay > 5.5 && r.perDay < 7);
});

test("giai đoạn HSK của cả hai chuẩn liền nhau và số từ tăng dần", () => {
  for (const [k, std] of Object.entries(PLAN.hskStandards)) {
    std.phases.forEach((p, i) => {
      if (i > 0) {
        assert.strictEqual(L.addDays(std.phases[i - 1].to, 1), p.from, `${k}: giai đoạn ${p.id} không nối tiếp`);
        assert.ok(p.words > std.phases[i - 1].words, `${k}: số từ giai đoạn ${p.id} không tăng`);
      }
    });
    assert.ok(std.levels.some((l) => l.level === PLAN.defaults.hskTargetLevel), `${k}: không có cấp mục tiêu mặc định`);
  }
});

test("tổng tuần và chuỗi ngày học", () => {
  const logs = [
    { date: "2026-11-16", subject: "ielts", minutes: 60 }, // thứ 2
    { date: "2026-11-18", subject: "ielts", minutes: 30 },
    { date: "2026-11-18", subject: "hsk", minutes: 45 },
    { date: "2026-11-17", subject: "hsk", minutes: 20 },
    { date: "2026-11-23", subject: "ielts", minutes: 90 }, // tuần sau
  ];
  const w = L.weeklyTotals(logs, "2026-11-19");
  assert.strictEqual(w.from, "2026-11-16");
  assert.deepStrictEqual(w.totals, { ielts: 90, hsk: 65 });
  assert.strictEqual(L.streak(logs, "2026-11-18"), 3);
  assert.strictEqual(L.streak(logs, "2026-11-19"), 3);
  assert.strictEqual(L.streak(logs, "2026-11-21"), 0);
});
