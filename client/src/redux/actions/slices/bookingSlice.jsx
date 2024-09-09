import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPetsitterAvailabilities } from '../../../API/api';

// fetch petsitter data using async thunk to provide status of call
// action type = booking
// action = fetchPetsitters
export const fetchPetsitters = createAsyncThunk(
  'booking/fetchPetsitters',
  async (token) => {
    const response = await fetchPetsitterAvailabilities(token);
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

  // reducers (functions) provide instructions for how to update current state with booking details
  // reducers use state / action to return new state
  reducers: {
    // action creators that return action objects 
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
