import { useNavigate } from "react-router-dom";
import Sheet from '@mui/joy/Sheet';
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { fetchAvailablePetsitters } from "../API/api";

export default function PetsitterAccount({ user, token }) {
  const [error, setError] = useState(null);
  const [availabilities, setAvailabilities] = useState([]);
  const navigate = useNavigate();

  if (error) return <div>Error: {error}</div>;
  if (!user) {
    // User is not logged in, render a message
    return <p>Please log in or create an account.</p>;
  }
  if (user.role !== "petsitter") {
    return <p>Oops, this is not the right page for a Pet Owner</p>;
   }
  
  useEffect(() => {
  const getAvailability = async () => {
      try {
        const response = await fetchAvailablePetsitters(token);
        console.log('PETSITTER AVAILABILITIES-->', response);
        setAvailabilities(response);
      } catch(error) {
        setError(error.message);
        console.log('Error message: ', error.message);
      }
    };
      getAvailability();
    }, [token]);
   
  return (
    <Sheet color="neutral" variant="soft">
    <div className="account">
      <h1>Account</h1>
      <h2>Petsitter</h2>
      <p>First Name: {user.fname}</p>
      <p>Last Name: {user.lname} </p>
      <p>Email: {user.email} </p>
      <p>Phone Number: {user.phone} </p>
      <p>Address: {user.address} </p>
    </div>
    <h2>Availability</h2>
    <Button
        variant="text"
        onClick={() => {
          navigate(`/AddAvailability`);
        }}
        >
        + Add Availability
      </Button>
    </Sheet>
  );
}
// fetch petsitter details
