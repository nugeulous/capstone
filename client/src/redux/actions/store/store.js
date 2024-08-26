import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from '../slices/bookingSlice'; 

// configure store to use the reducer from createSlice
const store = configureStore({
  reducer: {
    booking: bookingReducer, 
  },
});

export default store;