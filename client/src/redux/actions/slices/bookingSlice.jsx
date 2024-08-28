import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAvailablePetsitters } from '../../../API/api';

// async thunk for fetching petsitters
export const fetchPetsitters = createAsyncThunk(
  'booking/fetchPetsitters',
  async (token) => {
    const response = await fetchAvailablePetsitters(token);
    return response;
  }
);

// create slice for booking
const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    // state to store all fetched petsitters from API
    petsitters: [],
    loading: false,
    error: null,
    // state for selected sitter and booking details
    selectedSitter: null,
    bookingDetails:null, 
  },
  // actions to dispatch for booking flow
  // update current state with booking details
  reducers: {
    setSitterDetails: (state, action) => {
      state.selectedSitter = action.payload;
    },
    setBookingDetails: (state, action) => {
      state.bookingDetails = action.payload;
    }
  },
  // extra reducers to indicate status of actions during AsyncThunk call
  // allows for greater feedback to user - loading / error message
  extraReducers: (builder) => {
    builder
      .addCase(fetchPetsitters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPetsitters.fulfilled, (state, action) => {
        state.loading = false;
        state.petsitters = action.payload;
      })
      .addCase(fetchPetsitters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSitterDetails, setBookingDetails } = bookingSlice.actions;
export default bookingSlice.reducer;
