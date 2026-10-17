// Thư viện học: lý thuyết tóm tắt, bài tập có đáp án và tài liệu tham khảo.
// Mỗi chủ đề Đồ thị/OOP có `days` là các ngày trong lịch 30 ngày dùng chủ đề đó.
// Lý thuyết (`theory`) và đáp án (`a`) được hiển thị dạng HTML, nên có thể dùng <b>, <code>, <br>.
(function (root) {
  const LIBRARY = {
    subjects: {
      graph: {
        name: "Đồ thị",
        resources: [
          { name: "VNOI Wiki", url: "https://wiki.vnoi.info/", note: "Bài viết tiếng Việt về thuật toán đồ thị, có code mẫu" },
          { name: "CP-Algorithms: Graphs", url: "https://cp-algorithms.com/", note: "Lý thuyết + chứng minh + code từng thuật toán" },
          { name: "VisuAlgo", url: "https://visualgo.net/en", note: "Mô phỏng từng bước BFS, DFS, MST, đường đi ngắn nhất" },
          { name: "CS Academy Graph Editor", url: "https://csacademy.com/app/graph_editor/", note: "Vẽ nhanh đồ thị từ danh sách cạnh để kiểm tra bài chạy tay" },
          { name: "MIT 6.042J Mathematics for Computer Science", url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/", note: "Bài giảng và bài tập về đồ thị, cây, tô màu" },
          { name: "Sách: Rosen, Discrete Mathematics and Its Applications", note: "Chương Graphs và Trees, nhiều bài tập có lời giải số lẻ" },
        ],
      },
      oop: {
        name: "OOP",
        resources: [
          { name: "LearnCpp", url: "https://www.learncpp.com/", note: "Giáo trình C++ miễn phí, phần lớp, kế thừa, hàm ảo rất kỹ" },
          { name: "cppreference", url: "https://en.cppreference.com/", note: "Tra cứu cú pháp, STL" },
          { name: "Oracle Java Tutorials: OOP Concepts", url: "https://docs.oracle.com/javase/tutorial/java/concepts/", note: "Lớp, kế thừa, interface trong Java" },
          { name: "Refactoring.Guru: Design Patterns", url: "https://refactoring.guru/design-patterns", note: "Giải thích mẫu thiết kế bằng hình, có code C++/Java" },
          { name: "UML Class Diagrams", url: "https://www.uml-diagrams.org/class-diagrams-overview.html", note: "Ký hiệu sơ đồ lớp chuẩn UML" },
          { name: "PlantUML", url: "https://plantuml.com/class-diagram", note: "Vẽ sơ đồ lớp bằng văn bản" },
          { name: "OnlineGDB", url: "https://www.onlinegdb.com/", note: "Chạy thử C++/Java ngay trên trình duyệt" },
        ],
      },
      ielts: {
        name: "IELTS",
        resources: [
          { name: "IELTS.org", url: "https://www.ielts.org/", note: "Trang chính thức: cấu trúc đề, tiêu chí chấm" },
          { name: "Take IELTS (British Council)", url: "https://takeielts.britishcouncil.org/", note: "Đề mẫu miễn phí, đăng ký thi" },
          { name: "LearnEnglish (British Council)", url: "https://learnenglish.britishcouncil.org/", note: "Ngữ pháp, nghe, đọc theo trình độ, hợp giai đoạn nền tảng" },
          { name: "BBC Learning English", url: "https://www.bbc.co.uk/learningenglish/", note: "Bài nghe ngắn, phát âm, 6 Minute English" },
          { name: "IELTS Simon", url: "https://ielts-simon.com/", note: "Bài mẫu Writing/Speaking của cựu giám khảo" },
          { name: "IELTS Liz", url: "https://ieltsliz.com/", note: "Mẹo từng dạng bài, bài luyện miễn phí" },
          { name: "Cambridge Dictionary", url: "https://dictionary.cambridge.org/", note: "Nghĩa, phát âm, ví dụ" },
          { name: "Ozdic", url: "https://ozdic.com/", note: "Từ điển collocation" },
          { name: "YouGlish", url: "https://youglish.com/", note: "Nghe một từ được người bản xứ nói trong video thật" },
          { name: "Sách: Cambridge IELTS 15–20 (Academic)", note: "Đề thật dùng cho giai đoạn luyện đề" },
        ],
      },
      hsk: {
        name: "HSK",
        resources: [
          { name: "Chinese Testing International", url: "https://www.chinesetest.cn/", note: "Trang chính thức HSK: đề mẫu, lịch thi" },
          { name: "Chinese Grammar Wiki (AllSet)", url: "https://resources.allsetlearning.com/chinese/grammar/", note: "Ngữ pháp chia theo cấp A1–C1, nhiều ví dụ" },
          { name: "Pleco", url: "https://www.pleco.com/", note: "Từ điển trên điện thoại, có flashcard và nhận dạng chữ viết" },
          { name: "MDBG", url: "https://www.mdbg.net/chinese/dictionary", note: "Từ điển trên web, xem thứ tự nét" },
          { name: "Anki", url: "https://apps.ankiweb.net/", note: "Flashcard lặp lại ngắt quãng, tải bộ thẻ HSK" },
          { name: "Hanzi Writer", url: "https://hanziwriter.org/", note: "Hoạt hình thứ tự nét từng chữ" },
          { name: "HanziCraft", url: "https://hanzicraft.com/", note: "Phân tích chữ thành bộ thủ và thành phần" },
          { name: "Du Chinese", url: "https://www.duchinese.net/", note: "Bài đọc phân cấp có âm thanh" },
          { name: "Sách: HSK Standard Course 1–4", note: "Giáo trình bám sát đề HSK, có sách bài tập" },
        ],
      },
    },

    topics: [
      // ====================== ĐỒ THỊ ======================
      {
        id: "g-basic", subject: "graph", days: [1], title: "Khái niệm, bậc, định lý bắt tay, các loại đồ thị",
        theory: [
          "Đồ thị <b>G = (V, E)</b>: V là tập đỉnh, E là tập cạnh. Đơn đồ thị: không khuyên, không cạnh song song. Đa đồ thị: có cạnh song song. Giả đồ thị: có khuyên.",
          "Bậc <b>deg(v)</b> = số cạnh liên thuộc v, khuyên tính 2. Đỉnh bậc 0 là đỉnh cô lập, bậc 1 là đỉnh treo (lá).",
          "<b>Định lý bắt tay:</b> Σ deg(v) = 2|E|. Hệ quả: số đỉnh bậc lẻ luôn là số chẵn.",
          "Đồ thị có hướng: Σ deg⁺(v) = Σ deg⁻(v) = |E| (bán bậc ra, bán bậc vào).",
          "Đồ thị đặc biệt: đầy đủ K<sub>n</sub> có n(n−1)/2 cạnh; chu trình C<sub>n</sub>; bánh xe W<sub>n</sub> (C<sub>n</sub> + 1 đỉnh nối tất cả); hai phía đầy đủ K<sub>m,n</sub> có m·n cạnh; k-chính quy n đỉnh có nk/2 cạnh.",
          "Đồ thị bù Ḡ: cùng đỉnh, có cạnh uv khi và chỉ khi G không có. |E(G)| + |E(Ḡ)| = n(n−1)/2.",
        ],
        exercises: [
          { q: "Một đơn đồ thị có 10 đỉnh, mỗi đỉnh bậc 3. Đồ thị có bao nhiêu cạnh?", a: "Σdeg = 30 = 2|E| ⇒ |E| = 15." },
          { q: "Có tồn tại đơn đồ thị 7 đỉnh với dãy bậc 1, 2, 3, 4, 5, 6, 6 không?", a: "Không. Tổng bậc = 27 là số lẻ, trái với định lý bắt tay." },
          { q: "Có tồn tại đơn đồ thị 5 đỉnh với dãy bậc 3, 3, 3, 3, 2 không? Nếu có hãy vẽ.", a: "Có. Từ K<sub>5</sub> (mọi đỉnh bậc 4) bỏ 3 cạnh EA, EB, CD: A, B, C, D còn bậc 3, E còn bậc 2." },
          { q: "Đơn đồ thị có 15 cạnh, mọi đỉnh có bậc ≥ 3. Đồ thị có tối đa bao nhiêu đỉnh?", a: "2|E| = 30 ≥ 3n ⇒ n ≤ 10." },
          { q: "K<sub>8</sub> có bao nhiêu cạnh? K<sub>3,5</sub> có bao nhiêu cạnh?", a: "K<sub>8</sub>: 8·7/2 = 28. K<sub>3,5</sub>: 3·5 = 15." },
          { q: "Đơn đồ thị G có 9 đỉnh và 20 cạnh. Đồ thị bù của G có bao nhiêu cạnh?", a: "9·8/2 − 20 = 36 − 20 = 16." },
        ],
        resources: [
          { name: "VisuAlgo: Graph Data Structures", url: "https://visualgo.net/en/graphds" },
        ],
      },
      {
        id: "g-repr", subject: "graph", days: [2], title: "Biểu diễn đồ thị: ma trận kề, danh sách kề, ma trận liên thuộc",
        theory: [
          "<b>Ma trận kề</b> A (n×n): a<sub>ij</sub> = số cạnh nối i, j. Bộ nhớ O(n²), kiểm tra cạnh O(1). Vô hướng thì A đối xứng, tổng hàng i = deg(i).",
          "<b>Danh sách kề</b>: mỗi đỉnh giữ danh sách đỉnh kề. Bộ nhớ O(n + m), duyệt kề nhanh, hợp với đồ thị thưa. BFS/DFS dùng danh sách kề chạy O(n + m).",
          "<b>Ma trận liên thuộc</b> (n×m): hàng là đỉnh, cột là cạnh. Vô hướng: mỗi cột có đúng hai số 1 (khuyên: một số 2). Có hướng: thường dùng −1 ở đỉnh đầu, +1 ở đỉnh cuối (kiểm tra quy ước trong giáo trình của bạn).",
          "<b>Danh sách cạnh</b>: mảng các bộ (u, v, w). Dùng cho Kruskal, Bellman-Ford.",
          "(A<sup>k</sup>)<sub>ij</sub> = số đường đi (cho phép lặp đỉnh) độ dài k từ i đến j.",
        ],
        code: `// Danh sách kề trong C++
vector<vector<int>> adj(n + 1);
for (auto [u, v] : edges) {
  adj[u].push_back(v);
  adj[v].push_back(u); // bỏ dòng này nếu có hướng
}`,
        exercises: [
          { q: "Đồ thị vô hướng V = {1, 2, 3, 4}, E = {12, 13, 23, 34}. Viết ma trận kề và danh sách kề.", a: "Ma trận (hàng 1→4):<br><code>0 1 1 0<br>1 0 1 0<br>1 1 0 1<br>0 0 1 0</code><br>Danh sách kề: 1: 2, 3 · 2: 1, 3 · 3: 1, 2, 4 · 4: 3." },
          { q: "Với đồ thị ở câu trên, có bao nhiêu đường đi độ dài 2 từ đỉnh 1 đến đỉnh 4?", a: "(A²)<sub>14</sub> = Σ a<sub>1k</sub>a<sub>k4</sub> = a<sub>13</sub>a<sub>34</sub> = 1. Chỉ có 1 → 3 → 4." },
          { q: "Đồ thị có 10.000 đỉnh và 30.000 cạnh nên lưu bằng gì? Vì sao?", a: "Danh sách kề: O(n + m) ≈ 40.000 phần tử, còn ma trận kề cần 10<sup>8</sup> ô." },
          { q: "Ma trận liên thuộc của một đồ thị vô hướng có 6 hàng, 9 cột. Tổng tất cả các phần tử bằng bao nhiêu?", a: "Mỗi cột (cạnh) có tổng 2 ⇒ tổng = 18 = Σdeg." },
        ],
        resources: [
          { name: "VNOI: Biểu diễn đồ thị", url: "https://wiki.vnoi.info/" },
        ],
      },
      {
        id: "g-connect", subject: "graph", days: [3], title: "Đường đi, chu trình, liên thông, đỉnh khớp, cầu",
        theory: [
          "Đường đi đơn: không lặp cạnh. Đường đi sơ cấp: không lặp đỉnh. Chu trình: đường đi khép kín.",
          "G liên thông nếu mọi cặp đỉnh có đường đi. Thành phần liên thông (TPLT): đồ thị con liên thông tối đại.",
          "<b>Đỉnh khớp</b>: xóa đỉnh (và các cạnh kề) làm tăng số TPLT. <b>Cầu</b>: xóa cạnh làm tăng số TPLT. Một cạnh là cầu ⇔ nó không nằm trên chu trình nào.",
          "Đơn đồ thị n đỉnh có nhiều hơn (n−1)(n−2)/2 cạnh thì chắc chắn liên thông. Đơn đồ thị n đỉnh, k TPLT có tối đa (n−k)(n−k+1)/2 cạnh.",
          "Có hướng: <b>liên thông mạnh</b> nếu mọi u đến được v và ngược lại; <b>liên thông yếu</b> nếu bỏ hướng thì liên thông.",
          "Tìm khớp/cầu bằng DFS với num[u] (thời điểm thăm) và low[u] (num nhỏ nhất đến được qua cạnh ngược): cạnh cây (u, v) là cầu nếu low[v] > num[u]; u không phải gốc là khớp nếu có con v với low[v] ≥ num[u]; gốc DFS là khớp nếu có ≥ 2 con.",
        ],
        exercises: [
          { q: "Đơn đồ thị 10 đỉnh, 37 cạnh có chắc liên thông không?", a: "Có. (n−1)(n−2)/2 = 9·8/2 = 36 < 37." },
          { q: "Đơn đồ thị 6 đỉnh có 3 thành phần liên thông thì có tối đa bao nhiêu cạnh?", a: "(6−3)(6−3+1)/2 = 3·4/2 = 6 (một K<sub>4</sub> và hai đỉnh cô lập)." },
          { q: "Đồ thị gồm hai tam giác 1-2-3 và 4-5-6 nối với nhau bằng cạnh 3-4. Tìm các đỉnh khớp và cầu.", a: "Cầu: 3-4. Đỉnh khớp: 3 và 4. Các cạnh trong tam giác nằm trên chu trình nên không phải cầu." },
          { q: "Chứng minh: trong cây, mọi cạnh đều là cầu.", a: "Cây không có chu trình nên không cạnh nào nằm trên chu trình ⇒ mọi cạnh là cầu." },
        ],
        resources: [
          { name: "CP-Algorithms: Finding bridges", url: "https://cp-algorithms.com/graph/bridge-searching.html" },
          { name: "CP-Algorithms: Finding articulation points", url: "https://cp-algorithms.com/graph/cutpoints.html" },
        ],
      },
      {
        id: "g-bfs", subject: "graph", days: [4], title: "BFS: duyệt theo chiều rộng",
        theory: [
          "Dùng <b>hàng đợi</b>. Thăm đỉnh nguồn, rồi lần lượt các đỉnh cách 1 cạnh, 2 cạnh, ...",
          "Độ phức tạp O(n + m) với danh sách kề, O(n²) với ma trận kề.",
          "BFS cho <b>đường đi ngắn nhất theo số cạnh</b> trên đồ thị không trọng số; d[v] là khoảng cách, trước[v] dùng để truy vết.",
          "Ứng dụng: TPLT, kiểm tra đồ thị hai phía (tô 2 màu xen kẽ theo tầng), đường đi ngắn nhất trên lưới.",
          "Khi chạy tay: ghi rõ <b>trạng thái hàng đợi sau mỗi bước</b> và quy ước thứ tự xét đỉnh kề (thường tăng dần).",
        ],
        code: `void bfs(int s) {
  queue<int> q; q.push(s);
  vector<int> d(n + 1, -1); d[s] = 0;
  while (!q.empty()) {
    int u = q.front(); q.pop();
    for (int v : adj[u]) if (d[v] == -1) {
      d[v] = d[u] + 1; truoc[v] = u; q.push(v);
    }
  }
}`,
        exercises: [
          { q: "Đồ thị vô hướng có cạnh 1-2, 1-3, 2-4, 2-5, 3-6, 5-6, 4-7. Chạy BFS từ 1 (xét đỉnh kề theo thứ tự tăng). Cho thứ tự thăm và d[v].", a: "Thứ tự: 1, 2, 3, 4, 5, 6, 7.<br>d: 1→0, 2→1, 3→1, 4→2, 5→2, 6→2, 7→3." },
          { q: "Ở đồ thị trên, đường đi ngắn nhất từ 1 đến 7 là gì?", a: "1 → 2 → 4 → 7 (3 cạnh), truy theo trước[7] = 4, trước[4] = 2, trước[2] = 1." },
          { q: "Dùng BFS kiểm tra đồ thị C<sub>5</sub> (chu trình 5 đỉnh) có hai phía không.", a: "Không. Tô màu xen kẽ theo tầng sẽ gặp một cạnh nối hai đỉnh cùng màu, vì C<sub>5</sub> là chu trình lẻ." },
        ],
        resources: [
          { name: "CP-Algorithms: Breadth-first search", url: "https://cp-algorithms.com/graph/breadth-first-search.html" },
          { name: "VisuAlgo: DFS/BFS", url: "https://visualgo.net/en/dfsbfs" },
        ],
      },
      {
        id: "g-dfs", subject: "graph", days: [5], title: "DFS, thành phần liên thông, liên thông mạnh",
        theory: [
          "Dùng <b>đệ quy</b> hoặc ngăn xếp: đi sâu nhất có thể rồi quay lui. O(n + m).",
          "Ghi thời điểm vào/ra (tin, tout). Phân loại cạnh trên đồ thị có hướng: cạnh cây, cạnh ngược (tới tổ tiên → có chu trình), cạnh xuôi, cạnh ngang.",
          "Đếm TPLT: gọi DFS từ mỗi đỉnh chưa thăm, mỗi lần gọi là một TPLT.",
          "<b>Thành phần liên thông mạnh</b>: Tarjan (một lần DFS, dùng low[] và ngăn xếp) hoặc Kosaraju (DFS lấy thứ tự ra, rồi DFS trên đồ thị đảo chiều theo thứ tự ra giảm dần).",
        ],
        code: `void dfs(int u) {
  visited[u] = true;
  for (int v : adj[u]) if (!visited[v]) {
    truoc[v] = u;
    dfs(v);
  }
}`,
        exercises: [
          { q: "Đồ thị vô hướng có cạnh 1-2, 1-3, 2-4, 2-5, 3-6, 5-6, 4-7. Chạy DFS từ 1 (đỉnh kề tăng dần). Cho thứ tự thăm.", a: "1, 2, 4, 7, 5, 6, 3." },
          { q: "Đồ thị có hướng: 1→2, 2→3, 3→1, 3→4, 4→5, 5→4. Tìm các thành phần liên thông mạnh.", a: "{1, 2, 3} và {4, 5}." },
          { q: "Vì sao trên đồ thị có hướng, gặp cạnh ngược khi DFS nghĩa là có chu trình?", a: "Cạnh ngược u→v với v là tổ tiên của u đang nằm trên ngăn xếp đệ quy: đường cây v ⇝ u cộng cạnh u→v tạo thành chu trình." },
        ],
        resources: [
          { name: "CP-Algorithms: Depth-first search", url: "https://cp-algorithms.com/graph/depth-first-search.html" },
          { name: "CP-Algorithms: Strongly connected components", url: "https://cp-algorithms.com/graph/strongly-connected-components.html" },
        ],
      },
      {
        id: "g-euler", subject: "graph", days: [8], title: "Đồ thị Euler, thuật toán Fleury",
        theory: [
          "Chu trình Euler: đi qua mỗi cạnh đúng một lần và quay về đỉnh đầu. Đường đi Euler: đi qua mỗi cạnh đúng một lần.",
          "<b>Vô hướng</b>, liên thông (bỏ qua đỉnh cô lập): có chu trình Euler ⇔ mọi đỉnh bậc chẵn; có đường đi Euler (không khép kín) ⇔ có đúng 2 đỉnh bậc lẻ, đường đi bắt đầu ở một đỉnh lẻ và kết thúc ở đỉnh lẻ còn lại.",
          "<b>Có hướng</b>: chu trình Euler ⇔ liên thông yếu và deg⁺(v) = deg⁻(v) với mọi v. Đường đi Euler ⇔ có một đỉnh deg⁺ − deg⁻ = 1 (đầu), một đỉnh deg⁻ − deg⁺ = 1 (cuối), còn lại bằng nhau.",
          "<b>Fleury</b>: từ đỉnh xuất phát, mỗi bước chọn cạnh chưa đi, <b>không đi qua cầu</b> của đồ thị còn lại trừ khi không còn lựa chọn khác; xóa cạnh vừa đi. Hierholzer nhanh hơn: O(m).",
          "K<sub>n</sub> có chu trình Euler ⇔ n lẻ. K<sub>m,n</sub> có chu trình Euler ⇔ m, n đều chẵn.",
        ],
        exercises: [
          { q: "Bảy cây cầu Königsberg (4 vùng đất, bậc 3, 3, 3, 5) có cách đi qua mỗi cầu đúng một lần không?", a: "Không. Có 4 đỉnh bậc lẻ, nên không có cả chu trình lẫn đường đi Euler." },
          { q: "K<sub>5</sub>, K<sub>6</sub> có chu trình Euler không?", a: "K<sub>5</sub>: mọi đỉnh bậc 4 (chẵn) ⇒ có. K<sub>6</sub>: mọi đỉnh bậc 5 ⇒ không (và không có cả đường đi Euler vì có 6 đỉnh lẻ)." },
          { q: "K<sub>2,3</sub> có chu trình Euler không? Có đường đi Euler không?", a: "Hai đỉnh phía 2 có bậc 3, ba đỉnh phía 3 có bậc 2 ⇒ đúng 2 đỉnh lẻ ⇒ không có chu trình, có đường đi Euler nối hai đỉnh bậc 3." },
          { q: "Chạy Fleury trên đồ thị 'hai tam giác chung đỉnh' (1-2-3-1 và 3-4-5-3), xuất phát từ 1.", a: "Mọi đỉnh bậc chẵn ⇒ có chu trình. Ví dụ: 1-2-3-4-5-3-1. Sau 1-2-3, tại 3 còn các cạnh 3-1, 3-4, 3-5; cạnh 3-1 là cầu của đồ thị còn lại (đỉnh 1 chỉ còn cạnh này) nên Fleury chọn 3-4, đi hết tam giác 3-4-5 rồi mới về 1." },
        ],
        resources: [
          { name: "CP-Algorithms: Eulerian path", url: "https://cp-algorithms.com/graph/euler_path.html" },
        ],
      },
      {
        id: "g-hamilton", subject: "graph", days: [9], title: "Đồ thị Hamilton: định lý Dirac, Ore",
        theory: [
          "Chu trình Hamilton: đi qua mỗi <b>đỉnh</b> đúng một lần rồi về đỉnh đầu. Không có điều kiện cần và đủ đơn giản; bài toán NP-đầy đủ, thường giải bằng quay lui.",
          "<b>Dirac</b>: đơn đồ thị n ≥ 3 đỉnh, deg(v) ≥ n/2 với mọi v ⇒ có chu trình Hamilton.",
          "<b>Ore</b>: đơn đồ thị n ≥ 3 đỉnh, deg(u) + deg(v) ≥ n với mọi cặp u, v <b>không kề</b> ⇒ có chu trình Hamilton. Ore tổng quát hơn Dirac.",
          "Đây chỉ là điều kiện <b>đủ</b>: C<sub>n</sub> (n ≥ 5) có chu trình Hamilton dù mọi đỉnh chỉ bậc 2.",
          "Dấu hiệu không có chu trình Hamilton: không liên thông, có đỉnh khớp, có đỉnh bậc 1. Đỉnh bậc 2 thì cả hai cạnh của nó bắt buộc nằm trong chu trình.",
          "K<sub>n</sub> (n ≥ 3) luôn có chu trình Hamilton. K<sub>m,n</sub> có chu trình Hamilton ⇔ m = n ≥ 2.",
        ],
        exercises: [
          { q: "Đơn đồ thị 6 đỉnh, mọi đỉnh bậc ≥ 3. Có chắc có chu trình Hamilton không?", a: "Có, theo Dirac: 3 ≥ 6/2." },
          { q: "K<sub>3,4</sub> có chu trình Hamilton không?", a: "Không. Chu trình phải xen kẽ hai phía nên số đỉnh hai phía phải bằng nhau (3 ≠ 4)." },
          { q: "Đồ thị gồm hai tam giác chung một đỉnh có chu trình Hamilton không? Có chu trình Euler không?", a: "Không có chu trình Hamilton (đỉnh chung là đỉnh khớp). Có chu trình Euler (mọi đỉnh bậc chẵn). Ví dụ tốt để phân biệt hai khái niệm." },
          { q: "Cho ví dụ đồ thị có chu trình Hamilton nhưng không thỏa Ore.", a: "C<sub>5</sub>: hai đỉnh không kề có tổng bậc 4 < 5, nhưng bản thân C<sub>5</sub> là chu trình Hamilton." },
        ],
        resources: [
          { name: "VNOI Wiki", url: "https://wiki.vnoi.info/" },
        ],
      },
      {
        id: "g-tree", subject: "graph", days: [10], title: "Cây: tính chất, cây có gốc, duyệt cây",
        theory: [
          "Cây = đồ thị vô hướng liên thông, không có chu trình. Các phát biểu tương đương cho đồ thị n đỉnh: liên thông và có n−1 cạnh; không chu trình và có n−1 cạnh; giữa hai đỉnh bất kỳ có đúng một đường đi; liên thông và mọi cạnh là cầu; thêm một cạnh bất kỳ tạo đúng một chu trình.",
          "Cây có ≥ 2 đỉnh thì có ≥ 2 lá. Rừng có k cây và n đỉnh thì có n − k cạnh.",
          "Cây m-phân đầy đủ có i đỉnh trong: n = m·i + 1 đỉnh, l = (m−1)·i + 1 lá.",
          "Cây nhị phân có chiều cao h có tối đa 2<sup>h</sup> lá.",
          "Duyệt cây nhị phân: <b>trước</b> (gốc-trái-phải), <b>giữa</b> (trái-gốc-phải), <b>sau</b> (trái-phải-gốc). Cây biểu thức: duyệt trước cho ký pháp Ba Lan, duyệt sau cho Ba Lan ngược.",
          "Cayley: K<sub>n</sub> có n<sup>n−2</sup> cây khung.",
        ],
        exercises: [
          { q: "Một cây có 2 đỉnh bậc 3, 3 đỉnh bậc 2, các đỉnh còn lại là lá. Cây có bao nhiêu lá?", a: "Gọi L là số lá, n = 5 + L. Σdeg = 6 + 6 + L = 2(n − 1) = 2(4 + L) ⇒ L = 4." },
          { q: "Cây nhị phân đầy đủ có 20 lá. Có bao nhiêu đỉnh trong, bao nhiêu đỉnh?", a: "l = (m−1)i + 1 ⇒ 20 = i + 1 ⇒ i = 19, n = 2·19 + 1 = 39." },
          { q: "Vẽ cây biểu thức (a + b) * (c − d) và cho kết quả duyệt trước, sau.", a: "Gốc *, con trái +(a, b), con phải −(c, d).<br>Duyệt trước: * + a b − c d. Duyệt sau: a b + c d − *." },
          { q: "K<sub>4</sub> có bao nhiêu cây khung?", a: "4<sup>4−2</sup> = 16." },
        ],
        resources: [
          { name: "VisuAlgo: Binary Search Tree", url: "https://visualgo.net/en/bst" },
        ],
      },
      {
        id: "g-mst", subject: "graph", days: [11, 12, 13], title: "Cây khung nhỏ nhất: Kruskal, Prim",
        theory: [
          "Cây khung nhỏ nhất (MST): cây khung có tổng trọng số nhỏ nhất. Nếu mọi trọng số đôi một khác nhau thì MST duy nhất.",
          "<b>Tính chất lát cắt</b>: cạnh nhẹ nhất đi qua một lát cắt bất kỳ thuộc một MST. <b>Tính chất chu trình</b>: cạnh nặng nhất (duy nhất) trên một chu trình không thuộc MST.",
          "<b>Kruskal</b>: sắp cạnh tăng dần, lần lượt thêm cạnh nếu không tạo chu trình (kiểm tra bằng DSU). O(m log m). Hợp với đồ thị thưa.",
          "<b>Prim</b>: bắt đầu từ một đỉnh, mỗi bước thêm cạnh nhẹ nhất nối cây hiện tại với một đỉnh ngoài cây. O(n²) với mảng, O(m log n) với heap. Hợp với đồ thị dày.",
          "Khi chạy tay Kruskal: lập bảng cạnh đã sắp, cột 'chọn/loại' và lý do (tạo chu trình với cạnh nào). Prim: bảng d[v] và trước[v] mỗi bước.",
        ],
        code: `// Kruskal với DSU
int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
sort(edges.begin(), edges.end()); // theo trọng số
for (auto [w, u, v] : edges)
  if (find(u) != find(v)) { p[find(u)] = find(v); total += w; }`,
        exercises: [
          { q: "Đồ thị: AB 4, AC 1, BC 2, BD 5, CD 8, CE 10, DE 2, DF 6, EF 3. Chạy Kruskal.", a: "Sắp: AC1, BC2, DE2, EF3, AB4, BD5, DF6, CD8, CE10.<br>Chọn AC1, BC2, DE2, EF3; loại AB4 (tạo chu trình A-B-C); chọn BD5. Đủ 5 cạnh. Tổng = 13." },
          { q: "Chạy Prim từ A trên cùng đồ thị.", a: "AC1 → CB2 → (ứng viên BD5, CD8, CE10) BD5 → DE2 → EF3. Tổng 13, cùng cây với Kruskal." },
          { q: "Đồ thị đầy đủ 1.000 đỉnh, dùng Kruskal hay Prim?", a: "Prim O(n²) ≈ 10<sup>6</sup>, trong khi m ≈ 5·10<sup>5</sup> cạnh, Kruskal tốn O(m log m) và phải sắp toàn bộ cạnh. Đồ thị dày nên Prim." },
          { q: "Vì sao nếu thêm một hằng số c vào mọi trọng số thì MST không đổi?", a: "Mọi cây khung đều có đúng n−1 cạnh, nên tổng trọng số của mỗi cây đều tăng (n−1)c; thứ tự giữa các cây giữ nguyên." },
        ],
        resources: [
          { name: "CP-Algorithms: Kruskal", url: "https://cp-algorithms.com/graph/mst_kruskal.html" },
          { name: "CP-Algorithms: Prim", url: "https://cp-algorithms.com/graph/mst_prim.html" },
          { name: "VisuAlgo: Minimum Spanning Tree", url: "https://visualgo.net/en/mst" },
        ],
      },
      {
        id: "g-dijkstra", subject: "graph", days: [15], title: "Dijkstra",
        theory: [
          "Đường đi ngắn nhất từ một nguồn, <b>trọng số không âm</b>.",
          "Khởi tạo d[s] = 0, d[v] = ∞. Lặp: chọn đỉnh u chưa cố định có d nhỏ nhất, cố định u, nới lỏng: d[v] = min(d[v], d[u] + w(u, v)).",
          "O(n²) với mảng, O((n + m) log n) với hàng đợi ưu tiên.",
          "Truy vết bằng trước[v]. Khi chạy tay, lập bảng: mỗi hàng là một bước, mỗi cột là một đỉnh, ghi (d, trước), gạch đỉnh đã cố định.",
          "Sai khi có cạnh âm vì đỉnh đã cố định có thể còn được cải thiện (xem bài Bellman-Ford).",
        ],
        code: `priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
d[s] = 0; pq.push({0, s});
while (!pq.empty()) {
  auto [du, u] = pq.top(); pq.pop();
  if (du > d[u]) continue;
  for (auto [v, w] : adj[u]) if (d[u] + w < d[v]) {
    d[v] = d[u] + w; truoc[v] = u; pq.push({d[v], v});
  }
}`,
        exercises: [
          { q: "Đồ thị vô hướng: SA 4, SB 1, BA 2, AC 1, BC 5, CT 3, BT 8. Chạy Dijkstra từ S, cho thứ tự cố định và d cuối.", a: "Cố định S(0) → B(1) → A(3, qua B) → C(4, qua A) → T(7, qua C).<br>Đường S-B-A-C-T, độ dài 7." },
          { q: "Trên đồ thị trên, nếu đổi BA thành 5 thì đường ngắn nhất S → T là gì?", a: "d[A] = 4 (trực tiếp), d[C] = min(1+5, 4+1) = 5, d[T] = min(1+8, 5+3) = 8. Đường S-A-C-T, độ dài 8." },
          { q: "Vì sao Dijkstra luôn đúng khi trọng số không âm?", a: "Khi u có d nhỏ nhất trong các đỉnh chưa cố định, mọi đường khác tới u phải đi qua một đỉnh chưa cố định có d ≥ d[u], cộng thêm cạnh không âm nên không thể ngắn hơn." },
        ],
        resources: [
          { name: "CP-Algorithms: Dijkstra", url: "https://cp-algorithms.com/graph/dijkstra.html" },
          { name: "VisuAlgo: Single-Source Shortest Paths", url: "https://visualgo.net/en/sssp" },
        ],
      },
      {
        id: "g-bellman", subject: "graph", days: [16], title: "Bellman-Ford, cạnh âm, chu trình âm",
        theory: [
          "Cho phép cạnh âm. Lặp n−1 vòng, mỗi vòng nới lỏng <b>tất cả</b> các cạnh. O(n·m).",
          "Nếu ở vòng thứ n vẫn còn nới lỏng được ⇒ có <b>chu trình âm</b> đến được từ nguồn, khi đó không tồn tại đường đi ngắn nhất.",
          "Có thể dừng sớm khi một vòng không cập nhật gì.",
          "Trên đồ thị vô hướng, một cạnh âm tự tạo thành chu trình âm (đi qua lại), nên chỉ áp dụng cho đồ thị có hướng.",
        ],
        exercises: [
          { q: "Đồ thị có hướng: S→A 2, S→B 4, B→A −3, A→C 2. Dijkstra cho d[C] bằng bao nhiêu? Bellman-Ford cho bao nhiêu?", a: "Dijkstra cố định A = 2, rồi C = 4, rồi B = 4; lúc này A mới giảm xuống 1 nhưng đã cố định ⇒ d[C] = 4 (sai).<br>Bellman-Ford: d[B] = 4, d[A] = 1, d[C] = 3 (đúng)." },
          { q: "A→B 1, B→C −2, C→A 0. Có chu trình âm không?", a: "Có: A→B→C→A có tổng 1 − 2 + 0 = −1 < 0." },
          { q: "Đồ thị 5 đỉnh, 8 cạnh. Bellman-Ford cần tối đa bao nhiêu lần nới lỏng?", a: "(n − 1)·m = 4·8 = 32 lần (cộng 8 lần ở vòng kiểm tra chu trình âm)." },
        ],
        resources: [
          { name: "CP-Algorithms: Bellman-Ford", url: "https://cp-algorithms.com/graph/bellman_ford.html" },
        ],
      },
      {
        id: "g-floyd", subject: "graph", days: [17], title: "Floyd-Warshall, truy vết đường đi",
        theory: [
          "Đường đi ngắn nhất giữa <b>mọi cặp</b> đỉnh. Cho phép cạnh âm, không cho phép chu trình âm.",
          "Công thức: với k = 1..n (vòng ngoài cùng), d[i][j] = min(d[i][j], d[i][k] + d[k][j]). O(n³).",
          "Truy vết: lưu next[i][j] (đỉnh kế tiếp sau i) và cập nhật next[i][j] = next[i][k] khi nới lỏng.",
          "Sau khi chạy, nếu d[i][i] < 0 thì i nằm trên chu trình âm.",
          "Khi chạy tay: viết ma trận D<sup>(0)</sup>, D<sup>(1)</sup>, ..., D<sup>(n)</sup>; ở bước k, hàng k và cột k giữ nguyên.",
        ],
        code: `for (int k = 1; k <= n; k++)
  for (int i = 1; i <= n; i++)
    for (int j = 1; j <= n; j++)
      if (d[i][k] + d[k][j] < d[i][j]) {
        d[i][j] = d[i][k] + d[k][j];
        nxt[i][j] = nxt[i][k];
      }`,
        exercises: [
          { q: "Đồ thị có hướng: 1→2 3, 2→3 2, 1→3 7, 3→1 1. Chạy Floyd, cho ma trận cuối.", a: "k=1: d[3][2] = 1 + 3 = 4. k=2: d[1][3] = 3 + 2 = 5. k=3: d[2][1] = 2 + 1 = 3.<br>Cuối: d12 = 3, d13 = 5, d21 = 3, d23 = 2, d31 = 1, d32 = 4." },
          { q: "Vì sao k phải là vòng lặp ngoài cùng?", a: "Bất biến: sau bước k, d[i][j] là đường ngắn nhất chỉ đi qua các đỉnh trung gian thuộc {1..k}. Đặt k vào trong sẽ dùng các giá trị chưa được tính đúng." },
          { q: "Đồ thị 200 đỉnh, cần mọi cặp. Floyd hay chạy Dijkstra từ mọi đỉnh?", a: "Floyd 200³ = 8·10<sup>6</sup>, đơn giản và đủ nhanh. Dijkstra n lần chỉ lợi khi đồ thị thưa và lớn, và cần trọng số không âm." },
        ],
        resources: [
          { name: "CP-Algorithms: Floyd-Warshall", url: "https://cp-algorithms.com/graph/all-pair-shortest-path-floyd-warshall.html" },
        ],
      },
      {
        id: "g-topo", subject: "graph", days: [18], title: "Sắp xếp tô pô, DAG",
        theory: [
          "Đồ thị có hướng có thứ tự tô pô ⇔ không có chu trình (DAG).",
          "<b>Kahn</b>: đếm bán bậc vào; đưa các đỉnh có bán bậc vào 0 vào hàng đợi; lấy ra, xóa cạnh đi ra, đỉnh nào về 0 thì đưa vào. Nếu không lấy hết đỉnh ⇒ có chu trình. O(n + m).",
          "<b>DFS</b>: thứ tự tô pô là thứ tự thời điểm kết thúc <b>giảm dần</b>.",
          "Ứng dụng: lịch học môn tiên quyết, thứ tự biên dịch, quy hoạch động trên DAG (đường đi dài nhất/ngắn nhất trong O(n + m) kể cả cạnh âm).",
        ],
        exercises: [
          { q: "Cạnh: A→B, A→C, B→D, C→D, D→E. Chạy Kahn (lấy theo thứ tự chữ cái). Có bao nhiêu thứ tự tô pô?", a: "A, B, C, D, E. Có 2 thứ tự: B, C hoán đổi được (A, B, C, D, E và A, C, B, D, E)." },
          { q: "Thêm cạnh E→A vào đồ thị trên. Kahn phát hiện điều gì?", a: "Không có đỉnh nào bán bậc vào 0 ngay từ đầu ⇒ không lấy được đỉnh nào ⇒ có chu trình." },
          { q: "Môn học: Toán rời rạc → Cấu trúc dữ liệu → Thuật toán; Lập trình cơ bản → Cấu trúc dữ liệu; Lập trình cơ bản → OOP. Cho một thứ tự học hợp lệ.", a: "Ví dụ: Lập trình cơ bản, Toán rời rạc, OOP, Cấu trúc dữ liệu, Thuật toán." },
        ],
        resources: [
          { name: "CP-Algorithms: Topological sort", url: "https://cp-algorithms.com/graph/topological-sort.html" },
        ],
      },
      {
        id: "g-flow", subject: "graph", days: [19], title: "Luồng cực đại: Ford-Fulkerson, lát cắt hẹp nhất",
        theory: [
          "Mạng: đồ thị có hướng, nguồn s, đích t, khả năng c(u, v) ≥ 0. Luồng f thỏa 0 ≤ f ≤ c và bảo toàn tại mọi đỉnh trừ s, t.",
          "<b>Đồ thị thặng dư</b>: cạnh xuôi khả năng c − f, cạnh ngược khả năng f. <b>Đường tăng luồng</b>: đường s ⇝ t trong đồ thị thặng dư.",
          "<b>Ford-Fulkerson</b>: còn đường tăng thì tăng luồng thêm bằng khả năng nhỏ nhất trên đường đó. Edmonds-Karp chọn đường tăng bằng BFS: O(n·m²).",
          "<b>Định lý max-flow min-cut</b>: giá trị luồng cực đại = khả năng của lát cắt (S, T) nhỏ nhất. Lát cắt hẹp nhất: S = các đỉnh đến được từ s trong đồ thị thặng dư cuối cùng.",
          "Ứng dụng: ghép cặp trên đồ thị hai phía (thêm s, t, khả năng 1).",
        ],
        exercises: [
          { q: "Mạng: s→a 3, s→b 2, a→b 1, a→t 2, b→t 3. Tìm luồng cực đại.", a: "s-a-t: 2; s-b-t: 2; s-a-b-t: 1. Tổng = 5. Lát cắt ({s}, còn lại) có khả năng 3 + 2 = 5 ⇒ luồng là cực đại." },
          { q: "Trong bài trên, nếu a→t tăng lên 10 thì luồng cực đại thay đổi thế nào?", a: "Vẫn là 5, vì lát cắt ({s}, ...) có khả năng 5 không đổi." },
          { q: "Vì sao cần cạnh ngược trong đồ thị thặng dư?", a: "Để có thể 'hoàn lại' luồng đã đẩy sai hướng; không có cạnh ngược, cách chọn đường tăng tham lam có thể kẹt ở luồng chưa cực đại." },
        ],
        resources: [
          { name: "CP-Algorithms: Ford-Fulkerson & Edmonds-Karp", url: "https://cp-algorithms.com/graph/edmonds_karp.html" },
          { name: "VisuAlgo: Network Flow", url: "https://visualgo.net/en/maxflow" },
        ],
      },
      {
        id: "g-bip-color", subject: "graph", days: [20], title: "Đồ thị hai phía, ghép cặp, tô màu, đồ thị phẳng",
        theory: [
          "<b>Hai phía</b> ⇔ không có chu trình độ dài lẻ. Kiểm tra bằng BFS/DFS tô hai màu.",
          "<b>Ghép cặp</b>: tập cạnh không chung đỉnh. Thuật toán đường tăng (Kuhn) O(n·m). <b>Định lý Hall</b>: có ghép cặp phủ hết X ⇔ |N(S)| ≥ |S| với mọi S ⊆ X. <b>König</b>: trên đồ thị hai phía, ghép cặp cực đại = phủ đỉnh nhỏ nhất.",
          "<b>Sắc số</b> χ(G): số màu ít nhất để hai đỉnh kề khác màu. χ(K<sub>n</sub>) = n; χ(C<sub>n</sub>) = 2 nếu n chẵn, 3 nếu n lẻ; đồ thị hai phía (có cạnh) χ = 2; tô tham lam dùng tối đa Δ + 1 màu.",
          "<b>Đồ thị phẳng</b> liên thông: công thức Euler <b>v − e + f = 2</b>. Đơn đồ thị phẳng v ≥ 3: e ≤ 3v − 6; nếu không có tam giác: e ≤ 2v − 4.",
          "K<sub>5</sub> và K<sub>3,3</sub> không phẳng; định lý Kuratowski: G phẳng ⇔ không chứa đồ thị con đồng phôi với K<sub>5</sub> hoặc K<sub>3,3</sub>. Định lý 4 màu: mọi đồ thị phẳng có χ ≤ 4.",
        ],
        exercises: [
          { q: "Chứng minh K<sub>5</sub> không phẳng.", a: "v = 5, e = 10 > 3·5 − 6 = 9, trái với bất đẳng thức của đồ thị phẳng." },
          { q: "Chứng minh K<sub>3,3</sub> không phẳng.", a: "K<sub>3,3</sub> hai phía nên không có tam giác. v = 6, e = 9 > 2·6 − 4 = 8." },
          { q: "Đồ thị phẳng liên thông có 8 đỉnh, 12 cạnh. Một biểu diễn phẳng có bao nhiêu mặt?", a: "f = 2 − v + e = 2 − 8 + 12 = 6." },
          { q: "Tìm χ(C<sub>7</sub>) và χ(W<sub>6</sub>) (bánh xe có vành 6 đỉnh).", a: "χ(C<sub>7</sub>) = 3 (chu trình lẻ). W<sub>6</sub>: vành C<sub>6</sub> cần 2 màu, tâm kề tất cả nên cần màu thứ 3 ⇒ χ = 3." },
          { q: "X = {a, b, c}, Y = {1, 2, 3}; a kề 1, 2; b kề 1; c kề 1. Có ghép cặp phủ X không?", a: "Không. S = {b, c} có N(S) = {1}, |N(S)| = 1 < 2, vi phạm điều kiện Hall." },
        ],
        resources: [
          { name: "CP-Algorithms: Kuhn's matching", url: "https://cp-algorithms.com/graph/kuhn_maximum_bipartite_matching.html" },
          { name: "CP-Algorithms: Bipartite check", url: "https://cp-algorithms.com/graph/bipartite-check.html" },
        ],
      },
      {
        id: "g-review", subject: "graph", days: [6, 7, 14, 21, 22, 23, 24, 25, 26, 27, 28, 29], title: "Ôn tập và luyện đề Đồ thị",
        theory: [
          "<b>Bảng tóm tắt độ phức tạp</b>: BFS/DFS O(n + m) · Dijkstra O((n + m) log n) · Bellman-Ford O(nm) · Floyd O(n³) · Kruskal O(m log m) · Prim O(n²) hoặc O(m log n) · Kahn O(n + m) · Edmonds-Karp O(nm²).",
          "<b>Chọn thuật toán đường đi ngắn nhất</b>: không trọng số → BFS; không âm → Dijkstra; có cạnh âm → Bellman-Ford; mọi cặp, n nhỏ → Floyd; DAG → quy hoạch động theo thứ tự tô pô.",
          "<b>Phân biệt Euler và Hamilton</b>: Euler đi qua mọi <b>cạnh</b> (có điều kiện bậc chẵn), Hamilton đi qua mọi <b>đỉnh</b> (chỉ có điều kiện đủ Dirac/Ore).",
          "<b>Cách làm bài chạy tay</b>: ghi quy ước thứ tự đỉnh; kẻ bảng từng bước; khoanh kết quả; ghi đường đi cụ thể và tổng trọng số; kiểm tra số cạnh của cây khung = n − 1.",
          "<b>Sổ lỗi</b>: mỗi lần sai, ghi 'sai gì, vì sao, lần sau làm thế nào'. Tuần cuối chỉ đọc lại sổ lỗi và trang tóm tắt.",
        ],
        exercises: [
          { q: "Đúng hay sai: mọi đồ thị có chu trình Hamilton đều có chu trình Euler.", a: "Sai. K<sub>4</sub> có chu trình Hamilton nhưng mọi đỉnh bậc 3 (lẻ) nên không có chu trình Euler." },
          { q: "Đúng hay sai: cây khung nhỏ nhất chứa đường đi ngắn nhất giữa mọi cặp đỉnh.", a: "Sai. Ví dụ tam giác AB 2, BC 2, AC 3: MST = {AB, BC}, nhưng đường ngắn nhất A → C là cạnh AC = 3 < 4." },
          { q: "Một đơn đồ thị phẳng liên thông có 10 đỉnh bậc 3. Có bao nhiêu mặt?", a: "e = 10·3/2 = 15, f = 2 − 10 + 15 = 7." },
          { q: "Cây có 15 đỉnh. Tổng bậc các đỉnh bằng bao nhiêu?", a: "2(n − 1) = 28." },
          { q: "Đồ thị có hướng có đúng một đỉnh bán bậc vào 0. Có chắc là DAG không?", a: "Không. Ví dụ s→a, a→b, b→a: chỉ s có bán bậc vào 0 nhưng a-b-a là chu trình." },
          { q: "Tự đặt: lấy một đề thi cũ, bấm giờ đúng thời lượng, chấm theo đáp án, ghi các lỗi vào sổ lỗi.", a: "Không có đáp án chung. Sau khi chấm, chọn chủ đề sai nhiều nhất làm trọng tâm ngày ôn kế tiếp." },
        ],
        resources: [
          { name: "VisuAlgo", url: "https://visualgo.net/en", note: "Tự tạo đồ thị ngẫu nhiên để chạy tay rồi so kết quả" },
          { name: "CS Academy Graph Editor", url: "https://csacademy.com/app/graph_editor/" },
        ],
      },

      // ====================== OOP ======================
      {
        id: "o-class", subject: "oop", days: [1], title: "Lớp và đối tượng, thuộc tính, phương thức",
        theory: [
          "<b>Lớp</b> là khuôn mẫu mô tả dữ liệu (thuộc tính) và hành vi (phương thức). <b>Đối tượng</b> là một thể hiện cụ thể của lớp, có trạng thái riêng.",
          "Bốn tính chất của OOP: <b>đóng gói</b>, <b>kế thừa</b>, <b>đa hình</b>, <b>trừu tượng</b>. Câu hỏi lý thuyết rất hay hỏi định nghĩa và ví dụ cho từng tính chất.",
          "Phân tích bài toán: danh từ thường là lớp/thuộc tính, động từ thường là phương thức.",
          "C++: khai báo lớp trong .h, định nghĩa phương thức trong .cpp với <code>TenLop::tenHam</code>. Java: mỗi lớp public nằm trong file cùng tên.",
        ],
        code: `class PhanSo {
private:
  int tu, mau;
public:
  PhanSo(int t = 0, int m = 1) : tu(t), mau(m) {}
  double giaTri() const { return (double)tu / mau; }
  void xuat() const { cout << tu << "/" << mau; }
};`,
        exercises: [
          { q: "Đề: 'Một thư viện có nhiều sách, mỗi sách có mã, tên, tác giả, số lượng. Độc giả mượn và trả sách.' Xác định các lớp, thuộc tính và phương thức.", a: "Sach (ma, ten, tacGia, soLuong; giamSoLuong(), tangSoLuong()); DocGia (ma, ten, dsDangMuon; muon(s), tra(s)); ThuVien (dsSach, dsDocGia; timSach(ma), choMuon(dg, s))." },
          { q: "Phân biệt lớp và đối tượng bằng một ví dụ.", a: "Lớp SinhVien mô tả mọi sinh viên có MSSV, họ tên, điểm. Đối tượng sv1 là sinh viên cụ thể có MSSV 2251xxxx, tên An, điểm 8.0." },
          { q: "Nêu 4 tính chất của OOP, mỗi tính chất một câu.", a: "Đóng gói: giấu dữ liệu, chỉ cho truy cập qua phương thức. Kế thừa: lớp con dùng lại và mở rộng lớp cha. Đa hình: cùng lời gọi, hành vi khác nhau theo kiểu thực của đối tượng. Trừu tượng: chỉ đưa ra những đặc điểm cần thiết, ẩn chi tiết cài đặt." },
        ],
        resources: [
          { name: "Oracle: What Is a Class?", url: "https://docs.oracle.com/javase/tutorial/java/concepts/class.html" },
        ],
      },
      {
        id: "o-encap", subject: "oop", days: [2], title: "Đóng gói, phạm vi truy cập, getter/setter",
        theory: [
          "Phạm vi truy cập C++: <b>private</b> (chỉ trong lớp, và friend), <b>protected</b> (lớp và lớp con), <b>public</b> (mọi nơi). Mặc định của class là private, của struct là public.",
          "Java có thêm mức <b>mặc định (package-private)</b>: truy cập được trong cùng package. protected trong Java cũng cho phép cùng package.",
          "Đóng gói giúp giữ <b>bất biến</b> của đối tượng (ví dụ mẫu số ≠ 0), dễ đổi cài đặt bên trong mà không ảnh hưởng nơi dùng.",
          "Setter nên kiểm tra dữ liệu hợp lệ; không phải thuộc tính nào cũng cần setter.",
          "<code>friend</code> (C++) cho phép hàm/lớp bên ngoài truy cập private, thường dùng cho <code>operator&lt;&lt;</code>. Dùng ít để không phá đóng gói.",
        ],
        code: `void PhanSo::setMau(int m) {
  if (m == 0) throw invalid_argument("Mau so phai khac 0");
  mau = m;
}`,
        exercises: [
          { q: "Vì sao không nên để thuộc tính <code>mau</code> của PhanSo là public?", a: "Nơi khác có thể gán mau = 0 làm đối tượng không hợp lệ; lớp mất quyền kiểm soát bất biến." },
          { q: "Trong Java, một lớp ở package khác (không phải lớp con) truy cập được những thành viên nào?", a: "Chỉ public." },
          { q: "Viết lớp TaiKhoan có soDu private, phương thức napTien(x) và rutTien(x) không cho số dư âm.", a: "rutTien kiểm tra x > 0 và x ≤ soDu, nếu sai thì báo lỗi/trả false; napTien kiểm tra x > 0. Không có setSoDu công khai." },
        ],
        resources: [
          { name: "Oracle: Controlling Access", url: "https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html" },
        ],
      },
      {
        id: "o-ctor", subject: "oop", days: [3], title: "Hàm tạo, hàm hủy, hàm tạo sao chép",
        theory: [
          "Hàm tạo: cùng tên lớp, không kiểu trả về, có thể nạp chồng. Dùng <b>danh sách khởi tạo</b> <code>: tu(t), mau(m)</code> (bắt buộc với thành viên const, tham chiếu, lớp cha không có hàm tạo mặc định).",
          "Nếu bạn tự viết bất kỳ hàm tạo nào, trình biên dịch không tự sinh hàm tạo mặc định nữa.",
          "Hàm tạo sao chép <code>A(const A&amp;)</code> được gọi khi: khởi tạo đối tượng từ đối tượng khác, truyền tham trị, trả về tham trị (có thể bị tối ưu bỏ qua).",
          "Sao chép mặc định là <b>sao chép nông</b>: hai đối tượng dùng chung vùng nhớ con trỏ → giải phóng hai lần. Khi lớp quản lý tài nguyên, viết đủ <b>quy tắc 3</b>: hàm hủy, hàm tạo sao chép, toán tử gán (C++11: quy tắc 5, thêm move).",
          "Thứ tự gọi trong kế thừa: hàm tạo lớp cha → thành viên → lớp con; hàm hủy theo thứ tự ngược lại.",
          "Java không có hàm hủy (bộ gom rác tự giải phóng); dùng try-with-resources để đóng tài nguyên.",
        ],
        code: `class MangSo {
  int *a; int n;
public:
  MangSo(int n) : a(new int[n]), n(n) {}
  MangSo(const MangSo& o) : a(new int[o.n]), n(o.n) { copy(o.a, o.a + n, a); } // sâu
  MangSo& operator=(const MangSo& o) {
    if (this != &o) { delete[] a; n = o.n; a = new int[n]; copy(o.a, o.a + n, a); }
    return *this;
  }
  ~MangSo() { delete[] a; }
};`,
        exercises: [
          { q: "Đoạn sau in gì?<br><code>struct A { A(){cout&lt;&lt;\"A\";} ~A(){cout&lt;&lt;\"~A\";} };<br>struct B : A { B(){cout&lt;&lt;\"B\";} ~B(){cout&lt;&lt;\"~B\";} };<br>int main(){ B b; }</code>", a: "AB~B~A" },
          { q: "Lớp MangSo ở trên nếu bỏ hàm tạo sao chép thì <code>MangSo x(5); MangSo y = x;</code> gây lỗi gì?", a: "y.a và x.a trỏ cùng vùng nhớ; khi kết thúc main cả hai hàm hủy đều delete[] cùng con trỏ ⇒ giải phóng hai lần (lỗi chạy)." },
          { q: "Vì sao tham số hàm tạo sao chép phải là tham chiếu?", a: "Nếu truyền tham trị thì để tạo tham số lại phải gọi hàm tạo sao chép ⇒ đệ quy vô hạn." },
          { q: "Phân biệt <code>PhanSo b = a;</code> và <code>b = a;</code>.", a: "Câu đầu là khởi tạo ⇒ gọi hàm tạo sao chép. Câu sau gán cho đối tượng đã tồn tại ⇒ gọi operator=." },
        ],
        resources: [
          { name: "LearnCpp: Constructors", url: "https://www.learncpp.com/cpp-tutorial/introduction-to-constructors/" },
          { name: "cppreference: Rule of three/five/zero", url: "https://en.cppreference.com/w/cpp/language/rule_of_three" },
        ],
      },
      {
        id: "o-static", subject: "oop", days: [4], title: "Thành viên static, this, const",
        theory: [
          "Thuộc tính <b>static</b> dùng chung cho mọi đối tượng của lớp (C++ phải định nghĩa bên ngoài lớp: <code>int SinhVien::dem = 0;</code>). Phương thức static không có <code>this</code>, chỉ truy cập thành viên static.",
          "<b>this</b> là con trỏ (C++) / tham chiếu (Java) tới đối tượng đang gọi; dùng khi tham số trùng tên thuộc tính và để trả về <code>*this</code> cho phép gọi nối.",
          "Phương thức <b>const</b> <code>void xuat() const</code> hứa không sửa đối tượng. Đối tượng const chỉ gọi được phương thức const.",
          "Java: <code>final</code> với biến (không gán lại), phương thức (không ghi đè), lớp (không kế thừa).",
        ],
        exercises: [
          { q: "Viết lớp SinhVien đếm số đối tượng đang tồn tại.", a: "Thuộc tính <code>static int dem</code>; hàm tạo (và hàm tạo sao chép) tăng dem, hàm hủy giảm dem; <code>static int soLuong() { return dem; }</code>." },
          { q: "Vì sao <code>const PhanSo p(1,2); p.xuat();</code> báo lỗi nếu xuat() không có const?", a: "Đối tượng const chỉ được gọi phương thức const, trình biên dịch không biết xuat() có sửa đối tượng hay không." },
          { q: "Phương thức static có gọi được phương thức thường của lớp không?", a: "Không trực tiếp, vì không có this. Phải thông qua một đối tượng cụ thể." },
        ],
        resources: [
          { name: "Oracle: Class Members (static)", url: "https://docs.oracle.com/javase/tutorial/java/javaOO/classvars.html" },
        ],
      },
      {
        id: "o-operator", subject: "oop", days: [6], title: "Nạp chồng toán tử (C++), equals/toString (Java)",
        theory: [
          "<b>Nạp chồng (overload)</b>: cùng tên, khác danh sách tham số, xác định lúc biên dịch. Khác với <b>ghi đè (override)</b> ở lớp con.",
          "Toán tử hai ngôi đối xứng (+, ==) nên viết dạng hàm ngoài hoặc friend để <code>2 + p</code> cũng chạy được. <code>operator&lt;&lt;</code> phải là hàm ngoài, trả về <code>ostream&amp;</code>.",
          "<code>operator=</code> và <code>operator+=</code> trả về <code>*this</code> dạng tham chiếu. ++ tiền tố: <code>A&amp; operator++()</code>; hậu tố: <code>A operator++(int)</code>.",
          "Không nạp chồng được: <code>::</code>, <code>.</code>, <code>.*</code>, <code>?:</code>, <code>sizeof</code>.",
          "Java không có nạp chồng toán tử. Ghi đè <code>equals</code> thì <b>phải</b> ghi đè <code>hashCode</code> (đối tượng bằng nhau phải có cùng hashCode, để dùng đúng trong HashMap/HashSet). <code>toString</code> để in đối tượng.",
        ],
        code: `PhanSo operator+(const PhanSo& a, const PhanSo& b) {
  return PhanSo(a.tu * b.mau + b.tu * a.mau, a.mau * b.mau);
}
ostream& operator<<(ostream& os, const PhanSo& p) {
  return os << p.tu << "/" << p.mau;   // cần friend nếu tu, mau private
}`,
        exercises: [
          { q: "Viết operator== cho PhanSo sao cho 1/2 == 2/4.", a: "So sánh chéo: <code>return a.tu * b.mau == b.tu * a.mau;</code> (hoặc rút gọn cả hai trước khi so sánh)." },
          { q: "Vì sao operator&lt;&lt; không thể là phương thức thành viên của PhanSo?", a: "Toán hạng trái là ostream (cout), không phải PhanSo. Phương thức thành viên luôn nhận đối tượng của lớp làm toán hạng trái." },
          { q: "Java: hai đối tượng SinhVien cùng MSSV, equals đã ghi đè trả về true nhưng HashSet vẫn chứa cả hai. Vì sao?", a: "Chưa ghi đè hashCode, hai đối tượng có hashCode khác nhau nên HashSet coi là khác nhau." },
        ],
        resources: [
          { name: "cppreference: Operator overloading", url: "https://en.cppreference.com/w/cpp/language/operators" },
        ],
      },
      {
        id: "o-inherit", subject: "oop", days: [8, 9], title: "Kế thừa, ghi đè phương thức, gọi hàm lớp cha",
        theory: [
          "Kế thừa biểu diễn quan hệ <b>là một (is-a)</b>: SinhVien là một Nguoi. Lớp con có mọi thành viên của lớp cha, thêm hoặc ghi đè.",
          "C++ kiểu kế thừa: <b>public</b> giữ nguyên (public→public, protected→protected); <b>protected</b>: public, protected → protected; <b>private</b>: public, protected → private. Thành viên private của cha luôn không truy cập trực tiếp được từ con.",
          "Đa kế thừa (C++) có thể gây <b>vấn đề kim cương</b>, giải bằng kế thừa ảo <code>class B : virtual public A</code>. Java chỉ cho đơn kế thừa lớp nhưng đa thực thi interface.",
          "<b>Ghi đè</b>: lớp con định nghĩa lại phương thức cùng chữ ký. Gọi bản của cha: <code>Base::f()</code> (C++), <code>super.f()</code> (Java). Hàm tạo lớp con gọi hàm tạo cha trong danh sách khởi tạo / <code>super(...)</code> ở dòng đầu.",
          "C++: hàm cùng tên ở lớp con <b>che</b> (hide) mọi bản nạp chồng của cha; dùng <code>using Base::f;</code> để hiện lại.",
        ],
        code: `class NhanVien {
protected: string ten; double luongCB;
public:
  NhanVien(string t, double l) : ten(t), luongCB(l) {}
  virtual double tinhLuong() const { return luongCB; }
};
class QuanLy : public NhanVien {
  double phuCap;
public:
  QuanLy(string t, double l, double p) : NhanVien(t, l), phuCap(p) {}
  double tinhLuong() const override { return NhanVien::tinhLuong() + phuCap; }
};`,
        exercises: [
          { q: "Lớp A có x public, y protected, z private. B kế thừa protected từ A. Trong B và bên ngoài B, x, y, z có phạm vi gì?", a: "Trong B: x, y truy cập được (đều thành protected), z không. Bên ngoài qua đối tượng B: không truy cập được x, y, z." },
          { q: "Phân biệt overload và override.", a: "Overload: cùng tên khác tham số, trong cùng phạm vi, chọn lúc biên dịch. Override: lớp con viết lại phương thức (ảo) cùng chữ ký của cha, chọn lúc chạy theo kiểu thực của đối tượng." },
          { q: "Hình vuông có nên kế thừa Hình chữ nhật không?", a: "Về toán thì có, nhưng nếu HCN có setRong/setDai độc lập thì HinhVuong phá vỡ hành vi mong đợi (vi phạm Liskov). Thường nên cho cả hai cùng kế thừa lớp Hinh." },
        ],
        resources: [
          { name: "LearnCpp: Inheritance", url: "https://www.learncpp.com/cpp-tutorial/introduction-to-inheritance/" },
          { name: "Oracle: Inheritance", url: "https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html" },
        ],
      },
      {
        id: "o-poly", subject: "oop", days: [10], title: "Đa hình, hàm ảo, liên kết động",
        theory: [
          "<b>Đa hình tĩnh</b>: nạp chồng hàm/toán tử, template (chọn lúc biên dịch). <b>Đa hình động</b>: hàm ảo (chọn lúc chạy).",
          "C++: chỉ hàm <code>virtual</code> gọi qua <b>con trỏ hoặc tham chiếu</b> lớp cha mới có liên kết động (cơ chế bảng hàm ảo vtable). Gọi qua đối tượng (không phải con trỏ) luôn là liên kết tĩnh.",
          "<b>Cắt lát (slicing)</b>: gán đối tượng con cho biến kiểu cha (tham trị) làm mất phần của con.",
          "Lớp có hàm ảo cần <b>hàm hủy ảo</b>; nếu không, <code>delete</code> qua con trỏ cha sẽ không gọi hàm hủy của con.",
          "Dùng <code>override</code> (C++11) để trình biên dịch báo lỗi khi chữ ký không khớp. Java: mọi phương thức không static, không final, không private đều 'ảo'; dùng <code>@Override</code>.",
        ],
        exercises: [
          { q: "In gì?<br><code>struct Base { void f(){cout&lt;&lt;\"Base::f \";} virtual void g(){cout&lt;&lt;\"Base::g \";} };<br>struct Der : Base { void f(){cout&lt;&lt;\"Der::f \";} void g() override {cout&lt;&lt;\"Der::g \";} };<br>Base* p = new Der; p-&gt;f(); p-&gt;g();</code>", a: "Base::f Der::g — f không ảo nên chọn theo kiểu con trỏ; g ảo nên chọn theo kiểu thực." },
          { q: "Với lớp trên, <code>Base b = Der(); b.g();</code> in gì?", a: "Base::g — đối tượng bị cắt lát, b thực sự là Base." },
          { q: "Vì sao cần hàm hủy ảo? Cho ví dụ lỗi.", a: "<code>Base* p = new Der; delete p;</code> — nếu ~Base không ảo thì chỉ ~Base chạy, tài nguyên Der cấp phát (ví dụ mảng động) bị rò rỉ." },
          { q: "Viết vòng lặp tính tổng lương của <code>vector&lt;NhanVien*&gt;</code> gồm cả QuanLy và NhanVien thường.", a: "<code>for (auto nv : ds) tong += nv-&gt;tinhLuong();</code> — tinhLuong ảo nên mỗi đối tượng tự tính theo loại của nó; đây chính là đa hình." },
        ],
        resources: [
          { name: "LearnCpp: Virtual functions", url: "https://www.learncpp.com/cpp-tutorial/virtual-functions/" },
          { name: "Oracle: Polymorphism", url: "https://docs.oracle.com/javase/tutorial/java/IandI/polymorphism.html" },
        ],
      },
      {
        id: "o-abstract", subject: "oop", days: [11], title: "Lớp trừu tượng, interface",
        theory: [
          "C++: lớp có ít nhất một <b>hàm thuần ảo</b> <code>virtual double dienTich() const = 0;</code> là lớp trừu tượng, không tạo đối tượng được. Lớp con phải cài đặt hết hàm thuần ảo mới tạo được đối tượng.",
          "Java: <code>abstract class</code> có thể có thuộc tính, hàm tạo, phương thức đã cài đặt; <code>interface</code> mô tả 'khả năng', một lớp thực thi nhiều interface; từ Java 8 interface có <code>default</code>/<code>static</code> method.",
          "Chọn lớp trừu tượng khi các lớp con có chung dữ liệu và một phần cài đặt; chọn interface khi chỉ cần chung hợp đồng hành vi giữa các lớp không liên quan (Comparable, Runnable).",
        ],
        code: `class Hinh {
public:
  virtual double dienTich() const = 0;
  virtual double chuVi() const = 0;
  virtual ~Hinh() = default;
};
class HinhTron : public Hinh {
  double r;
public:
  HinhTron(double r) : r(r) {}
  double dienTich() const override { return M_PI * r * r; }
  double chuVi() const override { return 2 * M_PI * r; }
};`,
        exercises: [
          { q: "<code>Hinh h;</code> có biên dịch được không? <code>Hinh* h = new HinhTron(2);</code> thì sao?", a: "Câu đầu lỗi vì Hinh trừu tượng. Câu sau hợp lệ: con trỏ kiểu lớp trừu tượng trỏ tới đối tượng lớp con cụ thể." },
          { q: "So sánh abstract class và interface trong Java (3 ý).", a: "1) Lớp chỉ kế thừa một abstract class nhưng thực thi nhiều interface. 2) Abstract class có thuộc tính và hàm tạo; interface chỉ có hằng. 3) Abstract class dùng cho quan hệ is-a có chung cài đặt; interface mô tả khả năng." },
          { q: "Thiết kế: HinhTron, HinhChuNhat, TamGiac; in danh sách hình theo diện tích giảm dần.", a: "Lớp trừu tượng Hinh có dienTich() thuần ảo; ba lớp con cài đặt; lưu <code>vector&lt;Hinh*&gt;</code> (hoặc unique_ptr), sort với so sánh <code>a-&gt;dienTich() &gt; b-&gt;dienTich()</code>." },
        ],
        resources: [
          { name: "Oracle: Abstract Methods and Classes", url: "https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html" },
          { name: "Oracle: Interfaces", url: "https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html" },
        ],
      },
      {
        id: "o-uml", subject: "oop", days: [14, 15], title: "Quan hệ giữa các lớp và sơ đồ lớp UML",
        theory: [
          "<b>Kết hợp (association)</b>: hai lớp biết nhau, đường liền. Ví dụ GiaoVien — MonHoc.",
          "<b>Kết tập (aggregation)</b>: quan hệ toàn thể–bộ phận lỏng, bộ phận tồn tại độc lập; hình thoi <b>rỗng</b> ở phía toàn thể. Ví dụ Lop ◇— SinhVien.",
          "<b>Hợp thành (composition)</b>: bộ phận sống chết theo toàn thể; hình thoi <b>đặc</b>. Ví dụ Nha ◆— Phong. Trong C++ thường là thành viên giá trị; kết tập thường là con trỏ/tham chiếu.",
          "<b>Kế thừa (generalization)</b>: mũi tên tam giác rỗng, nét liền, chỉ về lớp cha. <b>Thực thi (realization)</b>: tam giác rỗng, nét đứt, chỉ về interface. <b>Phụ thuộc (dependency)</b>: mũi tên nét đứt.",
          "Bản số: 1, 0..1, *, 1..*. Ký hiệu phạm vi: + public, − private, # protected, ~ package.",
          "Một ô lớp có 3 ngăn: tên lớp; thuộc tính <code>− ten: string</code>; phương thức <code>+ tinhLuong(): double</code>. Lớp/phương thức trừu tượng viết nghiêng.",
        ],
        exercises: [
          { q: "Xác định quan hệ: (a) Xe — DongCo, (b) CongTy — NhanVien, (c) HoaDon — DongHoaDon, (d) SinhVien — MonHoc.", a: "(a) hợp thành (thường coi động cơ là bộ phận của xe), (b) kết tập (nhân viên vẫn tồn tại khi rời công ty), (c) hợp thành, (d) kết hợp nhiều–nhiều." },
          { q: "Vẽ sơ đồ lớp cho bài quản lý nhân viên (NhanVien, QuanLy, NhanVienThoiVu, PhongBan).", a: "NhanVien (trừu tượng): −ten, −luongCB, +tinhLuong() nghiêng. QuanLy và NhanVienThoiVu kế thừa (tam giác rỗng). PhongBan ◇— 1..* NhanVien; PhongBan — 0..1 QuanLy (trưởng phòng)." },
          { q: "Kết tập và hợp thành khác nhau thế nào trong code C++?", a: "Hợp thành: thành viên giá trị hoặc unique_ptr, tạo/hủy cùng đối tượng chứa. Kết tập: con trỏ/tham chiếu tới đối tượng được tạo bên ngoài, không delete trong hàm hủy." },
        ],
        resources: [
          { name: "UML Class Diagrams", url: "https://www.uml-diagrams.org/class-diagrams-overview.html" },
          { name: "PlantUML class diagram", url: "https://plantuml.com/class-diagram" },
        ],
      },
      {
        id: "o-exception", subject: "oop", days: [16], title: "Xử lý ngoại lệ",
        theory: [
          "<code>try</code> chứa đoạn có thể lỗi, <code>throw</code> ném ngoại lệ, <code>catch</code> bắt theo kiểu, khối catch đầu tiên khớp được chọn ⇒ đặt catch lớp con trước lớp cha.",
          "C++: ném theo giá trị, bắt theo <b>tham chiếu</b> <code>catch (const exception&amp; e)</code>. Khi ngoại lệ lan ra, các đối tượng cục bộ được hủy (stack unwinding) ⇒ dùng <b>RAII</b> (unique_ptr, lock_guard) để không rò rỉ.",
          "Java: <b>checked exception</b> (IOException...) bắt buộc bắt hoặc khai báo <code>throws</code>; <b>unchecked</b> (RuntimeException, NullPointerException...) thì không. <code>finally</code> luôn chạy; <code>try-with-resources</code> tự đóng tài nguyên.",
          "Tự tạo ngoại lệ: kế thừa <code>std::exception</code>/<code>runtime_error</code> (C++) hoặc <code>Exception</code>/<code>RuntimeException</code> (Java).",
        ],
        exercises: [
          { q: "In gì?<br><code>try { throw 5; } catch (double) { cout &lt;&lt; \"d\"; } catch (int) { cout &lt;&lt; \"i\"; } catch (...) { cout &lt;&lt; \"all\"; }</code>", a: "i — catch không chuyển kiểu int sang double; khớp chính xác catch (int)." },
          { q: "Java: catch (Exception e) đặt trước catch (IOException e) thì sao?", a: "Lỗi biên dịch: catch IOException không bao giờ tới được vì Exception đã bắt hết." },
          { q: "Viết hàm chia hai phân số, ném ngoại lệ khi chia cho phân số 0.", a: "Nếu b.tu == 0 thì <code>throw invalid_argument(\"Chia cho 0\");</code>, nơi gọi bọc try/catch (const invalid_argument&amp; e) và in e.what()." },
        ],
        resources: [
          { name: "Oracle: Exceptions", url: "https://docs.oracle.com/javase/tutorial/essential/exceptions/" },
          { name: "cppreference: Exceptions", url: "https://en.cppreference.com/w/cpp/language/exceptions" },
        ],
      },
      {
        id: "o-generic", subject: "oop", days: [17], title: "Template/Generic, collection",
        theory: [
          "C++ <b>template</b>: viết một lần cho nhiều kiểu, trình biên dịch sinh mã cho từng kiểu dùng tới. <code>template &lt;typename T&gt; T lonNhat(T a, T b)</code>.",
          "STL: <code>vector</code> (mảng động), <code>list</code>, <code>map</code>/<code>set</code> (cây, có thứ tự, O(log n)), <code>unordered_map</code> (băm, O(1) trung bình), thuật toán <code>sort</code>, <code>find</code>, duyệt bằng iterator hoặc range-for.",
          "Java <b>generic</b>: <code>List&lt;String&gt;</code>, <code>Map&lt;K, V&gt;</code>; chỉ dùng kiểu đối tượng (Integer, không phải int); bị <b>xóa kiểu</b> (type erasure) lúc chạy.",
          "<code>List&lt;Integer&gt;</code> không phải kiểu con của <code>List&lt;Number&gt;</code>; dùng ký tự đại diện <code>List&lt;? extends Number&gt;</code> để đọc.",
        ],
        code: `template <typename T>
class NganXep {
  vector<T> a;
public:
  void push(const T& x) { a.push_back(x); }
  T pop() { T x = a.back(); a.pop_back(); return x; }
  bool rong() const { return a.empty(); }
};`,
        exercises: [
          { q: "Viết template hàm hoán đổi hai giá trị.", a: "<code>template &lt;typename T&gt; void hoanDoi(T&amp; a, T&amp; b) { T t = a; a = b; b = t; }</code>" },
          { q: "Muốn đếm số lần xuất hiện mỗi từ trong văn bản, dùng collection nào?", a: "C++: <code>map&lt;string,int&gt;</code> (in theo thứ tự) hoặc unordered_map. Java: <code>HashMap&lt;String,Integer&gt;</code> với merge(word, 1, Integer::sum)." },
          { q: "Vì sao Java không cho <code>List&lt;Number&gt; l = new ArrayList&lt;Integer&gt;();</code>?", a: "Nếu cho phép thì có thể l.add(3.14) vào danh sách Integer, phá an toàn kiểu." },
        ],
        resources: [
          { name: "Oracle: Generics", url: "https://docs.oracle.com/javase/tutorial/java/generics/" },
          { name: "cppreference: Containers library", url: "https://en.cppreference.com/w/cpp/container" },
        ],
      },
      {
        id: "o-solid", subject: "oop", days: [18], title: "Nguyên lý SOLID",
        theory: [
          "<b>S – Single Responsibility</b>: mỗi lớp chỉ có một lý do để thay đổi. Ví dụ tách HoaDon (dữ liệu) khỏi InHoaDon (xuất file).",
          "<b>O – Open/Closed</b>: mở để mở rộng, đóng để sửa đổi. Thêm loại hình mới bằng lớp con mới, không sửa chuỗi if/switch theo loại.",
          "<b>L – Liskov Substitution</b>: đối tượng lớp con thay được cho lớp cha mà chương trình vẫn đúng. Ví dụ vi phạm: HinhVuong kế thừa HinhChuNhat có setRong/setDai.",
          "<b>I – Interface Segregation</b>: nhiều interface nhỏ tốt hơn một interface lớn bắt lớp cài đặt hàm không cần.",
          "<b>D – Dependency Inversion</b>: module cấp cao phụ thuộc vào trừu tượng, không phụ thuộc lớp cụ thể; truyền phụ thuộc qua hàm tạo.",
        ],
        exercises: [
          { q: "Hàm <code>tinhLuong(NhanVien nv)</code> dùng switch theo nv.loai. Vi phạm nguyên lý nào, sửa ra sao?", a: "Vi phạm Open/Closed (thêm loại mới phải sửa switch). Sửa: tinhLuong là phương thức ảo, mỗi loại nhân viên là một lớp con." },
          { q: "Interface MayIn có in(), scan(), fax(). Lớp MayInRe chỉ in được. Vi phạm gì?", a: "Interface Segregation. Tách thành CoTheIn, CoTheScan, CoTheFax; MayInRe chỉ thực thi CoTheIn." },
          { q: "Lớp DonHang tự tạo <code>new MySQLDatabase()</code> bên trong. Vi phạm gì?", a: "Dependency Inversion. DonHang nên nhận một interface CoSoDuLieu qua hàm tạo, để thay bằng CSDL khác hoặc bản giả khi test." },
        ],
        resources: [
          { name: "Wikipedia: SOLID", url: "https://en.wikipedia.org/wiki/SOLID" },
        ],
      },
      {
        id: "o-pattern", subject: "oop", days: [19], title: "Mẫu thiết kế: Singleton, Factory, Observer",
        theory: [
          "<b>Singleton</b>: lớp chỉ có một đối tượng, truy cập qua phương thức static. Hàm tạo private, cấm sao chép. C++11: biến static cục bộ trong hàm là an toàn đa luồng.",
          "<b>Factory Method</b>: tách việc tạo đối tượng ra một phương thức/lớp riêng, nơi dùng chỉ biết lớp cha. Ví dụ <code>Hinh* taoHinh(string loai)</code>.",
          "<b>Observer</b>: một đối tượng (subject) giữ danh sách người theo dõi và gọi <code>capNhat()</code> của họ khi trạng thái đổi. Ví dụ thông báo, sự kiện giao diện.",
          "Khi trả lời đề: nêu mục đích, vẽ sơ đồ lớp nhỏ, viết code khung, nêu ví dụ thực tế.",
        ],
        code: `class CauHinh {
  CauHinh() {}
public:
  CauHinh(const CauHinh&) = delete;
  CauHinh& operator=(const CauHinh&) = delete;
  static CauHinh& instance() { static CauHinh c; return c; }
};`,
        exercises: [
          { q: "Viết Singleton trong Java.", a: "<code>public class CauHinh { private static final CauHinh INSTANCE = new CauHinh(); private CauHinh() {} public static CauHinh getInstance() { return INSTANCE; } }</code>" },
          { q: "Ứng dụng cần gửi thông báo cho email, SMS, app khi đơn hàng đổi trạng thái. Dùng mẫu nào?", a: "Observer: DonHang là subject, ThongBaoEmail/SMS/App thực thi interface NguoiTheoDoi và được đăng ký vào đơn hàng." },
          { q: "Nhược điểm của Singleton?", a: "Là trạng thái toàn cục, khó kiểm thử (khó thay bằng bản giả), che giấu phụ thuộc, cần chú ý đa luồng." },
        ],
        resources: [
          { name: "Refactoring.Guru: Singleton", url: "https://refactoring.guru/design-patterns/singleton" },
          { name: "Refactoring.Guru: Factory Method", url: "https://refactoring.guru/design-patterns/factory-method" },
          { name: "Refactoring.Guru: Observer", url: "https://refactoring.guru/design-patterns/observer" },
        ],
      },
      {
        id: "o-projects", subject: "oop", days: [5, 12, 13, 20, 21], title: "Bài code thực hành (PhanSo, Hình, Nhân viên, Thư viện)",
        theory: [
          "Mỗi bài: vẽ sơ đồ lớp trước, code sau; tách file .h/.cpp; có hàm main thử mọi chức năng; tự review theo SOLID.",
          "Tiêu chí tự chấm: thuộc tính private; có hàm tạo đầy đủ; dùng const đúng chỗ; không lặp code; dùng đa hình thay cho if/switch theo loại; giải phóng bộ nhớ (hoặc dùng vector/unique_ptr).",
        ],
        exercises: [
          { q: "<b>PhanSo</b>: hàm tạo, rút gọn (UCLN), +, −, *, / (ném ngoại lệ khi chia cho 0), ==, &lt;, nhập/xuất bằng &gt;&gt; &lt;&lt;. Sắp xếp một mảng phân số.", a: "Kiểm tra: 1/2 + 1/3 = 5/6; 2/4 == 1/2; mẫu âm được chuẩn hóa (1/−2 → −1/2); sort mảng {3/4, 1/2, 2/3} cho 1/2, 2/3, 3/4." },
          { q: "<b>SinhVien</b>: MSSV, họ tên, điểm 3 môn; tính điểm trung bình, xếp loại; danh sách sinh viên: thêm, xóa theo MSSV, tìm, sắp xếp theo điểm.", a: "Tách SinhVien và DanhSachSinhVien (Single Responsibility). Không cho điểm ngoài [0, 10]." },
          { q: "<b>Hệ thống Hình</b>: Hinh trừu tượng; HinhTron, HinhChuNhat, TamGiac (kiểm tra 3 cạnh hợp lệ); nhập n hình, in tổng diện tích và hình có chu vi lớn nhất.", a: "Dùng <code>vector&lt;unique_ptr&lt;Hinh&gt;&gt;</code>; tam giác hợp lệ khi a + b &gt; c với mọi hoán vị; diện tích tam giác dùng công thức Heron." },
          { q: "<b>Quản lý nhân viên</b>: NhanVienVanPhong (lương = lương CB × hệ số), NhanVienSanXuat (lương = số sản phẩm × đơn giá), QuanLy (lương CB + phụ cấp). Tính tổng lương, tìm người lương cao nhất.", a: "tinhLuong() thuần ảo ở NhanVien; hàm hủy ảo; thêm loại mới chỉ cần thêm lớp con (Open/Closed)." },
          { q: "<b>Quản lý thư viện</b> (3–5 lớp): Sach, DocGia, PhieuMuon, ThuVien. Mượn (giảm số lượng, tối đa 3 cuốn/độc giả), trả, liệt kê sách quá hạn.", a: "ThuVien hợp thành danh sách Sach và PhieuMuon; PhieuMuon kết hợp DocGia và Sach; ném ngoại lệ khi hết sách hoặc vượt hạn mức." },
        ],
        resources: [
          { name: "OnlineGDB", url: "https://www.onlinegdb.com/" },
          { name: "LearnCpp", url: "https://www.learncpp.com/" },
        ],
      },
      {
        id: "o-review", subject: "oop", days: [7, 22, 23, 24, 25, 26, 27, 28, 29], title: "Ôn tập OOP: câu hỏi lý thuyết hay gặp",
        theory: [
          "Trang tóm tắt nên có: 4 tính chất OOP; bảng phạm vi truy cập và kiểu kế thừa; khi nào gọi hàm tạo sao chép; quy tắc 3/5; virtual, hàm hủy ảo, slicing; abstract vs interface; 6 quan hệ UML; SOLID; 3 mẫu thiết kế.",
          "Đề code thường cho một hệ thống 3–5 lớp có kế thừa và đa hình: đọc đề, vẽ sơ đồ lớp trước khi viết, ưu tiên đúng và đủ chức năng trước khi tối ưu.",
        ],
        exercises: [
          { q: "Overload, override, hide khác nhau thế nào?", a: "Overload: cùng tên khác tham số trong cùng phạm vi. Override: lớp con định nghĩa lại hàm ảo cùng chữ ký. Hide (C++): hàm cùng tên ở lớp con che các hàm cùng tên của cha (kể cả khác tham số)." },
          { q: "Hàm tạo có thể là hàm ảo không? Hàm hủy thì sao?", a: "Hàm tạo không thể ảo (đối tượng chưa có vtable khi đang tạo). Hàm hủy nên ảo khi lớp được dùng làm lớp cơ sở đa hình." },
          { q: "struct và class trong C++ khác nhau ở đâu?", a: "Chỉ khác phạm vi mặc định: struct mặc định public (cả thành viên lẫn kế thừa), class mặc định private." },
          { q: "Gọi hàm ảo trong hàm tạo của lớp cha thì bản nào chạy?", a: "Bản của lớp cha, vì lúc đó phần lớp con chưa được tạo." },
          { q: "Trừu tượng hóa và đóng gói khác nhau thế nào?", a: "Trừu tượng hóa chọn ra những gì cần thể hiện (giao diện, hành vi). Đóng gói là cơ chế giấu dữ liệu và chi tiết cài đặt sau giao diện đó." },
          { q: "Lớp con có truy cập được thành viên private của lớp cha không?", a: "Không trực tiếp; thành viên đó vẫn nằm trong đối tượng con nhưng chỉ truy cập qua phương thức public/protected của cha." },
        ],
        resources: [
          { name: "LearnCpp", url: "https://www.learncpp.com/" },
          { name: "Oracle Java Tutorials", url: "https://docs.oracle.com/javase/tutorial/java/concepts/" },
        ],
      },

      // ====================== IELTS ======================
      {
        id: "i-overview", subject: "ielts", skills: ["Mock"], title: "Cấu trúc đề và cách tính điểm",
        theory: [
          "<b>Listening</b> ~30 phút, 4 phần, 40 câu (thi giấy có thêm 10 phút chép đáp án, thi máy 2 phút kiểm tra). <b>Reading</b> (Academic) 60 phút, 3 bài đọc, 40 câu, không có thời gian chép thêm. <b>Writing</b> 60 phút: Task 1 ≥ 150 từ (~20 phút), Task 2 ≥ 250 từ (~40 phút); Task 2 chiếm trọng số gấp đôi Task 1. <b>Speaking</b> 11–14 phút, 3 phần.",
          "Listening/Reading: 1 điểm mỗi câu đúng, đổi sang band. Mức tham khảo: khoảng 30/40 ≈ 7.0, 23/40 ≈ 6.0, 16/40 ≈ 5.0 (Reading Academic gần tương tự; bảng quy đổi có thể lệch nhẹ giữa các đề).",
          "Overall = trung bình 4 kỹ năng, làm tròn tới 0.5 gần nhất; .25 làm tròn lên .5, .75 làm tròn lên band kế tiếp.",
          "Writing chấm 4 tiêu chí: Task Achievement/Response, Coherence &amp; Cohesion, Lexical Resource, Grammatical Range &amp; Accuracy. Speaking: Fluency &amp; Coherence, Lexical Resource, Grammatical Range &amp; Accuracy, Pronunciation.",
          "Để đạt 7.0 overall thường cần Listening/Reading 7.0–7.5 bù cho Writing/Speaking 6.5. Đọc kỹ band descriptors trên ielts.org để biết từng tiêu chí cần gì.",
        ],
        exercises: [
          { q: "Điểm L 7.5, R 7.0, W 6.0, S 6.5. Overall bao nhiêu?", a: "Trung bình 6.75 ⇒ làm tròn lên 7.0." },
          { q: "Điểm L 6.5, R 6.5, W 5.5, S 6.0. Overall bao nhiêu?", a: "Trung bình 6.125 ⇒ làm tròn xuống 6.0." },
          { q: "Lập kế hoạch thời gian Writing 60 phút.", a: "Task 1: 3 phút đọc biểu đồ, 15 phút viết, 2 phút soát. Task 2: 5 phút dàn ý, 30 phút viết, 5 phút soát. Làm Task 2 trước cũng được vì nó nhiều điểm hơn." },
        ],
        resources: [
          { name: "IELTS.org: test format", url: "https://www.ielts.org/" },
          { name: "Take IELTS: free practice tests", url: "https://takeielts.britishcouncil.org/" },
        ],
      },
      {
        id: "i-listening", subject: "ielts", skills: ["Listening"], title: "Listening: dạng bài và cách luyện",
        theory: [
          "Phần 1: hội thoại đời sống (điền form); Phần 2: độc thoại đời sống (bản đồ, thông tin); Phần 3: thảo luận học thuật 2–4 người; Phần 4: bài giảng (thường điền ghi chú, khó nhất).",
          "Dạng câu hỏi: form/note/table completion, multiple choice, matching, map/plan labelling, sentence completion.",
          "Trước khi nghe: gạch từ khóa, <b>đoán loại từ</b> cần điền (danh từ số ít/nhiều, số, tên riêng). Đọc kỹ giới hạn: <i>NO MORE THAN TWO WORDS AND/OR A NUMBER</i>.",
          "Bẫy thường gặp: người nói đưa thông tin rồi sửa lại (<i>actually, sorry, no wait</i>), đánh vần tên, số điện thoại, ngày tháng, số ít/số nhiều. Sai chính tả là sai cả câu.",
          "Luyện: giai đoạn 1 nghe chép chính tả 10–15 phút/ngày (BBC 6 Minute English), shadowing; giai đoạn 2–3 làm đề, chữa bằng transcript, ghi lại các paraphrase đã bỏ lỡ.",
        ],
        exercises: [
          { q: "Đề yêu cầu ONE WORD AND/OR A NUMBER. Người nói: 'The meeting is on the fifteenth of May'. Viết đáp án thế nào cho hợp lệ?", a: "<b>15 May</b> hoặc <b>May 15</b> (một từ + một số). 'the fifteenth of May' quá giới hạn." },
          { q: "Người nói: 'The class starts at half past six... oh no, they moved it to seven.' Đáp án giờ học?", a: "7 / 7:00 / seven — thông tin sau khi sửa mới là đáp án." },
          { q: "Bài luyện: chọn một tập BBC 6 Minute English, nghe chép chính tả 2 phút đầu, so với transcript, đếm lỗi và phân loại (âm cuối, nối âm, từ mới).", a: "Mục tiêu giai đoạn 1: dưới 10 lỗi cho 2 phút. Ghi lại từ hay nghe sai vào Anki." },
          { q: "Chữa 1 đề Cambridge: với mỗi câu sai, tìm câu tương ứng trong transcript và ghi cặp paraphrase (đề viết gì / băng nói gì).", a: "Ví dụ: đề 'inexpensive' – băng 'won't cost you much'. Sổ paraphrase là thứ giúp tăng điểm nhanh nhất ở Listening và Reading." },
        ],
        resources: [
          { name: "BBC 6 Minute English", url: "https://www.bbc.co.uk/learningenglish/" },
          { name: "LearnEnglish: Listening", url: "https://learnenglish.britishcouncil.org/" },
          { name: "IELTS Liz: Listening", url: "https://ieltsliz.com/" },
        ],
      },
      {
        id: "i-reading", subject: "ielts", skills: ["Reading"], title: "Reading: chiến lược và dạng bài",
        theory: [
          "Chia thời gian ~20 phút/bài đọc, bài 3 khó nhất. Chép đáp án trực tiếp vào phiếu.",
          "<b>Skimming</b> (đọc lướt ý chính đoạn) cho Matching Headings; <b>scanning</b> (dò tên riêng, số, từ khóa) cho câu hỏi chi tiết. Hầu hết câu hỏi theo thứ tự bài đọc (trừ matching).",
          "<b>TRUE/FALSE/NOT GIVEN</b> (thông tin) và <b>YES/NO/NOT GIVEN</b> (ý kiến tác giả): FALSE = bài nói ngược lại; NOT GIVEN = bài không đề cập. Không dùng kiến thức bên ngoài.",
          "Câu hỏi gần như luôn <b>paraphrase</b> bài đọc: chú ý từ đồng nghĩa và từ chỉ mức độ (all/some, always/usually, only).",
          "Summary/sentence completion: lấy đúng từ trong bài, đúng ngữ pháp câu, không quá số từ cho phép.",
        ],
        exercises: [
          { q: "Đọc đoạn: <i>“Urban gardens have spread rapidly across European cities over the last decade. Supporters claim they reduce local temperatures, although most studies so far have been limited to a few cities in the north. Some councils now offer free land to residents who agree to grow vegetables.”</i><br>Trả lời TRUE/FALSE/NOT GIVEN:<br>1. Urban gardens became popular in Europe only recently.<br>2. Research on cooling effects covers cities throughout Europe.<br>3. Most residents prefer growing flowers to vegetables.<br>4. Some local authorities give land to people at no cost.", a: "1. TRUE (over the last decade).<br>2. FALSE (limited to a few cities in the north).<br>3. NOT GIVEN (không nói về sở thích hoa hay rau).<br>4. TRUE (councils offer free land)." },
          { q: "Phân biệt FALSE và NOT GIVEN bằng một câu.", a: "FALSE: bài có thông tin mâu thuẫn với câu hỏi. NOT GIVEN: bài không có thông tin để khẳng định hay phủ định." },
          { q: "Bài luyện: làm 1 passage trong 20 phút, sau đó với mỗi câu sai ghi lại: dạng câu, câu chứa đáp án, vì sao chọn sai.", a: "Sau 5–6 bài sẽ thấy dạng yếu nhất; dồn buổi 'Reading dạng yếu' vào dạng đó." },
        ],
        resources: [
          { name: "IELTS Liz: Reading", url: "https://ieltsliz.com/" },
          { name: "LearnEnglish: Reading", url: "https://learnenglish.britishcouncil.org/" },
        ],
      },
      {
        id: "i-writing1", subject: "ielts", skills: [], title: "Writing Task 1 (Academic): mô tả biểu đồ",
        theory: [
          "Cấu trúc 4 đoạn: <b>Introduction</b> (paraphrase đề, 1 câu) · <b>Overview</b> (2 xu hướng/đặc điểm nổi bật nhất, không số liệu chi tiết) · <b>Body 1, Body 2</b> (nhóm số liệu, so sánh).",
          "Không có Overview thì Task Achievement khó vượt 5.0. Không nêu ý kiến hay lý do.",
          "Ngôn ngữ xu hướng: rise/increase/grow, fall/decrease/decline, fluctuate, remain stable, peak at, hit a low of; trạng từ sharply, steadily, slightly. So sánh: twice as many as, the highest proportion, compared with.",
          "Dạng: line, bar, pie, table, mixed, process (dùng bị động, first/then/finally), map (dùng thì quá khứ và bị động: was replaced by, was built).",
        ],
        exercises: [
          { q: "Bảng: số lượt khách của bảo tàng A, B, C năm 2010 và 2020 (nghìn): A 120 → 300, B 250 → 260, C 180 → 90. Viết câu Overview.", a: "Mẫu: <i>Overall, Museum A saw by far the largest growth and became the most visited of the three by 2020, while visitor numbers at Museum C halved and those at Museum B remained almost unchanged.</i>" },
          { q: "Paraphrase đề: 'The chart shows the percentage of households with internet access in three countries from 2000 to 2020.'", a: "Mẫu: <i>The line graph illustrates the proportion of homes that had internet access in three nations over a 20-year period starting in 2000.</i>" },
          { q: "Sửa lỗi: 'The number of visitors of museum C was decreased to 90.'", a: "<i>The number of visitors to Museum C decreased to 90,000.</i> (decrease là nội động từ; 'visitors to'; đơn vị nghìn)." },
        ],
        resources: [
          { name: "IELTS Simon: Writing Task 1", url: "https://ielts-simon.com/" },
          { name: "IELTS Liz: Writing Task 1", url: "https://ieltsliz.com/" },
        ],
      },
      {
        id: "i-writing2", subject: "ielts", skills: ["Writing"], title: "Writing Task 2: bài luận",
        theory: [
          "Dạng đề: Opinion (agree/disagree), Discussion (discuss both views + opinion), Advantages/Disadvantages, Problem/Solution (cause/solution), Two-part question. Đọc kỹ để trả lời <b>đủ mọi phần</b> của đề.",
          "Cấu trúc 4 đoạn: Mở bài (paraphrase + thesis rõ ràng) · Thân 1 · Thân 2 (mỗi đoạn một ý chính: câu chủ đề → giải thích → ví dụ) · Kết luận (nhắc lại quan điểm).",
          "Thesis phải nhất quán từ mở bài đến kết luận. Một ý được phát triển sâu tốt hơn ba ý liệt kê.",
          "Từ nối dùng vừa phải, chính xác (however, therefore, for instance); tránh học thuộc câu mẫu dài vô nghĩa. Đa dạng câu phức nhưng ưu tiên đúng.",
          "Sau khi viết: tự soát theo 4 tiêu chí, đếm lỗi ngữ pháp lặp lại, viết lại một đoạn. Giai đoạn 3 nên có người chấm.",
        ],
        exercises: [
          { q: "Đề: <i>Some people think university students should study whatever they like, while others believe they should only study subjects useful for their future careers. Discuss both views and give your opinion.</i> Lập dàn ý.", a: "Mở: nêu hai quan điểm, thesis: sinh viên nên được chọn tự do nhưng có định hướng nghề nghiệp. Thân 1: lợi ích học theo đam mê (động lực, sáng tạo; ví dụ ngành nghệ thuật dẫn tới thiết kế). Thân 2: lý do chọn môn hữu ích (thị trường lao động, chi phí học phí). Kết: nhắc lại quan điểm cân bằng." },
          { q: "Đề: <i>In many cities, traffic congestion is becoming a serious problem. What are the causes and what solutions can you suggest?</i> Viết câu thesis.", a: "Mẫu: <i>This essay argues that the problem stems mainly from rising car ownership and poor public transport, and that investing in mass transit together with congestion charges would be the most effective remedies.</i>" },
          { q: "Đề: <i>Working from home is becoming more common. Do the advantages outweigh the disadvantages?</i> Viết bài 250 từ trong 40 phút, rồi tự chấm theo 4 tiêu chí.", a: "Không có bài mẫu duy nhất. Kiểm tra: có trả lời trực tiếp 'outweigh hay không'? Mỗi đoạn thân có ví dụ cụ thể? Có quá 3 lỗi ngữ pháp lặp lại không?" },
        ],
        resources: [
          { name: "IELTS Simon: Writing Task 2", url: "https://ielts-simon.com/" },
          { name: "IELTS Liz: Writing Task 2", url: "https://ieltsliz.com/" },
        ],
      },
      {
        id: "i-speaking", subject: "ielts", skills: ["Speaking"], title: "Speaking: 3 phần và cách luyện",
        theory: [
          "<b>Part 1</b> (4–5 phút): câu hỏi về bản thân, quê, học, sở thích. Trả lời 2–3 câu: trả lời thẳng + lý do + ví dụ.",
          "<b>Part 2</b> (3–4 phút): nhận cue card, 1 phút chuẩn bị (ghi từ khóa, không viết câu), nói 1–2 phút. Đi theo các gạch đầu dòng, kể chuyện có thời gian, địa điểm, cảm xúc.",
          "<b>Part 3</b> (4–5 phút): câu hỏi trừu tượng liên quan Part 2. Nêu quan điểm, so sánh quá khứ–hiện tại, nêu hai mặt, cho ví dụ xã hội.",
          "Không học thuộc câu trả lời (giám khảo nhận ra và trừ điểm). Có thể dùng câu câu giờ tự nhiên: <i>That's an interesting question, I've never really thought about it...</i>",
          "Luyện: ghi âm mỗi ngày, nghe lại tìm lỗi phát âm âm cuối (-s, -ed), trọng âm, ngữ điệu; shadowing đoạn ngắn của người bản xứ.",
        ],
        exercises: [
          { q: "Part 1: <i>Do you prefer studying in the morning or in the evening?</i> Trả lời theo mẫu 'trả lời + lý do + ví dụ'.", a: "Mẫu: <i>Definitely in the morning. My mind is much clearer after a good night's sleep, so I usually tackle the hardest subjects, like graph theory, before 9 am.</i>" },
          { q: "Part 2 cue card: <i>Describe a skill you learned that you think is useful. You should say: what the skill is, when and how you learned it, how often you use it, and explain why it is useful.</i> Chuẩn bị 1 phút, nói 2 phút, ghi âm.", a: "Gợi ý từ khóa: coding / first year / YouTube + projects / every day / saves time, career. Nghe lại: có ngắt quãng dài không, có dùng thì quá khứ đúng khi kể không." },
          { q: "Part 3: <i>Do you think schools should teach more practical skills?</i> Trả lời 4–5 câu có hai mặt.", a: "Mẫu ý: đồng ý một phần; kỹ năng thực tế (quản lý tiền, nấu ăn) giúp học sinh tự lập; nhưng nền tảng học thuật vẫn cần; giải pháp: tích hợp vào dự án." },
        ],
        resources: [
          { name: "IELTS Simon: Speaking", url: "https://ielts-simon.com/" },
          { name: "BBC Learning English: Pronunciation", url: "https://www.bbc.co.uk/learningenglish/" },
          { name: "YouGlish", url: "https://youglish.com/" },
        ],
      },
      {
        id: "i-foundation", subject: "ielts", skills: ["Grammar", "Vocab"], title: "Nền tảng: ngữ pháp và từ vựng",
        theory: [
          "Ngữ pháp trọng tâm giai đoạn 1: hiện tại đơn/tiếp diễn/hoàn thành, quá khứ đơn/tiếp diễn, tương lai; bị động; mệnh đề quan hệ; câu điều kiện loại 0–3; so sánh; mạo từ a/an/the; danh từ đếm được/không đếm được; sự hòa hợp chủ–vị.",
          "Từ vựng: học theo cụm (collocation) và chủ đề (education, environment, technology, health, work, cities). Mỗi từ ghi: nghĩa, phát âm, 1 câu ví dụ tự đặt.",
          "Anki 20 phút/ngày; ôn thẻ cũ trước khi thêm thẻ mới. Giai đoạn 2 thêm Academic Word List.",
          "Đo tiến bộ: tự viết lại 1 đoạn sau 2 tuần, đếm lỗi ngữ pháp trên 100 từ.",
        ],
        exercises: [
          { q: "Sửa lỗi: <i>She have lived here since three years.</i>", a: "<i>She has lived here for three years.</i> (has với ngôi 3 số ít; for + khoảng thời gian, since + mốc)." },
          { q: "Sửa lỗi: <i>The informations about the courses is useful.</i>", a: "<i>The information about the courses is useful.</i> (information không đếm được)." },
          { q: "Sửa lỗi: <i>If I would have more time, I will learn Chinese.</i>", a: "<i>If I had more time, I would learn Chinese.</i> (điều kiện loại 2)." },
          { q: "Chọn collocation đúng: make/do a mistake; make/do homework; take/make a decision; heavy/strong rain.", a: "make a mistake; do homework; make a decision (take a decision cũng dùng trong Anh-Anh); heavy rain." },
          { q: "Đổi sang bị động: <i>The government built a new bridge last year.</i>", a: "<i>A new bridge was built (by the government) last year.</i>" },
        ],
        resources: [
          { name: "LearnEnglish: Grammar", url: "https://learnenglish.britishcouncil.org/" },
          { name: "Ozdic collocations", url: "https://ozdic.com/" },
          { name: "Cambridge Dictionary", url: "https://dictionary.cambridge.org/" },
          { name: "Anki", url: "https://apps.ankiweb.net/" },
        ],
      },

      // ====================== HSK ======================
      {
        id: "h-pinyin", subject: "hsk", title: "Pinyin, thanh điệu và biến điệu",
        theory: [
          "4 thanh: thanh 1 (ā, cao bằng), thanh 2 (á, lên), thanh 3 (ǎ, xuống rồi lên), thanh 4 (à, xuống mạnh); thanh nhẹ không dấu (吗 ma).",
          "Đánh dấu thanh: ưu tiên <b>a</b>, rồi <b>o</b>, <b>e</b>; với iu, ui đặt trên chữ đứng sau (liù, guì).",
          "<b>Biến điệu thanh 3</b>: hai thanh 3 liền nhau thì thanh đầu đọc thành thanh 2: 你好 nǐ hǎo → ní hǎo. Thanh 3 đứng trước thanh khác thường chỉ đọc nửa (xuống thấp, không lên).",
          "<b>不 bù</b>: đứng trước thanh 4 đọc bú (不是 bú shì, 不要 bú yào).",
          "<b>一 yī</b>: trước thanh 4 đọc yí (一个 yí gè); trước thanh 1, 2, 3 đọc yì (一天 yì tiān, 一年 yì nián); đứng riêng, đếm số, số thứ tự đọc yī (第一 dì yī).",
          "ü sau j, q, x, y viết thành u (ju, qu, xu, yu) nhưng vẫn đọc ü; sau n, l giữ ü (nǚ, lǜ).",
        ],
        exercises: [
          { q: "Đọc đúng thanh: 你好, 很好, 不是, 不对, 不好, 一个, 一天, 一起.", a: "ní hǎo · hén hǎo · bú shì · bú duì · bù hǎo · yí gè · yì tiān · yì qǐ." },
          { q: "Đặt dấu thanh cho: liu4 (sáu), gui4 (đắt), hao3 (tốt), xue2 (học).", a: "liù · guì · hǎo · xué." },
          { q: "Phân biệt: mā, má, mǎ, mà, ma tương ứng chữ nào?", a: "妈 (mẹ) · 麻 (gai/tê) · 马 (ngựa) · 骂 (mắng) · 吗 (trợ từ nghi vấn)." },
          { q: "Bài luyện: ghi âm 20 từ HSK 1 có biến điệu, so với âm thanh trong Pleco/Anki.", a: "Tập trung vào cặp thanh 2–3 và 3–3, đây là cặp người Việt hay nhầm." },
        ],
        resources: [
          { name: "Pleco", url: "https://www.pleco.com/" },
          { name: "Chinese Grammar Wiki: Tone change rules", url: "https://resources.allsetlearning.com/chinese/grammar/" },
        ],
      },
      {
        id: "h-hanzi", subject: "hsk", title: "Chữ Hán, thứ tự nét và bộ thủ",
        theory: [
          "Quy tắc thứ tự nét: ngang trước sổ sau (十); phẩy trước mác sau (人); trên trước dưới sau (三); trái trước phải sau (明); ngoài trước trong sau (月); vào nhà trước đóng cửa sau (国); giữa trước hai bên sau (小).",
          "Phần lớn chữ là <b>hình thanh</b>: bộ chỉ nghĩa + phần chỉ âm. Ví dụ 妈 = 女 (nữ, nghĩa) + 马 mǎ (âm); 河 = 氵 (nước) + 可 kě.",
          "Bộ thủ hay gặp: 亻 người · 女 nữ · 口 miệng · 氵 nước · 扌 tay · 木 cây · 日 mặt trời/ngày · 月 trăng/thịt · 讠 lời nói · 忄/心 tâm · 艹 cỏ · 辶 đi lại · 钅 kim loại · 饣 ăn · 纟 tơ · 宀 mái nhà.",
          "Mỗi ngày viết tay 5–10 chữ mới đúng thứ tự nét; ghi bộ thủ vào thẻ Anki giúp nhớ lâu hơn.",
        ],
        exercises: [
          { q: "Xác định bộ thủ và gợi nghĩa: 他, 河, 说, 吃, 想, 打, 饭.", a: "他 亻(người) · 河 氵(nước) · 说 讠(lời nói) · 吃 口(miệng) · 想 心(suy nghĩ) · 打 扌(tay) · 饭 饣(ăn)." },
          { q: "Chữ 国 viết nét nào cuối cùng?", a: "Nét ngang đóng khung dưới cùng (vào nhà trước, đóng cửa sau)." },
          { q: "Đoán nghĩa nhóm chữ có bộ 木: 林, 森, 桌, 树.", a: "Đều liên quan tới cây/gỗ: 林 rừng nhỏ, 森 rừng rậm, 桌 cái bàn, 树 cây." },
        ],
        resources: [
          { name: "Hanzi Writer", url: "https://hanziwriter.org/" },
          { name: "HanziCraft", url: "https://hanzicraft.com/" },
          { name: "MDBG", url: "https://www.mdbg.net/chinese/dictionary" },
        ],
      },
      {
        id: "h-grammar12", subject: "hsk", phases: [1], title: "Ngữ pháp HSK 1–2",
        theory: [
          "Trật tự cơ bản: <b>Chủ ngữ + Thời gian + Nơi chốn + Động từ + Tân ngữ</b>. 我明天在家学习。(Mai tôi học ở nhà.) Trạng ngữ thời gian đứng trước động từ, không đứng cuối như tiếng Việt.",
          "Câu hỏi: thêm 吗 cuối câu; 呢 hỏi ngược (你呢?); đại từ nghi vấn đặt đúng vị trí thành phần được hỏi: 什么 shénme, 谁 shéi, 哪儿 nǎr, 几 jǐ (&lt; 10), 多少 duōshao; câu chính phản 你是不是学生?",
          "Lượng từ bắt buộc giữa số và danh từ: 一个人, 两本书, 三杯茶. 'Hai' trước lượng từ dùng 两 liǎng, không dùng 二.",
          "的 sở hữu/định ngữ (我的书); 是…的 nhấn mạnh thời gian, nơi chốn, cách thức của việc đã xảy ra (我是坐飞机来的).",
          "了: sau động từ = hoàn thành (我买了一本书); cuối câu = thay đổi trạng thái (下雨了). 过 = từng trải qua (我去过北京). 在/正在 = đang (他在看书).",
          "So sánh: A 比 B + tính từ (+ mức độ): 他比我高 / 他比我高一点儿. Không dùng 很 trong câu 比. Phủ định: A 没有 B (那么) + tính từ.",
          "Một số cấu trúc: 要…了 (sắp), 因为…所以… (vì…nên), 已经…了 (đã… rồi).",
        ],
        exercises: [
          { q: "Sửa câu sai: 我去了北京去年。", a: "我去年去了北京。(thời gian đứng trước động từ)." },
          { q: "Điền từ: 他___我高。我___他那么高。", a: "比 · 没有." },
          { q: "Sửa câu sai: 他比我很高。", a: "他比我高。hoặc 他比我高得多 / 高一点儿。(không dùng 很 trong câu 比)." },
          { q: "Dịch: Tôi đã từng học tiếng Trung hai năm.", a: "我学过两年汉语。(两 trước lượng từ/danh từ chỉ thời gian; 过 chỉ trải nghiệm)." },
          { q: "Hỏi vào phần gạch chân: 我<u>明天</u>去上海。", a: "你什么时候去上海?" },
          { q: "Nhấn mạnh cách đi: 'Tôi đi tàu hỏa đến.'", a: "我是坐火车来的。" },
        ],
        resources: [
          { name: "Chinese Grammar Wiki: A1/A2", url: "https://resources.allsetlearning.com/chinese/grammar/" },
          { name: "Du Chinese", url: "https://www.duchinese.net/" },
        ],
      },
      {
        id: "h-grammar3", subject: "hsk", phases: [2], title: "Ngữ pháp HSK 3",
        theory: [
          "<b>Câu 把</b>: Chủ ngữ + 把 + Tân ngữ (xác định) + Động từ + thành phần khác (了, bổ ngữ, 在/到…). 我把作业做完了。Động từ không được đứng trơ trọi.",
          "<b>Câu 被</b> (bị động): Đối tượng + 被 (+ người làm) + Động từ + thành phần khác. 我的手机被弟弟弄坏了。",
          "<b>Bổ ngữ kết quả</b>: 看完, 听懂, 写错, 找到, 洗干净. Phủ định bằng 没: 我没听懂。",
          "<b>Bổ ngữ xu hướng</b>: 来/去 chỉ hướng so với người nói: 进来, 出去, 拿出来, 走上去.",
          "<b>Bổ ngữ khả năng</b>: 看得懂 / 看不懂, 听得见 / 听不见, 来得及 / 来不及.",
          "<b>Bổ ngữ trình độ</b>: Động từ + 得 + đánh giá: 他说得很好。Có tân ngữ thì lặp động từ: 他说汉语说得很好。",
          "Phân biệt <b>的</b> (trước danh từ), <b>地</b> (trước động từ: 慢慢地走), <b>得</b> (sau động từ/tính từ: 跑得快). Các cặp liên từ: 虽然…但是, 如果…就, 一边…一边, 越来越, 除了…以外, 只要…就.",
        ],
        exercises: [
          { q: "Viết lại bằng 把: 我吃完了苹果。", a: "我把苹果吃完了。" },
          { q: "Viết lại bằng 被: 小王借走了我的自行车。", a: "我的自行车被小王借走了。" },
          { q: "Điền 的/地/得: 他高兴___说: 'Tôi chạy ___ rất nhanh.' 这是我___书。", a: "地 · 得 · 的 (他高兴地说; 我跑得很快; 这是我的书)." },
          { q: "Dịch: Bài này khó quá, tôi đọc không hiểu.", a: "这篇文章太难了, 我看不懂。" },
          { q: "Sửa câu sai: 我把这本书看。", a: "我把这本书看完了。(động từ trong câu 把 cần thành phần khác đi kèm)." },
          { q: "Dùng 越来越 nói 'Tiếng Trung của bạn ấy ngày càng tốt'.", a: "她的汉语越来越好了。" },
        ],
        resources: [
          { name: "Chinese Grammar Wiki: B1", url: "https://resources.allsetlearning.com/chinese/grammar/" },
        ],
      },
      {
        id: "h-exam", subject: "hsk", phases: [3, 4], title: "Cấu trúc đề HSK 3, HSK 4 và cách luyện đề",
        theory: [
          "<b>HSK 3</b> (chuẩn 2.0): Nghe 40 câu (~35 phút), Đọc 30 câu (30 phút), Viết 10 câu (15 phút). 300 điểm, đạt từ 180.",
          "<b>HSK 4</b>: Nghe 45 câu (~30 phút), Đọc 40 câu (40 phút), Viết 15 câu (25 phút: sắp xếp từ thành câu, đặt câu theo tranh với từ cho trước). 300 điểm, đạt từ 180. Tổng khoảng 105 phút.",
          "<b>HSKK</b> (nói) thi riêng: sơ cấp, trung cấp, cao cấp. HSK 4 thường đi kèm HSKK trung cấp.",
          "<b>HSK 3.0</b> (9 cấp) có lượng từ lớn hơn nhiều (ví dụ cấp 4 khoảng 3.200 từ tích lũy). Kiểm tra trung tâm thi của bạn dùng chuẩn nào trước khi đặt mục tiêu số từ trong Cài đặt.",
          "Luyện đề: làm đề bấm giờ, chữa nghe bằng transcript, ghi từ mới vào Anki, đọc to đoạn văn trong phần Đọc; phần Viết luyện sắp xếp câu theo trật tự Chủ – Thời gian – Nơi chốn – Động từ – Tân ngữ.",
        ],
        exercises: [
          { q: "Sắp xếp thành câu (dạng Viết HSK 4): 把 / 我 / 了 / 放在桌子上 / 钥匙", a: "我把钥匙放在桌子上了。" },
          { q: "Sắp xếp: 比 / 今天 / 冷 / 昨天 / 一点儿", a: "今天比昨天冷一点儿。" },
          { q: "HSK 4 được 62 điểm Nghe, 70 Đọc, 55 Viết. Đạt không?", a: "Tổng 187 ≥ 180 ⇒ đạt (HSK không yêu cầu điểm tối thiểu từng phần)." },
          { q: "Bài luyện: tải một đề mẫu chính thức HSK 3 hoặc 4, làm bấm giờ, ghi điểm từng phần vào nhật ký.", a: "Nếu phần Nghe thấp nhất, tăng thời lượng shadowing trong buổi HSK hằng ngày." },
        ],
        resources: [
          { name: "Chinese Testing International (đề mẫu)", url: "https://www.chinesetest.cn/" },
          { name: "Anki: bộ thẻ HSK", url: "https://apps.ankiweb.net/" },
        ],
      },
    ],
  };

  if (typeof module !== "undefined" && module.exports) module.exports = LIBRARY;
  else root.LIBRARY = LIBRARY;
})(this);
