import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";
import { fetchTrack } from "./trackSlice";
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
    },
    setPlay: state => {
      state.isPlaying = true;
    },
    setPause: state => {
      state.isPlaying = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAudio.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAudio.fulfilled, (state, action) => {
        state.status = "succeed";
        state.audioMp3 = action.payload;
      })
      .addCase(fetchAudio.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(fetchAudioAndPlay.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAudioAndPlay.fulfilled, (state, action) => {
        state.status = 'succeed';
        state.audioMp3 = action.payload;
      })
      .addCase(fetchAudioAndPlay.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(fetchAudioAndPlayRandom.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAudioAndPlayRandom.fulfilled, (state, action) => {
        state.status = 'succeed';
        state.audioMp3 = action.payload;
      })
      .addCase(fetchAudioAndPlayRandom.rejected, (state, action) => {
        state.status = 'failed';
      });
  }
});

export const fetchAudio = createAsyncThunk("audio/fetchAudio", async id => {
  try {
    const response = await axiosInstance.get(`tracks/file/${id}`, {
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
export const fetchAudioAndPlay = createAsyncThunk(
  "audio/fetchAudioAndPlay",
  async (id, { dispatch }) => {
    try {
      const response = await axiosInstance.get(`tracks/file/${id}`, {
        responseType: "blob"
      });
      console.log(id);
      // Tạo URL từ Blob vì state không cho lưu blob
      const audioURL = URL.createObjectURL(response.data);
      // console.log(audioURL);

      // Dispatch action setPlay để bắt đầu chơi audio ngay sau khi fetch thành công
      dispatch(setPlay());

      return audioURL;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Ném lỗi để `fetchTrack.rejected` xử lý
    }
  }
);

export const fetchAudioAndPlayRandom = createAsyncThunk(
  "audio/fetchAudioAndPlayRandom",
  async (id,{ dispatch }) => {
    try {
      const newid = await axiosInstance.get(`tracks/getOneRandomTrack`)
      console.log(newid);
      const response = await axiosInstance.get(`tracks/file/${newid.data.id}`, {
        responseType: "blob"
      });
      // console.log(id);
      // Tạo URL từ Blob vì state không cho lưu blob
      const audioURL = URL.createObjectURL(response.data);
      // console.log(audioURL);

      // Dispatch action setPlay để bắt đầu chơi audio ngay sau khi fetch thành công
      dispatch(setPlay());
      dispatch(fetchTrack(newid.data.id));

      return audioURL;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Ném lỗi để `fetchTrack.rejected` xử lý
    }
  }
);
export const {
  setAudio,
  togglePlaying,
  toggleLooping,
  toogleShuffling,
  setPause,
  setPlay
} = audioSlice.actions;
export default audioSlice.reducer;
