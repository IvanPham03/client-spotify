import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../axios'
const userSlice = createSlice({
  name: "userAdmin",
  initialState: {
    value: null, // Thông tin người dùng
    status: "idle",
    error: null
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    clearToken(state) {
      state.token = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.value = action.payload
      state.status = "succeeded";
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  }
});

export const fetchUser = createAsyncThunk("userAdmin/fetchUser", async token => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return null // Xử lý khi không tìm thấy token
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      }
    };
    const response = await axiosInstance.get("/api/Authenticate/users", config)
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Ném lỗi để `fetchTrack.rejected` xử lý
  }
});

export const { setUser, setToken, clearUser, clearToken } = userSlice.actions;
export default userSlice.reducer;
