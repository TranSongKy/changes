// Phân loại tài liệu PDF của bạn (sách Cambridge, đề mẫu Reading/Writing, giáo trình và từ vựng HSK).
// File này chỉ chứa quy tắc phân loại; danh sách file thật nằm trong materials/library-data.js
// (tạo bằng `npm run materials`, không đưa lên GitHub).
(function (root) {
  const READING_TYPES = [
    [/matching[_\s-]*information/i, "matching-information", "Matching Information", "Nối thông tin với đoạn văn"],
    [/matching[_\s-]*features/i, "matching-features", "Matching Features", "Nối đặc điểm với người hoặc vật"],
    [/matching[_\s-]*headings/i, "matching-headings", "Matching Headings", "Chọn tiêu đề cho đoạn"],
    [/table[_\s-]*completion/i, "table-completion", "Table Completion", "Điền bảng"],
    [/diagram[_\s-]*label/i, "diagram-label", "Diagram Label Completion", "Điền chú thích sơ đồ"],
    [/multiple[_\s-]*choice/i, "multiple-choice", "Multiple Choice", "Trắc nghiệm"],
  ];

  const WRITING_SAMPLES = [
    [/bar[_\s-]*chart/i, "bar-chart", "Biểu đồ cột"],
    [/pie[_\s-]*chart/i, "pie-chart", "Biểu đồ tròn"],
    [/map/i, "map", "Bản đồ"],
    [/process/i, "process", "Quy trình"],
    [/table/i, "table", "Bảng số liệu"],
  ];

  // Trả về thông tin phân loại cho một file, hoặc null nếu không phải PDF.
  function classify(name, folder = "") {
    const base = String(name).replace(/\.pdf$/i, "");
    const where = `${folder} ${base}`;
    let m;

    if ((m = base.match(/cambridge\D*(\d+)/i))) {
      const book = Number(m[1]);
      return { key: `cambridge-${book}`, subject: "ielts", cat: "cambridge", book, title: `Cambridge IELTS ${book}` };
    }
    if (/reading/i.test(where)) {
      const t = READING_TYPES.find(([re]) => re.test(base));
      if (t) return { key: `reading-${t[1]}`, subject: "ielts", cat: "reading", qtype: t[1], title: `Reading: ${t[2]}`, note: t[3] };
    }
    if (/writing|ielts-buddy|made-easy/i.test(where)) {
      if ((m = base.match(/task[_\s-]*([12])([ab])/i))) {
        const task = Number(m[1]);
        return { key: `writing-task${task}${m[2].toLowerCase()}`, subject: "ielts", cat: "writing", task, kind: "guide",
          title: `Academic Writing Task ${task} (${m[2].toUpperCase()})`, note: "Đề mẫu kèm hướng dẫn chấm" };
      }
      if (/sample/i.test(base)) {
        const s = WRITING_SAMPLES.find(([re]) => re.test(base));
        if (s) return { key: `writing-sample-${s[1]}`, subject: "ielts", cat: "writing", task: 1, kind: "sample",
          title: `Task 1 bài mẫu: ${s[2]}`, note: "Đề và bài mẫu" };
      }
      if (/buddy/i.test(base)) return { key: "writing-buddy-task1", subject: "ielts", cat: "writing", task: 1, kind: "book", title: "IELTS Buddy: Task 1 (trích sách)", note: "Cách mô tả từng dạng biểu đồ" };
      if (/made[_\s-]*easy/i.test(base)) return { key: "writing-madeeasy-task2", subject: "ielts", cat: "writing", task: 2, kind: "book", title: "IELTS Made Easy: Task 2 (trích sách)", note: "Dạng đề và cách lập dàn ý" };
      if (/practice[_\s-]*test[_\s-]*(\d+)/i.test(base)) {
        const n = base.match(/practice[_\s-]*test[_\s-]*(\d+)/i)[1];
        const ans = /answer/i.test(base);
        return { key: `writing-test${n}-${ans ? "answers" : "questions"}`, subject: "ielts", cat: "writing", task: 0, kind: "test",
          title: `Writing Practice Test ${n}: ${ans ? "bài mẫu" : "đề"}`, note: ans ? "Bài mẫu cho cả Task 1 và Task 2" : "Một đề đầy đủ Task 1 + Task 2" };
      }
    }
    if ((m = base.match(/hsk\s*course\s*(\d)/i))) {
      const book = Number(m[1]);
      return { key: `hsk-course-${book}`, subject: "hsk", cat: "course", book, title: `New HSK Course ${book} (HSK 3.0)` };
    }
    if (/田字格/.test(base)) return { key: "hsk-paper-tianzige", subject: "hsk", cat: "paper", title: "Giấy 田字格 luyện viết chữ", note: "In ra để tập viết đúng thứ tự nét" };
    if (/原稿纸/.test(base)) return { key: "hsk-paper-yuangaozhi", subject: "hsk", cat: "paper", title: "Giấy 原稿纸 viết đoạn văn", note: "Dùng cho phần viết HSK 4 trở lên" };
    if ((m = base.match(/hsk\s*7\D{0,3}9/i))) return { key: "hsk-vocab-7", subject: "hsk", cat: "vocab", level: 7, title: "Từ vựng HSK 7–9" };
    if ((m = base.match(/hsk\s*(\d)/i))) {
      const level = Number(m[1]);
      return { key: `hsk-vocab-${level}`, subject: "hsk", cat: "vocab", level, title: `Từ vựng HSK ${level}` };
    }
    const subject = /hsk|中文|汉语/i.test(where) ? "hsk" : "ielts";
    return { key: `other-${base.toLowerCase().replace(/\s+/g, "-")}`, subject, cat: "other", title: base };
  }

  // local: [{ path: "ielts/cambridge/Cambridge 5.pdf", size }] (đường dẫn tương đối trong materials/)
  // inventory: [{ subject, path, name, size, id }] (danh sách trên Google Drive)
  function build(local, inventory) {
    const items = new Map();
    const encode = (p) => p.split("/").map(encodeURIComponent).join("/");
    for (const f of local || []) {
      const parts = f.path.split("/");
      const name = parts.pop();
      if (!/\.pdf$/i.test(name)) continue;
      const c = classify(name, parts.join("/"));
      if (items.has(c.key)) continue;
      items.set(c.key, { ...c, file: "materials/" + encode(f.path), size: f.size || null, drive: null });
    }
    for (const d of inventory || []) {
      if (d.type && d.type !== "pdf") continue;
      const c = classify(d.name, `${d.subject || ""} ${d.path || ""}`);
      const url = d.id ? `https://drive.google.com/file/d/${d.id}/view` : null;
      const cur = items.get(c.key);
      if (cur) {
        if (!cur.drive) cur.drive = url;
      } else {
        items.set(c.key, { ...c, file: null, size: d.size || null, drive: url });
      }
    }
    const order = { cambridge: 1, reading: 2, writing: 3, course: 4, vocab: 5, paper: 6, other: 9 };
    return [...items.values()].sort((a, b) =>
      (order[a.cat] - order[b.cat]) || ((a.book || a.level || 0) - (b.book || b.level || 0)) || (a.title < b.title ? -1 : 1));
  }

  // File audio Listening: nhận sách, đề, phần từ đường dẫn, ví dụ "Cambridge 7/Test 1/Part 2.mp3",
  // "Cam7_Test1_Section2.mp3" hoặc "C7T1S2.mp3". Trả về null nếu không đọc ra đủ ba số.
  const AUDIO_EXT = /\.(mp3|m4a|aac|wav|ogg|oga|opus|wma)$/i;
  function classifyAudio(relPath) {
    if (!AUDIO_EXT.test(relPath)) return null;
    const p = relPath.replace(AUDIO_EXT, "").replace(/[\\]/g, "/");
    let m = p.match(/(?:^|[^a-z])c(\d{1,2})[\s_-]*t(\d)[\s_-]*(?:s|p)(\d)(?!\d)/i);
    if (m) return { book: Number(m[1]), test: Number(m[2]), part: Number(m[3]) };
    const book = p.match(/(?:cambridge|cam|ielts)\D{0,3}(\d{1,2})(?!\d)/i);
    const test = p.match(/test\D{0,3}(\d)(?!\d)/i);
    const part = p.match(/(?:part|section|sec|phần)\D{0,3}(\d)(?!\d)/i);
    if (!book || !test || !part) return null;
    return { book: Number(book[1]), test: Number(test[1]), part: Number(part[1]) };
  }

  // local: [{ path, size }] trong materials/. Trả về { "c7t1": ["materials/...Part 1.mp3", ...] } theo thứ tự phần.
  function buildAudio(local) {
    const encode = (p) => p.split("/").map(encodeURIComponent).join("/");
    const out = {};
    for (const f of local || []) {
      const c = classifyAudio(f.path);
      if (!c || c.part < 1 || c.part > 4) continue;
      const id = `c${c.book}t${c.test}`;
      out[id] = out[id] || [];
      if (!out[id][c.part - 1]) out[id][c.part - 1] = "materials/" + encode(f.path);
    }
    for (const id of Object.keys(out)) out[id] = out[id].filter(Boolean);
    return out;
  }

  // Mỗi sách Cambridge có 4 đề. Xếp đề vào các thứ Bảy trước ngày thi IELTS, đề cuối cách ngày thi ít nhất `gap` ngày.
  function cambridgeSchedule(books, exam, gap = 3) {
    const tests = [];
    [...books].sort((a, b) => a - b).forEach((b) => [1, 2, 3, 4].forEach((t) => tests.push({ id: `c${b}t${t}`, book: b, test: t })));
    const e = new Date(exam + "T00:00:00");
    e.setDate(e.getDate() - gap);
    e.setDate(e.getDate() - ((e.getDay() + 1) % 7)); // lùi về thứ Bảy gần nhất
    const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    for (let i = tests.length - 1; i >= 0; i--) {
      tests[i].date = iso(e);
      e.setDate(e.getDate() - 7);
    }
    return tests;
  }

  const api = { classify, build, classifyAudio, buildAudio, cambridgeSchedule, READING_TYPES };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Materials = api;
})(this);
