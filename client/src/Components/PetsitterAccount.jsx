import { useNavigate } from "react-router-dom";
import Sheet from '@mui/joy/Sheet';
import { fetchPetsitter } from "../API/api";
import { useState, useEffect } from "react";

export default function PetsitterAccount({ token }) {
  const [petsitter, setPetsitter] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getAccount = async () => {
      try {
        const fetchedPetsitter = await fetchPetsitter(token);
        setPetsitter(fetchedPetsitter);
      } catch (error) {
        setError(error.message);
      }
    };
    getAccount();
  }, []);
  if (error) return <div>Error: {error}</div>;
  if (!petsitter.id) {
    // User is not logged in, render a message
    return <p>Please log in or create an account.</p>;
  }
  if (petsitter.role !== "petsitter") {
    return <p>Oops, This is not the right page for a Pet Owner</p>;
   }
  return (
    <Sheet color="neutral" variant="soft">
    <div className="account">
      <h1>Account</h1>
      <h2>Petsitter</h2>
      <p>First Name: {petsitter.fname}</p>
      <p>Last Name: {petsitter.lname} </p>
      <p>Email: {petsitter.email} </p>
      <p>Phone Number: {petsitter.phone} </p>
      <p>Address: {petsitter.address} </p>
    </div>
    </Sheet>
  );
}
