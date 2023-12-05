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
      });
  }
});

export const fetchTrackList = createAsyncThunk("trackList/fetchTrackList", async()=> {
  try {
    const response = await axiosInstance.get(`api/Track`); // gọi instance và get endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Ném lỗi để `fetchTrack.rejected` xử lý
  }
});

export const { addtrack, removetrack } = TrackListSlice.actions;
export default TrackListSlice.reducer;
