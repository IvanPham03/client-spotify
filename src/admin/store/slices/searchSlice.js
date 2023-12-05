import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";
const playlistTrack = createSlice({
  name: "search",
  initialState: {
    playlist: null, // Thông tin người dùng
    track: null,
    album: null,
    artist: null,
    status: "idle",
    error: null
  },
  reducers: {
    fetchPlaylistPending(state) {
      state.status = "loading";
    },
    fetchPlaylistSuccess(state, action) {
      state.status = "succeeded";
      state.playlist = action.payload;
    },
    fetchPlaylistError(state) {
      state.status = "failed";
    },
    updatePlaylist(state, action) {
      state.playlist = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchPlaylist.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchPlaylist.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.playlist = action.payload;
    });
    builder.addCase(fetchPlaylist.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(fetchTrack.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchTrack.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.track = action.payload;
    });
    builder.addCase(fetchTrack.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(fetchAlbum.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchAlbum.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.album = action.payload;
    });
    builder.addCase(fetchAlbum.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(fetchArtist.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchArtist.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.artist = action.payload;
    });
    builder.addCase(fetchArtist.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  }
});

export const fetchTrack = createAsyncThunk("search/fetchTrack", async key => {
  try {
    const response = await axiosInstance.get(
      `/api/Track/search?searchTerm=${key}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Ném lỗi để `fetchTrack.rejected` xử lý
  }
});
export const fetchAlbum = createAsyncThunk("search/fetchAlbum", async id => {
  console.log(id);
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return null; // Xử lý khi không tìm thấy token
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    };
    const response = await axiosInstance.get(
      `api/PlaylistTrack/id?id=${id}`,
      config
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Ném lỗi để `fetchTrack.rejected` xử lý
  }
});
export const fetchPlaylist = createAsyncThunk(
  "search/fetchPlaylist",
  async id => {
    console.log(id);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return null; // Xử lý khi không tìm thấy token
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      };
      const response = await axiosInstance.get(
        `api/PlaylistTrack/id?id=${id}`,
        config
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Ném lỗi để `fetchTrack.rejected` xử lý
    }
  }
);
export const fetchArtist = createAsyncThunk("search/fetchArtist", async id => {
  console.log(id);
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return null; // Xử lý khi không tìm thấy token
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    };
    const response = await axiosInstance.get(
      `api/PlaylistTrack/id?id=${id}`,
      config
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Ném lỗi để `fetchTrack.rejected` xử lý
  }
});

export const {
  fetchPlaylistPending,
  fetchPlaylistSuccess,
  fetchPlaylistError,
  updatePlaylist
} = playlistTrack.actions;
export default playlistTrack.reducer;
