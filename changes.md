# Chi tiết thay đổi của FE Branch: `call_api_auth`

Tài liệu này ghi lại các thay đổi được thực hiện trên branch `call_api_auth` phía Frontend (VBlog_FE) nhằm cập nhật các endpoint khớp với Backend mới, bổ sung tính năng tự động làm mới Token (Refresh Token) và vá lỗi vòng lặp logout vô hạn.

---

## 1. Cập nhật Host/Port của Backend

- **Tệp thay đổi:** `src/utils/constants.js`
- **Nội dung:** Cập nhật cổng mặc định từ `8017` thành `8000` để khớp với cổng của server PHP chạy ở Local: `http://localhost:8000`.

---

## 2. Cập nhật các API Endpoints và HTTP Methods

### 📂 `src/redux/user/userSlice.js`

- **Đăng nhập (Login):**
  - Cũ: `${API_ENDPOINT}/v1/users/login` (POST)
  - Mới: `${API_ENDPOINT}/api/v1/users/authenticate` (POST)
- **Đăng xuất (Logout):**
  - Cũ: `${API_ENDPOINT}/v1/users/logout` (DELETE)
  - Mới: `${API_ENDPOINT}/api/v1/users/logout` (DELETE)
- **Cập nhật Reducer và Actions:**
  - Bổ sung action đồng bộ `logoutUser` để xoá sạch `currentUser` ở phía Client ngay lập tức mà không cần gọi API (phục vụ đăng xuất an toàn khi token hết hạn hẳn).
  - Khôi phục `logoutUserAPI.fulfilled` trả về `initialState` để đưa Redux state về trạng thái mặc định khi API logout thành công.

### 📂 `src/apis/index.js`

- **Đăng ký (Register):**
  - Cũ: `${API_ENDPOINT}/v1/users/register` (POST)
  - Mới: `${API_ENDPOINT}/api/v1/users` (POST)
- **Làm mới Token (Refresh Token):**
  - Cũ: `${API_ENDPOINT}/v1/users/refresh_token` (PUT)
  - Mới: `${API_ENDPOINT}/api/v1/users/refresh` (GET)

---

## 3. Xử lý Token hết hạn và Chặn vòng lặp đệ quy

### 📂 `src/utils/authorizeAxios.js`

- **Chặn đệ quy (Circuit Breaker) cho API logout/refresh:**
  - Thêm đoạn lọc ở đầu hàm xử lý lỗi: Nếu request bị lỗi chính là request `/users/logout` hoặc `/users/refresh`, hệ thống sẽ lập tức gọi `logoutUser()` để đăng xuất cục bộ tại Client và reject promise.
  - Ngăn không cho lỗi của chính request logout/refresh kích hoạt ngược lại các cơ chế tự động logout/refresh khác, dập tắt hoàn toàn lỗi lặp vô hạn làm đơ trình duyệt.
- **Tự động làm mới Token (Refresh Token):**
  - Khi Access Token hết hạn (Lỗi `410 Gone`), FE sẽ tự động gọi API `/refresh` để xin token mới và tự động gửi lại request bị lỗi ban đầu.
  - Nếu làm mới Token thất bại (ví dụ: Refresh Token hết hạn hoàn toàn), hệ thống sẽ gọi `logoutUser()` để đăng xuất local an toàn.
- **Cải thiện phân tích thông báo lỗi:**
  - Ưu tiên lấy message lỗi từ trường `error` (`error.response?.data?.error`) trước trường `message` thông thường để hiển thị chính xác lý do lỗi từ backend PHP.

---

## 4. Giao diện trang Home & Chức năng Test Auth

### 📂 `src/pages/Home.jsx`

- Bổ sung nút **"Test Auth API"** cho phép gọi trực tiếp API `/me` để kiểm thử cơ chế tự động gửi token và cơ chế tự động refresh token ngay trên màn hình chính. Hiển thị kết quả gọi API thành công/thất bại dạng JSON.
- Cập nhật hiển thị email người dùng từ cấu trúc dữ liệu mới: `currentUser?.user?.email` (thay vì `currentUser?.email`).
