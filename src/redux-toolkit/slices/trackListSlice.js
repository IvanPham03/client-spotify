// trackSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../axios'

const TrackListSlice = createSlice({
  name: "trackList",
  initialState: {
    value: [],
    status: "idle",
    error: null
  },
  reducers: {
    addtrack: (state, action) => {
      state.value.push(action.payload);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTrackList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTrackList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(fetchTrackList.rejected, () => (state, action) =>{
        state.error = action.error;
        state.status = "failed";
        console.log(error);
      })
      .addCase(searchTrack.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(searchTrack.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(searchTrack.rejected, () => (state, action) =>{
        state.error = action.error;
        state.status = "failed";
        console.log(error);
      });
  }
});

export const fetchTrackList = createAsyncThunk("trackList/fetchTrackList", async()=> {
  try {
    const response = await axiosInstance.get(`tracks`); // gọi instance và get endpoint
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Ném lỗi để `fetchTrack.rejected` xử lý
  }
});
export const searchTrack = createAsyncThunk("trackAdmin/searchTrack", async key => {
  try {
    console.log(key);
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return null // Xử lý khi không tìm thấy token
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        
      },
      params: {
        keywords: key // Truyền tham số keywords vào params
      }
    };
    // const data = {
    //   keywords : key
    // }
    const response = await axiosInstance.get("tracks/search", config)
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Ném lỗi để `fetchTrack.rejected` xử lý
  }
});
export const { addtrack, removetrack } = TrackListSlice.actions;
export default TrackListSlice.reducer;
