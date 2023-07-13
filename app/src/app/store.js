import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/AppSlice.js'
import homeReducer from '../features/HomeSlice.js'

export const store = configureStore({
  reducer: {
    app:appReducer,
    home : homeReducer
  },
});
