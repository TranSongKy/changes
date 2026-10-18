# Lộ trình học

Website chạy trên máy (local) để theo dõi và tối ưu lộ trình học từ năm 3 đến khi tốt nghiệp:

- **30 ngày ôn Lý thuyết đồ thị và OOP** (18/10 – 16/11/2026): lịch từng ngày, đánh dấu việc đã xong. Nếu bị trễ, các việc chưa xong tự được dời đều vào những ngày còn lại trước ngày thi (ngày nghỉ cuối được giữ nguyên).
- **IELTS 4.5 → 7.0+**: nhập điểm đề thử, xem band theo thời gian so với lộ trình, ước tính số giờ còn cần, số giờ mỗi tuần để kịp ngày thi, và gợi ý chia giờ dồn vào kỹ năng yếu nhất.
- **HSK → HSK 4**: nhập số từ đã thuộc, xem cần học bao nhiêu từ mới mỗi ngày để kịp mốc giai đoạn và ngày thi. Mặc định theo chuẩn HSK 3.0 (HSK 4 khoảng 3.245 từ), đổi về HSK 2.0 trong Cài đặt.
- **Hôm nay**: việc cần làm trong ngày theo giai đoạn và thứ trong tuần, giờ đã học trong tuần, chuỗi ngày học, bấm giờ, mốc sắp tới.
- **Tài liệu**: lý thuyết tóm tắt, bài tập có đáp án (bấm để hiện) và link nguồn học cho từng chủ đề Đồ thị, OOP, IELTS, HSK. Lọc theo môn, tìm kiếm không cần gõ dấu, đánh dấu bài đã làm. Mỗi việc ở tab Hôm nay và 30 ngày có nút **Tài liệu** mở thẳng chủ đề của ngày đó.
- **Thư viện**: sách và đề PDF của bạn (Cambridge IELTS, đề mẫu Reading/Writing, giáo trình và từ vựng HSK) mở thẳng trên máy hoặc trên Drive. Đề Cambridge được xếp mỗi thứ Bảy trước ngày thi IELTS, có nút nhập điểm từng đề; các buổi Reading/Writing/HSK ở tab Hôm nay có nút mở đúng file của buổi đó.
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
3. Chạy `npm run materials`. Lệnh này tạo `materials/library-data.js`; tải lại trang là thấy tab Thư viện.

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

Kiểm thử phần tính toán trong `js/logic.js` (dời lịch, làm tròn band IELTS, dự báo, tổng giờ theo tuần) , dữ liệu `js/library.js` (ngày nào cũng có tài liệu, bài tập nào cũng có đáp án) và phần phân loại, lịch đề Cambridge trong `js/materials.js`.
