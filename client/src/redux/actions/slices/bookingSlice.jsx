
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAvailablePetsitters } from '../../../API/api';

// Async thunk for fetching petsitters
export const fetchPetsitters = createAsyncThunk(
  'booking/fetchPetsitters',
  async (token) => {
    const response = await fetchAvailablePetsitters(token);
    return response;
  }
);

// Create slice for booking
const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    petsitters: [],
    loading: false,
    error: null,
    selectedSitter: null, // New state for selected sitter
  },
  reducers: {
    setSitterDetails: (state, action) => {
      state.selectedSitter = action.payload;
    },
    setBookingDetails: (state, action) => {
      state.bookingDetails = action.payload;
    }
  },
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
