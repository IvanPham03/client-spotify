import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const addPlaylistSlice = createSlice({
  name: "addPlayTrack",
  initialState: {
    trackId: null, // Thông tin người dùng
    status: "idle",
    error: null
  },
  reducers: {
    setAddPlaylist(state, action) {
      state.trackId = action.payload;
    }
  }
});


export const { setAddPlaylist } = addPlaylistSlice.actions;
export default addPlaylistSlice.reducer;
