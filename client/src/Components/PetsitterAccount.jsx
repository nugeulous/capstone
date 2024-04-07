import { useNavigate } from "react-router-dom";
import Sheet from '@mui/joy/Sheet';
import { useState, useEffect } from "react";

export default function PetsitterAccount({ user }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (error) return <div>Error: {error}</div>;
  if (!user) {
    // User is not logged in, render a message
    return <p>Please log in or create an account.</p>;
  }
  if (user.role !== "petsitter") {
    return <p>Oops, this is not the right page for a Pet Owner</p>;
   }
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
    </Sheet>
  );
}
