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

---

---

# Chi tiết thay đổi của FE Branch: `user_profile`
**Thời gian:** 25/06/2026 14:31 (Local Time)

Tài liệu này ghi lại các thay đổi ở phía Frontend (VBlog_FE) trên branch `user_profile` nhằm triển khai tính năng Quản lý Hồ sơ cá nhân (Profile Dialog), tái cấu trúc thư mục Layout và phân quyền hiển thị Admin.

---

## 1. Cho phép truy cập HomePage không cần đăng nhập
- **Tệp thay đổi:** `src/App.jsx`
- **Nội dung:** Di chuyển HomePage (`path="/"`) ra bên ngoài Route Guard `<ProtectedRoute />` để khách vãng lai có thể đọc blog mà không bắt buộc phải đăng nhập.

---

## 2. Gỡ bỏ Mock Data và kích hoạt Thunk gọi API BE
- **Tệp thay đổi:** `src/redux/user/userSlice.js`
- **Nội dung:** 
  - Khôi phục trạng thái khởi tạo `initialState` với `currentUser: null` (gỡ bỏ mockUser cũ).
  - Kích hoạt lại toàn bộ các hàm Async Thunks (`loginUserAPI`, `logoutUserAPI`, `updateUserProfileAPI`) gọi trực tiếp các API Backend thật thay thế cho phiên bản giả lập (mock).

---

## 3. Tái cấu trúc cấu trúc thư mục và gỡ bỏ Layout cũ
- **Tệp đã xóa:**
  - `src/components/Layout/Footer.jsx`
  - `src/components/Layout/Header.jsx`
  - `src/components/Layout/MainLayout.jsx`
  - `src/components/Layout/ProfileDialog.jsx`
- **Nội dung:** Gỡ bỏ các tệp Layout cũ để dọn dẹp và tinh giản cấu trúc thư mục dự án, chuyển sang sử dụng các component dùng chung mới ở bên ngoài.

---

## 4. Tích hợp Dialog Hồ sơ cá nhân và kiểm tra quyền Admin tại Header
- **Tệp thay đổi:** `src/components/Header.jsx`
- **Nội dung:**
  - Tích hợp thêm component `<ProfileDialog />` hiển thị dạng Modal khi người dùng click vào mục "Hồ sơ cá nhân".
  - Chuyển liên kết "Hồ sơ cá nhân" từ liên kết chuyển trang sang nút bấm kích hoạt state mở Modal.
  - Sử dụng trường `role` được Backend trả về: Bổ sung kiểm tra điều kiện `currentUser?.user?.role === 'admin'` để chỉ hiển thị liên kết **Trang quản trị** cho người dùng có vai trò là admin.
  - Thêm nút **Đăng nhập** điều hướng đến `/auth/login` khi chưa có session.

---

