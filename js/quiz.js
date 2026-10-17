// Câu hỏi luyện tập chấm tự động cho Đồ thị và OOP. Mỗi câu gắn với một chủ đề trong js/library.js (trường topic).
(function (root) {
  const QUIZ = [
    // ===================== ĐỒ THỊ =====================

    // ----- g-basic -----
    {
      id: "q-g-basic-1", topic: "g-basic", type: "number",
      q: "Một đơn đồ thị vô hướng có 12 đỉnh, mỗi đỉnh đều có bậc 4. Đồ thị có bao nhiêu cạnh?",
      answer: 24,
      explain: "Định lý bắt tay: Σdeg = 12·4 = 48 = 2|E| ⇒ |E| = 24.",
    },
    {
      id: "q-g-basic-2", topic: "g-basic", type: "number",
      q: "Giả đồ thị vô hướng có các cạnh 1-2, 1-3, 2-3 và một khuyên tại đỉnh 1. deg(1) bằng bao nhiêu?",
      answer: 4,
      explain: "Hai cạnh 1-2, 1-3 góp 2, khuyên được tính 2 ⇒ deg(1) = 4.",
    },
    {
      id: "q-g-basic-3", topic: "g-basic", type: "mcq",
      q: "Dãy nào dưới đây là dãy bậc của một <b>đơn đồ thị</b> vô hướng?",
      choices: ["3, 3, 3, 1", "2, 2, 2, 2", "3, 3, 3, 3, 3", "4, 4, 3, 2, 1", "5, 1, 1, 1, 1"],
      answer: 1,
      explain: "2, 2, 2, 2 là C<sub>4</sub>. 3, 3, 3, 3, 3 có tổng lẻ; 5, 1, 1, 1, 1 có đỉnh bậc 5 trong khi chỉ có 4 đỉnh khác; ở 3, 3, 3, 1 ba đỉnh bậc 3 phải kề mọi đỉnh khác nên đỉnh cuối có bậc 3 chứ không phải 1; 4, 4, 3, 2, 1 bị Havel-Hakimi loại.",
    },
    {
      id: "q-g-basic-4", topic: "g-basic", type: "number",
      q: "Đơn đồ thị G có 8 đỉnh và 10 cạnh. Đồ thị bù Ḡ có bao nhiêu cạnh?",
      answer: 18,
      explain: "|E(G)| + |E(Ḡ)| = 8·7/2 = 28 ⇒ |E(Ḡ)| = 28 − 10 = 18.",
    },

    // ----- g-repr -----
    {
      id: "q-g-repr-1", topic: "g-repr", type: "number",
      q: "Đồ thị vô hướng V = {1, 2, 3, 4}, E = {12, 13, 23, 24, 34}. Tổng tất cả các phần tử của ma trận kề bằng bao nhiêu?",
      answer: 10,
      explain: "Tổng hàng i là deg(i), nên tổng cả ma trận = Σdeg = 2|E| = 10.",
    },
    {
      id: "q-g-repr-2", topic: "g-repr", type: "number",
      q: "Đồ thị vô hướng V = {1, 2, 3, 4}, E = {12, 13, 23, 24, 34}, A là ma trận kề. Tính (A²)<sub>14</sub>, tức số đường đi độ dài 2 từ 1 đến 4.",
      answer: 2,
      explain: "(A²)<sub>14</sub> = Σ a<sub>1k</sub>a<sub>k4</sub> = a<sub>12</sub>a<sub>24</sub> + a<sub>13</sub>a<sub>34</sub> = 2: hai đường 1 → 2 → 4 và 1 → 3 → 4.",
    },
    {
      id: "q-g-repr-3", topic: "g-repr", type: "number",
      q: "Đồ thị vô hướng V = {1, 2, 3, 4}, E = {12, 13, 23, 24, 34}, A là ma trận kề. Tính (A²)<sub>22</sub>.",
      answer: 3,
      explain: "Với đơn đồ thị, (A²)<sub>ii</sub> = Σ a<sub>ik</sub>² = deg(i). Đỉnh 2 kề 1, 3, 4 nên (A²)<sub>22</sub> = 3.",
    },
    {
      id: "q-g-repr-4", topic: "g-repr", type: "mcq",
      q: "Đồ thị có 100.000 đỉnh và 200.000 cạnh, cần chạy BFS nhiều lần. Cách lưu nào phù hợp nhất?",
      choices: ["Ma trận kề", "Danh sách kề", "Ma trận liên thuộc", "Lưu cả ba để tra cho nhanh"],
      answer: 1,
      explain: "Đồ thị thưa: danh sách kề tốn O(n + m) bộ nhớ và BFS chạy O(n + m); ma trận kề cần 10<sup>10</sup> ô.",
    },

    // ----- g-connect -----
    {
      id: "q-g-connect-1", topic: "g-connect", type: "number",
      q: "Số cạnh nhỏ nhất k để <b>mọi</b> đơn đồ thị 8 đỉnh có k cạnh đều liên thông là bao nhiêu?",
      answer: 22,
      explain: "Đơn đồ thị n đỉnh có nhiều hơn (n−1)(n−2)/2 = 21 cạnh thì liên thông; K<sub>7</sub> cộng một đỉnh cô lập có đúng 21 cạnh mà không liên thông ⇒ k = 22.",
    },
    {
      id: "q-g-connect-2", topic: "g-connect", type: "number",
      q: "Đơn đồ thị 7 đỉnh có đúng 2 thành phần liên thông thì có tối đa bao nhiêu cạnh?",
      answer: 15,
      explain: "Tối đa (n−k)(n−k+1)/2 = 5·6/2 = 15, đạt khi gồm K<sub>6</sub> và một đỉnh cô lập.",
    },
    {
      id: "q-g-connect-3", topic: "g-connect", type: "text",
      q: "Đồ thị vô hướng có các cạnh 1-2, 2-3, 3-1, 3-4, 4-5, 5-6, 6-4, 6-7. Liệt kê tất cả các đỉnh khớp theo thứ tự tăng dần, ngăn cách bằng dấu phẩy.",
      answer: ["3,4,6"],
      explain: "Xóa 3 tách {1, 2} khỏi phần còn lại; xóa 4 tách {1, 2, 3} và {5, 6, 7}; xóa 6 tách đỉnh 7. Các đỉnh khác nằm trên tam giác hoặc là lá nên không phải khớp.",
    },
    {
      id: "q-g-connect-4", topic: "g-connect", type: "number",
      q: "Đồ thị vô hướng có các cạnh 1-2, 2-3, 3-1, 3-4, 4-5, 5-6, 6-4, 6-7. Đồ thị có bao nhiêu cầu?",
      answer: 2,
      explain: "Cầu là cạnh không nằm trên chu trình nào: 3-4 và 6-7. Các cạnh còn lại thuộc tam giác 1-2-3 hoặc 4-5-6.",
    },
    {
      id: "q-g-connect-5", topic: "g-connect", type: "mcq",
      q: "Đồ thị có hướng có các cung 1→2, 2→3, 3→1, 3→4. Phát biểu nào đúng?",
      choices: ["Liên thông mạnh", "Liên thông yếu nhưng không liên thông mạnh", "Không liên thông yếu", "Có 1 thành phần liên thông mạnh"],
      answer: 1,
      explain: "Bỏ hướng thì liên thông, nhưng từ 4 không đi được đến đỉnh nào ⇒ không liên thông mạnh. Các thành phần liên thông mạnh là {1, 2, 3} và {4}.",
    },

    // ----- g-bfs -----
    {
      id: "q-g-bfs-1", topic: "g-bfs", type: "text",
      q: "Đồ thị vô hướng có các cạnh 1-2, 1-5, 2-3, 2-6, 5-6, 3-4, 3-7, 6-7, 7-8, 4-8. Chạy BFS từ đỉnh 1, xét đỉnh kề theo thứ tự tăng. Ghi thứ tự thăm (ví dụ 1,2,3,...).",
      answer: ["1,2,5,3,6,4,7,8"],
      explain: "Lấy 1: thêm 2, 5. Lấy 2: thêm 3, 6. Lấy 5: 6 đã có. Lấy 3: thêm 4, 7. Lấy 6: không thêm. Lấy 4: thêm 8.",
    },
    {
      id: "q-g-bfs-2", topic: "g-bfs", type: "number",
      q: "Đồ thị vô hướng có các cạnh 1-2, 1-5, 2-3, 2-6, 5-6, 3-4, 3-7, 6-7, 7-8, 4-8. Chạy BFS từ đỉnh 1. Khoảng cách d[8] (số cạnh) bằng bao nhiêu?",
      answer: 4,
      explain: "Các tầng: {1}, {2, 5}, {3, 6}, {4, 7}, {8} ⇒ d[8] = 4.",
    },
    {
      id: "q-g-bfs-3", topic: "g-bfs", type: "text",
      q: "Đồ thị vô hướng có các cạnh 1-2, 1-5, 2-3, 2-6, 5-6, 3-4, 3-7, 6-7, 7-8, 4-8. Chạy BFS từ đỉnh 1, xét đỉnh kề theo thứ tự tăng, ghi trước[v] khi v được đưa vào hàng đợi. Truy vết theo trước[] cho đường đi từ 1 đến 8 (ghi các đỉnh từ 1 đến 8).",
      answer: ["1,2,3,4,8"],
      explain: "8 được đưa vào hàng đợi khi lấy 4 ra (4 ra trước 7) ⇒ trước[8] = 4, trước[4] = 3, trước[3] = 2, trước[2] = 1.",
    },
    {
      id: "q-g-bfs-4", topic: "g-bfs", type: "mcq",
      q: "BFS dùng cấu trúc dữ liệu nào để quản lý các đỉnh chờ duyệt?",
      choices: ["Ngăn xếp (stack)", "Hàng đợi (queue)", "Hàng đợi ưu tiên (heap)", "Cây nhị phân tìm kiếm"],
      answer: 1,
      explain: "BFS dùng hàng đợi FIFO nên thăm đỉnh theo từng tầng khoảng cách; DFS mới dùng ngăn xếp (hoặc đệ quy).",
    },

    // ----- g-dfs -----
    {
      id: "q-g-dfs-1", topic: "g-dfs", type: "text",
      q: "Đồ thị vô hướng có các cạnh 1-2, 1-5, 2-3, 2-6, 5-6, 3-4, 3-7, 6-7, 7-8, 4-8. Chạy DFS đệ quy từ đỉnh 1, xét đỉnh kề theo thứ tự tăng. Ghi thứ tự thăm.",
      answer: ["1,2,3,4,8,7,6,5"],
      explain: "1 → 2 → 3 → 4 → 8 → 7 (từ 8) → 6 (từ 7, vì 3 đã thăm) → 5 (từ 6). Sau đó quay lui hết.",
    },
    {
      id: "q-g-dfs-2", topic: "g-dfs", type: "text",
      q: "Đồ thị <b>có hướng</b> có các cung 1→2, 1→3, 2→4, 3→4, 4→1, 3→5, 5→6. Chạy DFS đệ quy từ đỉnh 1, xét đỉnh kề theo thứ tự tăng. Ghi thứ tự thăm.",
      answer: ["1,2,4,3,5,6"],
      explain: "1 → 2 → 4 (4→1 đã thăm), quay về 1 → 3 (3→4 đã thăm) → 5 → 6.",
    },
    {
      id: "q-g-dfs-3", topic: "g-dfs", type: "number",
      q: "Đồ thị có hướng có các cung 1→2, 2→3, 3→1, 2→4, 4→5, 5→6, 6→4, 6→7, 7→8. Đồ thị có bao nhiêu thành phần liên thông mạnh?",
      answer: 4,
      explain: "Các thành phần liên thông mạnh: {1, 2, 3}, {4, 5, 6}, {7}, {8}.",
    },
    {
      id: "q-g-dfs-4", topic: "g-dfs", type: "mcq",
      q: "Khi DFS trên đồ thị có hướng gặp cạnh ngược u→v (v là tổ tiên của u, đang nằm trên ngăn xếp đệ quy), ta kết luận gì?",
      choices: ["Đồ thị có chu trình", "Đồ thị là DAG", "Đồ thị liên thông mạnh", "u là đỉnh khớp"],
      answer: 0,
      explain: "Đường cây v ⇝ u cộng cạnh u→v tạo thành chu trình.",
    },

    // ----- g-euler -----
    {
      id: "q-g-euler-1", topic: "g-euler", type: "text",
      q: "Đồ thị vô hướng có các cạnh 1-2, 2-3, 3-4, 4-1, 1-3. Đồ thị có đường đi Euler nhưng không có chu trình Euler. Đường đi Euler phải bắt đầu và kết thúc ở hai đỉnh nào? Ghi theo thứ tự tăng, ví dụ 2,4.",
      answer: ["1,3", "3,1"],
      explain: "deg(1) = deg(3) = 3, deg(2) = deg(4) = 2. Có đúng 2 đỉnh bậc lẻ nên đường đi Euler nối 1 và 3.",
    },
    {
      id: "q-g-euler-2", topic: "g-euler", type: "multi",
      q: "Những đồ thị nào có chu trình Euler? (chọn tất cả đáp án đúng)",
      choices: ["K<sub>5</sub>", "K<sub>4</sub>", "K<sub>2,4</sub>", "K<sub>3,3</sub>", "C<sub>6</sub>"],
      answer: [0, 2, 4],
      explain: "Cần liên thông và mọi đỉnh bậc chẵn. K<sub>5</sub>: bậc 4; K<sub>2,4</sub>: bậc 4 và 2; C<sub>6</sub>: bậc 2. K<sub>4</sub> và K<sub>3,3</sub> có mọi đỉnh bậc 3.",
    },
    {
      id: "q-g-euler-3", topic: "g-euler", type: "number",
      q: "Với n từ 3 đến 10, có bao nhiêu giá trị n để K<sub>n</sub> có chu trình Euler?",
      answer: 4,
      explain: "Mọi đỉnh của K<sub>n</sub> có bậc n − 1, chẵn khi n lẻ: n = 3, 5, 7, 9.",
    },
    {
      id: "q-g-euler-4", topic: "g-euler", type: "mcq",
      q: "Đồ thị có hướng, liên thông yếu. Điều kiện cần và đủ để có chu trình Euler là gì?",
      choices: [
        "deg⁺(v) = deg⁻(v) với mọi đỉnh v",
        "Mọi đỉnh có deg⁺(v) + deg⁻(v) chẵn",
        "Có đúng 2 đỉnh có deg⁺ ≠ deg⁻",
        "Đồ thị không có chu trình",
      ],
      answer: 0,
      explain: "Mỗi lần đi vào một đỉnh phải đi ra đúng một lần, nên bán bậc ra phải bằng bán bậc vào ở mọi đỉnh. Tổng bậc chẵn là chưa đủ.",
    },

    // ----- g-hamilton -----
    {
      id: "q-g-hamilton-1", topic: "g-hamilton", type: "multi",
      q: "Những đồ thị nào có chu trình Hamilton? (chọn tất cả đáp án đúng) W<sub>5</sub> là bánh xe gồm vành C<sub>5</sub> và một đỉnh tâm nối tất cả.",
      choices: ["K<sub>3,3</sub>", "K<sub>2,3</sub>", "C<sub>7</sub>", "K<sub>1,4</sub> (hình sao)", "W<sub>5</sub>"],
      answer: [0, 2, 4],
      explain: "K<sub>m,n</sub> có chu trình Hamilton ⇔ m = n ≥ 2, nên K<sub>3,3</sub> có, K<sub>2,3</sub> không. C<sub>7</sub> chính là chu trình Hamilton. K<sub>1,4</sub> có đỉnh bậc 1. W<sub>5</sub>: đi 4 đỉnh vành liên tiếp, vào tâm, ra đỉnh vành thứ 5 rồi về.",
    },
    {
      id: "q-g-hamilton-2", topic: "g-hamilton", type: "number",
      q: "K<sub>5</sub> có bao nhiêu chu trình Hamilton khác nhau? (Hai chu trình chỉ khác đỉnh xuất phát hoặc chiều đi được coi là một.)",
      answer: 12,
      explain: "Cố định đỉnh đầu, xếp 4 đỉnh còn lại: 4! = 24 cách, mỗi chu trình được đếm 2 lần (hai chiều) ⇒ 12.",
    },
    {
      id: "q-g-hamilton-3", topic: "g-hamilton", type: "mcq",
      q: "Đơn đồ thị 10 đỉnh, mọi đỉnh có bậc ≥ 5. Kết luận nào đúng?",
      choices: [
        "Chắc chắn có chu trình Hamilton",
        "Chắc chắn không có chu trình Hamilton",
        "Chưa kết luận được",
        "Chỉ chắc có đường đi Hamilton, không chắc có chu trình",
      ],
      answer: 0,
      explain: "Định lý Dirac: n = 10 ≥ 3 và deg(v) ≥ n/2 = 5 với mọi v ⇒ có chu trình Hamilton.",
    },
    {
      id: "q-g-hamilton-4", topic: "g-hamilton", type: "mcq",
      q: "Đồ thị liên thông có n ≥ 3 đỉnh và có một đỉnh bậc 1. Kết luận nào đúng?",
      choices: [
        "Chắc chắn có chu trình Hamilton",
        "Chắc chắn không có chu trình Hamilton",
        "Có chu trình Hamilton nếu thỏa Ore",
        "Có chu trình Hamilton nếu mọi đỉnh khác bậc chẵn",
      ],
      answer: 1,
      explain: "Trên chu trình mỗi đỉnh dùng đúng 2 cạnh; đỉnh bậc 1 không thể nằm trên chu trình nào.",
    },

    // ----- g-tree -----
    {
      id: "q-g-tree-1", topic: "g-tree", type: "number",
      q: "Một cây có 3 đỉnh bậc 4, 2 đỉnh bậc 3, các đỉnh còn lại là lá. Cây có bao nhiêu lá?",
      answer: 10,
      explain: "Gọi L là số lá, n = 5 + L. Σdeg = 12 + 6 + L = 2(n − 1) = 8 + 2L ⇒ L = 10.",
    },
    {
      id: "q-g-tree-2", topic: "g-tree", type: "number",
      q: "Cây tam phân đầy đủ (mỗi đỉnh trong có đúng 3 con) có 10 đỉnh trong. Cây có bao nhiêu lá?",
      answer: 21,
      explain: "l = (m − 1)·i + 1 = 2·10 + 1 = 21 (tổng số đỉnh n = 3·10 + 1 = 31).",
    },
    {
      id: "q-g-tree-3", topic: "g-tree", type: "text",
      q: "Cây nhị phân có gốc 1; con trái của 1 là 2, con phải là 3; 2 có con trái 4 và con phải 5; 3 chỉ có con phải 6; 5 chỉ có con trái 7. Ghi kết quả duyệt <b>giữa</b> (trái-gốc-phải).",
      answer: ["4,2,7,5,1,3,6"],
      explain: "Cây con trái của 1 cho 4, 2, 7, 5; rồi gốc 1; rồi cây con phải cho 3, 6.",
    },
    {
      id: "q-g-tree-4", topic: "g-tree", type: "text",
      q: "Cây nhị phân có gốc 1; con trái của 1 là 2, con phải là 3; 2 có con trái 4 và con phải 5; 3 chỉ có con phải 6; 5 chỉ có con trái 7. Ghi kết quả duyệt <b>sau</b> (trái-phải-gốc).",
      answer: ["4,7,5,2,6,3,1"],
      explain: "Cây con của 2 cho 4, 7, 5, 2; cây con của 3 cho 6, 3; cuối cùng là gốc 1.",
    },
    {
      id: "q-g-tree-5", topic: "g-tree", type: "number",
      q: "K<sub>5</sub> có bao nhiêu cây khung?",
      answer: 125,
      explain: "Công thức Cayley: n<sup>n−2</sup> = 5³ = 125.",
    },

    // ----- g-mst -----
    {
      id: "q-g-mst-1", topic: "g-mst", type: "number",
      q: "Đồ thị vô hướng có trọng số: 1-2 (4), 1-3 (2), 2-3 (5), 2-4 (10), 2-6 (6), 3-4 (9), 3-5 (3), 4-5 (7), 4-6 (1), 5-6 (8). Tổng trọng số cây khung nhỏ nhất là bao nhiêu?",
      answer: 16,
      explain: "Kruskal: chọn 4-6 (1), 1-3 (2), 3-5 (3), 1-2 (4); loại 2-3 (5) vì tạo chu trình 1-2-3; chọn 2-6 (6). Tổng 1 + 2 + 3 + 4 + 6 = 16.",
    },
    {
      id: "q-g-mst-2", topic: "g-mst", type: "number",
      q: "Đồ thị vô hướng có trọng số: 1-2 (4), 1-3 (2), 2-3 (5), 2-4 (10), 2-6 (6), 3-4 (9), 3-5 (3), 4-5 (7), 4-6 (1), 5-6 (8). Chạy Kruskal. Cạnh <b>cuối cùng</b> được chọn vào cây có trọng số bao nhiêu?",
      answer: 6,
      explain: "Sau 4 cạnh 1, 2, 3, 4 có hai cụm {1, 2, 3, 5} và {4, 6}; cạnh 5 (2-3) bị loại; cạnh 2-6 (6) nối hai cụm và là cạnh thứ n − 1 = 5.",
    },
    {
      id: "q-g-mst-3", topic: "g-mst", type: "text",
      q: "Đồ thị vô hướng có trọng số: 1-2 (4), 1-3 (2), 2-3 (5), 2-4 (10), 2-6 (6), 3-4 (9), 3-5 (3), 4-5 (7), 4-6 (1), 5-6 (8). Chạy Prim từ đỉnh 1 (nếu bằng nhau chọn đỉnh nhỏ hơn). Ghi thứ tự các đỉnh được đưa vào cây, bắt đầu từ 1.",
      answer: ["1,3,5,2,6,4"],
      explain: "Cạnh nhẹ nhất ra khỏi cây lần lượt: 1-3 (2), 3-5 (3), 1-2 (4), 2-6 (6), 6-4 (1).",
    },
    {
      id: "q-g-mst-4", topic: "g-mst", type: "mcq",
      q: "Trên một chu trình của đồ thị liên thông có trọng số, cạnh e có trọng số lớn nhất và lớn hơn hẳn mọi cạnh khác trên chu trình đó. Phát biểu nào đúng?",
      choices: [
        "e thuộc mọi cây khung nhỏ nhất",
        "e không thuộc cây khung nhỏ nhất nào",
        "e thuộc cây khung nhỏ nhất nếu chạy Prim",
        "Không kết luận được",
      ],
      answer: 1,
      explain: "Tính chất chu trình: nếu e nằm trong một cây khung, thay e bằng một cạnh khác của chu trình nối lại hai phần sẽ được cây nhẹ hơn.",
    },

    // ----- g-dijkstra -----
    {
      id: "q-g-dijkstra-1", topic: "g-dijkstra", type: "text",
      q: "Đồ thị vô hướng có trọng số: 1-2 (7), 1-3 (9), 1-6 (14), 2-3 (10), 2-4 (15), 3-4 (11), 3-6 (2), 4-5 (6), 5-6 (9). Chạy Dijkstra từ đỉnh 1 (nếu nhiều đỉnh cùng d nhỏ nhất thì chọn đỉnh nhỏ hơn). Ghi thứ tự các đỉnh được cố định.",
      answer: ["1,2,3,6,4,5"],
      explain: "Cố định 1 (0), 2 (7), 3 (9), 6 (11, qua 3); lúc này d[4] = 20 (qua 3) và d[5] = 20 (qua 6) bằng nhau nên chọn 4 rồi 5.",
    },
    {
      id: "q-g-dijkstra-2", topic: "g-dijkstra", type: "number",
      q: "Đồ thị vô hướng có trọng số: 1-2 (7), 1-3 (9), 1-6 (14), 2-3 (10), 2-4 (15), 3-4 (11), 3-6 (2), 4-5 (6), 5-6 (9). Độ dài đường đi ngắn nhất từ 1 đến 5 là bao nhiêu?",
      answer: 20,
      explain: "d[6] = 9 + 2 = 11 (tốt hơn cạnh 1-6 = 14), d[5] = 11 + 9 = 20; đường qua 4 dài 20 + 6 = 26.",
    },
    {
      id: "q-g-dijkstra-3", topic: "g-dijkstra", type: "text",
      q: "Đồ thị vô hướng có trọng số: 1-2 (7), 1-3 (9), 1-6 (14), 2-3 (10), 2-4 (15), 3-4 (11), 3-6 (2), 4-5 (6), 5-6 (9). Ghi đường đi ngắn nhất từ 1 đến 5 (các đỉnh từ 1 đến 5).",
      answer: ["1,3,6,5"],
      explain: "1 → 3 → 6 → 5 có độ dài 9 + 2 + 9 = 20, là đường duy nhất đạt giá trị nhỏ nhất (1-6-5 = 23, 1-2-4-5 = 28).",
    },
    {
      id: "q-g-dijkstra-4", topic: "g-dijkstra", type: "mcq",
      q: "Độ phức tạp của Dijkstra dùng hàng đợi ưu tiên (heap nhị phân) trên đồ thị n đỉnh, m cạnh là?",
      choices: ["O(n + m)", "O((n + m) log n)", "O(n·m)", "O(n³)"],
      answer: 1,
      explain: "Mỗi đỉnh lấy ra khỏi heap một lần và mỗi cạnh nới lỏng tối đa một lần, mỗi thao tác heap tốn O(log n).",
    },

    // ----- g-bellman -----
    {
      id: "q-g-bellman-1", topic: "g-bellman", type: "number",
      q: "Đồ thị có hướng: 1→2 (6), 1→3 (7), 2→3 (8), 2→4 (5), 2→5 (−4), 3→4 (−3), 3→5 (9), 4→2 (−2), 5→1 (2), 5→4 (7). Chạy Bellman-Ford từ đỉnh 1. d[5] bằng bao nhiêu?",
      answer: -2,
      explain: "d[3] = 7, d[4] = 7 − 3 = 4, d[2] = 4 − 2 = 2, d[5] = 2 − 4 = −2 (đường 1 → 3 → 4 → 2 → 5). Không có chu trình âm.",
    },
    {
      id: "q-g-bellman-2", topic: "g-bellman", type: "number",
      q: "Đồ thị có hướng: 1→2 (6), 1→3 (7), 2→3 (8), 2→4 (5), 2→5 (−4), 3→4 (−3), 3→5 (9), 4→2 (−2), 5→1 (2), 5→4 (7). Chạy Bellman-Ford từ đỉnh 1. d[2] bằng bao nhiêu?",
      answer: 2,
      explain: "Cạnh trực tiếp 1→2 dài 6, nhưng 1 → 3 → 4 → 2 dài 7 − 3 − 2 = 2.",
    },
    {
      id: "q-g-bellman-3", topic: "g-bellman", type: "mcq",
      q: "Đồ thị có hướng: 1→2 (1), 2→3 (−1), 3→4 (−1), 4→2 (1), 1→4 (5). Từ đỉnh 1 có tồn tại đường đi ngắn nhất tới mọi đỉnh không?",
      choices: [
        "Có, vì chỉ có 2 cạnh âm",
        "Không, vì có chu trình âm 2 → 3 → 4 → 2 đến được từ 1",
        "Có, Bellman-Ford dừng sau n − 1 vòng",
        "Không, vì Dijkstra không chạy được",
      ],
      answer: 1,
      explain: "Chu trình 2 → 3 → 4 → 2 có tổng −1 − 1 + 1 = −1 &lt; 0 và đến được từ 1, nên vòng thứ n của Bellman-Ford vẫn nới lỏng được.",
    },
    {
      id: "q-g-bellman-4", topic: "g-bellman", type: "number",
      q: "Đồ thị có hướng 6 đỉnh, 10 cạnh. Bellman-Ford (không dừng sớm, chưa tính vòng kiểm tra chu trình âm) thực hiện bao nhiêu lần nới lỏng cạnh?",
      answer: 50,
      explain: "n − 1 = 5 vòng, mỗi vòng nới lỏng tất cả 10 cạnh ⇒ 50.",
    },

    // ----- g-floyd -----
    {
      id: "q-g-floyd-1", topic: "g-floyd", type: "number",
      q: "Đồ thị có hướng: 1→2 (3), 1→4 (7), 2→1 (8), 2→3 (2), 3→1 (5), 3→4 (1), 4→1 (2). Chạy Floyd-Warshall. d[4][3] cuối cùng bằng bao nhiêu?",
      answer: 7,
      explain: "4 → 1 → 2 → 3 = 2 + 3 + 2 = 7.",
    },
    {
      id: "q-g-floyd-2", topic: "g-floyd", type: "number",
      q: "Đồ thị có hướng: 1→2 (3), 1→4 (7), 2→1 (8), 2→3 (2), 3→1 (5), 3→4 (1), 4→1 (2). Chạy Floyd-Warshall. d[3][2] cuối cùng bằng bao nhiêu?",
      answer: 6,
      explain: "3 → 4 → 1 → 2 = 1 + 2 + 3 = 6, ngắn hơn 3 → 1 → 2 = 8.",
    },
    {
      id: "q-g-floyd-3", topic: "g-floyd", type: "number",
      q: "Đồ thị có hướng: 1→2 (3), 1→4 (7), 2→1 (8), 2→3 (2), 3→1 (5), 3→4 (1), 4→1 (2). Chạy Floyd-Warshall với k = 1, 2, 3, 4. Ngay sau bước k = 1 (ma trận D<sup>(1)</sup>), d[3][2] bằng bao nhiêu?",
      answer: 8,
      explain: "D<sup>(1)</sup> chỉ cho phép đỉnh trung gian 1: d[3][2] = d[3][1] + d[1][2] = 5 + 3 = 8. Giá trị 6 chỉ có từ bước k = 4.",
    },
    {
      id: "q-g-floyd-4", topic: "g-floyd", type: "mcq",
      q: "Sau khi chạy Floyd-Warshall, dấu hiệu nào cho biết đồ thị có chu trình âm?",
      choices: ["Có d[i][j] = ∞", "Có d[i][i] &lt; 0", "Có d[i][j] &lt; 0 với i ≠ j", "Ma trận không đối xứng"],
      answer: 1,
      explain: "d[i][i] &lt; 0 nghĩa là có đường khép kín từ i về i với tổng âm. Một cạnh âm (d[i][j] &lt; 0) chưa chắc tạo chu trình âm.",
    },

    // ----- g-topo -----
    {
      id: "q-g-topo-1", topic: "g-topo", type: "text",
      q: "DAG có các cung 5→2, 3→2, 3→6, 1→6, 2→4, 6→4, 6→7, 1→7. Chạy Kahn, mỗi bước chọn đỉnh nhỏ nhất trong các đỉnh có bán bậc vào bằng 0. Ghi thứ tự tô pô thu được.",
      answer: ["1,3,5,2,6,4,7"],
      explain: "Ban đầu {1, 3, 5}. Lấy 1; lấy 3 (6 về 0); còn {5, 6}: lấy 5 (2 về 0); còn {2, 6}: lấy 2; lấy 6 (4, 7 về 0); lấy 4, 7.",
    },
    {
      id: "q-g-topo-2", topic: "g-topo", type: "number",
      q: "DAG có các cung 1→3, 2→3, 3→4, 3→5. Đồ thị có bao nhiêu thứ tự tô pô khác nhau?",
      answer: 4,
      explain: "1 và 2 đứng trước 3 theo thứ tự tùy ý (2 cách), 4 và 5 đứng sau 3 theo thứ tự tùy ý (2 cách) ⇒ 2·2 = 4.",
    },
    {
      id: "q-g-topo-3", topic: "g-topo", type: "number",
      q: "DAG có trọng số: 1→2 (3), 1→3 (2), 2→4 (4), 3→4 (6), 4→5 (1), 2→5 (2). Độ dài đường đi <b>dài nhất</b> từ 1 đến 5 là bao nhiêu?",
      answer: 9,
      explain: "Quy hoạch động theo thứ tự tô pô: L[2] = 3, L[3] = 2, L[4] = max(3 + 4, 2 + 6) = 8, L[5] = max(8 + 1, 3 + 2) = 9 (đường 1 → 3 → 4 → 5).",
    },
    {
      id: "q-g-topo-4", topic: "g-topo", type: "mcq",
      q: "Chạy Kahn trên một đồ thị có hướng 6 đỉnh nhưng chỉ lấy ra được 4 đỉnh thì hàng đợi rỗng. Kết luận gì?",
      choices: ["Đồ thị có chu trình", "Đồ thị có 2 đỉnh cô lập", "Đồ thị không liên thông yếu", "Thuật toán cài sai, Kahn luôn lấy hết đỉnh"],
      answer: 0,
      explain: "Các đỉnh còn lại đều có bán bậc vào > 0 trong đồ thị con còn lại, điều này chỉ xảy ra khi đồ thị con đó có chu trình.",
    },

    // ----- g-flow -----
    {
      id: "q-g-flow-1", topic: "g-flow", type: "number",
      q: "Mạng có nguồn 1, đích 6, các cung (khả năng): 1→2 (10), 1→3 (10), 2→3 (2), 2→4 (4), 2→5 (8), 3→5 (9), 5→4 (6), 4→6 (10), 5→6 (10). Giá trị luồng cực đại là bao nhiêu?",
      answer: 19,
      explain: "Ví dụ: 1-2-4-6 (4), 1-2-5-6 (6), 1-3-5-6 (4), 1-3-5-4-6 (5): tổng 19. Lát cắt S = {1, 3} có khả năng 1→2 (10) + 3→5 (9) = 19 bằng giá trị luồng ⇒ luồng cực đại.",
    },
    {
      id: "q-g-flow-2", topic: "g-flow", type: "number",
      q: "Mạng có nguồn 1, đích 5, các cung (khả năng): 1→2 (4), 1→3 (3), 2→3 (2), 2→4 (3), 3→4 (1), 3→5 (4), 4→5 (5). Giá trị luồng cực đại là bao nhiêu?",
      answer: 7,
      explain: "1-2-4-5 (3), 1-2-3-5 (1), 1-3-5 (3): tổng 7, bằng khả năng lát cắt ({1}, còn lại) = 4 + 3.",
    },
    {
      id: "q-g-flow-3", topic: "g-flow", type: "number",
      q: "Mạng có nguồn 1, đích 6, các cung (khả năng): 1→2 (10), 1→3 (10), 2→3 (2), 2→4 (4), 2→5 (8), 3→5 (9), 5→4 (6), 4→6 (10), 5→6 (10). Khả năng của lát cắt S = {1, 2}, T = {3, 4, 5, 6} là bao nhiêu?",
      answer: 24,
      explain: "Chỉ cộng các cung đi từ S sang T: 1→3 (10) + 2→3 (2) + 2→4 (4) + 2→5 (8) = 24.",
    },
    {
      id: "q-g-flow-4", topic: "g-flow", type: "mcq",
      q: "Edmonds-Karp khác Ford-Fulkerson tổng quát ở điểm nào?",
      choices: [
        "Chọn đường tăng có ít cạnh nhất bằng BFS",
        "Chọn đường tăng có khả năng lớn nhất bằng Dijkstra",
        "Không dùng cạnh ngược trong đồ thị thặng dư",
        "Chỉ chạy được trên DAG",
      ],
      answer: 0,
      explain: "Edmonds-Karp là Ford-Fulkerson với đường tăng tìm bằng BFS (ngắn nhất theo số cạnh), đảm bảo O(n·m²).",
    },

    // ----- g-bip-color -----
    {
      id: "q-g-bip-color-1", topic: "g-bip-color", type: "number",
      q: "Tính sắc số χ(W<sub>5</sub>), với W<sub>5</sub> là bánh xe gồm vành C<sub>5</sub> và một đỉnh tâm nối với cả 5 đỉnh vành.",
      answer: 4,
      explain: "Vành C<sub>5</sub> là chu trình lẻ nên cần 3 màu; tâm kề mọi đỉnh vành nên cần màu thứ 4.",
    },
    {
      id: "q-g-bip-color-2", topic: "g-bip-color", type: "number",
      q: "Đồ thị vô hướng gồm chu trình 1-2-3-4-5-6-1 và thêm hai cạnh 1-4, 2-5. Sắc số của đồ thị là bao nhiêu?",
      answer: 2,
      explain: "Tô {1, 3, 5} màu A, {2, 4, 6} màu B: mọi cạnh, kể cả 1-4 và 2-5, đều nối hai màu khác nhau ⇒ hai phía, χ = 2.",
    },
    {
      id: "q-g-bip-color-3", topic: "g-bip-color", type: "number",
      q: "Đồ thị phẳng liên thông có 7 đỉnh và 11 cạnh. Một biểu diễn phẳng của nó có bao nhiêu mặt (tính cả mặt ngoài)?",
      answer: 6,
      explain: "Công thức Euler: f = 2 − v + e = 2 − 7 + 11 = 6.",
    },
    {
      id: "q-g-bip-color-4", topic: "g-bip-color", type: "multi",
      q: "Những đồ thị nào là đồ thị hai phía? (chọn tất cả đáp án đúng)",
      choices: ["C<sub>6</sub>", "C<sub>7</sub>", "K<sub>2,3</sub>", "W<sub>4</sub> (vành C<sub>4</sub> và một đỉnh tâm)", "Một cây bất kỳ có ít nhất 2 đỉnh"],
      answer: [0, 2, 4],
      explain: "Hai phía ⇔ không có chu trình lẻ. C<sub>7</sub> là chu trình lẻ; W<sub>4</sub> có tam giác (tâm và hai đỉnh vành kề nhau). Cây không có chu trình nên luôn hai phía.",
    },
    {
      id: "q-g-bip-color-5", topic: "g-bip-color", type: "number",
      q: "Đồ thị hai phía X = {1, 2, 3, 4}, Y = {5, 6, 7}, các cạnh 1-5, 1-6, 2-5, 3-6, 3-7, 4-7. Ghép cặp cực đại có bao nhiêu cạnh?",
      answer: 3,
      explain: "Ví dụ 2-5, 1-6, 3-7 (hoặc 4-7). Không thể có 4 cạnh vì Y chỉ có 3 đỉnh.",
    },

    // ----- g-review -----
    {
      id: "q-g-review-1", topic: "g-review", type: "mcq",
      q: "Cần đường đi ngắn nhất từ một đỉnh trên đồ thị có hướng có cạnh âm, không có chu trình âm, và đồ thị có chu trình (không phải DAG). Chọn thuật toán nào?",
      choices: ["BFS", "Dijkstra", "Bellman-Ford", "Kruskal"],
      answer: 2,
      explain: "BFS chỉ cho đồ thị không trọng số, Dijkstra sai khi có cạnh âm, Kruskal tìm cây khung. Bellman-Ford xử lý được cạnh âm.",
    },
    {
      id: "q-g-review-2", topic: "g-review", type: "mcq",
      q: "Đồ thị có hướng không chu trình (DAG), trọng số có thể âm. Cách nhanh nhất để tìm đường đi ngắn nhất từ một nguồn?",
      choices: [
        "Quy hoạch động theo thứ tự tô pô, O(n + m)",
        "Dijkstra, O((n + m) log n)",
        "Bellman-Ford, O(n·m)",
        "Floyd-Warshall, O(n³)",
      ],
      answer: 0,
      explain: "Trên DAG, xét đỉnh theo thứ tự tô pô và nới lỏng các cạnh đi ra; mỗi cạnh xét đúng một lần, đúng cả với cạnh âm.",
    },
    {
      id: "q-g-review-3", topic: "g-review", type: "multi",
      q: "Những phát biểu nào đúng? (chọn tất cả đáp án đúng)",
      choices: [
        "Mọi cây có n đỉnh đều có n − 1 cạnh.",
        "Dijkstra luôn đúng trên đồ thị có cạnh âm miễn là không có chu trình âm.",
        "Đồ thị hai phía không có chu trình độ dài lẻ.",
        "Mọi đồ thị có chu trình Hamilton đều có chu trình Euler.",
        "BFS trên đồ thị không trọng số cho đường đi ngắn nhất theo số cạnh.",
      ],
      answer: [0, 2, 4],
      explain: "Dijkstra có thể sai khi có cạnh âm dù không có chu trình âm. K<sub>4</sub> có chu trình Hamilton nhưng mọi đỉnh bậc 3 nên không có chu trình Euler.",
    },
    {
      id: "q-g-review-4", topic: "g-review", type: "number",
      q: "Một cây có 20 đỉnh. Tổng bậc của tất cả các đỉnh bằng bao nhiêu?",
      answer: 38,
      explain: "Cây n đỉnh có n − 1 = 19 cạnh, Σdeg = 2·19 = 38.",
    },

    // ===================== OOP =====================

    // ----- o-class -----
    {
      id: "q-o-class-1", topic: "o-class", type: "output", lang: "cpp",
      code: `#include <iostream>
using namespace std;

class Dem {
    int giaTri;
public:
    Dem() { giaTri = 0; }
    void tang() { giaTri++; }
    int lay() const { return giaTri; }
};

int main() {
    Dem a, b;
    a.tang(); a.tang(); b.tang();
    Dem c = a;
    c.tang();
    cout << a.lay() << " " << b.lay() << " " << c.lay() << endl;
}`,
      q: "Chương trình in ra gì?",
      answer: "2 1 3",
      explain: "Mỗi đối tượng có trạng thái riêng. c là bản sao của a lúc a = 2, sau đó c tăng riêng lên 3, a không đổi.",
    },
    {
      id: "q-o-class-2", topic: "o-class", type: "output", lang: "java",
      code: `public class Main {
    static class Diem {
        int x;
        Diem(int x) { this.x = x; }
    }

    public static void main(String[] args) {
        Diem a = new Diem(1);
        Diem b = a;
        b.x = 5;
        Diem c = new Diem(5);
        System.out.println(a.x + " " + (a == b) + " " + (a == c));
    }
}`,
      q: "Chương trình in ra gì?",
      answer: "5 true false",
      explain: "Trong Java biến đối tượng là tham chiếu: b = a làm b trỏ cùng đối tượng với a. == so sánh tham chiếu nên a == c là false dù cùng giá trị x.",
    },
    {
      id: "q-o-class-3", topic: "o-class", type: "mcq",
      q: "Phát biểu nào đúng về lớp và đối tượng?",
      choices: [
        "Lớp là một đối tượng cụ thể đang tồn tại trong bộ nhớ",
        "Từ một lớp có thể tạo nhiều đối tượng, mỗi đối tượng có trạng thái (giá trị thuộc tính) riêng",
        "Mọi đối tượng của cùng một lớp luôn có cùng giá trị thuộc tính",
        "Mỗi lớp chỉ tạo được đúng một đối tượng",
      ],
      answer: 1,
      explain: "Lớp là khuôn mẫu; đối tượng là thể hiện cụ thể, có giá trị thuộc tính riêng.",
    },

    // ----- o-encap -----
    {
      id: "q-o-encap-1", topic: "o-encap", type: "output", lang: "cpp",
      code: `#include <iostream>
using namespace std;

class PhanSo {
    int tu, mau;
public:
    PhanSo(int t, int m) : tu(t), mau(1) { setMau(m); }
    bool setMau(int m) {
        if (m == 0) return false;
        mau = m;
        return true;
    }
    void xuat() const { cout << tu << "/" << mau << endl; }
};

int main() {
    PhanSo p(3, 0);
    p.xuat();
    cout << p.setMau(4) << endl;
    p.xuat();
}`,
      q: "Chương trình in ra gì?",
      answer: "3/1\n1\n3/4",
      explain: "setMau(0) bị từ chối nên mau giữ giá trị khởi tạo 1. setMau(4) hợp lệ, trả về true (cout in bool là 1).",
    },
    {
      id: "q-o-encap-2", topic: "o-encap", type: "mcq",
      q: "Trong C++, thành viên khai báo trong <code>class</code> mà không ghi phạm vi truy cập thì mặc định là gì?",
      choices: ["public", "private", "protected", "package-private"],
      answer: 1,
      explain: "class mặc định private, struct mặc định public. C++ không có mức package-private.",
    },
    {
      id: "q-o-encap-3", topic: "o-encap", type: "multi",
      q: "Java: lớp B nằm <b>cùng package</b> với lớp A nhưng không phải lớp con của A. B truy cập trực tiếp được những thành viên nào của A? (chọn tất cả đáp án đúng)",
      choices: ["public", "protected", "mặc định (không ghi phạm vi)", "private"],
      answer: [0, 1, 2],
      explain: "Trong Java, mức mặc định cho phép cùng package, và protected cũng cho phép cùng package. Chỉ private bị chặn.",
    },

    // ----- o-ctor -----
    {
      id: "q-o-ctor-1", topic: "o-ctor", type: "output", lang: "cpp",
      code: `#include <iostream>
using namespace std;

struct M { M() { cout << "M"; } ~M() { cout << "~M"; } };
struct A { A() { cout << "A"; } ~A() { cout << "~A"; } };
struct B : A {
    M m;
    B() { cout << "B"; }
    ~B() { cout << "~B"; }
};

int main() {
    B b;
    cout << "|";
}`,
      q: "Chương trình in ra gì?",
      answer: "AMB|~B~M~A",
      explain: "Tạo: lớp cha A → thành viên m → thân hàm tạo B. Hủy theo thứ tự ngược lại: ~B → ~M → ~A.",
    },
    {
      id: "q-o-ctor-2", topic: "o-ctor", type: "output", lang: "cpp",
      code: `#include <iostream>
using namespace std;

struct A {
    A() { cout << "D"; }
    A(const A&) { cout << "C"; }
    A& operator=(const A&) { cout << "G"; return *this; }
};

void f(A x) {}
void g(const A& x) {}

int main() {
    A a;
    A b = a;
    f(a);
    g(a);
    b = a;
    cout << endl;
}`,
      q: "Chương trình in ra gì?",
      answer: "DCCG",
      explain: "A a: hàm tạo mặc định (D). A b = a: khởi tạo ⇒ hàm tạo sao chép (C). f(a) truyền tham trị ⇒ sao chép (C). g(a) truyền tham chiếu ⇒ không in gì. b = a: gán ⇒ operator= (G).",
    },
    {
      id: "q-o-ctor-3", topic: "o-ctor", type: "output", lang: "cpp",
      code: `#include <iostream>
using namespace std;

struct T {
    int id;
    T(int i) : id(i) { cout << "+" << id; }
    ~T() { cout << "-" << id; }
};

int main() {
    T a(1);
    {
        T b(2);
    }
    T c(3);
    cout << "|";
}`,
      q: "Chương trình in ra gì?",
      answer: "+1+2-2+3|-3-1",
      explain: "b bị hủy khi ra khỏi khối { } của nó. Cuối main, các đối tượng cục bộ bị hủy theo thứ tự ngược với thứ tự tạo: c rồi a.",
    },
    {
      id: "q-o-ctor-4", topic: "o-ctor", type: "output", lang: "cpp",
      code: `#include <iostream>
using namespace std;

struct P {
    P(int i) { cout << i; }
};

struct X {
    P p1;
    P p2;
    X() : p2(2), p1(1) {}
};

int main() {
    X x;
    cout << endl;
}`,
      q: "Chương trình in ra gì?",
      answer: "12",
      explain: "Thành viên được khởi tạo theo thứ tự <b>khai báo</b> trong lớp (p1 rồi p2), không theo thứ tự viết trong danh sách khởi tạo.",
    },
    {
      id: "q-o-ctor-5", topic: "o-ctor", type: "output", lang: "cpp",
      code: `#include <iostream>
using namespace std;

struct A {
    A() { cout << "A"; }
    ~A() { cout << "~"; }
};

int main() {
    A* p = new A[3];
    cout << "|";
    delete[] p;
    cout << endl;
}`,
      q: "Chương trình in ra gì?",
      answer: "AAA|~~~",
      explain: "new A[3] gọi hàm tạo mặc định cho từng phần tử; delete[] gọi hàm hủy cho cả 3 phần tử rồi giải phóng mảng.",
    },
    {
      id: "q-o-ctor-6", topic: "o-ctor", type: "mcq",
      q: "Lớp PhanSo chỉ khai báo một hàm tạo <code>PhanSo(int t, int m)</code>. Câu lệnh <code>PhanSo p;</code> sẽ thế nào?",
      choices: [
        "Chạy được, tu và mau bằng 0",
        "Lỗi biên dịch vì không còn hàm tạo mặc định",
        "Chạy được, tu và mau nhận giá trị rác",
        "Lỗi khi chạy chương trình",
      ],
      answer: 1,
      explain: "Khi lớp đã có bất kỳ hàm tạo nào do người viết khai báo, trình biên dịch không tự sinh hàm tạo mặc định nữa.",
    },

    // ----- o-static -----
    {
      id: "q-o-static-1", topic: "o-static", type: "output", lang: "cpp",
      code: `#include <iostream>
using namespace std;

class SV {
    static int dem;
public:
    SV() { dem++; }
    SV(const SV&) { dem++; }
    ~SV() { dem--; }
    static int soLuong() { return dem; }
};
int SV::dem = 0;

int main() {
    SV a, b;
    {
        SV c = a;
        cout << SV::soLuong() << " ";
    }
    cout << SV::soLuong() << endl;
}`,
      q: "Chương trình in ra gì?",
      answer: "3 2",
      explain: "dem dùng chung cho mọi đối tượng: a, b, c (hàm tạo sao chép cũng tăng) ⇒ 3. Ra khỏi khối, c bị hủy ⇒ 2.",
    },
    {
      id: "q-o-static-2", topic: "o-static", type: "output", lang: "cpp",
      code: `#include <iostream>
using namespace std;

class So {
    int v;
public:
    So(int x) : v(x) {}
    So& cong(int x) { v += x; return *this; }
    So& nhan(int x) { v *= x; return *this; }
    int lay() const { return v; }
};

int main() {
    So s(2);
    s.cong(3).nhan(4).cong(1);
    cout << s.lay() << endl;
}`,
      q: "Chương trình in ra gì?",
      answer: "21",
      explain: "Mỗi phương thức trả về *this (tham chiếu) nên các lời gọi nối tiếp cùng tác động lên s: (2 + 3)·4 + 1 = 21.",
    },
    {
      id: "q-o-static-3", topic: "o-static", type: "output", lang: "java",
      code: `public class Main {
    static class A {
        static int s = 0;
        int x = 0;
        A() { s++; x++; }
    }

    public static void main(String[] args) {
        A a = new A();
        A b = new A();
        A c = new A();
        System.out.println(A.s + " " + c.x);
    }
}`,
      q: "Chương trình in ra gì?",
      answer: "3 1",
      explain: "s là static, dùng chung nên tăng qua 3 lần tạo. x là thuộc tính riêng của từng đối tượng, mỗi đối tượng chỉ tăng x của chính nó một lần.",
    },
    {
      id: "q-o-static-4", topic: "o-static", type: "mcq",
      q: "Phương thức static của một lớp C++ làm được điều nào sau đây?",
      choices: [
        "Dùng con trỏ this",
        "Truy cập trực tiếp thuộc tính static của lớp",
        "Khai báo là phương thức const (<code>static void f() const</code>)",
        "Truy cập trực tiếp thuộc tính không static mà không cần đối tượng nào",
      ],
      answer: 1,
      explain: "Phương thức static không gắn với đối tượng nào nên không có this, không thể là const, và chỉ truy cập trực tiếp được thành viên static.",
    },

    // ----- o-operator -----
    {
      id: "q-o-operator-1", topic: "o-operator", type: "output", lang: "cpp",
      code: `#include <iostream>
using namespace std;

struct PS {
    int t, m;
    PS(int t_, int m_ = 1) : t(t_), m(m_) {}
};

PS operator+(const PS& a, const PS& b) {
    return PS(a.t * b.m + b.t * a.m, a.m * b.m);
}

ostream& operator<<(ostream& os, const PS& p) {
    return os << p.t << "/" << p.m;
}

int main() {
    PS a(1, 2), b(1, 3);
    cout << a + b << endl;
    cout << 2 + a << endl;
}`,
      q: "Chương trình in ra gì?",
      answer: "5/6\n5/2",
      explain: "1/2 + 1/3 = 5/6. Vì operator+ là hàm ngoài, 2 được chuyển thành PS(2) = 2/1 qua hàm tạo, 2/1 + 1/2 = 5/2.",
    },
    {
      id: "q-o-operator-2", topic: "o-operator", type: "output", lang: "cpp",
      code: `#include <iostream>
using namespace std;

struct Dem {
    int v;
    Dem(int x) : v(x) {}
    Dem& operator++() { ++v; return *this; }
    Dem operator++(int) { Dem cu = *this; ++v; return cu; }
};

int main() {
    Dem d(5);
    Dem a = d++;
    Dem b = ++d;
    cout << a.v << " " << b.v << " " << d.v << endl;
}`,
      q: "Chương trình in ra gì?",
      answer: "5 7 7",
      explain: "Hậu tố d++ trả về giá trị cũ (5) rồi d thành 6. Tiền tố ++d tăng d lên 7 và trả về chính d (7).",
    },
    {
      id: "q-o-operator-3", topic: "o-operator", type: "output", lang: "java",
      code: `public class Main {
    public static void main(String[] args) {
        String a = new String("oop");
        String b = new String("oop");
        System.out.println(a == b);
        System.out.println(a.equals(b));
    }
}`,
      q: "Chương trình in ra gì?",
      answer: "false\ntrue",
      explain: "Java không nạp chồng toán tử: == so sánh tham chiếu (hai đối tượng khác nhau), còn equals của String so sánh nội dung.",
    },
    {
      id: "q-o-operator-4", topic: "o-operator", type: "mcq",
      q: "Toán tử nào <b>không</b> nạp chồng được trong C++?",
      choices: ["+", "[]", "::", "&lt;&lt;", "()"],
      answer: 2,
      explain: "Không nạp chồng được: ::, ., .*, ?: và sizeof. Các toán tử còn lại đều nạp chồng được.",
    },

    // ----- o-inherit -----
    {
      id: "q-o-inherit-1", topic: "o-inherit", type: "output", lang: "java",
      code: `public class Main {
    static class Nguoi {
        Nguoi() { System.out.print("N"); }
        Nguoi(String t) { System.out.print("N(" + t + ")"); }
    }

    static class SinhVien extends Nguoi {
        SinhVien() { System.out.print("S"); }
        SinhVien(String t) { super(t); System.out.print("S(" + t + ")"); }
    }

    public static void main(String[] args) {
        new SinhVien();
        System.out.println();
        new SinhVien("An");
        System.out.println();
    }
}`,
      q: "Chương trình in ra gì?",
      answer: "NS\nN(An)S(An)",
      explain: "Hàm tạo lớp con luôn gọi hàm tạo lớp cha trước: không ghi super(...) thì gọi Nguoi(); có super(t) thì gọi Nguoi(String).",
    },
    {
      id: "q-o-inherit-2", topic: "o-inherit", type: "output", lang: "cpp",
      code: `#include <iostream>
using namespace std;

struct A {
    void f(int) { cout << "A::f(int) "; }
    void f(double) { cout << "A::f(double) "; }
};

struct B : A {
    void f(double) { cout << "B::f(double) "; }
};

int main() {
    B b;
    b.f(1);
    b.A::f(1);
    cout << endl;
}`,
      q: "Chương trình in ra gì?",
      answer: "B::f(double) A::f(int)",
      explain: "B::f che (hide) mọi hàm f của A, nên b.f(1) chỉ thấy B::f(double) và chuyển 1 thành double. b.A::f(1) gọi rõ bản của A, chọn f(int).",
    },
    {
      id: "q-o-inherit-3", topic: "o-inherit", type: "output", lang: "cpp",
      code: `#include <iostream>
using namespace std;

struct Hinh {
    virtual void moTa() { cout << "Hinh"; }
    virtual ~Hinh() {}
};

struct Tron : Hinh {
    void moTa() override {
        Hinh::moTa();
        cout << "+Tron";
    }
};

int main() {
    Tron t;
    Hinh& h = t;
    h.moTa();
    cout << endl;
}`,
      q: "Chương trình in ra gì?",
      answer: "Hinh+Tron",
      explain: "h là tham chiếu tới Tron nên gọi Tron::moTa; bên trong gọi rõ Hinh::moTa() (không qua cơ chế ảo) rồi in thêm +Tron.",
    },
    {
      id: "q-o-inherit-4", topic: "o-inherit", type: "mcq",
      q: "C++: lớp A có x public, y protected, z private. <code>class B : protected A</code>. Ở hàm main, qua một đối tượng B, truy cập trực tiếp được thành viên nào?",
      choices: ["Chỉ x", "x và y", "Không thành viên nào trong x, y, z", "Cả x, y, z"],
      answer: 2,
      explain: "Kế thừa protected biến x, y thành protected trong B (z vẫn không truy cập được), nên bên ngoài lớp không truy cập được cái nào.",
    },

    // ----- o-poly -----
    {
      id: "q-o-poly-1", topic: "o-poly", type: "output", lang: "cpp",
      code: `#include <iostream>
using namespace std;

struct Base {
    void f() { cout << "Bf "; }
    virtual void g() { cout << "Bg "; }
    virtual ~Base() {}
};

struct Der : Base {
    void f() { cout << "Df "; }
    void g() override { cout << "Dg "; }
};

int main() {
    Der d;
    Base* p = &d;
    Base& r = d;
    Base b = d;
    p->f(); p->g(); r.g(); b.g(); d.f();
    cout << endl;
}`,
      q: "Chương trình in ra gì?",
      answer: "Bf Dg Dg Bg Df",
      explain: "f không ảo nên p-&gt;f() chọn theo kiểu con trỏ (Base). g ảo nên qua con trỏ/tham chiếu chọn theo kiểu thực (Der). b là bản cắt lát kiểu Base nên b.g() in Bg.",
    },
    {
      id: "q-o-poly-2", topic: "o-poly", type: "output", lang: "cpp",
      code: `#include <iostream>
using namespace std;

struct A {
    A() { cout << "A"; }
    virtual ~A() { cout << "~A"; }
};

struct B : A {
    B() { cout << "B"; }
    ~B() { cout << "~B"; }
};

int main() {
    A* p = new B;
    delete p;
    cout << endl;
}`,
      q: "Chương trình in ra gì?",
      answer: "AB~B~A",
      explain: "Vì ~A là hàm hủy ảo, delete qua con trỏ A gọi đúng ~B trước rồi ~A. Nếu ~A không ảo, hành vi là không xác định và thường chỉ ~A chạy.",
    },
    {
      id: "q-o-poly-3", topic: "o-poly", type: "output", lang: "cpp",
      code: `#include <iostream>
using namespace std;

struct A {
    virtual void f(int x = 1) { cout << "A" << x << endl; }
    virtual ~A() {}
};

struct B : A {
    void f(int x = 2) override { cout << "B" << x << endl; }
};

int main() {
    A* p = new B;
    p->f();
    delete p;
}`,
      q: "Chương trình in ra gì?",
      answer: "B1",
      explain: "Hàm được chọn lúc chạy (B::f), nhưng giá trị mặc định của tham số được chọn lúc biên dịch theo kiểu con trỏ (A), nên x = 1.",
    },
    {
      id: "q-o-poly-4", topic: "o-poly", type: "output", lang: "java",
      code: `public class Main {
    static class Cha {
        String ten = "Cha";
        String goi() { return "Cha.goi"; }
        static String s() { return "Cha.s"; }
    }

    static class Con extends Cha {
        String ten = "Con";
        @Override String goi() { return "Con.goi"; }
        static String s() { return "Con.s"; }
    }

    public static void main(String[] args) {
        Cha x = new Con();
        System.out.println(x.ten);
        System.out.println(x.goi());
        System.out.println(x.s());
    }
}`,
      q: "Chương trình in ra gì?",
      answer: "Cha\nCon.goi\nCha.s",
      explain: "Chỉ phương thức thường mới liên kết động (Con.goi). Thuộc tính và phương thức static được chọn theo kiểu khai báo của biến (Cha).",
    },
    {
      id: "q-o-poly-5", topic: "o-poly", type: "output", lang: "java",
      code: `public class Main {
    static class Hinh {}
    static class Tron extends Hinh {}

    static void in(Hinh h) { System.out.println("Hinh"); }
    static void in(Tron t) { System.out.println("Tron"); }

    public static void main(String[] args) {
        Hinh h = new Tron();
        in(h);
        in(new Tron());
        in((Tron) h);
    }
}`,
      q: "Chương trình in ra gì?",
      answer: "Hinh\nTron\nTron",
      explain: "Nạp chồng được chọn lúc biên dịch theo kiểu khai báo của đối số: h có kiểu Hinh nên gọi in(Hinh), dù đối tượng thực là Tron.",
    },

    // ----- o-abstract -----
    {
      id: "q-o-abstract-1", topic: "o-abstract", type: "output", lang: "cpp",
      code: `#include <iostream>
using namespace std;

struct Hinh {
    virtual int dienTich() const = 0;
    virtual ~Hinh() {}
    int gapDoi() const { return 2 * dienTich(); }
};

struct CN : Hinh {
    int d, r;
    CN(int a, int b) : d(a), r(b) {}
    int dienTich() const override { return d * r; }
};

struct Vuong : CN {
    Vuong(int a) : CN(a, a) {}
};

int main() {
    CN a(2, 3);
    Vuong v(4);
    const Hinh& h1 = a;
    const Hinh& h2 = v;
    cout << h1.gapDoi() << " " << h2.dienTich() << endl;
}`,
      q: "Chương trình in ra gì?",
      answer: "12 16",
      explain: "gapDoi() của lớp trừu tượng gọi hàm thuần ảo dienTich(), được thực thi theo kiểu thực: 2·(2·3) = 12. Vuong kế thừa dienTich() của CN: 4·4 = 16.",
    },
    {
      id: "q-o-abstract-2", topic: "o-abstract", type: "output", lang: "java",
      code: `public class Main {
    interface ChaoHoi {
        String ten();
        default String chao() { return "Xin chao " + ten(); }
    }

    static class An implements ChaoHoi {
        public String ten() { return "An"; }
    }

    static class Binh implements ChaoHoi {
        public String ten() { return "Binh"; }
        public String chao() { return "Hi " + ten(); }
    }

    public static void main(String[] args) {
        ChaoHoi[] ds = { new An(), new Binh() };
        for (ChaoHoi c : ds) System.out.println(c.chao());
    }
}`,
      q: "Chương trình in ra gì?",
      answer: "Xin chao An\nHi Binh",
      explain: "An dùng phương thức default của interface; Binh ghi đè chao() nên dùng bản của mình.",
    },
    {
      id: "q-o-abstract-3", topic: "o-abstract", type: "mcq",
      q: "Cho <code>struct Hinh { virtual double dienTich() const = 0; };</code>. Câu lệnh <code>Hinh h;</code> sẽ thế nào?",
      choices: [
        "Tạo được đối tượng, dienTich() trả về 0",
        "Lỗi biên dịch vì Hinh là lớp trừu tượng",
        "Lỗi khi chạy lúc gọi dienTich()",
        "Tạo được nếu Hinh có hàm tạo mặc định",
      ],
      answer: 1,
      explain: "Lớp có hàm thuần ảo là lớp trừu tượng, không tạo đối tượng được; chỉ dùng được con trỏ/tham chiếu Hinh tới đối tượng lớp con.",
    },
    {
      id: "q-o-abstract-4", topic: "o-abstract", type: "multi",
      q: "Java: những phát biểu nào đúng? (chọn tất cả đáp án đúng)",
      choices: [
        "Một lớp có thể thực thi (implements) nhiều interface",
        "Abstract class có thể có hàm tạo",
        "Từ Java 8, interface có thể có phương thức default",
        "Có thể tạo đối tượng bằng new trực tiếp từ một abstract class",
        "Một lớp có thể extends hai abstract class",
      ],
      answer: [0, 1, 2],
      explain: "Java chỉ cho đơn kế thừa lớp (kể cả abstract) nhưng cho thực thi nhiều interface. Abstract class có hàm tạo (được lớp con gọi qua super) nhưng không new trực tiếp được.",
    },

    // ----- o-uml -----
    {
      id: "q-o-uml-1", topic: "o-uml", type: "mcq",
      q: "Trong sơ đồ lớp UML, đường nối có <b>hình thoi đặc</b> (tô kín) ở phía lớp toàn thể biểu diễn quan hệ gì?",
      choices: ["Kết hợp (association)", "Kết tập (aggregation)", "Hợp thành (composition)", "Kế thừa (generalization)"],
      answer: 2,
      explain: "Hình thoi đặc là hợp thành: bộ phận sống chết theo toàn thể. Hình thoi rỗng là kết tập.",
    },
    {
      id: "q-o-uml-2", topic: "o-uml", type: "mcq",
      q: "Mũi tên <b>nét đứt</b> có đầu <b>tam giác rỗng</b>, chỉ từ một lớp tới một interface, biểu diễn quan hệ gì?",
      choices: ["Kế thừa (generalization)", "Thực thi (realization)", "Phụ thuộc (dependency)", "Kết tập (aggregation)"],
      answer: 1,
      explain: "Tam giác rỗng nét liền là kế thừa; tam giác rỗng nét đứt là thực thi interface; mũi tên thường nét đứt là phụ thuộc.",
    },
    {
      id: "q-o-uml-3", topic: "o-uml", type: "mcq",
      q: "Trong ô lớp UML, ký hiệu <code>#</code> đứng trước một thuộc tính nghĩa là gì?",
      choices: ["public", "private", "protected", "package"],
      answer: 2,
      explain: "+ public, − private, # protected, ~ package.",
    },
    {
      id: "q-o-uml-4", topic: "o-uml", type: "mcq",
      q: "Lớp Lop giữ danh sách con trỏ tới các SinhVien; sinh viên được tạo bên ngoài và vẫn tồn tại khi đối tượng Lop bị hủy. Quan hệ phù hợp nhất giữa Lop và SinhVien là gì?",
      choices: ["Hợp thành (composition)", "Kết tập (aggregation)", "Kế thừa (generalization)", "Thực thi (realization)"],
      answer: 1,
      explain: "Quan hệ toàn thể–bộ phận lỏng, bộ phận tồn tại độc lập với toàn thể ⇒ kết tập (hình thoi rỗng ở phía Lop).",
    },

    // ----- o-exception -----
    {
      id: "q-o-exception-1", topic: "o-exception", type: "output", lang: "cpp",
      code: `#include <iostream>
#include <stdexcept>
using namespace std;

int main() {
    try {
        throw out_of_range("x");
    } catch (const logic_error& e) {
        cout << "logic" << endl;
    } catch (const out_of_range& e) {
        cout << "range" << endl;
    }
}`,
      q: "Chương trình in ra gì?",
      answer: "logic",
      explain: "out_of_range kế thừa logic_error. Khối catch đầu tiên khớp được chọn, nên phải đặt catch lớp con trước lớp cha.",
    },
    {
      id: "q-o-exception-2", topic: "o-exception", type: "output", lang: "cpp",
      code: `#include <iostream>
using namespace std;

struct R {
    char c;
    R(char x) : c(x) { cout << "+" << c; }
    ~R() { cout << "-" << c; }
};

void f() {
    R a('a');
    throw 1;
    R b('b');
}

int main() {
    try {
        R m('m');
        f();
    } catch (int) {
        cout << "!";
    }
    cout << endl;
}`,
      q: "Chương trình in ra gì?",
      answer: "+m+a-a-m!",
      explain: "Khi ngoại lệ lan ra (stack unwinding), các đối tượng cục bộ đã tạo bị hủy: a trong f, rồi m trong khối try, sau đó mới vào catch. b chưa bao giờ được tạo.",
    },
    {
      id: "q-o-exception-3", topic: "o-exception", type: "output", lang: "cpp",
      code: `#include <iostream>
#include <stdexcept>
using namespace std;

void g() {
    try {
        throw runtime_error("loi");
    } catch (const exception& e) {
        cout << "g:" << e.what() << endl;
        throw;
    }
}

int main() {
    try {
        g();
    } catch (const runtime_error& e) {
        cout << "main:" << e.what() << endl;
    }
}`,
      q: "Chương trình in ra gì?",
      answer: "g:loi\nmain:loi",
      explain: "throw; ném lại chính ngoại lệ đang xử lý (vẫn là runtime_error, không bị cắt lát), nên main bắt được bằng catch runtime_error.",
    },
    {
      id: "q-o-exception-4", topic: "o-exception", type: "output", lang: "java",
      code: `public class Main {
    static int f() {
        try {
            System.out.print("T");
            return 1;
        } finally {
            System.out.print("F");
        }
    }

    public static void main(String[] args) {
        int x = f();
        System.out.println(x);
    }
}`,
      q: "Chương trình in ra gì?",
      answer: "TF1",
      explain: "finally luôn chạy, kể cả khi khối try đã return; giá trị 1 được trả về sau khi finally chạy xong.",
    },
    {
      id: "q-o-exception-5", topic: "o-exception", type: "output", lang: "java",
      code: `public class Main {
    public static void main(String[] args) {
        int[] a = new int[3];
        try {
            a[1] = 10 / 2;
            System.out.print("A");
            a[3] = 1;
            System.out.print("B");
        } catch (ArithmeticException e) {
            System.out.print("C");
        } catch (RuntimeException e) {
            System.out.print("D");
        } finally {
            System.out.print("E");
        }
        System.out.println("F");
    }
}`,
      q: "Chương trình in ra gì?",
      answer: "ADEF",
      explain: "a[3] ném ArrayIndexOutOfBoundsException (một RuntimeException, không phải ArithmeticException) nên vào catch thứ hai; finally luôn chạy; sau đó chương trình tiếp tục in F.",
    },
    {
      id: "q-o-exception-6", topic: "o-exception", type: "mcq",
      q: "Java: một phương thức gọi <code>new FileReader(\"a.txt\")</code>, có thể ném FileNotFoundException (checked exception). Nếu phương thức không bắt ngoại lệ này bằng try/catch thì sao?",
      choices: [
        "Không sao, ngoại lệ tự bị bỏ qua",
        "Phải khai báo throws trong chữ ký phương thức, nếu không sẽ lỗi biên dịch",
        "Chương trình biên dịch được nhưng luôn dừng khi chạy",
        "Phải bọc bằng finally",
      ],
      answer: 1,
      explain: "Checked exception bắt buộc phải bắt hoặc khai báo throws; unchecked (RuntimeException) thì không bắt buộc.",
    },

    // ----- o-generic -----
    {
      id: "q-o-generic-1", topic: "o-generic", type: "output", lang: "cpp",
      code: `#include <iostream>
#include <string>
using namespace std;

template <typename T>
T lonNhat(T a, T b) { return a > b ? a : b; }

int main() {
    cout << lonNhat(3, 7) << " "
         << lonNhat<double>(2.5, 2) << " "
         << lonNhat(string("ab"), string("b")) << endl;
}`,
      q: "Chương trình in ra gì?",
      answer: "7 2.5 b",
      explain: "Mỗi kiểu sinh một bản hàm riêng. Với string, &gt; so sánh theo thứ tự từ điển: \"b\" &gt; \"ab\" vì 'b' &gt; 'a'.",
    },
    {
      id: "q-o-generic-2", topic: "o-generic", type: "output", lang: "cpp",
      code: `#include <iostream>
using namespace std;

template <typename T>
struct Dem {
    static int n;
    Dem() { n++; }
};
template <typename T> int Dem<T>::n = 0;

int main() {
    Dem<int> a, b;
    Dem<double> c;
    cout << Dem<int>::n << " " << Dem<double>::n << endl;
}`,
      q: "Chương trình in ra gì?",
      answer: "2 1",
      explain: "Dem&lt;int&gt; và Dem&lt;double&gt; là hai lớp khác nhau do template sinh ra, mỗi lớp có biến static n riêng.",
    },
    {
      id: "q-o-generic-3", topic: "o-generic", type: "output", lang: "cpp",
      code: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    map<string, int> dem;
    for (string w : {"b", "a", "b", "c", "a", "b"}) dem[w]++;
    for (auto& p : dem) cout << p.first << p.second << " ";
    cout << endl;
}`,
      q: "Chương trình in ra gì?",
      answer: "a2 b3 c1",
      explain: "map giữ khóa theo thứ tự tăng (a, b, c), dem[w] tự tạo giá trị 0 cho khóa mới rồi tăng.",
    },
    {
      id: "q-o-generic-4", topic: "o-generic", type: "output", lang: "java",
      code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> a = new ArrayList<>(List.of(5, 1, 3, 1));
        a.remove(1);
        a.remove(Integer.valueOf(1));
        System.out.println(a);
    }
}`,
      q: "Chương trình in ra gì?",
      answer: "[5, 3]",
      explain: "remove(1) với int gọi remove(int index): xóa phần tử vị trí 1 ⇒ [5, 3, 1]. remove(Integer.valueOf(1)) gọi remove(Object): xóa giá trị 1 đầu tiên ⇒ [5, 3].",
    },
    {
      id: "q-o-generic-5", topic: "o-generic", type: "mcq",
      q: "Java: câu lệnh <code>List&lt;Number&gt; l = new ArrayList&lt;Integer&gt;();</code> sẽ thế nào?",
      choices: [
        "Hợp lệ vì Integer là lớp con của Number",
        "Lỗi biên dịch vì List&lt;Integer&gt; không phải kiểu con của List&lt;Number&gt;",
        "Biên dịch được nhưng ném ClassCastException khi chạy",
        "Hợp lệ nhưng chỉ đọc được, không thêm được",
      ],
      answer: 1,
      explain: "Generic trong Java là bất biến (invariant). Nếu cho phép, có thể thêm 3.14 vào danh sách Integer. Muốn đọc chung thì dùng List&lt;? extends Number&gt;.",
    },

    // ----- o-solid -----
    {
      id: "q-o-solid-1", topic: "o-solid", type: "mcq",
      q: "Hàm tinhLuong(NhanVien nv) dùng switch theo nv.loai; mỗi khi thêm loại nhân viên mới phải sửa switch. Thiết kế này vi phạm nguyên lý nào?",
      choices: ["Single Responsibility", "Open/Closed", "Liskov Substitution", "Interface Segregation"],
      answer: 1,
      explain: "Open/Closed: nên mở rộng bằng lớp con mới (tinhLuong ảo) thay vì sửa code có sẵn.",
    },
    {
      id: "q-o-solid-2", topic: "o-solid", type: "mcq",
      q: "Lớp BaoCao vừa tính số liệu, vừa định dạng và ghi ra file PDF, vừa gửi email. Thiết kế này vi phạm nguyên lý nào rõ nhất?",
      choices: ["Single Responsibility", "Open/Closed", "Liskov Substitution", "Dependency Inversion"],
      answer: 0,
      explain: "Lớp có nhiều lý do để thay đổi (công thức tính, định dạng file, cách gửi mail) ⇒ nên tách thành các lớp riêng.",
    },
    {
      id: "q-o-solid-3", topic: "o-solid", type: "mcq",
      q: "HinhVuong kế thừa HinhChuNhat có setRong/setDai độc lập. Một hàm nhận HinhChuNhat, gọi setRong(2), setDai(5) rồi mong diện tích là 10, nhưng với HinhVuong lại sai. Vi phạm nguyên lý nào?",
      choices: ["Single Responsibility", "Open/Closed", "Liskov Substitution", "Interface Segregation"],
      answer: 2,
      explain: "Liskov: đối tượng lớp con phải thay được cho lớp cha mà chương trình vẫn đúng.",
    },
    {
      id: "q-o-solid-4", topic: "o-solid", type: "mcq",
      q: "Interface MayIn có in(), scan(), fax(). Lớp MayInRe chỉ in được nhưng vẫn phải cài scan(), fax() (ném lỗi). Vi phạm nguyên lý nào?",
      choices: ["Interface Segregation", "Dependency Inversion", "Open/Closed", "Single Responsibility"],
      answer: 0,
      explain: "Interface Segregation: tách thành các interface nhỏ (CoTheIn, CoTheScan, CoTheFax) để lớp chỉ thực thi phần cần.",
    },
    {
      id: "q-o-solid-5", topic: "o-solid", type: "mcq",
      q: "Lớp DonHang tự tạo <code>new MySQLDatabase()</code> bên trong để lưu dữ liệu. Nguyên lý nào khuyên nên nhận một interface CoSoDuLieu qua hàm tạo thay vì vậy?",
      choices: ["Liskov Substitution", "Interface Segregation", "Dependency Inversion", "Single Responsibility"],
      answer: 2,
      explain: "Dependency Inversion: module cấp cao phụ thuộc vào trừu tượng, không phụ thuộc lớp cụ thể; nhờ vậy dễ thay CSDL hoặc dùng bản giả khi test.",
    },

    // ----- o-pattern -----
    {
      id: "q-o-pattern-1", topic: "o-pattern", type: "output", lang: "cpp",
      code: `#include <iostream>
using namespace std;

class CauHinh {
    CauHinh() { cout << "tao "; }
public:
    CauHinh(const CauHinh&) = delete;
    static CauHinh& get() {
        static CauHinh ch;
        return ch;
    }
    int dem = 0;
};

int main() {
    CauHinh::get().dem++;
    CauHinh::get().dem++;
    CauHinh& c = CauHinh::get();
    cout << c.dem << " " << (&c == &CauHinh::get()) << endl;
}`,
      q: "Chương trình in ra gì?",
      answer: "tao 2 1",
      explain: "Biến static cục bộ chỉ được tạo một lần ở lần gọi get() đầu tiên; mọi lời gọi sau trả về cùng một đối tượng.",
    },
    {
      id: "q-o-pattern-2", topic: "o-pattern", type: "output", lang: "java",
      code: `import java.util.*;

public class Main {
    interface NguoiTheoDoi { void capNhat(String tt); }

    static class DonHang {
        private final List<NguoiTheoDoi> ds = new ArrayList<>();
        void dangKy(NguoiTheoDoi n) { ds.add(n); }
        void doiTrangThai(String tt) {
            for (NguoiTheoDoi n : ds) n.capNhat(tt);
        }
    }

    public static void main(String[] args) {
        DonHang d = new DonHang();
        d.dangKy(tt -> System.out.println("Email: " + tt));
        d.doiTrangThai("DANG_GIAO");
        d.dangKy(tt -> System.out.println("SMS: " + tt));
        d.doiTrangThai("DA_GIAO");
    }
}`,
      q: "Chương trình in ra gì?",
      answer: "Email: DANG_GIAO\nEmail: DA_GIAO\nSMS: DA_GIAO",
      explain: "Observer: subject gọi capNhat của mọi người theo dõi đã đăng ký tại thời điểm đổi trạng thái. SMS đăng ký sau lần đổi đầu nên chỉ nhận lần thứ hai.",
    },
    {
      id: "q-o-pattern-3", topic: "o-pattern", type: "output", lang: "cpp",
      code: `#include <iostream>
#include <memory>
#include <string>
using namespace std;

struct Hinh {
    virtual string ten() const = 0;
    virtual ~Hinh() {}
};
struct Tron : Hinh { string ten() const override { return "Tron"; } };
struct Vuong : Hinh { string ten() const override { return "Vuong"; } };

unique_ptr<Hinh> taoHinh(const string& loai) {
    if (loai == "tron") return make_unique<Tron>();
    if (loai == "vuong") return make_unique<Vuong>();
    return nullptr;
}

int main() {
    for (string s : {"vuong", "tam giac", "tron"}) {
        auto h = taoHinh(s);
        cout << (h ? h->ten() : "?") << " ";
    }
    cout << endl;
}`,
      q: "Chương trình in ra gì?",
      answer: "Vuong ? Tron",
      explain: "Factory: nơi dùng chỉ biết Hinh, hàm taoHinh quyết định tạo lớp con nào; loại không hỗ trợ trả về nullptr.",
    },
    {
      id: "q-o-pattern-4", topic: "o-pattern", type: "mcq",
      q: "Ứng dụng cần tự động báo cho email, SMS và app di động mỗi khi đơn hàng đổi trạng thái, và dễ thêm kênh mới. Mẫu thiết kế phù hợp nhất là gì?",
      choices: ["Singleton", "Factory Method", "Observer", "Không cần mẫu nào, dùng if/else"],
      answer: 2,
      explain: "Observer: đơn hàng là subject giữ danh sách người theo dõi và gọi capNhat() khi trạng thái đổi; thêm kênh mới chỉ cần đăng ký thêm.",
    },

    // ----- o-projects -----
    {
      id: "q-o-projects-1", topic: "o-projects", type: "output", lang: "cpp",
      code: `#include <iostream>
#include <numeric>
using namespace std;

class PhanSo {
    int tu, mau;
    void rutGon() {
        int g = gcd(tu, mau);
        if (g) { tu /= g; mau /= g; }
        if (mau < 0) { tu = -tu; mau = -mau; }
    }
public:
    PhanSo(int t, int m) : tu(t), mau(m) { rutGon(); }
    PhanSo operator*(const PhanSo& o) const { return PhanSo(tu * o.tu, mau * o.mau); }
    bool operator<(const PhanSo& o) const { return tu * o.mau < o.tu * mau; }
    friend ostream& operator<<(ostream& os, const PhanSo& p) { return os << p.tu << "/" << p.mau; }
};

int main() {
    PhanSo a(2, -4), b(6, 8);
    cout << a << " " << b << " " << a * b << " " << (a < b) << endl;
}`,
      q: "Chương trình in ra gì?",
      answer: "-1/2 3/4 -3/8 1",
      explain: "2/−4 rút gọn thành 1/−2 rồi chuẩn hóa mẫu dương: −1/2. 6/8 = 3/4. Tích −3/8. So sánh chéo −1·4 &lt; 3·2 nên in 1 (true).",
    },
    {
      id: "q-o-projects-2", topic: "o-projects", type: "output", lang: "cpp",
      code: `#include <iostream>
#include <vector>
using namespace std;

struct NhanVien {
    virtual int luong() const { return 10; }
    virtual ~NhanVien() {}
};

struct QuanLy : NhanVien {
    int luong() const override { return NhanVien::luong() + 5; }
};

int main() {
    vector<NhanVien*> ds = { new NhanVien, new QuanLy, new QuanLy };
    int tong = 0;
    for (NhanVien* p : ds) tong += p->luong();
    cout << tong << endl;
    for (NhanVien* p : ds) delete p;
}`,
      q: "Chương trình in ra gì?",
      answer: "40",
      explain: "luong() ảo nên mỗi phần tử tính theo kiểu thực: 10 + 15 + 15 = 40.",
    },
    {
      id: "q-o-projects-3", topic: "o-projects", type: "output", lang: "cpp",
      code: `#include <algorithm>
#include <iostream>
#include <memory>
#include <string>
#include <vector>
using namespace std;
struct Hinh {
    virtual int dt() const = 0;
    virtual string ten() const = 0;
    virtual ~Hinh() {}
};
struct CN : Hinh {
    int a, b;
    CN(int x, int y) : a(x), b(y) {}
    int dt() const override { return a * b; }
    string ten() const override { return "CN"; }
};
struct Vuong : CN {
    Vuong(int x) : CN(x, x) {}
    string ten() const override { return "V"; }
};

int main() {
    vector<unique_ptr<Hinh>> ds;
    ds.push_back(make_unique<CN>(2, 5));
    ds.push_back(make_unique<Vuong>(3));
    ds.push_back(make_unique<CN>(1, 4));
    sort(ds.begin(), ds.end(), [](const auto& x, const auto& y) { return x->dt() > y->dt(); });
    for (auto& h : ds) cout << h->ten() << h->dt() << " ";
}`,
      q: "Chương trình in ra gì?",
      answer: "CN10 V9 CN4",
      explain: "Diện tích lần lượt 10, 9, 4; sắp giảm dần theo dt() gọi qua hàm ảo.",
    },

    // ----- o-review -----
    {
      id: "q-o-review-1", topic: "o-review", type: "output", lang: "cpp",
      code: `#include <iostream>
using namespace std;

struct Base {
    Base() { hi(); }
    virtual void hi() { cout << "Base "; }
    void goi() { hi(); }
    virtual ~Base() {}
};

struct Der : Base {
    Der() { hi(); }
    void hi() override { cout << "Der "; }
};

int main() {
    Der d;
    d.goi();
    cout << endl;
}`,
      q: "Chương trình in ra gì?",
      answer: "Base Der Der",
      explain: "Trong hàm tạo Base, phần Der chưa được tạo nên hi() gọi bản Base. Sau đó hàm tạo Der và d.goi() đều gọi bản Der.",
    },
    {
      id: "q-o-review-2", topic: "o-review", type: "mcq",
      q: "struct và class trong C++ khác nhau ở điểm nào?",
      choices: [
        "struct không có phương thức",
        "struct không kế thừa được",
        "Chỉ khác phạm vi truy cập mặc định: struct là public, class là private",
        "struct luôn cấp phát trên stack, class trên heap",
      ],
      answer: 2,
      explain: "Ngoài phạm vi mặc định của thành viên và của kiểu kế thừa, struct và class trong C++ như nhau.",
    },
    {
      id: "q-o-review-3", topic: "o-review", type: "mcq",
      q: "Trong C++, hàm nào <b>không</b> thể khai báo virtual?",
      choices: ["Hàm hủy", "Hàm tạo", "Toán tử gán operator=", "Phương thức const"],
      answer: 1,
      explain: "Hàm tạo không thể ảo vì khi đang tạo, đối tượng chưa hoàn chỉnh và kiểu cần tạo phải biết trước. Hàm hủy thì nên ảo ở lớp cơ sở đa hình.",
    },
    {
      id: "q-o-review-4", topic: "o-review", type: "multi",
      q: "Những phát biểu nào đúng? (chọn tất cả đáp án đúng)",
      choices: [
        "Nạp chồng (overload) được xác định lúc biên dịch.",
        "Ghi đè (override) là lớp con định nghĩa lại hàm ảo của lớp cha với cùng danh sách tham số.",
        "Trong C++, hàm f(double) ở lớp con che mọi hàm f của lớp cha, kể cả f(int).",
        "Gọi hàm ảo qua một biến đối tượng (không qua con trỏ hay tham chiếu) vẫn dùng liên kết động.",
      ],
      answer: [0, 1, 2],
      explain: "Gọi qua đối tượng (không phải con trỏ/tham chiếu) thì kiểu đã biết lúc biên dịch, nên là liên kết tĩnh. Ba ý còn lại đúng.",
    },
  ];

  if (typeof module !== "undefined" && module.exports) module.exports = QUIZ;
  else root.QUIZ = QUIZ;
})(this);
