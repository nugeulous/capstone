import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sheet from '@mui/joy/Sheet';

export default function Account() {
  const navigate = useNavigate();
  return (
    <Sheet color="neutral" variant="soft">
    <div className="account">
      <h1>Account</h1>
      <h2>Owner</h2>
      <p>Name:</p>
      <p>Email:</p>
      <p>Phone Number:</p>
      <p>Address:</p>
      <h2>Pet(s)</h2>
      <p>Name:</p>
      <p>Age:</p>
      <p>Breed:</p>
      <p>Gender:</p>
      <p>Weight:</p>
      <p>Favorite Treat:</p>
      <p>Favorite Toy:</p>
      <p>Personality:</p>

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
