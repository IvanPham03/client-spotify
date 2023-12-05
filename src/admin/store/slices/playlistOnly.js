import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../axios'
const playlistOnly = createSlice({
  name: "playlistOnly",
  initialState: {
    value: null, // Thông tin người dùng
    status: "idle",
    error: null
  },
  reducers: {
    setPlaylist(state, action) {
      state.playlist = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchPlaylistOnly.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchPlaylistOnly.fulfilled, (state, action) => {
      state.value = action.payload
      state.status = "succeeded";
    });
    builder.addCase(fetchPlaylistOnly.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  }
});

export const fetchPlaylistOnly = createAsyncThunk("Playlist/fetchPlaylistOnly", async id => {
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
    const response = await axiosInstance.get(`api/Playlist/${id}`, config)
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Ném lỗi để `fetchTrack.rejected` xử lý
  }
});

export const { setPlaylist } = playlistOnly.actions;
export default playlistOnly.reducer;
