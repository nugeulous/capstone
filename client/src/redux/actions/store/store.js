// configure store to manage state and reducers processing actions
import { configureStore } from 'redux';
import bookingReducer from '../reducers/bookingReducer';
const store = configureStore(bookingReducer);

export default store;
