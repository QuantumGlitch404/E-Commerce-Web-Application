import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Other reducers will be added here (cart, products, etc.)
  },
});
