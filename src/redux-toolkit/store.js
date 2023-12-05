// store.js
import { configureStore } from '@reduxjs/toolkit';
import trackReducer from './slices/trackSlice';
import recentSongsReducer from './slices/recentSongsSlice';
import uiReducer from './slices/uiSlice'
import audioReducer  from './slices/audioSlice'
import userReducer  from './slices/userSlice'
import playlistReducer from './slices/playlistSlice'
import thunk from 'redux-thunk';
import playlistTrackReducer from './slices/playlistTrack';
import trackListReducer from './slices/trackListSlice'
import albumReducer from './slices/albumSlice'
import playlistOnly from './slices/playlistOnly';
import searchSlice from './slices/searchSlice';
import uiAdminReducer from '../admin/store/slices/uiSliceAdmin'
import trackAdmin from "../admin/store/slices/trackSlice"
import playlistAdmin from "../admin/store/slices/playlistSlice"
import albumAdmin from "../admin/store/slices/albumSlice"
import userAdmin from "../admin/store/slices/userSlice"
const store = configureStore({
  reducer: {
    track: trackReducer,
    recentSongs: recentSongsReducer,
    ui: uiReducer,
    user: userReducer,
    audio: audioReducer,
    playlist: playlistReducer,
    playlistTrack: playlistTrackReducer,
    trackList: trackListReducer,
    album: albumReducer,
    playlistOnly: playlistOnly,
    search: searchSlice,
    uiAdmin: uiAdminReducer,
    trackAdmin: trackAdmin,
    playlistAdmin: playlistAdmin,
    albumAdmin: albumAdmin,
    userAdmin: userAdmin,
    middleware: [thunk]
  },
});

export default store;
