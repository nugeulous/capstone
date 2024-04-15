import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sheet from '@mui/joy/Sheet';
import { useState, useEffect } from "react";
import SinglePet from "./PetInfo/SinglePet";
import { getPetsByOwnerId } from "../API/api";
import NoAccess from "./PlaygroundPages/EventsComponents/NoAccess";
export default function Account({ user, token }) {
  const [error, setError] = useState(null);
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();
  const ownerId = user.id;
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petsData = await getPetsByOwnerId(ownerId);
          setPets(petsData);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchPets();
  }, [ownerId]);
  if (error) return <div>Error: {error}</div>;
  if (!user && !token) {
    // User is not logged in, render a message
    return <NoAccess/>
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
      {pets.map((pet) => (
      <SinglePet key={pet.id} pet={pet} />
      ))}
      <Button
        variant="text"
        onClick={() => {
          navigate(`/Select Animal Type`);
        }}
        >
        + Add Pet
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          navigate(`/OrderHistory`);
        }}
      >
        Order History
      </Button>
    </div>
    </Sheet>
  );
}