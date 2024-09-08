import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function OrderConfirmed() {
  const navigate = useNavigate();
  return (
        <div className="home">
          <h1>Order Successful!</h1>
          <h1>Thanks for booking with AllTails. 🐈</h1>
          <h2></h2>
      <Button
        variant="outlined"
        onClick={() => {
          navigate(`/account`);
        }}
      >
       ACCOUNT
      </Button>
        </div>
    );
}