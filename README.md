# Lộ trình học

Website chạy trên máy (local) để theo dõi và tối ưu lộ trình học từ năm 3 đến khi tốt nghiệp:

- **30 ngày ôn Lý thuyết đồ thị và OOP** (18/10 – 16/11/2026): lịch từng ngày, đánh dấu việc đã xong. Nếu bị trễ, các việc chưa xong tự được dời đều vào những ngày còn lại trước ngày thi (ngày nghỉ cuối được giữ nguyên).
- **Luyện tập Đồ thị + OOP**:
  - Mô phỏng BFS, DFS, Dijkstra, Kruskal, Prim, Floyd-Warshall, sắp xếp tô pô chạy từng bước trên hình đồ thị, kèm hàng đợi/ngăn xếp, bảng d và trước, bảng chạy tay Dijkstra, ma trận Floyd. Dùng đồ thị ngẫu nhiên hoặc tự nhập đồ thị trong đề.
  - Luyện chạy tay: web sinh đề mới, bạn điền kết quả, web chấm từng ô và cho xem lại từng bước.
  - Bảng trình bày trên giấy cho cả 7 thuật toán (bảng duyệt BFS/DFS, bảng nhãn Dijkstra/Prim, bảng xét cạnh Kruskal kèm các thành phần, ma trận D và P của Floyd qua từng đỉnh k, bảng bán bậc vào của tô pô), hiện dần theo mô phỏng hoặc cả bảng, in được; luyện chạy tay có bảng lời giải để so từng dòng.
  - Câu hỏi chấm tự động (trắc nghiệm, điền số, đoán output của code C++/Java) theo từng chủ đề.
  - Ôn lại: câu sai, đề chạy tay chưa đúng hết và bài tập trong tab Tài liệu bạn đánh dấu "làm sai" quay lại sau 1, 2, 4, 7, 15, 30 ngày.
- **Luyện IELTS**:
  - Phòng thi Listening/Reading: chọn đề Cambridge, mở sách PDF ngay bên cạnh (nhớ trang của đề và của Answer key), bấm giờ 40/60 phút, điền phiếu 40 câu. Nhập đáp án của đề một lần thì web tự chấm, chấp nhận nhiều cách viết ("19 / nineteen") và phần trong ngoặc có thể bỏ; chưa có đáp án thì tự tích câu đúng. Web quy ra band ước tính và lưu kết quả, điểm được điền sẵn khi nhập đề thử ở tab IELTS.
  - Audio Listening: sách PDF không kèm audio. Nếu có audio của đề, chọn file ngay trong phòng thi, hoặc chép vào `materials/ielts/audio/Cambridge 7/Test 1/Part 1.mp3` (Part 2–4 tương tự, tên kiểu `C7T1S1.mp3` cũng được) rồi chạy `npm run materials`. Web phát liền 4 phần; chế độ thi thật chỉ cho nghe một lần, không tua.
  - Đề mẫu Listening của British Council có sẵn audio (4 phần, 40 câu) và 7 bài luyện từng dạng câu hỏi, mở từ phòng thi.
  - Writing: bấm giờ 20/40 phút, đếm từ, tự chấm theo 4 tiêu chí, lưu bài và chép bài để gửi người sửa.
  - Speaking Part 2: 24 đề, 1 phút chuẩn bị, 2 phút nói, tự ghi âm để nghe lại (cần mở bằng `npm start` để trình duyệt cho dùng micro).
