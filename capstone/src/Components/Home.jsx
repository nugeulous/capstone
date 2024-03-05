import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
  return (
    <div className="home">
      <h1>Home</h1>
      <Button
        variant="outlined"
        onClick={() => {
          navigate(`/Walkers`);
        }}
      >
        Take a Walk
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          navigate(`/Groomers`);
        }}
      >
        Groom your baby
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          navigate(`/Trainers`);
        }}
      >
        Teach your pet new tricks
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          navigate(`/Sitters`);
        }}
      >
        Find a siiter
      </Button>
    </div>
  );
}

