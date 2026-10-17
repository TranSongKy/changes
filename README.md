# Lộ trình học

Website chạy trên máy (local) để theo dõi và tối ưu lộ trình học từ năm 3 đến khi tốt nghiệp:

- **30 ngày ôn Lý thuyết đồ thị và OOP** (18/10 – 16/11/2026): lịch từng ngày, đánh dấu việc đã xong. Nếu bị trễ, các việc chưa xong tự được dời đều vào những ngày còn lại trước ngày thi (ngày nghỉ cuối được giữ nguyên).
- **IELTS 4.5 → 7.0+**: nhập điểm đề thử, xem band theo thời gian so với lộ trình, ước tính số giờ còn cần, số giờ mỗi tuần để kịp ngày thi, và gợi ý chia giờ dồn vào kỹ năng yếu nhất.
- **HSK → HSK 4**: nhập số từ đã thuộc, xem cần học bao nhiêu từ mới mỗi ngày để kịp mốc giai đoạn và ngày thi.
- **Hôm nay**: việc cần làm trong ngày theo giai đoạn và thứ trong tuần, giờ đã học trong tuần, chuỗi ngày học, bấm giờ, mốc sắp tới.
- **Nhật ký**: biểu đồ giờ học theo tuần, ghi thêm buổi học thủ công.

## Chạy

Cách 1, không cần cài gì: mở thẳng file `index.html` bằng trình duyệt.

Cách 2, có Node.js:

```bash
npm start
# mở http://localhost:5173
```

Dữ liệu được lưu trong trình duyệt (localStorage). Vào **Cài đặt → Xuất dữ liệu** định kỳ để sao lưu file JSON; nhập lại bằng **Nhập dữ liệu**. Lưu ý: mở bằng file `index.html` và bằng `localhost` là hai nơi lưu khác nhau, nên hãy dùng cố định một cách.

## Tùy chỉnh

- Ngày thi, ngày tốt nghiệp, band mục tiêu, giờ học mỗi tuần: tab **Cài đặt**.
- Nội dung từng ngày, buổi học mẫu IELTS/HSK, số từ mỗi cấp HSK: sửa `js/data.js`.
- Ô **Xem ngày** ở tab Hôm nay cho phép xem trước lịch của một ngày bất kỳ.

## Kiểm thử

```bash
npm test
```

Kiểm thử phần tính toán trong `js/logic.js` (dời lịch, làm tròn band IELTS, dự báo, tổng giờ theo tuần).