- **Luyện HSK**: thẻ từ lặp lại ngắt quãng với 305 từ cơ bản HSK 1–2 và từ bạn tự thêm (dán được từ Excel/Anki), đọc thành tiếng bằng giọng tiếng Trung của máy, luyện nghe chọn thanh điệu. Số từ mới mỗi ngày tự lấy theo lộ trình HSK.
- **IELTS 4.5 → 7.0+**: nhập điểm đề thử, xem band theo thời gian so với lộ trình, ước tính số giờ còn cần, số giờ mỗi tuần để kịp ngày thi, và gợi ý chia giờ dồn vào kỹ năng yếu nhất.
- **HSK → HSK 4**: nhập số từ đã thuộc, xem cần học bao nhiêu từ mới mỗi ngày để kịp mốc giai đoạn và ngày thi. Mặc định theo chuẩn HSK 3.0 (HSK 4 khoảng 3.245 từ), đổi về HSK 2.0 trong Cài đặt.
- **Hôm nay**: vòng tiến độ số phút đã học so với lịch, số ngày tới các mốc thi, ô bắt đầu nhanh (ôn câu sai, thẻ từ HSK, đề Cambridge kế tiếp, câu hỏi của ngày, viết IELTS), rồi việc cần làm trong ngày, giờ đã học trong tuần, bấm giờ.
- **Bố cục**: máy tính có thanh bên với 6 mục (Hôm nay, Luyện tập, Lộ trình, Tài liệu, Nhật ký, Cài đặt); điện thoại có thanh điều hướng ở cuối màn hình. Lộ trình gồm 30 ngày ôn thi, IELTS, HSK; Tài liệu gồm Lý thuyết và bài tập, Sách và đề. PDF trên máy mở trong khung xem ngay trong trang.
- **Tài liệu > Lý thuyết và bài tập**: lý thuyết tóm tắt, bài tập có đáp án (bấm để hiện) và link nguồn học cho từng chủ đề Đồ thị, OOP, IELTS, HSK. Lọc theo môn, tìm kiếm không cần gõ dấu, đánh dấu bài đã làm. Mỗi việc ở tab Hôm nay và 30 ngày có nút **Tài liệu** mở thẳng chủ đề của ngày đó.
- **Tài liệu > Sách và đề**: sách và đề PDF của bạn (Cambridge IELTS, đề mẫu Reading/Writing, giáo trình và từ vựng HSK) mở thẳng trên máy hoặc trên Drive. Đề Cambridge được xếp mỗi thứ Bảy trước ngày thi IELTS, có nút nhập điểm từng đề; các buổi Reading/Writing/HSK ở tab Hôm nay có nút mở đúng file của buổi đó.
- **Nhật ký**: biểu đồ giờ học theo tuần, ghi thêm buổi học thủ công.

## Chạy

Cách 1, không cần cài gì: mở thẳng file `index.html` bằng trình duyệt.

Cách 2, có Node.js:

```bash
npm start
# mở http://localhost:5173
```

Dữ liệu được lưu trong trình duyệt (localStorage). Vào **Cài đặt → Xuất dữ liệu** định kỳ để sao lưu file JSON; nhập lại bằng **Nhập dữ liệu**. Lưu ý: mở bằng file `index.html` và bằng `localhost` là hai nơi lưu khác nhau, nên hãy dùng cố định một cách.

## Thêm tài liệu của bạn

Sách và đề có bản quyền nên **không** nằm trong repo. Thư mục `materials/` đã có trong `.gitignore`.

1. Chép PDF vào `materials/`, chia thư mục con tùy ý, ví dụ `materials/ielts/cambridge/Cambridge 7.pdf`, `materials/hsk/vocab/HSK 1 Words.pdf`.
2. Không bắt buộc: đặt danh sách file Google Drive ở `materials/inventory.json` (mảng `{ name, path, id, size }`) để có thêm nút mở trên Drive.
3. Chạy `npm run materials`. Lệnh này tạo `materials/library-data.js`; tải lại trang là thấy mục Sách và đề.

Quy tắc nhận diện tên file nằm trong `js/materials.js`; file nào không nhận ra sẽ vào mục "Tài liệu khác".

## Tùy chỉnh

- Ngày thi, ngày tốt nghiệp, band mục tiêu, giờ học mỗi tuần: tab **Cài đặt**.
- Nội dung từng ngày, buổi học mẫu IELTS/HSK, số từ mỗi cấp HSK: sửa `js/data.js`.
- Lý thuyết, bài tập, link tài liệu: sửa `js/library.js`. Trường `days` của mỗi chủ đề Đồ thị/OOP là các ngày trong lịch 30 ngày dùng chủ đề đó.
- Ô **Xem ngày** ở tab Hôm nay cho phép xem trước lịch của một ngày bất kỳ.

## Kiểm thử

```bash
npm test
```

Kiểm thử thuật toán đồ thị trong `js/graphalgo.js` (so Floyd với Dijkstra, Kruskal với Prim trên đồ thị ngẫu nhiên), phần chấm điểm và lịch ôn trong `js/practice.js`, bộ câu hỏi `js/quiz.js`, phần tính toán trong `js/logic.js` (dời lịch, làm tròn band IELTS, dự báo, tổng giờ theo tuần) , dữ liệu `js/library.js` (ngày nào cũng có tài liệu, bài tập nào cũng có đáp án) và phần phân loại, lịch đề Cambridge trong `js/materials.js`.
