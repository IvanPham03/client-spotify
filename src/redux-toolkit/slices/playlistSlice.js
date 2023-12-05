import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../axios'
const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    playlist: null, // Thông tin người dùng
    status: "idle",
    error: null
  },
  reducers: {
    setPlaylist(state, action) {
      state.playlist = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchPlaylist.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchPlaylist.fulfilled, (state, action) => {
      state.playlist = action.payload
      // console.log(state.playlist);
      state.status = "succeeded";
    });
    builder.addCase(fetchPlaylist.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  }
});

export const fetchPlaylist = createAsyncThunk("Playlist/fetchPlaylist", async id => {
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
    const response = await axiosInstance.get(`/Playlist/getAllPlaylistByUserId/${id}`, config)
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Ném lỗi để `fetchTrack.rejected` xử lý
  }
});

export const { setPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;
