import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../axios'
const albumSlice = createSlice({
  name: "album",
  initialState: {
    album: null, // Thông tin người dùng
    status: "idle",
    error: null
  },
  reducers: {
    setalbum(state, action) {
      state.album = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchAlbum.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchAlbum.fulfilled, (state, action) => {
      state.album = action.payload
      console.log(state.album);
      state.status = "succeeded";
    });
    builder.addCase(fetchAlbum.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  }
});

export const fetchAlbum = createAsyncThunk("album/fetchAlbum", async token => {
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
    const response = await axiosInstance.get("api/Useralbum", config)
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Ném lỗi để `fetchTrack.rejected` xử lý
  }
});

export const { setAlbum } = albumSlice.actions;
export default albumSlice.reducer;
