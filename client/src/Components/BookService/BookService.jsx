import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOwner, fetchAvailablePetsitters } from "../../API/api";
import { Button } from "@mui/material";
import NoAccess from "../PlaygroundPages/EventsComponents/NoAccess";
import "./Styling.css"

// when BookService page loads, pass in token to ensure person navigating page is logged in
export default function BookService({token}) {

  const [owner, setOwner] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startTimeInput, setStartTimeInput] = useState("10:00");
  const [endTimeInput, setEndTimeInput] = useState("11:00");
  const [dateInput, setDateInput] = useState("2024-10-10");
  const [animalType, setAnimalType] = useState(null);
  const [petSitterDetails, setPetsitterDetails] = useState([]);
  const navigate = useNavigate();

  // confirm token exists (user logged in / has account)
  // If user not logged in, render a message
    if (!token) {
      return <NoAccess/>;
    }

  // useEffect calls getAccount while still allowing this component to render; will not continue until fetchOwner(token) returns a promise
  const getAccount = useCallback(async () => {
    try {
      // api calll to fetch account
      const fetchedAccount = await fetchOwner(token);
      // update state to store the fetched owner account
      setOwner(fetchedAccount);
    } catch (error) {
      setError(error.message);
    }
  }, [token, setOwner, setError]);

  // useEffect runs getAccount (above)
  // only re-renders when dependency changes (stored in array) - avoid infinite rerender or slow page
  useEffect(() => {
    // Ensure token exists before attempting fetch
    if (token) { 
      getAccount();
    } else {
      setLoading(false); 
    }
  }, [getAccount, token]);
  
  if (error) return <div>Error: {error}</div>;

// GET all petsitter info
async function handleSubmit(event) {
  event.preventDefault();

  try {
    const result = await fetchAvailablePetsitters(token);
    setPetsitterDetails(result);
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      setError("Network error: Unable to reach the server. Please check your internet connection.");
    } else if (error.response && error.response.status === 401) {
      setError("Authorization error: Your session may have expired. Please log in again.");
    } else if (error.response && error.response.status === 500) {
      setError("Server error: Unable to retrieve petsitter details. Please try again later.");
    } else {
      setError(`Unexpected error: ${error.message}`);
    }
  }
}

// filter for petsitters with specific availability
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
      <label>Pet Size:
        <select>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </label>
      <label>Location:
        <input type="text" placeholder="5 - Digit Zip Code" />
      </label>
      <label>
        <input type="submit" />
      </label>
    </form>

    <div className="sitters-container">
      {petSitterDetails.filter((petsitter) => {
        return parseInt(petsitter.start_time) <= parseInt(startTimeInput) &&
          parseInt(petsitter.end_time) >= parseInt(endTimeInput);
      }).length === 0 ? (
        <div>No petsitters available at this time.</div>
      ) : (
        petSitterDetails.filter((petsitter) => {
          return parseInt(petsitter.start_time) <= parseInt(startTimeInput) &&
            parseInt(petsitter.end_time) >= parseInt(endTimeInput);
        }).map((petsitter, index) => (
          <div
            className="sitter-card"
            id="myButton"
            type="button"
            variant="outlined"
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
                id="myButton"
                type="button"
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
                id="myButton"
                type="button"
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
  </div>
)};