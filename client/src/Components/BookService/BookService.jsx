import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPetsitters } from '../../redux/actions/slices/bookingSlice'; // Adjust the path based on your structure
import NoAccess from "../PlaygroundPages/EventsComponents/NoAccess";
import "./Styling.css";

export default function BookService({ token }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access petsitter data and loading/error states from Redux store
  const { petsitters = [], loading, error } = useSelector((state) => state.booking);
  console.log('Petsitters from Redux state:', petsitters); // This should log after every state change
  

  
  const [startTimeInput, setStartTimeInput] = useState("10:00");
  const [endTimeInput, setEndTimeInput] = useState("11:00");
  const [dateInput, setDateInput] = useState("2024-10-10");
  const [animalType, setAnimalType] = useState(null);
  const [submitted, setSubmitted] = useState(false); // Track form submission

  // Confirm token exists (user logged in)
  if (!token) {
    return <NoAccess />;
  }

  // Fetch petsitters only once when the token is available
  useEffect(() => {
    if (token) {
      console.log('Fetching petsitters...');
      dispatch(fetchPetsitters(token))
        .then((action) => {
          console.log('Fetched petsitters:', action.payload); // Log the fetched data
        })
        .catch(err => console.error('Error in fetching petsitters:', err));
    }
  }, [dispatch, token]);

  const bookingState = useSelector((state) => state.booking);
  console.log('Booking state:', bookingState);  // Log the entire booking state to check if petsitters is there
  
  const state = useSelector((state) => state);
console.log('Entire Redux state:', state);  // Log the entire state

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);  // Set submitted to true to display petsitters
  };

  if (loading) return <div>Loading petsitters...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home">
      <h1 className="book-walk-title">Book A Service!</h1>
      <form className="sitters-filter" onSubmit={handleSubmit}>
        <label>Day:
          <input type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)} />
        </label>
        <label>Start Time:
          <input type="time" step={3600} value={startTimeInput} onChange={(e) => setStartTimeInput(e.target.value)} />
        </label>
        <label>End Time:
          <input type="time" step={3600} value={endTimeInput} onChange={(e) => setEndTimeInput(e.target.value)} />
        </label>
        <label>Pet:
          <select onChange={(e) => setAnimalType(e.target.value)}>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Fish">Fish</option>
            <option value="Bird">Bird</option>
            <option value="Hamster">Hamster</option>
            <option value="Reptile">Reptile</option>
          </select>
        </label>
        <input type="submit" />
      </form>

      {/* Display petsitters only after form is submitted */}
      {submitted && (
        <div className="sitters-container">
          {petsitters.filter((petsitter) => {
            return parseInt(petsitter.start_time) <= parseInt(startTimeInput) &&
              parseInt(petsitter.end_time) >= parseInt(endTimeInput);
          }).length === 0 ? (
            <div>No petsitters available at this time.</div>
          ) : (
            petsitters.filter((petsitter) => {
              return parseInt(petsitter.start_time) <= parseInt(startTimeInput) &&
                parseInt(petsitter.end_time) >= parseInt(endTimeInput);
            }).map((petsitter, index) => (
              <div
                className="sitter-card"
                key={index}
              >
                <div className="sitter-image-container">
                  <img className="sitter-image" src={petsitter.file} alt="" />
                </div>

                <div>
                  <p className="sitter-details">
                    {petsitter.fname + ' ' + petsitter.lname}
                  </p>
                </div>

                <div className="sitter-details">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      navigate(`/ReviewBookingDetails`, {
                        state: { details: petsitter, startTime: startTimeInput, endTime: endTimeInput, date: dateInput }
                      });
                    }}
                  >
                    Book Now
                  </Button>
                  <br />
                  <Button
                    variant="outlined"
                    onClick={() => {
                      navigate(`/petsitters/${petsitter.id}`);
                    }}
                  >
                    See Sitter Details
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
