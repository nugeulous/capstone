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
        Walking
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          navigate(`/Groomers`);
        }}
      >
        Grooming
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          navigate(`/Trainers`);
        }}
      >
        Training
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          navigate(`/Sitters`);
        }}
      >
        Sitter
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
  );
}