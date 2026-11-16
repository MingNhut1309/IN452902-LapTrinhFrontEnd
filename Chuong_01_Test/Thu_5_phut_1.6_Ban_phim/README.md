# Thử ngay 1.6 — Chỉ dùng bàn phím (5 phút)

## Câu trả lời

1. Khi trang có liên kết bỏ qua đặt đầu tiên trong `<body>`, lần nhấn `Tab` đầu tiên chọn **“Bỏ qua, đến nội dung chính”**. Nhấn `Enter` để chuyển tới `<main>`.
2. Có thể đi qua các liên kết, trường nhập, lựa chọn và nút của form bằng `Tab`; dùng `Shift+Tab` để quay lại. Radio trong cùng nhóm thường đổi lựa chọn bằng phím mũi tên. Từng phần tử tương tác phải có focus nhìn thấy được.
3. Bấm nhãn “Mã số sinh viên” sẽ đưa con trỏ vào ô nhập khi nhãn có `for="student-id"` và ô có `id="student-id"`.
4. Điểm Lighthouse cần được ghi sau khi chạy trên bản GitHub Pages ở chế độ Mobile. Không thể suy ra điểm khi chưa chạy trang đã xuất bản.

## Mẫu cấu trúc cần có

```html
<a href="#noi-dung">Bỏ qua, đến nội dung chính</a>
<main id="noi-dung">
  <form>
    <label for="student-id">Mã số sinh viên</label>
    <input id="student-id" name="student-id" required pattern="[0-9]{10}">
  </form>
</main>
```

## Checklist thao tác

- Dùng `Tab` từ đầu trang đến hết form, không dùng chuột.
- Xác nhận focus luôn nhìn thấy và thứ tự hợp lý.
- Chọn liên kết bỏ qua, nhấn `Enter`, xác nhận chuyển tới nội dung chính.
- Mở DevTools → Lighthouse, chọn Mobile và chạy Accessibility + SEO trên GitHub Pages; ghi lại điểm thực tế tại đây: Accessibility ____ / 100, SEO ____ / 100.
