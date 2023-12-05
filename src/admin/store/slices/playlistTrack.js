import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../axios'
const playlistTrack = createSlice({
  name: "playlistTrack",
  initialState: {
    playlist: null, // Thông tin người dùng
    status: "idle",
    error: null
  },
  reducers: {
    fetchPlaylistPending(state) {
      state.status = 'loading';
    },
    fetchPlaylistSuccess(state, action) {
      state.status = 'succeeded';
      state.playlist = action.payload;
    },
    fetchPlaylistError(state) {
      state.status = 'failed';
    },
    updatePlaylist(state, action) {
      state.playlist = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchPlaylistTrack.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchPlaylistTrack.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.playlist = action.payload;
    });
    builder.addCase(fetchPlaylistTrack.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  }
});

export const fetchPlaylistTrack = createAsyncThunk("playlistTrack/fetchPlaylist", async (id) => {
  console.log(id);
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
    const response = await axiosInstance.get(`api/PlaylistTrack/id?id=${id}`, config)
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Ném lỗi để `fetchTrack.rejected` xử lý
  }
});

export const {  fetchPlaylistPending,
  fetchPlaylistSuccess,
  fetchPlaylistError,
  updatePlaylist } = playlistTrack.actions;
export default playlistTrack.reducer;
