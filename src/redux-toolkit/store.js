// store.js
import { configureStore } from '@reduxjs/toolkit';
import trackReducer from './slices/trackSlice';
import recentSongsReducer from './slices/recentSongsSlice';
import uiReducer from './slices/uiSlice'
import audioReducer  from './slices/audioSlice'
import thunk from 'redux-thunk';
const store = configureStore({
  reducer: {
    track: trackReducer,
    recentSongs: recentSongsReducer,
    ui: uiReducer,
    audio: audioReducer,
    middleware: [thunk]
  },
});

export default store;
