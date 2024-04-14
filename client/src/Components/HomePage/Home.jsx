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
      <Button
        variant="outlined"
        onClick={() => {
          navigate(`/OrderHistory`);
        }}
      >
        Order History
      </Button>
      <div>
        See all liked events
        <button
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`/liked-events`);
          }}
        >
          here
        </button>
      </div>
    </>
  );
}
