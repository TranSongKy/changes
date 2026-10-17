// Lý thuyết, bài tập và link học: IELTS, HSK, và link cho Đồ thị, OOP.
(function (root) {
  const C = (root.CONTENT = root.CONTENT || {});
  if (typeof module !== "undefined" && module.exports) module.exports = C;

  C.ielts = {
    name: "IELTS",
    topics: [
      {
        id: "i-format",
        title: "Cấu trúc đề và cách tính điểm",
        theory: `
<table><tr><th>Phần</th><th>Thời gian</th><th>Nội dung</th></tr>
<tr><td>Listening</td><td>~30 phút</td><td>4 phần, 40 câu, độ khó tăng dần</td></tr>
<tr><td>Reading (Academic)</td><td>60 phút</td><td>3 bài đọc, 40 câu, không có thời gian chép đáp án riêng</td></tr>
<tr><td>Writing</td><td>60 phút</td><td>Task 1 (≥150 từ, mô tả biểu đồ) và Task 2 (≥250 từ, nghị luận, chiếm gấp đôi điểm)</td></tr>
<tr><td>Speaking</td><td>11–14 phút</td><td>Part 1 hỏi đáp, Part 2 nói 1–2 phút theo thẻ, Part 3 thảo luận</td></tr></table>
<p>Overall là trung bình 4 kỹ năng, làm tròn: .25 lên .5, .75 lên band kế tiếp. Ví dụ L 7.0, R 7.0, W 6.0, S 6.5 → 6.625 → 6.5.</p>
<p>Quy đổi số câu đúng sang band (tham khảo, thay đổi nhẹ theo đề):</p>
<table><tr><th>Band</th><th>Listening</th><th>Reading Academic</th></tr>
<tr><td>8.0</td><td>35–36</td><td>35–36</td></tr>
<tr><td>7.0</td><td>30–31</td><td>30–32</td></tr>
<tr><td>6.0</td><td>23–25</td><td>23–26</td></tr>
<tr><td>5.0</td><td>16–17</td><td>15–18</td></tr></table>
<p>Writing và Speaking chấm theo 4 tiêu chí ngang nhau. Writing: Task Achievement/Response, Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy. Speaking: Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, Pronunciation. Đọc bản mô tả band chính thức trên ielts.org để biết band 7 cần gì.</p>`,
        exercises: [
          { q: "L 6.5, R 7.0, W 5.5, S 6.0. Overall bao nhiêu? Muốn overall 7.0 thì cần cải thiện gì trước?",
            a: "Trung bình 6.25 → 6.5. Để lên 7.0 cần tổng ≥ 27.0 (trung bình 6.75). Writing đang thấp nhất: nâng W lên 6.5 và S lên 7.0 là đủ (6.5 + 7 + 6.5 + 7 = 27)." },
        ],
      },
      {
        id: "i-listening",
        title: "Listening: dạng câu hỏi và chiến lược",
        theory: `
<ul>
<li>Dạng hay gặp: điền form/note/table, trắc nghiệm, matching, điền bản đồ/sơ đồ, hoàn thành câu.</li>
<li>Trước mỗi phần có thời gian đọc câu hỏi: gạch từ khóa, đoán loại từ cần điền (số, tên, danh từ số nhiều).</li>
<li>Bẫy thường gặp: người nói sửa lại thông tin ("Tuesday... no, sorry, Wednesday"), đáp án được diễn đạt bằng từ đồng nghĩa, số ít/số nhiều, chính tả tên riêng được đánh vần.</li>
<li>Tuân thủ giới hạn từ (NO MORE THAN TWO WORDS AND/OR A NUMBER). Sai chính tả là sai câu.</li>
<li>Luyện: nghe chép chính tả (dictation) 10–15 phút mỗi ngày ở giai đoạn 1; giai đoạn 2–3 làm đề, nghe lại phần sai với transcript, ghi lại cụm từ đồng nghĩa.</li>
</ul>`,
        exercises: [
          { q: "Liệt kê 10 cụm đồng nghĩa hay xuất hiện trong Listening.",
            a: "cheap = inexpensive / low-cost; start = commence / kick off; meeting = appointment; free = at no cost / complimentary; near = close to / within walking distance; every week = weekly; difficult = challenging; buy = purchase; ask = enquire; most popular = best-selling." },
        ],
      },
      {
        id: "i-reading",
        title: "Reading: dạng câu hỏi và chiến lược",
        theory: `
<ul>
<li><b>True/False/Not Given</b> (với thông tin) và <b>Yes/No/Not Given</b> (với ý kiến tác giả): False khi bài nói điều ngược lại; Not Given khi bài không đề cập. Đừng dùng hiểu biết bên ngoài.</li>
<li><b>Matching headings</b>: đọc câu đầu và câu cuối mỗi đoạn để nắm ý chính; loại các heading chỉ khớp chi tiết nhỏ.</li>
<li><b>Điền từ (summary, sentence completion)</b>: đáp án thường theo thứ tự xuất hiện trong bài; kiểm tra ngữ pháp sau khi điền.</li>
<li><b>Matching information/features</b>: scan tên riêng, số, năm trước.</li>
<li>Phân bổ thời gian: 17–18 phút cho bài 1, 20 cho bài 2, 22–23 cho bài 3. Không kẹt quá 2 phút ở một câu.</li>
<li>Luyện: mỗi bài làm xong, tìm lại câu chứa đáp án và gạch cụm đồng nghĩa giữa câu hỏi và bài.</li>
</ul>`,
        exercises: [
          { q: "Bài: \"The study found that coffee consumption was linked to lower rates of heart disease in women.\" Câu hỏi: \"Coffee prevents heart disease in men.\" T/F/NG?",
            a: "Not Given. Bài chỉ nói về phụ nữ và nói 'linked to' (có liên quan), không nói gì về nam giới." },
          { q: "Câu hỏi: \"The researchers proved coffee causes better heart health.\" T/F/NG?",
            a: "False. 'Linked to' là tương quan, không phải 'chứng minh gây ra'; câu hỏi khẳng định mạnh hơn và trái với cách bài trình bày. (Một số đề có thể xem là Not Given; khi luyện, hãy so với đáp án chính thức để học cách người ra đề phân biệt.)" },
        ],
      },
      {
        id: "i-writing1",
        title: "Writing Task 1: cấu trúc và ngôn ngữ",
        theory: `
<ol>
<li><b>Mở bài</b> (1 câu): diễn đạt lại đề, không chép nguyên văn.</li>
<li><b>Overview</b> (2 câu): xu hướng chính hoặc điểm nổi bật nhất, không có số liệu chi tiết. Thiếu overview thì khó vượt band 5 ở Task Achievement.</li>
<li><b>Thân bài 1 và 2</b>: nhóm số liệu theo đặc điểm (tăng/giảm, cao/thấp, trước/sau), có so sánh, dẫn số liệu chính xác.</li>
</ol>
<p>Ngôn ngữ xu hướng: rise/increase/climb, fall/decline/drop, fluctuate, remain stable, peak at, hit a low of; trạng từ: sharply, significantly, gradually, slightly. Cấu trúc: "There was a sharp rise in X", "X rose sharply", "X increased from 20% to 35%".</p>
<p>So sánh: "X was twice as high as Y", "X accounted for the largest proportion", "by contrast", "whereas".</p>
<p>Quy trình (≈20 phút): 2 phút đọc và chọn nhóm số liệu, 15 phút viết, 3 phút soát lỗi.</p>`,
        exercises: [
          { q: "Viết overview cho đề: biểu đồ đường thể hiện số du khách đến 3 thành phố A, B, C từ 2000 đến 2020; A tăng mạnh, B giảm, C ổn định.",
            a: "Overall, the number of tourists visiting city A rose dramatically over the period, while the figure for city B declined. City C, by contrast, saw relatively little change. (Không có số liệu cụ thể trong overview.)" },
        ],
      },
      {
        id: "i-writing2",
        title: "Writing Task 2: dạng đề, dàn ý, đề luyện",
        theory: `
<table><tr><th>Dạng</th><th>Dấu hiệu</th><th>Cách trả lời</th></tr>
<tr><td>Opinion</td><td>To what extent do you agree?</td><td>Nêu rõ quan điểm từ mở bài, giữ xuyên suốt</td></tr>
<tr><td>Discussion</td><td>Discuss both views and give your opinion</td><td>Mỗi quan điểm một đoạn, ý kiến cá nhân ở mở bài và kết bài</td></tr>
<tr><td>Advantages/Disadvantages</td><td>Do the advantages outweigh...?</td><td>Trả lời câu "outweigh" rõ ràng</td></tr>
<tr><td>Problem/Solution</td><td>What are the causes/problems and solutions?</td><td>Một đoạn nguyên nhân/vấn đề, một đoạn giải pháp tương ứng</td></tr>
<tr><td>Two-part</td><td>Hai câu hỏi riêng</td><td>Trả lời đủ cả hai</td></tr></table>
<p><b>Dàn ý 4 đoạn</b> (≈40 phút, 260–300 từ): Mở bài (diễn đạt lại đề + quan điểm), Thân 1 và Thân 2 (câu chủ đề, giải thích, ví dụ cụ thể), Kết bài (tóm tắt quan điểm, không thêm ý mới).</p>
<p>Band 7 cần: trả lời đúng mọi phần đề, quan điểm rõ, mỗi đoạn một ý chính được phát triển, từ nối đa dạng nhưng không máy móc, có câu phức và ít lỗi ngữ pháp, dùng collocation tự nhiên.</p>`,
        exercises: [
          { q: "Đề luyện 1 (Opinion): Some people think university education should be free for everyone. To what extent do you agree or disagree?",
            a: "Gợi ý dàn ý: Quan điểm đồng ý một phần. Thân 1: lợi ích (công bằng cơ hội, nguồn nhân lực chất lượng cao, ví dụ các nước Bắc Âu). Thân 2: hạn chế (gánh nặng ngân sách, có thể giảm chất lượng; giải pháp: miễn phí cho sinh viên thu nhập thấp hoặc ngành thiếu nhân lực). Kết: miễn phí có điều kiện hợp lý hơn miễn phí hoàn toàn." },
          { q: "Đề luyện 2 (Discussion): Some believe children should learn a foreign language at primary school, others think secondary school is better. Discuss both views and give your opinion.",
            a: "Gợi ý: Thân 1 (tiểu học): trẻ bắt chước phát âm tốt, ít ngại sai, có nhiều năm tích lũy. Thân 2 (trung học): đã vững tiếng mẹ đẻ, học ngữ pháp có ý thức, chương trình tiểu học đã quá tải. Quan điểm: bắt đầu ở tiểu học với hình thức nghe nói qua trò chơi." },
          { q: "Đề luyện 3 (Problem/Solution): Many cities face serious traffic congestion. What are the causes, and what measures can be taken?",
            a: "Gợi ý: Nguyên nhân: đô thị hóa nhanh, phụ thuộc xe cá nhân, giao thông công cộng kém. Giải pháp: đầu tư metro/xe buýt nhanh, thu phí vào trung tâm giờ cao điểm, khuyến khích làm việc linh hoạt. Ví dụ: phí ùn tắc ở London, Singapore." },
          { q: "Đề luyện 4 (Advantages/Disadvantages): More people are working from home. Do the advantages outweigh the disadvantages?",
            a: "Gợi ý: Lợi: tiết kiệm thời gian đi lại, linh hoạt, giảm chi phí văn phòng. Hại: cô lập, khó tách công việc và cuộc sống, khó phối hợp nhóm. Kết luận: lợi lớn hơn nếu kết hợp mô hình lai (hybrid)." },
        ],
      },
      {
        id: "i-speaking",
        title: "Speaking: các phần thi và câu hỏi luyện",
        theory: `
<ul>
<li><b>Part 1</b> (4–5 phút): câu hỏi về bản thân, quê, học tập, sở thích. Trả lời 2–3 câu: câu trả lời + lý do + ví dụ ngắn.</li>
<li><b>Part 2</b> (1 phút chuẩn bị, nói 1–2 phút): ghi 4–5 từ khóa theo các gạch đầu dòng trên thẻ; kể theo thời gian; thêm cảm xúc và chi tiết cụ thể.</li>
<li><b>Part 3</b> (4–5 phút): câu hỏi trừu tượng liên quan chủ đề Part 2. Cấu trúc: quan điểm, lý do, ví dụ, mặt khác/so sánh.</li>
<li>Không học thuộc câu trả lời mẫu: giám khảo nhận ra và trừ điểm. Học ý tưởng và cụm từ, rồi nói tự nhiên.</li>
<li>Luyện: ghi âm mỗi ngày, nghe lại tìm lỗi ngữ pháp lặp lại, chỗ ngập ngừng, âm cuối (/s/, /t/, /d/), trọng âm từ.</li>
</ul>`,
        exercises: [
          { q: "Part 1: Do you work or are you a student? / What do you like about your major? / Do you prefer studying alone or in groups? / How often do you use the internet?",
            a: "Ví dụ: \"I'm a third-year IT student. What I enjoy most is solving problems with code, because you can see the result straight away. For example, last semester I built a small website to track my study plan.\"" },
          { q: "Part 2: Describe a skill you would like to learn. You should say: what it is, why you want to learn it, how you would learn it, and explain how it would help you.",
            a: "Từ khóa gợi ý: tiếng Trung, công việc ở công ty có đối tác Trung Quốc, app + giáo trình HSK + bạn trao đổi ngôn ngữ, mở rộng cơ hội việc làm và du lịch. Nói theo 4 ý, mỗi ý 20–30 giây." },
          { q: "Part 3: Why do some people find it hard to learn new skills as adults? / Should schools teach practical skills like cooking or managing money?",
            a: "Gợi ý: thiếu thời gian, sợ sai, thói quen cố định; so sánh trẻ em học nhanh vì ít áp lực. Câu 2: đồng ý, kỹ năng thực tế giúp tự lập; nhưng cần cân bằng với môn học thuật." },
        ],
      },
      {
        id: "i-vocab",
        title: "Từ vựng theo chủ đề và collocation",
        theory: `
<p>Các chủ đề hay gặp: Education, Technology, Environment, Health, Work, Globalisation, Crime, Government, Media, Transport, Urbanisation, Family.</p>
<table><tr><th>Chủ đề</th><th>Collocation nên dùng</th></tr>
<tr><td>Education</td><td>acquire knowledge, academic performance, tuition fees, lifelong learning, vocational training</td></tr>
<tr><td>Technology</td><td>technological advances, rely heavily on, screen time, data privacy, artificial intelligence</td></tr>
<tr><td>Environment</td><td>carbon emissions, renewable energy, tackle climate change, deforestation, sustainable development</td></tr>
<tr><td>Health</td><td>sedentary lifestyle, balanced diet, mental well-being, healthcare system, preventive measures</td></tr>
<tr><td>Work</td><td>job satisfaction, work-life balance, career prospects, remote working, labour shortage</td></tr></table>
<p>Cách học: mỗi ngày 15–20 cụm, đặt câu của riêng mình, đưa vào Anki; ưu tiên cụm từ hơn từ đơn lẻ. Tra collocation bằng Ozdic hoặc Cambridge Dictionary.</p>`,
        exercises: [
          { q: "Viết lại câu cho tự nhiên hơn: \"Many people make pollution and this makes big problems for the earth.\"",
            a: "\"Human activities generate large amounts of pollution, which poses a serious threat to the environment.\"" },
        ],
      },
      {
        id: "i-grammar",
        title: "Ngữ pháp cần cho band 6.5–7",
        theory: `
<ul>
<li>Thì: hiện tại hoàn thành (xu hướng tới nay), quá khứ đơn (Task 1 có năm cụ thể), tương lai dự đoán (will be expected to).</li>
<li>Câu phức: mệnh đề quan hệ (which, who, where, whose), mệnh đề trạng ngữ (although, while, because, unless).</li>
<li>Câu điều kiện loại 1, 2, 3 và đảo ngữ cơ bản ("Were governments to invest more, ...").</li>
<li>Bị động: "It is widely believed that...", "X is said to be...".</li>
<li>Danh từ hóa: "The government decided..." → "The government's decision to...".</li>
<li>Lỗi hay gặp của người Việt: thiếu mạo từ a/the, thiếu s số nhiều, sai hòa hợp chủ ngữ–động từ, câu run-on nối bằng dấu phẩy.</li>
</ul>`,
        exercises: [
          { q: "Sửa lỗi: \"Although technology is useful, but it has many disadvantage.\"",
            a: "\"Although technology is useful, it has many disadvantages.\" (Không dùng although và but cùng lúc; disadvantage số nhiều.)" },
          { q: "Gộp thành một câu dùng mệnh đề quan hệ: \"Hanoi is the capital. It has over 8 million people.\"",
            a: "\"Hanoi, which has over 8 million people, is the capital.\"" },
        ],
      },
    ],
  };

  C.hsk = {
    name: "HSK",
    topics: [
      {
        id: "h-pinyin",
        title: "Pinyin, thanh điệu, biến điệu",
        theory: `
<ul>
<li>4 thanh: <b>mā</b> (ngang, cao), <b>má</b> (lên), <b>mǎ</b> (xuống rồi lên), <b>mà</b> (xuống mạnh), và thanh nhẹ <b>ma</b>.</li>
<li>Vị trí dấu thanh: ưu tiên a, rồi o, rồi e; với iu và ui đặt trên chữ thứ hai (liù, guì).</li>
<li>Âm dễ nhầm với người Việt: zh/ch/sh (uốn lưỡi) khác z/c/s; j/q/x đi với i, ü; ü sau j, q, x, y viết thành u (ju, qu, xu, yu).</li>
<li><b>Biến điệu thanh 3</b>: hai thanh 3 liền nhau thì thanh đầu đọc thành thanh 2: nǐ hǎo → ní hǎo. Thanh 3 trước thanh khác đọc nửa thanh 3 (chỉ xuống, không lên).</li>
<li><b>不 bù</b>: trước thanh 4 đọc thành bú (bú shì, bú qù); các trường hợp khác giữ bù.</li>
<li><b>一 yī</b>: đứng một mình, cuối từ, hoặc khi đếm số đọc yī; trước thanh 4 đọc yí (yí gè); trước thanh 1, 2, 3 đọc yì (yì tiān, yì nián, yì qǐ).</li>
</ul>`,
        exercises: [
          { q: "Đọc đúng thanh: 你好, 不是, 一个, 一天, 很好, 不忙, 一起.",
            a: "ní hǎo, bú shì, yí gè, yì tiān, hén hǎo, bù máng, yì qǐ." },
          { q: "Đặt dấu thanh đúng: liu4, gui4, xue2, hao3, dui4.",
            a: "liù, guì, xué, hǎo, duì." },
        ],
      },
      {
        id: "h-hanzi",
        title: "Chữ Hán, bộ thủ, thứ tự nét",
        theory: `
<ul>
<li>Quy tắc thứ tự nét: ngang trước sổ sau (十), phẩy trước mác sau (人), trên trước dưới sau (三), trái trước phải sau (明), ngoài trước trong sau (月), vào trước đóng sau (国), giữa trước hai bên sau (小).</li>
<li>Học bộ thủ giúp đoán nghĩa và nhớ chữ. Bộ hay gặp nhất:</li>
</ul>
<table><tr><th>Bộ</th><th>Hán Việt</th><th>Nghĩa liên quan</th><th>Ví dụ</th></tr>
<tr><td>亻(人)</td><td>nhân</td><td>người</td><td>你, 他, 休</td></tr>
<tr><td>氵(水)</td><td>thủy</td><td>nước</td><td>汉, 河, 洗</td></tr>
<tr><td>口</td><td>khẩu</td><td>miệng, nói</td><td>吃, 喝, 叫</td></tr>
<tr><td>女</td><td>nữ</td><td>phụ nữ</td><td>妈, 好, 姐</td></tr>
<tr><td>木</td><td>mộc</td><td>cây, gỗ</td><td>树, 椅, 桌</td></tr>
<tr><td>扌(手)</td><td>thủ</td><td>tay, động tác</td><td>打, 找, 拿</td></tr>
<tr><td>讠(言)</td><td>ngôn</td><td>lời nói</td><td>说, 话, 语</td></tr>
<tr><td>忄(心)</td><td>tâm</td><td>tình cảm</td><td>忙, 快, 想</td></tr>
<tr><td>日</td><td>nhật</td><td>mặt trời, thời gian</td><td>明, 时, 早</td></tr>
<tr><td>艹</td><td>thảo</td><td>cỏ, cây</td><td>茶, 花, 菜</td></tr>
<tr><td>宀</td><td>miên</td><td>mái nhà</td><td>家, 安, 字</td></tr>
<tr><td>辶</td><td>sước</td><td>đi lại</td><td>这, 还, 送</td></tr>
<tr><td>钅(金)</td><td>kim</td><td>kim loại, tiền</td><td>钱, 银, 错</td></tr>
<tr><td>饣(食)</td><td>thực</td><td>ăn uống</td><td>饭, 饿, 饺</td></tr>
<tr><td>纟(丝)</td><td>mịch</td><td>sợi, dây</td><td>红, 给, 经</td></tr></table>
<p>Mẹo cho người Việt: ghi âm Hán Việt bên cạnh từ mới (经济 kinh tế, 学生 học sinh, 问题 vấn đề, 准备 chuẩn bị) giúp nhớ nghĩa nhanh hơn nhiều.</p>`,
        exercises: [
          { q: "Đoán nghĩa và âm Hán Việt: 学习, 电话, 图书馆, 注意, 经验.",
            a: "学习 học tập (xuéxí); 电话 điện thoại (diànhuà); 图书馆 đồ thư quán, thư viện (túshūguǎn); 注意 chú ý (zhùyì); 经验 kinh nghiệm (jīngyàn)." },
        ],
      },
      {
        id: "h-grammar",
        title: "Ngữ pháp HSK 1–4",
        theory: `
<table><tr><th>Cấp</th><th>Cấu trúc</th><th>Ví dụ</th></tr>
<tr><td>1</td><td>A 是 B</td><td>我是学生。Tôi là sinh viên.</td></tr>
<tr><td>1</td><td>Câu hỏi 吗, 呢, từ để hỏi (什么, 谁, 哪儿, 几)</td><td>你忙吗？你呢？你叫什么名字？</td></tr>
<tr><td>1</td><td>的 sở hữu</td><td>我的书 sách của tôi</td></tr>
<tr><td>1</td><td>Lượng từ 个, 本, 杯, 口</td><td>三本书, 一杯茶</td></tr>
<tr><td>1</td><td>在 + nơi chốn + động từ</td><td>我在学校学习。</td></tr>
<tr><td>2</td><td>了 hoàn thành, 过 trải nghiệm</td><td>我吃了饭。我去过北京。</td></tr>
<tr><td>2</td><td>正在…呢 đang</td><td>他正在看书呢。</td></tr>
<tr><td>2</td><td>比 so sánh</td><td>他比我高。</td></tr>
<tr><td>2</td><td>得 bổ ngữ mức độ</td><td>他说得很快。</td></tr>
<tr><td>3</td><td>把 xử trí</td><td>我把作业做完了。</td></tr>
<tr><td>3</td><td>被 bị động</td><td>我的手机被偷了。</td></tr>
<tr><td>3</td><td>越来越, 一边…一边…</td><td>天气越来越冷。</td></tr>
<tr><td>3</td><td>Bổ ngữ kết quả, xu hướng</td><td>听懂, 看完, 走进来</td></tr>
<tr><td>4</td><td>虽然…但是, 因为…所以, 不但…而且, 只要…就, 即使…也</td><td>虽然很累，但是很开心。</td></tr></table>
<p>Trật tự cơ bản: Chủ ngữ + thời gian + nơi chốn + động từ + tân ngữ. Khác tiếng Việt: thời gian và nơi chốn đứng <b>trước</b> động từ (我明天在家学习, không nói 我学习在家明天).</p>`,
        exercises: [
          { q: "Dịch sang tiếng Trung: (1) Tôi là sinh viên năm ba. (2) Hôm qua tôi đã đi thư viện. (3) Anh ấy cao hơn tôi. (4) Tôi đã làm xong bài tập rồi.",
            a: "(1) 我是大三学生。(2) 我昨天去了图书馆。(3) 他比我高。(4) 我把作业做完了。" },
          { q: "Sửa lỗi: 我学习中文在大学。/ 他很高比我。/ 我去过了北京。",
            a: "我在大学学习中文。/ 他比我高。(không dùng 很 trong câu 比) / 我去过北京。(过 không đi cùng 了 ở đây)" },
        ],
      },
      {
        id: "h-exam",
        title: "Cấu trúc đề HSK 1–4",
        theory: `
<table><tr><th>Cấp</th><th>Từ vựng (HSK 2.0)</th><th>Phần thi</th><th>Số câu</th><th>Điểm đạt</th></tr>
<tr><td>HSK 1</td><td>150</td><td>Nghe, Đọc</td><td>40</td><td>120/200</td></tr>
<tr><td>HSK 2</td><td>300</td><td>Nghe, Đọc</td><td>60</td><td>120/200</td></tr>
<tr><td>HSK 3</td><td>600</td><td>Nghe, Đọc, Viết</td><td>80</td><td>180/300</td></tr>
<tr><td>HSK 4</td><td>1.200</td><td>Nghe, Đọc, Viết</td><td>100</td><td>180/300</td></tr></table>
<ul>
<li>HSK 3 trở lên có phần viết: sắp xếp từ thành câu, điền chữ Hán (HSK 3), viết câu theo tranh (HSK 4).</li>
<li><b>HSKK</b> là kỳ thi nói riêng (sơ cấp, trung cấp, cao cấp); nhiều nơi tuyển dụng hoặc học bổng yêu cầu kèm HSK.</li>
<li>Chuẩn HSK 3.0 (9 cấp) đang được áp dụng dần với số từ mỗi cấp khác bảng trên. Trước khi đăng ký, kiểm tra trên chinesetest.cn hoặc trung tâm thi gần bạn.</li>
<li>Chứng chỉ HSK thường có giá trị 2 năm cho mục đích du học.</li>
</ul>`,
        exercises: [
          { q: "Bạn đạt 95 nghe, 90 đọc, 70 viết ở HSK 4. Bạn có đậu không?",
            a: "Tổng 255/300 ≥ 180 nên đậu (HSK không yêu cầu điểm sàn từng phần)." },
        ],
      },
      {
        id: "h-method",
        title: "Phương pháp học hiệu quả",
        theory: `
<ul>
<li><b>Lặp lại ngắt quãng</b> (Anki): 10–15 từ mới mỗi ngày là đủ để đạt mục tiêu HSK 4; ôn thẻ đến hạn trước khi học thẻ mới.</li>
<li>Học từ trong <b>câu</b>, không học từ đơn lẻ; mỗi thẻ có chữ Hán, pinyin, âm thanh, câu ví dụ.</li>
<li><b>Shadowing</b>: nghe một câu, dừng, nhại lại đúng thanh điệu, ghi âm so sánh. 10 phút mỗi ngày cải thiện phát âm rõ rệt.</li>
<li><b>Đọc phân cấp</b> từ giai đoạn HSK 3: truyện, tin ngắn chỉ dùng từ trong cấp của bạn.</li>
<li>Viết tay 5–10 chữ mỗi ngày giúp nhớ mặt chữ và làm phần viết HSK 3–4.</li>
<li>Nói với người bản ngữ qua ứng dụng trao đổi ngôn ngữ 2 buổi mỗi tuần từ giai đoạn 2.</li>
</ul>`,
        exercises: [
          { q: "Tính: còn 400 ngày, đang biết 300 từ, mục tiêu 1.200 từ. Mỗi ngày cần học bao nhiêu từ mới? Nếu nghỉ 1 ngày/tuần?",
            a: "900 / 400 ≈ 2,25 từ/ngày. Nghỉ 1 ngày/tuần còn khoảng 343 ngày học: 900 / 343 ≈ 2,6 từ/ngày. Học 10 từ/ngày thì dư thời gian ôn và có thể nhắm HSK 5." },
        ],
      },
    ],
  };

  // Link học. Đây là trang chính của các nguồn phổ biến; nếu một link đổi địa chỉ, tìm theo tên.
  C.links = {
    graph: [
      { title: "VisuAlgo", url: "https://visualgo.net/en", note: "Mô phỏng từng bước BFS, DFS, MST, Dijkstra, Bellman-Ford, luồng cực đại" },
      { title: "CP-Algorithms: Graphs", url: "https://cp-algorithms.com/", note: "Lý thuyết và code chuẩn các thuật toán đồ thị" },
      { title: "VNOI Wiki", url: "https://vnoi.info/wiki/", note: "Bài viết thuật toán bằng tiếng Việt, có phần đồ thị" },
      { title: "CS Academy Graph Editor", url: "https://csacademy.com/app/graph_editor/", note: "Vẽ đồ thị nhanh để kiểm tra bài làm tay" },
      { title: "Sách: Discrete Mathematics and Its Applications (Rosen)", url: "https://www.mheducation.com/highered/product/discrete-mathematics-its-applications-rosen/M9781259676512.html", note: "Chương 10–11 (Graphs, Trees), bài tập phong phú" },
    ],
    oop: [
      { title: "LearnCpp", url: "https://www.learncpp.com/", note: "Giáo trình C++ miễn phí, rất kỹ phần lớp, kế thừa, hàm ảo" },
      { title: "Refactoring.Guru (tiếng Việt)", url: "https://refactoring.guru/vi/design-patterns", note: "Mẫu thiết kế có hình minh họa và code" },
      { title: "Oracle Java Tutorials: OOP Concepts", url: "https://docs.oracle.com/javase/tutorial/java/concepts/", note: "Nếu môn học dùng Java" },
      { title: "cppreference", url: "https://en.cppreference.com/", note: "Tra cứu STL và cú pháp chuẩn" },
    ],
    ielts: [
      { title: "IELTS (trang chính thức)", url: "https://ielts.org/", note: "Mô tả band Writing/Speaking, đề mẫu" },
      { title: "British Council: Prepare for IELTS", url: "https://takeielts.britishcouncil.org/take-ielts/prepare", note: "Đề luyện miễn phí, khóa học" },
      { title: "IELTS Liz", url: "https://www.ieltsliz.com/", note: "Mẹo từng dạng bài, bài mẫu Writing" },
      { title: "BBC Learning English: 6 Minute English", url: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english", note: "Nghe hằng ngày, có transcript" },
      { title: "Cambridge Dictionary", url: "https://dictionary.cambridge.org/", note: "Phát âm, ví dụ, từ đồng nghĩa" },
      { title: "Ozdic", url: "https://www.ozdic.com/", note: "Từ điển collocation" },
      { title: "Sách: Cambridge IELTS 15–20", url: "https://www.cambridge.org/", note: "Đề thi thật, dùng cho giai đoạn luyện đề" },
    ],
    hsk: [
      { title: "Chinese Testing International", url: "https://www.chinesetest.cn/", note: "Trang chính thức HSK: lịch thi, cấu trúc, đề mẫu" },
      { title: "MDBG Dictionary", url: "https://www.mdbg.net/chinese/dictionary", note: "Từ điển Trung–Anh có pinyin, thứ tự nét" },
      { title: "Pleco", url: "https://www.pleco.com/", note: "Ứng dụng từ điển trên điện thoại" },
      { title: "HelloChinese", url: "https://www.hellochinese.cc/", note: "Ứng dụng học giai đoạn 1" },
      { title: "AnkiWeb: bộ thẻ HSK", url: "https://ankiweb.net/shared/decks?search=HSK", note: "Bộ thẻ từ vựng theo cấp" },
      { title: "Arch Chinese", url: "https://www.archchinese.com/", note: "Thứ tự nét viết, luyện viết chữ" },
      { title: "Sách: HSK Standard Course (标准教程)", url: "https://www.chinesetest.cn/", note: "Giáo trình chính thức cấp 1–6 (mua tại nhà sách)" },
    ],
  };

  // Gắn chủ đề với ngày trong lịch 30 ngày (chỉ số 1..30).
  C.dayTopics = {
    graph: {
      1: "g-basics", 2: "g-repr", 3: "g-connect", 4: "g-bfs", 5: "g-dfs", 6: "g-connect", 7: "g-review",
      8: "g-euler", 9: "g-hamilton", 10: "g-tree", 11: "g-mst", 12: "g-mst", 13: "g-mst", 14: "g-review",
      15: "g-dijkstra", 16: "g-bellman", 17: "g-floyd", 18: "g-topo", 19: "g-flow", 20: ["g-bipartite", "g-coloring"], 21: "g-review",
      22: "g-review", 23: "g-review", 24: "g-review", 25: "g-review", 26: "g-review", 27: "g-review", 28: "g-review", 29: "g-review",
    },
    oop: {
      1: "o-class", 2: "o-encap", 3: "o-ctor", 4: "o-static", 5: "o-practice", 6: "o-operator", 7: "o-class",
      8: "o-inherit", 9: "o-override", 10: "o-poly", 11: "o-abstract", 12: "o-practice", 13: "o-practice", 14: "o-relation",
      15: "o-relation", 16: "o-exception", 17: "o-generic", 18: "o-solid", 19: "o-patterns", 20: "o-practice", 21: "o-solid",
      22: "o-practice", 23: "o-practice", 24: "o-practice", 25: "o-practice", 26: "o-practice", 27: "o-poly", 28: "o-practice", 29: "o-practice",
    },
  };
})(this);
