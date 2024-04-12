import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OrderHistory from "./OrderHistory";

export default function Home({user}) {
    const navigate = useNavigate();
  return (
    <div className="home">
      <h1>Logo</h1>
      <p>A conditional that shows "Please Login" or Welcome, "user.fname"! </p>
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
        Overnight Sitter
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          navigate(`/OrderHistory`);
        }}
      >
        Order History Tester
      </Button>
      <OrderHistory user={user}/>
    </div>
  );
}