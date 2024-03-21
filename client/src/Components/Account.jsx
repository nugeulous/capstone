import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sheet from '@mui/joy/Sheet';
import { fetchAccount } from "../API/api";
import { useState, useEffect } from "react";

export default function Account({ token }) {
  const [owner, setOwner] = useState({});
  const [pet, setPet] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getAccount = async () => {
      try {
        const fetchedAccount = await fetchAccount(token);
        setOwner(fetchedAccount);
      } catch (error) {
        setError(error.message);
      }
    };
    getAccount();
  }, []);
  if (error) return <div>Error: {error}</div>;
  if (!owner.id) {
    // User is not logged in, render a message
    return <p>Please log in or create an account.</p>;
  }
  return (
    <Sheet color="neutral" variant="soft">
    <div className="account">
      <h1>Account</h1>
      <h2>Owner</h2>
      <p>First Name: {owner.fname}</p>
      <p>Last Name: {owner.lname} </p>
      <p>Email: {owner.email} </p>
      <p>Phone Number: {owner.phone} </p>
      <p>Address: {owner.location} </p>
      <h2>Pet(s)</h2>
      <p>Name: {pet.name} </p>
      <p>Age: {pet.age} </p>
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
