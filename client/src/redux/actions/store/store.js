// configure store to manage state and reducers processing actions
import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from '../reducers/bookingReducer';

const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
});

export default store;

