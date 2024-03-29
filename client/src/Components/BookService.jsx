import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAccount, fetchAvailablePetsitters } from "../API/api";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";

const commonStyles = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  width: '5rem',
  height: '5rem',
};

 function BorderRadius() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ ...commonStyles, borderRadius: '50%' }} />
      <Box sx={{ ...commonStyles, borderRadius: 1 }} />
      <Box sx={{ ...commonStyles, borderRadius: '16px' }} />
    </Box>
  );

  function BorderColor() {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }} >
        <Box sx={{ ...commonStyles, borderColor: 'primary.main' }} />
        <Box sx={{ ...commonStyles, borderColor: 'secondary.main' }} />
        <Box sx={{ ...commonStyles, borderColor: 'error.main' }} />
        <Box sx={{ ...commonStyles, borderColor: 'grey.500' }} />
        <Box sx={{ ...commonStyles, borderColor: 'text.primary' }} />
      </Box>
    );
  }
}

// pass in token
export default function BookService({token}) {

  const [owner, setOwner] = useState({});
  const [error, setError] = useState(null);
  const [startTimeInput, setStartTimeInput] = useState(null);
  const [endTimeInput, setEndTimeInput] = useState(null);
  const [petSitterFnameLname, setPetsitterFnameLname] = useState([]);
  const navigate = useNavigate();

  // confirm token exists / user logged in
  // useEffect makes a call while still allowing this component to render
  useEffect(() => {
    const getAccount = async () => {
      try {
        // useEffect will not continue until fetchAccount(token) returns a promise
        const fetchedAccount = await fetchAccount(token);
        // update state to store the fetched account
        setOwner(fetchedAccount);
      } catch (error) {
        setError(error.message);
      }
    };
    // getAccount();
  }, []);
  
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
      setPetsitterFnameLname(result);
    } catch (error) {
      console.log('ERROR FROM FETCH---->', error)
      setError("Can't fetch info");
    }
    }
    
  // filter for owners with specific availability
    return (
        <div className="home">
            <h1>Walkers</h1>
        <form onSubmit={handleSubmit}>
          <label>Day:
            <input type="date" placeholder=" MM/DD/YYYY" />
          </label>
          <label>Start Time:
            <input type="time" placeholder=" 12:00PM" step={3600} onChange={(e) => setStartTimeInput(e.target.value)} />
          </label>
          <label>End Time:
            <input type="time" placeholder=" 12:00PM" step={3600} onChange={(e) => setEndTimeInput(e.target.value)}/>
          </label>
          <label>Pet:
            <select>
            {/* <select value={myCar} onChange={handleChange}> */}
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
        <div>{petSitterFnameLname.filter((petsitter) => {
          return petsitter.start_time <= startTimeInput && petsitter.end_time >= endTimeInput;
        }).map((petsitter, index)=>{
          return <Box key={index}> {petsitter.fname + ' ' + petsitter.lname} <Button 
            id="myButton" 
            type="button"
            variant="outlined"
            onClick={() => {
              navigate(`/ServiceConfirmed`);
            }}
          >Book</Button> </Box>
        })}</div>
        </div>
    );
}