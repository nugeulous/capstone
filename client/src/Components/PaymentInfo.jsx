import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreditCardForm from "./CreditCard";
export default function PaymentInfo() {
    const navigate = useNavigate();
    return (
        <div className="home">
<CreditCardForm/>
<Button
        variant="outlined"
        onClick={() => {
          navigate(`/Home`);
        }}
      >
       BACK TO SEARCH
</Button>
        </div>
    );
}