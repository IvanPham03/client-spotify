import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    view: "songs",
    modal: false,
    mode: "new",
    track: false,
    album: false,
    user: false
  },
  reducers: {
    setView: (state, action) => {
      state.view = action.payload;
    },
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    setModalEdit: (state, action) => {
      state.modal = action.payload;
    },
    setModalTrack: (state, action) => {
      state.track = action.payload;
    },
    setModalUser: (state, action) => {
      state.user = action.payload;
    },
    setModalAlbum: (state, action) => {
      state.album = action.payload;
    }
  }
});

export const { setView, setModal, setModalEdit, setModalTrack, setModalUser, setModalAlbum } = uiSlice.actions;
export default uiSlice.reducer;
