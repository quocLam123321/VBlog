import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "~/utils/constants";
import authorizedAxiosInstance from "~/utils/authorizeAxios";
import { toast } from "react-toastify";

const initialState = {
  currentUser: null,
};

// Thunks
export const loginUserAPI = createAsyncThunk(
  "user/loginUserAPI",
  async (data) => {
    const response = await authorizedAxiosInstance.post(
      `${API_ENDPOINT}/api/v1/users/authenticate`,
      data,
    );
    return response.data;
  },
);

export const logoutUserAPI = createAsyncThunk(
  "user/logoutUserAPI",
  async (showSuccessMessage = true) => {
    const response = await authorizedAxiosInstance.delete(
      `${API_ENDPOINT}/api/v1/users/logout`,
    );
    if (showSuccessMessage) {
      toast.success("Logged out successfully!", { position: "bottom-right" });
    }
    return response.data;
  },
);

export const updateUserProfileAPI = createAsyncThunk(
  "user/updateUserProfileAPI",
  async (data) => {
    const response = await authorizedAxiosInstance.post(
      `${API_ENDPOINT}/api/v1/users/update`,
      data,
    );
    return response.data;
  },
);

// User Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    // logout
    builder.addCase(logoutUserAPI.fulfilled, () => {
      return initialState;
    });
    // update profile
    builder.addCase(updateUserProfileAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export const { logoutUser } = userSlice.actions;

// Selector
export const selectCurrentUser = (state) => state.user.currentUser;

export const userReducer = userSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { API_ENDPOINT } from "~/utils/constants";
// import authorizedAxiosInstance from "~/utils/authorizeAxios";
// import { toast } from "react-toastify";

// // 1. HARDCODE DỮ LIỆU USER MẪU (MOCK DATA)
// // Thiết kế sẵn cấu trúc tương thích với file Home.jsx cũ của bạn (currentUser.user.email)
// const mockUser = {
//   user: {
//     id: "user-id-123",
//     email: "chalaureat@bibliophile.com",
//     username: "Chiêm Thái Sơn",
//     avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb", // Ảnh đại diện nghệ thuật nếu cần
//     role: "Author",
//     bio: "A lover of silence, classic literature, and dark tea.",
//   },
//   accessToken: "mock-valid-jwt-token-for-testing",
//   refreshToken: "mock-valid-refresh-token",
// };

// const initialState = {
//   // Gán thẳng mockUser vào đây thay vì để null, giúp giao diện luôn nhận diện đã đăng nhập
//   currentUser: mockUser,
// };

// // 2. GIẢ LẬP CÁC THUNKS ĐỂ KHÔNG BỊ LỖI KHI CALL API (KHI CHƯA CÓ BE)
// export const loginUserAPI = createAsyncThunk(
//   "user/loginUserAPI",
//   async (data) => {
//     // Giả lập delay mạng 800ms rồi return mock data
//     await new Promise((resolve) => setTimeout(resolve, 800));
//     toast.success("Đăng nhập giả lập thành công!");
//     return mockUser;
//   },
// );

// export const logoutUserAPI = createAsyncThunk(
//   "user/logoutUserAPI",
//   async (showSuccessMessage = true) => {
//     // Giả lập delay mạng khi nhấn logout
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     if (showSuccessMessage) {
//       toast.success("Logged out successfully! (Mock)", {
//         position: "bottom-right",
//       });
//     }
//     return null;
//   },
// );

// export const updateUserProfileAPI = createAsyncThunk(
//   "user/updateUserProfileAPI",
//   async (data) => {
//     await new Promise((resolve) => setTimeout(resolve, 800));
//     toast.success("Cập nhật profile thành công! (Mock)");
//     // Giữ nguyên các thông tin cũ và ghi đè thông tin mới truyền lên
//     return {
//       ...mockUser,
//       user: { ...mockUser.user, ...data },
//     };
//   },
// );

// // User Slice
// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     logoutUser: (state) => {
//       state.currentUser = null;
//     },
//   },
//   extraReducers: (builder) => {
//     // login
//     builder.addCase(loginUserAPI.fulfilled, (state, action) => {
//       state.currentUser = action.payload;
//     });
//     // logout
//     builder.addCase(logoutUserAPI.fulfilled, (state) => {
//       // Khi logout, set currentUser về null để quay lại trạng thái chưa đăng nhập
//       state.currentUser = null;
//     });
//     // update profile
//     builder.addCase(updateUserProfileAPI.fulfilled, (state, action) => {
//       state.currentUser = action.payload;
//     });
//   },
// });

// export const { logoutUser } = userSlice.actions;

// // Selector
// export const selectCurrentUser = (state) => state.user.currentUser;

// export const userReducer = userSlice.reducer;
