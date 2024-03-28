// BOOK A WALK
  // GET all owners
  // filter for owners who have XYZ availability
  // return info

import { useEffect, useState } from "react";
import { fetchAccount, fetchAllSitters } from "../API/api";

// pass in token (how does it know what token is?)
export default function Walkers({token}) {

  console.log('walkers function running...')

  console.log('token has arrived: ', token);

  const [owner, setOwner] = useState({});
  // const [pet, setPet] = useState({});
  const [error, setError] = useState(null);
  const [walkerFnames, setWalkerFnames] = useState([]);

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
    console.log('Submit works!')
    // GET petsitter info
    try {
      console.log('trying to fetch petsitter info...')
      const result = await fetchAllSitters(token);
      console.log("result from fetching sitters info:", result);
      // extract fnames from result and insert into array
      const fnames = result.map((walker)=>walker.fname);
      // update fnames in state
      setWalkerFnames(fnames);
    } catch (error) {
      setError("Can't fetch info");
    }
  }

  // in html, filter for owners with specific availability
    return (
        <div className="home">
            <h1>Walkers</h1>
        <form onSubmit={handleSubmit}>
          <label>Day:
            <input type="date" placeholder=" MM/DD/YYYY" />
          </label>
          <label>Start Time:
            <input type="time" placeholder=" 12:00PM" step={36000}/>
          </label>
          <label>Pet:
            <input type="text" placeholder=" Sergeant Barksalot" />
          </label>
          <label>
            <input type="submit"/>
          </label>
        </form>
        <div>{walkerFnames.map((fname, index)=> (
          <li key={index}> {fname}</li>
        ))}</div>
        </div>
    );
}