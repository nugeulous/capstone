import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAvailablePetsitters } from '../../../API/api';

// api call to fetch all petsitters
export const fetchPetsitters = createAsyncThunk(
  'booking/fetchPetsitters',
  async (token) => {
    const response = await fetchAvailablePetsitters(token);
    console.log('RESPONSE ---->: ', response)
    return response;
  }
);

// create empty slice to store booking details
const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    petsitters: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPetsitters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPetsitters.fulfilled, (state, action) => {
        console.log('Action Type in fulfilled:', action.type);  // Log the action type
        console.log('Payload received in fulfilled:', action.payload);  // Ensure the payload is correct
        state.loading = false;
        state.petsitters = action.payload;  // Update petsitters array
        console.log('Updated petsitters state:', state.petsitters);  // Check if the state is updated
      })      
      .addCase(fetchPetsitters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default bookingSlice.reducer;
