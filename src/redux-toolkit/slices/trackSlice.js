// trackSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../axios'

const trackSlice = createSlice({
  name: "track",
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
      .addCase(fetchTrack.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTrack.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      // .addCase(fetchTrack.rejected, () => (state, action) =>{
        // state.error = action.error;
        // state.status = "failed";
        // console.log(error);
      // });
  }
});

export const fetchTrack = createAsyncThunk("track/fetchTrack", async id => {
  try {
    const response = await axiosInstance.get(`tracks/${id}`); // gọi instance và get endpoint

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Ném lỗi để `fetchTrack.rejected` xử lý
  }
});

export const { addtrack, removetrack } = trackSlice.actions;
export default trackSlice.reducer;
