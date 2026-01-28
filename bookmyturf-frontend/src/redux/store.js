import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import adminReducer from './adminSlice'; // 1. Import your new admin slice

export const store = configureStore({
  reducer: {
    auth: authReducer,      // Handles Login/Logout
    admin: adminReducer,    // Handles Users, Turfs, and Bookings data
  },
});