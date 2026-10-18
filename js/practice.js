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

  const api = { INTERVALS, grade, review, due, loose, outputNorm };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Practice = api;
})(this);
