import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function ServiceConfirmed() {
    const navigate = useNavigate();
    return (
        <div className="home">
            <h1>Review Details</h1>
            <h2>Your search criteria, your selected servicer, and their price appear summarized before you - as if handed down from on high - in 1, majestic union for your viewing pleasure.  </h2>
            <Button
        variant="outlined"
        onClick={() => {
          navigate(`/PaymentInfo`);
        }}
      >
       PAY
      </Button>
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