// recentSongsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const recentSongsSlice = createSlice({
  name: 'recentSongs',
  initialState: {
    recentSongs: [],
  },
  reducers: {
    addRecentSong: (state, action) => {
      // Thêm một bài hát mới vào danh sách gần đây (unshift là một phương thức của mảng)
      state.recentSongs.unshift(action.payload);
      // Giới hạn số lượng bài hát gần đây (nếu cần)
      state.recentSongs = state.recentSongs.slice(0, 10);
    },
    clearRecentSongs: (state) => {
      // Xóa toàn bộ danh sách gần đây
      state.recentSongs = [];
    },
  },
});

export const { addRecentSong, clearRecentSongs } = recentSongsSlice.actions;
export default recentSongsSlice.reducer;
