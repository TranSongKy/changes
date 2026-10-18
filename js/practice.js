// Chấm câu trả lời và lịch ôn lại câu sai (lặp lại ngắt quãng kiểu hộp Leitner).
(function (root) {
  // Số ngày tới lần ôn sau, theo hộp hiện tại. Sai thì về hộp 0 (ôn lại ngày mai).
  const INTERVALS = [1, 2, 4, 7, 15, 30];

  const addDays = (iso, n) => {
    const d = new Date(iso + "T00:00:00");
    d.setDate(d.getDate() + n);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const loose = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toLowerCase().replace(/[\s,;.\-–→>|]+/g, "");
  const outputNorm = (s) => String(s).replace(/\r\n?/g, "\n").split("\n").map((l) => l.replace(/\s+$/, "")).join("\n").trim();
  const toNumber = (s) => Number(String(s).trim().replace(/\s/g, "").replace(",", "."));

  // response: số thứ tự lựa chọn (mcq), mảng số thứ tự (multi), hoặc chuỗi người dùng gõ.
  function grade(q, response) {
    if (response === undefined || response === null || response === "") return false;
    switch (q.type) {
      case "mcq":
        return Number(response) === q.answer;
      case "multi": {
        const r = [...new Set([].concat(response).map(Number))].sort((a, b) => a - b);
        return r.length === q.answer.length && r.every((x, i) => x === q.answer[i]);
      }
      case "number": {
        const x = toNumber(response);
        return Number.isFinite(x) && Math.abs(x - q.answer) < 1e-9;
      }
      case "text":
        return [].concat(q.answer).some((a) => loose(a) === loose(response));
      case "output":
        return outputNorm(response) === outputNorm(q.answer);
      default:
        return false;
    }
  }

  // Cập nhật một mục trong sổ ôn tập sau một lần làm. item: { box, due, wrong, right, last } hoặc undefined.
  function review(item, correct, today) {
    const it = { box: 0, wrong: 0, right: 0, ...(item || {}) };
    if (correct) {
      it.right++;
      it.box = Math.min(it.box + 1, INTERVALS.length - 1);
    } else {
      it.wrong++;
      it.box = 0;
    }
    it.last = today;
    it.due = addDays(today, INTERVALS[it.box]);
    // Đúng ở lần ôn đầu tiên mà chưa từng sai thì không cần ôn nữa.
    if (correct && !it.wrong) it.due = null;
    return it;
  }

  // Các mục đến hạn ôn, hạn sớm nhất trước.
  function due(book, today) {
    return Object.entries(book || {})
      .filter(([, it]) => it.due && it.due <= today)
      .sort((a, b) => (a[1].due < b[1].due ? -1 : a[1].due > b[1].due ? 1 : 0))
      .map(([key, it]) => ({ key, ...it }));
  }

  // Thẻ từ vựng: 0 = quên (ôn lại ngày mai), 1 = khó (giữ hộp), 2 = nhớ (lên hộp).
  function reviewCard(item, grade, today) {
    const it = { box: 0, wrong: 0, right: 0, ...(item || {}) };
    if (grade === 0) {
      it.wrong++;
      it.box = 0;
    } else if (grade === 2) {
      it.right++;
      it.box = Math.min(it.box + 1, INTERVALS.length - 1);
    } else {
      it.right++;
    }
    it.last = today;
    it.due = addDays(today, INTERVALS[it.box]);
    return it;
  }

  // Đổi thanh điệu của pinyin có dấu, để làm phương án nhiễu khi luyện thanh điệu.
  const TONES = { a: "āáǎà", e: "ēéěè", i: "īíǐì", o: "ōóǒò", u: "ūúǔù", ü: "ǖǘǚǜ" };
  const MARKED = {};
  Object.entries(TONES).forEach(([v, ts]) => [...ts].forEach((c, i) => (MARKED[c] = [v, i])));
  const marks = (p) => [...p].map((c, i) => (MARKED[c] ? i : -1)).filter((i) => i >= 0);

  function retone(p, toneAt) {
    const chars = [...p];
    marks(p).forEach((idx, k) => {
      const [v] = MARKED[chars[idx]];
      if (toneAt[k] !== undefined) chars[idx] = TONES[v][toneAt[k]];
    });
    return chars.join("");
  }

  // n phương án (gồm đáp án đúng) khác nhau chỉ ở thanh điệu; rnd là hàm ngẫu nhiên trả về [0, 1).
  function toneOptions(p, n = 4, rnd = Math.random) {
    const m = marks(p);
    const opts = new Set([p]);
    let guard = 0;
    while (opts.size < n && m.length && guard++ < 200) {
      opts.add(retone(p, m.map(() => Math.floor(rnd() * 4))));
    }
    const list = [...opts];
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  const api = { INTERVALS, grade, review, due, loose, outputNorm, reviewCard, toneOptions, addDays };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Practice = api;
})(this);
