// Lý thuyết và bài tập: Lý thuyết đồ thị, OOP (C++, có ghi chú Java).
// Mỗi chủ đề: id, title, theory (HTML), code (tùy chọn), exercises [{q, a}] với a là lời giải (HTML).
(function (root) {
  const C = (root.CONTENT = root.CONTENT || {});
  if (typeof module !== "undefined" && module.exports) module.exports = C;

  C.graph = {
    name: "Lý thuyết đồ thị",
    topics: [
      {
        id: "g-basics",
        title: "Khái niệm cơ bản, bậc, các loại đồ thị",
        theory: `
<p>Đồ thị <b>G = (V, E)</b> gồm tập đỉnh V và tập cạnh E. Ký hiệu n = |V|, m = |E|.</p>
<ul>
<li><b>Đơn đồ thị</b>: không có khuyên, giữa hai đỉnh có tối đa một cạnh. <b>Đa đồ thị</b>: cho phép cạnh song song. <b>Giả đồ thị</b>: cho phép thêm khuyên.</li>
<li><b>Bậc</b> deg(v) = số cạnh liên thuộc v (khuyên tính 2). Đỉnh bậc 0 là đỉnh cô lập, bậc 1 là đỉnh treo.</li>
<li><b>Định lý bắt tay</b>: Σ deg(v) = 2m. Hệ quả: số đỉnh bậc lẻ luôn chẵn.</li>
<li>Đồ thị có hướng: Σ deg⁺(v) = Σ deg⁻(v) = m (bán bậc ra, bán bậc vào).</li>
</ul>
<table><tr><th>Đồ thị</th><th>Số đỉnh</th><th>Số cạnh</th><th>Bậc</th></tr>
<tr><td>Đầy đủ K<sub>n</sub></td><td>n</td><td>n(n−1)/2</td><td>n−1</td></tr>
<tr><td>Vòng C<sub>n</sub> (n ≥ 3)</td><td>n</td><td>n</td><td>2</td></tr>
<tr><td>Bánh xe W<sub>n</sub></td><td>n+1</td><td>2n</td><td>3 (vành), n (tâm)</td></tr>
<tr><td>Lập phương Q<sub>n</sub></td><td>2<sup>n</sup></td><td>n·2<sup>n−1</sup></td><td>n</td></tr>
<tr><td>Hai phía đầy đủ K<sub>m,n</sub></td><td>m+n</td><td>m·n</td><td>n (bên m), m (bên n)</td></tr>
</table>
<p>Đồ thị <b>bù</b> của đơn đồ thị G có cùng tập đỉnh, hai đỉnh kề nhau khi và chỉ khi chúng không kề trong G. Số cạnh G + số cạnh bù = n(n−1)/2.</p>`,
        exercises: [
          { q: "Có tồn tại đơn đồ thị 7 đỉnh mà mọi đỉnh đều bậc 3 không?",
            a: "Không. Tổng bậc = 7·3 = 21 là số lẻ, trái với định lý bắt tay (tổng bậc phải bằng 2m, luôn chẵn)." },
          { q: "Một đồ thị có 15 cạnh và mọi đỉnh đều bậc 3. Đồ thị có bao nhiêu đỉnh?",
            a: "2m = 30 = 3n nên n = 10. (Đồ thị Petersen là một ví dụ.)" },
          { q: "Có đơn đồ thị 5 đỉnh với dãy bậc 3, 3, 3, 3, 2 không? Nếu có, hãy vẽ.",
            a: "Có. Tổng bậc 14 nên có 7 cạnh. Vẽ chu trình a–b–c–d–e–a (mọi đỉnh bậc 2), thêm hai dây cung a–c và b–d: a, b, c, d bậc 3, e bậc 2." },
          { q: "Q<sub>3</sub> có bao nhiêu cạnh? Đồ thị bù của C<sub>5</sub> là đồ thị gì?",
            a: "Q<sub>3</sub> có 3·2² = 12 cạnh. Bù của C<sub>5</sub> có 10 − 5 = 5 cạnh, mỗi đỉnh bậc 2 và liên thông, nên lại là một C<sub>5</sub> (C<sub>5</sub> tự bù)." },
        ],
      },
      {
        id: "g-repr",
        title: "Biểu diễn đồ thị",
        theory: `
<table><tr><th>Cách</th><th>Bộ nhớ</th><th>Kiểm tra cạnh (u,v)</th><th>Duyệt kề của u</th></tr>
<tr><td>Ma trận kề A[n][n]</td><td>O(n²)</td><td>O(1)</td><td>O(n)</td></tr>
<tr><td>Danh sách kề</td><td>O(n + m)</td><td>O(deg u)</td><td>O(deg u)</td></tr>
<tr><td>Danh sách cạnh</td><td>O(m)</td><td>O(m)</td><td>O(m)</td></tr>
<tr><td>Ma trận liên thuộc n×m</td><td>O(nm)</td><td>O(m)</td><td>O(m)</td></tr></table>
<ul>
<li>Đồ thị vô hướng: ma trận kề đối xứng; tổng hàng i = deg(i).</li>
<li>Đồ thị có trọng số: A[i][j] = w(i,j), dùng ∞ (hoặc 0 tùy quy ước) nếu không có cạnh.</li>
<li><b>Tính chất</b>: phần tử (i, j) của A<sup>k</sup> bằng số đường đi độ dài k từ i đến j.</li>
<li>Đồ thị thưa (m nhỏ hơn nhiều so với n²) nên dùng danh sách kề; đồ thị dày hoặc cần Floyd thì dùng ma trận.</li>
</ul>`,
        code: `// Đọc n đỉnh, m cạnh vô hướng và dựng danh sách kề
int n, m;
cin >> n >> m;
vector<vector<int>> adj(n + 1);
for (int i = 0; i < m; i++) {
    int u, v;
    cin >> u >> v;
    adj[u].push_back(v);
    adj[v].push_back(u);   // bỏ dòng này nếu đồ thị có hướng
}`,
        exercises: [
          { q: "Đồ thị vô hướng 4 đỉnh có các cạnh 1–2, 1–3, 2–3, 3–4. Viết ma trận kề và danh sách kề. Đỉnh nào bậc lớn nhất?",
            a: "Ma trận: hàng 1 = [0 1 1 0], hàng 2 = [1 0 1 0], hàng 3 = [1 1 0 1], hàng 4 = [0 0 1 0]. Danh sách kề: 1: 2, 3; 2: 1, 3; 3: 1, 2, 4; 4: 3. Đỉnh 3 bậc lớn nhất (bậc 3)." },
          { q: "Với đồ thị trên, phần tử (1, 4) của A² bằng bao nhiêu? Ý nghĩa?",
            a: "A²[1][4] = Σ A[1][k]·A[k][4] = A[1][3]·A[3][4] = 1. Có đúng 1 đường đi độ dài 2 từ 1 đến 4 (1–3–4)." },
          { q: "Đồ thị 10.000 đỉnh, 30.000 cạnh nên dùng cách biểu diễn nào? Vì sao?",
            a: "Danh sách kề: tốn khoảng n + 2m = 70.000 ô nhớ, trong khi ma trận kề cần 10⁸ ô." },
        ],
      },
      {
        id: "g-connect",
        title: "Đường đi, chu trình, liên thông, đỉnh khớp, cầu",
        theory: `
<ul>
<li><b>Đường đi</b> độ dài k: dãy đỉnh v₀, v₁, …, v<sub>k</sub> với mỗi cặp liên tiếp kề nhau. <b>Đường đi đơn</b>: không lặp cạnh (sách khác: không lặp đỉnh, cần xem quy ước giảng viên). <b>Chu trình</b>: đường đi có v₀ = v<sub>k</sub>.</li>
<li><b>Liên thông</b>: mọi cặp đỉnh có đường đi. <b>Thành phần liên thông</b>: đồ thị con liên thông tối đại.</li>
<li><b>Đỉnh khớp</b>: xóa đỉnh làm tăng số thành phần liên thông. <b>Cầu</b>: xóa cạnh làm tăng số thành phần liên thông. Một cạnh là cầu khi và chỉ khi nó không nằm trên chu trình nào.</li>
<li>Có hướng: <b>liên thông mạnh</b> nếu u đến được v và v đến được u với mọi u, v; <b>liên thông yếu</b> nếu đồ thị vô hướng nền liên thông.</li>
<li>Đồ thị liên thông n đỉnh có ít nhất n − 1 cạnh.</li>
<li>Đơn đồ thị n đỉnh có m &gt; (n−1)(n−2)/2 thì chắc chắn liên thông.</li>
<li>Đơn đồ thị n đỉnh, k thành phần liên thông có tối đa (n−k)(n−k+1)/2 cạnh.</li>
</ul>`,
        exercises: [
          { q: "Đơn đồ thị 10 đỉnh, 37 cạnh có chắc chắn liên thông không?",
            a: "Có. (n−1)(n−2)/2 = 9·8/2 = 36 &lt; 37." },
          { q: "Tìm đỉnh khớp và cầu của đường P<sub>5</sub>: 1–2–3–4–5.",
            a: "Đỉnh khớp: 2, 3, 4. Cầu: cả 4 cạnh (cây nào cũng vậy: mọi cạnh là cầu)." },
          { q: "Đơn đồ thị 8 đỉnh có 3 thành phần liên thông có tối đa bao nhiêu cạnh?",
            a: "(n−k)(n−k+1)/2 = 5·6/2 = 15 (một thành phần K<sub>6</sub> và hai đỉnh cô lập)." },
        ],
      },
      {
        id: "g-bfs",
        title: "BFS (tìm kiếm theo chiều rộng)",
        theory: `
<p>BFS duyệt theo từng lớp khoảng cách bằng <b>hàng đợi</b>. Độ phức tạp O(n + m) với danh sách kề, O(n²) với ma trận kề.</p>
<ul>
<li>Trên đồ thị không trọng số, dist[v] mà BFS tìm được là <b>độ dài đường đi ngắn nhất</b> (số cạnh).</li>
<li>Lưu parent[v] để truy vết đường đi.</li>
<li>Ứng dụng: đếm thành phần liên thông, kiểm tra đồ thị hai phía (tô màu theo mức), đường đi ngắn nhất trên lưới.</li>
<li>Khi chạy tay: ghi rõ <b>trạng thái hàng đợi</b> sau mỗi bước, và duyệt đỉnh kề theo thứ tự tăng dần nếu đề không nói khác.</li>
</ul>`,
        code: `vector<int> dist(n + 1, -1), parent(n + 1, 0);
queue<int> q;
dist[s] = 0;
q.push(s);
while (!q.empty()) {
    int u = q.front(); q.pop();
    for (int v : adj[u]) {
        if (dist[v] == -1) {
            dist[v] = dist[u] + 1;
            parent[v] = u;
            q.push(v);
        }
    }
}`,
        exercises: [
          { q: "Đồ thị vô hướng có cạnh 1–2, 1–3, 2–4, 3–4, 4–5, 5–6. Chạy BFS từ 1 (kề tăng dần). Cho thứ tự thăm, dist và parent.",
            a: "Thứ tự: 1, 2, 3, 4, 5, 6. dist: 1:0, 2:1, 3:1, 4:2, 5:3, 6:4. parent: 2←1, 3←1, 4←2, 5←4, 6←5. Đường đi ngắn nhất 1→6: 1–2–4–5–6." },
          { q: "Mô tả cách dùng BFS kiểm tra một đồ thị có phải hai phía không.",
            a: "Tô màu đỉnh xuất phát 0, mỗi đỉnh mới thăm nhận màu ngược với cha. Nếu gặp cạnh (u, v) mà hai đầu cùng màu thì có chu trình lẻ, không phải hai phía. Làm cho từng thành phần liên thông." },
        ],
      },
      {
        id: "g-dfs",
        title: "DFS, thành phần liên thông, liên thông mạnh",
        theory: `
<p>DFS đi sâu nhất có thể rồi quay lui, dùng đệ quy hoặc ngăn xếp. O(n + m).</p>
<ul>
<li>Đếm thành phần liên thông: gọi DFS từ mỗi đỉnh chưa thăm, mỗi lần gọi là một thành phần.</li>
<li>Cạnh của DFS: cạnh cây, cạnh ngược (về tổ tiên, báo hiệu có chu trình), cạnh xuôi, cạnh chéo (đồ thị có hướng).</li>
<li><b>Tarjan</b> tìm khớp, cầu: num[u] là thời điểm thăm, low[u] là num nhỏ nhất đến được từ cây con của u qua tối đa một cạnh ngược. Cạnh (u, v) là cầu nếu low[v] &gt; num[u]. Đỉnh u (không phải gốc) là khớp nếu có con v với low[v] ≥ num[u]; gốc là khớp nếu có ≥ 2 con.</li>
<li><b>Thành phần liên thông mạnh</b>: Kosaraju (DFS lấy thứ tự kết thúc, đảo chiều cạnh, DFS lại theo thứ tự ngược) hoặc Tarjan. Cả hai O(n + m).</li>
</ul>`,
        code: `vector<bool> visited(n + 1, false);
void dfs(int u) {
    visited[u] = true;
    for (int v : adj[u])
        if (!visited[v]) dfs(v);
}

int components = 0;
for (int u = 1; u <= n; u++)
    if (!visited[u]) { components++; dfs(u); }`,
        exercises: [
          { q: "Với đồ thị bài BFS (1–2, 1–3, 2–4, 3–4, 4–5, 5–6), chạy DFS từ 1 (kề tăng dần). Thứ tự thăm?",
            a: "1, 2, 4, 3, 5, 6. Từ 1 sang 2, từ 2 sang 4, từ 4 sang 3 (đỉnh kề nhỏ nhất chưa thăm), 3 hết đường nên quay về 4, rồi sang 5, sang 6." },
          { q: "Đồ thị có hướng: 1→2, 2→3, 3→1, 3→4, 4→5, 5→4. Tìm các thành phần liên thông mạnh.",
            a: "{1, 2, 3} và {4, 5}. Từ {4, 5} không quay lại được 3." },
          { q: "Vì sao trong đồ thị vô hướng, DFS không tạo ra cạnh chéo?",
            a: "Nếu có cạnh (u, v) với v đã thăm xong ở nhánh khác, thì khi thăm v, DFS đã phải đi qua cạnh (v, u) và thăm u từ v. Vì vậy mọi cạnh không phải cạnh cây đều nối với tổ tiên." },
        ],
      },
      {
        id: "g-euler",
        title: "Đồ thị Euler",
        theory: `
<ul>
<li><b>Chu trình Euler</b>: đi qua mỗi cạnh đúng một lần và quay về đỉnh đầu. <b>Đường đi Euler</b>: đi qua mỗi cạnh đúng một lần.</li>
<li>Vô hướng, liên thông (bỏ qua đỉnh cô lập): có chu trình Euler khi và chỉ khi <b>mọi đỉnh bậc chẵn</b>; có đường đi Euler (không là chu trình) khi và chỉ khi có <b>đúng 2 đỉnh bậc lẻ</b>, đường đi bắt đầu và kết thúc ở hai đỉnh đó.</li>
<li>Có hướng, liên thông yếu: chu trình Euler khi deg⁺(v) = deg⁻(v) với mọi v; đường đi Euler khi có một đỉnh deg⁺ − deg⁻ = 1 (đầu), một đỉnh deg⁻ − deg⁺ = 1 (cuối), còn lại cân bằng.</li>
<li><b>Fleury</b>: từ đỉnh hiện tại, chọn cạnh không phải cầu của đồ thị còn lại, trừ khi không còn lựa chọn; xóa cạnh vừa đi. O(m²).</li>
<li><b>Hierholzer</b>: đi tới khi kẹt, ghép các chu trình con bằng ngăn xếp. O(m), nên dùng khi cài đặt.</li>
</ul>`,
        exercises: [
          { q: "K<sub>5</sub> và K<sub>4</sub> có chu trình Euler không?",
            a: "K<sub>5</sub>: mọi đỉnh bậc 4 (chẵn) nên có. K<sub>4</sub>: mọi đỉnh bậc 3, có 4 đỉnh bậc lẻ nên không có cả chu trình lẫn đường đi Euler." },
          { q: "K<sub>2,3</sub> có chu trình Euler không? Đường đi Euler?",
            a: "Hai đỉnh bên trái bậc 3, ba đỉnh bên phải bậc 2. Có đúng 2 đỉnh bậc lẻ nên có đường đi Euler (bắt đầu và kết thúc ở hai đỉnh bậc 3), không có chu trình Euler." },
          { q: "Bài toán 7 cây cầu Königsberg vì sao không giải được?",
            a: "Mô hình hóa 4 vùng đất thành 4 đỉnh, 7 cầu thành 7 cạnh: bậc là 5, 3, 3, 3, cả 4 đỉnh bậc lẻ, nên không có đường đi Euler." },
        ],
      },
      {
        id: "g-hamilton",
        title: "Đồ thị Hamilton",
        theory: `
<ul>
<li><b>Chu trình Hamilton</b>: đi qua mỗi đỉnh đúng một lần rồi quay về. Bài toán này là NP-đầy đủ, không có điều kiện cần và đủ đơn giản.</li>
<li><b>Dirac</b> (đủ): đơn đồ thị n ≥ 3 đỉnh, deg(v) ≥ n/2 với mọi v thì có chu trình Hamilton.</li>
<li><b>Ore</b> (đủ): đơn đồ thị n ≥ 3 đỉnh, deg(u) + deg(v) ≥ n với mọi cặp u, v không kề thì có chu trình Hamilton.</li>
<li>Dấu hiệu <b>không</b> có chu trình Hamilton: có đỉnh bậc 1; có đỉnh khớp; đồ thị hai phía với hai phía khác số đỉnh. K<sub>m,n</sub> có chu trình Hamilton khi và chỉ khi m = n ≥ 2.</li>
<li>Khi chứng minh không có: nếu đỉnh bậc 2, cả hai cạnh của nó buộc phải nằm trong chu trình; dùng điều này để suy ra mâu thuẫn.</li>
<li>Tìm bằng quay lui O(n!), hoặc quy hoạch động bitmask O(2ⁿ·n²).</li>
</ul>`,
        exercises: [
          { q: "K<sub>3,3</sub> và K<sub>2,3</sub> có chu trình Hamilton không?",
            a: "K<sub>3,3</sub>: có (a1–b1–a2–b2–a3–b3–a1). K<sub>2,3</sub>: không, chu trình phải đổi phía liên tục nên hai phía phải bằng nhau." },
          { q: "Tìm một chu trình Hamilton của Q<sub>3</sub>.",
            a: "Dùng mã Gray: 000–001–011–010–110–111–101–100–000. Hai đỉnh liên tiếp khác nhau đúng một bit nên kề nhau." },
          { q: "Đồ thị 6 đỉnh mà mọi đỉnh có bậc 3 có chắc có chu trình Hamilton theo Dirac không?",
            a: "n/2 = 3 và mọi deg(v) = 3 ≥ 3 nên theo Dirac, đồ thị (đơn) chắc chắn có chu trình Hamilton." },
        ],
      },
      {
        id: "g-tree",
        title: "Cây, cây có gốc, duyệt cây",
        theory: `
<ul>
<li><b>Cây</b>: đồ thị vô hướng liên thông, không có chu trình. Các phát biểu tương đương với cây n đỉnh: liên thông và có n − 1 cạnh; không chu trình và có n − 1 cạnh; giữa hai đỉnh bất kỳ có đúng một đường đi đơn; liên thông và mọi cạnh là cầu; thêm một cạnh bất kỳ tạo đúng một chu trình.</li>
<li><b>Rừng</b> gồm k cây, n đỉnh có n − k cạnh.</li>
<li><b>Cây m-phân đầy đủ</b> (mỗi đỉnh trong có đúng m con) với i đỉnh trong: n = m·i + 1 đỉnh, l = (m − 1)·i + 1 lá. Cây m-phân chiều cao h có tối đa m<sup>h</sup> lá.</li>
<li>Duyệt: <b>tiền thứ tự</b> (gốc, trái, phải), <b>trung thứ tự</b> (trái, gốc, phải), <b>hậu thứ tự</b> (trái, phải, gốc). Cây biểu thức: tiền thứ tự cho ký pháp Ba Lan, hậu thứ tự cho ký pháp Ba Lan ngược.</li>
<li><b>Cayley</b>: số cây khung của K<sub>n</sub> là n<sup>n−2</sup>.</li>
</ul>`,
        exercises: [
          { q: "Cây nhị phân đầy đủ có 20 lá. Có bao nhiêu đỉnh trong, bao nhiêu đỉnh?",
            a: "l = (m−1)i + 1 với m = 2: 20 = i + 1, nên i = 19 đỉnh trong, n = 2·19 + 1 = 39 đỉnh." },
          { q: "Viết tiền, trung, hậu thứ tự của cây biểu thức (a + b) * (c − d).",
            a: "Tiền thứ tự: * + a b − c d. Trung thứ tự: a + b * c − d (cần thêm ngoặc khi viết lại). Hậu thứ tự: a b + c d − *." },
          { q: "K<sub>4</sub> có bao nhiêu cây khung? Rừng 3 cây với tổng 12 đỉnh có bao nhiêu cạnh?",
            a: "4² = 16 cây khung. Rừng có 12 − 3 = 9 cạnh." },
        ],
      },
      {
        id: "g-mst",
        title: "Cây khung nhỏ nhất: Kruskal, Prim",
        theory: `
<ul>
<li><b>Cây khung nhỏ nhất</b> (MST) của đồ thị liên thông có trọng số: cây khung có tổng trọng số nhỏ nhất.</li>
<li><b>Tính chất cắt</b>: với mọi cách chia đỉnh thành hai phần, cạnh nhẹ nhất nối hai phần thuộc một MST nào đó. Cả Kruskal và Prim đều dựa trên điều này.</li>
<li><b>Kruskal</b>: sắp xếp cạnh tăng dần, lần lượt thêm cạnh nếu không tạo chu trình (kiểm tra bằng DSU). O(m log m). Hợp với đồ thị thưa, cho dạng danh sách cạnh.</li>
<li><b>Prim</b>: bắt đầu từ một đỉnh, mỗi bước thêm cạnh nhẹ nhất nối cây đang có với một đỉnh ngoài cây. O(n²) với mảng, O(m log n) với heap. Hợp với đồ thị dày, cho dạng ma trận.</li>
<li>Nếu các trọng số đôi một khác nhau, MST là duy nhất.</li>
<li>Khi chạy tay Prim, lập bảng: mỗi cột là một đỉnh, ghi (khoảng cách tới cây, đỉnh nối) sau mỗi bước.</li>
</ul>`,
        code: `// Kruskal với DSU
vector<int> par(n + 1);
iota(par.begin(), par.end(), 0);
function<int(int)> find = [&](int x) { return par[x] == x ? x : par[x] = find(par[x]); };

sort(edges.begin(), edges.end());          // edges: {w, u, v}
long long total = 0;
for (auto [w, u, v] : edges) {
    int a = find(u), b = find(v);
    if (a != b) { par[a] = b; total += w; }
}`,
        exercises: [
          { q: "Đồ thị: AB 4, AC 1, BC 2, BD 5, CD 8, CE 10, DE 2, DF 6, EF 3. Tìm MST bằng Kruskal.",
            a: "Sắp xếp: AC1, BC2, DE2, EF3, AB4, BD5, DF6, CD8, CE10. Chọn AC1, BC2, DE2, EF3; bỏ AB4 (A, B đã cùng cây qua C); chọn BD5 (nối {A, B, C} với {D, E, F}). Đủ 5 cạnh. Tổng = 13." },
          { q: "Cùng đồ thị trên, chạy Prim từ A. Thứ tự thêm cạnh?",
            a: "AC1, CB2, BD5, DE2, EF3. Tổng 13, trùng với Kruskal." },
          { q: "Khi nào chọn Prim thay vì Kruskal?",
            a: "Khi đồ thị dày (m gần n²) hoặc cho bằng ma trận kề: Prim O(n²) không cần sắp xếp m cạnh." },
        ],
      },
      {
        id: "g-dijkstra",
        title: "Đường đi ngắn nhất: Dijkstra",
        theory: `
<ul>
<li>Bài toán một nguồn, <b>trọng số không âm</b>.</li>
<li>Mỗi bước lấy đỉnh u chưa cố định có d[u] nhỏ nhất, cố định u, rồi <b>nới lỏng</b> các cạnh (u, v): nếu d[u] + w &lt; d[v] thì d[v] = d[u] + w, trước[v] = u.</li>
<li>O(n²) với mảng, O((n + m) log n) với hàng đợi ưu tiên.</li>
<li>Sai khi có cạnh âm: đỉnh đã cố định có thể còn được cải thiện về sau.</li>
<li>Khi chạy tay: lập bảng mỗi hàng là một bước, mỗi cột là một đỉnh, ghi (d, trước); đánh dấu * đỉnh được cố định.</li>
</ul>`,
        code: `vector<long long> d(n + 1, LLONG_MAX);
priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
d[s] = 0;
pq.push({0, s});
while (!pq.empty()) {
    auto [du, u] = pq.top(); pq.pop();
    if (du != d[u]) continue;            // bản ghi cũ
    for (auto [v, w] : adj[u])
        if (d[u] + w < d[v]) {
            d[v] = d[u] + w;
            pq.push({d[v], v});
        }
}`,
        exercises: [
          { q: "Đồ thị có hướng: S→A 4, S→B 1, B→A 2, A→C 1, B→C 5, C→D 3, B→D 8. Chạy Dijkstra từ S.",
            a: "Cố định lần lượt: S(0); B(1), cập nhật A = 3, C = 6, D = 9; A(3), cập nhật C = 4; C(4), cập nhật D = 7; D(7). Kết quả A = 3, B = 1, C = 4, D = 7. Đường đi tới D: S→B→A→C→D." },
          { q: "Cho ví dụ Dijkstra cho kết quả sai khi có cạnh âm.",
            a: "S→A 2, S→B 3, B→A −2. Dijkstra cố định A = 2 trước khi xét B, nhưng đường S→B→A dài 1." },
        ],
      },
      {
        id: "g-bellman",
        title: "Bellman-Ford, chu trình âm",
        theory: `
<ul>
<li>Một nguồn, cho phép <b>cạnh âm</b>. Lặp n − 1 lần: nới lỏng tất cả các cạnh. O(n·m).</li>
<li>Sau n − 1 vòng, nếu còn cạnh nới lỏng được thì đồ thị có <b>chu trình âm</b> đến được từ nguồn (đường đi ngắn nhất không xác định).</li>
<li>Có thể dừng sớm khi một vòng không có thay đổi.</li>
<li>Khi chạy tay, kết quả từng vòng phụ thuộc thứ tự xét cạnh; ghi rõ thứ tự đề cho.</li>
</ul>`,
        code: `vector<long long> d(n + 1, INF);
d[s] = 0;
for (int i = 1; i < n; i++)
    for (auto [u, v, w] : edges)
        if (d[u] != INF && d[u] + w < d[v]) d[v] = d[u] + w;

bool negativeCycle = false;
for (auto [u, v, w] : edges)
    if (d[u] != INF && d[u] + w < d[v]) negativeCycle = true;`,
        exercises: [
          { q: "Cạnh theo thứ tự: S→A 4, S→B 5, B→A −3, A→C 2. Chạy Bellman-Ford từ S.",
            a: "Vòng 1: A = 4, B = 5, rồi A = min(4, 5 − 3) = 2, C = 2 + 2 = 4. Vòng 2 không đổi nên dừng. A = 2, B = 5, C = 4." },
          { q: "Đồ thị A→B 1, B→C −2, C→A −1 có chu trình âm không?",
            a: "Có: A→B→C→A có tổng 1 − 2 − 1 = −2 &lt; 0." },
        ],
      },
      {
        id: "g-floyd",
        title: "Floyd-Warshall",
        theory: `
<ul>
<li>Mọi cặp đỉnh, cho phép cạnh âm (không có chu trình âm). O(n³), bộ nhớ O(n²).</li>
<li>Công thức: với k = 1..n, D[i][j] = min(D[i][j], D[i][k] + D[k][j]). Vòng k phải ở ngoài cùng.</li>
<li>Truy vết: lưu next[i][j] (đỉnh kế sau i trên đường đi tới j), cập nhật next[i][j] = next[i][k] khi cải thiện.</li>
<li>Có chu trình âm khi D[i][i] &lt; 0 sau khi chạy xong.</li>
<li>Khi chạy tay: viết ma trận D<sup>(0)</sup>, D<sup>(1)</sup>, …; ở bước k, hàng k và cột k giữ nguyên.</li>
</ul>`,
        code: `for (int k = 1; k <= n; k++)
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            if (D[i][k] < INF && D[k][j] < INF && D[i][k] + D[k][j] < D[i][j])
                D[i][j] = D[i][k] + D[k][j];`,
        exercises: [
          { q: "Đồ thị có hướng 3 đỉnh: 1→2 3, 2→3 2, 1→3 7, 3→1 1. Chạy Floyd.",
            a: "D⁰: [0 3 7; ∞ 0 2; 1 ∞ 0]. k=1: D[3][2] = 1 + 3 = 4. k=2: D[1][3] = 3 + 2 = 5. k=3: D[2][1] = 2 + 1 = 3. Kết quả: [0 3 5; 3 0 2; 1 4 0]." },
          { q: "Vì sao không thể đặt vòng lặp k vào trong cùng?",
            a: "Khi đó D[i][k] và D[k][j] chưa được tính với các đỉnh trung gian nhỏ hơn, nên mất tính đúng của quy hoạch động theo tập đỉnh trung gian {1..k}." },
        ],
      },
      {
        id: "g-topo",
        title: "Sắp xếp tôpô, DAG",
        theory: `
<ul>
<li>Thứ tự tôpô của đồ thị có hướng: mọi cạnh u→v có u đứng trước v. Tồn tại khi và chỉ khi đồ thị <b>không có chu trình</b> (DAG).</li>
<li><b>Kahn</b>: đưa các đỉnh bán bậc vào 0 vào hàng đợi, lấy ra, giảm bán bậc vào của đỉnh kề. Nếu cuối cùng còn đỉnh chưa lấy, đồ thị có chu trình. O(n + m).</li>
<li><b>DFS</b>: thứ tự giảm dần theo thời điểm kết thúc.</li>
<li>Ứng dụng: lập lịch công việc có ràng buộc, thứ tự môn học tiên quyết, đường đi dài nhất trên DAG (quy hoạch động theo thứ tự tôpô).</li>
</ul>`,
        exercises: [
          { q: "Công việc: A→C, B→C, C→D, B→E, E→D. Sắp xếp tôpô bằng Kahn (ưu tiên chữ cái nhỏ).",
            a: "Bán bậc vào: A0, B0, C2, D2, E1. Lấy A (C còn 1), lấy B (C = 0, E = 0), lấy C (D còn 1), lấy E (D = 0), lấy D. Thứ tự: A, B, C, E, D." },
          { q: "Đồ thị 1→2, 2→3, 3→1 có thứ tự tôpô không?",
            a: "Không, có chu trình 1→2→3→1; Kahn không có đỉnh nào bán bậc vào 0 để bắt đầu." },
        ],
      },
      {
        id: "g-flow",
        title: "Luồng cực đại, lát cắt hẹp nhất",
        theory: `
<ul>
<li>Mạng: đồ thị có hướng, nguồn s, đích t, khả năng thông qua c(u,v) ≥ 0. Luồng f thỏa 0 ≤ f ≤ c và bảo toàn tại mọi đỉnh trừ s, t.</li>
<li><b>Đồ thị thặng dư</b>: cạnh thuận còn c − f, cạnh ngược f. <b>Đường tăng luồng</b>: đường từ s đến t trên đồ thị thặng dư; tăng luồng thêm bằng khả năng nhỏ nhất trên đường.</li>
<li><b>Ford-Fulkerson</b>: lặp tìm đường tăng tới khi hết. <b>Edmonds-Karp</b>: chọn đường tăng ngắn nhất bằng BFS, O(n·m²).</li>
<li><b>Định lý luồng cực đại, lát cắt hẹp nhất</b>: giá trị luồng cực đại = khả năng thông qua nhỏ nhất của một lát cắt (S, T) với s ∈ S, t ∈ T. Khi thuật toán dừng, S là tập đỉnh đến được từ s trên đồ thị thặng dư.</li>
<li>Khả năng của lát cắt chỉ tính các cạnh đi từ S sang T.</li>
</ul>`,
        exercises: [
          { q: "Mạng: s→a 3, s→b 2, a→b 1, a→t 2, b→t 3. Tìm luồng cực đại và một lát cắt hẹp nhất.",
            a: "Đường tăng: s→a→t (2), s→b→t (2), s→a→b→t (1). Luồng cực đại = 5. Lát cắt S = {s}: c = 3 + 2 = 5 (hoặc lát cắt T = {t}: 2 + 3 = 5)." },
          { q: "Vì sao cần cạnh ngược trong đồ thị thặng dư?",
            a: "Để có thể 'hoàn tác' một phần luồng đã đẩy sai hướng; nếu không, thuật toán tham lam có thể dừng ở luồng chưa cực đại." },
        ],
      },
      {
        id: "g-bipartite",
        title: "Đồ thị hai phía, ghép cặp",
        theory: `
<ul>
<li>Đồ thị <b>hai phía</b> khi tập đỉnh chia được thành X, Y sao cho mọi cạnh nối X với Y. Tương đương: <b>không có chu trình độ dài lẻ</b>. Kiểm tra bằng BFS/DFS tô 2 màu.</li>
<li><b>Ghép cặp</b>: tập cạnh không chung đỉnh. Ghép cặp cực đại có nhiều cạnh nhất; ghép cặp hoàn hảo phủ mọi đỉnh.</li>
<li><b>Định lý Hall</b>: có ghép cặp phủ toàn bộ X khi và chỉ khi |N(A)| ≥ |A| với mọi A ⊆ X.</li>
<li><b>Định lý König</b>: trong đồ thị hai phía, kích thước ghép cặp cực đại = kích thước phủ đỉnh nhỏ nhất.</li>
<li>Thuật toán: đường tăng xen kẽ (Kuhn) O(n·m), hoặc quy về luồng cực đại (thêm s nối X, Y nối t, mọi khả năng 1).</li>
</ul>`,
        exercises: [
          { q: "C<sub>6</sub> và C<sub>5</sub> có phải đồ thị hai phía không?",
            a: "C<sub>6</sub>: có (chu trình chẵn, tô xen kẽ). C<sub>5</sub>: không (chu trình lẻ)." },
          { q: "Nhân viên W1 làm được J1, J2; W2 làm được J1; W3 làm được J2, J3. Tìm ghép cặp cực đại.",
            a: "W2–J1, W1–J2, W3–J3: 3 cặp, là ghép cặp hoàn hảo." },
          { q: "X = {x1, x2, x3}, N(x1) = N(x2) = {y1}, N(x3) = {y2, y3}. Có ghép cặp phủ X không?",
            a: "Không. Với A = {x1, x2}, |N(A)| = 1 &lt; 2, vi phạm điều kiện Hall." },
        ],
      },
      {
        id: "g-coloring",
        title: "Tô màu, đồ thị phẳng, công thức Euler",
        theory: `
<ul>
<li><b>Sắc số</b> χ(G): số màu ít nhất để hai đỉnh kề khác màu. χ(K<sub>n</sub>) = n; đồ thị hai phía có cạnh: χ = 2; chu trình lẻ: χ = 3; χ ≤ Δ + 1 (Δ là bậc lớn nhất).</li>
<li><b>Welsh-Powell</b> (tham lam): sắp đỉnh theo bậc giảm dần, lần lượt gán màu nhỏ nhất hợp lệ. Cho cận trên, không chắc tối ưu.</li>
<li><b>Đồ thị phẳng</b>: vẽ được trên mặt phẳng không có cạnh cắt nhau. <b>Công thức Euler</b> (liên thông): v − e + f = 2.</li>
<li>Hệ quả cho đơn đồ thị phẳng liên thông v ≥ 3: e ≤ 3v − 6; nếu không có tam giác: e ≤ 2v − 4. Luôn có đỉnh bậc ≤ 5.</li>
<li><b>Kuratowski</b>: đồ thị phẳng khi và chỉ khi không chứa đồ thị con đồng phôi với K<sub>5</sub> hoặc K<sub>3,3</sub>.</li>
<li><b>Định lý 4 màu</b>: mọi đồ thị phẳng có χ ≤ 4.</li>
</ul>`,
        exercises: [
          { q: "Chứng minh K<sub>5</sub> và K<sub>3,3</sub> không phẳng.",
            a: "K<sub>5</sub>: e = 10 &gt; 3·5 − 6 = 9. K<sub>3,3</sub>: không có tam giác (hai phía), e = 9 &gt; 2·6 − 4 = 8." },
          { q: "Đồ thị phẳng liên thông 8 đỉnh, 12 cạnh chia mặt phẳng thành mấy miền?",
            a: "f = 2 − v + e = 2 − 8 + 12 = 6." },
          { q: "Tính χ(C<sub>7</sub>) và χ(W<sub>5</sub>) (5 đỉnh vành và 1 đỉnh tâm).",
            a: "χ(C<sub>7</sub>) = 3 (chu trình lẻ). W<sub>5</sub>: vành C<sub>5</sub> cần 3 màu, tâm kề tất cả nên cần màu thứ 4: χ = 4." },
        ],
      },
      {
        id: "g-review",
        title: "Ôn thi: cách làm bài và lỗi hay gặp",
        theory: `
<ul>
<li>Mỗi bài chạy tay thuật toán (BFS, DFS, Prim, Dijkstra, Floyd, luồng): <b>vẽ bảng trạng thái từng bước</b>, ghi rõ đỉnh nào được chọn và vì sao. Đáp số đúng mà thiếu các bước thường mất nửa số điểm.</li>
<li>Câu chứng minh: nêu định nghĩa, dùng định lý bắt tay, đếm bậc, hoặc phản chứng. Bài "có tồn tại không" thường giải bằng tổng bậc lẻ hoặc công thức Euler.</li>
<li>Lỗi hay gặp: quên đỉnh cô lập khi xét Euler; nhầm Dirac (n/2) với Ore (n); dùng Dijkstra khi có cạnh âm; quên cạnh ngược khi tìm đường tăng luồng; tính lát cắt cộng cả cạnh từ T về S.</li>
<li>Thuộc độ phức tạp: BFS/DFS O(n + m); Kruskal O(m log m); Prim O(n²) hoặc O(m log n); Dijkstra O(m log n); Bellman-Ford O(nm); Floyd O(n³); Edmonds-Karp O(nm²).</li>
</ul>`,
        exercises: [
          { q: "Liệt kê điều kiện để dùng được từng thuật toán đường đi ngắn nhất.",
            a: "BFS: không trọng số. Dijkstra: trọng số không âm. Bellman-Ford: cho phép âm, phát hiện chu trình âm. Floyd: mọi cặp, cho phép âm nếu không có chu trình âm. DAG: quy hoạch động theo thứ tự tôpô, cho phép âm." },
        ],
      },
    ],
  };

  C.oop = {
    name: "Lập trình hướng đối tượng",
    topics: [
      {
        id: "o-class",
        title: "Lớp và đối tượng",
        theory: `
<ul>
<li><b>Lớp</b> (class) là bản thiết kế gồm <b>thuộc tính</b> (dữ liệu) và <b>phương thức</b> (hành vi). <b>Đối tượng</b> là một thể hiện cụ thể của lớp.</li>
<li>Bốn tính chất của OOP: <b>đóng gói</b>, <b>kế thừa</b>, <b>đa hình</b>, <b>trừu tượng</b>. Câu hỏi lý thuyết hay yêu cầu nêu định nghĩa kèm ví dụ cho từng tính chất.</li>
<li>C++: struct mặc định public, class mặc định private. Java: mọi thứ nằm trong class, đối tượng luôn tạo bằng new và nằm trên heap.</li>
</ul>`,
        code: `class SinhVien {
private:
    string maSV, hoTen;
    double diemTB;
public:
    SinhVien(string ma, string ten, double diem)
        : maSV(ma), hoTen(ten), diemTB(diem) {}
    string xepLoai() const {
        if (diemTB >= 8.5) return "Gioi";
        if (diemTB >= 7.0) return "Kha";
        if (diemTB >= 5.0) return "Trung binh";
        return "Yeu";
    }
    void xuat() const { cout << maSV << " " << hoTen << " " << xepLoai() << "\\n"; }
};

int main() {
    SinhVien a("SV01", "Nguyen An", 8.7);
    a.xuat();
}`,
        exercises: [
          { q: "Viết lớp Diem (x, y) có hàm tạo, hàm khoangCach(const Diem&) và hàm xuat().",
            a: `<pre><code>class Diem {
    double x, y;
public:
    Diem(double x = 0, double y = 0) : x(x), y(y) {}
    double khoangCach(const Diem& d) const {
        return sqrt((x - d.x) * (x - d.x) + (y - d.y) * (y - d.y));
    }
    void xuat() const { cout << "(" << x << ", " << y << ")"; }
};</code></pre>` },
          { q: "Phân biệt lớp và đối tượng bằng một ví dụ ngoài đời.",
            a: "Lớp là bản vẽ thiết kế nhà (mô tả có bao nhiêu phòng, cửa ở đâu); đối tượng là từng ngôi nhà cụ thể được xây theo bản vẽ đó, mỗi nhà có địa chỉ và màu sơn riêng." },
        ],
      },
      {
        id: "o-encap",
        title: "Đóng gói, phạm vi truy cập",
        theory: `
<ul>
<li><b>Đóng gói</b>: gom dữ liệu và thao tác vào một lớp, che giấu dữ liệu bên trong, chỉ cho truy cập qua phương thức. Lợi ích: bảo vệ tính hợp lệ của dữ liệu, thay đổi cài đặt bên trong không ảnh hưởng nơi dùng.</li>
<li>Phạm vi: <b>private</b> (chỉ trong lớp), <b>protected</b> (lớp và lớp con), <b>public</b> (mọi nơi). Java có thêm mặc định (package-private).</li>
<li>Getter/setter nên <b>kiểm tra dữ liệu</b>, không chỉ gán thẳng. Getter khai báo const trong C++.</li>
<li><b>friend</b> (C++) cho hàm/lớp khác truy cập private; dùng ít, thường cho toán tử &lt;&lt;.</li>
</ul>`,
        code: `class TaiKhoan {
private:
    string soTK;
    double soDu = 0;
public:
    explicit TaiKhoan(string so) : soTK(so) {}
    double getSoDu() const { return soDu; }
    void napTien(double x) {
        if (x <= 0) throw invalid_argument("So tien phai duong");
        soDu += x;
    }
    bool rutTien(double x) {
        if (x <= 0 || x > soDu) return false;
        soDu -= x;
        return true;
    }
};`,
        exercises: [
          { q: "Vì sao không nên để soDu là public?",
            a: "Code bên ngoài có thể gán soDu âm hoặc sửa tùy ý, bỏ qua kiểm tra trong napTien/rutTien. Đóng gói buộc mọi thay đổi đi qua phương thức có kiểm tra." },
          { q: "Viết lớp HinhChuNhat có dài, rộng private; setter từ chối giá trị ≤ 0; có hàm dienTich, chuVi.",
            a: `<pre><code>class HinhChuNhat {
    double dai = 1, rong = 1;
public:
    bool setDai(double d) { if (d <= 0) return false; dai = d; return true; }
    bool setRong(double r) { if (r <= 0) return false; rong = r; return true; }
    double dienTich() const { return dai * rong; }
    double chuVi() const { return 2 * (dai + rong); }
};</code></pre>` },
        ],
      },
      {
        id: "o-ctor",
        title: "Hàm tạo, hàm hủy, hàm tạo sao chép",
        theory: `
<ul>
<li><b>Hàm tạo</b> trùng tên lớp, không kiểu trả về, chạy khi tạo đối tượng. Có hàm tạo mặc định, có tham số, sao chép. Nên dùng <b>danh sách khởi tạo</b> (: a(x), b(y)).</li>
<li><b>Hàm hủy</b> ~TenLop() chạy khi đối tượng bị hủy (ra khỏi phạm vi, delete). Dùng để giải phóng tài nguyên.</li>
<li><b>Hàm tạo sao chép</b> TenLop(const TenLop&amp;) chạy khi khởi tạo từ đối tượng khác, truyền tham trị, trả về theo giá trị.</li>
<li>Sao chép mặc định là <b>sao chép nông</b>: copy con trỏ, hai đối tượng dùng chung vùng nhớ, gây lỗi giải phóng hai lần. Lớp có con trỏ cấp phát động cần <b>sao chép sâu</b>.</li>
<li><b>Quy tắc 3</b>: nếu tự viết một trong hàm hủy, hàm tạo sao chép, toán tử gán, thì cần viết cả ba (C++11: quy tắc 5, thêm move).</li>
<li>Java không có hàm hủy; bộ thu gom rác tự giải phóng. Sao chép đối tượng qua hàm tạo sao chép tự viết hoặc clone().</li>
</ul>`,
        code: `class MangSo {
    int* a;
    int n;
public:
    MangSo(int n) : a(new int[n]()), n(n) {}
    MangSo(const MangSo& o) : a(new int[o.n]), n(o.n) {   // sao chép sâu
        copy(o.a, o.a + n, a);
    }
    MangSo& operator=(const MangSo& o) {
        if (this != &o) {
            delete[] a;
            n = o.n;
            a = new int[n];
            copy(o.a, o.a + n, a);
        }
        return *this;
    }
    ~MangSo() { delete[] a; }
};`,
        exercises: [
          { q: `Đoạn code in ra gì?<pre><code>struct A {
    A() { cout << "A "; }
    A(const A&) { cout << "C "; }
    ~A() { cout << "~A "; }
};
void f(A x) {}
int main() { A a; f(a); }</code></pre>`,
            a: "<code>A C ~A ~A</code>. Tạo a in A; truyền tham trị gọi hàm tạo sao chép in C; x bị hủy khi f kết thúc in ~A; a bị hủy cuối main in ~A." },
          { q: "Điều gì xảy ra nếu MangSo ở trên không tự viết hàm tạo sao chép?",
            a: "Bản sao dùng chung con trỏ a với bản gốc. Khi cả hai bị hủy, delete[] chạy hai lần trên cùng vùng nhớ, gây lỗi; sửa phần tử ở bản này cũng làm thay đổi bản kia." },
        ],
      },
      {
        id: "o-static",
        title: "Thành viên static, this, const",
        theory: `
<ul>
<li><b>Thuộc tính static</b>: dùng chung cho mọi đối tượng của lớp (ví dụ đếm số đối tượng). C++ cần định nghĩa ngoài lớp: int Lop::dem = 0; (hoặc inline static từ C++17).</li>
<li><b>Phương thức static</b>: gọi qua tên lớp, không có con trỏ this, chỉ truy cập được thành viên static.</li>
<li><b>this</b>: con trỏ tới đối tượng đang gọi phương thức. Dùng để phân biệt tham số trùng tên, hoặc trả về *this để gọi nối tiếp.</li>
<li><b>Phương thức const</b>: không được sửa thuộc tính; đối tượng const chỉ gọi được phương thức const.</li>
</ul>`,
        code: `class NhanVien {
    static int soLuong;
    string ten;
public:
    NhanVien(string ten) { this->ten = ten; soLuong++; }
    ~NhanVien() { soLuong--; }
    static int getSoLuong() { return soLuong; }
};
int NhanVien::soLuong = 0;`,
        exercises: [
          { q: "Vì sao phương thức static không truy cập được thuộc tính thường?",
            a: "Phương thức static gắn với lớp chứ không gắn với đối tượng nào, nên không có this để biết đang truy cập thuộc tính của đối tượng nào." },
          { q: "Viết lớp có hàm static tạo mã tự tăng NV001, NV002, …",
            a: `<pre><code>class NhanVien {
    static int dem;
    string ma;
public:
    NhanVien() { ma = taoMa(); }
    static string taoMa() {
        ++dem;
        char buf[8];
        snprintf(buf, sizeof buf, "NV%03d", dem);
        return buf;
    }
};
int NhanVien::dem = 0;</code></pre>` },
        ],
      },
      {
        id: "o-operator",
        title: "Nạp chồng toán tử (C++), equals/toString (Java)",
        theory: `
<ul>
<li>C++ cho phép định nghĩa lại toán tử cho kiểu tự tạo: +, −, ==, &lt;, [], &lt;&lt;, &gt;&gt;, =, ++.</li>
<li>Toán tử hai ngôi đối xứng (+, ==) nên viết dạng hàm ngoài lớp (hoặc friend) để hai vế được đối xử như nhau. &lt;&lt; và &gt;&gt; bắt buộc là hàm ngoài vì vế trái là stream.</li>
<li>Không đổi được độ ưu tiên, số ngôi; không nạp chồng được :: . .* ?: sizeof.</li>
<li>++ tiền tố: T&amp; operator++(); hậu tố: T operator++(int).</li>
<li>Java không nạp chồng toán tử; ghi đè <b>equals</b>, <b>hashCode</b>, <b>toString</b>, cài <b>Comparable</b> để so sánh.</li>
</ul>`,
        code: `class PhanSo {
    int tu, mau;
    void rutGon() {
        int g = gcd(abs(tu), abs(mau));
        if (g) { tu /= g; mau /= g; }
        if (mau < 0) { tu = -tu; mau = -mau; }
    }
public:
    PhanSo(int t = 0, int m = 1) : tu(t), mau(m) {
        if (m == 0) throw invalid_argument("Mau bang 0");
        rutGon();
    }
    friend PhanSo operator+(const PhanSo& a, const PhanSo& b) {
        return PhanSo(a.tu * b.mau + b.tu * a.mau, a.mau * b.mau);
    }
    friend bool operator==(const PhanSo& a, const PhanSo& b) {
        return a.tu == b.tu && a.mau == b.mau;
    }
    friend ostream& operator<<(ostream& os, const PhanSo& p) {
        return os << p.tu << "/" << p.mau;
    }
};`,
        exercises: [
          { q: "Thêm toán tử * và &lt; cho PhanSo.",
            a: `<pre><code>friend PhanSo operator*(const PhanSo& a, const PhanSo& b) {
    return PhanSo(a.tu * b.tu, a.mau * b.mau);
}
friend bool operator<(const PhanSo& a, const PhanSo& b) {
    return (long long)a.tu * b.mau < (long long)b.tu * a.mau;   // mẫu luôn dương
}</code></pre>` },
          { q: "Vì sao operator&lt;&lt; trả về ostream&amp;?",
            a: "Để viết nối tiếp được: cout << a << b; mỗi lần gọi trả về chính stream cho lần gọi sau." },
        ],
      },
      {
        id: "o-inherit",
        title: "Kế thừa",
        theory: `
<ul>
<li>Lớp con kế thừa thuộc tính và phương thức của lớp cha, thêm hoặc sửa hành vi. Quan hệ <b>"là một"</b> (is-a): SinhVien là một Nguoi.</li>
<li>C++ có kế thừa public, protected, private. Hầu như luôn dùng public: thành viên public của cha vẫn là public ở con.</li>
<li><b>Thứ tự gọi</b>: hàm tạo lớp cha chạy trước, rồi đến lớp con; hàm hủy theo thứ tự ngược lại. Gọi hàm tạo cha trong danh sách khởi tạo: Con(...) : Cha(...).</li>
<li>C++ có <b>đa kế thừa</b>; vấn đề kim cương được giải bằng kế thừa ảo (virtual public). Java chỉ đơn kế thừa lớp, nhưng cài được nhiều interface.</li>
<li>Kế thừa tạo phụ thuộc chặt; nếu chỉ là "có một" (has-a) thì dùng hợp thành.</li>
</ul>`,
        code: `class Nguoi {
protected:
    string hoTen;
public:
    Nguoi(string ten) : hoTen(ten) { cout << "Nguoi "; }
    ~Nguoi() { cout << "~Nguoi "; }
};

class SinhVien : public Nguoi {
    string maSV;
public:
    SinhVien(string ten, string ma) : Nguoi(ten), maSV(ma) { cout << "SinhVien "; }
    ~SinhVien() { cout << "~SinhVien "; }
};

int main() { SinhVien s("An", "SV01"); }
// In: Nguoi SinhVien ~SinhVien ~Nguoi`,
        exercises: [
          { q: "Lớp C kế thừa B, B kế thừa A, mỗi lớp in tên trong hàm tạo và ~tên trong hàm hủy. Tạo một đối tượng C trong main thì in gì?",
            a: "<code>A B C ~C ~B ~A</code>." },
          { q: "Khi nào dùng protected thay vì private cho thuộc tính lớp cha?",
            a: "Khi lớp con cần truy cập trực tiếp. Tuy vậy protected làm lớp con phụ thuộc vào cài đặt của cha; thường nên để private và cung cấp phương thức protected." },
        ],
      },
      {
        id: "o-override",
        title: "Ghi đè phương thức, gọi hàm lớp cha",
        theory: `
<ul>
<li><b>Nạp chồng</b> (overload): cùng tên, khác tham số, trong cùng phạm vi; quyết định lúc biên dịch.</li>
<li><b>Ghi đè</b> (override): lớp con định nghĩa lại phương thức cùng chữ ký của lớp cha. Trong C++, chỉ là đa hình thật khi phương thức cha là <b>virtual</b>; nên thêm từ khóa override để trình biên dịch kiểm tra.</li>
<li>Gọi bản của cha: Cha::phuongThuc() (C++), super.phuongThuc() (Java).</li>
<li><b>Che tên</b> (C++): khai báo hàm cùng tên ở lớp con sẽ che mọi bản nạp chồng cùng tên của cha; dùng using Cha::ten; để lấy lại.</li>
</ul>`,
        code: `class NhanVien {
protected:
    double luongCB;
public:
    NhanVien(double l) : luongCB(l) {}
    virtual double tinhLuong() const { return luongCB; }
    virtual ~NhanVien() = default;
};

class QuanLy : public NhanVien {
    double phuCap;
public:
    QuanLy(double l, double pc) : NhanVien(l), phuCap(pc) {}
    double tinhLuong() const override {
        return NhanVien::tinhLuong() * 1.5 + phuCap;   // gọi bản của lớp cha
    }
};`,
        exercises: [
          { q: "Phân biệt nạp chồng và ghi đè (3 ý).",
            a: "Nạp chồng: cùng lớp, khác danh sách tham số, chọn lúc biên dịch. Ghi đè: giữa lớp cha và con, cùng chữ ký, chọn lúc chạy (khi virtual). Nạp chồng không cần kế thừa; ghi đè thì cần." },
          { q: "Thêm lớp NhanVienThoiVu tính lương = số giờ × đơn giá, ghi đè tinhLuong.",
            a: `<pre><code>class NhanVienThoiVu : public NhanVien {
    int soGio; double donGia;
public:
    NhanVienThoiVu(int g, double d) : NhanVien(0), soGio(g), donGia(d) {}
    double tinhLuong() const override { return soGio * donGia; }
};</code></pre>` },
        ],
      },
      {
        id: "o-poly",
        title: "Đa hình, hàm ảo, liên kết động",
        theory: `
<ul>
<li><b>Đa hình</b>: cùng một lời gọi, đối tượng khác nhau thực hiện hành vi khác nhau. Đa hình lúc chạy cần: kế thừa, hàm virtual, gọi qua <b>con trỏ hoặc tham chiếu</b> lớp cha.</li>
<li><b>Liên kết tĩnh</b> (không virtual): chọn hàm theo kiểu khai báo của con trỏ. <b>Liên kết động</b> (virtual): chọn theo kiểu thật của đối tượng, nhờ bảng hàm ảo (vtable).</li>
<li>Lớp cha có hàm ảo thì <b>hàm hủy cũng phải virtual</b>, nếu không delete qua con trỏ cha sẽ không gọi hàm hủy lớp con.</li>
<li>Truyền đối tượng con theo giá trị vào tham số kiểu cha gây <b>cắt lát</b> (slicing): mất phần của lớp con và mất đa hình.</li>
<li>Java: mọi phương thức không static, không final, không private đều là "ảo" mặc định.</li>
</ul>`,
        code: `class Hinh {
public:
    virtual double dienTich() const = 0;
    virtual ~Hinh() = default;
};
class Tron : public Hinh {
    double r;
public:
    Tron(double r) : r(r) {}
    double dienTich() const override { return 3.14159 * r * r; }
};
class ChuNhat : public Hinh {
    double d, r;
public:
    ChuNhat(double d, double r) : d(d), r(r) {}
    double dienTich() const override { return d * r; }
};

vector<unique_ptr<Hinh>> ds;
ds.push_back(make_unique<Tron>(1));
ds.push_back(make_unique<ChuNhat>(2, 3));
double tong = 0;
for (auto& h : ds) tong += h->dienTich();   // gọi đúng hàm của từng lớp`,
        exercises: [
          { q: `In ra gì?<pre><code>struct A { void f() { cout << "A"; } virtual void g() { cout << "A"; } };
struct B : A { void f() { cout << "B"; } void g() override { cout << "B"; } };
int main() { A* p = new B; p->f(); p->g(); }</code></pre>`,
            a: "<code>AB</code>. f không virtual nên chọn theo kiểu con trỏ A; g virtual nên chọn theo đối tượng thật B." },
          { q: "Vì sao cần virtual ~Hinh()?",
            a: "Khi delete một Tron qua Hinh*, nếu hàm hủy không virtual thì chỉ ~Hinh chạy, phần của Tron không được dọn (hành vi không xác định, rò rỉ tài nguyên)." },
        ],
      },
      {
        id: "o-abstract",
        title: "Lớp trừu tượng, interface",
        theory: `
<ul>
<li><b>Trừu tượng hóa</b>: chỉ đưa ra những gì đối tượng làm được, ẩn cách làm.</li>
<li>C++: lớp có ít nhất một <b>hàm thuần ảo</b> (virtual ... = 0) là lớp trừu tượng, không tạo đối tượng được. Lớp con phải cài hết hàm thuần ảo mới tạo được đối tượng.</li>
<li>Java: <b>abstract class</b> có thể có thuộc tính, hàm tạo, phương thức có thân; <b>interface</b> chỉ khai báo hành vi (từ Java 8 có default method), một lớp cài được nhiều interface.</li>
<li>Chọn abstract class khi các lớp con chia sẻ dữ liệu và code chung; chọn interface khi chỉ cần một "hợp đồng" hành vi cho các lớp không liên quan.</li>
</ul>`,
        code: `// Java
interface CoTheThanhToan { double tinhTien(); }

abstract class SanPham implements CoTheThanhToan {
    protected String ten;
    protected double gia;
    SanPham(String ten, double gia) { this.ten = ten; this.gia = gia; }
    public abstract double thue();
    public double tinhTien() { return gia + thue(); }
}

class SachGiay extends SanPham {
    SachGiay(String t, double g) { super(t, g); }
    public double thue() { return 0; }
}`,
        exercises: [
          { q: "So sánh abstract class và interface trong Java (4 ý).",
            a: "Abstract class có thể có thuộc tính trạng thái và hàm tạo, interface thì không (chỉ hằng). Một lớp chỉ extends một abstract class nhưng implements nhiều interface. Abstract class dùng cho quan hệ is-a có code chung; interface cho khả năng (can-do). Phương thức interface mặc định public." },
          { q: "Thiết kế lớp trừu tượng DongVat với hàm thuần ảo keu(), và hai lớp Cho, Meo.",
            a: `<pre><code>class DongVat {
public:
    virtual string keu() const = 0;
    virtual ~DongVat() = default;
};
class Cho : public DongVat { public: string keu() const override { return "Gau gau"; } };
class Meo : public DongVat { public: string keu() const override { return "Meo meo"; } };</code></pre>` },
        ],
      },
      {
        id: "o-relation",
        title: "Quan hệ giữa các lớp, sơ đồ lớp UML",
        theory: `
<table><tr><th>Quan hệ</th><th>Ý nghĩa</th><th>UML</th><th>Ví dụ</th></tr>
<tr><td>Kế thừa</td><td>là một</td><td>mũi tên tam giác rỗng</td><td>SinhVien → Nguoi</td></tr>
<tr><td>Hiện thực</td><td>cài interface</td><td>tam giác rỗng, nét đứt</td><td>Tron ⇢ CoDienTich</td></tr>
<tr><td>Kết hợp</td><td>biết đến nhau</td><td>đường thẳng</td><td>GiangVien — MonHoc</td></tr>
<tr><td>Kết tập</td><td>có một, phần sống độc lập</td><td>hình thoi rỗng</td><td>Khoa ◇— GiangVien</td></tr>
<tr><td>Hợp thành</td><td>có một, phần chết theo toàn thể</td><td>hình thoi đặc</td><td>HoaDon ◆— DongHoaDon</td></tr>
<tr><td>Phụ thuộc</td><td>dùng tạm thời</td><td>mũi tên nét đứt</td><td>BaoCao ⇢ MayIn</td></tr></table>
<ul>
<li>Ký hiệu phạm vi: + public, − private, # protected. Thuộc tính: − ten: string. Phương thức: + tinhLuong(): double.</li>
<li>Bản số: 1, 0..1, *, 1..*. Ví dụ Khoa 1 —— * GiangVien.</li>
<li>Trong code: hợp thành thường là thuộc tính giá trị (hoặc unique_ptr); kết tập là con trỏ/tham chiếu tới đối tượng do nơi khác quản lý.</li>
</ul>`,
        exercises: [
          { q: "Xác định quan hệ: (1) Xe và Động cơ; (2) Lớp học và Sinh viên; (3) Hóa đơn và Dòng hóa đơn; (4) Tài xế và Xe.",
            a: "(1) Hợp thành (động cơ là bộ phận của xe; tùy đề có thể coi là kết tập nếu động cơ tháo lắp được). (2) Kết tập (sinh viên tồn tại khi lớp giải tán). (3) Hợp thành. (4) Kết hợp." },
          { q: "Vẽ (bằng chữ) sơ đồ lớp cho bài quản lý thư viện: ThuVien, Sach, DocGia, PhieuMuon.",
            a: "ThuVien ◇— * Sach; ThuVien ◇— * DocGia; DocGia 1 —— * PhieuMuon; PhieuMuon * —— 1..* Sach. Sach: − maSach, − tenSach, − tacGia, + conSan(): bool. PhieuMuon: − ngayMuon, − hanTra, + quaHan(ngay): bool." },
        ],
      },
      {
        id: "o-exception",
        title: "Xử lý ngoại lệ",
        theory: `
<ul>
<li>throw ném ngoại lệ; try bọc đoạn code có thể lỗi; catch bắt theo kiểu. Bắt từ cụ thể đến tổng quát; bắt theo tham chiếu const (catch (const exception&amp; e)).</li>
<li>C++: nên ném lớp kế thừa std::exception (invalid_argument, out_of_range, runtime_error). <b>RAII</b>: tài nguyên gắn với đối tượng, hàm hủy tự giải phóng khi ngoại lệ xảy ra.</li>
<li>Java: <b>checked exception</b> (phải khai báo throws hoặc bắt) và <b>unchecked</b> (RuntimeException). Khối finally luôn chạy; try-with-resources tự đóng tài nguyên.</li>
<li>Không dùng ngoại lệ cho luồng điều khiển bình thường; không bắt rồi bỏ qua im lặng.</li>
</ul>`,
        code: `class SoDuKhongDu : public runtime_error {
public:
    SoDuKhongDu(double thieu)
        : runtime_error("Thieu " + to_string(thieu)) {}
};

void rut(double& soDu, double x) {
    if (x > soDu) throw SoDuKhongDu(x - soDu);
    soDu -= x;
}

try {
    rut(soDu, 500);
} catch (const SoDuKhongDu& e) {
    cout << "Loi: " << e.what();
}`,
        exercises: [
          { q: "Viết hàm chia(a, b) ném invalid_argument khi b = 0, và main bắt lỗi in thông báo.",
            a: `<pre><code>double chia(double a, double b) {
    if (b == 0) throw invalid_argument("Chia cho 0");
    return a / b;
}
int main() {
    try { cout << chia(1, 0); }
    catch (const invalid_argument& e) { cout << e.what(); }
}</code></pre>` },
          { q: "Vì sao nên bắt ngoại lệ theo tham chiếu?",
            a: "Tránh sao chép và tránh cắt lát: bắt theo giá trị kiểu cha sẽ mất thông tin lớp con, what() có thể trả sai thông điệp." },
        ],
      },
      {
        id: "o-generic",
        title: "Template, generic, collection",
        theory: `
<ul>
<li><b>Template</b> (C++) và <b>generic</b> (Java) cho phép viết hàm/lớp dùng được cho nhiều kiểu dữ liệu mà vẫn kiểm tra kiểu lúc biên dịch.</li>
<li>C++ STL: vector, list, map, set, unordered_map, stack, queue, priority_queue; thuật toán sort, find, count_if.</li>
<li>Java Collections: ArrayList, LinkedList, HashMap, TreeMap, HashSet; dùng kiểu bao (Integer) thay cho kiểu nguyên thủy.</li>
<li>Template C++ được sinh code cho từng kiểu (code thường đặt trong file .h); generic Java dùng xóa kiểu (type erasure).</li>
</ul>`,
        code: `template <typename T>
class Stack {
    vector<T> a;
public:
    void push(const T& x) { a.push_back(x); }
    T pop() {
        if (a.empty()) throw out_of_range("Stack rong");
        T x = a.back();
        a.pop_back();
        return x;
    }
    bool empty() const { return a.empty(); }
};

template <typename T>
T lonNhat(const vector<T>& v) {
    return *max_element(v.begin(), v.end());
}`,
        exercises: [
          { q: "Viết template hàm hoanDoi(a, b) và dùng cho int, string.",
            a: `<pre><code>template &lt;typename T&gt;
void hoanDoi(T& a, T& b) { T t = a; a = b; b = t; }
int x = 1, y = 2; hoanDoi(x, y);
string s = "a", t = "b"; hoanDoi(s, t);</code></pre>` },
          { q: "Dùng map để đếm số lần xuất hiện mỗi từ trong một câu.",
            a: `<pre><code>map&lt;string, int&gt; dem;
stringstream ss(cau);
string w;
while (ss >> w) dem[w]++;
for (auto& [tu, so] : dem) cout << tu << ": " << so << "\\n";</code></pre>` },
        ],
      },
      {
        id: "o-solid",
        title: "Nguyên lý SOLID",
        theory: `
<ul>
<li><b>S</b> (Single responsibility): mỗi lớp chỉ có một lý do để thay đổi. Ví dụ: tách HoaDon (tính tiền) khỏi InHoaDon (định dạng in).</li>
<li><b>O</b> (Open/closed): mở để mở rộng, đóng để sửa đổi. Thêm loại hình mới bằng lớp con mới, không sửa hàm tính diện tích bằng if/else.</li>
<li><b>L</b> (Liskov substitution): đối tượng lớp con thay cho lớp cha mà không làm sai chương trình. Ví dụ kinh điển: HinhVuong kế thừa HinhChuNhat vi phạm vì setDai làm đổi cả rộng.</li>
<li><b>I</b> (Interface segregation): nhiều interface nhỏ tốt hơn một interface lớn bắt lớp cài cả hàm không dùng.</li>
<li><b>D</b> (Dependency inversion): phụ thuộc vào trừu tượng (interface) chứ không vào lớp cụ thể; truyền phụ thuộc qua hàm tạo.</li>
</ul>`,
        exercises: [
          { q: "Hàm tinhDienTich(Hinh h) dùng if (h.loai == \"tron\") ... else if (h.loai == \"vuong\") ... vi phạm nguyên lý nào? Sửa thế nào?",
            a: "Vi phạm Open/closed (thêm hình mới phải sửa hàm). Sửa: lớp trừu tượng Hinh có virtual dienTich(), mỗi hình là một lớp con tự cài." },
          { q: "Lớp DichVuDonHang tạo trực tiếp new MySQLDatabase() trong hàm tạo. Vi phạm gì?",
            a: "Dependency inversion: phụ thuộc lớp cụ thể, khó thay CSDL và khó kiểm thử. Sửa: định nghĩa interface CoSoDuLieu, truyền vào qua hàm tạo." },
        ],
      },
      {
        id: "o-patterns",
        title: "Mẫu thiết kế cơ bản",
        theory: `
<ul>
<li><b>Singleton</b>: đảm bảo lớp chỉ có một đối tượng, truy cập qua hàm static (cấu hình, kết nối log).</li>
<li><b>Factory Method</b>: tạo đối tượng qua một hàm thay vì gọi new trực tiếp, để code dùng chỉ biết lớp trừu tượng.</li>
<li><b>Observer</b>: một đối tượng thay đổi thì thông báo cho các đối tượng đăng ký (sự kiện giao diện, thông báo).</li>
<li><b>Strategy</b>: đóng gói các thuật toán thay thế nhau sau một interface (các cách tính giảm giá).</li>
<li>Khi thi, thường được hỏi: mục đích, sơ đồ lớp, và code phác thảo của 1–2 mẫu.</li>
</ul>`,
        code: `// Singleton (C++11 an toàn đa luồng)
class CauHinh {
    CauHinh() = default;
public:
    CauHinh(const CauHinh&) = delete;
    CauHinh& operator=(const CauHinh&) = delete;
    static CauHinh& instance() {
        static CauHinh ch;
        return ch;
    }
};

// Factory
unique_ptr<Hinh> taoHinh(const string& loai) {
    if (loai == "tron") return make_unique<Tron>(1);
    if (loai == "chunhat") return make_unique<ChuNhat>(1, 2);
    throw invalid_argument("Loai khong ho tro");
}`,
        exercises: [
          { q: "Viết khung mẫu Observer: lớp KenhTin có đăng ký, hủy đăng ký, thông báo cho các NguoiTheoDoi.",
            a: `<pre><code>class NguoiTheoDoi {
public:
    virtual void capNhat(const string& tin) = 0;
    virtual ~NguoiTheoDoi() = default;
};
class KenhTin {
    vector&lt;NguoiTheoDoi*&gt; ds;
public:
    void dangKy(NguoiTheoDoi* n) { ds.push_back(n); }
    void huy(NguoiTheoDoi* n) { ds.erase(remove(ds.begin(), ds.end(), n), ds.end()); }
    void dangTin(const string& tin) { for (auto n : ds) n->capNhat(tin); }
};</code></pre>` },
        ],
      },
      {
        id: "o-practice",
        title: "Bài tập code lớn (đề mẫu)",
        theory: `
<p>Các đề này giống dạng bài thực hành và bài cuối kỳ. Làm theo thứ tự: vẽ sơ đồ lớp, viết lớp, viết main có menu, tự kiểm thử với dữ liệu nhỏ.</p>
<ol>
<li><b>Quản lý sinh viên</b>: lớp SinhVien (mã, tên, 3 điểm), danh sách sinh viên; thêm, xóa theo mã, tìm theo tên, sắp xếp theo điểm trung bình, in danh sách xếp loại. Nạp chồng &lt;&lt; và &lt;.</li>
<li><b>Hệ thống hình học</b>: lớp trừu tượng Hinh (dienTich, chuVi, ten), các lớp Tron, ChuNhat, TamGiac (kiểm tra 3 cạnh hợp lệ, ném ngoại lệ nếu sai). Nhập n hình, in hình có diện tích lớn nhất, tổng diện tích.</li>
<li><b>Quản lý nhân viên</b>: NhanVien trừu tượng, các lớp NhanVienBienChe (lương cơ bản × hệ số), NhanVienHopDong (lương theo ngày công), QuanLy (lương + phụ cấp chức vụ). Tính tổng quỹ lương, tìm nhân viên lương cao nhất, đếm số nhân viên bằng static.</li>
<li><b>Thư viện</b>: Sach, DocGia, PhieuMuon, ThuVien. Mượn (kiểm tra sách còn, độc giả mượn tối đa 3 cuốn), trả, liệt kê phiếu quá hạn. Dùng ngoại lệ cho các trường hợp không hợp lệ.</li>
<li><b>Cửa hàng</b>: SanPham (trừu tượng, thue()), DienTu, ThucPham (hạn dùng), GioHang (hợp thành DongGioHang), áp dụng Strategy cho cách giảm giá.</li>
</ol>
<p>Tự chấm: mỗi bài đạt nếu dùng đủ đóng gói (không có thuộc tính public), có ít nhất một hàm virtual được gọi qua con trỏ lớp cha, có giải phóng bộ nhớ hoặc dùng smart pointer, và tách khai báo lớp khỏi main.</p>`,
        exercises: [
          { q: "Với đề Quản lý nhân viên, hàm nào nên là virtual, hàm nào nên để ở lớp cha?",
            a: "virtual (thuần ảo): tinhLuong(), loai(). Ở lớp cha: thuộc tính mã, tên, năm sinh; nhap()/xuat() chung (virtual để lớp con gọi bản cha rồi thêm phần riêng); biến static soLuong; hàm hủy virtual." },
        ],
      },
    ],
  };
})(this);
