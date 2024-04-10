import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAccount, fetchAvailablePetsitters } from "../../API/api";
import { Button } from "@mui/material";
import ReviewBookingDetails from "./ReviewBookingDetails"

// pass in token
export default function BookService({token}) {

  const [owner, setOwner] = useState(null);
  const [error, setError] = useState(null);
  const [startTimeInput, setStartTimeInput] = useState("10:00");
  const [endTimeInput, setEndTimeInput] = useState("11:00");
  const [dateInput, setDateInput] = useState("2024-10-10");
  const [animalType, setAnimalType] = useState(null);
  const [petSitterDetails, setPetsitterDetails] = useState([]);
  const navigate = useNavigate();

  // confirm token exists / user logged in
  // useEffect makes a call while still allowing this component to render
  const getAccount = useCallback(async () => {
    try {
      // useEffect will not continue until fetchAccount(token) returns a promise
      const fetchedAccount = await fetchAccount(token);
      // update state to store the fetched account
      setOwner(fetchedAccount);
    } catch (error) {
      setError(error.message);
    }
  }, [token, fetchAccount, setOwner, setError]);

  // only re-renders when dependency changes (stored in array) - avoid infinite rerender or slow page
  useEffect(() => {
    getAccount();
  }, [getAccount]);
  
  if (error) return <div>Error: {error}</div>;
  
  // User is not logged in, render a message
  if (!token) {
    return <p>Please log in or create an account.</p>;
  }

  // get all owner info when pressing submit
  async function handleSubmit(event) {
    event.preventDefault();

    // GET petsitter info
    try {
      const result = await fetchAvailablePetsitters(token);
      setPetsitterDetails(result);
      console.log('PETSITTER DETAILS--->', petSitterDetails)
    } catch (error) {
      console.log('ERROR FROM FETCH---->', error)
      setError("Can't fetch info");
    }
    }
    
  // filter for owners with specific availability
    return (
        <div className="home">
            <h1 className="book-walk-title">Book a Walk</h1>
        <form className="sitters-filter" onSubmit={handleSubmit}>
          <label>Day:
            <input type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)}/>
          </label>
          <label>Start Time:
            <input type="time" step={3600} value={startTimeInput} onChange={(e) => setStartTimeInput(e.target.value)} />
          </label>
          <label>End Time:
            <input type="time" step={3600} value={endTimeInput} onChange={(e) => setEndTimeInput(e.target.value)}/>
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
            <input type="text" placeholder=" 5 - Digit Zip Code" />
          </label>
          <label>
            <input type="submit"/>
          </label>
        </form>
        <div className="events">{petSitterDetails.filter((petsitter) => {

          return parseInt(petsitter.start_time) <= parseInt(startTimeInput) && parseInt(petsitter.end_time) >= parseInt(endTimeInput);

        }).map((petsitter, index)=>{
          return <div 
            
            className="sitter-card"
            id="myButton" 
            type="button"
            variant="outlined"

            key={index}>

            <div className="sitter-image-container">
              <img className="sitter-image" src={petsitter.image_file} alt="" />
            </div>

            <div>
              <p className="sitter-details">
                {petsitter.fname + ' ' + petsitter.lname}
              </p>
            </div>

            <div className="booknow-button">
            <Button 
              id="myButton"
              type="button"
              variant="outlined"
              onClick={() => {
                navigate(`/ReviewBookingDetails`
                , { state: { details: petsitter, startTime: startTimeInput, endTime: endTimeInput, date: dateInput}});
              }}>Book Now</Button>

            <Button 
              id="myButton"
              type="button"
              variant="outlined"
              onClick={() => {
                navigate(`/petsitters/${petsitter.id}`);
              }}>See Sitter Details</Button>
            </div>
          </div>
        })}</div>
        </div>
    );
}