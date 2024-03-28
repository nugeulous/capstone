// BOOK A WALK
  // GET all owners
  // filter for owners who have XYZ availability
  // return info of those owners

import { useEffect, useState } from "react";
import { fetchAccount, fetchAvailablePetsitters } from "../API/api";
import Box from '@mui/material/Box';
import { borders } from '@mui/system';

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
export default function Walkers({token}) {

  const [owner, setOwner] = useState({});
  const [error, setError] = useState(null);
  const [startTimeInput, setStartTimeInput] = useState(null);
  const [endTimeInput, setEndTimeInput] = useState(null);
  const [petSitterFnameLname, setPetsitterFnameLname] = useState([]);

  // confirm token exists / user logged in
  // useEffect makes a call while still allowing this component to render
  useEffect(() => {
    const getAccount = async () => {
      try {
        console.log('Token has successfully passed through', token)
        // useEffect will not continue until fetchAccount(token) returns a promise
        const fetchedAccount = await fetchAccount(token);
        // update state to store the fetched account
        setOwner(fetchedAccount);
        console.log('successfully fetched account info: ', fetchedAccount);
      } catch (error) {
        setError(error.message);
      }
    };
    getAccount();
  }, []);
  
  if (error) return <div>Error: {error}</div>;
  
  // User is not logged in, render a message
  if (!owner.id) {
    return <p>Please log in or create an account.</p>;
  }

  // get all owner info when pressing submit
  async function handleSubmit(event) {
    event.preventDefault();

    // GET petsitter info
    try {
      const result = await fetchAvailablePetsitters(token);
      console.log("result from fetching sitters info:", result);
      setPetsitterFnameLname(result);
    } catch (error) {
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
            <input type="text" placeholder=" Sergeant Barksalot" />
          </label>
          <label>
            <input type="submit"/>
          </label>
        </form>
        {/* <Box sx={{ border: 1 }}>Border here?</Box>
        <Box sx={{ borderRadius: '50%' }}>HEY</Box>
        <Box sx={{ borderColor: 'grey.500' }}><div>Hi again</div></Box> */}
        <div>{petSitterFnameLname.filter((petsitter) => {
          return petsitter.start_time >= startTimeInput && petsitter.end_time >= endTimeInput;
        }).map((petsitter, index)=>{
          return <li key={index}> {petsitter.fname + ' ' + petsitter.lname} <button id="myButton" type="button">Book</button> </li>

        })}</div>
        </div>
    );
}