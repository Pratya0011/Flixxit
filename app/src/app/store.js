import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/AppSlice.js'
import homeReducer from '../features/HomeSlice.js'
import movieReducer from '../features/MovieSlice.js'
import tvReducer from '../features/TvSlice.js'

export const store = configureStore({
  reducer: {
    app:appReducer,
    home : homeReducer,
    movie:movieReducer,
    tv:tvReducer
  },
});
