import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from '../slices/bookingSlice'; 

const store = configureStore({
  reducer: {
    booking: bookingReducer, // Use the reducer from createSlice
  },
});

export default store;