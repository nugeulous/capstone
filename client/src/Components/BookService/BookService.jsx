import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOwner, fetchAvailablePetsitters } from "../../API/api";
import { Button } from "@mui/material";

// pass in token
export default function BookService({token}) {

  const [owner, setOwner] = useState(null);
  const [error, setError] = useState(null);
  const [startTimeInput, setStartTimeInput] = useState(null);
  const [endTimeInput, setEndTimeInput] = useState(null);
  const [animalType, setAnimalType] = useState(null);
  const [petSitterDetails, setPetsitterDetails] = useState([]);
  const navigate = useNavigate();

  // confirm token exists / user logged in
  // useEffect makes a call while still allowing this component to render
  const getAccount = useCallback(async () => {
    try {
      // useEffect will not continue until fetchAccount(token) returns a promise
      const fetchedAccount = await fetchOwner(token);
      // update state to store the fetched account
      setOwner(fetchedAccount);
    } catch (error) {
      setError(error.message);
    }
  }, [token, fetchOwner, setOwner, setError]);

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
      console.log('result BEFORE time change', result)

      // result.map((petsitter)=> {
      //   const endTime = petsitter.end_time;
      //   // Split the military time into hours and minutes
      //   const [hour, minute] = endTime.split(':');

      //   // Convert hours to number
      //   let regularHour = parseInt(hour, 10);
      //   console.log('reg hour end time:  ', regularHour)
      //   // Determine AM/PM suffix
      //   let period = regularHour >= 12 ? 'PM' : 'AM';
      //   period = regularHour - 12 === 0? 'AM' : 'PM';        // Convert to regular time
      //   if (regularHour === 0) {
      //       regularHour = 12; // 00:00 in military time is 12:00 AM
      //       period = 'AM';
      //   } else if (regularHour > 12) {
      //       regularHour -= 12; // Convert hours greater than 12 to regular time
      //   }

      //   // Return regular time as HH:MM AM/PM string
      //   petsitter.end_time = `${regularHour.toString().padStart(2, '0')}:${minute} ${period}`;

      //   const startTime = petsitter.start_time;
      //   // Split the military time into hours and minutes
      //   const [hour2, minute2] = startTime.split(':');

      //   // Convert hours to number
      //   let regularHour2 = parseInt(hour2, 10);

      //   // Determine AM/PM suffix
      //   let period2 = regularHour2 >= 12 ? 'PM' : 'AM';
      //   console.log(period2, 'period2')
      //   // Convert to regular time
      //   if (regularHour2 === 0) {
      //       regularHour2 = 12; // 00:00 in military time is 12:00 AM
      //   } else if (regularHour2 > 12) {
      //       regularHour2 -= 12; // Convert hours greater than 12 to regular time
      //   }

      //   // Return regular time as HH:MM AM/PM string
      //   petsitter.start_time = `${regularHour2.toString().padStart(2, '0')}:${minute2} ${period2}`;
      //   return petsitter;
      // })
      // console.log('RESULT AFTER--->', result);
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
            <input type="date" placeholder="10/10/2024" />
          </label>
          <label>Start Time:
            <input type="time" placeholder="10:00AM" step={3600} onChange={(e) => setStartTimeInput(e.target.value)} />
          </label>
          <label>End Time:
            <input type="time" placeholder="11:00AM" step={3600} onChange={(e) => setEndTimeInput(e.target.value)}/>
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
          
          // console.log('sitter start: ', petsitter.start_time)
          // console.log('input: ', startTimeInput)
          // console.log('true', parseInt(petsitter.start_time) <= parseInt(startTimeInput))
          
          // console.log('sitter end: ', petsitter.end_time)
          // console.log('input: ', endTimeInput)
          // console.log('true', parseInt(petsitter.end_time) >= parseInt(endTimeInput))

          // console.log('petsitter dogs: ', petsitter.dogs)

          return parseInt(petsitter.start_time) <= parseInt(startTimeInput) && parseInt(petsitter.end_time) >= parseInt(endTimeInput);

        }).map((petsitter, index)=>{
          return <div 
            
            className="sitter-card"
            id="myButton" 
            type="button"
            variant="outlined"
            onClick={() => {
              navigate(`/ServiceConfirmed`);
            }}
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
                navigate(`/ServiceConfirmed`);
              }}>Book Now</Button>

            <Button 
              id="myButton"
              type="button"
              variant="outlined"
              onClick={() => {
                navigate(`/ServiceConfirmed`);
              }}>See Sitter Details</Button>
            </div>

          </div>
        })}</div>
        </div>
    );
}