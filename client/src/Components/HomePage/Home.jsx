import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import SlideShow from "./SlideShow";
import Services from "../../Components/DefaultLayout/Services";
export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Home</h1>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <SlideShow />
      </div>
      <Services />
      <div
      style={{display: "flex", justifyContent: "center", gap: 10}}
      >
      <Button
        variant="outlined"
        onClick={() => {
          navigate(`/OrderHistory`);
        }}
      >
        Order History
      </Button>

        <Button
          variant="outlined"
          onClick={() => {
            navigate(`/liked-events`);
          }}
        >
          Liked Events
        </Button>
      </div>
  
    </>
  );
}
