import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ServiceForm from "./ServiceForm";
export default function Home() {
    const navigate = useNavigate();
  return (
    <div className="home">
      <h1>Get Started Here!</h1>
     <ServiceForm/>
     <Button
        variant="outlined"
        onClick={() => {
          navigate(`/ServiceResults`);
        }}
      >
       Pretend submit did something by pressing this button
</Button>
    </div>
  );
}