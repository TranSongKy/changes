// Giao diện. Dữ liệu lưu trong localStorage của trình duyệt; dùng Cài đặt > Xuất dữ liệu để sao lưu.
(function () {
  const L = window.Logic;
  const P = window.PLAN;
  const LIB = window.LIBRARY;
  const M = window.Materials;
  // Danh sách tài liệu trên máy bạn (materials/library-data.js); không có thì tab Thư viện hướng dẫn cách tạo.
  const MAT = window.MATERIALS && Array.isArray(window.MATERIALS.items) ? window.MATERIALS.items : null;
  const KEY = "lotrinh.v1";

  const SUBJECTS = {
    graph: { name: "Đồ thị", color: "var(--graph)", minutes: 120 },
    oop: { name: "OOP", color: "var(--oop)", minutes: 90 },
    ielts: { name: "IELTS", color: "var(--ielts)" },
    hsk: { name: "HSK", color: "var(--hsk)" },
  };

  // ---------- trạng thái ----------
  function blank() {
    return { settings: { ...P.defaults, viewDate: "" }, done30: {}, daily: {}, logs: [], mocks: [], hskWords: [], exDone: {}, matDone: {} };
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return blank();
      const s = JSON.parse(raw);
      const b = blank();
      return { ...b, ...s, settings: { ...b.settings, ...s.settings } };
    } catch (e) {
      return blank();
    }
  }

  let state = load();

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      toast("Không lưu được vào trình duyệt. Hãy xuất dữ liệu để sao lưu.");
    }
  }

  const realToday = () => L.isoDate(new Date());
  const today = () => state.settings.viewDate || realToday();
  const S = () => state.settings;

  // ---------- tiện ích ----------
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const WD = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const fmt = (d) => {
    const x = L.parseDate(d);
    return `${WD[x.getDay()]} ${x.getDate()}/${x.getMonth() + 1}/${x.getFullYear()}`;
  };
  const fmtShort = (d) => {
    const x = L.parseDate(d);
    return `${x.getDate()}/${x.getMonth() + 1}`;
  };
  const hrs = (m) => (Math.round((m / 60) * 10) / 10).toLocaleString("vi-VN");
  const band = (b) => b.toFixed(1);
  const num = (v) => Number(v).toLocaleString("vi-VN");
  const pct = (a, b) => (b > 0 ? Math.min(100, Math.round((a / b) * 100)) : 0);

  function toast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toast.t);
    toast.t = setTimeout(() => (t.hidden = true), 2600);
  }

  function addLog(entry) {
    state.logs.push({ id: Date.now() + Math.random(), ...entry });
  }

  function removeLogBySource(source) {
    state.logs = state.logs.filter((l) => l.source !== source);
  }

  function setChecked(source, on, entry) {
    removeLogBySource(source);
    if (on && entry.minutes > 0) addLog({ ...entry, source });
  }

  function in30(d) {
    return d >= S().exam30Start && d <= S().exam30End;
  }

  function schedule30() {
    return L.reschedule30(P.days30, state.done30, S().exam30Start, S().exam30End, today());
  }

  function ieltsPhaseNo(d) {
    const p = L.phaseAt(P.ieltsPhases, d);
    if (p) return p.id;
    return d < P.ieltsPhases[0].from ? 1 : 3;
  }

  function latestMock() {
    const m = [...state.mocks].sort((a, b) => (a.date < b.date ? 1 : -1))[0];
    return m || null;
  }

  function avgWeekly(subject, weeks) {
    const end = today();
    const from = L.addDays(L.weekStart(end), -7 * weeks);
    const mins = state.logs.filter((l) => l.subject === subject && l.date >= from && l.date < L.weekStart(end))
      .reduce((a, l) => a + l.minutes, 0);
    return mins / 60 / weeks;
  }

  const hskStd = () => P.hskStandards[S().hskStandard] || P.hskStandards["3.0"];
  const lvlName = (n) => {
    const l = hskStd().levels.find((x) => x.level === Number(n));
    return l && l.label ? l.label : String(n);
  };
  function hskPhaseAt(d) {
    const ps = hskStd().phases;
    return L.phaseAt(ps, d) || ps[d < ps[0].from ? 0 : ps.length - 1];
  }

  function knownWords() {
    const w = [...state.hskWords].sort((a, b) => (a.date < b.date ? 1 : -1))[0];
    return w ? w.words : S().hskStartWords;
  }

  // ---------- liên kết tới tài liệu ----------
  const topicById = (id) => LIB.topics.find((t) => t.id === id);
  const topicsForDay = (subject, day) => LIB.topics.filter((t) => t.subject === subject && (t.days || []).includes(day));
  const hskTopic = (phaseId) => LIB.topics.find((t) => t.subject === "hsk" && (t.phases || []).includes(phaseId));
  function ieltsTopic(skill, text) {
    if (skill === "Writing" && /Task 1/.test(text)) return topicById("i-writing1");
    return LIB.topics.find((t) => t.subject === "ielts" && (t.skills || []).includes(skill));
  }
  const docLink = (t, label = "Tài liệu") => (t ? `<button type="button" class="doclink" data-topic="${t.id}" title="${esc(t.title)}">${label}</button>` : "");

  // ---------- tài liệu của bạn (materials/) ----------
  const mats = (pred) => (MAT || []).filter(pred);
  const matByKey = (k) => (MAT || []).find((x) => x.key === k);
  const mb = (n) => (!n ? "" : n < 1048576 ? `${Math.max(Math.round(n / 1024), 1)} KB` : `${(n / 1048576).toLocaleString("vi-VN", { maximumFractionDigits: 1 })} MB`);
  const matLink = (x, label) => (x ? `<a class="doclink" href="${esc(x.file || x.drive)}" target="_blank" rel="noopener noreferrer" title="${esc(x.title)}">${esc(label || x.title)}</a>` : "");
  const matOpen = (x) => [
    x.file ? `<a href="${esc(x.file)}" target="_blank" rel="noopener">Mở</a>` : "",
    x.drive ? `<a href="${esc(x.drive)}" target="_blank" rel="noopener noreferrer">Drive</a>` : "",
  ].filter(Boolean).join(" · ");
  const camLabel = (id) => id.replace(/^c(\d+)t(\d)$/, "Cambridge $1 Test $2");
  function camTests() {
    const books = mats((x) => x.cat === "cambridge").map((x) => x.book);
    return books.length ? M.cambridgeSchedule(books, S().ieltsExam) : [];
  }
  const camMock = (id) => [...state.mocks].filter((m) => m.test === id).sort((a, b) => (a.date < b.date ? 1 : -1))[0];

  // File gắn vào từng buổi IELTS: đổi file mỗi tuần để lần lượt làm hết.
  function ieltsMat(skill, text, d) {
    if (!MAT) return "";
    const pick = (list) => (list.length ? list[Math.max(Math.floor(L.daysBetween(P.ieltsPhases[0].from, d) / 7), 0) % list.length] : null);
    if (skill === "Reading") return matLink(pick(mats((x) => x.cat === "reading")), "PDF");
    if (skill === "Writing" && /Task 1/.test(text)) return matLink(pick(mats((x) => x.cat === "writing" && x.task === 1)), "PDF");
    if (skill === "Writing" && /Task 2/.test(text)) return matLink(pick(mats((x) => x.cat === "writing" && x.task === 2)), "PDF");
    if (skill === "Mock") {
      const tests = camTests();
      const t = tests.find((x) => x.date === d);
      if (t) return matLink(matByKey(`cambridge-${t.book}`), camLabel(t.id));
      const y = tests.find((x) => x.date === L.addDays(d, -1));
      if (y) return matLink(matByKey(`cambridge-${y.book}`), "Chữa " + camLabel(y.id));
    }
    return "";
  }
  function hskMats(phase) {
    const m = phase.materials || {};
    return [m.course && matByKey(`hsk-course-${m.course}`), ...(m.vocab || []).map((v) => matByKey(`hsk-vocab-${v}`))].filter(Boolean);
  }

  // ---------- biểu đồ SVG ----------
  function lineChart({ series, yMin, yMax, yStep, target, from, to, yFmt = (v) => v }) {
    const W = 640, H = 220, pl = 36, pr = 12, pt = 10, pb = 26;
    const span = Math.max(L.daysBetween(from, to), 1);
    const x = (d) => pl + ((W - pl - pr) * L.daysBetween(from, d)) / span;
    const y = (v) => pt + (H - pt - pb) * (1 - (v - yMin) / (yMax - yMin));
    let g = "";
    for (let v = yMin; v <= yMax + 1e-9; v += yStep) {
      g += `<line class="grid-line" x1="${pl}" x2="${W - pr}" y1="${y(v)}" y2="${y(v)}"/>`;
      g += `<text x="${pl - 6}" y="${y(v) + 4}" text-anchor="end">${yFmt(v)}</text>`;
    }
    const months = [];
    for (let d = from.slice(0, 8) + "01"; d <= to; d = L.addDays(d, 32).slice(0, 8) + "01") if (d >= from) months.push(d);
    const every = Math.ceil(months.length / 8);
    months.forEach((d, i) => {
      if (i % every) return;
      const x0 = L.parseDate(d);
      g += `<text x="${x(d)}" y="${H - 8}" text-anchor="middle">${x0.getMonth() + 1}/${String(x0.getFullYear()).slice(2)}</text>`;
    });
    if (target != null) g += `<line class="target" x1="${pl}" x2="${W - pr}" y1="${y(target)}" y2="${y(target)}"/>`;
    for (const s of series) {
      const pts = s.points.filter((p) => p.x >= from && p.x <= to).sort((a, b) => (a.x < b.x ? -1 : 1));
      if (!pts.length) continue;
      const dash = s.dashed ? ' stroke-dasharray="5 4"' : "";
      g += `<polyline fill="none" style="stroke:${s.color}" stroke-width="${s.width || 2}"${dash} points="${pts.map((p) => `${x(p.x)},${y(p.y)}`).join(" ")}"/>`;
      if (!s.dashed) pts.forEach((p) => (g += `<circle cx="${x(p.x)}" cy="${y(p.y)}" r="3.5" style="fill:${s.color}"><title>${fmtShort(p.x)}: ${yFmt(p.y)}</title></circle>`));
    }
    return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img">${g}</svg>`;
  }

  function weeklyBars(weeks) {
    const W = 640, H = 200, pl = 30, pr = 8, pt = 10, pb = 26;
    const end = L.weekStart(today());
    const cols = [];
    for (let i = weeks - 1; i >= 0; i--) {
      const ws = L.addDays(end, -7 * i);
      cols.push({ ws, totals: L.weeklyTotals(state.logs, ws).totals });
    }
    const keys = ["graph", "oop", "ielts", "hsk"];
    const maxH = Math.max(10, ...cols.map((c) => keys.reduce((a, k) => a + (c.totals[k] || 0), 0) / 60));
    const top = Math.ceil(maxH / 5) * 5;
    const bw = (W - pl - pr) / weeks;
    const y = (h) => pt + (H - pt - pb) * (1 - h / top);
    let g = "";
    for (let v = 0; v <= top; v += 5) {
      g += `<line class="grid-line" x1="${pl}" x2="${W - pr}" y1="${y(v)}" y2="${y(v)}"/><text x="${pl - 6}" y="${y(v) + 4}" text-anchor="end">${v}</text>`;
    }
    cols.forEach((c, i) => {
      let acc = 0;
      const x0 = pl + i * bw + bw * 0.18;
      keys.forEach((k) => {
        const h = (c.totals[k] || 0) / 60;
        if (!h) return;
        g += `<rect x="${x0}" width="${bw * 0.64}" y="${y(acc + h)}" height="${y(acc) - y(acc + h)}" style="fill:${SUBJECTS[k].color}"><title>${SUBJECTS[k].name}: ${hrs(h * 60)} giờ</title></rect>`;
        acc += h;
      });
      g += `<text x="${x0 + bw * 0.32}" y="${H - 8}" text-anchor="middle">${fmtShort(c.ws)}</text>`;
    });
    const legend = keys.map((k) => `<span><i style="background:${SUBJECTS[k].color}"></i>${SUBJECTS[k].name}</span>`).join("");
    return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img">${g}</svg><div class="legend">${legend}<span>giờ/tuần, theo tuần bắt đầu thứ 2</span></div>`;
  }

  // ---------- Hôm nay ----------
  function renderToday() {
    const d = today();
    const el = document.getElementById("tab-today");
    const wk = L.weeklyTotals(state.logs, d);
    const tot = (k) => wk.totals[k] || 0;
    const st = L.streak(state.logs, d);
    const next = P.milestones.map((m) => ({ ...m, date: msDate(m) })).filter((m) => m.date >= d).slice(0, 3);

    let plan = "";
    if (in30(d)) {
      const { schedule } = schedule30();
      const items = (schedule[d] || []).sort((a, b) => (a.subject < b.subject ? -1 : 1));
      const dayNo = L.daysBetween(S().exam30Start, d) + 1;
      plan = `<div class="card"><h3>Ôn thi: ngày ${dayNo}/30</h3><ul class="checks">` +
        items.map((t) => `<li><input type="checkbox" data-t30="${t.id}" ${state.done30[t.id] ? "checked" : ""}>
          <span class="${state.done30[t.id] ? "done" : ""}"><span class="pill ${t.subject}">${SUBJECTS[t.subject].name}</span>
          ${esc(t.text)} ${t.moved ? `<span class="moved small">(dời từ ngày ${t.day})</span>` : ""}
          ${t.rest ? "" : topicsForDay(t.subject, t.day).map((x) => docLink(x)).join("")}</span>
          <span class="mins">${t.rest ? "" : SUBJECTS[t.subject].minutes + "'"}</span></li>`).join("") +
        dailyItem(d, "vocab", "ielts", 20, "IELTS: 20 phút từ vựng (giữ nhịp)") +
        `</ul></div>`;
    } else {
      const ph = ieltsPhaseNo(d);
      const wd = L.parseDate(d).getDay();
      const ielts = (P.ieltsWeek[ph][wd] || []);
      const hp = hskPhaseAt(d);
      const scale = hp.minutes / 60;
      const before = d < P.ieltsPhases[0].from;
      plan = `<div class="grid">
        <div class="card"><h3>IELTS · giai đoạn ${ph}${before ? " (chưa bắt đầu)" : ""}</h3>
          ${ielts.length ? `<ul class="checks">${ielts.map((it, i) => dailyItem(d, `i${i}`, "ielts", it[1], `<span class="pill good">${it[0]}</span> ${esc(it[2])} ${docLink(ieltsTopic(it[0], it[2]))}${ieltsMat(it[0], it[2], d)}`)).join("")}</ul>` : `<p class="muted">Hôm nay nghỉ IELTS.</p>`}
          ${focusHint()}
        </div>
        <div class="card"><h3>HSK · ${esc(hp.name)}</h3><ul class="checks">
          ${P.hskSession.map((s, i) => dailyItem(d, `h${i}`, "hsk", Math.round(s[0] * scale), esc(s[1]))).join("")}
        </ul><p class="small muted">${esc(hp.focus)}</p>
          <p class="small">${docLink(hskTopic(hp.id), "Tài liệu giai đoạn này")} ${docLink(topicById("h-pinyin"), "Pinyin")} ${docLink(topicById("h-hanzi"), "Chữ Hán")}${hskMats(hp).map((x) => matLink(x)).join("")}</p></div></div>`;
    }

    el.innerHTML = `
      <div class="card"><form class="row" id="viewDateForm">
        <label>Xem ngày<input type="date" id="viewDate" value="${d}"></label>
        <button class="btn ghost" type="button" id="backToday">Về hôm nay</button>
        <span class="muted small" style="margin-left:auto">${fmt(d)}${state.settings.viewDate ? " · đang xem thử" : ""}</span>
      </form></div>
      <div class="grid">
        <div class="card"><div class="muted small">Chuỗi ngày học</div><div class="stat">${st} <small>ngày</small></div></div>
        <div class="card"><div class="muted small">IELTS tuần này</div><div class="stat">${hrs(tot("ielts"))} <small>/ ${num(S().weeklyIeltsHours)} giờ</small></div>
          <div class="bar"><span style="width:${pct(tot("ielts") / 60, S().weeklyIeltsHours)}%;background:var(--ielts)"></span></div></div>
        <div class="card"><div class="muted small">HSK tuần này</div><div class="stat">${hrs(tot("hsk"))} <small>/ ${num(S().weeklyHskHours)} giờ</small></div>
          <div class="bar"><span style="width:${pct(tot("hsk") / 60, S().weeklyHskHours)}%;background:var(--hsk)"></span></div></div>
        <div class="card"><div class="muted small">Đồ thị + OOP tuần này</div><div class="stat">${hrs(tot("graph") + tot("oop"))} <small>giờ</small></div></div>
      </div>
      
      ${plan}
      <div class="grid">
        <div class="card"><h3>Bấm giờ</h3><div class="timer">
          <div class="clock" id="clock">00:00</div>
          <select id="timerSubject">${Object.entries(SUBJECTS).map(([k, v]) => `<option value="${k}">${v.name}</option>`).join("")}</select>
          <button class="btn" id="timerBtn">Bắt đầu</button></div>
          <p class="small muted">Dừng để ghi số phút vào nhật ký của ngày đang xem.</p></div>
        <div class="card"><h3>Mốc sắp tới</h3><div class="timeline">
          ${next.map((m) => `<div class="ms"><span class="when">${fmtShort(m.date)}/${m.date.slice(2, 4)}</span><span>${esc(m.label)} <span class="pill">${L.daysBetween(d, m.date)} ngày</span></span></div>`).join("") || `<p class="muted">Không còn mốc nào.</p>`}
        </div></div>
      </div>`;

    bindChecks(el);
    el.querySelector("#viewDate").onchange = (e) => {
      state.settings.viewDate = e.target.value === realToday() ? "" : e.target.value;
      save();
      renderAll();
    };
    el.querySelector("#backToday").onclick = () => {
      state.settings.viewDate = "";
      save();
      renderAll();
    };
    bindTimer(el);
  }

  function msDate(m) {
    if (m.label.startsWith("Thi Đồ thị")) return S().exam30End;
    if (m.label.startsWith("Thi IELTS")) return S().ieltsExam;
    if (m.label === "Thi HSK") return S().hskExam;
    if (m.label.startsWith("Tốt nghiệp")) return S().graduation;
    return m.date;
  }

  function dailyItem(date, key, subject, minutes, html) {
    const on = !!(state.daily[date] && state.daily[date][key]);
    return `<li><input type="checkbox" data-daily="${date}|${key}|${subject}|${minutes}" ${on ? "checked" : ""}>
      <span class="${on ? "done" : ""}">${html}</span><span class="mins">${minutes}'</span></li>`;
  }

  function focusHint() {
    const m = latestMock();
    if (!m) return `<p class="small muted">Nhập một đề thử ở tab IELTS để biết nên dồn giờ vào kỹ năng nào.</p>`;
    const f = L.ieltsFocus(m.scores, S().ieltsTargetBand, S().weeklyIeltsHours);
    return `<p class="small muted">Kỹ năng yếu nhất theo đề thử gần nhất: <b>${f.weakest}</b>. Khi có thời gian thừa, làm thêm phần này.</p>`;
  }

  function bindChecks(el) {
    el.querySelectorAll("[data-t30]").forEach((cb) => (cb.onchange = () => {
      const id = cb.dataset.t30;
      const subject = id[0] === "g" ? "graph" : "oop";
      const day = Number(id.slice(1));
      if (cb.checked) state.done30[id] = today();
      else delete state.done30[id];
      const rest = P.days30[day - 1].rest;
      setChecked(`t30:${id}`, cb.checked, { date: today(), subject, minutes: rest ? 0 : SUBJECTS[subject].minutes, note: `Ngày ${day}` });
      save();
      renderAll();
    }));
    el.querySelectorAll("[data-daily]").forEach((cb) => (cb.onchange = () => {
      const [date, key, subject, minutes] = cb.dataset.daily.split("|");
      state.daily[date] = state.daily[date] || {};
      if (cb.checked) state.daily[date][key] = true;
      else delete state.daily[date][key];
      setChecked(`d:${date}:${key}`, cb.checked, { date, subject, minutes: Number(minutes), note: "Theo lịch" });
      save();
      renderAll();
    }));
  }

  let timer = null;
  function bindTimer(el) {
    const btn = el.querySelector("#timerBtn");
    const clock = el.querySelector("#clock");
    const sel = el.querySelector("#timerSubject");
    const tick = () => {
      const s = Math.floor((Date.now() - timer.start) / 1000);
      clock.textContent = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
    };
    if (timer) {
      sel.value = timer.subject;
      btn.textContent = "Dừng và ghi";
      tick();
      clearInterval(timer.iv);
      timer.iv = setInterval(tick, 1000);
    }
    btn.onclick = () => {
      if (!timer) {
        timer = { start: Date.now(), subject: sel.value };
        timer.iv = setInterval(tick, 1000);
        btn.textContent = "Dừng và ghi";
        return;
      }
      clearInterval(timer.iv);
      const minutes = Math.round((Date.now() - timer.start) / 60000);
      if (minutes > 0) {
        addLog({ date: today(), subject: timer.subject, minutes, note: "Bấm giờ" });
        save();
        toast(`Đã ghi ${minutes} phút ${SUBJECTS[timer.subject].name}`);
      } else toast("Chưa đủ 1 phút nên không ghi.");
      timer = null;
      renderAll();
    };
  }

  // ---------- 30 ngày ----------
  let showOriginal = false;
  function renderExam30() {
    const el = document.getElementById("tab-exam30");
    const d = today();
    const r = showOriginal ? L.reschedule30(P.days30, {}, S().exam30Start, S().exam30End, S().exam30Start) : schedule30();
    const all = L.tasks30(P.days30, S().exam30Start).filter((t) => !t.rest);
    const count = (s) => all.filter((t) => t.subject === s && state.done30[t.id]).length;
    const total = (s) => all.filter((t) => t.subject === s).length;
    const daysLeft = Math.max(L.daysBetween(d, S().exam30End) + 1, 0);

    let alert = "";
    if (!showOriginal && r.overdue > 0 && d <= S().exam30End) {
      alert = `<div class="alert warn">Bạn đang trễ ${r.overdue} việc. Lịch dưới đây đã dời các việc chưa xong vào ${daysLeft} ngày còn lại (vẫn giữ ngày nghỉ cuối).
        ${r.maxPerDay > 1 ? `Có ngày phải làm tới ${r.maxPerDay} việc mỗi môn, nên tăng giờ học hoặc gộp phần ôn tuần.` : ""}</div>`;
    } else if (!showOriginal && d >= S().exam30Start && d <= S().exam30End) {
      alert = `<div class="alert good">Bạn đang đúng tiến độ.</div>`;
    }

    const dates = [];
    for (let x = S().exam30Start; x <= S().exam30End; x = L.addDays(x, 1)) dates.push(x);
    const cal = dates.map((x, i) => {
      const items = (r.schedule[x] || []).sort((a, b) => (a.subject < b.subject ? -1 : 1));
      const rest = items.some((t) => t.rest);
      return `<div class="day ${x === d ? "today" : ""} ${x < d ? "past" : ""} ${rest ? "rest" : ""}">
        <header><span>Ngày ${i + 1}</span><span class="muted">${fmtShort(x)}</span></header>
        ${items.map((t) => `<label><input type="checkbox" data-t30="${t.id}" ${state.done30[t.id] ? "checked" : ""}>
          <span class="dot ${t.subject}"></span><span class="${state.done30[t.id] ? "done" : ""}">${esc(t.text)}
          ${t.moved ? `<span class="moved">· từ ngày ${t.day}</span>` : ""}
          ${t.rest ? "" : topicsForDay(t.subject, t.day).map((x) => docLink(x, "tài liệu")).join("")}</span></label>`).join("")}
      </div>`;
    }).join("");

    el.innerHTML = `
      <h2>30 ngày ôn Lý thuyết đồ thị và OOP</h2>
      <div class="grid">
        <div class="card"><div class="muted small">Đồ thị</div><div class="stat">${count("graph")} <small>/ ${total("graph")} việc</small></div>
          <div class="bar"><span style="width:${pct(count("graph"), total("graph"))}%;background:var(--graph)"></span></div></div>
        <div class="card"><div class="muted small">OOP</div><div class="stat">${count("oop")} <small>/ ${total("oop")} việc</small></div>
          <div class="bar"><span style="width:${pct(count("oop"), total("oop"))}%;background:var(--oop)"></span></div></div>
        <div class="card"><div class="muted small">Còn tới ngày thi</div><div class="stat">${daysLeft} <small>ngày · ${fmtShort(S().exam30End)}</small></div></div>
      </div>
      
      ${alert}
      <p><label class="small"><input type="checkbox" id="origToggle" ${showOriginal ? "checked" : ""}> Xem lịch gốc (không dời)</label>
        <span class="legend" style="display:inline-flex;margin-left:12px"><span><i style="background:var(--graph)"></i>Đồ thị</span><span><i style="background:var(--oop)"></i>OOP</span></span></p>
      <div class="calendar">${cal}</div>
      <p class="small muted">Đánh dấu một việc sẽ ghi ${SUBJECTS.graph.minutes} phút (Đồ thị) hoặc ${SUBJECTS.oop.minutes} phút (OOP) vào nhật ký ngày đang xem. Đổi ngày thi ở Cài đặt, lịch sẽ tự dời theo.</p>`;
    bindChecks(el);
    el.querySelector("#origToggle").onchange = (e) => {
      showOriginal = e.target.checked;
      renderExam30();
    };
  }

  // ---------- IELTS ----------
  let pendingTest = ""; // đề Cambridge chọn sẵn khi bấm "Nhập điểm" ở tab Thư viện
  function renderIelts() {
    const el = document.getElementById("tab-ielts");
    const d = today();
    const m = latestMock();
    const current = m ? m.overall : S().ieltsStartBand;
    const logged = avgWeekly("ielts", 4);
    const pace = logged > 0 ? logged : S().weeklyIeltsHours;
    const pr = L.ieltsProjection({ currentBand: current, target: S().ieltsTargetBand, hoursPerBand: S().hoursPerBand, weeklyHours: pace, today: d, exam: S().ieltsExam });
    const ph = L.phaseAt(P.ieltsPhases, d);
    const focus = m ? L.ieltsFocus(m.scores, S().ieltsTargetBand, Math.max(pace, S().weeklyIeltsHours)) : null;

    const mocks = [...state.mocks].sort((a, b) => (a.date < b.date ? -1 : 1));
    const planLine = [{ x: P.ieltsPhases[0].from, y: S().ieltsStartBand }, ...P.ieltsPhases.map((p) => ({ x: p.to, y: p.band }))];
    const chart = lineChart({
      from: P.ieltsPhases[0].from, to: S().ieltsExam > "2027-12-31" ? S().ieltsExam : "2027-12-31",
      yMin: 4, yMax: 8.5, yStep: 0.5, target: S().ieltsTargetBand, yFmt: band,
      series: [
        { color: "var(--muted)", dashed: true, width: 1.5, points: planLine },
        { color: "var(--ielts)", points: mocks.map((x) => ({ x: x.date, y: x.overall })) },
      ],
    });

    el.innerHTML = `
      <h2>IELTS: ${band(S().ieltsStartBand)} → ${band(S().ieltsTargetBand)}</h2>
      <div class="grid">
        <div class="card"><div class="muted small">Band hiện tại${m ? ` (đề thử ${fmtShort(m.date)})` : " (điểm đầu vào)"}</div><div class="stat">${band(current)}</div></div>
        <div class="card"><div class="muted small">Giờ cần thêm để đạt ${band(S().ieltsTargetBand)}</div><div class="stat">${Math.round(pr.hoursNeeded)} <small>giờ</small></div>
          <div class="small muted">Ước tính ${S().hoursPerBand} giờ cho mỗi band</div></div>
        <div class="card"><div class="muted small">Cần mỗi tuần để kịp ${fmtShort(S().ieltsExam)}/${S().ieltsExam.slice(2, 4)}</div>
          <div class="stat">${isFinite(pr.requiredWeekly) ? hrs(pr.requiredWeekly * 60) : "—"} <small>giờ/tuần</small></div>
          <div class="small muted">Nhịp 4 tuần gần nhất: ${logged > 0 ? hrs(logged * 60) + " giờ/tuần" : "chưa có nhật ký, dùng mục tiêu " + num(S().weeklyIeltsHours) + " giờ"}</div></div>
        <div class="card"><div class="muted small">Dự báo theo nhịp hiện tại</div>
          <div class="stat">${pr.projected ? fmtShort(pr.projected) + "/" + pr.projected.slice(2, 4) : "—"}</div>
          <span class="pill ${pr.onTrack ? "good" : "warn"}">${pr.onTrack ? "Kịp ngày thi" : "Chưa kịp, cần tăng giờ hoặc dời ngày thi"}</span></div>
      </div>
      
      <div class="card"><h3>Band theo thời gian</h3>${chart}
        <div class="legend"><span><i style="background:var(--ielts)"></i>Đề thử</span><span><i style="background:var(--muted)"></i>Lộ trình dự kiến</span><span><i style="background:var(--warn)"></i>Mục tiêu</span></div></div>
      <div class="grid">
        <div class="card"><h3>Chia giờ tuần tới</h3>
          ${focus ? `<p class="small muted">Giờ được dồn về kỹ năng còn cách xa mục tiêu nhất (${focus.weakest}).</p>
            <table><tr><th>Kỹ năng</th><th>Điểm gần nhất</th><th>Giờ/tuần</th></tr>
            ${L.SKILLS.map((k) => `<tr><td>${k}</td><td>${band(m.scores[k])}</td><td>${hrs(focus.hours[k] * 60)}</td></tr>`).join("")}</table>`
          : `<p class="muted">Nhập ít nhất một đề thử bên dưới để có gợi ý chia giờ.</p>`}
        </div>
        <div class="card"><h3>Giai đoạn hiện tại</h3>
          ${ph ? `<p><b>${ph.id}. ${esc(ph.name)}</b> (${fmtShort(ph.from)} – ${fmtShort(ph.to)}/${ph.to.slice(2, 4)}), mục tiêu ${band(ph.band)}</p><p class="small">${esc(ph.focus)}</p>`
            : `<p class="muted">${d < P.ieltsPhases[0].from ? `Bắt đầu từ ${fmt(P.ieltsPhases[0].from)}. Trong lúc ôn thi chỉ cần 20 phút từ vựng mỗi ngày.` : "Đã qua các giai đoạn, tập trung thi và thi lại nếu cần."}</p>`}
        </div>
      </div>
      
      <div class="card" id="mockCard"><h3>Nhập đề thử</h3>
        <form class="row" id="mockForm">
          <label>Ngày<input type="date" name="date" value="${d}" required></label>
          ${camTests().length ? `<label>Đề<select name="test"><option value="">Đề khác</option>${camTests().map((t) => `<option value="${t.id}" ${pendingTest === t.id ? "selected" : ""}>${camLabel(t.id)}${camMock(t.id) ? " (đã làm)" : ""}</option>`).join("")}</select></label>` : ""}
          ${L.SKILLS.map((k) => `<label>${k}<input type="number" name="${k}" min="0" max="9" step="0.5" required></label>`).join("")}
          <button class="btn">Lưu</button>
        </form>
        <table style="margin-top:12px"><tr><th>Ngày</th><th>Đề</th>${L.SKILLS.map((k) => `<th>${k[0]}</th>`).join("")}<th>Overall</th><th></th></tr>
          ${[...mocks].reverse().map((x) => `<tr><td>${fmtShort(x.date)}/${x.date.slice(2, 4)}</td><td class="small">${x.test ? camLabel(x.test) : ""}</td>${L.SKILLS.map((k) => `<td>${band(x.scores[k])}</td>`).join("")}<td><b>${band(x.overall)}</b></td>
            <td><button class="link" data-del-mock="${x.id}">Xóa</button></td></tr>`).join("") || `<tr><td colspan="8" class="muted">Chưa có đề thử nào.</td></tr>`}
        </table></div>`;

    el.querySelector("#mockForm").onsubmit = (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      const scores = {};
      L.SKILLS.forEach((k) => (scores[k] = Number(f.get(k))));
      state.mocks.push({ id: Date.now(), date: f.get("date"), test: f.get("test") || "", scores, overall: L.ieltsOverall(scores.Listening, scores.Reading, scores.Writing, scores.Speaking) });
      pendingTest = "";
      save();
      renderAll();
      toast("Đã lưu đề thử");
    };
    el.querySelectorAll("[data-del-mock]").forEach((b) => (b.onclick = () => {
      state.mocks = state.mocks.filter((x) => String(x.id) !== b.dataset.delMock);
      save();
      renderAll();
    }));
  }

  // ---------- HSK ----------
  function renderHsk() {
    const el = document.getElementById("tab-hsk");
    const d = today();
    const known = knownWords();
    const std = hskStd();
    const pr = L.hskProjection({ knownWords: known, targetLevel: Number(S().hskTargetLevel), levels: std.levels, today: d, exam: S().hskExam });
    const ph = L.phaseAt(std.phases, d);
    const phTarget = ph ? ph.words : null;
    const phDays = ph ? Math.max(L.daysBetween(d, ph.to), 1) : 0;
    const words = [...state.hskWords].sort((a, b) => (a.date < b.date ? -1 : 1));
    const planLine = [{ x: std.phases[0].from, y: S().hskStartWords }, ...std.phases.map((p) => ({ x: p.to, y: p.words }))];
    const yMax = Math.max(1400, pr.targetWords + 200, known + 200);
    const chart = lineChart({
      from: std.phases[0].from, to: S().hskExam > "2028-04-30" ? S().hskExam : "2028-04-30",
      yMin: 0, yMax: Math.ceil(yMax / 200) * 200, yStep: yMax > 2000 ? 500 : 200, target: pr.targetWords,
      series: [
        { color: "var(--muted)", dashed: true, width: 1.5, points: planLine },
        { color: "var(--hsk)", points: words.map((w) => ({ x: w.date, y: w.words })) },
      ],
    });

    el.innerHTML = `
      <h2>HSK: mục tiêu HSK ${lvlName(S().hskTargetLevel)} <span class="pill hsk">${esc(std.name)}</span></h2>
      <div class="grid">
        <div class="card"><div class="muted small">Số từ đã thuộc</div><div class="stat">${num(known)} <small>/ ${num(pr.targetWords)}</small></div>
          <div class="bar"><span style="width:${pct(known, pr.targetWords)}%;background:var(--hsk)"></span></div>
          <div class="small muted">Tương đương ${pr.level ? "HSK " + lvlName(pr.level) : "chưa đủ HSK 1"}</div></div>
        <div class="card"><div class="muted small">Cần học mỗi ngày tới ngày thi</div><div class="stat">${num(Math.ceil(pr.perDay * 10) / 10)} <small>từ mới/ngày</small></div>
          <div class="small muted">Còn ${pr.daysLeft} ngày tới ${fmtShort(S().hskExam)}/${S().hskExam.slice(2, 4)}</div></div>
        <div class="card"><div class="muted small">Mốc giai đoạn hiện tại</div>
          ${ph ? `<div class="stat">${num(Math.max(Math.ceil(((phTarget - known) / phDays) * 10) / 10, 0))} <small>từ/ngày</small></div><div class="small muted">để đạt ${num(phTarget)} từ trước ${fmtShort(ph.to)}/${ph.to.slice(2, 4)}</div>`
            : `<div class="muted">Ngoài các giai đoạn đã lên lịch.</div>`}</div>
      </div>
      
      <div class="card"><h3>Số từ theo thời gian</h3>${chart}
        <div class="legend"><span><i style="background:var(--hsk)"></i>Số từ bạn nhập</span><span><i style="background:var(--muted)"></i>Lộ trình dự kiến</span><span><i style="background:var(--warn)"></i>Mục tiêu HSK ${lvlName(S().hskTargetLevel)}</span></div></div>
      <div class="grid">
        <div class="card"><h3>Cập nhật số từ</h3>
          <form class="row" id="wordForm"><label>Ngày<input type="date" name="date" value="${d}"></label>
            <label>Số từ đã thuộc<input type="number" name="words" min="0" value="${known}"></label><button class="btn">Lưu</button></form>
          <p class="small muted">Lấy số thẻ đã "mature" hoặc đã học trong Anki là đủ chính xác.</p></div>
        <div class="card"><h3>Các giai đoạn</h3><table><tr><th>Giai đoạn</th><th>Đến</th><th>Từ</th><th>Phút/ngày</th></tr>
          ${std.phases.map((p) => `<tr ${ph && ph.id === p.id ? 'style="font-weight:600"' : ""}><td>${esc(p.name)}</td><td>${fmtShort(p.to)}/${p.to.slice(2, 4)}</td><td>${num(p.words)}</td><td>${p.minutes}</td></tr>`).join("")}</table>
          ${MAT && ph && hskMats(ph).length ? `<p class="small">Tài liệu giai đoạn này: ${hskMats(ph).map((x) => matLink(x)).join("")}</p>` : ""}</div>
      </div>
      
      <div class="card"><h3>Mức HSK và số từ</h3><table><tr><th>Cấp</th><th>Tổng số từ (${esc(std.name)})</th><th></th></tr>
        ${std.levels.map((l) => `<tr><td>HSK ${l.label || l.level}</td><td>${num(l.words)}</td><td>${known >= l.words ? '<span class="pill good">Đạt</span>' : ""}</td></tr>`).join("")}</table>
        <p class="small muted">Số từ là tổng tích lũy từ HSK 1 tới hết cấp đó. Đổi giữa chuẩn HSK 3.0 và 2.0 ở tab Cài đặt; trước khi đăng ký thi, hỏi trung tâm thi đang dùng chuẩn nào.</p></div>`;

    el.querySelector("#wordForm").onsubmit = (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      const date = f.get("date");
      state.hskWords = state.hskWords.filter((w) => w.date !== date);
      state.hskWords.push({ date, words: Number(f.get("words")) });
      save();
      renderAll();
      toast("Đã cập nhật số từ");
    };
  }

  // ---------- Tài liệu ----------
  let libSubject = "all";
  let libQuery = "";
  const libOpen = new Set();
  const norm = (s) => String(s).replace(/<[^>]+>/g, " ").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toLowerCase();
  const exKey = (t, i) => `${t.id}:${i}`;
  const exCount = (t) => t.exercises.filter((_, i) => state.exDone[exKey(t, i)]).length;

  function resLink(r) {
    const name = r.url ? `<a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.name)}</a>` : `<b>${esc(r.name)}</b>`;
    return `<li>${name}${r.note ? ` <span class="muted small">— ${esc(r.note)}</span>` : ""}</li>`;
  }

  function topicCard(t) {
    const where = t.days ? `Ngày ${t.days.length > 3 ? `${t.days[0]}–${t.days[t.days.length - 1]} (ôn tập)` : t.days.join(", ")}` : "";
    const done = exCount(t);
    return `<details class="topic" id="topic-${t.id}" data-id="${t.id}" ${libOpen.has(t.id) ? "open" : ""}>
      <summary><span class="pill ${t.subject}">${LIB.subjects[t.subject].name}</span> <b>${esc(t.title)}</b>
        <span class="muted small">${where ? where + " · " : ""}<span class="${done === t.exercises.length ? "ok" : ""}">${done}/${t.exercises.length} bài tập</span></span></summary>
      <div class="topic-body">
        <h4>Lý thuyết</h4><ul class="theory">${t.theory.map((x) => `<li>${x}</li>`).join("")}</ul>
        ${t.code ? `<pre><code>${esc(t.code)}</code></pre>` : ""}
        <h4>Bài tập</h4><ol class="ex">${t.exercises.map((e, i) => `<li>
          <label><input type="checkbox" data-ex="${exKey(t, i)}" ${state.exDone[exKey(t, i)] ? "checked" : ""}><span>${e.q}</span></label>
          <details class="ans"><summary>Xem đáp án</summary><div>${e.a}</div></details></li>`).join("")}</ol>
        ${t.resources && t.resources.length ? `<h4>Đọc thêm</h4><ul class="res">${t.resources.map(resLink).join("")}</ul>` : ""}
      </div></details>`;
  }

  function renderLibrary() {
    const el = document.getElementById("tab-library");
    const all = LIB.topics;
    const total = all.reduce((a, t) => a + t.exercises.length, 0);
    const done = all.reduce((a, t) => a + exCount(t), 0);
    const chips = [["all", "Tất cả"], ...Object.entries(LIB.subjects).map(([k, v]) => [k, v.name])];
    el.innerHTML = `
      <h2>Tài liệu: lý thuyết, bài tập, nguồn tham khảo</h2>
      <div class="card"><div class="row lib-tools">
        <div class="chips">${chips.map(([k, n]) => `<button type="button" class="chip ${libSubject === k ? "active" : ""}" data-lib-subject="${k}">${n}</button>`).join("")}</div>
        <input type="search" id="libSearch" placeholder="Tìm chủ đề, ví dụ: dijkstra, ke thua, 把" value="${esc(libQuery)}">
        <span class="muted small">Đã làm ${done}/${total} bài tập</span>
      </div></div>
      <div id="libToday"></div>
      <div id="libRes"></div>
      <div id="libList"></div>`;
    el.querySelectorAll("[data-lib-subject]").forEach((b) => (b.onclick = () => {
      libSubject = b.dataset.libSubject;
      renderLibrary();
    }));
    el.querySelector("#libSearch").oninput = (e) => {
      libQuery = e.target.value;
      renderLibList();
    };
    renderLibList();
  }

  function renderLibList() {
    const el = document.getElementById("tab-library");
    const d = today();
    const q = norm(libQuery.trim());

    // Chủ đề của ngày đang xem trong đợt ôn thi
    let todayHtml = "";
    if (in30(d) && !q) {
      const day = L.daysBetween(S().exam30Start, d) + 1;
      const ts = ["graph", "oop"].flatMap((s) => topicsForDay(s, day)).filter((t) => libSubject === "all" || t.subject === libSubject);
      if (ts.length) todayHtml = `<div class="alert good">Theo lịch gốc, ngày ${day}/30 học: ${ts.map((t) => docLink(t, esc(t.title))).join(" · ")}</div>`;
    }
    el.querySelector("#libToday").innerHTML = todayHtml;

    const subs = libSubject === "all" ? Object.keys(LIB.subjects) : [libSubject];
    el.querySelector("#libRes").innerHTML = q ? "" : `<details class="card res-card" ${libSubject !== "all" ? "open" : ""}>
      <summary><b>Nguồn học chung${libSubject !== "all" ? ": " + LIB.subjects[libSubject].name : ""}</b> <span class="muted small">trang web, sách, công cụ</span></summary>
      <div class="grid res-grid">${subs.map((k) => `<div><h4>${LIB.subjects[k].name}</h4><ul class="res">${LIB.subjects[k].resources.map(resLink).join("")}</ul></div>`).join("")}</div>
    </details>`;

    const list = LIB.topics.filter((t) => (libSubject === "all" || t.subject === libSubject) &&
      (!q || norm([t.title, ...t.theory, ...t.exercises.map((e) => e.q)].join(" ")).includes(q)));
    el.querySelector("#libList").innerHTML = list.map(topicCard).join("") ||
      `<p class="muted">Không tìm thấy chủ đề nào${q ? ` cho “${esc(libQuery)}”` : ""}${libSubject !== "all" ? ` trong môn ${LIB.subjects[libSubject].name}. Thử chọn “Tất cả”` : ""}.</p>`;

    el.querySelectorAll("details.topic").forEach((x) => x.addEventListener("toggle", () => {
      if (x.open) libOpen.add(x.dataset.id);
      else libOpen.delete(x.dataset.id);
    }));
    el.querySelectorAll("[data-ex]").forEach((cb) => (cb.onchange = () => {
      if (cb.checked) state.exDone[cb.dataset.ex] = realToday();
      else delete state.exDone[cb.dataset.ex];
      save();
      renderLibList();
      const head = el.querySelector(".lib-tools .muted");
      const total = LIB.topics.reduce((a, t) => a + t.exercises.length, 0);
      head.textContent = `Đã làm ${LIB.topics.reduce((a, t) => a + exCount(t), 0)}/${total} bài tập`;
    }));
  }

  function openTopic(id) {
    const t = topicById(id);
    if (!t) return;
    libSubject = t.subject;
    libQuery = "";
    libOpen.add(id);
    showTab("library");
    renderLibrary();
    const el = document.getElementById(`topic-${id}`);
    if (el) el.scrollIntoView({ block: "start" });
  }

  // ---------- Thư viện (PDF trên máy bạn) ----------
  function shelfItem(x, extra = "") {
    const on = !!state.matDone[x.key];
    const meta = [x.note, mb(x.size), x.file ? "" : "chỉ có trên Drive"].filter(Boolean).join(" · ");
    return `<li><input type="checkbox" data-mat="${esc(x.key)}" ${on ? "checked" : ""}>
      <span class="${on ? "done" : ""}"><b>${esc(x.title)}</b>${extra}${meta ? `<br><span class="small muted">${esc(meta)}</span>` : ""}</span>
      <span class="mins">${matOpen(x)}</span></li>`;
  }
  const shelfList = (list, extra) => (list.length ? `<ul class="checks">${list.map((x) => shelfItem(x, extra ? extra(x) : "")).join("")}</ul>` : `<p class="muted small">Chưa có file nào.</p>`);

  function renderShelf() {
    const el = document.getElementById("tab-shelf");
    if (!MAT) {
      el.innerHTML = `<h2>Thư viện</h2><div class="card"><p>Máy này chưa có danh sách tài liệu.</p>
        <ol class="small"><li>Chép các PDF vào thư mục <code>materials/</code> cạnh <code>index.html</code>, ví dụ <code>materials/ielts/cambridge/Cambridge 7.pdf</code>.</li>
        <li>Nếu có danh sách file Google Drive, đặt ở <code>materials/inventory.json</code> để có thêm link Drive.</li>
        <li>Chạy <code>npm run materials</code> rồi tải lại trang.</li></ol>
        <p class="small muted">Thư mục materials/ nằm trong .gitignore nên sách và đề không bị đưa lên GitHub.</p></div>`;
      return;
    }
    const d = today();
    const tests = camTests();
    const doneTests = tests.filter((t) => camMock(t.id)).length;
    const next = tests.find((t) => !camMock(t.id) && t.date >= d) || tests.find((t) => !camMock(t.id));
    const std = hskStd();
    const ph = L.phaseAt(std.phases, d);
    const phaseOf = (pred) => std.phases.filter((p) => pred(p.materials || {})).map((p) => p.name);
    const words30 = P.hskStandards["3.0"].levels;
    const by = (cat, pred = () => true) => mats((x) => x.cat === cat && pred(x));
    const local = mats((x) => x.file).length;

    const camRows = tests.map((t) => {
      const m = camMock(t.id);
      const book = matByKey(`cambridge-${t.book}`);
      const cls = next && next.id === t.id ? ' style="font-weight:600"' : t.date < d && !m ? ' class="muted"' : "";
      return `<tr${cls}><td>${fmt(t.date)}</td><td>${camLabel(t.id)}</td><td>${book ? matOpen(book) : ""}</td>
        <td>${m ? `<b>${band(m.overall)}</b> <span class="small muted">${L.SKILLS.map((k) => k[0] + " " + band(m.scores[k])).join(" · ")}</span>` : ""}</td>
        <td><button type="button" class="doclink" data-score="${t.id}">${m ? "Nhập lại" : "Nhập điểm"}</button></td></tr>`;
    }).join("");

    el.innerHTML = `
      <h2>Thư viện: sách và đề của bạn</h2>
      <div class="grid">
        <div class="card"><div class="muted small">Đề Cambridge đã làm</div><div class="stat">${doneTests} <small>/ ${tests.length} đề</small></div>
          <div class="bar"><span style="width:${pct(doneTests, tests.length)}%;background:var(--ielts)"></span></div></div>
        <div class="card"><div class="muted small">Đề tiếp theo</div><div class="stat" style="font-size:20px">${next ? camLabel(next.id) : "Đã làm hết"}</div>
          <div class="small muted">${next ? fmt(next.date) : ""}</div></div>
        <div class="card"><div class="muted small">Tài liệu</div><div class="stat">${MAT.length} <small>file</small></div>
          <div class="small muted">${local} file mở thẳng trên máy${MAT.length > local ? `, ${MAT.length - local} chỉ có trên Drive` : ""}</div></div>
      </div>

      ${tests.length ? `<div class="card"><h3>Luyện đề Cambridge IELTS</h3>
        <p class="small muted">Mỗi thứ Bảy làm một đề đủ 4 kỹ năng có bấm giờ, Chủ nhật chữa đề. Lịch tự lùi theo ngày thi IELTS trong Cài đặt, đề cuối cùng cách ngày thi vài ngày. Đáp án và transcript nằm ở cuối mỗi sách. File PDF không có audio, nên phần Listening cần audio đúng cuốn sách đó.</p>
        <div style="overflow-x:auto"><table><tr><th>Ngày</th><th>Đề</th><th>Sách</th><th>Điểm</th><th></th></tr>${camRows}</table></div></div>` : ""}

      <div class="grid">
        <div class="card"><h3>IELTS Reading theo dạng câu hỏi</h3>
          <p class="small muted">Các buổi Reading ở tab Hôm nay lần lượt mở từng file này, mỗi tuần một dạng.</p>
          ${shelfList(by("reading"))}</div>
        <div class="card"><h3>IELTS Writing Task 1</h3>
          <p class="small muted">Các buổi Writing Task 1 lần lượt mở từng file, mỗi tuần một dạng biểu đồ.</p>
          ${shelfList(by("writing", (x) => x.task === 1))}</div>
      </div>
      <div class="grid">
        <div class="card"><h3>IELTS Writing Task 2</h3>${shelfList(by("writing", (x) => x.task === 2))}</div>
        <div class="card"><h3>Đề luyện Writing đầy đủ</h3>
          <p class="small muted">Làm đề trước trong 60 phút, sau đó mới mở bài mẫu.</p>
          ${shelfList(by("writing", (x) => x.task === 0))}</div>
      </div>

      <div class="card"><h3>Giáo trình HSK</h3>
        ${shelfList(by("course"), (x) => { const ps = phaseOf((m) => m.course === x.book); return ps.length ? ` <span class="pill hsk">${esc(ps.join(", "))}</span>` : ""; })}</div>
      <div class="card"><h3>Từ vựng HSK theo cấp</h3>
        <p class="small muted">Các danh sách này theo chuẩn HSK 3.0. Số từ ghi bên cạnh là tổng tích lũy tới hết cấp đó.${ph && hskMats(ph).length ? " Cấp đang học được đánh dấu." : ""}</p>
        ${shelfList(by("vocab"), (x) => {
          const lv = words30.find((l) => l.level === x.level);
          const cur = ph && (ph.materials && ph.materials.vocab || []).includes(x.level);
          return `${lv ? ` <span class="small muted">${num(lv.words)} từ</span>` : ""}${cur ? ' <span class="pill good">Đang học</span>' : ""}${std === P.hskStandards["3.0"] && Number(S().hskTargetLevel) === x.level ? ' <span class="pill warn">Mục tiêu</span>' : ""}`;
        })}</div>
      <div class="grid">
        <div class="card"><h3>Giấy luyện viết</h3><p class="small muted">In ra, dùng trong 10 phút viết tay mỗi buổi HSK.</p>${shelfList(by("paper"))}</div>
        ${by("other").length ? `<div class="card"><h3>Tài liệu khác</h3>${shelfList(by("other"))}</div>` : ""}
      </div>
      <p class="small muted">Danh sách tạo lúc ${esc(new Date(window.MATERIALS.generated).toLocaleString("vi-VN"))}. Thêm hoặc đổi tên file trong materials/ thì chạy lại <code>npm run materials</code>.</p>`;

    el.querySelectorAll("[data-mat]").forEach((cb) => (cb.onchange = () => {
      if (cb.checked) state.matDone[cb.dataset.mat] = realToday();
      else delete state.matDone[cb.dataset.mat];
      save();
      renderShelf();
    }));
    el.querySelectorAll("[data-score]").forEach((b) => (b.onclick = () => {
      pendingTest = b.dataset.score;
      showTab("ielts");
      renderIelts();
      document.getElementById("mockCard").scrollIntoView({ block: "start" });
    }));
  }

  // ---------- Nhật ký ----------
  function renderLog() {
    const el = document.getElementById("tab-log");
    const logs = [...state.logs].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 60);
    const totals = {};
    state.logs.forEach((l) => (totals[l.subject] = (totals[l.subject] || 0) + l.minutes));
    el.innerHTML = `
      <h2>Nhật ký học</h2>
      <div class="grid">${Object.entries(SUBJECTS).map(([k, v]) => `<div class="card"><div class="muted small">Tổng ${v.name}</div><div class="stat">${hrs(totals[k] || 0)} <small>giờ</small></div></div>`).join("")}</div>
      
      <div class="card"><h3>Giờ học 10 tuần gần nhất</h3>${weeklyBars(10)}</div>
      <div class="card"><h3>Ghi thêm</h3>
        <form class="row" id="logForm">
          <label>Ngày<input type="date" name="date" value="${today()}" required></label>
          <label>Môn<select name="subject">${Object.entries(SUBJECTS).map(([k, v]) => `<option value="${k}">${v.name}</option>`).join("")}</select></label>
          <label>Phút<input type="number" name="minutes" min="1" value="60" required></label>
          <label style="flex:1;min-width:160px">Ghi chú<input name="note" placeholder="Ví dụ: Cambridge 17 Test 2"></label>
          <button class="btn">Ghi</button>
        </form>
        <table style="margin-top:12px"><tr><th>Ngày</th><th>Môn</th><th>Phút</th><th>Ghi chú</th><th></th></tr>
          ${logs.map((l) => `<tr><td>${fmtShort(l.date)}/${l.date.slice(2, 4)}</td><td>${SUBJECTS[l.subject].name}</td><td>${l.minutes}</td><td>${esc(l.note || "")}</td>
            <td>${l.source ? '<span class="small muted">từ lịch</span>' : `<button class="link" data-del-log="${l.id}">Xóa</button>`}</td></tr>`).join("") || `<tr><td colspan="5" class="muted">Chưa có gì. Đánh dấu việc ở tab Hôm nay hoặc dùng bấm giờ.</td></tr>`}
        </table></div>`;
    el.querySelector("#logForm").onsubmit = (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      addLog({ date: f.get("date"), subject: f.get("subject"), minutes: Number(f.get("minutes")), note: f.get("note") });
      save();
      renderAll();
      toast("Đã ghi");
    };
    el.querySelectorAll("[data-del-log]").forEach((b) => (b.onclick = () => {
      state.logs = state.logs.filter((l) => String(l.id) !== b.dataset.delLog);
      save();
      renderAll();
    }));
  }

  // ---------- Cài đặt ----------
  function levelOptions(stdKey, current) {
    const levels = (P.hskStandards[stdKey] || hskStd()).levels;
    const cur = levels.some((l) => l.level === Number(current)) ? Number(current) : levels[levels.length - 1].level;
    return levels.map((l) => `<option value="${l.level}" ${cur === l.level ? "selected" : ""}>${l.label || l.level}</option>`).join("");
  }

  function renderSettings() {
    const el = document.getElementById("tab-settings");
    const s = S();
    const field = (key, label, type = "date", extra = "") =>
      `<label class="field">${label}<input type="${type}" name="${key}" value="${esc(s[key])}" ${extra}></label>`;
    el.innerHTML = `
      <h2>Cài đặt</h2>
      <form class="card" id="setForm">
        <div class="settings">
          ${field("exam30Start", "Bắt đầu ôn Đồ thị + OOP")}
          ${field("exam30End", "Ngày thi Đồ thị + OOP")}
          ${field("ieltsExam", "Ngày thi IELTS")}
          ${field("hskExam", "Ngày thi HSK")}
          ${field("graduation", "Ngày tốt nghiệp")}
          ${field("ieltsStartBand", "IELTS đầu vào", "number", 'step="0.5" min="0" max="9"')}
          ${field("ieltsTargetBand", "IELTS mục tiêu", "number", 'step="0.5" min="0" max="9"')}
          ${field("hoursPerBand", "Giờ học cho mỗi band", "number", 'min="50" step="10"')}
          ${field("weeklyIeltsHours", "Mục tiêu giờ IELTS/tuần", "number", 'min="0" step="0.5"')}
          ${field("weeklyHskHours", "Mục tiêu giờ HSK/tuần", "number", 'min="0" step="0.5"')}
          ${field("hskStartWords", "Số từ tiếng Trung đã biết lúc đầu", "number", 'min="0"')}
          <label class="field">Chuẩn HSK<select name="hskStandard">${Object.entries(P.hskStandards).map(([k, v]) => `<option value="${k}" ${s.hskStandard === k ? "selected" : ""}>${esc(v.name)}</option>`).join("")}</select></label>
          <label class="field">HSK mục tiêu<select name="hskTargetLevel">${levelOptions(s.hskStandard, s.hskTargetLevel)}</select></label>
        </div>
        <p class="small muted">Lịch 30 ngày luôn có 30 mục việc; nếu khoảng ngày ngắn hơn, việc sẽ được dồn lại khi bạn bị trễ. Kế hoạch IELTS/HSK theo tuần sửa trong js/data.js.</p>
        <button class="btn">Lưu cài đặt</button>
      </form>
      <div class="card"><h3>Sao lưu</h3>
        <p class="small muted">Dữ liệu chỉ nằm trong trình duyệt này. Xuất file JSON định kỳ để không mất khi xóa dữ liệu trình duyệt.</p>
        <div class="row" style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn ghost" id="exportBtn">Xuất dữ liệu</button>
          <label class="btn ghost" style="display:inline-block">Nhập dữ liệu<input type="file" id="importFile" accept="application/json" hidden></label>
          <button class="btn ghost" id="resetBtn" style="color:var(--bad)">Xóa toàn bộ</button>
        </div></div>`;

    el.querySelector('[name="hskStandard"]').onchange = (e) => {
      const t = el.querySelector('[name="hskTargetLevel"]');
      t.innerHTML = levelOptions(e.target.value, t.value);
    };
    el.querySelector("#setForm").onsubmit = (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      for (const [k, v] of f.entries()) state.settings[k] = typeof P.defaults[k] === "number" ? Number(v) : v;
      if (state.settings.exam30End < state.settings.exam30Start) {
        toast("Ngày thi phải sau ngày bắt đầu ôn.");
        return;
      }
      save();
      renderAll();
      toast("Đã lưu cài đặt");
    };
    el.querySelector("#exportBtn").onclick = () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `lotrinh-${realToday()}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
    };
    el.querySelector("#importFile").onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const data = JSON.parse(await file.text());
        if (!data.settings || !Array.isArray(data.logs)) throw new Error();
        state = { ...blank(), ...data, settings: { ...blank().settings, ...data.settings } };
        save();
        renderAll();
        toast("Đã nhập dữ liệu");
      } catch (err) {
        toast("File không đúng định dạng.");
      }
    };
    let armed = false;
    el.querySelector("#resetBtn").onclick = (e) => {
      if (!armed) {
        armed = true;
        e.target.textContent = "Bấm lần nữa để xóa";
        setTimeout(() => { armed = false; e.target.textContent = "Xóa toàn bộ"; }, 3000);
        return;
      }
      state = blank();
      save();
      renderAll();
      toast("Đã xóa dữ liệu");
    };
  }

  // ---------- khung ----------
  function renderAll() {
    renderToday();
    renderExam30();
    renderIelts();
    renderHsk();
    renderLibrary();
    renderShelf();
    renderLog();
    renderSettings();
  }

  function showTab(name) {
    document.querySelectorAll(".tabs button").forEach((b) => b.classList.toggle("active", b.dataset.tab === name));
    document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t.id === `tab-${name}`));
    try { localStorage.setItem(KEY + ".tab", name); } catch (e) { /* bỏ qua */ }
  }

  document.querySelectorAll(".tabs button").forEach((b) => (b.onclick = () => showTab(b.dataset.tab)));
  // Nút "Tài liệu" ở mọi tab mở thẳng chủ đề tương ứng
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-topic]");
    if (!b) return;
    e.preventDefault();
    openTopic(b.dataset.topic);
  });
  renderAll();
  try { showTab(localStorage.getItem(KEY + ".tab") || "today"); } catch (e) { showTab("today"); }
})();
