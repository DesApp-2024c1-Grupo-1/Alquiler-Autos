import { configureStore } from '@reduxjs/toolkit';
import { alquilerFormSlice } from './alquilerFormSlice.js';

export const store = configureStore({
  reducer: {
    alquiler: alquilerFormSlice.reducer,
  },
});