## 5. Tạo mới Component ProfileDialog quản lý hồ sơ và đổi mật khẩu
- **Tệp tạo mới:** `src/components/ProfileDialog.jsx`
- **Nội dung:** 
  - Xây dựng giao diện Modal cá nhân bằng `@radix-ui` / `shadcn-ui`.
  - Hỗ trợ 2 Tabs chính:
    - **Thông tin cá nhân:** Cho phép cập nhật ảnh đại diện và thay đổi username.
    - **Đổi mật khẩu:** Cho phép điền mật khẩu cũ, mật khẩu mới và xác nhận mật khẩu mới.
  - **Tích hợp React Hook Form & Validation:**
    - Sử dụng `react-hook-form` để quản lý việc nhập liệu, validate và submit biểu mẫu một cách tối ưu.
    - Tận dụng tối đa các hằng số validate từ [validators.js](file:///c:/xampp/htdocs/VBlog/VBlog_FE/src/utils/validators.js) (như `FIELD_REQUIRED_MESSAGE`, `PASSWORD_RULE`, `PASSWORD_RULE_MESSAGE`, `PASSWORD_CONFIRMATION_MESSAGE`).
    - Bổ sung cơ chế hiển thị lỗi chi tiết dưới mỗi input qua component [FieldErrorAlert.jsx](file:///c:/xampp/htdocs/VBlog/VBlog_FE/src/components/FieldErrorAlert.jsx).
    - Thêm các ràng buộc validation để nâng cao trải nghiệm bảo mật và logic:
      - **Mật khẩu mới:** Không cho phép cập nhật nếu Mật khẩu mới trùng khớp với Mật khẩu hiện tại (`newPassword === currentPassword`), hiển thị thông báo lỗi.
      - **Tên người dùng:** Không cho phép cập nhật nếu Tên người dùng mới trùng khớp với Tên hiện tại (`username === currentUser.user.user_name`), hiển thị lỗi dưới ô input.
    - **Bổ sung chức năng Ẩn/Hiện Mật khẩu (Eye Icon):**
      - Tích hợp các nút icon con mắt (`Eye` và `EyeOff` từ `lucide-react`) vào vị trí tuyệt đối ở bên phải của cả 3 ô nhập mật khẩu: Mật khẩu hiện tại, Mật khẩu mới, và Xác nhận mật khẩu mới.
      - Cho phép người dùng dễ dàng chuyển đổi qua lại giữa việc ẩn và hiển thị mật khẩu bằng cách thay đổi kiểu dữ liệu `type` của thẻ `<Input>` từ `password` sang `text` và ngược lại.
    - **Kiểm soát trạng thái tải ảnh đại diện (isUploadingAvatar):**
      - Thêm state `isUploadingAvatar` để theo dõi tiến trình tải lên file ảnh của người dùng.
      - Khi quá trình upload đang diễn ra (`isUploadingAvatar` là `true`), nút upload (biểu tượng camera) sẽ bị vô hiệu hóa (`disabled`) và làm mờ đi (`opacity-50`, `pointer-events-none`) để ngăn người dùng click liên tục làm nghẽn hoặc lỗi tiến trình tải lên.
    - **Tách biệt và module hóa các Tab:**
      - Tạo thư mục mới `src/components/Profile/` để quản lý các tab của trang cá nhân độc lập.
      - Tách logic hiển thị và cập nhật thông tin cá nhân/ảnh đại diện sang component [InfoTab.jsx](file:///c:/xampp/htdocs/VBlog/VBlog_FE/src/components/Profile/InfoTab.jsx).
      - Tách logic đổi mật khẩu và ẩn/hiện mật khẩu sang component [PasswordTab.jsx](file:///c:/xampp/htdocs/VBlog/VBlog_FE/src/components/Profile/PasswordTab.jsx).
      - Rút gọn component [ProfileDialog.jsx](file:///c:/xampp/htdocs/VBlog/VBlog_FE/src/components/ProfileDialog.jsx) đóng vai trò làm khung chứa Dialog và hiển thị danh sách Tabs.
    - **Tối ưu hóa cho React Compiler (Khắc phục cảnh báo của `watch`):**
      - Để giải quyết cảnh báo hiệu năng từ React Compiler do sử dụng `watch()` trong render path:
        - Trong [PasswordTab.jsx](file:///c:/xampp/htdocs/VBlog/VBlog_FE/src/components/Profile/PasswordTab.jsx): Loại bỏ `watch` và thay thế bằng cách sử dụng tham số `formValues` có sẵn trong hàm `validate` của `react-hook-form` (Ví dụ: `validate: (val, formValues) => val !== formValues.currentPassword`).
        - Trong [InfoTab.jsx](file:///c:/xampp/htdocs/VBlog/VBlog_FE/src/components/Profile/InfoTab.jsx): Thay thế `watch("username")` bằng hook chuẩn `useWatch({ control, name: "username" })` để tối ưu hóa việc memoize component của React Compiler.

---

## 6. Tích hợp API Cập nhật tài khoản (POST) & Đồng bộ Avatar Header
- **Tệp thay đổi:**
  - `src/redux/user/userSlice.js`
  - `src/components/Profile/InfoTab.jsx`
  - `src/components/Profile/PasswordTab.jsx`
  - `src/components/Header.jsx`
- **Nội dung:**
  - Cập nhật hàm `updateUserProfileAPI` sử dụng phương thức `POST` và sửa lại URL endpoint đúng chuẩn `/api/v1/users/update` nhằm hỗ trợ tương thích tốt nhất với PHP upload dữ liệu dạng `multipart/form-data`.
  - Hoàn thiện chức năng trong `InfoTab.jsx`: thực thi gọi API cập nhật tên hiển thị (`username`) và hiển thị thông báo tiến trình / thành công.
  - Hoàn thiện chức năng trong `PasswordTab.jsx`: tích hợp `useDispatch`, gọi API cập nhật mật khẩu (`currentPassword` & `newPassword`) và tự động reset form sau khi thay đổi mật khẩu thành công.
  - Đồng bộ và cải tiến ảnh đại diện ở `Header.jsx`: thay thế thẻ `<img>` thô bằng bộ component `<Avatar>`, `<AvatarImage>` và `<AvatarFallback>` đồng bộ với `InfoTab`.
  - Thiết lập cỡ ảnh đại diện của Header thành `w-10 h-10` (40px) giúp hiển thị to, rõ ràng và cân đối hơn.
  - Đồng bộ việc sử dụng trường `avatar_url` (thay cho `avatar`) trên toàn bộ ứng dụng Frontend để khớp hoàn toàn với thiết kế cơ sở dữ liệu và DTO của Backend.
