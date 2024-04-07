import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sheet from '@mui/joy/Sheet';
import { useState } from "react";

export default function Account({ user }) {
  const [pet, setPet] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (error) return <div>Error: {error}</div>;
  if (!user) {
    // User is not logged in, render a message
    return <p>Please log in or create an account.</p>;
  }
  if (user.role !== "owner") {
    return <p>Oops, this is not the right page for a Petsitter</p>;
   }
  return (
    <Sheet color="neutral" variant="soft">
    <div className="account">
      <h1>Account</h1>
      <h2>Owner</h2>
      <p>First Name: {user.fname}</p>
      <p>Last Name: {user.lname} </p>
      <p>Email: {user.email} </p>
      <p>Phone Number: {user.phone} </p>
      <p>Address: {user.address} </p>
      <h2>Pet(s)</h2>
      <p>Name: {pet.name} </p>
      <p>Age: {pet.age} </p>
      <p>Animal Type: {pet.animalType}</p>
      <p>Breed: {pet.breed} </p>
      <p>Gender: {pet.gender} </p>
      <p>Weight: {pet.weight} </p>
      <p>Favorite Treat: {pet.favoriteTreat} </p>
      <p>Favorite Toy: {pet.favoriteToy} </p>
      <p>Personality: {pet.personality} </p>

      <Button
        variant="text"
        onClick={() => {
          navigate(`/Pet Info`);
        }}
        >
        + Add Pet
      </Button>
    </div>
    </Sheet>
  );
}
