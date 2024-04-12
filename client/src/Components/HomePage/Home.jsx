import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import SlideShow from "./SlideShow";

export default function Home() {
    const navigate = useNavigate();
  return (
    <div className="home">
      <h1>Home</h1>
      <SlideShow />
      <Button
        variant="outlined"
        onClick={() => {
          navigate(`/BookService`);
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
      <Button
        variant="outlined"
        onClick={() => {
          navigate(`/OrderHistory`);
        }}
      >
        Order History Tester
      </Button>
    </div>
  );
}