import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/AppSlice.js'

export const store = configureStore({
  reducer: {
    app:appReducer
  },
});
