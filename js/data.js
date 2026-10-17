// Nội dung lộ trình. Sửa file này nếu đề cương hoặc mốc thời gian của bạn khác.
(function (root) {
  const PLAN = {
    defaults: {
      exam30Start: "2026-10-18",
      exam30End: "2026-11-16",
      ieltsExam: "2027-12-01",
      hskExam: "2028-04-15",
      graduation: "2028-06-30",
      ieltsStartBand: 4.5,
      ieltsTargetBand: 7.0,
      hskStartWords: 50,
      hskTargetLevel: 4,
      hoursPerBand: 250,
      weeklyIeltsHours: 13,
      weeklyHskHours: 5.5,
    },

    // Phần 1: 30 ngày. type "rest" không được dời lịch.
    days30: [
      { week: 1, graph: "Định nghĩa, bậc, định lý bắt tay, các loại đồ thị", oop: "Lớp và đối tượng, thuộc tính, phương thức" },
      { week: 1, graph: "Biểu diễn: ma trận kề, danh sách kề, ma trận liên thuộc", oop: "Đóng gói, phạm vi truy cập, getter/setter" },
      { week: 1, graph: "Đường đi, chu trình, tính liên thông, đỉnh khớp, cầu", oop: "Hàm tạo, hàm hủy, hàm tạo sao chép" },
      { week: 1, graph: "BFS: cài đặt, chạy tay từng bước", oop: "Thành viên static, this, const" },
      { week: 1, graph: "DFS, thành phần liên thông, liên thông mạnh", oop: "Code bài: lớp PhanSo hoặc SinhVien đầy đủ" },
      { week: 1, graph: "Làm 10 bài tập chương 1–2 trong đề cũ", oop: "Nạp chồng toán tử (C++) hoặc equals/toString (Java)" },
      { week: 1, graph: "Ôn tuần: tự viết lại định nghĩa và chứng minh không nhìn sách", oop: "Ôn tuần: làm 1 đề OOP cũ phần lý thuyết" },
      { week: 2, graph: "Đồ thị Euler: điều kiện, thuật toán Fleury", oop: "Kế thừa, các kiểu kế thừa" },
      { week: 2, graph: "Đồ thị Hamilton: định lý Dirac, Ore", oop: "Ghi đè phương thức, gọi hàm lớp cha" },
      { week: 2, graph: "Cây: tính chất, cây có gốc, duyệt cây", oop: "Đa hình, hàm ảo, liên kết động" },
      { week: 2, graph: "Cây khung nhỏ nhất: Kruskal", oop: "Lớp trừu tượng, interface" },
      { week: 2, graph: "Cây khung nhỏ nhất: Prim, so sánh với Kruskal", oop: "Code bài: hệ thống Hình (Tròn, Chữ nhật, Tam giác) dùng đa hình" },
      { week: 2, graph: "Chạy tay Kruskal, Prim trên 5 đồ thị trong đề cũ", oop: "Code bài: quản lý nhân viên (lương theo loại NV)" },
      { week: 2, graph: "Ôn tuần + làm nửa đề thi cũ có bấm giờ", oop: "Ôn tuần: vẽ sơ đồ lớp UML cho 2 bài đã code" },
      { week: 3, graph: "Dijkstra: cài đặt, bảng chạy tay", oop: "Quan hệ lớp: kết hợp, kết tập, hợp thành" },
      { week: 3, graph: "Bellman-Ford, cạnh âm, chu trình âm", oop: "Xử lý ngoại lệ" },
      { week: 3, graph: "Floyd-Warshall, truy vết đường đi", oop: "Template/Generic, collection (vector, ArrayList)" },
      { week: 3, graph: "Sắp xếp tôpô, đồ thị có hướng không chu trình", oop: "Nguyên lý SOLID (nắm ý và ví dụ)" },
      { week: 3, graph: "Luồng cực đại: Ford-Fulkerson, lát cắt hẹp nhất", oop: "Mẫu thiết kế cơ bản: Singleton, Factory, Observer" },
      { week: 3, graph: "Đồ thị hai phía, ghép cặp; tô màu, đồ thị phẳng, công thức Euler", oop: "Code bài lớn: quản lý thư viện hoặc cửa hàng (3–5 lớp)" },
      { week: 3, graph: "Ôn tuần: làm trọn 1 đề thi cũ, chấm theo đáp án", oop: "Hoàn thiện bài lớn, tự review theo SOLID" },
      { week: 4, graph: "Đề cũ số 2, bấm giờ đúng thời lượng thi", oop: "Đề cũ số 1, bấm giờ" },
      { week: 4, graph: "Chữa đề, ghi lỗi sai vào sổ lỗi", oop: "Chữa đề, ghi lỗi sai" },
      { week: 4, graph: "Ôn lại chủ đề yếu nhất theo sổ lỗi", oop: "Ôn lại chủ đề yếu nhất" },
      { week: 4, graph: "Đề cũ số 3", oop: "Đề cũ số 2" },
      { week: 4, graph: "Chữa đề, làm thêm bài cùng dạng phần sai", oop: "Chữa đề, code lại bài sai" },
      { week: 4, graph: "Viết 1 trang tóm tắt: định lý, điều kiện, độ phức tạp từng thuật toán", oop: "Viết 1 trang tóm tắt: 4 tính chất OOP, câu hỏi lý thuyết hay gặp" },
      { week: 4, graph: "Đề tự tạo trộn tất cả chương", oop: "Đề cũ số 3 hoặc đề tự tạo" },
      { week: 5, graph: "Đọc lại trang tóm tắt và sổ lỗi, không học mới", oop: "Đọc lại trang tóm tắt và sổ lỗi" },
      { week: 5, graph: "Nghỉ ngơi, ngủ đủ, chuẩn bị đồ đi thi", oop: "Nghỉ ngơi", rest: true },
    ],

    ieltsPhases: [
      { id: 1, name: "Nền tảng", from: "2026-11-17", to: "2027-02-28", band: 5.5,
        focus: "Ngữ pháp nền, 1.500 từ thông dụng, phát âm IPA, nghe chép chính tả" },
      { id: 2, name: "Kỹ năng IELTS", from: "2027-03-01", to: "2027-08-31", band: 6.5,
        focus: "Dạng bài từng kỹ năng, từ vựng theo chủ đề, viết 3 bài/tuần, nói ghi âm mỗi ngày" },
      { id: 3, name: "Luyện đề", from: "2027-09-01", to: "2027-12-31", band: 7.0,
        focus: "Cambridge IELTS 15–20 bấm giờ, sửa Writing với người chấm, Speaking với bạn hoặc giáo viên" },
    ],

    // Buổi mẫu theo thứ (0 = Chủ nhật). Mỗi mục: [kỹ năng, phút, việc]
    ieltsWeek: {
      1: {
        1: [["Grammar", 45, "Ngữ pháp"], ["Listening", 45, "Nghe chép chính tả"], ["Vocab", 30, "Từ vựng"]],
        2: [["Reading", 45, "Reading bài ngắn"], ["Grammar", 45, "Ngữ pháp"], ["Vocab", 30, "Từ vựng"]],
        3: [["Speaking", 45, "Phát âm + shadowing"], ["Writing", 45, "Viết đoạn 150 từ"], ["Vocab", 30, "Từ vựng"]],
        4: [["Listening", 45, "Nghe chép chính tả"], ["Grammar", 45, "Ngữ pháp"], ["Vocab", 30, "Từ vựng"]],
        5: [["Reading", 45, "Reading"], ["Speaking", 45, "Nói theo chủ đề, ghi âm"], ["Vocab", 30, "Từ vựng"]],
        6: [["Vocab", 40, "Ôn từ cả tuần"], ["Listening", 40, "Xem 1 video có phụ đề Anh"]],
        0: [],
      },
      2: {
        1: [["Listening", 60, "1 đề Listening + chữa"], ["Writing", 40, "Writing Task 1"], ["Vocab", 20, "Từ vựng"]],
        2: [["Reading", 60, "1 passage + chữa"], ["Speaking", 40, "Speaking Part 2 ghi âm"], ["Vocab", 20, "Từ vựng"]],
        3: [["Writing", 60, "Writing Task 2"], ["Writing", 40, "Sửa bài"], ["Vocab", 20, "Từ vựng"]],
        4: [["Listening", 40, "Listening dạng yếu"], ["Reading", 40, "Reading dạng yếu"], ["Vocab", 40, "Từ vựng"]],
        5: [["Writing", 60, "Writing Task 2"], ["Speaking", 60, "Speaking Part 1, 3"]],
        6: [["Mock", 90, "Đề thử 1 kỹ năng"]],
        0: [],
      },
      3: {
        1: [["Listening", 60, "1 đề Listening + chữa"], ["Writing", 40, "Writing Task 1"], ["Vocab", 20, "Từ vựng"]],
        2: [["Reading", 60, "1 passage + chữa"], ["Speaking", 40, "Speaking Part 2 ghi âm"], ["Vocab", 20, "Từ vựng"]],
        3: [["Writing", 60, "Writing Task 2"], ["Writing", 40, "Sửa bài"], ["Vocab", 20, "Từ vựng"]],
        4: [["Listening", 40, "Listening dạng yếu"], ["Reading", 40, "Reading dạng yếu"], ["Vocab", 40, "Từ vựng"]],
        5: [["Writing", 60, "Writing Task 2"], ["Speaking", 60, "Speaking Part 1, 3"]],
        6: [["Mock", 165, "Đề thử đầy đủ 4 kỹ năng"]],
        0: [["Mock", 60, "Chữa đề hôm qua"]],
      },
    },

    hskLevels: [
      { level: 1, words: 150 },
      { level: 2, words: 300 },
      { level: 3, words: 600 },
      { level: 4, words: 1200 },
      { level: 5, words: 2500 },
      { level: 6, words: 5000 },
    ],

    hskPhases: [
      { id: 1, name: "HSK 1–2", from: "2026-11-17", to: "2027-02-28", words: 300, minutes: 45,
        focus: "Chốt thanh điệu và pinyin, 50 bộ thủ hay gặp, viết chữ, HSK Standard Course 1–2" },
      { id: 2, name: "HSK 3", from: "2027-03-01", to: "2027-08-31", words: 600, minutes: 60,
        focus: "HSK Standard Course 3, nghe hội thoại chậm, đọc truyện phân cấp, thi thử HSK 3" },
      { id: 3, name: "Giữ nhịp", from: "2027-09-01", to: "2027-12-31", words: 900, minutes: 45,
        focus: "Anki + 1 bài HSK 4 mỗi 2 ngày, ưu tiên IELTS" },
      { id: 4, name: "HSK 4", from: "2028-01-01", to: "2028-04-30", words: 1200, minutes: 90,
        focus: "Luyện đề HSK 4, thi HSK 4 + HSKK" },
    ],

    hskSession: [
      [15, "Ôn Anki (chữ Hán, pinyin, âm thanh)"],
      [20, "Bài mới trong giáo trình: nghe, đọc to, ghi ngữ pháp"],
      [10, "Viết tay 5–10 chữ mới đúng thứ tự nét"],
      [15, "Shadowing hoặc tự nói 3–5 câu, ghi âm nghe lại thanh điệu"],
    ],

    milestones: [
      { date: "2026-11-16", label: "Thi Đồ thị + OOP" },
      { date: "2027-02-28", label: "IELTS thử 5.5, HSK 300 từ" },
      { date: "2027-08-31", label: "IELTS thử 6.5, HSK 3" },
      { date: "2027-12-01", label: "Thi IELTS, chọn HSK 4 hay 5" },
      { date: "2028-04-15", label: "Thi HSK" },
      { date: "2028-06-30", label: "Tốt nghiệp (giả định)" },
    ],
  };

  if (typeof module !== "undefined" && module.exports) module.exports = PLAN;
  else root.PLAN = PLAN;
})(this);
