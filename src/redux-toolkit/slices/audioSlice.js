import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";
const audioSlice = createSlice({
  name: "audio",
  initialState: {
    audioMp3: null,
    isPlaying: false,
    currentTime: 0,
    isLooping: false,
    isShuffling: false,
    duration: 0,
    volume: 100,
    status: "idle"
  },
  reducers: {
    togglePlaying: state => {
      state.isPlaying = !state.isPlaying;
    },
    toggleLooping: state => {
      state.isLooping = !state.isLooping;
    },
    toogleShuffling: state => {
      state.isShuffling = !state.isShuffling;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAudio.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAudio.fulfilled, (state, action) => {
        state.status = "succeed";

        // const audioObject = new Audio(action.payload);
        state.audioMp3 = action.payload;
      })
      .addCase(fetchAudio.rejected, (state, action) => {
        state.status = "failed";
      });
  }
});

// export const fetchAudio = createAsyncThunk("audio/fetchAudio", async id => {
//   try {
//     const response = await axiosInstance.get(`api/Track/file/${id}`, {
//       responseType: "blob"
//     });
//     // Tạo URL từ Blob vì state không cho lưu blob
//     const audioURL = URL.createObjectURL(response.data);
    
//     return audioURL;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error; // Ném lỗi để `fetchTrack.rejected` xử lý
//   }
// });

export const fetchAudio = createAsyncThunk("audio/fetchAudio", async id => {
    try {
      const response = await axiosInstance.get(`tracks/file/AnhSeDuaEmVe-NQP-6309479.mp3`, {
        responseType: "blob"
      });
      // Tạo URL từ Blob vì state không cho lưu blob
      const audioURL = URL.createObjectURL(response.data);
      console.log(audioURL);
      return audioURL;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Ném lỗi để `fetchTrack.rejected` xử lý
    }
  });

export const { setAudio, togglePlaying, toggleLooping, toogleShuffling } = audioSlice.actions;
export default audioSlice.reducer;
