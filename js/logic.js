// Các hàm tính toán thuần (không đụng DOM) để kiểm thử được bằng Node.
(function (root) {
  const DAY = 86400000;

  function parseDate(s) {
    const [y, m, d] = s.split("-").map(Number);
    return new Date(y, m - 1, d, 12);
  }

  function isoDate(d) {
    const p = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }

  function addDays(s, n) {
    const d = parseDate(s);
    d.setDate(d.getDate() + n);
    return isoDate(d);
  }

  function daysBetween(a, b) {
    return Math.round((parseDate(b) - parseDate(a)) / DAY);
  }

  function weekStart(s) {
    const d = parseDate(s);
    const shift = (d.getDay() + 6) % 7; // thứ 2 là đầu tuần
    return addDays(s, -shift);
  }

  // Lịch 30 ngày: mỗi ngày có 2 việc g<n> (Đồ thị) và o<n> (OOP).
  function tasks30(days, start) {
    const out = [];
    days.forEach((d, i) => {
      const date = addDays(start, i);
      out.push({ id: `g${i + 1}`, subject: "graph", text: d.graph, day: i + 1, date, rest: !!d.rest });
      out.push({ id: `o${i + 1}`, subject: "oop", text: d.oop, day: i + 1, date, rest: !!d.rest });
    });
    return out;
  }

  // Dời các việc chưa xong sang những ngày còn lại trước ngày thi.
  // Trả về { schedule: {date: [task]}, overdue, maxPerDay }.
  function reschedule30(days, done, start, end, today) {
    const all = tasks30(days, start);
    const schedule = {};
    const add = (date, t) => (schedule[date] = schedule[date] || []).push(t);
    const overdue = all.filter((t) => !t.rest && !done[t.id] && t.date < today);

    if (overdue.length === 0 || today > end) {
      all.forEach((t) => add(t.date, { ...t, moved: false }));
      return { schedule, overdue: overdue.length, maxPerDay: 1 };
    }

    // Ngày đã qua giữ nguyên lịch sử; ngày nghỉ giữ nguyên vị trí.
    all.filter((t) => t.date < today).forEach((t) => add(t.date, { ...t, moved: false }));
    all.filter((t) => t.rest && t.date >= today).forEach((t) => add(t.date, { ...t, moved: false }));

    const restDates = new Set(all.filter((t) => t.rest).map((t) => t.date));
    const slots = [];
    for (let d = today; d <= end; d = addDays(d, 1)) if (!restDates.has(d)) slots.push(d);
    if (slots.length === 0) slots.push(end);

    let maxPerDay = 1;
    for (const subject of ["graph", "oop"]) {
      const pending = all.filter((t) => t.subject === subject && !t.rest && !done[t.id]);
      const n = pending.length;
      const m = slots.length;
      for (let j = 0; j < m; j++) {
        const chunk = pending.slice(Math.floor((j * n) / m), Math.floor(((j + 1) * n) / m));
        maxPerDay = Math.max(maxPerDay, chunk.length);
        chunk.forEach((t) => add(slots[j], { ...t, moved: t.date !== slots[j] }));
      }
    }
    // Việc đã xong ở các ngày tới vẫn hiện đúng ngày gốc.
    all.filter((t) => !t.rest && done[t.id] && t.date >= today).forEach((t) => add(t.date, { ...t, moved: false }));
    return { schedule, overdue: overdue.length, maxPerDay };
  }

  // Làm tròn band IELTS: .25 lên .5, .75 lên band kế tiếp.
  function ieltsOverall(l, r, w, s) {
    const avg = (l + r + w + s) / 4;
    return Math.floor(avg * 2 + 0.5) / 2;
  }

  const SKILLS = ["Listening", "Reading", "Writing", "Speaking"];

  // Chia giờ IELTS mỗi tuần theo khoảng cách tới mục tiêu của từng kỹ năng.
  function ieltsFocus(scores, target, weeklyHours) {
    const weights = SKILLS.map((k) => Math.max(target - scores[k], 0) + 0.25);
    const sum = weights.reduce((a, b) => a + b, 0);
    const hours = {};
    SKILLS.forEach((k, i) => (hours[k] = Math.round((weeklyHours * weights[i] * 10) / sum) / 10));
    const weakest = SKILLS.reduce((a, b) => (scores[b] < scores[a] ? b : a));
    return { hours, weakest };
  }

  function ieltsProjection({ currentBand, target, hoursPerBand, weeklyHours, today, exam }) {
    const hoursNeeded = Math.max(target - currentBand, 0) * hoursPerBand;
    const weeksLeft = Math.max(daysBetween(today, exam) / 7, 0);
    const requiredWeekly = weeksLeft > 0 ? hoursNeeded / weeksLeft : Infinity;
    const weeksAtPace = weeklyHours > 0 ? hoursNeeded / weeklyHours : Infinity;
    const projected = isFinite(weeksAtPace) ? addDays(today, Math.ceil(weeksAtPace * 7)) : null;
    return {
      hoursNeeded,
      weeksLeft,
      requiredWeekly,
      projected,
      onTrack: hoursNeeded === 0 || (projected !== null && projected <= exam),
    };
  }

  function hskProjection({ knownWords, targetLevel, levels, today, exam }) {
    const target = levels.find((l) => l.level === targetLevel).words;
    const reached = levels.filter((l) => knownWords >= l.words).map((l) => l.level);
    const daysLeft = Math.max(daysBetween(today, exam), 0);
    const remaining = Math.max(target - knownWords, 0);
    return {
      targetWords: target,
      remaining,
      daysLeft,
      perDay: daysLeft > 0 ? remaining / daysLeft : remaining,
      level: reached.length ? Math.max(...reached) : 0,
    };
  }

  // Tổng phút theo môn trong tuần chứa ngày `date`.
  function weeklyTotals(logs, date) {
    const from = weekStart(date);
    const to = addDays(from, 6);
    const totals = {};
    logs.filter((l) => l.date >= from && l.date <= to).forEach((l) => {
      totals[l.subject] = (totals[l.subject] || 0) + l.minutes;
    });
    return { from, to, totals };
  }

  // Số ngày liên tiếp có học, tính tới hôm nay (hoặc hôm qua nếu hôm nay chưa học).
  function streak(logs, today) {
    const days = new Set(logs.filter((l) => l.minutes > 0).map((l) => l.date));
    let d = days.has(today) ? today : addDays(today, -1);
    let n = 0;
    while (days.has(d)) {
      n++;
      d = addDays(d, -1);
    }
    return n;
  }

  function phaseAt(phases, date) {
    return phases.find((p) => date >= p.from && date <= p.to) || null;
  }

  const api = {
    parseDate, isoDate, addDays, daysBetween, weekStart, tasks30, reschedule30,
    ieltsOverall, ieltsFocus, ieltsProjection, hskProjection, weeklyTotals, streak, phaseAt, SKILLS,
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Logic = api;
})(this);
