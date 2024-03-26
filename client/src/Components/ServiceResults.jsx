import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function ServiceResults() {
    const navigate = useNavigate();
    return (
        <div className="home">
            <h1>Service Results</h1>
            <h2>Suddenly, an awesome cornucopia of beautiful servicer cards matching your VALID criteria, replete with pictures, basic information, and "book here" buttons dazzle your eyes...</h2>
            <Button
        variant="outlined"
        onClick={() => {
          navigate(`/ServiceConfirmed`);
        }}
      >
       BOOK HERE
      </Button>
        </div>
    );
}