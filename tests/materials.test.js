const test = require("node:test");
const assert = require("node:assert");
const M = require("../js/materials.js");

// Tên file giống các tài liệu IELTS/HSK thường gặp (không chứa dữ liệu thật).
const names = [
  ["Cambridge ielts 5", "", "cambridge-5"],
  ["Cambridge 9.pdf", "", "cambridge-9"],
  ["115016_academic_reading_sample_task_-_matching_headings__2_.pdf", "IELTS Reading", "reading-matching-headings"],
  ["academic-reading-sample-task-diagram-label-completion.pdf", "IELTS Reading", "reading-diagram-label"],
  ["120430_academic_writing_-task_1b.pdf", "IELTS Writing", "writing-task1b"],
  ["120430_academic_writing_task_2a.pdf", "IELTS Writing", "writing-task2a"],
  ["ielts-writing-task-1-sample-pie-chart.pdf", "IELTS Writing", "writing-sample-pie-chart"],
  ["ielts-writing-task-1-sample-table.pdf", "IELTS Writing", "writing-sample-table"],
  ["ielts-buddy-ebook-task-1-excerpt.pdf", "IELTS Writing", "writing-buddy-task1"],
  ["ielts-made-easy-task-2-excerpts.pdf", "IELTS Writing", "writing-madeeasy-task2"],
  ["Writing_practice_test_1_IELTS_Academic_Model_Answers.pdf", "IELTS Writing", "writing-test1-answers"],
  ["New HSK Course 2 (HSK3.0).pdf", "NEW HSK 3.0", "hsk-course-2"],
  ["HSK 2.pdf", "", "hsk-vocab-2"],
  ["HSK 4 Words.pdf", "", "hsk-vocab-4"],
  ["HSK 7 9 word list.pdf", "", "hsk-vocab-7"],
  ["A4 田字格 (writing practice).pdf", "", "hsk-paper-tianzige"],
  ["A4 原稿纸 (essay practice).pdf", "", "hsk-paper-yuangaozhi"],
];

test("phân loại đúng từng loại tài liệu", () => {
  for (const [name, folder, key] of names) assert.strictEqual(M.classify(name, folder).key, key, name);
});

test("gộp file trên máy với link Drive, bỏ bản trùng", () => {
  const local = [
    { path: "ielts/cambridge/Cambridge 5.pdf", size: 10 },
    { path: "hsk/paper/A4 田字格 (writing practice).pdf", size: 5 },
  ];
  const inv = [
    { subject: "ielts", path: "", name: "Cambridge ielts 5", type: "pdf", size: 10, id: "AAA" },
    { subject: "hsk", path: "", name: "A4 田字格 (writing practice).pdf", type: "pdf", size: 5, id: "BBB" },
    { subject: "hsk", path: "", name: "A4 田字格 (writing practice).pdf", type: "pdf", size: 5, id: "CCC" },
    { subject: "hsk", path: "", name: "HSK 1 Words.pdf", type: "pdf", size: 7, id: "DDD" },
  ];
  const items = M.build(local, inv);
  assert.strictEqual(items.length, 3);
  const cam = items.find((x) => x.key === "cambridge-5");
  assert.strictEqual(cam.file, "materials/ielts/cambridge/Cambridge%205.pdf");
  assert.strictEqual(cam.drive, "https://drive.google.com/file/d/AAA/view");
  assert.strictEqual(items.find((x) => x.key === "hsk-paper-tianzige").drive, "https://drive.google.com/file/d/BBB/view");
  const v1 = items.find((x) => x.key === "hsk-vocab-1");
  assert.strictEqual(v1.file, null);
  assert.ok(v1.drive);
});

test("lịch đề Cambridge: mỗi thứ Bảy một đề, xong trước ngày thi", () => {
  const t = M.cambridgeSchedule([9, 5, 7, 6], "2027-12-01");
  assert.strictEqual(t.length, 16);
  assert.strictEqual(t[0].id, "c5t1");
  assert.strictEqual(t[15].id, "c9t4");
  assert.strictEqual(t[15].date, "2027-11-27");
  assert.strictEqual(t[0].date, "2027-08-14");
  for (const x of t) assert.strictEqual(new Date(x.date + "T00:00:00").getDay(), 6, x.date);
});

test("nhận audio Listening theo sách, đề, phần", () => {
  const c = (p) => M.classifyAudio(p);
  assert.deepStrictEqual(c("ielts/audio/Cambridge 7/Test 1/Part 2.mp3"), { book: 7, test: 1, part: 2 });
  assert.deepStrictEqual(c("ielts/audio/Cam7_Test1_Section3.mp3"), { book: 7, test: 1, part: 3 });
  assert.deepStrictEqual(c("ielts/audio/C9T4S1.mp3"), { book: 9, test: 4, part: 1 });
  assert.deepStrictEqual(c("ielts/audio/IELTS 5 - Test 2 - Part 4.m4a"), { book: 5, test: 2, part: 4 });
  assert.strictEqual(c("ielts/audio/song.mp3"), null);
  assert.strictEqual(c("ielts/cambridge/Cambridge 7.pdf"), null);
  const a = M.buildAudio([
    { path: "ielts/audio/Cambridge 7/Test 1/Part 2.mp3" },
    { path: "ielts/audio/Cambridge 7/Test 1/Part 1.mp3" },
    { path: "ielts/audio/song.mp3" },
  ]);
  assert.deepStrictEqual(Object.keys(a), ["c7t1"]);
  assert.deepStrictEqual(a.c7t1, ["materials/ielts/audio/Cambridge%207/Test%201/Part%201.mp3", "materials/ielts/audio/Cambridge%207/Test%201/Part%202.mp3"]);
});
