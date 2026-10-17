// Công cụ luyện IELTS: quy đổi điểm thô ra band, đếm từ, tiêu chí tự chấm Writing, đề nói Part 2.
(function (root) {
  // Bảng quy đổi số câu đúng (trên 40) ra band, theo bảng ước tính được dùng phổ biến.
  // Bảng thật của từng đề có thể lệch 1 câu, nên kết quả chỉ là ước tính.
  const BANDS = {
    Listening: [[39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6], [18, 5.5], [16, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [0, 0]],
    Reading: [[39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6], [19, 5.5], [15, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [0, 0]],
  };

  function bandFromRaw(skill, raw) {
    const t = BANDS[skill];
    if (!t) throw new Error(`Không có bảng quy đổi cho ${skill}`);
    const r = Math.max(0, Math.min(40, Math.floor(raw)));
    return t.find(([min]) => r >= min)[1];
  }

  // Số câu đúng tối thiểu để đạt một band
  function rawForBand(skill, band) {
    const row = [...BANDS[skill]].reverse().find(([, b]) => b >= band);
    return row ? row[0] : null;
  }

  const wordCount = (text) => (String(text).match(/[A-Za-zÀ-ỹ0-9]+(?:['’-][A-Za-zÀ-ỹ0-9]+)*/g) || []).length;

  // Band Writing ước tính từ 4 tiêu chí: trung bình, làm tròn xuống 0,5.
  function writingBand(scores) {
    const v = ["TA", "CC", "LR", "GRA"].map((k) => Number(scores[k]));
    if (v.some((x) => !Number.isFinite(x))) return null;
    return Math.floor((v.reduce((a, b) => a + b, 0) / 4) * 2) / 2;
  }

  // Câu hỏi tự kiểm cho từng tiêu chí, viết lại ngắn gọn để tự chấm. Mỗi câu "có" gần như là điều kiện để lên band ghi bên cạnh.
  const CRITERIA = [
    { key: "TA", name: "Task Achievement / Task Response", checks: [
      [6, "Trả lời đủ mọi phần của đề, không lạc đề"],
      [6, "Task 1: có câu overview nêu xu hướng hoặc đặc điểm chính. Task 2: có quan điểm rõ ở mở bài"],
      [7, "Mỗi ý chính có giải thích và ví dụ cụ thể, không chỉ liệt kê"],
      [7, "Task 1: chọn số liệu nổi bật để so sánh, không chép hết số. Task 2: quan điểm nhất quán từ đầu tới cuối"],
    ] },
    { key: "CC", name: "Coherence and Cohesion", checks: [
      [6, "Chia đoạn hợp lý, mỗi đoạn một ý chính"],
      [6, "Dùng từ nối đúng nghĩa (however, as a result, in contrast...)"],
      [7, "Từ nối đa dạng, không đặt ở đầu mọi câu một cách máy móc"],
      [7, "Dùng đại từ và từ thay thế để tránh lặp danh từ"],
    ] },
    { key: "LR", name: "Lexical Resource", checks: [
      [6, "Đủ từ để diễn đạt ý, lỗi chính tả ít và không làm khó hiểu"],
      [6, "Có diễn đạt lại đề bằng từ của mình (paraphrase)"],
      [7, "Có collocation tự nhiên và vài từ ít phổ biến dùng đúng ngữ cảnh"],
      [7, "Hầu như không lặp một từ quá 3 lần"],
    ] },
    { key: "GRA", name: "Grammatical Range and Accuracy", checks: [
      [6, "Có cả câu đơn và câu phức, lỗi ngữ pháp không làm khó hiểu"],
      [6, "Chia thì và số ít/số nhiều đúng ở phần lớn câu"],
      [7, "Dùng được mệnh đề quan hệ, câu điều kiện, bị động khi cần"],
      [7, "Phần lớn câu không có lỗi"],
    ] },
  ];

  // Band gợi ý cho một tiêu chí từ các ô đã tích: đủ ô band 6 thì được 6, đủ cả ô band 7 thì được 7.
  function criterionBand(checks, ticked) {
    const has = (b) => checks.every(([lv], i) => lv !== b || ticked.includes(i));
    if (has(6) && has(7)) return 7;
    if (has(6)) return 6;
    const n6 = checks.filter(([lv], i) => lv === 6 && ticked.includes(i)).length;
    return n6 ? 5.5 : 5;
  }

  // Đề Speaking Part 2 tự soạn theo các dạng chủ đề hay gặp.
  const CUE_CARDS = [
    ["Describe a book you enjoyed reading.", ["what the book was", "when you read it", "what it was about", "and explain why you enjoyed it"]],
    ["Describe a person who has influenced you.", ["who this person is", "how you know them", "what they did", "and explain how they influenced you"]],
    ["Describe a place you would like to visit in the future.", ["where it is", "how you know about it", "what you would do there", "and explain why you want to go"]],
    ["Describe a skill you learned that was difficult at first.", ["what the skill is", "when you learned it", "why it was difficult", "and explain how you got better"]],
    ["Describe a piece of technology you use every day.", ["what it is", "when you started using it", "what you use it for", "and explain how your life would change without it"]],
    ["Describe a time you helped someone.", ["who you helped", "what the problem was", "how you helped", "and explain how you felt afterwards"]],
    ["Describe a memorable trip you took.", ["where you went", "who you went with", "what you did", "and explain why it was memorable"]],
    ["Describe a teacher you remember well.", ["who the teacher was", "what subject they taught", "what they were like", "and explain why you remember them"]],
    ["Describe a festival that is important in your country.", ["what it is", "when it happens", "what people do", "and explain why it is important"]],
    ["Describe a goal you want to achieve.", ["what the goal is", "when you set it", "what you are doing to reach it", "and explain why it matters to you"]],
    ["Describe a website or app you find useful.", ["what it is", "how you found it", "what you use it for", "and explain why it is useful"]],
    ["Describe a time you had to make a difficult decision.", ["what the decision was", "when it happened", "what you decided", "and explain why it was difficult"]],
    ["Describe a hobby you enjoy.", ["what the hobby is", "when you started", "how often you do it", "and explain why you enjoy it"]],
    ["Describe a meal you remember well.", ["what you ate", "where you had it", "who you were with", "and explain why you remember it"]],
    ["Describe a park or garden you like to visit.", ["where it is", "what it looks like", "what you do there", "and explain why you like it"]],
    ["Describe an important piece of news you heard.", ["what the news was", "how you heard it", "how people reacted", "and explain why it was important"]],
    ["Describe a time you were late for something.", ["what you were late for", "why you were late", "what happened", "and explain how you felt"]],
    ["Describe a friend you have known for a long time.", ["who the friend is", "how you met", "what you do together", "and explain why the friendship has lasted"]],
    ["Describe a film that made you think.", ["what the film was", "when you watched it", "what it was about", "and explain what it made you think about"]],
    ["Describe a change you would like to make in your city.", ["what the change is", "why it is needed", "how it could be done", "and explain how people would benefit"]],
    ["Describe a time you learned something from a mistake.", ["what the mistake was", "when it happened", "what you learned", "and explain how it changed you"]],
    ["Describe a building you find interesting.", ["where it is", "what it looks like", "what it is used for", "and explain why you find it interesting"]],
    ["Describe a sport you would like to try.", ["what the sport is", "how you know about it", "what you would need", "and explain why you want to try it"]],
    ["Describe an occasion when you used a foreign language.", ["when and where it was", "who you were talking to", "what you talked about", "and explain how you felt"]],
  ];

  const api = { BANDS, bandFromRaw, rawForBand, wordCount, writingBand, CRITERIA, criterionBand, CUE_CARDS };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.IeltsTools = api;
})(this);
