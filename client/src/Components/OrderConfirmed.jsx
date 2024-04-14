import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function OrderConfirmed() {
    const navigate = useNavigate();
    return (
        <div className="home">
<h1>Order Successful!</h1>
<h2>A review of your order will appear here.. some day</h2>
<h2>You can see your order history on your Home and Account page</h2>
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