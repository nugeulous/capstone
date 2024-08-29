import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPetsitters, setSitterDetails, setBookingDetails } from '../../redux/actions/slices/bookingSlice';
import NoAccess from "../PlaygroundPages/EventsComponents/NoAccess";
import "./Styling.css";

export default function BookService({ token }) {
  // store useDispatch to dispatch actions (fetchPetsitters, setBookingDetails, setSitterDetails)
  const dispatch = useDispatch();

  // store useNavigate to navigate to next page of booking flow
  const navigate = useNavigate();

  // use useSelector to extract petsitter data from Redux store state
  const { petsitters = [], loading, error } = useSelector((state) => state.booking);

  // use useState to capture form inputs
  const [startTimeInput, setStartTimeInput] = useState("10:00");
  const [endTimeInput, setEndTimeInput] = useState("11:00");
  const [dateInput, setDateInput] = useState("2024-10-10");
  const [animalType, setAnimalType] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // run token check to confirm user has account and is logged in
  if (!token) {
    return <NoAccess />;
  }

  // when site loads, use token and dispatch to run fetchPetsitters action
  useEffect(() => {
    if (token) {
      dispatch(fetchPetsitters(token))
        .then((action) => {
          console.log('Fetched petsitters:', action.payload);
        })
        .catch(err => console.error('Error in fetching petsitters:', err));
    }
  }, [dispatch, token]);

  // upon submission, updated submitted state to true
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };
  
  // convert 12 hr to 24 hr
  const convert12to24hr = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  }

  // inform user of loading status or error if occurs 
  if (loading) return <div>Loading petsitters...</div>;
  if (error) return <div>Error: {error}</div>;

  // Render form
  return (
    <div className="home">
      <h1 className="book-walk-title">Book A Service!</h1>
      <form className="sitters-filter" onSubmit={handleSubmit}>
        <label>Day:
          <input type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)} />
        </label>
        <label>Start Time:
          <input type="time" step={3600} value={startTimeInput} onChange={(e) => setStartTimeInput(convert12to24hr(e.target.value))
          } />
        </label>
        <label>End Time:
          <input type="time" step={3600} value={endTimeInput} onChange={(e) => setEndTimeInput(convert12to24hr(e.target.value))} />
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

      {/* Check if form has been submitted */}
      {submitted && (
        <div className="sitters-container">
          {/* filter based on input criteria and check if there are any available sitters */}
          {petsitters.filter((petsitter) =>
            // filter by date to check if the data input falls within the available date range
            new Date(dateInput) >= new Date(petsitter.start_date) &&
            new Date(dateInput) <= new Date(petsitter.end_date) &&
            // filter by time to check if the selected time falls within the available time range
            parseInt(petsitter.start_time) <= parseInt(startTimeInput) &&
            parseInt(petsitter.end_time) >= parseInt(endTimeInput)
          ).length === 0 ? (
            <div>No petsitters available at this time.</div>
          ) : (
            // map through the filtered petsitters and render them
            petsitters
              .filter((petsitter) =>
              new Date(dateInput) >= new Date(petsitter.start_date) &&
              new Date(dateInput) <= new Date(petsitter.end_date) &&
                
              parseInt(petsitter.start_time) <= parseInt(startTimeInput) &&
              parseInt(petsitter.end_time) >= parseInt(endTimeInput)
              )
              .map((petsitter, index) => (
                <div className="sitter-card" key={index}>
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
                        // Create object to store booking inputs
                        const bookingInfo = {
                          petsitter,
                          date: dateInput,
                          startTime: startTimeInput,
                          endTime: endTimeInput,
                          animalType
                        };
                        // Dispatch action to set sitter details                       
                        dispatch(setSitterDetails(petsitter));
                        // Dispatch action to set booking details
                        dispatch(setBookingDetails(bookingInfo));
                        // navigate to booking details page
                        navigate(`/ReviewBookingDetails`);
                      }}>Book Now</Button>
                    <br></br>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        // Dispatch action to set sitter details
                        dispatch(setSitterDetails(petsitter));
                        // navigate to petsitter details page
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
  )
}