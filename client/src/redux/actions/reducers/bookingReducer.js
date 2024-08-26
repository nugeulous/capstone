// set initial state to null / no details
const initialState = {
    bookingDetails: null,
  };
  
// dictate state changes based on action
const bookingReducer = (state = initialState, action) => {
    // listen for action type = set_booking_details
    switch (action.type) {
      case 'SET_BOOKING_DETAILS':
        return {
          ...state,
          // update bookingDetails prop of state based on data from action.payload
          bookingDetails: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default bookingReducer;
  