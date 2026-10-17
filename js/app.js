// Giao diện. Dữ liệu lưu trong localStorage của trình duyệt; dùng Cài đặt > Xuất dữ liệu để sao lưu.
(function () {
  const L = window.Logic;
  const P = window.PLAN;
  const KEY = "lotrinh.v1";

  const SUBJECTS = {
    graph: { name: "Đồ thị", color: "var(--graph)", minutes: 120 },
    oop: { name: "OOP", color: "var(--oop)", minutes: 90 },
    ielts: { name: "IELTS", color: "var(--ielts)" },
    hsk: { name: "HSK", color: "var(--hsk)" },
  };

  // ---------- trạng thái ----------
  function blank() {
    return { settings: { ...P.defaults, viewDate: "" }, done30: {}, daily: {}, logs: [], mocks: [], hskWords: [], exDone: {} };
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

  function knownWords() {
    const w = [...state.hskWords].sort((a, b) => (a.date < b.date ? 1 : -1))[0];
    return w ? w.words : S().hskStartWords;
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
          ${esc(t.text)} ${t.moved ? `<span class="moved small">(dời từ ngày ${t.day})</span>` : ""} ${dayDocLinks(t)}</span>
          <span class="mins">${t.rest ? "" : SUBJECTS[t.subject].minutes + "'"}</span></li>`).join("") +
        dailyItem(d, "vocab", "ielts", 20, "IELTS: 20 phút từ vựng (giữ nhịp)") +
        `</ul></div>`;
    } else {
      const ph = ieltsPhaseNo(d);
      const wd = L.parseDate(d).getDay();
      const ielts = (P.ieltsWeek[ph][wd] || []);
      const hp = L.phaseAt(P.hskPhases, d) || P.hskPhases[d < P.hskPhases[0].from ? 0 : 3];
      const scale = hp.minutes / 60;
      const before = d < P.ieltsPhases[0].from;
      plan = `<div class="grid">
        <div class="card"><h3>IELTS · giai đoạn ${ph}${before ? " (chưa bắt đầu)" : ""}</h3>
          ${ielts.length ? `<ul class="checks">${ielts.map((it, i) => dailyItem(d, `i${i}`, "ielts", it[1], `<span class="pill good">${it[0]}</span> ${esc(it[2])} ${docLink("ielts", SKILL_DOC[it[0]])}`)).join("")}</ul>` : `<p class="muted">Hôm nay nghỉ IELTS.</p>`}
          ${focusHint()}
        </div>
        <div class="card"><h3>HSK · ${esc(hp.name)}</h3><ul class="checks">
          ${P.hskSession.map((s, i) => dailyItem(d, `h${i}`, "hsk", Math.round(s[0] * scale), esc(s[1]))).join("")}
        </ul><p class="small muted">${esc(hp.focus)}</p><p class="small">Tài liệu: ${docLink("hsk", "h-pinyin", "Pinyin")} · ${docLink("hsk", "h-grammar", "Ngữ pháp")} · ${docLink("hsk", "h-method", "Cách học")}</p></div></div>`;
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
          ${t.moved ? `<span class="moved">· từ ngày ${t.day}</span>` : ""} ${dayDocLinks(t)}</span></label>`).join("")}
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
      
      <div class="card"><h3>Nhập đề thử</h3>
        <form class="row" id="mockForm">
          <label>Ngày<input type="date" name="date" value="${d}" required></label>
          ${L.SKILLS.map((k) => `<label>${k}<input type="number" name="${k}" min="0" max="9" step="0.5" required></label>`).join("")}
          <button class="btn">Lưu</button>
        </form>
        <table style="margin-top:12px"><tr><th>Ngày</th>${L.SKILLS.map((k) => `<th>${k[0]}</th>`).join("")}<th>Overall</th><th></th></tr>
          ${[...mocks].reverse().map((x) => `<tr><td>${fmtShort(x.date)}/${x.date.slice(2, 4)}</td>${L.SKILLS.map((k) => `<td>${band(x.scores[k])}</td>`).join("")}<td><b>${band(x.overall)}</b></td>
            <td><button class="link" data-del-mock="${x.id}">Xóa</button></td></tr>`).join("") || `<tr><td colspan="7" class="muted">Chưa có đề thử nào.</td></tr>`}
        </table></div>`;

    el.querySelector("#mockForm").onsubmit = (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      const scores = {};
      L.SKILLS.forEach((k) => (scores[k] = Number(f.get(k))));
      state.mocks.push({ id: Date.now(), date: f.get("date"), scores, overall: L.ieltsOverall(scores.Listening, scores.Reading, scores.Writing, scores.Speaking) });
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
    const pr = L.hskProjection({ knownWords: known, targetLevel: Number(S().hskTargetLevel), levels: P.hskLevels, today: d, exam: S().hskExam });
    const ph = L.phaseAt(P.hskPhases, d);
    const phTarget = ph ? ph.words : null;
    const phDays = ph ? Math.max(L.daysBetween(d, ph.to), 1) : 0;
    const words = [...state.hskWords].sort((a, b) => (a.date < b.date ? -1 : 1));
    const planLine = [{ x: P.hskPhases[0].from, y: S().hskStartWords }, ...P.hskPhases.map((p) => ({ x: p.to, y: p.words }))];
    const yMax = Math.max(1400, pr.targetWords + 200, known + 200);
    const chart = lineChart({
      from: P.hskPhases[0].from, to: S().hskExam > "2028-04-30" ? S().hskExam : "2028-04-30",
      yMin: 0, yMax: Math.ceil(yMax / 200) * 200, yStep: yMax > 2000 ? 500 : 200, target: pr.targetWords,
      series: [
        { color: "var(--muted)", dashed: true, width: 1.5, points: planLine },
        { color: "var(--hsk)", points: words.map((w) => ({ x: w.date, y: w.words })) },
      ],
    });

    el.innerHTML = `
      <h2>HSK: mục tiêu HSK ${S().hskTargetLevel}</h2>
      <div class="grid">
        <div class="card"><div class="muted small">Số từ đã thuộc</div><div class="stat">${known} <small>/ ${pr.targetWords}</small></div>
          <div class="bar"><span style="width:${pct(known, pr.targetWords)}%;background:var(--hsk)"></span></div>
          <div class="small muted">Tương đương ${pr.level ? "HSK " + pr.level : "chưa đủ HSK 1"}</div></div>
        <div class="card"><div class="muted small">Cần học mỗi ngày tới ngày thi</div><div class="stat">${num(Math.ceil(pr.perDay * 10) / 10)} <small>từ mới/ngày</small></div>
          <div class="small muted">Còn ${pr.daysLeft} ngày tới ${fmtShort(S().hskExam)}/${S().hskExam.slice(2, 4)}</div></div>
        <div class="card"><div class="muted small">Mốc giai đoạn hiện tại</div>
          ${ph ? `<div class="stat">${num(Math.max(Math.ceil(((phTarget - known) / phDays) * 10) / 10, 0))} <small>từ/ngày</small></div><div class="small muted">để đạt ${phTarget} từ trước ${fmtShort(ph.to)}/${ph.to.slice(2, 4)}</div>`
            : `<div class="muted">Ngoài các giai đoạn đã lên lịch.</div>`}</div>
      </div>
      
      <div class="card"><h3>Số từ theo thời gian</h3>${chart}
        <div class="legend"><span><i style="background:var(--hsk)"></i>Số từ bạn nhập</span><span><i style="background:var(--muted)"></i>Lộ trình dự kiến</span><span><i style="background:var(--warn)"></i>Mục tiêu HSK ${S().hskTargetLevel}</span></div></div>
      <div class="grid">
        <div class="card"><h3>Cập nhật số từ</h3>
          <form class="row" id="wordForm"><label>Ngày<input type="date" name="date" value="${d}"></label>
            <label>Số từ đã thuộc<input type="number" name="words" min="0" value="${known}"></label><button class="btn">Lưu</button></form>
          <p class="small muted">Lấy số thẻ đã "mature" hoặc đã học trong Anki là đủ chính xác.</p></div>
        <div class="card"><h3>Các giai đoạn</h3><table><tr><th>Giai đoạn</th><th>Đến</th><th>Từ</th><th>Phút/ngày</th></tr>
          ${P.hskPhases.map((p) => `<tr ${ph && ph.id === p.id ? 'style="font-weight:600"' : ""}><td>${esc(p.name)}</td><td>${fmtShort(p.to)}/${p.to.slice(2, 4)}</td><td>${p.words}</td><td>${p.minutes}</td></tr>`).join("")}</table></div>
      </div>
      
      <div class="card"><h3>Mức HSK và số từ</h3><table><tr><th>Cấp</th><th>Từ vựng (chuẩn HSK 2.0)</th><th></th></tr>
        ${P.hskLevels.map((l) => `<tr><td>HSK ${l.level}</td><td>${l.words}</td><td>${known >= l.words ? '<span class="pill good">Đạt</span>' : ""}</td></tr>`).join("")}</table>
        <p class="small muted">Nếu trung tâm thi đã chuyển sang chuẩn HSK 3.0 (9 cấp), số từ mỗi cấp sẽ khác. Sửa trong js/data.js.</p></div>`;

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
  const CT = window.CONTENT;
  const DOC_SUBJECTS = ["graph", "oop", "ielts", "hsk"];
  const SKILL_DOC = { Listening: "i-listening", Reading: "i-reading", Writing: "i-writing2", Speaking: "i-speaking",
    Vocab: "i-vocab", Grammar: "i-grammar", Mock: "i-format" };
  const docs = { subject: "graph", topic: CT.graph.topics[0].id, query: "" };

  function findTopic(subject, id) {
    return CT[subject].topics.find((t) => t.id === id);
  }

  function docLink(subject, id, label) {
    const t = id && findTopic(subject, id);
    if (!t) return "";
    return `<a href="#" class="doclink" data-doc="${subject}|${id}" title="${esc(t.title)}">${esc(label || "Tài liệu")}</a>`;
  }

  function dayDocLinks(t) {
    if (t.rest) return "";
    const v = CT.dayTopics[t.subject][t.day];
    if (!v) return "";
    const ids = [].concat(v);
    return ids.map((id, i) => docLink(t.subject, id, ids.length > 1 ? `Tài liệu ${i + 1}` : "Tài liệu")).join(" ");
  }

  function openDoc(subject, id) {
    docs.subject = subject;
    docs.topic = id;
    docs.query = "";
    renderDocs();
    showTab("docs");
    window.scrollTo(0, 0);
  }

  function exProgress(subject) {
    let done = 0, total = 0;
    CT[subject].topics.forEach((t) => t.exercises.forEach((_, i) => {
      total++;
      if (state.exDone[`${t.id}#${i}`]) done++;
    }));
    return { done, total };
  }

  function plainText(html) {
    return html.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ").toLowerCase();
  }

  function renderDocs() {
    const el = document.getElementById("tab-docs");
    const subj = CT[docs.subject];
    const q = docs.query.trim().toLowerCase();
    const topics = subj.topics.filter((t) => !q || (t.title + plainText(t.theory) + (t.code || "") +
      t.exercises.map((e) => plainText(e.q)).join(" ")).toLowerCase().includes(q));
    const topic = findTopic(docs.subject, docs.topic) || subj.topics[0];
    const p = exProgress(docs.subject);
    const done = (t) => t.exercises.filter((_, i) => state.exDone[`${t.id}#${i}`]).length;

    el.innerHTML = `
      <h2>Tài liệu</h2>
      <div class="doc-subjects">${DOC_SUBJECTS.map((k) => {
        const pr = exProgress(k);
        return `<button class="chip ${k === docs.subject ? "active" : ""}" data-subj="${k}">${esc(CT[k].name)} <span class="muted small">${pr.done}/${pr.total}</span></button>`;
      }).join("")}</div>
      <div class="docs">
        <aside class="card toc">
          <input type="search" id="docSearch" placeholder="Tìm trong ${esc(subj.name)}…" value="${esc(docs.query)}">
          <div class="small muted" style="margin:8px 0">Bài tập đã làm: ${p.done}/${p.total}</div>
          <ol>${topics.map((t) => `<li><a href="#" data-doc="${docs.subject}|${t.id}" class="${t.id === topic.id ? "active" : ""}">${esc(t.title)}</a>
            <span class="small muted">${done(t)}/${t.exercises.length}</span></li>`).join("") || `<li class="muted">Không tìm thấy.</li>`}</ol>
          <h3 style="margin-top:14px">Link học</h3>
          <ul class="links">${CT.links[docs.subject].map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.title)}</a><div class="small muted">${esc(l.note)}</div></li>`).join("")}</ul>
        </aside>
        <article class="card doc">
          <h2>${esc(topic.title)}</h2>
          <div class="theory">${topic.theory}</div>
          ${topic.code ? `<h3>Code mẫu</h3><pre><code>${esc(topic.code)}</code></pre>` : ""}
          <h3>Bài tập</h3>
          <ol class="exercises">${topic.exercises.map((e, i) => {
            const key = `${topic.id}#${i}`;
            return `<li><div class="q">${e.q}</div>
              <details><summary>Xem lời giải</summary><div class="a">${e.a}</div></details>
              <label class="small"><input type="checkbox" data-ex="${key}" ${state.exDone[key] ? "checked" : ""}> Đã làm</label></li>`;
          }).join("")}</ol>
        </article>
      </div>`;

    el.querySelectorAll("[data-subj]").forEach((b) => (b.onclick = () => {
      docs.subject = b.dataset.subj;
      docs.topic = CT[docs.subject].topics[0].id;
      docs.query = "";
      renderDocs();
    }));
    const search = el.querySelector("#docSearch");
    search.oninput = () => {
      docs.query = search.value;
      renderDocs();
      const s2 = document.getElementById("docSearch");
      s2.focus();
      s2.setSelectionRange(s2.value.length, s2.value.length);
    };
    el.querySelectorAll("[data-ex]").forEach((cb) => (cb.onchange = () => {
      if (cb.checked) state.exDone[cb.dataset.ex] = true;
      else delete state.exDone[cb.dataset.ex];
      save();
      renderDocs();
    }));
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-doc]");
    if (!a) return;
    e.preventDefault();
    const [subject, id] = a.dataset.doc.split("|");
    openDoc(subject, id);
  });

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
          <label class="field">HSK mục tiêu<select name="hskTargetLevel">${P.hskLevels.map((l) => `<option ${Number(s.hskTargetLevel) === l.level ? "selected" : ""}>${l.level}</option>`).join("")}</select></label>
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
    renderDocs();
    renderLog();
    renderSettings();
  }

  function showTab(name) {
    document.querySelectorAll(".tabs button").forEach((b) => b.classList.toggle("active", b.dataset.tab === name));
    document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t.id === `tab-${name}`));
    try { localStorage.setItem(KEY + ".tab", name); } catch (e) { /* bỏ qua */ }
  }

  document.querySelectorAll(".tabs button").forEach((b) => (b.onclick = () => showTab(b.dataset.tab)));
  renderAll();
  try { showTab(localStorage.getItem(KEY + ".tab") || "today"); } catch (e) { showTab("today"); }
})();
