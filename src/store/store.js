import { configureStore } from '@reduxjs/toolkit';
import dogGroomingSliceReducer from './dogGroomingSlice';

export const store = configureStore({
  reducer: {
    dogGrooming: dogGroomingSliceReducer,
  },
});